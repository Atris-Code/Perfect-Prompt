import React, { useState, useMemo } from 'react';
import { FEEDSTOCK_DATA } from '../../data/feedstockData';
import type { Feedstock, PyrolysisMaterial } from '../../types';
import { generateMaterialVisual } from '../../services/geminiService';

const Bar: React.FC<{ label: string; value: number; color: string; maxValue: number }> = ({ label, value, color, maxValue }) => (
    <div className="grid grid-cols-4 items-center gap-2 text-sm">
        <span className="col-span-1 text-right text-gray-300">{label}</span>
        <div className="col-span-3 bg-slate-700 rounded-full h-6">
            <div
                className="h-6 rounded-full flex items-center justify-end pr-2 text-xs font-bold"
                style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: color }}
            >
                {value.toFixed(1)}%
            </div>
        </div>
    </div>
);


export const PropertyVisualizer: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Name (A-Z)');
    const [selectedFeedstockName, setSelectedFeedstockName] = useState(FEEDSTOCK_DATA[0].name);
    const [aiCriteria, setAiCriteria] = useState('');
    const [visualRepresentationImage, setVisualRepresentationImage] = useState<string | null>(null);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [visualizeError, setVisualizeError] = useState('');

    const filteredAndSortedFeedstocks = useMemo(() => {
        let filtered = FEEDSTOCK_DATA;

        if (searchQuery) {
            filtered = filtered.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (typeFilter !== 'All') {
            filtered = filtered.filter(f => f.type === typeFilter);
        }

        const sorted = [...filtered];
        switch (sortBy) {
            case 'Name (A-Z)':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Carbon % (High-Low)':
                sorted.sort((a, b) => b.composition.carbon - a.composition.carbon);
                break;
            case 'Hydrogen % (High-Low)':
                sorted.sort((a, b) => b.composition.hydrogen - a.composition.hydrogen);
                break;
            case 'Oxygen % (High-Low)':
                sorted.sort((a, b) => b.composition.oxygen - a.composition.oxygen);
                break;
        }
        return sorted;
    }, [searchQuery, typeFilter, sortBy]);

    const selectedFeedstock = useMemo(() => {
        return FEEDSTOCK_DATA.find(f => f.name === selectedFeedstockName);
    }, [selectedFeedstockName]);

    const compositionItems = useMemo(() => {
        if (!selectedFeedstock) return [];
        const { composition } = selectedFeedstock;
        return [
            { label: 'Cellulose', value: composition.cellulose },
            { label: 'Hemicellulose', value: composition.hemicellulose },
            { label: 'Lignin', value: composition.lignin },
        ].filter(item => typeof item.value === 'number') as { label: string; value: number }[];
    }, [selectedFeedstock]);
    
    const elementalItems = useMemo(() => {
        if (!selectedFeedstock) return [];
        const { composition } = selectedFeedstock;
        return [
            { label: 'Carbon', value: composition.carbon, color: '#64748b' },
            { label: 'Hydrogen', value: composition.hydrogen, color: '#cbd5e1' },
            { label: 'Oxygen', value: composition.oxygen, color: '#f87171' },
        ];
    }, [selectedFeedstock]);

    const handleGenerateVisual = async () => {
        if (!selectedFeedstock) return;

        const materialForVisual: PyrolysisMaterial = {
            id: 0, // dummy id
            nombre: selectedFeedstock.name,
            categoria: selectedFeedstock.type,
            fase: 'Sólido', // Assumption for this dataset
            propiedades: {} as any
        };

        setIsVisualizing(true);
        setVisualizeError('');
        try {
            const imageData = await generateMaterialVisual(materialForVisual, aiCriteria);
            setVisualRepresentationImage(imageData);
        } catch (error) {
            setVisualizeError(error instanceof Error ? error.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsVisualizing(false);
        }
    };

    const handleDownloadVisual = () => {
        if (!visualRepresentationImage || !selectedFeedstock) return;
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${visualRepresentationImage}`;
        link.download = `${selectedFeedstock.name.replace(/[\s(),]/g, '_')}_visual.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg w-full mx-auto">
            <header className="mb-10">
                <h2 className="text-3xl font-bold text-gray-100">Biomass & Bio-oil Properties Visualizer</h2>
                <p className="mt-2 text-md text-gray-400">Compare properties of different biomass types and their pyrolysis products.</p>
            </header>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="font-bold text-lg mb-4">Select & Configure</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="text-sm text-gray-300">Search by Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Pine Wood"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full mt-1 p-2 rounded bg-slate-700 border border-slate-600 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-300">Filter by Type</label>
                        <select
                            value={typeFilter}
                            onChange={e => setTypeFilter(e.target.value)}
                            className="w-full mt-1 p-2 rounded bg-slate-700 border border-slate-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option>All</option>
                            <option>Biomass</option>
                            <option>Peat</option>
                            <option>Coal</option>
                            <option>Oil & Fats</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-300">Sort by</label>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                             className="w-full mt-1 p-2 rounded bg-slate-700 border border-slate-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option>Name (A-Z)</option>
                            <option>Carbon % (High-Low)</option>
                            <option>Hydrogen % (High-Low)</option>
                            <option>Oxygen % (High-Low)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-300">Select Biomass</label>
                        <select
                            value={selectedFeedstockName}
                            onChange={e => setSelectedFeedstockName(e.target.value)}
                             className="w-full mt-1 p-2 rounded bg-slate-700 border border-slate-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {filteredAndSortedFeedstocks.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {selectedFeedstock && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                         <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Composition of {selectedFeedstock.name} <span className="text-sm text-gray-400 font-normal">({selectedFeedstock.type})</span></h3>
                             <button className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                csv
                            </button>
                        </div>
                        <div className="space-y-4">
                            {compositionItems.length > 0 ? (
                                <>
                                 <h4 className="text-sm font-semibold text-gray-400">Lignocellulosic Composition</h4>
                                <div className="flex h-48 items-end gap-4">
                                    {compositionItems.map(item => (
                                        <div key={item.label} className="flex-1 flex flex-col items-center justify-end">
                                            <div
                                                className="w-full bg-blue-500 rounded-t-md hover:bg-blue-400 transition-colors"
                                                style={{ height: `${item.value}%` }}
                                                title={`${item.label}: ${item.value}%`}
                                            ></div>
                                            <span className="text-xs mt-2 text-gray-400">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                                </>
                            ) : <p className="text-sm text-gray-400">No lignocellulosic data available for {selectedFeedstock.type}.</p>}

                            <div className="pt-4 border-t border-slate-700">
                                <h4 className="text-sm font-semibold text-gray-400 mb-3">Elemental Composition</h4>
                                <div className="space-y-3">
                                    {elementalItems.map(item => (
                                         <Bar key={item.label} label={item.label} value={item.value} color={item.color} maxValue={100} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h3 className="font-bold text-lg mb-4">Visual Representation</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="aiCriteria" className="text-sm text-gray-300">Criterios de IA (Opcional)</label>
                                <textarea
                                    id="aiCriteria"
                                    rows={3}
                                    value={aiCriteria}
                                    onChange={(e) => setAiCriteria(e.target.value)}
                                    placeholder="Ej: Cinematic, high detail, dark background..."
                                    className="w-full mt-1 p-2 rounded bg-slate-700 border border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                            </div>
                            <div className="flex items-center justify-center min-h-[200px] bg-slate-700 rounded-lg p-4">
                                {isVisualizing ? (
                                    <div className="text-center">
                                        <svg className="animate-spin h-8 w-8 text-blue-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p className="mt-4 text-sm text-gray-400">Generando imagen...</p>
                                    </div>
                                ) : visualizeError ? (
                                    <div className="text-center text-red-400">
                                        <p>Error: {visualizeError}</p>
                                        <button onClick={handleGenerateVisual} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                                            Intentar de Nuevo
                                        </button>
                                    </div>
                                ) : visualRepresentationImage ? (
                                    <div className="w-full text-center">
                                        <img src={`data:image/jpeg;base64,${visualRepresentationImage}`} alt={`Representación visual de ${selectedFeedstock.name}`} className="rounded-lg shadow-lg mb-4 w-full" />
                                        <div className="flex flex-wrap justify-center gap-4">
                                            <button onClick={handleGenerateVisual} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">Generar de Nuevo</button>
                                            <button onClick={handleDownloadVisual} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">Descargar</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-gray-400 mb-4">Generar una representación visual para {selectedFeedstock.name}</p>
                                        <button onClick={handleGenerateVisual} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                            🖼️ Generar Imagen con IA
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
