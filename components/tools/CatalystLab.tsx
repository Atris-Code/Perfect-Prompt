import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { SynthesizedCatalyst } from '../../types';
import { getAiCatalystAnalysis } from '../../services/geminiService';
import { Accordion } from '../form/Accordion';
import { FormInput } from '../form/FormControls';
import { KNOWLEDGE_BASE } from '../../data/knowledgeBase';

declare global {
  interface Window {
    $3Dmol: any;
  }
}

type FrameworkType = 'AEL' | 'AST' | 'MFI' | null;

interface ZeoliteViewerProps {
    frameworkType: FrameworkType;
}

const ZeoliteViewer: React.FC<ZeoliteViewerProps> = ({ frameworkType }) => {
    const viewerContainerRef = useRef<HTMLDivElement>(null);
    const viewerInstance = useRef<any>(null);
    const sphereInstance = useRef<any>(null);
    const surfaceInstance = useRef<any>(null);

    const [displayStyle, setDisplayStyle] = useState<'siOnly' | 'siAndO'>('siOnly');
    const [stickStyle, setStickStyle] = useState<'stick' | 'wireframe' | 'ballAndStick'>('stick');
    const [surfaceDisplay, setSurfaceDisplay] = useState<'noSurface' | 'cages' | 'channels'>('noSurface');
    const [showSphere, setShowSphere] = useState(true);
    const [sphereDiameter, setSphereDiameter] = useState(7.2);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Effect for creating/destroying viewer and loading model data
    useEffect(() => {
        if (!frameworkType || !viewerContainerRef.current) {
            if (viewerInstance.current) {
                viewerInstance.current.clear();
                viewerInstance.current = null;
            }
            setIsLoading(false);
            setError(null);
            return;
        }

        if (typeof (window as any).$3Dmol === 'undefined') {
            setError("La librería de visualización 3D (3Dmol.js) no se pudo cargar. Comprueba tu conexión e inténtalo de nuevo.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        let viewer = (window as any).$3Dmol.createViewer(viewerContainerRef.current, {
            defaultcolors: (window as any).$3Dmol.elementColors.Jmol
        });
        viewerInstance.current = viewer;
        
        let cifData: string | undefined;
        switch (frameworkType) {
            case 'AEL': cifData = KNOWLEDGE_BASE.ZEOLITE_FRAMEWORK_AEL; break;
            case 'AST': cifData = KNOWLEDGE_BASE.ZEOLITE_FRAMEWORK_AST; break;
            case 'MFI': cifData = KNOWLEDGE_BASE.ZEOLITE_FRAMEWORK_MFI; break;
        }

        if (cifData) {
            try {
                viewer.addModel(cifData.trim(), 'cif');
                viewer.zoomTo();
                viewer.render();
            } catch (err) {
                console.error("Error adding CIF model from local data:", err);
                setError(`Error al procesar la estructura para ${frameworkType}.`);
            }
        } else {
            setError(`No se encontró la estructura para ${frameworkType}.`);
        }
        setIsLoading(false);
            
        return () => {
             if (viewerInstance.current) {
                viewerInstance.current.clear();
                viewerInstance.current = null;
             }
        };
    }, [frameworkType]);

    // Effect for updating styles on the existing viewer
    useEffect(() => {
        const viewer = viewerInstance.current;
        if (!viewer) return;
        
        viewer.setStyle({}, {});

        const styleSpec: any = {};
        if (stickStyle === 'wireframe') styleSpec.wireframe = { radius: 0.05 };
        else if (stickStyle === 'stick') styleSpec.stick = {};

        const atomsToStyle = displayStyle === 'siOnly' ? { elem: ['Si', 'Al', 'P'] } : {};
        
        viewer.setStyle(atomsToStyle, styleSpec);

        if (stickStyle === 'ballAndStick') {
            viewer.setStyle(atomsToStyle, { stick: { radius: 0.1 } });
            viewer.addStyle(atomsToStyle, { sphere: { scale: 0.3 } });
        }

        if (surfaceInstance.current) {
            viewer.removeSurface(surfaceInstance.current);
            surfaceInstance.current = null;
        }
        if (surfaceDisplay !== 'noSurface') {
            const surfaceOptions = {
                opacity: 0.6,
                color: surfaceDisplay === 'cages' ? '#a78bfa' : '#67e8f9',
                probeRadius: 1.4 // Use a probe to detect pore surfaces
            };
            // Use Solvent Accessible Surface to visualize channels/cages, based on all atoms.
            surfaceInstance.current = viewer.addSurface((window as any).$3Dmol.SurfaceType.SAS, surfaceOptions, {});
        }

        if (sphereInstance.current) {
            viewer.removeSphere(sphereInstance.current);
            sphereInstance.current = null;
        }
        if (showSphere) {
            sphereInstance.current = viewer.addSphere({
                radius: sphereDiameter / 2.0,
                color: '#f87171', // red-400
                alpha: 0.75
            });
        }
        
        viewer.render();
    }, [displayStyle, stickStyle, surfaceDisplay, showSphere, sphereDiameter, frameworkType]); // Rerun on frameworkType change to style the new model
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div ref={viewerContainerRef} className="md:col-span-2 relative w-full aspect-square bg-black rounded-lg">
                {(isLoading || error) && (
                    <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50">
                        {isLoading ? (
                             <>
                                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <span className="ml-3">Cargando Estructura...</span>
                            </>
                        ) : (
                            <span className="text-red-400 p-4">{error}</span>
                        )}
                    </div>
                )}
            </div>
            <div className="space-y-4 text-sm text-slate-300">
                <h4 className="font-bold text-lg text-white">Zeolite Viewer</h4>
                <div>
                    <h5 className="font-semibold mb-2">Display Style</h5>
                    <div className="space-y-1">
                         <label className="flex items-center"><input type="radio" name="displayStyle" value="siOnly" checked={displayStyle === 'siOnly'} onChange={e => setDisplayStyle(e.target.value as any)} className="mr-2"/> Si only (T atoms)</label>
                         <label className="flex items-center"><input type="radio" name="displayStyle" value="siAndO" checked={displayStyle === 'siAndO'} onChange={e => setDisplayStyle(e.target.value as any)} className="mr-2"/> Si and O</label>
                    </div>
                </div>

                <div>
                    <h5 className="font-semibold mb-2">Style</h5>
                    <div className="space-y-1">
                        <label className="flex items-center"><input type="radio" name="stickStyle" value="wireframe" checked={stickStyle === 'wireframe'} onChange={e => setStickStyle(e.target.value as any)} className="mr-2"/> Wireframe</label>
                        <label className="flex items-center"><input type="radio" name="stickStyle" value="stick" checked={stickStyle === 'stick'} onChange={e => setStickStyle(e.target.value as any)} className="mr-2"/> Stick</label>
                        <label className="flex items-center"><input type="radio" name="stickStyle" value="ballAndStick" checked={stickStyle === 'ballAndStick'} onChange={e => setStickStyle(e.target.value as any)} className="mr-2"/> Ball and Stick</label>
                    </div>
                </div>

                 <div>
                    <h5 className="font-semibold mb-2">Surface Display</h5>
                    <div className="space-y-1">
                         <label className="flex items-center"><input type="radio" name="surface" value="noSurface" checked={surfaceDisplay === 'noSurface'} onChange={e => setSurfaceDisplay(e.target.value as any)} className="mr-2"/> No Surface</label>
                         <label className={`flex items-center ${frameworkType !== 'AST' ? 'opacity-50' : ''}`}><input type="radio" name="surface" value="cages" checked={surfaceDisplay === 'cages'} onChange={e => setSurfaceDisplay(e.target.value as any)} className="mr-2" disabled={frameworkType !== 'AST'}/> Cages</label>
                         <label className={`flex items-center ${frameworkType !== 'AEL' && frameworkType !== 'MFI' ? 'opacity-50' : ''}`}><input type="radio" name="surface" value="channels" checked={surfaceDisplay === 'channels'} onChange={e => setSurfaceDisplay(e.target.value as any)} className="mr-2" disabled={frameworkType !== 'AEL' && frameworkType !== 'MFI'}/> Channels</label>
                    </div>
                </div>

                <div>
                    <h5 className="font-semibold mb-2">Molecule Superposition</h5>
                     <label className="flex items-center mb-2"><input type="checkbox" checked={showSphere} onChange={e => setShowSphere(e.target.checked)} className="mr-2"/> Show Molecule Sphere</label>
                    {showSphere && (
                         <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-medium">Diámetro</label>
                                <span className="font-mono text-xs bg-slate-600 px-2 py-0.5 rounded-md">{sphereDiameter.toFixed(1)} Å</span>
                            </div>
                            <input type="range" min="2.0" max="10.0" step="0.1" value={sphereDiameter} onChange={e => setSphereDiameter(Number(e.target.value))} className="w-full accent-blue-500" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const Panel: React.FC<React.PropsWithChildren<{ title: string; }>> = ({ title, children }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-3">{title}</h3>
        <div className="space-y-6">{children}</div>
    </div>
);

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
    <div className="relative group inline-block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="absolute bottom-full mb-2 w-64 bg-slate-700 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {text}
        </div>
    </div>
);

const Slider: React.FC<{ label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; tooltip: string }> = ({ label, value, min, max, step, unit, onChange, tooltip }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                {label}
                <InfoTooltip text={tooltip} />
            </label>
            <span className="font-mono text-sm bg-slate-600 text-white px-2 py-0.5 rounded-md">{value.toFixed(1)} {unit}</span>
        </div>
        <input
            type="range"
            min={min} max={max} step={step} value={value}
            onChange={onChange}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
    </div>
);

const ResultsTable: React.FC<{ catalyst: SynthesizedCatalyst }> = ({ catalyst }) => {
    const { properties, frameworkType } = catalyst;
    const getSelectivityClass = (selectivity: string) => {
        if (selectivity === 'Alta') return 'text-green-400';
        if (selectivity === 'Media') return 'text-yellow-400';
        return 'text-red-400';
    };
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="font-semibold text-slate-400">Propiedad</div>
                <div className="font-semibold text-slate-400 text-right">Valor</div>
                
                <div className="text-slate-300">Framework Type</div>
                <div className="text-right font-mono font-bold text-cyan-400">{frameworkType}</div>

                <div className="text-slate-300">Acidez</div>
                <div className="text-right font-mono">{properties.acidity.toFixed(1)}</div>
                
                <div className="text-slate-300">Estabilidad Térmica</div>
                <div className="text-right font-mono">{properties.thermalStability.toFixed(1)}</div>

                <div className="text-slate-300">Resistencia al Coque</div>
                <div className="text-right font-mono">{properties.cokeResistance.toFixed(1)}</div>
                
                <div className="text-slate-300">Selectividad de Forma</div>
                <div className={`text-right font-mono font-bold ${getSelectivityClass(properties.shapeSelectivity)}`}>{properties.shapeSelectivity}</div>
                
                <div className="text-slate-300">Tamaño de Cristal</div>
                <div className="text-right font-mono">{properties.crystalSize.toFixed(0)} nm</div>

                <div className="text-slate-300">Volumen de Microporo</div>
                <div className="text-right font-mono">{properties.microporeVolume.toFixed(3)} cm³/g</div>

                <div className="text-slate-300">Volumen de Mesoporo</div>
                <div className="text-right font-mono">{properties.mesoporeVolume.toFixed(3)} cm³/g</div>
            </div>
        </div>
    );
};


export const CatalystLab: React.FC = () => {
    const [name, setName] = useState('Zeolita Avanzada Z-2');
    const [siAlRatio, setSiAlRatio] = useState(27.0);
    const [templateType, setTemplateType] = useState<'Orgánico (TPAOH)' | 'Inorgánico (Na+)' | 'Sin Plantilla'>('Orgánico (TPAOH)');
    const [crystallizationTime, setCrystallizationTime] = useState(48.0);
    const [calcinationTemp, setCalcinationTemp] = useState(580.0);

    const [synthesizedCatalyst, setSynthesizedCatalyst] = useState<SynthesizedCatalyst | null>(null);
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSynthesize = useCallback(async () => {
        setIsLoading(true);
        setError('');
        setSynthesizedCatalyst(null);
        setAiAnalysis('');
        
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            // Step 1: Simulate Catalyst Properties
            let frameworkType: FrameworkType;
            if (siAlRatio > 40) frameworkType = 'MFI';
            else if (siAlRatio > 15) frameworkType = 'AEL';
            else frameworkType = 'AST';

            let acidity = 100 - (siAlRatio * 1.8);
            if (calcinationTemp > 550) acidity -= (calcinationTemp - 550) * 0.05;
            
            const thermalStability = siAlRatio * 1.5 + (calcinationTemp / 10);
            
            let microporeVolume = 0.18 - (siAlRatio / 500);
            if (templateType === 'Orgánico (TPAOH)') microporeVolume *= 1.15;
            if (templateType === 'Inorgánico (Na+)') microporeVolume *= 0.9;
            if (frameworkType === 'AST') microporeVolume *= 0.1; // AST has smaller pores generally

            let mesoporeVolume = 0.01;
            if (calcinationTemp > 600) mesoporeVolume += (calcinationTemp - 600) * 0.0005;
            if (frameworkType === 'AEL') mesoporeVolume *= 1.2;
            
            const crystalSize = 80 + crystallizationTime * 4;
            
            const cokeResistance = thermalStability * 0.4 + (100 - acidity) * 0.3 + (mesoporeVolume * 1000) * 0.3;
            
            let shapeSelectivity: 'Alta' | 'Media' | 'Baja';
            if (frameworkType === 'MFI') shapeSelectivity = 'Alta';
            else if (frameworkType === 'AEL') shapeSelectivity = 'Media';
            else shapeSelectivity = 'Baja';

            const catalyst: SynthesizedCatalyst = {
                name,
                siAlRatio,
                templateType,
                crystallizationTime,
                calcinationTemp,
                properties: {
                    acidity: Math.max(5, Math.min(95, acidity)),
                    thermalStability: Math.max(10, Math.min(98, thermalStability)),
                    cokeResistance: Math.max(10, Math.min(95, cokeResistance)),
                    shapeSelectivity,
                    microporeVolume: Math.max(0.001, microporeVolume),
                    mesoporeVolume: Math.max(0.001, mesoporeVolume),
                    crystalSize: Math.max(50, crystalSize),
                },
                frameworkType,
            };
            setSynthesizedCatalyst(catalyst);
            
            // Step 2: Get AI Analysis
            const analysis = await getAiCatalystAnalysis(catalyst);
            setAiAnalysis(analysis);

        } catch (e) {
            setError(e instanceof Error ? e.message : 'Error desconocido durante la simulación.');
        } finally {
            setIsLoading(false);
        }
    }, [name, siAlRatio, templateType, crystallizationTime, calcinationTemp]);
    
    const handleSaveToHub = () => {
        alert('Funcionalidad para guardar catalizadores en el Hub estará disponible próximamente.');
    };

    return (
        <div className="bg-slate-900 text-white p-8 rounded-lg min-h-full font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">Laboratorio de Catalizadores (Avanzado)</h1>
                <p className="text-slate-400 mt-2">Diseña, sintetiza y evalúa catalizadores de zeolita virtuales con asistencia de IA.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Panel title="Configuración de Síntesis">
                    <FormInput
                        label="Nombre del Catalizador"
                        id="catalystName"
                        name="catalystName"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                    />

                    <Accordion title="Síntesis Hidrotermal" defaultOpen>
                        <Slider label="Relación Si/Al" value={siAlRatio} min={5} max={100} step={1} unit="" onChange={e => setSiAlRatio(Number(e.target.value))} tooltip="Controla la densidad de sitios ácidos y el tipo de framework. Menor ratio = más acidez, pero menor estabilidad y selectividad." />
                        <div>
                             <label className="text-sm font-medium text-slate-300 flex items-center gap-2">Tipo de Plantilla (SDA) <InfoTooltip text="El Agente Director de Estructura (SDA) guía la formación de la estructura porosa."/></label>
                             <select value={templateType} onChange={e => setTemplateType(e.target.value as any)} className="w-full p-2 mt-1 bg-slate-700 border border-slate-600 rounded-md">
                                <option>Orgánico (TPAOH)</option>
                                <option>Inorgánico (Na+)</option>
                                <option>Sin Plantilla</option>
                             </select>
                        </div>
                        <Slider label="Tiempo de Cristalización" value={crystallizationTime} min={6} max={120} step={1} unit="horas" onChange={e => setCrystallizationTime(Number(e.target.value))} tooltip="Afecta el tamaño de cristal y la cristalinidad final del material."/>
                    </Accordion>
                    
                    <Accordion title="Tratamiento Post-Síntesis" defaultOpen>
                        <Slider label="Temperatura de Calcinación" value={calcinationTemp} min={400} max={800} step={10} unit="°C" onChange={e => setCalcinationTemp(Number(e.target.value))} tooltip="Elimina la plantilla y activa los sitios ácidos. Temperaturas muy altas pueden causar dealuminación."/>
                    </Accordion>

                    <button onClick={handleSynthesize} disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-500 transition-colors">
                        {isLoading ? 'Sintetizando...' : 'Sintetizar y Evaluar'}
                    </button>
                </Panel>

                <Panel title="Evaluación del Catalizador">
                    {isLoading && <div className="flex justify-center items-center h-full"><p className="text-slate-400 animate-pulse">Calculando propiedades y consultando al Dr. Pirolis...</p></div>}
                    {error && <div className="p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-md text-sm">{error}</div>}
                    {synthesizedCatalyst && (
                         <div className="space-y-6 animate-fade-in">
                            <h4 className="text-center font-bold text-lg">{synthesizedCatalyst.name}</h4>
                            
                            <ResultsTable catalyst={synthesizedCatalyst} />
                            
                             <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                <ZeoliteViewer frameworkType={synthesizedCatalyst.frameworkType} />
                            </div>
                            
                            {aiAnalysis && (
                                <div className="pt-4 border-t border-slate-700">
                                    <h4 className="font-semibold text-lg text-cyan-400 mb-2">Análisis de Dr. Pirolis</h4>
                                    <div className="prose prose-sm prose-invert bg-slate-900/50 p-4 rounded-md border border-slate-700 max-w-none max-h-96 overflow-y-auto" dangerouslySetInnerHTML={{ __html: aiAnalysis.replace(/```markdown|```/g, '') }} />
                                </div>
                            )}
                             <button onClick={handleSaveToHub} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">
                                Guardar Catalizador en el Hub
                            </button>
                         </div>
                    )}
                    {!isLoading && !error && !synthesizedCatalyst && (
                         <div className="flex justify-center items-center h-full text-slate-500">
                            <p>Los resultados de la síntesis aparecerán aquí.</p>
                        </div>
                    )}
                </Panel>
            </div>
             <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};