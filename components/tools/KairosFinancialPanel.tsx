import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { ChronosState, STOState } from '../../types';

// IRR calculation using iterative approach (simplified Newton-Raphson)
const calculateIRR = (cashFlows: number[], initialGuess = 0.1, iterations = 100): number => {
    let irr = initialGuess;
    for (let i = 0; i < iterations; i++) {
        let npv = 0;
        let derivative = 0;
        for (let t = 0; t < cashFlows.length; t++) {
            npv += cashFlows[t] / Math.pow(1 + irr, t);
            if (t > 0) {
                derivative -= t * cashFlows[t] / Math.pow(1 + irr, t + 1);
            }
        }
        if (Math.abs(npv) < 1e-6) {
            return irr * 100;
        }
        if (derivative === 0) break; 
        irr = irr - npv / derivative;
    }
    return irr * 100; // Return as percentage
};

const calculateNPV = (cashFlows: number[], discountRate: number): number => {
    let npv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + discountRate, t);
    }
    return npv;
};

interface KairosFinancialPanelProps {
    chronosState: ChronosState;
    stoState: STOState;
}

const Panel: React.FC<React.PropsWithChildren<{ title: string; }>> = ({ title, children }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const Indicator: React.FC<{ label: string; value: string | number; unit?: string; valueClassName?: string; isLoading?: boolean }> = ({ label, value, unit, valueClassName, isLoading }) => (
    <div className="flex justify-between items-baseline py-2 border-b border-slate-700/50">
        <span className="text-slate-400">{label}</span>
        {isLoading ? (
            <div className="h-6 bg-slate-700 rounded w-24 animate-pulse"></div>
        ) : (
            <span className={`font-mono font-semibold text-white text-xl ${valueClassName}`}>
                {value}
                {unit && <span className="text-slate-400 text-sm ml-1.5">{unit}</span>}
            </span>
        )}
    </div>
);

export const KairosFinancialPanel: React.FC<KairosFinancialPanelProps> = ({ chronosState, stoState }) => {
    // Project Inputs
    const [assetValue, setAssetValue] = useState(chronosState.assetOrigin.marketValue);
    const [capitalToRaise, setCapitalToRaise] = useState(stoState.target);
    const [productionCosts, setProductionCosts] = useState(160000);
    const [projectName, setProjectName] = useState(chronosState.tokenStructure.tokenName);
    const [projectYears, setProjectYears] = useState(5);

    // Financial Config
    const COST_OF_CAPITAL = 0.12; // 12%

    // Calculated Metrics
    const [vpn, setVpn] = useState<number | null>(null);
    const [tir, setTir] = useState<number | null>(null);
    const [payback, setPayback] = useState<number | null>(null);

    // AI Verdict
    const [verdict, setVerdict] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCalculationsAndVerdict = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setVerdict('');
        setVpn(null);
        setTir(null);
        setPayback(null);

        try {
            // 1. Simulate Calculations
            const initialInvestment = -capitalToRaise;
            const annualRevenue = assetValue / projectYears;
            const annualCosts = productionCosts / projectYears;
            const annualCashFlow = annualRevenue - annualCosts;

            if (annualCashFlow <= 0) {
                 setError("El flujo de caja anual es negativo o cero. Ajusta los valores para continuar.");
                 setIsLoading(false);
                 return;
            }

            const cashFlows = [initialInvestment, ...Array(projectYears).fill(annualCashFlow)];

            const calculatedNpv = calculateNPV(cashFlows, COST_OF_CAPITAL);
            const calculatedIrr = calculateIRR(cashFlows);
            const calculatedPayback = -initialInvestment / annualCashFlow;

            setVpn(calculatedNpv);
            setTir(calculatedIrr);
            setPayback(calculatedPayback);

            // 2. Generate AI Verdict
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const systemInstruction = `Eres Kairos, un estratega financiero de IA. Eres analítico, calmado y data-driven. No das órdenes; presentas escenarios y recomendaciones en un lenguaje claro y accionable. Tu propósito es empoderar al Director para que tome las mejores decisiones financieras.`;
            const userPrompt = `He analizado el proyecto '${projectName}'. La Tasa Interna de Retorno (TIR) proyectada es del ${calculatedIrr.toFixed(2)}%, y nuestro coste de capital es del ${(COST_OF_CAPITAL * 100)}%. Basado en estos datos, genera un veredicto inicial conciso y profesional en español sobre si proceder con la tokenización, tal como se describe en el perfil del agente Kairos. Incluye un comentario sobre el riesgo de mercado si lo consideras apropiado.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userPrompt,
                config: { systemInstruction }
            });

            setVerdict(response.text);

        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "Ocurrió un error al generar el veredicto.");
        } finally {
            setIsLoading(false);
        }
    }, [assetValue, capitalToRaise, productionCosts, projectName, projectYears]);

    useEffect(() => {
        handleCalculationsAndVerdict();
    }, []);

    return (
        <div className="bg-slate-900 text-white p-8 rounded-lg min-h-full font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">Panel de Proyección de Kairos</h1>
                <p className="text-slate-400 mt-2">Análisis de Viabilidad para Nuevos Proyectos de Tokenización</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Panel title="Datos del Proyecto (Chronos)">
                         <div>
                            <label htmlFor="projectName" className="text-sm font-medium text-slate-300 mb-1 block">Nombre del Proyecto</label>
                            <input id="projectName" type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="assetValue" className="text-sm font-medium text-slate-300 mb-1 block">Valor del Activo</label>
                            <input id="assetValue" type="number" value={assetValue} onChange={e => setAssetValue(Number(e.target.value))} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"/>
                        </div>
                         <div>
                            <label htmlFor="capitalToRaise" className="text-sm font-medium text-slate-300 mb-1 block">Capital a Recaudar</label>
                            <input id="capitalToRaise" type="number" value={capitalToRaise} onChange={e => setCapitalToRaise(Number(e.target.value))} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="productionCosts" className="text-sm font-medium text-slate-300 mb-1 block">Costes de Producción Totales</label>
                            <input id="productionCosts" type="number" value={productionCosts} onChange={e => setProductionCosts(Number(e.target.value))} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"/>
                        </div>
                         <div>
                            <label htmlFor="projectYears" className="text-sm font-medium text-slate-300 mb-1 block">Duración del Proyecto (Años)</label>
                            <input id="projectYears" type="number" value={projectYears} onChange={e => setProjectYears(Number(e.target.value))} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"/>
                        </div>
                    </Panel>
                    <button onClick={handleCalculationsAndVerdict} disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors">
                        {isLoading ? 'Analizando...' : 'Recalcular y Generar Veredicto'}
                    </button>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Panel title="Indicadores Clave Calculados">
                        <Indicator
                            label="VPN (Valor Presente Neto)"
                            value={vpn !== null ? vpn.toLocaleString('es-ES', { style: 'currency', currency: 'USD' }) : '-'}
                            valueClassName={vpn !== null ? (vpn > 0 ? 'text-green-400' : 'text-red-400') : ''}
                            isLoading={isLoading}
                        />
                         <Indicator
                            label="TIR (Tasa Interna de Retorno)"
                            value={tir !== null ? tir.toFixed(2) : '-'}
                            unit="%"
                            valueClassName={tir !== null ? (tir > COST_OF_CAPITAL * 100 ? 'text-green-400' : 'text-red-400') : ''}
                            isLoading={isLoading}
                        />
                         <Indicator
                            label="Payback (Periodo de Recuperación)"
                            value={payback !== null ? payback.toFixed(2) : '-'}
                            unit="años"
                            isLoading={isLoading}
                        />
                         <p className="text-xs text-slate-500 pt-2">Cálculos basados en un coste de capital del {(COST_OF_CAPITAL * 100).toFixed(0)}%.</p>
                    </Panel>

                    <Panel title="Veredicto del Agente: Kairos">
                        {isLoading && !verdict ? (
                             <div className="flex justify-center items-center h-24">
                                <p className="text-slate-400 animate-pulse">Kairos está analizando los datos...</p>
                             </div>
                        ) : error ? (
                             <p className="text-red-400">{error}</p>
                        ) : (
                            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{verdict || "El veredicto del agente aparecerá aquí."}</p>
                        )}
                    </Panel>
                </div>
            </div>
        </div>
    );
};
