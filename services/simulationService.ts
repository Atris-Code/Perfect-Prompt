

import { PYROLYSIS_MATERIALS, SIMULATION_ENGINE } from '../data/pyrolysisMaterials';
// FIX: Corrected import path for types to ensure consistent module resolution.
import type { PyrolysisMaterial, BiomassPyrolysisMode, Catalyst, HeatSource, SimulationKPIs, SolidMaterial, SimulationFormData, SimulationResult, PlantModel } from '../types';

export const runSimulation = (formData: SimulationFormData): SimulationResult => {
    const {
        simulationMode,
        composition,
        simpleCatalystId,
        mixture,
        advancedCatalystId,
        selectedBiomassModeId,
        selectedHeatSourceId,
        sensitivityChange,
        temperatura,
        tiempoResidencia,
        oxigeno
    } = formData;

    const solidMaterials = PYROLYSIS_MATERIALS.filter((m): m is PyrolysisMaterial & { fase: 'Sólido' } => m.fase === 'Sólido');
    const allMaterialsForAdvanced = PYROLYSIS_MATERIALS.filter(m => m.id !== -1);

    const effectiveMaterial = ((): PyrolysisMaterial | undefined => {
        if (simulationMode === 'simple') {
            const total = composition.celulosa + composition.hemicelulosa + composition.lignina;
            if (total === 0) return solidMaterials[0];
            // FIX: Added missing 'fase' property to align with PyrolysisMaterial type
            const theoreticalMaterial: PyrolysisMaterial = {
                id: -1,
                // FIX: Added missing 'fase' property.
                fase: 'Sólido',
                nombre: 'Biomasa Teórica',
                categoria: 'Teórica',
                propiedades: {
                    composicion: { 
                        celulosa: composition.celulosa, 
                        hemicelulosa: composition.hemicelulosa, 
                        lignina: composition.lignina 
                    },
                    analisisElemental: { carbono: 48, hidrogeno: 6, oxigeno: 45, nitrogeno: 0.5, azufre: 0.1 },
                    analisisInmediato: { humedad: 10, cenizas: 2, materiaVolatil: 80, carbonoFijo: 18 },
                    poderCalorificoSuperior: 19,
                }
            };
            return theoreticalMaterial;
        } else { // 'avanzado' or 'extremo'
            if (mixture.length === 0) return allMaterialsForAdvanced[0];
            
            const firstMaterialId = mixture[0]?.materialId;
            const firstMaterial = PYROLYSIS_MATERIALS.find(m => m.id === firstMaterialId);
            
            if (mixture.length === 1) {
                return firstMaterial;
            }
            
            const mixtureName = mixture.map(item => {
                const mat = PYROLYSIS_MATERIALS.find(m => m.id === item.materialId);
                return `${item.percentage}% ${mat?.nombre || 'Desconocido'}`;
            }).join(' + ');
            
            const mixturePhase = firstMaterial?.fase || 'Sólido';
            const baseProps = {
                id: -2,
                nombre: `Mezcla: ${mixtureName}`,
                categoria: 'Mezcla',
                propiedades: firstMaterial?.propiedades as any
            };

            // FIX: Added required 'fase' property
            if (mixturePhase === 'Líquido') {
                return { ...baseProps, fase: 'Líquido' } as PyrolysisMaterial;
            }
            if (mixturePhase === 'Gaseoso') {
                return { ...baseProps, fase: 'Gaseoso' } as PyrolysisMaterial;
            }
            return { ...baseProps, fase: 'Sólido' } as PyrolysisMaterial;
        }
    })();

    const biomassModes = SIMULATION_ENGINE.biomass_pyrolysis_modes;
    const heatSources = SIMULATION_ENGINE.heat_sources;
    const selectedCatalystId = simulationMode === 'simple' ? simpleCatalystId : advancedCatalystId;

    const mode = biomassModes.find(m => m.id === selectedBiomassModeId);
    const heatSource = heatSources.find(h => h.id === selectedHeatSourceId);

    if (!mode || !heatSource || !effectiveMaterial) {
        return {
            simulatedYield: null,
            kpis: null,
            qualityInsights: [],
            aiAnalysis: '',
            carbonBalance: null,
            gasComposition: null,
            simulationInsights: null,
            effectiveMaterial: undefined,
            plantModel: null,
        };
    }

    // FIX: Explicitly type `baseYield` to allow for the optional `ceras` property.
    let baseYield: { liquido: number; solido: number; gas: number; ceras?: number; } = { ...mode.rendimiento_base_porcentaje };
    let insights: string[] = [];
    const catalyst = SIMULATION_ENGINE.catalysts.find(c => c.id === selectedCatalystId);
    
    // Modifier logic for custom conditions from sliders/optimizer
    const idealTempStr = mode.condiciones_tipicas.temperatura_C;
    const idealTemp = idealTempStr.includes('-') ? (Number(idealTempStr.split('-')[0]) + Number(idealTempStr.split('-')[1])) / 2 : Number(idealTempStr.replace('>', ''));
    const tempDelta = temperatura - idealTemp;

    baseYield.gas += tempDelta * 0.05;
    baseYield.liquido -= tempDelta * 0.03;
    baseYield.solido -= tempDelta * 0.02;

    const idealTimeStr = mode.condiciones_tipicas.tiempo_residencia;
    const idealTime = idealTimeStr.includes('< 2 s') ? 1.5 : idealTimeStr.includes('horas') ? 3600 : 180;
    const timeDelta = Math.log10(Math.max(1, tiempoResidencia)) - Math.log10(idealTime);
    
    baseYield.gas += timeDelta * 5;
    baseYield.liquido -= timeDelta * 3;
    baseYield.solido -= timeDelta * 2;

    if (oxigeno > 0) {
        baseYield.gas += oxigeno * 1.5;
        baseYield.liquido -= oxigeno * 1.0;
        baseYield.solido -= oxigeno * 0.5;
        insights.push(`Con ${oxigeno.toFixed(1)}% de O₂, el proceso se desplaza hacia la gasificación, aumentando drásticamente la producción de gas.`);
    }

    if (catalyst) {
        const { modificador_rendimiento, mejora_calidad_liquido, mejora_calidad_gas } = catalyst.efecto_simulado;
        const parse = (s: string) => parseFloat(s.replace(/[^0-9-.]/g, '')) || 0;
        baseYield.liquido += parse(modificador_rendimiento.liquido);
        baseYield.solido += parse(modificador_rendimiento.solido);
        baseYield.gas += parse(modificador_rendimiento.gas);
        insights.push(mejora_calidad_liquido);
        insights.push(mejora_calidad_gas);
    }
    
    // Normalize yields
    const totalYield = baseYield.liquido + baseYield.solido + baseYield.gas + (baseYield.ceras || 0);
    if (totalYield > 0) {
        const scale = 100 / totalYield;
        baseYield.liquido *= scale;
        baseYield.solido *= scale;
        baseYield.gas *= scale;
        if (baseYield.ceras) {
            baseYield.ceras *= scale;
        }
    }
    
    // Final check to ensure it sums to 100
    const finalTotal = baseYield.liquido + baseYield.solido + baseYield.gas + (baseYield.ceras || 0);
    const diff = 100 - finalTotal;
    if (Math.abs(diff) > 0.01) { // Tolerate small floating point inaccuracies
        baseYield.gas += diff; // Adjust gas yield as it's often the balance
    }
    
    baseYield.liquido = Math.max(0, baseYield.liquido);
    baseYield.solido = Math.max(0, baseYield.solido);
    baseYield.gas = Math.max(0, baseYield.gas);

    const plantModelResult: PlantModel = {
        capacityGallonsPerYear: 5000000,
        ethanolFlowGallonsPerHour: 600,
        electricalDemandKW: 2500,
        thermalDemandKJPerHour: 1.5e7,
        fuelConsumptionTonsPerDay: 50,
    };

    return {
        simulatedYield: baseYield,
        kpis: heatSource.efecto_simulado.kpis,
        qualityInsights: insights,
        aiAnalysis: heatSource.efecto_simulado.analisis_ia,
        carbonBalance: heatSource.efecto_simulado.carbon_balance || null,
        gasComposition: { H2: 20, CO: 45, CO2: 15, CH4: 10, C2_C4: 5, N2: 5 }, // Dummy data
        simulationInsights: {
            key_findings: ["El catalizador mejoró la calidad del líquido.", "La temperatura es un factor clave."],
            recommendations: ["Operar cerca de 500°C para bio-aceite."],
            sensitivity_analysis: "El rendimiento del líquido es muy sensible a la temperatura."
        },
        effectiveMaterial: effectiveMaterial,
        plantModel: plantModelResult,
    };
};