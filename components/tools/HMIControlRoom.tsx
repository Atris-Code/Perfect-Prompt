import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ResponsiveContainer, LineChart, AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
// FIX: Removed AIStudio from type imports as it is a global type and does not need to be explicitly imported.
import type { HMIState, HMIStatus, Alarm, View, AlarmConfig, CoPreset, PyrolysisMaterial, Catalyst, UtilityDutyType } from '../../types';
import { useTranslations } from '../../contexts/LanguageContext';
import { useUtilityCosts } from '../../contexts/UtilityCostContext';
import { CO_PRESETS } from '../../data/coPresets';
import { PYROLYSIS_MATERIALS, SIMULATION_ENGINE } from '../../data/pyrolysisMaterials';
import { generateCinematicImage, generateCinematicVideo } from '../../services/geminiService';
import { OFF_STATE, RUNNING_STATE } from '../../data/hmiConstants';

interface HMIControlRoomProps {
    hmiState: HMIState;
    setHmiState: React.Dispatch<React.SetStateAction<HMIState>>;
    systemStatus: HMIStatus;
    setSystemStatus: React.Dispatch<React.SetStateAction<HMIStatus>>;
    heatingSeconds: number;
    coolingSeconds: number;
    stableSeconds: number;
    activeAlarms: Alarm[];
    setActiveAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
    events: string[];
    addEvent: (message: string) => void;
    historyData: (HMIState & { time: number })[];
    minuteLog: (HMIState & { time: string })[];
    currentTime: Date;
    setView: (view: View) => void;
    alarmConfigs: Record<string, AlarmConfig>;
    onAlarmConfigChange: React.Dispatch<React.SetStateAction<Record<string, AlarmConfig>>>;
    pidGains: { kp: number; ki: number; kd: number };
    onPidChange: React.Dispatch<React.SetStateAction<{ kp: number; ki: number; kd: number }>>;
    selectedFeedstockId: number;
    onFeedstockChange: React.Dispatch<React.SetStateAction<number>>;
    selectedCatalystId: string;
    onCatalystChange: React.Dispatch<React.SetStateAction<string>>;
    initialTab: string | null;
    onTabVisited: () => void;
    isDiagnosing: boolean;
    runElectricalDiagnostics: () => void;
    isCondenserObstructed: boolean;
    setIsCondenserObstructed: React.Dispatch<React.SetStateAction<boolean>>;
    isGasLineObstructed: boolean;
    setIsGasLineObstructed: React.Dispatch<React.SetStateAction<boolean>>;
    isTempSensorFailed: boolean;
    setIsTempSensorFailed: React.Dispatch<React.SetStateAction<boolean>>;
    isBiomassContaminated: boolean;
    setIsBiomassContaminated: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenUtilityWidget: (duty: number, dutyType: UtilityDutyType, unit: string) => void;
}

type HMIPanel = 'controlPanel' | 'presets' | 'coldSystems' | 'reports' | 'cinematicView' | 'trends' | 'preventiveSecurity' | 'materialsCatalysts' | 'scenarioConfigurator' | 'pidConfiguration';

const EuroIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.75 6.75a.75.75 0 00-1.5 0v1.518a2.5 2.5 0 000 2.464v1.518a.75.75 0 001.5 0v-1.518a1 1 0 112 0v1.518a.75.75 0 001.5 0V9.232a2.5 2.5 0 000-2.464V6.75a.75.75 0 00-1.5 0v.586a1 1 0 11-2 0V6.75z" clipRule="evenodd" />
    </svg>
);

