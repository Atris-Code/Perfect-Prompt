import React, { useState, useEffect } from 'react';
// FIX: To ensure consistent module resolution, removed the .ts extension from the import path.
import { ContentType } from '../../types';
// FIX: To ensure consistent module resolution, removed the .ts extension from the import path.
import type { Task, SimulationFormData } from '../../types';
import { SimulationForm } from './SimulationForm';
import { SIMULATION_ENGINE, PYROLYSIS_MATERIALS } from '../../data/pyrolysisMaterials';

interface ComparativeScenariosLabProps {
    onSaveTask: (task: Task) => void;
    initialMaterialIds?: number[] | null;
    onDataConsumed?: () => void;
}

const initialScenarioData: SimulationFormData = {
    simulationMode: 'simple',
    composition: { celulosa: 40, hemicelulosa: 30, lignina: 30 },
    simpleCatalystId: null,
    mixture: [{ materialId: 18, percentage: 100 }], // Hueso de Aceituna
    advancedCatalystId: null,
    selectedBiomassModeId: 'mode_bio_oil',
    selectedHeatSourceId: 'hibrido',
    sensitivityChange: 0,
    temperatura: 500,
    tiempoResidencia: 1.5,
    oxigeno: 0,
};

export const ComparativeScenariosLab: React.FC<ComparativeScenariosLabProps> = ({ onSaveTask, initialMaterialIds, onDataConsumed }) => {
    const [scenarioA, setScenarioA] = useState<SimulationFormData>(initialScenarioData);
    const [scenarioB, setScenarioB] = useState<SimulationFormData>({ 
        ...initialScenarioData, 
        selectedBiomassModeId: 'mode_biochar',
        composition: { celulosa: 30, hemicelulosa: 40, lignina: 30 },
        mixture: [{ materialId: 8, percentage: 100 }], // Cáscara de Soja
        temperatura: 425,
        tiempoResidencia: 3600,
        oxigeno: 0,
    });
    const [taskTitle, setTaskTitle] = useState('Análisis Comparativo A vs B');
    
    useEffect(() => {
        if (initialMaterialIds && initialMaterialIds.length > 0 && onDataConsumed) {
            const firstId = initialMaterialIds[0];
            const firstMaterial = PYROLYSIS_MATERIALS.find(m => m.id === firstId);

            if (firstMaterial) {
                setScenarioA(prev => ({
                    ...prev,
                    simulationMode: 'avanzado',
                    mixture: [{ materialId: firstId, percentage: 100 }]
                }));
            }

            if (initialMaterialIds.length > 1) {
                const secondId = initialMaterialIds[1];
                const secondMaterial = PYROLYSIS_MATERIALS.find(m => m.id === secondId);
                if (secondMaterial) {
                    setScenarioB(prev => ({
                        ...prev,
                        simulationMode: 'avanzado',
                        mixture: [{ materialId: secondId, percentage: 100 }]
                    }));
                }
            }
            
            onDataConsumed();
        }
    }, [initialMaterialIds, onDataConsumed]);

    const handleFormChange = (scenario: 'A' | 'B', fieldName: keyof SimulationFormData, value: any) => {
        const setter = scenario === 'A' ? setScenarioA : setScenarioB;
        setter(prev => {
            const newState = {...prev, [fieldName]: value};

            if (fieldName === 'selectedBiomassModeId' && newState.simulationMode !== 'extremo') {
                const mode = SIMULATION_ENGINE.biomass_pyrolysis_modes.find(m => m.id === value);
                if (mode) {
                    const tempString = mode.condiciones_tipicas.temperatura_C;
                    newState.temperatura = tempString.includes('-') ? (Number(tempString.split('-')[0]) + Number(tempString.split('-')[1])) / 2 : Number(tempString.replace('>', ''));

                    const timeString = mode.condiciones_tipicas.tiempo_residencia;
                    if (timeString.includes('< 2 s')) newState.tiempoResidencia = 1.5;
                    else if (timeString.includes('horas')) newState.tiempoResidencia = 3600;
                    else if (timeString.includes('segundos a minutos')) newState.tiempoResidencia = 180;
                    else newState.tiempoResidencia = 10;
                    
                    newState.oxigeno = mode.id === 'mode_gas' ? 5 : 0;
                }
            }
            return newState;
        });
    };

    const handleSave = () => {
        const newTask: Task = {
            id: `task-${Date.now()}`,
            title: taskTitle,
            createdAt: Date.now(),
            status: 'Por Hacer',
            contentType: ContentType.Texto,
            formData: {
                objective: `Análisis comparativo: ${taskTitle}`,
                tone: 'Analítico',
                activeAgents: ['Orquestador'],
                // FIX: Added all ContentType keys to satisfy the Record<ContentType, any> type.
                specifics: {
                    [ContentType.Texto]: {},
                    [ContentType.Imagen]: {},
                    [ContentType.Video]: {},
                    [ContentType.Audio]: {},
                    [ContentType.Codigo]: {},
                },
                scenarioA: scenarioA,
                scenarioB: scenarioB,
            },
            isIntelligent: true,
            agentId: 'Orquestador',
            eventType: 'ComparativeAnalysis',
            subTasks: [
                { name: 'Ejecutar Simulaciones A y B (Dr. Pirolis)', status: 'pending' },
                { name: 'Análisis Técnico Comparativo (Helena)', status: 'pending' },
                { name: 'Análisis Estratégico Comparativo (Marco)', status: 'pending' },
                { name: 'Veredicto Ejecutivo y Síntesis (Janus)', status: 'pending' },
            ],
        };
        onSaveTask(newTask);
        alert(`Tarea "${taskTitle}" creada y enviada al Concilio de Titanes.`);
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Laboratorio de Escenarios Comparativos</h2>
                <p className="mt-2 text-md text-gray-600">Configura y compara dos simulaciones de pirólisis en paralelo.</p>
            </header>

            <div className="mb-8">
                <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">Título del Análisis</label>
                <input
                    type="text"
                    id="taskTitle"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SimulationForm
                    title="Escenario A"
                    formData={scenarioA}
                    onFormChange={(field, value) => handleFormChange('A', field, value)}
                />
                <SimulationForm
                    title="Escenario B"
                    formData={scenarioB}
                    onFormChange={(field, value) => handleFormChange('B', field, value)}
                />
            </div>

            <div className="mt-10 pt-6 border-t flex justify-center">
                <button
                    onClick={handleSave}
                    className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
                >
                    Generar Análisis Comparativo (Concilio de Titanes)
                </button>
            </div>
        </div>
    );
};