import React from 'react';
import type { View, IssuanceState, GaiaLabState, Task } from '../../types';
import { ContentType } from '../../types';
import { Accordion } from '../form/Accordion';

interface IAProStudioProps {
    issuanceState: IssuanceState;
    handleDeployContract: () => void;
    handleMintTokens: () => void;
    gaiaLabState: GaiaLabState;
    onTakeSample: () => void;
    setView: (view: View) => void;
    onSaveTask: (task: Task) => void;
}

const KpiCard: React.FC<{ label: string; value: string | number; unit: string; }> = ({ label, value, unit }) => (
    <div className="bg-slate-700 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-3xl font-bold font-mono text-white mt-1">
            {typeof value === 'number' ? value.toFixed(2) : value}
            <span className="text-lg text-slate-300 ml-1">{unit}</span>
        </p>
    </div>
);

export const IAProStudio: React.FC<IAProStudioProps> = ({
    issuanceState,
    handleDeployContract,
    handleMintTokens,
    gaiaLabState,
    onTakeSample,
    setView,
    onSaveTask,
}) => {
    const { isNewBatchReady, sampleId, analysisResults, quality } = gaiaLabState;

    const handleAnnounceAssetCreation = () => {
        if (!gaiaLabState.sampleId || !gaiaLabState.quality || !gaiaLabState.analysisResults || !issuanceState.contractAddress) {
            alert("Faltan datos de la muestra o de la emisión para crear el anuncio.");
            return;
        }

        const rawData = `
### Paquete de Contexto (Tokenización)
- **ID del Lote:** ${gaiaLabState.sampleId}
- **Veredicto del Agente:** ${gaiaLabState.quality}
- **Aptitud:** Apto para Terra Preta y créditos de carbono
- **Propiedades Físicas:**
  - Carbono Fijo: ${gaiaLabState.analysisResults.carbon}%
  - pH: ${gaiaLabState.analysisResults.ph}
  - Porosidad: ${gaiaLabState.analysisResults.porosity} m²/g
  - Cenizas: ${gaiaLabState.analysisResults.ash}%
- **Prueba en Blockchain:**
  - Contrato: ${issuanceState.contractAddress}
  - Eventos de Acuñación: \n${issuanceState.events.filter(e => e.includes('ÉXITO')).join('\n')}
        `.trim();

        const newTask: Task = {
            id: `task-announcement-${Date.now()}`,
            title: `Anuncio de Tokenización: Lote ${gaiaLabState.sampleId}`,
            createdAt: Date.now(),
            status: 'Por Hacer',
            contentType: ContentType.Texto,
            formData: {
                objective: `Generar un comunicado de prensa para anunciar la exitosa creación de un activo de biochar tokenizado (Lote ${gaiaLabState.sampleId}), validado como '${gaiaLabState.quality}' y respaldado en la blockchain.`,
                specifics: {
                    [ContentType.Texto]: {
                        narrativeCatalyst: 'Comunicado de Tokenización de Activo',
                        rawData: rawData
                    },
                    [ContentType.Imagen]: {},
                    [ContentType.Video]: {},
                    [ContentType.Audio]: {},
                    [ContentType.Codigo]: {},
                }
            },
            isIntelligent: false,
            eventType: 'ExecutiveReport',
        };

        onSaveTask(newTask);
        alert("Tarea 'Anuncio de Tokenización' creada. Cárgala desde el Gestor de Tareas para autocompletar el Creador de Prompts.");
        setView('tasks');
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
             <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Laboratorio de Bioeconomía</h2>
                <p className="mt-2 text-md text-gray-600">Control de calidad de biochar y tokenización de activos de la bioeconomía.</p>
            </header>

            <Accordion title="Laboratorio de Calidad Gaia" defaultOpen={true}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 bg-slate-900 text-white rounded-lg">
                    {/* Columna 1: Muestreo y Acciones */}
                    <div className="lg:col-span-1 space-y-6">
                         <div className="bg-slate-800 p-4 rounded-lg h-full flex flex-col">
                            <h4 className="font-bold text-lg text-cyan-400 mb-3 border-b border-slate-700 pb-2">1. Panel de Muestreo</h4>
                            <div className="flex-grow flex flex-col items-center justify-center p-4">
                                {isNewBatchReady ? (
                                    <p className="text-green-400 font-semibold mb-4 animate-pulse">¡Nuevo lote de biochar listo para analizar!</p>
                                ) : (
                                    <p className="text-slate-400 mb-4">Esperando nuevo lote de biochar desde el Módulo Vulcano...</p>
                                )}
                                <button
                                    onClick={onTakeSample}
                                    disabled={!isNewBatchReady || !!analysisResults}
                                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                                >
                                    {analysisResults ? 'Muestra Tomada' : 'Tomar Muestra del Lote'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Columna 2: Análisis */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-800 p-4 rounded-lg h-full">
                            <h4 className="font-bold text-lg text-cyan-400 mb-3 border-b border-slate-700 pb-2">2. Panel de Análisis (Simulado)</h4>
                            {!analysisResults ? (
                                <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.25l2.387.477a2 2 0 011.022.547l-2.387-.477a6 6 0 01-3.86-.517l-.318-.158a6 6 0 00-3.86-.517l-2.387-.477a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" /></svg>
                                    <p>Esperando muestra para análisis...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                                    <KpiCard label="Carbono Fijo" value={analysisResults.carbon} unit="%" />
                                    <KpiCard label="Nivel de pH" value={analysisResults.ph} unit="" />
                                    <KpiCard label="Porosidad (BET)" value={analysisResults.porosity} unit="m²/g" />
                                    <KpiCard label="Contenido de Cenizas" value={analysisResults.ash} unit="%" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {quality && (
                     <div className="lg:col-span-3 mt-4">
                        <div className="bg-slate-800 p-4 rounded-lg h-full">
                             <h4 className="font-bold text-lg text-cyan-400 mb-3 border-b border-slate-700 pb-2">3. Panel de Clasificación (Agente Hefesto)</h4>
                             <div className="flex flex-col items-center justify-center p-4 text-center animate-fade-in">
                                <p className="text-sm text-slate-400">Lote de Muestra: <span className="font-mono">{sampleId}</span></p>
                                <div className={`mt-4 px-6 py-3 rounded-lg border-2 ${quality === 'PREMIUM' ? 'border-yellow-400 bg-yellow-900/50' : 'border-gray-500 bg-gray-700/50'}`}>
                                    <p className="text-xs uppercase tracking-widest text-slate-300">Veredicto de Hefesto</p>
                                    <p className={`text-2xl font-bold ${quality === 'PREMIUM' ? 'text-yellow-300' : 'text-gray-200'}`}>
                                        {quality === 'PREMIUM' ? 'CALIDAD PREMIUM' : 'CALIDAD ESTÁNDAR'}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {quality === 'PREMIUM' ? '(Apto para Terra Preta y créditos de carbono)' : '(Apto para enmienda general)'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Accordion>
            
            <Accordion title="Consola de Emisión de Activos Tokenizados" defaultOpen={issuanceState.tokenStatus === 'MINTED'}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">Simula el proceso de creación de un activo digital en una blockchain de prueba (Testnet).</p>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleDeployContract}
                            disabled={issuanceState.contractStatus === 'DEPLOYED'}
                            className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {issuanceState.contractStatus === 'DEPLOYED' ? 'Contrato Desplegado ✓' : '1. Desplegar Smart Contract'}
                        </button>
                        <button
                            type="button"
                            onClick={handleMintTokens}
                            disabled={issuanceState.contractStatus !== 'DEPLOYED' || issuanceState.tokenStatus === 'MINTED'}
                            className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                           {issuanceState.tokenStatus === 'MINTED' ? 'Tokens Acuñados ✓' : '2. Acuñar Tokens (Mint)'}
                        </button>
                    </div>
                    {issuanceState.tokenStatus === 'MINTED' && (
                        <div className="pt-4 mt-4 border-t border-gray-200 animate-fade-in space-y-3">
                            <p className="text-sm text-center text-green-600 font-semibold">¡Emisión completada! El activo está listo para los siguientes pasos.</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAnnounceAssetCreation}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105"
                                >
                                    Anunciar Creación de Activo (Sinergia)
                                </button>
                                <button
                                    onClick={() => setView('agriDeFi')}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
                                >
                                    Ir a la Plataforma de Lanzamiento (STO) →
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="mt-4 p-4 bg-gray-800 text-gray-200 rounded-md font-mono text-xs h-48 overflow-y-auto">
                        <p className="text-yellow-400">&gt; Registro de Eventos de la Blockchain:</p>
                        {issuanceState.events.map((event, index) => (
                            <p key={index} className="whitespace-pre-wrap animate-fade-in">{`> ${event}`}</p>
                        ))}
                    </div>
                </div>
            </Accordion>
        </div>
    );
};