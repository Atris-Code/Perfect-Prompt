import React, { useState, useEffect, useCallback, useMemo } from 'react';
// FIX: Removed AIStudio from type imports as it is a global type and does not need to be explicitly imported.
import type { View, VulcanoState, Task, UtilityDutyType, VulcanoMachineStatus } from '../../types';
import { ContentType } from '../../types';
import { FLEET_VEHICLES } from '../../data/fleetVehicles';
import { FormSelect, FormInput, FormTextarea } from '../form/FormControls';
import { useTranslations } from '../../contexts/LanguageContext';
import { useUtilityCosts } from '../../contexts/UtilityCostContext';
import { generateCinematicImage, generateCinematicVideo } from '../../services/geminiService';

// --- Reusable UI Components (for consistency) ---
const Panel: React.FC<React.PropsWithChildren<{ title: string; className?: string }>> = ({ title, children, className }) => (
    <div className={`p-4 rounded-lg bg-slate-800 border border-slate-700 h-full flex flex-col ${className}`}>
        <h4 className="text-lg font-bold mb-3 text-cyan-400">{title}</h4>
        <div className="space-y-3 flex-grow flex flex-col justify-around">
            {children}
        </div>
    </div>
);

const KpiGauge: React.FC<{ value: number; label: string; }> = ({ value, label }) => {
    const percentage = Math.min(100, Math.max(0, value));
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    const color = percentage >= 75 ? '#f87171' : percentage >= 40 ? '#facc15' : '#4ade80';

    return (
        <div className="flex flex-col items-center">
            <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="10" />
                <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                />
                <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="24" fontWeight="bold" fill="white">
                    {value.toFixed(0)}
                </text>
            </svg>
            <span className="text-sm font-semibold mt-2 text-gray-400">{label}</span>
        </div>
    );
};

const ProgressBar: React.FC<{ value: number; max: number; label?: string; unit?: string }> = ({ value, max, label, unit = 'kg' }) => (
    <div>
        {label && <p className="text-xs text-slate-400">{label}</p>}
        <div className="w-full bg-slate-600 rounded-full h-4 relative overflow-hidden">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(value / max) * 100}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {value.toFixed(1)} / {max.toLocaleString('de-DE')} {unit}
            </div>
        </div>
    </div>
);


// Component Props
interface VulcanoProps {
    vulcanoState: VulcanoState;
    setVulcanoState: React.Dispatch<React.SetStateAction<VulcanoState>>;
    setView: (view: View) => void;
    onNavigateToUtilities: (context: { demands: { [key in UtilityDutyType]?: number }; tab: UtilityDutyType }) => void;
    onSaveTask: (task: Task) => void;
}

const VULCANO_ELECTRICAL_DEMAND_KW = 648;

const getIcon = (machineKey: keyof VulcanoState['machines'], isJammed: boolean) => {
    const iconClasses = `h-10 w-10 transition-colors ${isJammed ? 'text-red-400' : 'text-slate-400'}`;
    switch(machineKey) {
        case 'debeader': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
        case 'primaryShredder': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5.6 10.6 12.8 0"/><path d="m5.6 13.4 12.8 0"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 2h14"/><path d="M5 22h14"/><path d="M9 2v20"/><path d="M15 2v20"/></svg>;
        case 'rasperMill': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
        case 'granulators': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>;
        case 'magneticSeparators': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>;
        case 'textileClassifiers': return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>;
        default: return null;
    }
};

