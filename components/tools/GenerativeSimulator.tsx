import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task } from '../../types';
import { ContentType } from '../../types';

// BASE DE CONOCIMIENTO (DIGITIZACIÓN DE CREDENCIALES) ---
const KNOWLEDGE_BASE = {
    fuels: {
        wood_pellets: { name: "Pellets de Madera", energy_mj_kg: 18, ash_percent: 1.5, moisture_percent: 8 },
        msw: { name: "Residuos Sólidos Urbanos (RSU)", energy_mj_kg: 12, ash_percent: 15, moisture_percent: 10 },
        tires: { name: "Neumáticos Fuera de Uso (NFU)", energy_mj_kg: 32, ash_percent: 0.5, moisture_percent: 0 },
        coal: { name: "Carbón Bituminoso", energy_mj_kg: 24, ash_percent: 15, moisture_percent: 5 },
        agricultural_residues: { name: "Residuos Agrícolas", energy_mj_kg: 15, ash_percent: 8, moisture_percent: 12 }
    },
    coal_plant: {
        name: "Central de Carbón Tradicional",
        available_fuels: ['coal'],
        base_efficiency_percent: 35,
        energy_balance: { output_percent: 33, waste_heat_percent: 60, stack_losses_percent: 7 },
        mass_balance: { ash_percent: 15, flue_gas_percent: 85 },
        financials_500MW: { capex: "€1.5-2.5 Billones", opex: "€50-70M/año", fuel_cost: "€100-150M/año", roi: "6-8 años" }
    },
    biomass_plant: {
        name: "Caldera de Biomasa Moderna",
        available_fuels: ['wood_pellets', 'msw', 'tires', 'agricultural_residues'],
        base_efficiency_percent: 85,
        energy_balance: { output_percent: 85, waste_heat_percent: 15 },
        mass_balance: { ash_percent: 3, flue_gas_percent: 97 },
        financials_500MW: { capex: "€1.0-1.5 Billones", opex: "€30-50M/año", fuel_cost: "€50-80M/año", roi: "4-6 años" }
    },
    pyrolysis_plant: {
        name: "Planta de Pirólisis",
        available_fuels: ['wood_pellets', 'msw', 'tires'],
        base_efficiency_percent: 75, // Eficiencia de conversión a productos útiles
        energy_balance: { output_percent: 75, waste_heat_percent: 25 },
        mass_balance: { ash_percent: 10, flue_gas_percent: 0 }, // El resto son productos
        financials_500MW: { capex: "€1.2-1.8 Billones", opex: "€20-40M/año (Neto)", fuel_cost: "€150-250M/año (Valor Productos)", roi: "2-5 años" }
    }
};

type PlantType = 'coal' | 'biomass' | 'pyrolysis';
type FuelKey = keyof typeof KNOWLEDGE_BASE.fuels;

interface GenerativeSimulatorProps {
    onSaveTask: (task: Task) => void;
}

