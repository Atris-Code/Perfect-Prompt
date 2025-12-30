import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Accordion } from '../form/Accordion';
// FIX: Import 'FormInput' to resolve 'Cannot find name' errors.
import { FormSelect, FormInput } from '../form/FormControls';

const ScoreGauge: React.FC<{ score: number; label: string; maxScore?: number }> = ({ score, label, maxScore = 100 }) => {
    const percentage = (score / maxScore) * 100;
    const color = percentage >= 75 ? '#22c55e' : percentage >= 40 ? '#f59e0b' : '#ef4444';
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center text-center">
            <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke={color} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round" transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                />
                <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill={color}>
                    {score.toFixed(0)}
                </text>
            </svg>
            <span className="text-sm font-semibold mt-2 text-gray-600">{label}</span>
        </div>
    );
};


const initialInputs = {
    carbonBalance: 'Neutro',
    valorization: ['Energía'],
    contaminants: 'Bueno',
    conversionEfficiency: 75,
    capex: 100,
    opex: 30,
    scalability: ['Mediana'],
    feedstockIndependence: 'Media',
    trl: 7,
    compliance: ['UE'],
    operationEase: 'Estándar',
};

export const GlobalViabilityAssessor: React.FC = () => {
    const [inputs, setInputs] = useState(initialInputs);
    const [scores, setScores] = useState({ sustainability: 0, economics: 0, transferability: 0, global: 0 });
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setInputs(prev => ({
                ...prev,
                [name]: checked
                    ? [...(prev as any)[name], value]
                    : (prev as any)[name].filter((v: string) => v !== value)
            }));
        } else {
            setInputs(prev => ({
                ...prev,
                [name]: type === 'number' || type === 'range' ? Number(value) : value
            }));
        }
    };

    const calculateScores = useCallback(() => {
        // --- Sustainability Score ---
        const carbonMap: Record<string, number> = { 'Negativo': -10, 'Neutro': 0, 'Positivo Leve': 10, 'Positivo Alto': 20 };
        const valorizationScore = inputs.valorization.length * 10;
        const contaminantsMap: Record<string, number> = { 'Excelente': 20, 'Bueno': 10, 'Regular': 0, 'Deficiente': -10 };
        const efficiencyScore = Math.max(-20, Math.min(20, (inputs.conversionEfficiency - 75) * 2));
        const sustainabilityScore = carbonMap[inputs.carbonBalance] + valorizationScore + contaminantsMap[inputs.contaminants] + efficiencyScore;

        // --- Economics Score ---
        const capexScore = inputs.capex < 100 ? 20 : inputs.capex < 150 ? 10 : 0;
        const opexScore = inputs.opex < 30 ? 20 : inputs.opex < 50 ? 10 : 0;
        const scalabilityScore = inputs.scalability.length * 10;
        const feedstockMap: Record<string, number> = { 'Muy Baja': 20, 'Baja': 10, 'Media': 0, 'Alta': -10, 'Muy Alta': -20 };
        const economicsScore = capexScore + opexScore + scalabilityScore + feedstockMap[inputs.feedstockIndependence];

        // --- Transferability Score ---
        const trlScore = (inputs.trl - 7) * 10;
        const complianceScore = inputs.compliance.length * 10;
        const operationMap: Record<string, number> = { 'Estándar': 20, 'Moderada': 0, 'Alta': -10 };
        const transferabilityScore = trlScore + complianceScore + operationMap[inputs.operationEase];

        const normalize = (score: number, max: number) => Math.max(0, Math.min(100, (score / max) * 100));

        const finalSustainability = normalize(sustainabilityScore, 80);
        const finalEconomics = normalize(economicsScore, 90);
        const finalTransferability = normalize(transferabilityScore, 60);

        const globalScore = (finalSustainability + finalEconomics + finalTransferability) / 3;

        setScores({
            sustainability: finalSustainability,
            economics: finalEconomics,
            transferability: finalTransferability,
            global: globalScore
        });

    }, [inputs]);

    useEffect(() => {
        calculateScores();
    }, [calculateScores]);

    const handleAiAnalysis = async () => {
        setIsAnalyzing(true);
        setAiAnalysis('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
            Eres un consultor experto en tecnologías de valorización de residuos. Analiza la siguiente tecnología basada en los parámetros proporcionados por el usuario.
            Proporciona un resumen conciso de sus fortalezas y debilidades clave en formato de viñetas (una lista para fortalezas y otra para debilidades). Sé directo y profesional.

            Parámetros de la Tecnología:
            - **Sostenibilidad Ambiental**:
              - Balance de Carbono: ${inputs.carbonBalance}
              - Productos Valorizados: ${inputs.valorization.join(', ') || 'Ninguno'}
              - Manejo de Contaminantes: ${inputs.contaminants}
              - Eficiencia de Conversión: ${inputs.conversionEfficiency}%
            - **Viabilidad Económica**:
              - Costo de Capital (CAPEX): ${inputs.capex} €/ton
              - Costo Operacional (OPEX): ${inputs.opex} €/ton
              - Escalabilidad: ${inputs.scalability.join(', ') || 'No especificada'}
              - Dependencia de Materia Prima: ${inputs.feedstockIndependence}
            - **Transferibilidad y Aceptación**:
              - Madurez Tecnológica (TRL): ${inputs.trl}
              - Cumplimiento Normativo: ${inputs.compliance.join(', ') || 'No especificado'}
              - Facilidad de Operación: ${inputs.operationEase}

            Basado en estos datos, genera el análisis de fortalezas y debilidades.
            `;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt
            });
            setAiAnalysis(response.text);
        } catch (error) {
            setAiAnalysis("Error al contactar al servicio de IA. Por favor, inténtalo de nuevo.");
            console.error(error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const CheckboxGroup: React.FC<{ name: string; options: string[]; label: string }> = ({ name, options, label }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-2 space-y-2">
                {options.map(option => (
                    <label key={option} className="flex items-center">
                        <input
                            type="checkbox"
                            name={name}
                            value={option}
                            checked={(inputs as any)[name].includes(option)}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Evaluador de Viabilidad Global de Tecnologías de Residuos</h2>
                <p className="mt-2 text-md text-gray-600">Puntúa una tecnología para obtener una valoración instantánea de su potencial.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <Accordion title="Sostenibilidad Ambiental y Eficiencia Técnica" defaultOpen>
                        <FormSelect label="Balance de Carbono" name="carbonBalance" value={inputs.carbonBalance} onChange={handleInputChange}>
                            <option>Negativo</option><option>Neutro</option><option>Positivo Leve</option><option>Positivo Alto</option>
                        </FormSelect>
                        <CheckboxGroup name="valorization" label="Valorización de Productos" options={['Energía', 'Biochar', 'Biofertilizantes', 'Químicos']} />
                        <FormSelect label="Manejo de Contaminantes" name="contaminants" value={inputs.contaminants} onChange={handleInputChange}>
                            <option>Excelente</option><option>Bueno</option><option>Regular</option><option>Deficiente</option>
                        </FormSelect>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Eficiencia de Conversión ({inputs.conversionEfficiency}%)</label>
                            <input type="range" name="conversionEfficiency" min="0" max="100" value={inputs.conversionEfficiency} onChange={handleInputChange} className="w-full" />
                        </div>
                    </Accordion>
                     <Accordion title="Viabilidad Económica y Escala" defaultOpen>
                        <FormInput label="Costo de Capital (CAPEX - €/ton capacidad anual)" name="capex" type="number" value={inputs.capex} onChange={handleInputChange} />
                        <FormInput label="Costo Operacional (OPEX - €/ton procesado)" name="opex" type="number" value={inputs.opex} onChange={handleInputChange} />
                        <CheckboxGroup name="scalability" label="Escalabilidad" options={['Pequeña', 'Mediana', 'Grande']} />
                        <FormSelect label="Independencia Materia Prima" name="feedstockIndependence" value={inputs.feedstockIndependence} onChange={handleInputChange}>
                            <option>Muy Baja</option><option>Baja</option><option>Media</option><option>Alta</option><option>Muy Alta</option>
                        </FormSelect>
                     </Accordion>
                     <Accordion title="Transferibilidad y Aceptación" defaultOpen>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Madurez Tecnológica (TRL): {inputs.trl}</label>
                            <input type="range" name="trl" min="1" max="9" value={inputs.trl} onChange={handleInputChange} className="w-full" />
                        </div>
                        <CheckboxGroup name="compliance" label="Cumplimiento Normativo" options={['UE', 'EEUU', 'China', 'Otras']} />
                        <FormSelect label="Facilidad de Operación" name="operationEase" value={inputs.operationEase} onChange={handleInputChange}>
                            <option>Estándar</option><option>Moderada</option><option>Alta</option>
                        </FormSelect>
                     </Accordion>
                </div>
                <div className="sticky top-8">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-center mb-6">Panel de Resultados</h3>
                        <div className="flex justify-around items-center mb-8">
                            <ScoreGauge score={scores.sustainability} label="Ambiental" />
                            <ScoreGauge score={scores.economics} label="Económica" />
                            <ScoreGauge score={scores.transferability} label="Transferibilidad" />
                        </div>
                        <div className="text-center mb-6">
                            <h4 className="text-lg font-semibold text-gray-700">Puntuación Global de Viabilidad</h4>
                            <ScoreGauge score={scores.global} label="Global" />
                        </div>
                         <div className="pt-6 border-t">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Análisis por IA</h4>
                            <button onClick={handleAiAnalysis} disabled={isAnalyzing} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                                {isAnalyzing ? 'Analizando...' : 'Generar Resumen de Fortalezas y Debilidades'}
                            </button>
                            {aiAnalysis && (
                                <div className="mt-4 p-4 bg-white border rounded-md text-sm text-gray-700 max-h-60 overflow-y-auto whitespace-pre-wrap">
                                    {aiAnalysis}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};