const ProcessLine: React.FC<{ vulcanoState: VulcanoState }> = ({ vulcanoState }) => {
    const { t } = useTranslations();
    const { machines, processingRateTiresPerHour, outputPurity, isRunning } = vulcanoState;

    const StatusBadge: React.FC<{ status: 'OK' | 'ATASCO' | 'APAGADO' }> = ({ status }) => {
        const styles = {
            OK: 'bg-green-500/20 text-green-300 ring-1 ring-inset ring-green-500/30',
            ATASCO: 'bg-red-500/20 text-red-300 ring-1 ring-inset ring-red-500/30 animate-pulse',
            APAGADO: 'bg-slate-500/20 text-slate-300 ring-1 ring-inset ring-slate-500/30',
        };
        const icons = {
            OK: <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>,
            ATASCO: <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /></svg>,
            APAGADO: <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
        }
        // FIX: The key was being generated incorrectly from the status value. The key for 'ATASCO' is 'jam' and for 'APAGADO' is 'off' in the translation file.
        const statusKeyPart = status === 'ATASCO' ? 'jam' : status === 'APAGADO' ? 'off' : 'ok';
        const labelKey = `vulcano.status.${statusKeyPart}`;
        const label = t(labelKey);
        
        return (
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full flex items-center justify-center gap-1.5 ${styles[status]}`}>
                {icons[status]}
                {label}
            </span>
        );
    };

    const machineLine: (keyof VulcanoState['machines'])[] = [ 'debeader', 'primaryShredder', 'rasperMill', 'granulators' ];
    const separatorLine: (keyof VulcanoState['machines'])[] = [ 'magneticSeparators', 'textileClassifiers' ];

    const getMachineName = (key: keyof VulcanoState['machines']) => t(`vulcano.${key}`);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-sm text-slate-400">{t('vulcano.processingRate')}</p>
                    <p className="text-2xl font-mono font-bold">{isRunning ? processingRateTiresPerHour.toFixed(0) : '0'}</p>
                    <p className="text-xs text-slate-500">{t('vulcano.tiresPerHour')}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400">{t('vulcano.outputPurity')}</p>
                    <p className="text-2xl font-mono font-bold text-green-400">{isRunning ? outputPurity.gcr.toFixed(1) : '0.0'}%</p>
                    <p className="text-xs text-slate-500">{t('vulcano.gcr')}</p>
                </div>
            </div>
            
            <div className="space-y-4">
                {/* Main Processing Line */}
                <div className="flex items-center gap-2">
                    {machineLine.map((key, i) => (
                        <React.Fragment key={key}>
                            <div className="flex flex-col items-center gap-2 flex-1">
                                {getIcon(key, machines[key] === 'ATASCO')}
                                <div className="text-center">
                                    <p className="text-xs font-semibold">{getMachineName(key)}</p>
                                    <StatusBadge status={machines[key]} />
                                </div>
                            </div>
                            {i < machineLine.length - 1 && <div className="text-2xl text-slate-500 font-light">→</div>}
                        </React.Fragment>
                    ))}
                </div>
                
                {/* Separator Lines */}
                <div className="pt-4 mt-4 border-t border-slate-700 flex justify-around">
                    {separatorLine.map(key => (
                        <div key={key} className="flex flex-col items-center gap-2">
                            {getIcon(key, machines[key] === 'ATASCO')}
                            <div className="text-center">
                                <p className="text-xs font-semibold">{getMachineName(key)}</p>
                                <StatusBadge status={machines[key]} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Vulcano: React.FC<VulcanoProps> = ({ vulcanoState, setVulcanoState, setView, onNavigateToUtilities, onSaveTask }) => {
    const { t } = useTranslations();
    const { costs } = useUtilityCosts();
    const [hefestosLog, setHefestosLog] = useState<string[]>([]);
    
    const handleToggleSystem = () => {
        setVulcanoState(p => ({ ...p, isRunning: !p.isRunning }));
    };

    const handleAnalyzeEnergyCost = () => {
        onNavigateToUtilities({ 
            demands: { 'process-power': VULCANO_ELECTRICAL_DEMAND_KW }, 
            tab: 'process-power' 
        });
    };

    const handleCreateReport = () => {
        const task: Task = {
            id: `task-vulcano-report-${Date.now()}`,
            title: `Reporte de Producción Vulcano - ${new Date().toLocaleDateString()}`,
            createdAt: Date.now(),
            status: 'Por Hacer',
            contentType: ContentType.Texto,
            eventType: 'ExecutiveReport',
            formData: {
                objective: `Generar un reporte ejecutivo sobre la producción y viabilidad del módulo Vulcano.`,
                specifics: {
                    [ContentType.Texto]: {
                        rawData: `Producción (kg/h): GCR=${vulcanoState.productionRateKgPerHour.gcr.toFixed(1)}, Acero=${vulcanoState.productionRateKgPerHour.steel.toFixed(1)}, Fibra=${vulcanoState.productionRateKgPerHour.fiber.toFixed(1)}.\nRiesgo de Incendio: ${vulcanoState.fireRisk.toFixed(1)}%`
                    },
                    [ContentType.Imagen]: {},
                    [ContentType.Video]: {},
                    [ContentType.Audio]: {},
                    [ContentType.Codigo]: {},
                }
            }
        };
        onSaveTask(task);
        alert('Tarea "Reporte de Producción y Viabilidad" creada en el Gestor de Tareas.');
    };

    return (
        <div className="bg-slate-900 text-white p-6 rounded-lg shadow-2xl">
            <header className="text-center mb-6 border-b border-slate-700 pb-4">
                <div className="flex justify-center items-center gap-4">
                    <h2 className="text-3xl font-bold">{t('vulcano.title')}</h2>
                    <div className="flex items-center">
                        <input id="system-toggle" type="checkbox" checked={vulcanoState.isRunning} onChange={handleToggleSystem} className="sr-only" />
                        <label htmlFor="system-toggle" className={`relative inline-flex items-center h-8 w-16 cursor-pointer rounded-full transition-colors ${vulcanoState.isRunning ? 'bg-green-500' : 'bg-red-500'}`}>
                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${vulcanoState.isRunning ? 'translate-x-9' : 'translate-x-1'}`}/>
                        </label>
                         <span className={`ml-3 font-bold text-lg ${vulcanoState.isRunning ? 'text-green-400' : 'text-red-400'}`}>{vulcanoState.isRunning ? 'OPERATIVO' : 'DETENIDO'}</span>
                    </div>
                </div>
                <p className="mt-2 text-md text-slate-400">{t('vulcano.subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Panel title={t('vulcano.receptionTitle')}>
                        <div>
                            <label className="text-sm text-slate-400">{t('vulcano.inputLabel')}</label>
                            <input type="number" value={vulcanoState.inputTonsPerDay} onChange={(e) => setVulcanoState(p => ({...p, inputTonsPerDay: Number(e.target.value)}))} className="w-full bg-slate-700 p-2 rounded-md mt-1"/>
                        </div>
                        <ProgressBar value={vulcanoState.storageLevelTons} max={1000} label={t('vulcano.storageLevel')} unit="ton" />
                    </Panel>
                    <Panel title={t('vulcano.storageKpisTitle')}>
                        <div className="flex justify-around items-center h-full">
                            <KpiGauge value={vulcanoState.fireRisk} label={t('vulcano.fireRisk')} />
                            <KpiGauge value={vulcanoState.sanitaryRisk} label={t('vulcano.sanitaryRisk')} />
                        </div>
                    </Panel>
                    <Panel title={t('vulcano.hefestosLog.title')}>
                        <div className="text-xs font-mono text-slate-400 space-y-1 h-24 overflow-y-auto">
                            {hefestosLog.length === 0 ? <p>{t('vulcano.hefestosLog.noMessages')}</p> : hefestosLog.map((log, i) => <p key={i}>{log}</p>)}
                        </div>
                    </Panel>
                </div>

                <div className="lg:col-span-2">
                    <Panel title={t('vulcano.processingLineTitle')}>
                        <ProcessLine vulcanoState={vulcanoState} />
                    </Panel>
                </div>
                
                <div className="lg:col-span-3">
                     <Panel title={t('vulcano.outputTitle')}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h5 className="font-semibold text-slate-300">{t('vulcano.productionRate')}</h5>
                                <p className="text-xl font-mono">GCR: {vulcanoState.productionRateKgPerHour.gcr.toFixed(1)}</p>
                                <p className="text-xl font-mono">Acero: {vulcanoState.productionRateKgPerHour.steel.toFixed(1)}</p>
                                <p className="text-xl font-mono">Fibra: {vulcanoState.productionRateKgPerHour.fiber.toFixed(1)}</p>
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                 <h5 className="font-semibold text-slate-300">{t('vulcano.siloLevels')}</h5>
                                <ProgressBar value={vulcanoState.siloLevelsKg.gcr} max={20000} label={t('vulcano.gcr')} />
                                <ProgressBar value={vulcanoState.siloLevelsKg.steel} max={20000} label={t('vulcano.steel')} />
                                <ProgressBar value={vulcanoState.siloLevelsKg.fiber} max={20000} label={t('vulcano.fiber')} />
                            </div>
                        </div>
                    </Panel>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Panel title={t('vulcano.energyCost.title')}>
                        <p className="text-sm text-slate-400">El módulo Vulcano tiene una demanda eléctrica constante de <strong className="text-white">{VULCANO_ELECTRICAL_DEMAND_KW} kW</strong> cuando está operativo.</p>
                        <p className="text-2xl font-mono font-bold text-center text-yellow-400">{(VULCANO_ELECTRICAL_DEMAND_KW * costs.gridElectricityPrice).toFixed(2)} €/h</p>
                        <button onClick={handleAnalyzeEnergyCost} className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">{t('vulcano.energyCost.analyzeButton')}</button>
                    </Panel>
                     <Panel title="Reportes y Sinergias">
                        <p className="text-sm text-slate-400">Genera un reporte completo de producción y viabilidad para enviarlo al gestor de tareas del Concilio.</p>
                        <button onClick={handleCreateReport} className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700">{t('vulcano.reportButton')}</button>
                    </Panel>
                </div>
            </div>
        </div>
    );
};