export const GenerativeSimulator: React.FC<GenerativeSimulatorProps> = ({ onSaveTask }) => {
    const [currentPlantType, setCurrentPlantType] = useState<PlantType>('biomass');
    const [massFlow, setMassFlow] = useState(1000);
    const [thermalEfficiency, setThermalEfficiency] = useState(85);
    const [fuelType, setFuelType] = useState<FuelKey>('wood_pellets');
    
    const [outputs, setOutputs] = useState({
        energyContent: 0,
        energyOutput: 0,
        ashOutput: 0,
        flueGas: 0,
    });

    const [financials, setFinancials] = useState(KNOWLEDGE_BASE.biomass_plant.financials_500MW);

    const [reportData, setReportData] = useState<{
        currentEnergy: number;
        currentAsh: number;
        coalEnergy: number;
        coalAsh: number;
        biomassEnergy: number;
        biomassAsh: number;
    } | null>(null);
    const [isReportSent, setIsReportSent] = useState(false);

    const plantData = useMemo(() => KNOWLEDGE_BASE[`${currentPlantType}_plant`], [currentPlantType]);
    const availableFuels = useMemo(() => plantData.available_fuels.map(key => ({ key, name: KNOWLEDGE_BASE.fuels[key as FuelKey].name })), [plantData]);

    const runSimulation = useCallback(() => {
        const efficiency = thermalEfficiency / 100;
        const fuelData = KNOWLEDGE_BASE.fuels[fuelType];

        const energyContent = fuelData.energy_mj_kg;
        const energyOutput = massFlow * energyContent * efficiency * (1 - fuelData.moisture_percent / 100);
        const ashOutput = massFlow * (fuelData.ash_percent / 100);
        const flueGasOutput = massFlow - ashOutput;

        setOutputs({
            energyContent,
            energyOutput,
            ashOutput,
            flueGas: flueGasOutput,
        });
    }, [massFlow, thermalEfficiency, fuelType]);

    useEffect(() => {
        runSimulation();
    }, [runSimulation]);
    
    useEffect(() => {
        setThermalEfficiency(plantData.base_efficiency_percent);
        if (!plantData.available_fuels.includes(fuelType)) {
            setFuelType(plantData.available_fuels[0] as FuelKey);
        }
        setFinancials(plantData.financials_500MW);
        setReportData(null);
    }, [currentPlantType, plantData]);

    const generateReport = () => {
        const coalBaseEnergy = massFlow * KNOWLEDGE_BASE.fuels.coal.energy_mj_kg * (KNOWLEDGE_BASE.coal_plant.base_efficiency_percent / 100) * (1 - KNOWLEDGE_BASE.fuels.coal.moisture_percent / 100);
        const coalBaseAsh = massFlow * (KNOWLEDGE_BASE.fuels.coal.ash_percent / 100);
        
        const biomassBaseEnergy = massFlow * KNOWLEDGE_BASE.fuels.wood_pellets.energy_mj_kg * (KNOWLEDGE_BASE.biomass_plant.base_efficiency_percent / 100) * (1 - KNOWLEDGE_BASE.fuels.wood_pellets.moisture_percent / 100);
        const biomassBaseAsh = massFlow * (KNOWLEDGE_BASE.fuels.wood_pellets.ash_percent / 100);
        
        setReportData({
            currentEnergy: outputs.energyOutput,
            currentAsh: outputs.ashOutput,
            coalEnergy: coalBaseEnergy,
            coalAsh: coalBaseAsh,
            biomassEnergy: biomassBaseEnergy,
            biomassAsh: biomassBaseAsh,
        });
        setIsReportSent(false);
    };

    const handleSendToEditorial = () => {
        if (!reportData) return;

        const taskData = {
            title: "Análisis Comparativo: Simulación de Caldera de Biomasa vs. Central de Carbón",
            type: "Análisis Comparativo Energético", // This is for user display, eventType is the important one
            data: reportData
        };

        const newTask: Task = {
            id: `comparative-analysis-${Date.now()}`,
            title: taskData.title,
            createdAt: Date.now(),
            status: 'Por Hacer',
            contentType: ContentType.Texto,
            eventType: 'ComparativeAnalysis',
            formData: {
                objective: `Análisis comparativo de simulación: ${plantData.name}`,
                specifics: {
                    [ContentType.Texto]: {
                        rawData: JSON.stringify(taskData.data),
                    },
                    [ContentType.Imagen]: {},
                    [ContentType.Video]: {},
                    [ContentType.Audio]: {},
                    [ContentType.Codigo]: {},
                }
            },
        };
        
        onSaveTask(newTask);
        setIsReportSent(true);
        alert("Análisis enviado a la editorial. Se ha creado una nueva tarea en el Gestor de Tareas.");
    };

    return (
        <div className="bg-[#1a202c] text-[#e2e8f0] p-8 font-sans">
            <h1 className="text-3xl font-bold text-center">Simulador Generativo de Centrales Energéticas</h1>
            <p className="text-center text-slate-300 mb-8">Modelo "Collins" - Basado en la experiencia en combustión, pirólisis y soluciones energéticas.</p>
            
            <div className="bg-[#2d3748] p-4 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-2">Paso 1: Selecciona el Escenario a Generar</h2>
                <div className="flex space-x-4">
                    <button onClick={() => setCurrentPlantType('coal')} className={`flex-1 p-3 rounded font-semibold transition-all ${currentPlantType === 'coal' ? 'bg-blue-600 ring-2 ring-blue-400' : 'bg-gray-600 hover:bg-gray-700'}`}>🏭 {KNOWLEDGE_BASE.coal_plant.name}</button>
                    <button onClick={() => setCurrentPlantType('biomass')} className={`flex-1 p-3 rounded font-semibold transition-all ${currentPlantType === 'biomass' ? 'bg-blue-600 ring-2 ring-blue-400' : 'bg-gray-600 hover:bg-gray-700'}`}>🌿 {KNOWLEDGE_BASE.biomass_plant.name}</button>
                    <button onClick={() => setCurrentPlantType('pyrolysis')} className={`flex-1 p-3 rounded font-semibold transition-all ${currentPlantType === 'pyrolysis' ? 'bg-blue-600 ring-2 ring-blue-400' : 'bg-gray-600 hover:bg-gray-700'}`}>🔥 {KNOWLEDGE_BASE.pyrolysis_plant.name}</button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-[#2d3748] p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Paso 2: Perfil Generado y Simulación</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fuel-type" className="block mb-1">Tipo de Combustible:</label>
                            <select id="fuel-type" value={fuelType} onChange={(e) => setFuelType(e.target.value as FuelKey)} className="bg-[#4a5568] border border-[#718096] w-full p-2 rounded">
                                {availableFuels.map(fuel => <option key={fuel.key} value={fuel.key}>{fuel.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="mass-flow" className="block mb-1">Caudal de Entrada (kg/h):</label>
                            <input id="mass-flow" type="number" value={massFlow} onChange={(e) => setMassFlow(Number(e.target.value))} className="bg-[#4a5568] border border-[#718096] w-full p-2 rounded" />
                        </div>
                        <div>
                            <label htmlFor="thermal-efficiency" className="block mb-1">Eficiencia Térmica del Sistema (%):</label>
                            <input id="thermal-efficiency" type="range" min="30" max="95" value={thermalEfficiency} onChange={(e) => setThermalEfficiency(Number(e.target.value))} className="w-full" />
                            <span className="text-sm text-cyan-400">{thermalEfficiency}%</span>
                        </div>
                        <button onClick={runSimulation} className="bg-blue-600 w-full py-2 rounded">Ejecutar Simulación</button>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#2d3748] p-4 rounded-lg">
                        <h3 className="font-semibold text-lg">Balance de Energía y Masa</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="bg-[#1a202c] border-l-4 border-[#4299e1] p-3"><p>Contenido Energético:</p><strong className="text-xl text-yellow-400">{outputs.energyContent} MJ/kg</strong></div>
                            <div className="bg-[#1a202c] border-l-4 border-[#4299e1] p-3"><p>Producción Energética:</p><strong className="text-xl text-green-400">{outputs.energyOutput.toFixed(0)} MJ/h</strong></div>
                            <div className="bg-[#1a202c] border-l-4 border-[#4299e1] p-3"><p>Producción de Cenizas:</p><strong className="text-xl text-slate-300">{outputs.ashOutput.toFixed(1)} kg/h</strong></div>
                            <div className="bg-[#1a202c] border-l-4 border-[#4299e1] p-3"><p>Gases de Combustión:</p><strong className="text-xl text-slate-300">{outputs.flueGas.toFixed(1)} kg/h</strong></div>
                        </div>
                    </div>
                    <div className="bg-[#2d3748] p-4 rounded-lg">
                        <h3 className="font-semibold text-lg">Perfil Financiero (Modelo de Referencia 500 MW)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-center">
                            <div><p className="text-sm">Inversión (CAPEX)</p><strong className="text-lg">{financials.capex}</strong></div>
                            <div><p className="text-sm">Costo Operativo (OPEX)</p><strong className="text-lg">{financials.opex}</strong></div>
                            <div><p className="text-sm">{currentPlantType === 'pyrolysis' ? 'Valor de Productos' : 'Costo de Combustible'}</p><strong className="text-lg">{financials.fuel_cost}</strong></div>
                            <div><p className="text-sm">Retorno (ROI)</p><strong className="text-lg">{financials.roi}</strong></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#2d3748] p-4 rounded-lg mt-8">
                <h2 className="text-xl font-semibold mb-2">Paso 3: Generar Reporte Comparativo</h2>
                <p className="text-sm text-slate-400 mb-4">Compara los resultados de tu simulación actual con los otros escenarios base.</p>
                 {reportData ? (
                    <button 
                        onClick={handleSendToEditorial} 
                        disabled={isReportSent}
                        className={`w-full py-2 rounded transition-colors text-white font-semibold ${
                            isReportSent 
                                ? 'bg-green-600 cursor-not-allowed' 
                                : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                    >
                        {isReportSent ? '✔ Enviado a la Editorial' : 'Enviar Análisis a la Editorial'}
                    </button>
                ) : (
                    <button onClick={generateReport} className="bg-purple-600 w-full py-2 rounded font-semibold hover:bg-purple-700 text-white">Generar Comparativa</button>
                )}
                {reportData && (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-600">
                                    <th className="p-2 text-orange-400">Métrica</th>
                                    <th className="p-2 text-cyan-400">Tu Simulación</th>
                                    <th className="p-2 text-slate-300">Central de Carbón (Base)</th>
                                    <th className="p-2 text-slate-300">Caldera de Biomasa (Base)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700">
                                    <td className="p-2 font-semibold text-orange-400">Producción Energética (MJ/h)</td>
                                    <td className="p-2 text-cyan-400 font-bold">{reportData.currentEnergy.toFixed(0)}</td>
                                    <td className="p-2 text-slate-200">{reportData.coalEnergy.toFixed(0)}</td>
                                    <td className="p-2 text-slate-200">{reportData.biomassEnergy.toFixed(0)}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold text-orange-400">Producción de Cenizas (kg/h)</td>
                                    <td className="p-2 text-cyan-400 font-bold">{reportData.currentAsh.toFixed(1)}</td>
                                    <td className="p-2 text-slate-200">{reportData.coalAsh.toFixed(1)}</td>
                                    <td className="p-2 text-slate-200">{reportData.biomassAsh.toFixed(1)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
