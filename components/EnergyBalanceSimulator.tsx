import React, { useState } from 'react';

interface CreativeContext {
  sourceApp: string;
  feedstock: string;
  efficiency: number;
  isEnergyPositive: boolean;
  timestamp: number;
}

interface HistoricalRun extends CreativeContext {
    id: number;
}

interface EnergyBalanceSimulatorProps {
  onNavigateWithContext: (context: CreativeContext) => void;
  generatedPrompts: Record<string, string>;
}

export const EnergyBalanceSimulator: React.FC<EnergyBalanceSimulatorProps> = ({ onNavigateWithContext, generatedPrompts }) => {
    const [feedstock, setFeedstock] = useState('Algae (Spirulina)');
    const [efficiency, setEfficiency] = useState(75);
    const [isEnergyPositive, setIsEnergyPositive] = useState(true);
    const [historicalRuns, setHistoricalRuns] = useState<HistoricalRun[]>([]);
    const [activePrompt, setActivePrompt] = useState<string | null>(null);

    const handleCreateCreativeSpace = () => {
        const timestamp = Date.now();
        const creativeContext: CreativeContext = {
            sourceApp: 'PyrolysisHub',
            feedstock,
            efficiency,
            isEnergyPositive,
            timestamp,
        };

        const newRun: HistoricalRun = { ...creativeContext, id: timestamp };
        setHistoricalRuns(prev => [newRun, ...prev.slice(0, 4)]); // Keep last 5 runs

        onNavigateWithContext(creativeContext);
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Pyrolysis Hub Simulator</h2>
                <p className="mt-2 text-md text-gray-600">Define los parámetros de tu simulación y crea un espacio creativo.</p>
            </header>

            {activePrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setActivePrompt(null)}>
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                        <h3 className="font-bold text-lg mb-4">Prompt Vinculado</h3>
                        <pre className="text-sm bg-gray-100 p-4 rounded-md whitespace-pre-wrap font-mono max-h-80 overflow-y-auto">{activePrompt}</pre>
                        <div className="text-right mt-4">
                            <button onClick={() => setActivePrompt(null)} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold">Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6 p-6 border rounded-lg bg-white">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Creative Context Inputs</h3>
                    <div>
                        <label htmlFor="feedstock" className="block text-sm font-medium text-gray-700">Feedstock</label>
                        <input
                            type="text"
                            id="feedstock"
                            value={feedstock}
                            onChange={(e) => setFeedstock(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="efficiency" className="block text-sm font-medium text-gray-700">Overall Process Efficiency: {efficiency}%</label>
                        <input
                            id="efficiency"
                            type="range"
                            min="0"
                            max="100"
                            value={efficiency}
                            onChange={(e) => setEfficiency(parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            id="isEnergyPositive"
                            type="checkbox"
                            checked={isEnergyPositive}
                            onChange={(e) => setIsEnergyPositive(e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isEnergyPositive" className="ml-2 block text-sm text-gray-900">Energy Positive Process</label>
                    </div>
                    <div className="pt-4">
                        <p className="text-sm text-gray-600 mb-2">Transforma estos datos en una narrativa impactante.</p>
                        <button
                            onClick={handleCreateCreativeSpace}
                            className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                        >
                            ✨ Crear Espacio Creativo
                        </button>
                    </div>
                </div>

                {/* Historical Runs Section */}
                <div className="space-y-4 p-6 border rounded-lg bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Historical Runs</h3>
                    {historicalRuns.length > 0 ? (
                        historicalRuns.map(run => (
                            <div key={run.id} className="bg-white p-4 rounded-lg border shadow-sm">
                                <p className="text-sm font-mono text-gray-500">{new Date(run.timestamp).toLocaleString()}</p>
                                <ul className="text-sm mt-2 space-y-1">
                                    <li><strong>Feedstock:</strong> {run.feedstock}</li>
                                    <li><strong>Efficiency:</strong> {run.efficiency}%</li>
                                    <li><strong>Energy Positive:</strong> {run.isEnergyPositive ? 'Yes' : 'No'}</li>
                                </ul>
                                {generatedPrompts[run.timestamp] && (
                                    <div className="mt-3 pt-3 border-t">
                                        <button 
                                            onClick={() => setActivePrompt(generatedPrompts[run.timestamp])}
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                                        >
                                            Ver Prompt Vinculado ✨
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No hay simulaciones recientes.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnergyBalanceSimulator;