const Indicator: React.FC<{ label: string; value: React.ReactNode; unit?: string; statusColor?: string; onActionClick?: () => void; actionIcon?: React.ReactNode }> = ({ label, value, unit, statusColor, onActionClick, actionIcon }) => (
    <div className="flex justify-between items-center relative py-1">
        <span className="text-sm text-slate-400 truncate pr-2">{label}</span>
        <div className="flex items-baseline gap-2">
            <p className="text-xl font-mono font-bold text-white">
                {value}
                {unit && <span className="text-base text-slate-400 ml-1">{unit}</span>}
            </p>
            {onActionClick && actionIcon && (
                <button onClick={onActionClick} className="text-yellow-400 hover:text-yellow-200" title="Calcular Costo Instantáneo">
                    {actionIcon}
                </button>
            )}
        </div>
        {statusColor && <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${statusColor}`}></div>}
    </div>
);

const Panel: React.FC<React.PropsWithChildren<{ title: string; className?: string }>> = ({ title, children, className }) => (
    <div className={`p-4 rounded-lg bg-slate-800 border border-slate-700 h-full flex flex-col ${className}`}>
        <h4 className="text-lg font-bold mb-3 text-cyan-400">{title}</h4>
        <div className="space-y-3 flex-grow flex flex-col justify-around">
            {children}
        </div>
    </div>
);

const ProgressBar: React.FC<{ label: string; value: number; color: string; unit?: string }> = ({ label, value, color, unit = '%' }) => (
    <div>
        <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-slate-400">{label}</span>
            <span className="font-mono font-bold text-white">{value.toFixed(1)}{unit}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-300" style={{ width: `${value}%`, backgroundColor: color }}></div>
        </div>
    </div>
);

const StatusLabel: React.FC<{ status: string }> = ({ status }) => {
    const statusInfo: Record<string, { text: string; bg: string; }> = {
        'EN ESPERA': { text: 'text-black', bg: 'bg-amber-500' },
        'ACTIVO': { text: 'text-white', bg: 'bg-green-500' },
        'INACTIVO': { text: 'text-white', bg: 'bg-slate-500' },
        'CERRADA': { text: 'text-white', bg: 'bg-red-600' },
        'ABIERTA': { text: 'text-white', bg: 'bg-green-500' },
        'DESCARGANDO': { text: 'text-white', bg: 'bg-blue-500' },
        'ENFRIANDO': { text: 'text-white', bg: 'bg-cyan-500' },
        'ARMADO': { text: 'text-white', bg: 'bg-green-500' },
        'DESARMADO': { text: 'text-white', bg: 'bg-slate-500' },
        'OK': { text: 'text-white', bg: 'bg-green-500' },
        'FALLO': { text: 'text-white', bg: 'bg-red-600' },
    };
    const info = statusInfo[status.toUpperCase()] || { text: 'text-white', bg: 'bg-slate-500' };
    return <span className={`px-3 py-1 text-sm font-bold rounded-md ${info.bg} ${info.text}`}>{status}</span>;
};

const EnergyBar: React.FC<{ value: number; max: number }> = ({ value, max }) => {
    const segments = 10;
    const filledSegments = Math.round((value / max) * segments);
    
    return (
        <div className="flex gap-1">
            {Array.from({ length: segments }).map((_, i) => (
                <div key={i} className={`h-4 flex-1 rounded-sm ${i < filledSegments ? 'bg-yellow-400' : 'bg-slate-600'}`}></div>
            ))}
        </div>
    );
};

const StatusDisplay: React.FC<{ status: HMIStatus }> = ({ status }) => {
    const { t } = useTranslations();
    const statusInfo = {
        APAGADO: { text: t('hmi.reactorStatus.inactivo'), color: 'bg-slate-600' },
        CALENTANDO: { text: t('hmi.reactorStatus.arrancando'), color: 'bg-yellow-500' },
        ESTABLE: { text: t('hmi.reactorStatus.estable'), color: 'bg-green-500' },
        ENFRIANDO: { text: t('hmi.reactorStatus.enfriando'), color: 'bg-cyan-500' },
    };
    const current = statusInfo[status];

    return (
        <div className={`py-2 px-4 rounded-lg text-center ${current.color}`}>
            <p className="text-xl font-bold text-white uppercase">{current.text}</p>
        </div>
    );
};

const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const SliderControl: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; min: number; max: number; step: number; unit: string; }> = ({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <label className="text-slate-300">{label}</label>
            <span className="font-mono text-white">{value.toFixed(2)} {unit}</span>
        </div>
        <input type="range" value={value} onChange={onChange} min={min} max={max} step={step} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"/>
    </div>
);


export const HMIControlRoom: React.FC<HMIControlRoomProps> = (props) => {
    const { t } = useTranslations();
    const [activeTab, setActiveTab] = useState<HMIPanel>('controlPanel');
    
    const { costs } = useUtilityCosts();
    const [opex, setOpex] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [annualProfit, setAnnualProfit] = useState(0);
    const [roi, setRoi] = useState(0);
    const [payback, setPayback] = useState(0);
    const CAPEX = 1500000;
    const FEEDSTOCK_COST_PER_KG = 0.06;
    const BIO_OIL_PRICE_PER_KG = 0.5;

    useEffect(() => {
        const { hmiState } = props;
        if (props.systemStatus !== 'ESTABLE') {
            setOpex(0); setRevenue(0); setAnnualProfit(0); setRoi(0); setPayback(0);
            return;
        }
        const opex_energia = hmiState.energyConsumption * costs.gridElectricityPrice;
        const opex_materia_prima = hmiState.feedRate * FEEDSTOCK_COST_PER_KG;
        const totalOpex = opex_energia + opex_materia_prima;
        setOpex(totalOpex);

        const totalRevenue = hmiState.condensateFlow * BIO_OIL_PRICE_PER_KG;
        setRevenue(totalRevenue);

        const profitPerHour = totalRevenue - totalOpex;
        const annualProfitCalc = profitPerHour * 8000;
        setAnnualProfit(annualProfitCalc);
        
        if (annualProfitCalc > 0 && CAPEX > 0) {
            const paybackCalc = CAPEX / annualProfitCalc;
            setPayback(paybackCalc);
            const roiCalc = (annualProfitCalc / CAPEX) * 100;
            setRoi(roiCalc);
        } else {
            setPayback(0);
            setRoi(0);
        }

    }, [props.hmiState, props.systemStatus, costs]);

    const mainTabs: { id: HMIPanel; nameKey: string }[] = [
        { id: 'controlPanel', nameKey: 'hmi.tabs.controlPanel' },
        { id: 'presets', nameKey: 'hmi.tabs.presets' },
        { id: 'coldSystems', nameKey: 'hmi.tabs.coldSystems' },
        { id: 'reports', nameKey: 'hmi.tabs.reports' },
        { id: 'cinematicView', nameKey: 'hmi.tabs.cinematicView' },
        { id: 'trends', nameKey: 'hmi.tabs.trends' },
        { id: 'preventiveSecurity', nameKey: 'hmi.tabs.preventiveSecurity' },
        { id: 'materialsCatalysts', nameKey: 'hmi.tabs.materialsCatalysts' },
    ];
    
    const configTabs: { id: HMIPanel; nameKey: string }[] = [
        { id: 'scenarioConfigurator', nameKey: 'hmi.tabs.scenarioConfigurator' },
        { id: 'pidConfiguration', nameKey: 'hmi.tabs.pidConfiguration' },
    ];

    const [activeReportSubTab, setActiveReportSubTab] = useState<'full'|'live'|'export'>('live');
    const [cinematicPrompt, setCinematicPrompt] = useState(
      `Cinematic, photorealistic, wide shot of a P-01 biomass pyrolysis reactor inside a modern, clean industrial facility. The system is currently in a APAGADO state. The core temperature is approximately 25°C. The mood is cold, dormant, and silent, with no glowing parts. High detail, 8k. La escena incluye el sistema de alimentación de pellets, con una cinta transportadora y una tolva visibles. Un operario con equipo de protección completo está monitorizando un panel de control en segundo plano. El aire tiene una ligera neblina de polvo y vapor, que se atrapa en la iluminación volumétrica.`
    );
    const [cinematicResult, setCinematicResult] = useState<{ type: 'image' | 'video', url: string } | null>(null);
    const [isGeneratingCinematic, setIsGeneratingCinematic] = useState(false);
    const [cinematicError, setCinematicError] = useState('');
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoStatusMessageKey, setVideoStatusMessageKey] = useState('');
    const [pelletSystemVisible, setPelletSystemVisible] = useState(true);
    const [personnelVisible, setPersonnelVisible] = useState(true);
    const [ambienceVisible, setAmbienceVisible] = useState(true);
    const [isVeoEnabled, setIsVeoEnabled] = useState(false);

    const [cinematicSceneConfig, setCinematicSceneConfig] = useState({
        status: props.hmiState.systemMode,
        temp: props.hmiState.reactorTemp,
    });

    useEffect(() => {
        const checkApiKey = async () => {
            if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
                setIsVeoEnabled(true);
            }
        };
        checkApiKey();
    }, []);

    const handleGenerateCinematicPrompt = () => {
        const { status, temp } = cinematicSceneConfig;
        const statusKey = `hmi.cinematicView.prompt.mood.${status}`;
        const mood = t(statusKey, { temp: temp.toFixed(0) });
        const base = t('hmi.cinematicView.prompt.base', { status: status, temp: temp.toFixed(0) });
        const details = t('hmi.cinematicView.prompt.details');
        
        let prompt = `${base} ${mood} ${details}`;

        if (pelletSystemVisible) {
            prompt += ` ${t('hmi.cinematicView.prompt.pellets')}`;
        }
        if (personnelVisible) {
            prompt += ` ${t('hmi.cinematicView.prompt.staff')}`;
        }
        if (ambienceVisible) {
            prompt += ` ${t('hmi.cinematicView.prompt.dust')}`;
        }
        
        setCinematicPrompt(prompt);
    };

    const handleApplyPreset = (preset: CoPreset) => {
        props.setHmiState(prev => ({
            ...prev,
            targetTemp: preset.targetTemp,
            residenceTime: preset.residenceTime,
            oxygenConcentration: 0, 
            n2Flow: preset.flowN2,
            agentMode: preset.agentMode as HMIState['agentMode'],
        }));
        props.addEvent(`Preset '${preset.name}' aplicado.`);
    };

    const handleGenerateImage = async () => {
        setIsGeneratingCinematic(true);
        setCinematicError('');
        setCinematicResult(null);
        try {
            const imageData = await generateCinematicImage(cinematicPrompt);
            setCinematicResult({ type: 'image', url: `data:image/jpeg;base64,${imageData}` });
        } catch (error) {
            setCinematicError(t('hmi.cinematicView.imageError'));
        } finally {
            setIsGeneratingCinematic(false);
        }
    };
    
    const handleGenerateVideo = async () => {
        setIsGeneratingCinematic(true);
        setCinematicError('');
        setCinematicResult(null);
        setVideoProgress(0);
        setVideoStatusMessageKey('');
    
        const onProgress = (messageKey: string, progress: number) => {
            setVideoStatusMessageKey(messageKey);
            setVideoProgress(progress);
        };
    
        try {
            const videoUrl = await generateCinematicVideo(cinematicPrompt, onProgress);
            setCinematicResult({ type: 'video', url: videoUrl });
            setIsVeoEnabled(true);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            if (errorMessage.includes("Requested entity was not found")) {
                setIsVeoEnabled(false);
                setCinematicError(t('hmi.cinematicView.apiKeyError'));
            } else {
                setCinematicError(errorMessage);
            }
        } finally {
            setIsGeneratingCinematic(false);
            setVideoProgress(0);
            setVideoStatusMessageKey('');
        }
    };

    const exportToCsv = (filename: string, rows: (string | number)[][]) => {
        const processRow = (row: (string|number)[]) => row.map(val => {
            const s = String(val);
            if (s.includes(',')) return `"${s}"`;
            return s;
        }).join(',');

        let csvContent = rows.map(processRow).join('\n');
        const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportMinuteLog = () => {
        const headers = [t('hmi.reports.time'), t('hmi.reports.reactorTemp'), t('hmi.reports.reactorPressure'), t('hmi.reports.feedRate')];
        const data = props.minuteLog.map(log => [log.time, log.reactorTemp.toFixed(2), log.reactorPressure.toFixed(2), log.feedRate.toFixed(2)]);
        exportToCsv('registro_minuto_a_minuto.csv', [headers, ...data]);
    };

    const pidErrorData = props.historyData.map(d => ({
        time: d.time,
        error: d.targetTemp - d.reactorTemp,
        setpoint: 0
    }));

    const selectedFeedstock = PYROLYSIS_MATERIALS.find(m => m.id === props.selectedFeedstockId) as PyrolysisMaterial | undefined;
    const selectedCatalyst = SIMULATION_ENGINE.catalysts.find(c => c.id === props.selectedCatalystId);

    const handleStartSystem = () => {
        if (props.systemStatus === 'APAGADO') {
            props.setSystemStatus('CALENTANDO');
            props.addEvent(t('hmi.reactorState.startHeatingEvent'));
        }
    };

    const handleStopSystem = () => {
        if (props.systemStatus === 'ESTABLE' || props.systemStatus === 'CALENTANDO') {
            props.setSystemStatus('ENFRIANDO');
            props.addEvent(t('hmi.reactorState.startCoolingEvent'));
        }
    };

    const handleAlarmConfigChange = (alarmKey: string, field: keyof AlarmConfig, value: string | number | boolean) => {
        props.onAlarmConfigChange(prev => ({
            ...prev,
            [alarmKey]: {
                ...prev[alarmKey],
                [field]: value
            }
        }));
    };
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'controlPanel':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Columna 1 */}
                        <div className="flex flex-col gap-4">
                            <Panel title={t('hmi.mainControl.mainControlPanel')}>
                                <SliderControl 
                                    label={t('hmi.mainControl.targetTemp')}
                                    value={props.hmiState.targetTemp}
                                    onChange={e => props.setHmiState(p => ({...p, targetTemp: Number(e.target.value)}))}
                                    min={350} max={900} step={1} unit="°C"
                                />
                                <SliderControl 
                                    label={t('hmi.mainControl.residenceTime')}
                                    value={props.hmiState.residenceTime}
                                    onChange={e => props.setHmiState(p => ({...p, residenceTime: Number(e.target.value)}))}
                                    min={0.5} max={3600} step={0.5} unit="s"
                                />
                                <SliderControl 
                                    label={t('hmi.mainControl.oxygenConc')}
                                    value={props.hmiState.oxygenConcentration}
                                    onChange={e => props.setHmiState(p => ({...p, oxygenConcentration: Number(e.target.value)}))}
                                    min={0} max={21} step={0.1} unit="%"
                                />
                                <div>
                                    <label className="text-sm text-slate-300">{t('hmi.mainControl.agentMode')}</label>
                                    <select value={props.hmiState.agentMode} onChange={e => props.setHmiState(p => ({...p, agentMode: e.target.value}))} className="w-full mt-1 p-2 bg-slate-700 border border-slate-600 rounded-md">
                                        <option>Manual</option>
                                        <option>Automático (PID)</option>
                                        <option>Auto-Optimización (IA)</option>
                                        <option>Solo Monitoreo</option>
                                    </select>
                                </div>
                            </Panel>
                            <Panel title={t('hmi.mainControl.principalControl')}>
                                <Indicator label={t('hmi.mainControl.mode')} value={props.hmiState.agentMode} />
                                <div className="text-center">
                                    <StatusDisplay status={props.systemStatus} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={handleStartSystem} disabled={props.systemStatus !== 'APAGADO'} className="w-full font-bold py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:bg-slate-600">{t('hmi.reactorState.turnOn').toUpperCase()}</button>
                                    <button onClick={handleStopSystem} disabled={props.systemStatus === 'APAGADO' || props.systemStatus === 'ENFRIANDO'} className="w-full font-bold py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:bg-slate-600">{t('hmi.reactorState.turnOff').toUpperCase()}</button>
                                </div>
                            </Panel>
                        </div>
                        {/* Columna 2 */}
                        <div className="flex flex-col gap-4">
                             <Panel title={t('hmi.reactorConditions.title')}>
                                <Indicator label={t('hmi.reactorConditions.reactorTemp')} value={props.hmiState.reactorTemp.toFixed(2)} unit="°C" />
                                <Indicator label={t('hmi.reactorConditions.wallTemp')} value={props.hmiState.reactorWallTemp.toFixed(2)} unit="°C" />
                                <Indicator label={t('hmi.reactorConditions.pressure')} value={props.hmiState.reactorPressure.toFixed(2)} unit="bar" />
                                <Indicator label={t('hmi.reactorConditions.pyrometer')} value={props.hmiState.pyrometerCoreTemp.toFixed(2)} unit="°C" />
                                <Indicator label={t('hmi.reactorConditions.thermocouple')} value={props.hmiState.thermocoupleCoreTemp.toFixed(2)} unit="°C" />
                            </Panel>
                            <Panel title={t('hmi.storage.title')}>
                                <ProgressBar label={t('hmi.storage.biomassHopperLevel')} value={props.hmiState.biomassHopperLevel} color="#f97316" />
                                <ProgressBar label={t('hmi.storage.bioOilTankLevel')} value={props.hmiState.bioOilTankLevel} color="#22d3ee" />
                                <ProgressBar label={t('hmi.storage.aqueousPhaseTankLevel')} value={props.hmiState.aqueousPhaseTankLevel} color="#3b82f6" />
                                <div className="border-t border-slate-700 my-2"></div>
                                <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.storage.biomassFeeder')}</span><StatusLabel status={props.hmiState.biomassFeederState ? 'ACTIVO' : 'INACTIVO'} /></div>
                                <Indicator label={t('hmi.storage.rpm')} value={props.hmiState.biomassFeederRpm.toFixed(2)} unit="RPM" />
                            </Panel>
                        </div>
                        {/* Columna 3 */}
                        <div className="flex flex-col gap-4">
                            <Panel title={t('hmi.processTimer.title')}>
                                 <Indicator label={t('hmi.processTimer.localTime')} value={props.currentTime.toLocaleTimeString('es-ES')} />
                                 <div className="border-t border-slate-700 pt-2 space-y-1">
                                    <Indicator label={t('hmi.stopwatch.heatingTime')} value={formatTime(props.heatingSeconds)} />
                                    <Indicator label={t('hmi.stopwatch.stableTime')} value={formatTime(props.stableSeconds)} />
                                    <Indicator label={t('hmi.stopwatch.coolingTime')} value={formatTime(props.coolingSeconds)} />
                                 </div>
                                 <div className="grid grid-cols-3 gap-1 mt-2">
                                     <button className="text-xs py-1 bg-slate-600 rounded">Iniciar</button>
                                     <button className="text-xs py-1 bg-slate-600 rounded">Detener</button>
                                     <button className="text-xs py-1 bg-slate-600 rounded">Reiniciar</button>
                                 </div>
                            </Panel>
                             <Panel title={t('hmi.gasAnalysis.title')}>
                                <ProgressBar label="CO" value={props.hmiState.co} color="#ef4444" />
                                <ProgressBar label="CO₂" value={props.hmiState.co2} color="#6b7280" />
                                <ProgressBar label="H₂" value={props.hmiState.h2} color="#3b82f6" />
                                <ProgressBar label="CH₄" value={props.hmiState.ch4} color="#eab308" />
                            </Panel>
                        </div>
                        {/* Columna 4 */}
                        <div className="flex flex-col gap-4">
                            <Panel title={t('hmi.oilProduction.plasticTitle')}>
                                <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.condensation.condenserState')}</span><StatusLabel status={props.hmiState.condenserState} /></div>
                                <Indicator label={t('hmi.condensation.condensateFlow')} value={props.hmiState.condensateFlow.toFixed(2)} unit="L/h" />
                                <Indicator label={t('hmi.condensation.condenserTemp')} value={props.hmiState.condenserTemp.toFixed(2)} unit="°C" />
                                <Indicator label={t('hmi.condensation.coolingPower')} value={props.hmiState.coolingPower.toFixed(2)} unit="kW" onActionClick={() => props.onOpenUtilityWidget(props.hmiState.coolingPower, 'cooling-water', 'kW')} actionIcon={<EuroIcon />} />
                                <div className="h-20 mt-auto">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={props.historyData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                            <defs><linearGradient id="colorCondensate" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient></defs>
                                            <Area type="monotone" dataKey="condensateFlow" stroke="#22d3ee" fillOpacity={1} fill="url(#colorCondensate)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Panel>
                             <Panel title={t('hmi.biocharManagement.title')}>
                                <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.biocharManagement.dischargeSystemState')}</span><StatusLabel status={props.hmiState.dischargeSystemState} /></div>
                                <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.biocharManagement.dischargeValve')}</span><StatusLabel status={props.hmiState.dischargeValve} /></div>
                                <Indicator label={t('hmi.biocharManagement.dischargeRate')} value={props.hmiState.dischargeRate.toFixed(2)} unit="kg/h" />
                                <Indicator label={t('hmi.biocharManagement.biocharTemp')} value={props.hmiState.biocharTemp.toFixed(2)} unit="°C" />
                                <Indicator label={t('hmi.biocharManagement.coolingWaterFlow')} value={props.hmiState.coolingWaterFlow.toFixed(2)} unit="L/min" />
                                <ProgressBar label={t('hmi.biocharManagement.biocharContainerLevel')} value={props.hmiState.biocharContainerLevel} color="#f97316" />
                            </Panel>
                        </div>
                        {/* Columna 5 */}
                        <div className="flex flex-col gap-4">
                            <Panel title={t('hmi.flowFeed.title')}>
                                <EnergyBar value={props.hmiState.energyConsumption} max={10} />
                                <Indicator label={t('hmi.flowFeed.energyConsumption')} value={props.hmiState.energyConsumption.toFixed(2)} unit="kW" />
                                <Indicator label={t('hmi.flowFeed.feedRate')} value={props.hmiState.feedRate.toFixed(2)} unit="kg/h" />
                                <Indicator label={t('hmi.flowFeed.n2Flowmeter')} value={props.hmiState.n2Flow.toFixed(2)} unit="L/min" />
                                <Indicator label={t('hmi.flowFeed.n2LinePressure')} value={props.hmiState.n2Pressure.toFixed(2)} unit="bar" />
                            </Panel>
                            <Panel title={t('hmi.catalyst.title')}>
                                <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.catalyst.systemState')}</span><StatusLabel status={props.hmiState.catalystSystemState} /></div>
                                <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.catalyst.valve')}</span><StatusLabel status={props.hmiState.catalystDoseValve} /></div>
                                <Indicator label={t('hmi.catalyst.actualRate')} value={props.hmiState.catalystDoseActual.toFixed(2)} unit="g/min" />
                                <Indicator label={t('hmi.catalyst.feederRpm')} value={props.hmiState.catalystFeederRpm.toFixed(2)} unit="RPM" />
                                <ProgressBar label={t('hmi.catalyst.catalystHopperLevel')} value={props.hmiState.catalystHopperLevel} color="#8b5cf6" />
                            </Panel>
                             <Panel title={t('hmi.safety.title')}>
                                <Indicator label={t('hmi.safety.ambientO2')} value={props.hmiState.ambientO2.toFixed(2)} unit="%" />
                                <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.safety.inertGasPurge')}</span><StatusLabel status={props.hmiState.inertGasPurge} /></div>
                                <div className="flex-grow flex items-center justify-center pt-2">
                                    <button onClick={() => { props.setSystemStatus('APAGADO'); props.addEvent('PARADA DE EMERGENCIA ACTIVADA'); }} className="w-full h-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-lg shadow-lg">
                                        {t('hmi.safety.emergencyStop')}
                                    </button>
                                </div>
                            </Panel>
                        </div>
                    </div>
                );
            case 'presets':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CO_PRESETS.map(preset => (
                            <div key={preset.name} className="p-6 rounded-lg bg-slate-800 border border-slate-700 flex flex-col gap-4">
                                <h4 className="font-bold text-lg text-white">{preset.name}</h4>
                                <p className="text-sm text-slate-400 italic flex-grow">"{preset.cinematicDescription}"</p>
                                <div className="border-t border-slate-700 pt-3 space-y-2">
                                    <div className="flex justify-between text-sm"><span>Temp. Objetivo:</span> <span className="font-mono">{preset.targetTemp}°C</span></div>
                                    <div className="flex justify-between text-sm"><span>T. Residencia:</span> <span className="font-mono">{preset.residenceTime} s</span></div>
                                    <div className="flex justify-between text-sm"><span>Flujo N₂:</span> <span className="font-mono">{preset.flowN2} L/min</span></div>
                                </div>
                                <button onClick={() => handleApplyPreset(preset)} className="mt-auto w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">
                                    {t('hmi.presets.apply')}
                                </button>
                            </div>
                        ))}
                    </div>
                );
            case 'coldSystems':
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Panel title={t('hmi.condensation.title')}>
                            <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.condensation.condenserState')}</span><StatusLabel status={props.hmiState.condenserState} /></div>
                            <Indicator label={t('hmi.condensation.condensateFlow')} value={props.hmiState.condensateFlow.toFixed(2)} unit="L/h" />
                            <Indicator label={t('hmi.condensation.condenserTemp')} value={props.hmiState.condenserTemp.toFixed(2)} unit="°C" />
                            <Indicator label={t('hmi.condensation.coolingPower')} value={props.hmiState.coolingPower.toFixed(2)} unit="kW" onActionClick={() => props.onOpenUtilityWidget(props.hmiState.coolingPower, 'cooling-water', 'kW')} actionIcon={<EuroIcon />} />
                            <div className="h-40 mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={props.historyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                        <XAxis dataKey="time" hide />
                                        <YAxis domain={[0, 'dataMax + 5']} hide />
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                                        <Line type="monotone" dataKey="condensateFlow" name="Flujo Condensado" stroke="#67e8f9" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <p className="text-center text-xs text-slate-500">{t('hmi.condensation.trend')}</p>
                            </div>
                        </Panel>
                         <Panel title={t('hmi.refrigeration.title')}>
                            <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.refrigeration.systemState')}</span><StatusLabel status={props.hmiState.dischargeSystemState} /></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-slate-400">{t('hmi.refrigeration.coolerState')}</span><StatusLabel status={props.hmiState.coolerState} /></div>
                            <Indicator label={t('hmi.refrigeration.dischargeRate')} value={props.hmiState.dischargeRate.toFixed(2)} unit="kg/h"/>
                            <Indicator label={t('hmi.refrigeration.coolingWaterFlow')} value={props.hmiState.coolingWaterFlow.toFixed(2)} unit="L/min"/>
                            <Indicator label={t('hmi.refrigeration.biocharTemp')} value={props.hmiState.biocharTemp.toFixed(2)} unit="°C"/>
                            <Indicator label={t('hmi.refrigeration.biocharTempCooler')} value={props.hmiState.biocharTempCooler.toFixed(2)} unit="°C"/>
                            <ProgressBar label={t('hmi.biochar.biocharContainerLevel')} value={props.hmiState.biocharContainerLevel} color="#f97316" />
                        </Panel>
                    </div>
                 );
            case 'reports':
                return (
                    <div>
                        <div className="mb-4 border-b border-slate-700">
                            <nav className="-mb-px flex space-x-4">
                                <button onClick={() => setActiveReportSubTab('full')} className={`py-2 px-3 font-medium text-sm rounded-t-md ${activeReportSubTab === 'full' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>{t('hmi.reports.fullSystemReport')}</button>
                                <button onClick={() => setActiveReportSubTab('live')} className={`py-2 px-3 font-medium text-sm rounded-t-md ${activeReportSubTab === 'live' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>{t('hmi.reports.liveLogs')}</button>
                                <button onClick={() => setActiveReportSubTab('export')} className={`py-2 px-3 font-medium text-sm rounded-t-md ${activeReportSubTab === 'export' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>{t('hmi.reports.exportData')}</button>
                            </nav>
                        </div>
                        {activeReportSubTab === 'full' && (
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                                <Panel title="Control Principal">
                                    <Indicator label="Temperatura Objetivo" value={props.hmiState.targetTemp.toFixed(2)} unit="°C" />
                                    <Indicator label="Tiempo Residencia" value={props.hmiState.residenceTime.toFixed(2)} unit="s" />
                                    <Indicator label="Conc. Oxígeno" value={props.hmiState.oxygenConcentration.toFixed(2)} unit="%" />
                                    <Indicator label="Modo del Agente" value={props.hmiState.agentMode} />
                                    <div className="flex justify-between items-center"><span className="text-sm text-slate-400">Estado del Sistema</span><StatusLabel status={props.systemStatus} /></div>
                                </Panel>
                                <Panel title="Condiciones del Reactor">
                                    <Indicator label="Temp. Reactor" value={props.hmiState.reactorTemp.toFixed(2)} unit="°C" />
                                    <Indicator label="Temp. Panel Reactor" value={props.hmiState.reactorWallTemp.toFixed(2)} unit="°C" />
                                    <Indicator label="Presión del Reactor" value={props.hmiState.reactorPressure.toFixed(2)} unit="bar" />
                                    <Indicator label="Pirómetro (Núcleo)" value={props.hmiState.pyrometerCoreTemp.toFixed(2)} unit="°C" />
                                    <Indicator label="Termopar (Núcleo)" value={props.hmiState.thermocoupleCoreTemp.toFixed(2)} unit="°C" />
                                </Panel>
                                <Panel title="Flujo y Alimentación">
                                    <Indicator label="Consumo Energético" value={props.hmiState.energyConsumption.toFixed(2)} unit="kW" />
                                    <Indicator label="Tasa de Alimentación" value={props.hmiState.feedRate.toFixed(2)} unit="kg/h" />
                                    <Indicator label="Caudal Vapores Sal." value={props.hmiState.vaporFlow.toFixed(2)} unit="kg/h" />
                                    <Indicator label="Caudalímetro N₂" value={props.hmiState.n2Flow.toFixed(2)} unit="L/min" />
                                    <Indicator label="Presión Línea N₂" value={props.hmiState.n2Pressure.toFixed(2)} unit="bar" />
                                </Panel>
                                <Panel title="Sistema de Condensación (Líquido)">
                                    <div className="flex justify-between items-center"><span className="text-sm text-slate-400">Estado</span><StatusLabel status={props.hmiState.condenserState} /></div>
                                    <Indicator label="Flujo" value={props.hmiState.condensateFlow.toFixed(2)} unit="L/h" />
                                    <Indicator label="Temp." value={props.hmiState.condenserTemp.toFixed(2)} unit="°C" />
                                </Panel>
                                <Panel title="Manejo de Biochar">
                                    <div className="flex justify-between items-center"><span className="text-sm text-slate-400">Estado</span><StatusLabel status={props.hmiState.dischargeSystemState} /></div>
                                    <div className="flex justify-between items-center"><span className="text-sm text-slate-400">Válvula</span><StatusLabel status={props.hmiState.dischargeValve} /></div>
                                    <Indicator label="Tasa" value={props.hmiState.dischargeRate.toFixed(2)} unit="kg/h" />
                                </Panel>
                                <Panel title="Sistema de Seguridad">
                                    <h5 className="font-bold text-sm text-slate-300">Análisis de Gas</h5>
                                    <div className="pl-4">
                                        <Indicator label="CO" value={props.hmiState.co.toFixed(2)} unit="%" />
                                        <Indicator label="CO₂" value={props.hmiState.co2.toFixed(2)} unit="%" />
                                    </div>
                                    <h5 className="font-bold text-sm text-slate-300 pt-2 border-t border-slate-700">Seguridad</h5>
                                     <div className="pl-4">
                                        <Indicator label="Detector O₂ (Ambiente)" value={props.hmiState.ambientO2.toFixed(2)} unit="%" />
                                    </div>
                                </Panel>
                             </div>
                        )}
                        {activeReportSubTab === 'live' && (
                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Panel title={t('hmi.reports.minuteLogTitle')}>
                                    <div className="h-96 overflow-y-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-slate-400 uppercase bg-slate-700 sticky top-0">
                                                <tr>
                                                    <th className="p-2">{t('hmi.reports.time')}</th>
                                                    <th className="p-2 text-right">{t('hmi.reports.reactorTemp')}</th>
                                                    <th className="p-2 text-right">{t('hmi.reports.reactorPressure')}</th>
                                                    <th className="p-2 text-right">{t('hmi.reports.feedRate')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="font-mono text-slate-200">
                                                {[...props.minuteLog].reverse().map((log, i) => (
                                                    <tr key={i} className="border-b border-slate-700">
                                                        <td className="p-2">{log.time}</td>
                                                        <td className="p-2 text-right">{log.reactorTemp.toFixed(2)}</td>
                                                        <td className="p-2 text-right">{log.reactorPressure.toFixed(2)}</td>
                                                        <td className="p-2 text-right">{log.feedRate.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Panel>
                                <Panel title={t('hmi.reports.eventLogTitle')}>
                                     <div className="h-96 overflow-y-auto font-mono text-sm space-y-1 text-slate-200">
                                        {props.events.map((event, i) => <p key={i} className="whitespace-pre-wrap">{event}</p>)}
                                     </div>
                                </Panel>
                            </div>
                        )}
                         {activeReportSubTab === 'export' && (
                             <Panel title={t('hmi.reports.exportData')}>
                                <div className="flex items-center justify-center h-full">
                                    <button onClick={handleExportMinuteLog} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                                        {t('hmi.reports.exportMinuteLogCSV')}
                                    </button>
                                </div>
                             </Panel>
                        )}
                    </div>
                );
            case 'trends':
                const chartData = props.minuteLog.slice(-30).map((d, i) => ({
                    name: i + 1,
                    time: d.time,
                    'Tasa de Alimentación': d.feedRate,
                    'Flujo de Condensado': d.condensateFlow,
                    'Presión': d.reactorPressure,
                }));

                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                        <div className="lg:col-span-2">
                            <Panel title={t('hmi.trends.flowRates')}>
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                        <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                        <YAxis domain={[0, 'dataMax + 5']} tick={{ fill: '#9ca3af', fontSize: 12 }}>
                                            <Label value={t('hmi.trends.flowAxis')} angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#9ca3af' }} />
                                        </YAxis>
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                                        <Legend />
                                        <Line type="monotone" dataKey="Tasa de Alimentación" name={t('hmi.flowFeed.feedRate')} stroke="#f97316" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="Flujo de Condensado" name={t('hmi.condensation.condensateFlow')} stroke="#38bdf8" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Panel>
                        </div>
                        <div className="lg:col-span-2">
                             <Panel title={t('hmi.trends.reactorPressure')}>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={chartData}>
                                         <defs>
                                            <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                        <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                        <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} tick={{ fill: '#9ca3af', fontSize: 12 }}>
                                             <Label value={t('hmi.trends.pressureAxis')} angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#9ca3af' }} />
                                        </YAxis>
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                                        <Legend />
                                        <Area type="monotone" dataKey="Presión" name={t('hmi.trends.pressureAxis')} stroke="#ef4444" fill="url(#colorPressure)" fillOpacity={1} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Panel>
                        </div>
                        <div className="lg:col-span-2">
                            <Panel title={t('hmi.profitability.title')}>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-sm text-slate-400">{t('hmi.profitability.opex')}</p>
                                        <p className="text-2xl font-bold font-mono text-orange-400">{opex.toFixed(2)} <span className="text-lg text-slate-300">€/hr</span></p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">{t('hmi.profitability.revenue')}</p>
                                        <p className="text-2xl font-bold font-mono text-green-400">{revenue.toFixed(2)} <span className="text-lg text-slate-300">€/hr</span></p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">{t('hmi.profitability.profit')}</p>
                                        <p className="text-2xl font-bold font-mono text-cyan-400">{(annualProfit / 1000).toFixed(2)} <span className="text-lg text-slate-300">k€/año</span></p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">{t('hmi.profitability.roi')}</p>
                                        <p className="text-2xl font-bold font-mono text-cyan-400">{roi.toFixed(2)} <span className="text-lg text-slate-300">%</span></p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">{t('hmi.profitability.payback')}</p>
                                        <p className="text-2xl font-bold font-mono text-cyan-400">{payback > 0 ? payback.toFixed(2) : 'N/A'} <span className="text-lg text-slate-300">años</span></p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-slate-400">{t('hmi.profitability.capex')}</p>
                                        <p className="text-2xl font-bold font-mono text-slate-300">{(CAPEX / 1_000_000).toFixed(2)} <span className="text-lg text-slate-400">M€</span></p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    </div>
                );
            case 'cinematicView':
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                             <Panel title={t('hmi.cinematicView.sceneConfig')}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="sim-status" className="text-sm font-semibold">{t('hmi.cinematicView.simulatedStatus')}</label>
                                        <select id="sim-status" value={cinematicSceneConfig.status} onChange={e => setCinematicSceneConfig(prev => ({...prev, status: e.target.value as HMIStatus}))} className="w-full p-2 mt-1 bg-slate-700 border border-slate-600 rounded-md">
                                            <option value="APAGADO">{t('hmi.reactorStatus.inactivo')}</option>
                                            <option value="CALENTANDO">{t('hmi.reactorStatus.arrancando')}</option>
                                            <option value="ESTABLE">{t('hmi.reactorStatus.estable')}</option>
                                            <option value="ENFRIANDO">{t('hmi.reactorStatus.enfriando')}</option>
                                        </select>
                                    </div>
                                     <div>
                                        <label htmlFor="sim-temp" className="text-sm font-semibold">{t('hmi.cinematicView.simulatedTemp')} ({cinematicSceneConfig.temp.toFixed(0)}°C)</label>
                                        <input type="range" id="sim-temp" min="25" max="900" value={cinematicSceneConfig.temp} onChange={e => setCinematicSceneConfig(prev => ({...prev, temp: Number(e.target.value)}))} className="w-full mt-1 accent-blue-500" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-semibold mb-2">{t('hmi.cinematicView.additionalElements')}</h5>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={pelletSystemVisible} onChange={e => setPelletSystemVisible(e.target.checked)} className="w-4 h-4 rounded text-blue-500 bg-slate-700 border-slate-600 focus:ring-blue-500"/><span>{t('hmi.cinematicView.pelletSystem')}</span></label>
                                            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={personnelVisible} onChange={e => setPersonnelVisible(e.target.checked)} className="w-4 h-4 rounded text-blue-500 bg-slate-700 border-slate-600 focus:ring-blue-500"/><span>{t('hmi.cinematicView.personnel')}</span></label>
                                            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={ambienceVisible} onChange={e => setAmbienceVisible(e.target.checked)} className="w-4 h-4 rounded text-blue-500 bg-slate-700 border-slate-600 focus:ring-blue-500"/><span>{t('hmi.cinematicView.ambience')}</span></label>
                                        </div>
                                    </div>
                                    <button onClick={handleGenerateCinematicPrompt} className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">{t('hmi.cinematicView.generatePrompt')}</button>
                                </div>
                            </Panel>
                            <Panel title={t('hmi.cinematicView.cinematicCreation')}>
                                <textarea
                                    value={cinematicPrompt}
                                    onChange={(e) => setCinematicPrompt(e.target.value)}
                                    rows={8}
                                    className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 font-mono text-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder={t('hmi.cinematicView.promptPlaceholder')}
                                />
                                {isVeoEnabled ? (
                                    <div className="flex gap-4">
                                        <button onClick={handleGenerateVideo} disabled={isGeneratingCinematic} className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 disabled:bg-slate-600">{t('hmi.cinematicView.createVideo')}</button>
                                        <button onClick={handleGenerateImage} disabled={isGeneratingCinematic} className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600">{t('hmi.cinematicView.generateImage')}</button>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-slate-900/50 rounded-lg text-center">
                                        <h4 className="font-semibold text-white">{t('hmi.cinematicView.enableVideoTitle')}</h4>
                                        <p className="text-sm text-slate-400 my-2">{t('hmi.cinematicView.enableVideoDesc')}</p>
                                        <button onClick={async () => { if (window.aistudio) { await window.aistudio.openSelectKey(); setIsVeoEnabled(true); } }} className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700">
                                            {t('hmi.cinematicView.selectApiKey')}
                                        </button>
                                         <p className="text-xs text-slate-500 mt-2">
                                            {t('hmi.cinematicView.billingInfo')} <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{t('hmi.cinematicView.billingLink')}</a>.
                                        </p>
                                    </div>
                                )}
                            </Panel>
                        </div>
                        <Panel title={t('hmi.cinematicView.cinematicVisualization')}>
                             <div className="flex items-center justify-center bg-black rounded-md min-h-[300px] h-full">
                                {isGeneratingCinematic ? (
                                    <div className="text-center">
                                        <svg className="animate-spin h-8 w-8 text-blue-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        <p className="mt-2 text-sm text-slate-400">{videoStatusMessageKey ? t(videoStatusMessageKey) : t('hmi.cinematicView.generating')}</p>
                                        {videoProgress > 0 && <div className="w-32 bg-slate-700 rounded-full h-2 mt-2 mx-auto"><div className="bg-blue-500 h-2 rounded-full" style={{width: `${videoProgress}%`}}></div></div>}
                                    </div>
                                ) : cinematicError ? (
                                    <p className="text-red-400 text-center p-4">{cinematicError}</p>
                                ) : cinematicResult ? (
                                    cinematicResult.type === 'image' ? (
                                        <img src={cinematicResult.url} alt="Cinematic Visualization" className="max-h-full max-w-full rounded-md" />
                                    ) : (
                                        <video src={cinematicResult.url} controls autoPlay loop className="max-h-full max-w-full rounded-md" />
                                    )
                                ) : (
                                    <p className="text-slate-500">{t('hmi.cinematicView.visualizationPlaceholder')}</p>
                                )}
                             </div>
                        </Panel>
                    </div>
                );
            case 'preventiveSecurity':
                const alarmSoundOptions = [
                    t('hmi.preventiveSecurity.beepShort'),
                    t('hmi.preventiveSecurity.beepContinuous'),
                    t('hmi.preventiveSecurity.sirenIntermittent'),
                    t('hmi.preventiveSecurity.voiceAlert')
                ];
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold">{t('hmi.preventiveSecurity.title')}</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                             <Panel title={t('hmi.preventiveSecurity.electricalSafetyTitle')}>
                                <Indicator label={t('hmi.preventiveSecurity.groundingCheck')} value={<StatusLabel status={props.hmiState.groundingStatus} />} />
                                <Indicator label={t('hmi.preventiveSecurity.insulationIntegrity')} value={props.hmiState.insulationIntegrity.toFixed(2)} unit="%" />
                                <button onClick={props.runElectricalDiagnostics} disabled={props.isDiagnosing} className="w-full bg-cyan-600 text-white font-bold py-2 rounded-lg hover:bg-cyan-700 disabled:bg-slate-600">
                                    {props.isDiagnosing ? t('hmi.preventiveSecurity.diagnosticsRunning') : t('hmi.preventiveSecurity.runDiagnostics')}
                                </button>
                            </Panel>
                            {Object.entries(props.alarmConfigs).slice(0, 2).map(([key, config]: [string, AlarmConfig]) => (
                                <Panel title={t(`hmi.preventiveSecurity.${key}Alarm`)} key={key}>
                                    <label className="flex items-center gap-2"><input type="checkbox" checked={config.enabled} onChange={e => handleAlarmConfigChange(key, 'enabled', e.target.checked)} /> Activar Alarma</label>
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-400">{t('hmi.preventiveSecurity.mediumPriority')}</label>
                                        <div className="flex gap-2">
                                            <input type="number" value={config.med} onChange={e => handleAlarmConfigChange(key, 'med', Number(e.target.value))} className="w-full bg-slate-700 p-1 rounded-md" />
                                            <select value={config.medSound} onChange={e => handleAlarmConfigChange(key, 'medSound', e.target.value)} className="w-full bg-slate-700 p-1 rounded-md"><option>{t('hmi.preventiveSecurity.beepShort')}</option></select>
                                        </div>
                                    </div>
                                     <div className="space-y-1">
                                        <label className="text-xs text-slate-400">{t('hmi.preventiveSecurity.highPriority')}</label>
                                        <div className="flex gap-2">
                                            <input type="number" value={config.high} onChange={e => handleAlarmConfigChange(key, 'high', Number(e.target.value))} className="w-full bg-slate-700 p-1 rounded-md" />
                                            <select value={config.highSound} onChange={e => handleAlarmConfigChange(key, 'highSound', e.target.value)} className="w-full bg-slate-700 p-1 rounded-md">{alarmSoundOptions.map(s => <option key={s}>{s}</option>)}</select>
                                        </div>
                                    </div>
                                     <div className="space-y-1">
                                        <label className="text-xs text-slate-400">{t('hmi.preventiveSecurity.criticalPriority')}</label>
                                        <div className="flex gap-2">
                                            <input type="number" value={config.crit} onChange={e => handleAlarmConfigChange(key, 'crit', Number(e.target.value))} className="w-full bg-slate-700 p-1 rounded-md" />
                                            <select value={config.critSound} onChange={e => handleAlarmConfigChange(key, 'critSound', e.target.value)} className="w-full bg-slate-700 p-1 rounded-md">{alarmSoundOptions.map(s => <option key={s}>{s}</option>)}</select>
                                        </div>
                                    </div>
                                </Panel>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                             {Object.entries(props.alarmConfigs).slice(2, 4).map(([key, config]: [string, AlarmConfig]) => (
                                <Panel title={t(`hmi.preventiveSecurity.${key}Alarm`)} key={key}>
                                     <label className="flex items-center gap-2"><input type="checkbox" checked={config.enabled} onChange={e => handleAlarmConfigChange(key, 'enabled', e.target.checked)} /> Activar Alarma</label>
                                    <div className="space-y-1">
                                        <label className="text-xs text-slate-400">{t('hmi.preventiveSecurity.mediumPriority')}</label>
                                        <div className="flex gap-2">
                                            <input type="number" value={config.med} onChange={e => handleAlarmConfigChange(key, 'med', Number(e.target.value))} className="w-full bg-slate-700 p-1 rounded-md" />
                                            <select value={config.medSound} onChange={e => handleAlarmConfigChange(key, 'medSound', e.target.value)} className="w-full bg-slate-700 p-1 rounded-md">{alarmSoundOptions.map(s => <option key={s}>{s}</option>)}</select>
                                        </div>
                                    </div>
                                </Panel>
                            ))}
                        </div>
                    </div>
                );
            case 'materialsCatalysts':
                 const comp = selectedFeedstock && 'propiedades' in selectedFeedstock ? (selectedFeedstock.propiedades as any).composicion : null;
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Panel title={t('hmi.materialsCatalysts.feedstockSelection')}>
                            <label className="text-sm">{t('hmi.materialsCatalysts.baseFeedstock')}</label>
                            <select value={props.selectedFeedstockId} onChange={e => props.onFeedstockChange(Number(e.target.value))} className="w-full bg-slate-700 p-2 rounded-md">
                                {PYROLYSIS_MATERIALS.filter(m => m.fase === 'Sólido').map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                            </select>
                            {selectedFeedstock && 'propiedades' in selectedFeedstock && (
                                <div className="pt-2 border-t border-slate-700">
                                    <h5 className="font-semibold mb-2">{t('hmi.materialsCatalysts.materialProperties')}</h5>
                                    <Indicator label={t('hmi.materialsCatalysts.heatingValue')} value={(selectedFeedstock.propiedades as any).poderCalorificoSuperior?.toFixed(2) ?? 'N/A'} unit="MJ/kg" />
                                    <Indicator label={t('hmi.materialsCatalysts.cellulose')} value={comp?.celulosa?.toFixed(2) ?? 'N/A'} unit="%" />
                                    <Indicator label={t('hmi.materialsCatalysts.hemicellulose')} value={comp?.hemicelulosa?.toFixed(2) ?? 'N/A'} unit="%" />
                                    <Indicator label={t('hmi.materialsCatalysts.lignin')} value={comp?.lignina?.toFixed(2) ?? 'N/A'} unit="%" />
                                </div>
                            )}
                        </Panel>
                        <Panel title={t('hmi.materialsCatalysts.catalystSelection')}>
                             <label className="text-sm">{t('hmi.materialsCatalysts.catalyst')}</label>
                            <select value={props.selectedCatalystId} onChange={e => props.onCatalystChange(e.target.value)} className="w-full bg-slate-700 p-2 rounded-md">
                                {SIMULATION_ENGINE.catalysts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                            </select>
                             {selectedCatalyst && (
                                <div className="pt-2 border-t border-slate-700">
                                    <h5 className="font-semibold mb-2">{t('hmi.materialsCatalysts.catalystDescription')}</h5>
                                    <p className="text-sm text-slate-300">{selectedCatalyst.descripcion}</p>
                                </div>
                             )}
                        </Panel>
                    </div>
                );
            case 'scenarioConfigurator':
                return (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Panel title={t('hmi.scenarioConfigurator.creationConfig')}>
                            <label className="text-sm">{t('hmi.scenarioConfigurator.operationPreset')}</label>
                            <select onChange={e => { const p = CO_PRESETS.find(pr => pr.name === e.target.value); if(p) handleApplyPreset(p); }} className="w-full bg-slate-700 p-2 rounded-md">
                                <option>{t('hmi.scenarioConfigurator.selectPreset')}</option>
                                {CO_PRESETS.map(p => <option key={p.name}>{p.name}</option>)}
                            </select>
                        </Panel>
                        <Panel title={t('hmi.scenarioConfigurator.failureScenarios')}>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => props.setIsCondenserObstructed(p => !p)} className={`p-4 rounded-lg font-semibold ${props.isCondenserObstructed ? 'bg-red-600' : 'bg-orange-600 hover:bg-orange-700'}`}>{t('hmi.scenarioConfigurator.simulateCondenserObstruction')}</button>
                                <button onClick={() => props.setIsGasLineObstructed(p => !p)} className={`p-4 rounded-lg font-semibold ${props.isGasLineObstructed ? 'bg-red-600' : 'bg-orange-600 hover:bg-orange-700'}`}>{t('hmi.scenarioConfigurator.simulateGasLineObstruction')}</button>
                                <button onClick={() => props.setIsTempSensorFailed(p => !p)} className={`p-4 rounded-lg font-semibold ${props.isTempSensorFailed ? 'bg-red-600' : 'bg-orange-600 hover:bg-orange-700'}`}>{t('hmi.scenarioConfigurator.simulateThermocoupleFailure')}</button>
                                <button onClick={() => props.setIsBiomassContaminated(p => !p)} className={`p-4 rounded-lg font-semibold ${props.isBiomassContaminated ? 'bg-red-600' : 'bg-orange-600 hover:bg-orange-700'}`}>{t('hmi.scenarioConfigurator.simulateBiomassContamination')}</button>
                            </div>
                        </Panel>
                    </div>
                );
            case 'pidConfiguration':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Panel title={t('hmi.pidConfiguration.tempControllerTitle')}>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm flex justify-between"><span>{t('hmi.pidConfiguration.proportionalGain')}</span><span className="font-mono">{props.pidGains.kp.toFixed(2)}</span></label>
                                    <input type="range" min="0.1" max="5" step="0.1" value={props.pidGains.kp} onChange={e => props.onPidChange(p => ({...p, kp: Number(e.target.value)}))} className="w-full accent-green-500" />
                                </div>
                                <div>
                                    <label className="text-sm flex justify-between"><span>{t('hmi.pidConfiguration.integralGain')}</span><span className="font-mono">{props.pidGains.ki.toFixed(3)}</span></label>
                                    <input type="range" min="0.01" max="0.5" step="0.01" value={props.pidGains.ki} onChange={e => props.onPidChange(p => ({...p, ki: Number(e.target.value)}))} className="w-full accent-blue-500" />
                                </div>
                                <div>
                                    <label className="text-sm flex justify-between"><span>{t('hmi.pidConfiguration.derivativeGain')}</span><span className="font-mono">{props.pidGains.kd.toFixed(2)}</span></label>
                                    <input type="range" min="0.0" max="2" step="0.05" value={props.pidGains.kd} onChange={e => props.onPidChange(p => ({...p, kd: Number(e.target.value)}))} className="w-full accent-purple-500" />
                                </div>
                            </div>
                        </Panel>
                         <Panel title={t('hmi.pidConfiguration.systemResponseTitle')}>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={pidErrorData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                        <XAxis dataKey="time" hide />
                                        <YAxis domain={[-50, 50]}>
                                            <Label value={t('hmi.pidConfiguration.errorAxis')} angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#9ca3af' }} />
                                        </YAxis>
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                                        <Legend verticalAlign="top" height={36}/>
                                        <Area type="monotone" dataKey="error" name={t('hmi.pidConfiguration.errorLegend')} stroke="#f87171" fill="#f87171" fillOpacity={0.3} />
                                        <Line type="monotone" dataKey="setpoint" name={t('hmi.pidConfiguration.setpointLegend')} stroke="#4ade80" strokeDasharray="5 5" dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                             <p className="text-xs text-slate-500 text-center mt-2">{t('hmi.pidConfiguration.last100Seconds')}</p>
                        </Panel>
                    </div>
                );
            default:
                return <div className="text-center text-slate-400 p-8">{t('hmi.placeholder.contentToBeBuilt', { tabName: activeTab })}</div>;
        }
    };

    return (
        <div className="bg-slate-900 text-white min-h-full p-6 font-sans flex flex-col">
            <header className="text-center mb-6 relative">
                <h2 className="text-3xl font-bold">{t('hmi.title')}</h2>
                <p className="mt-1 text-md text-slate-400">{t('hmi.subtitle')}</p>
                <button onClick={() => props.setView('hyperion-9')} className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-2 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors px-4 py-2 rounded-lg text-sm font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {t('hmi.backToHyperion')}
                </button>
            </header>
            
            <div className="border-b border-slate-700">
                <nav className="-mb-px flex space-x-4 overflow-x-auto">
                    {mainTabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`}>
                            {t(tab.nameKey)}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="border-b border-slate-700 mb-6 bg-slate-800/20 -mx-6 px-6">
                 <nav className="flex space-x-4">
                    {configTabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-2 px-2 font-medium text-xs ${activeTab === tab.id ? 'border-b-2 border-yellow-400 text-yellow-300' : 'text-slate-400 hover:text-white'}`}>
                            {t(tab.nameKey)}
                        </button>
                    ))}
                </nav>
            </div>

            <main className="flex-grow mt-2 animate-fade-in">
                {renderTabContent()}
            </main>
             <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};