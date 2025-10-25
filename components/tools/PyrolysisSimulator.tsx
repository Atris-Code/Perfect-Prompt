import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PYROLYSIS_MATERIALS, SIMULATION_ENGINE } from '../../data/pyrolysisMaterials';
// FIX: To ensure consistent module resolution, removed the .ts extension from the import path.
import type { PyrolysisMaterial, BiomassPyrolysisMode, Catalyst, HeatSource, SimulationKPIs, HeatSourceEffect, GasPhaseComposition, PlasticPyrolysisMode, SimulationInsights, SolidMaterial, PlantModel } from '../../types';
import ModeYieldChart from './ModeYieldChart';
import { CatalyticOracle } from './CatalyticOracle';

declare const html2canvas: any;

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
    const size = 180;
    const strokeWidth = 25;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let accumulated = 0;
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);

    if (totalValue === 0) {
        return (
             <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#4b5563"
                    strokeWidth={strokeWidth}
                />
            </svg>
        );
    }


    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {data.map((item, index) => {
                 if (item.value === 0) return null;
                const dashoffset = circumference * (1 - (accumulated / totalValue));
                const dasharray = (circumference * item.value) / totalValue;
                accumulated += item.value;
                return (
                    <circle
                        key={index}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${dasharray} ${circumference}`}
                        strokeDashoffset={dashoffset}
                        className="transition-all duration-500 ease-in-out"
                    />
                );
            })}
        </svg>
    );
};

const KpiCard: React.FC<{ title: string; value: string; unit: string; }> = ({ title, value, unit }) => (
    <div className="bg-slate-700 p-4 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-slate-600">
        <h5 className="text-sm font-semibold text-gray-400">{title}</h5>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-gray-400">{unit}</p>
    </div>
);

const SliderControl: React.FC<{ label: string; unit: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; color: string; }> = ({ label, unit, value, onChange, min, max, step, color }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <span className="text-sm font-mono bg-slate-600 text-white px-2 py-0.5 rounded-md">{value.toFixed(label === 'Tiempo de Residencia' ? 1 : 0)} {unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${color}`}
        />
    </div>
);


// --- FORM COMPONENTS ---

const SimpleModeForm: React.FC<{
    composition: { celulosa: number, hemicelulosa: number, lignina: number };
    onCompositionChange: (newComposition: { celulosa: number, hemicelulosa: number, lignina: number }) => void;
    catalystId: string | null;
    onCatalystChange: (id: string | null) => void;
    availableCatalysts: Catalyst[];
    solidMaterials: (PyrolysisMaterial & { fase: 'Sólido' })[];
    onLoadComposition: (materialId: number | null) => void;
}> = ({ composition, onCompositionChange, catalystId, onCatalystChange, availableCatalysts, solidMaterials, onLoadComposition }) => {

    const handleSliderChange = (name: 'celulosa' | 'hemicelulosa' | 'lignina', value: number) => {
        const oldValue = composition[name];
        if (value === oldValue) return;

        let newComposition = { ...composition };
        
        const otherSliders = (['celulosa', 'hemicelulosa', 'lignina'] as const).filter(k => k !== name);
        const oldOtherSum = otherSliders.reduce((sum, k) => sum + newComposition[k], 0);

        if (oldOtherSum > 0) {
            const newOtherSum = 100 - value;
            const ratio = newOtherSum / oldOtherSum;
            otherSliders.forEach(k => {
                newComposition[k] *= ratio;
            });
        } else { // Both others were 0
            otherSliders.forEach(k => {
                newComposition[k] = (100 - value) / 2;
            });
        }
        
        newComposition[name] = value;

        // Fix rounding issues to ensure sum is exactly 100
        const finalSum = newComposition.celulosa + newComposition.hemicelulosa + newComposition.lignina;
        const diff = 100 - finalSum;
        if (diff !== 0) {
           newComposition[name] += diff;
        }

        onCompositionChange({
            celulosa: Math.max(0, Math.min(100, newComposition.celulosa)),
            hemicelulosa: Math.max(0, Math.min(100, newComposition.hemicelulosa)),
            lignina: Math.max(0, Math.min(100, newComposition.lignina)),
        });
    };

    const Slider: React.FC<{ name: 'celulosa' | 'hemicelulosa' | 'lignina', label: string, value: number, color: string }> = ({ name, label, value, color }) => (
        <div>
            <div className="flex justify-between items-center mb-1">
                <label htmlFor={`slider-${name}`} className="text-sm font-medium text-gray-300">{label}</label>
                <span className="text-sm font-mono bg-slate-600 text-white px-2 py-0.5 rounded-md">{value.toFixed(1)}%</span>
            </div>
            <input
                id={`slider-${name}`}
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={value}
                onChange={(e) => handleSliderChange(name, parseFloat(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${color}`}
            />
        </div>
    );

    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">1. Composición de Biomasa Teórica</h3>
            <div className="mt-2">
                <label htmlFor="base-material-loader" className="block text-sm font-medium text-gray-300 mb-1">Cargar composición desde un material base</label>
                <select
                    id="base-material-loader"
                    onChange={(e) => onLoadComposition(e.target.value ? Number(e.target.value) : null)}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white"
                >
                    <option value="">Seleccionar material...</option>
                    {solidMaterials.map(m => (m.propiedades.composicion.celulosa !== undefined) && <option key={m.id} value={m.id}>{m.nombre} ({m.fase})</option>)}
                </select>
            </div>
            <div className="space-y-4 pt-4 mt-4 border-t border-slate-700">
                <Slider name="celulosa" label="Celulosa" value={composition.celulosa} color="accent-green-500" />
                <Slider name="hemicelulosa" label="Hemicelulosa" value={composition.hemicelulosa} color="accent-yellow-500" />
                <Slider name="lignina" label="Lignina" value={composition.lignina} color="accent-orange-700" />
            </div>
             <div className="mt-6">
                <CatalyticOracle selectedMaterialName="Biomasa Teórica" />
            </div>
             <div className="mt-6">
                <label htmlFor="simple-catalyst" className="block text-sm font-medium text-gray-300 mb-1">3. Catalizador (Opcional)</label>
                <select id="simple-catalyst" value={catalystId || ''} onChange={e => onCatalystChange(e.target.value || null)} className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white">
                    <option value="">Ninguno</option>
                    {availableCatalysts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
            </div>
        </div>
    );
};

const AdvancedModeForm: React.FC<{
    mixture: { materialId: number, percentage: number }[];
    onMixtureChange: (newMixture: { materialId: number, percentage: number }[]) => void;
    catalystId: string | null;
    onCatalystChange: (id: string | null) => void;
    availableCatalysts: Catalyst[];
    allMaterials: PyrolysisMaterial[];
    effectiveMaterialName: string;
}> = ({ mixture, onMixtureChange, catalystId, onCatalystChange, availableCatalysts, allMaterials, effectiveMaterialName }) => {
    
    const handleAddMaterial = () => {
        const newMaterialId = allMaterials.find(m => !mixture.some(item => item.materialId === m.id))?.id;
        if (newMaterialId !== undefined) {
            onMixtureChange([...mixture, { materialId: newMaterialId, percentage: 0 }]);
        }
    };

    const handleRemoveMaterial = (index: number) => {
        onMixtureChange(mixture.filter((_, i) => i !== index));
    };

    const handleMaterialChange = (index: number, newMaterialId: number) => {
        const newMixture = [...mixture];
        newMixture[index].materialId = newMaterialId;
        onMixtureChange(newMixture);
    };
    
    const handleAdvancedPercentageChange = (index: number, newPercentage: number) => {
        const newMixture = [...mixture];
        
        const otherItemsTotal = mixture.reduce((sum, item, i) => i !== index ? sum + (item.percentage || 0) : sum, 0);

        const maxAllowed = 100 - otherItemsTotal;
        
        newMixture[index].percentage = Math.max(0, Math.min(newPercentage, maxAllowed));
        onMixtureChange(newMixture);
    };
    
    const totalPercentage = mixture.reduce((sum, item) => sum + (item.percentage || 0), 0);

    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">1. Mezclador de Materias Primas</h3>
            <div className="space-y-4">
                {mixture.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                        <select
                            value={item.materialId}
                            onChange={(e) => handleMaterialChange(index, Number(e.target.value))}
                            className="col-span-7 p-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm"
                        >
                            {allMaterials.map(m => (
                                <option key={m.id} value={m.id} disabled={mixture.some((mixItem, mixIndex) => mixIndex !== index && mixItem.materialId === m.id)}>
                                    {m.nombre} ({m.fase})
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={item.percentage}
                            onChange={(e) => handleAdvancedPercentageChange(index, Number(e.target.value))}
                            className="col-span-3 p-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm text-right"
                            min="0"
                            max="100"
                        />
                        <span className="text-sm">%</span>
                        <button onClick={() => handleRemoveMaterial(index)} className="col-span-1 text-red-400 hover:text-red-300 disabled:opacity-50" disabled={mixture.length <= 1}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>
             <button onClick={handleAddMaterial} className="mt-4 text-sm font-semibold text-blue-400 hover:text-blue-300" disabled={mixture.length >= allMaterials.length}>
                + Añadir Materia Prima
            </button>

            {totalPercentage > 99.9 && (
                <p className="text-xs text-yellow-400 mt-2">*Atención: La suma de porcentajes ha alcanzado el 100% y no puede superarlo.</p>
            )}
             <div className="mt-6">
                <CatalyticOracle selectedMaterialName={effectiveMaterialName} />
            </div>
             <div className="mt-6">
                <label htmlFor="advanced-catalyst" className="block text-sm font-medium text-gray-300 mb-1">3. Catalizador (Opcional)</label>
                <select id="advanced-catalyst" value={catalystId || ''} onChange={e => onCatalystChange(e.target.value || null)} className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white">
                    <option value="">Ninguno</option>
                    {availableCatalysts.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
            </div>
        </div>
    );
};

const IndicatorCard: React.FC<{ title: string; value: string; unit: string; icon: React.ReactNode }> = ({ title, value, unit, icon }) => (
    <div className="bg-slate-700 p-4 rounded-lg flex items-center gap-4 transform transition-all hover:scale-105 hover:bg-slate-600">
        <div className="bg-slate-800 p-3 rounded-lg text-cyan-400">{icon}</div>
        <div>
            <p className="text-sm font-semibold text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">
                {value}
                <span className="text-base text-slate-300 ml-1.5">{unit}</span>
            </p>
        </div>
    </div>
);

const PlantModelVisualizer: React.FC<{ plantModel: PlantModel }> = ({ plantModel }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Visualizador del Modelo de Planta (Bioetanol)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <IndicatorCard 
                    title="Capacidad Nominal"
                    value={plantModel.capacityGallonsPerYear.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    unit="gal/año"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                />
                 <IndicatorCard 
                    title="Flujo Nominal Bioetanol"
                    value={plantModel.ethanolFlowGallonsPerHour.toFixed(2).replace('.', ',')}
                    unit="gal/hr"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                />
                 <IndicatorCard 
                    title="Demanda Eléctrica"
                    value={plantModel.electricalDemandKW.toFixed(1).replace('.', ',')}
                    unit="kW"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                />
                <IndicatorCard 
                    title="Demanda Térmica"
                    value={(plantModel.thermalDemandKJPerHour / 1000).toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                    unit="MJ/hr"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.771-2.59 6.96-6.062 7.773M6.343 7.343A7.963 7.963 0 014 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8c-1.42 0-2.744.372-3.861 1.014" /></svg>}
                />
                <IndicatorCard 
                    title="Uso de Combustible"
                    value={plantModel.fuelConsumptionTonsPerDay.toFixed(2).replace('.', ',')}
                    unit="ton/día"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
                />
            </div>
        </div>
    );
};


interface PyrolysisSimulatorProps {
  initialMaterialIds?: number[] | null;
  onCreateContent: (data: {
    material: string;
    process: string;
    catalyst: string;
    yield: { liquido: number; solido: number; gas: number };
    notes: string[];
  }) => void;
}

export const PyrolysisSimulator: React.FC<PyrolysisSimulatorProps> = ({ initialMaterialIds, onCreateContent }) => {
    const [simulationMode, setSimulationMode] = useState<'simple' | 'avanzado'>('simple');
    
    // --- State for BOTH modes ---
    const [selectedBiomassModeId, setSelectedBiomassModeId] = useState<string>('mode_biochar');
    const [selectedHeatSourceId, setSelectedHeatSourceId] = useState<string>('hibrido');
    const [sensitivityChange, setSensitivityChange] = useState<number>(0);
    const [temperatura, setTemperatura] = useState(425);
    const [tiempoResidencia, setTiempoResidencia] = useState(1800);
    const [oxigeno, setOxigeno] = useState(0);


    // --- Simple Mode State ---
    const [simpleComposition, setSimpleComposition] = useState({ celulosa: 42.5, hemicelulosa: 26.0, lignina: 31.5 });
    const [simpleCatalystId, setSimpleCatalystId] = useState<string | null>(null);

    // --- Advanced Mode State ---
    const [advancedMixture, setAdvancedMixture] = useState<{materialId: number, percentage: number}[]>([{ materialId: 1, percentage: 100 }]);
    const [advancedCatalystId, setAdvancedCatalystId] = useState<string | null>(null);
    
    const [simulatedYield, setSimulatedYield] = useState<{ liquido: number; solido: number; gas: number, ceras?: number } | null>(null);
    const [kpis, setKpis] = useState<SimulationKPIs | null>(null);
    const [qualityInsights, setQualityInsights] = useState<string[]>([]);
    const [aiAnalysis, setAiAnalysis] = useState<string>('');
    const [carbonBalance, setCarbonBalance] = useState<Record<string, number> | null>(null);
    const [gasComposition, setGasComposition] = useState<GasPhaseComposition | null>(null);
    const [simulationInsights, setSimulationInsights] = useState<SimulationInsights | null>(null);
    const [plantModel, setPlantModel] = useState<PlantModel | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (initialMaterialIds && initialMaterialIds.length > 0) {
            const materials = initialMaterialIds
                .map(id => PYROLYSIS_MATERIALS.find(m => m.id === id))
                .filter((m): m is PyrolysisMaterial => !!m);
    
            if (materials.length > 0) {
                setSimulationMode('avanzado');
                const percentage = 100 / materials.length;
                const newMixture = materials.map(m => ({ 
                    materialId: m.id, 
                    percentage: parseFloat(percentage.toFixed(2)) 
                }));
                const total = newMixture.reduce((sum, item) => sum + item.percentage, 0);
                if (total !== 100 && newMixture.length > 0) {
                    newMixture[newMixture.length - 1].percentage += (100 - total);
                }
                setAdvancedMixture(newMixture);
                const hasPlastics = materials.some(m => SIMULATION_ENGINE.plastic_materials.includes(m.id));
                setSelectedBiomassModeId(hasPlastics ? 'mode_bio_oil' : 'mode_bio_oil');
            }
        }
    }, [initialMaterialIds]);

    const solidMaterials = useMemo(() => PYROLYSIS_MATERIALS.filter((m): m is PyrolysisMaterial & { fase: 'Sólido' } => m.fase === 'Sólido'), []);
    const allMaterialsForAdvanced = useMemo(() => PYROLYSIS_MATERIALS.filter(m => m.id !== -1), []);
    
    const biomassModes = SIMULATION_ENGINE.biomass_pyrolysis_modes;
    const heatSources = SIMULATION_ENGINE.heat_sources;
    
    useEffect(() => {
        const mode = biomassModes.find(m => m.id === selectedBiomassModeId);
        if (mode) {
            const tempString = mode.condiciones_tipicas.temperatura_C;
            if (tempString.includes('-')) {
                const [min, max] = tempString.split('-').map(Number);
                setTemperatura((min + max) / 2);
            } else {
                setTemperatura(Number(tempString.replace('>', '')));
            }
        }
    }, [selectedBiomassModeId, biomassModes]);

    return null;
};
