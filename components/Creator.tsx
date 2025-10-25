import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ContentTypeSelector } from './ContentTypeSelector';
import { GlobalControls } from './form/GlobalControls';
import { SpecificFields } from './form/SpecificFields';
import { NarrativeFeedbackDisplay } from './NarrativeFeedbackDisplay';
import AgentSolutionDisplay from './AgentSolutionDisplay';
import TextualFeedbackDisplay from './TextualFeedbackDisplay';
import SuperAgentControl from './SuperAgentControl';
import TaskModal from './TaskModal';
import { TONES } from '../constants';
import {
  generateEnhancedPrompt,
  generateImages,
  generateNarrativeConsistencyFeedback,
  generateTextualCoherenceFeedback,
  generateAgentSolutions,
  validateGeoContext,
  analyzeInspirationWall,
  analyzeSceneForSuggestions,
  analyzeFullSequenceNarrative,
  generateViabilityReport,
  generateScriptFromImageAnalysis,
} from '../services/geminiService';
import PDFPreviewModal from './PDFPreviewModal';
import { Accordion } from './form/Accordion';
import { FormSelect, FormTextarea, FormInput } from './form/FormControls';
import { PRESETS } from '../data/presets';
import type { View, ChronosState, STOState } from '../types';
import { Tutorial } from './Tutorial';
import type { TutorialStep } from './Tutorial';
import { ALL_VIDEO_PRESETS } from '../data/videoPresets';
import { useTranslations } from '../contexts/LanguageContext';
import ScientificAppendixModal from './ScientificAppendixModal';

// FIX: Corrected import path for types.
import { ContentType } from '../types';
// FIX: Corrected import path for types.
import type { FormData, NarrativeConsistencyFeedback, TextualNarrativeCoherence, AgentSolution, GeoContextualData, MapClickPayload, Task, StyleDefinition, AudiovisualScene, SubTask, NarrativeBrief } from '../types';

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


const initialFormData: FormData = {
  objective: '',
  tone: '',
  restrictions: '',
  outputLanguage: 'Español',
  location: '',
  contextualLanguage: '',
  keyVisualReference: '',
  activeAgents: ['Crítico de Arte', 'Curator'],
  specifics: {
    [ContentType.Texto]: {},
    [ContentType.Imagen]: { style: [], aspectRatio: '1:1', numberOfImages: 2, variety: 50, stylization: 50, rarity: 50 },
    [ContentType.Video]: { 
      audiovisualSequence: [], 
      videoCreationMode: 'text-to-video', 
      inspirationImages: [],
      enableAdvancedSpatialAudio: false,
      musicSelectionMode: 'none',
      musicPreset: '',
      customMusicFile: undefined,
      attenuationCurve: '',
      aspectRatio: '16:9',
    },
    [ContentType.Audio]: { readingSpeed: 50 },
    [ContentType.Codigo]: { scriptType: 'vrc' },
  },
};

export interface PromptCreatorProps {
    initialData?: Partial<FormData> | null;
    initialContentType?: ContentType;
    // FIX: Made onDataConsumed optional as it's only needed when initialData is present.
    onDataConsumed?: () => void;
    onSaveTask: (task: Task) => void;
    allStyles: StyleDefinition[];
    onAddStyle: (newStyle: StyleDefinition) => void;
    creativeContext: any | null;
    onPromptGenerated: (context: any, promptText: string) => void;
    knowledgeSources: { name: string; content: string }[];
    setView: (view: View) => void;
    chronosState: ChronosState;
    stoState: STOState;
}

const fileToDataUrl = (file: File): Promise<{ data: string; name: string; type: string; }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ data: reader.result as string, name: file.name, type: file.type });
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

export const Creator: React.FC<PromptCreatorProps> = ({ initialData, initialContentType, onDataConsumed, onSaveTask, allStyles, onAddStyle, creativeContext, onPromptGenerated, knowledgeSources, setView, chronosState, stoState }) => {
  const { t } = useTranslations();
  const [contentType, setContentType] = useState<ContentType>(ContentType.Texto);
  const [formData, setFormData] = useState<FormData>({ ...initialFormData });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string,string>>({});
  const [fcnFeedback, setFcnFeedback] = useState<NarrativeConsistencyFeedback | null>(null);
  const [cntFeedback, setCntFeedback] = useState<TextualNarrativeCoherence | null>(null);
  const [agentSolutions, setAgentSolutions] = useState<AgentSolution[] | null>(null);
  const [vgcData, setVgcData] = useState<GeoContextualData | null>(null);
  const [isVgcLoading, setIsVgcLoading] = useState(false);
  const [vgcError, setVgcError] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [imageError, setImageError] = useState('');
  const [isPromptCopied, setIsPromptCopied] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [receivedContext, setReceivedContext] = useState<any | null>(null);
  const [inspirationAnalysisLoading, setInspirationAnalysisLoading] = useState(false);
  const [videoInspirationLoading, setVideoInspirationLoading] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [showSahButton, setShowSahButton] = useState(false);
  const [isAppendixOpen, setIsAppendixOpen] = useState(false);

  // New state for 3-layer architecture
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);


  useEffect(() => {
    if (initialData && onDataConsumed) {
        let mergedData: Partial<FormData> = {
            ...initialFormData,
            ...initialData,
            specifics: {
                ...initialFormData.specifics,
            }
        };
        
        if (initialData.specifics) {
            for (const key in initialData.specifics) {
                const contentTypeKey = key as ContentType;
                (mergedData.specifics as any)[contentTypeKey] = {
                    ...(initialFormData.specifics as any)[contentTypeKey],
                    ...(initialData.specifics as any)[contentTypeKey],
                };
            }
        }

        // --- NEW LOGIC for Fleet Simulation Integration ---
        const simulationData = initialData.specifics?.[ContentType.Texto]?.simulationData;
        if (simulationData) {
            const preset = PRESETS.find(p => p.name === "Informe de Viabilidad de Flota");
            if (preset?.data) {
                // Create a deep copy to avoid modifying the original preset
                const populatedPresetData = JSON.parse(JSON.stringify(preset.data));
                
                // Replace placeholders
                const modules = simulationData.modules || 0;
                if (populatedPresetData.objective) {
                    populatedPresetData.objective = populatedPresetData.objective.replace('{modules}', String(modules));
                }
                if (populatedPresetData.specifics?.[ContentType.Texto]?.uvp) {
                    populatedPresetData.specifics[ContentType.Texto].uvp = populatedPresetData.specifics[ContentType.Texto].uvp.replace('{modules}', String(modules));
                }

                // Format raw data as specified in the integration plan
                const rawData = `
Resultados de Simulación de Flota en Paralelo:
- Módulos: ${simulationData.modules} x EHP-500
- Capacidad Total: ${simulationData.total_capacity_kg_h.toFixed(2)} kg/h
- Producción de Biochar: ${simulationData.total_biochar_kg_h.toFixed(2)} kg/h
- Producción de Aceite: ${simulationData.total_pyro_oil_kg_h.toFixed(2)} kg/h
- Producción de Gas: ${simulationData.total_pyro_gas_kg_h.toFixed(2)} kg/h
                `.trim();
                
                // Ensure the path exists
                if (!populatedPresetData.specifics) populatedPresetData.specifics = {};
                if (!populatedPresetData.specifics[ContentType.Texto]) populatedPresetData.specifics[ContentType.Texto] = {};
                
                populatedPresetData.specifics[ContentType.Texto].rawData = rawData;
                
                // Merge populated preset data into the form data
                mergedData = {
                    ...mergedData,
                    ...populatedPresetData,
                    specifics: {
                        ...mergedData.specifics,
                        [ContentType.Texto]: {
                             ...(mergedData.specifics as any)[ContentType.Texto],
                             ...(populatedPresetData.specifics as any)[ContentType.Texto],
                        }
                    }
                };
            }
        }
        // --- END of new logic ---

        setFormData(mergedData as FormData);
        
        if (initialContentType) {
            setContentType(initialContentType);
        }

        // Reset other state that might persist from a previous creation
        setGeneratedPrompt('');
        setGeneratedImages([]);
        setFcnFeedback(null);
        setCntFeedback(null);
        setAgentSolutions(null);
        setError('');
        setImageError('');
        setHasSubmittedOnce(false);
        setAnalysisDone(false);

        onDataConsumed();
    }
  }, [initialData, initialContentType, onDataConsumed]);

   const tutorialSteps: TutorialStep[] = [
    { targetId: 'tutorial-step-1', title: 'Paso 1: Selecciona el Contenido', content: 'Empieza eligiendo qué tipo de contenido quieres crear. Cada opción te mostrará campos específicos para refinar tu idea.', position: 'bottom' },
    { targetId: 'tutorial-step-2', title: 'Paso 2: Define tu Objetivo Principal', content: 'Este es el corazón de tu prompt. Describe aquí la idea, escena o concepto principal de la forma más clara posible.', position: 'bottom' },
    { targetId: 'tutorial-step-3', title: 'Paso 3: Añade Detalles Específicos', content: 'Aquí es donde ocurre la magia. Rellena estos campos para dar a la IA todos los detalles que necesita, desde el estilo visual y la composición hasta la narrativa y el público objetivo.', position: 'top' },
    { targetId: 'tutorial-step-4', title: 'Paso 4: Activa los Agentes de IA (SAH)', content: 'Si tu idea es compleja, activa los agentes. El "Super-Agente Híbrido" analizará la coherencia de tu prompt y te dará soluciones proactivas si encuentra conflictos.', position: 'top' },
    { targetId: 'tutorial-step-5', title: 'Paso 5: Genera el Prompt', content: 'Una vez que estés listo, haz clic aquí. La IA tomará toda tu información y la sintetizará en un prompt de alta calidad.', position: 'top' },
    { targetId: 'tutorial-step-6', title: 'Paso 6: Revisa el Feedback', content: 'Después de generar, la IA te dará un análisis de coherencia (FCN/CNT). Una puntuación baja indica que tu idea podría tener conflictos. ¡Es aquí donde los agentes SAH te ayudarán!', position: 'top' },
    { targetId: 'tutorial-step-7', title: 'Paso 7: Usa tu Prompt', content: '¡Aquí está tu resultado! Este es el prompt refinado y optimizado, listo para ser copiado y usado en tu plataforma de IA generativa favorita.', position: 'top' },
    { targetId: '', title: '¡Todo Listo!', content: 'Has completado la guía. Ahora estás listo para crear prompts de nivel profesional. ¡Experimenta y diviértete!', position: 'bottom' }
  ];

  const handleContentTypeChange = useCallback((type: ContentType) => {
    setContentType(type);
    // Reset specifics for the new type to avoid carrying over old data
    setFormData(prev => ({
        ...prev,
        specifics: {
            ...initialFormData.specifics,
            [type]: { ...initialFormData.specifics[type] }
        }
    }));
    setGeneratedPrompt('');
    setGeneratedImages([]);
    setFcnFeedback(null);
    setCntFeedback(null);
    setAgentSolutions(null);
    setError('');
    setImageError('');
    setHasSubmittedOnce(false);
    setAnalysisDone(false);
  }, []);

   const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string, value: any, type?: string, checked?: boolean } }) => {
    const { name, value, type } = e.target;
    
    setAnalysisDone(false); // Any form change invalidates the last analysis

    if (name === 'activeAgents' && type === 'checkbox' && 'checked' in e.target) {
        const checked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            activeAgents: checked
                ? [...prev.activeAgents, value]
                : prev.activeAgents.filter(agent => agent !== value),
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);
  
  const handleSpecificsChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string, value: any, type?: string, checked?: boolean } }) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    setAnalysisDone(false); // Any form change invalidates the last analysis

    if (target.nodeName === 'SELECT' && 'multiple' in target && target.multiple) {
        const selectedOptions = Array.from((target as HTMLSelectElement).selectedOptions).map(option => option.value);
        setFormData(prev => ({
            ...prev,
            specifics: {
                ...prev.specifics,
                [contentType]: {
                    ...prev.specifics[contentType],
                    [name]: selectedOptions,
                },
            },
        }));
        return;
    }

    const finalValue = type === 'checkbox' && 'checked' in target ? target.checked : value;

    setFormData(prev => ({
        ...prev,
        specifics: {
            ...prev.specifics,
            [contentType]: {
                ...prev.specifics[contentType],
                [name]: finalValue,
            },
        },
    }));
}, [contentType]);

const handleImageUpload = useCallback(async (file: File) => {
    const imageData = await fileToDataUrl(file);
    handleSpecificsChange({ target: { name: 'uploadedImage', value: imageData }});
}, [handleSpecificsChange]);

const handleAudioUpload = useCallback(async (file: File) => {
    const audioData = await fileToDataUrl(file);
    handleSpecificsChange({ target: { name: 'uploadedAudio', value: audioData }});
    handleSpecificsChange({ target: { name: 'recordedAudio', value: null }});
}, [handleSpecificsChange]);

const handleMusicUpload = useCallback(async (file: File) => {
    const audioData = await fileToDataUrl(file);
    handleSpecificsChange({ target: { name: 'customMusicFile', value: audioData }});
}, [handleSpecificsChange]);

const handleVideoInspirationUpload = useCallback(async (files: File[]) => {
    if (!files || files.length === 0) {
        handleSpecificsChange({ target: { name: 'inspirationImages', value: [] } });
        return;
    }
    setVideoInspirationLoading(true);
    setError('');
    try {
        // 1. Convert files to data URLs for storage and display
        const imagesForStoragePromises = files.map(file => fileToDataUrl(file));
        const imagesDataForStorage = await Promise.all(imagesForStoragePromises);
        handleSpecificsChange({ target: { name: 'inspirationImages', value: imagesDataForStorage } });

        // 2. Prepare files for analysis (base64 without prefix)
        const imagesForAnalysis = imagesDataForStorage.map(img => ({
            data: img.data.split(',')[1],
            mimeType: img.type
        }));

        // 3. Analyze images with Gemini to get keywords
        const analysis = await analyzeInspirationWall(imagesForAnalysis);

        // 4. Generate a descriptive script from the analysis
        const script = await generateScriptFromImageAnalysis(analysis);

        // 5. Update the scriptSummary field in the form
        handleSpecificsChange({ target: { name: 'scriptSummary', value: script } });

    } catch (e) {
        setError(e instanceof Error ? e.message : 'Error analyzing inspiration for video.');
    } finally {
        setVideoInspirationLoading(false);
    }
}, [handleSpecificsChange]);

const handleDocumentUpload = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setError('');
    try {
        let content = '';
        const fileType = file.type;
        const fileName = file.name;

        if (fileType === 'text/plain' || fileType === 'application/json') {
            content = await file.text();
        } else if (fileType === 'application/pdf') {
            // FIX: Use window.pdfjsLib as it's defined on the global window object.
            if (typeof window.pdfjsLib === 'undefined' || !window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
                throw new Error("La librería PDF.js no se ha cargado correctamente. Comprueba tu conexión a internet.");
            }
            const arrayBuffer = await file.arrayBuffer();
            // FIX: Use window.pdfjsLib as it's defined on the global window object.
            const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n\n';
            }
            content = fullText.trim();
        } else {
            throw new Error(t('creator.textFields.documentUpload.unsupportedError'));
        }

        handleSpecificsChange({
            target: {
                name: 'uploadedDocument',
                value: { name: fileName, content: content }
            }
        });

    } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al procesar el archivo.');
    } finally {
        setIsAnalyzing(false);
    }
}, [handleSpecificsChange, t]);

const handleApplyAudioPreset = useCallback((presetName: string) => {
    const preset = ALL_VIDEO_PRESETS.find(p => p.preset_name === presetName);
    if (preset && preset.parameters) {
        Object.entries(preset.parameters).forEach(([key, value]) => {
            let parsedValue: any = value;
            if (value === "true") parsedValue = true;
            if (value === "false") parsedValue = false;
            if (!isNaN(Number(value)) && value !== '') parsedValue = Number(value);
            
            handleSpecificsChange({ target: { name: key, value: parsedValue }});
        });
    }
}, [handleSpecificsChange]);

const handleApplyPreset = async (presetName: string) => {
    const preset = PRESETS.find(p => p.name === presetName);
    
    handleSpecificsChange({ target: { name: 'narrativeCatalyst', value: presetName } });

    if (!preset) return;

    if (preset.name === '[REPORTE] Viabilidad de Nuevo Activo (Chronos)') {
        setIsGenerating(true);
        setError('');
        setGeneratedPrompt('');
        setAnalysisDone(false);
        setHasSubmittedOnce(true);

        try {
            const projectYears = 5; 
            const productionCosts = 160000; 
            const initialInvestment = -stoState.target;
            const annualRevenue = chronosState.assetOrigin.marketValue / projectYears;
            const annualCosts = productionCosts / projectYears;
            const annualCashFlow = annualRevenue - annualCosts;

            if (annualCashFlow <= 0) {
                throw new Error("El flujo de caja anual es negativo. Ajusta los valores en el Panel de Kairos.");
            }

            const cashFlows = [initialInvestment, ...Array(projectYears).fill(annualCashFlow)];
            const vpn = calculateNPV(cashFlows, 0.12);
            const tir = calculateIRR(cashFlows);
            const payback = -initialInvestment / annualCashFlow;

            const reportData = {
                projectName: chronosState.tokenStructure.tokenName,
                assetValue: chronosState.assetOrigin.marketValue,
                capitalToRaise: stoState.target,
                vpn, tir, payback,
                assetDetails: `${chronosState.assetOrigin.assetType}, ${chronosState.assetOrigin.estimatedVolume} toneladas`
            };

            const report = await generateViabilityReport(reportData);
            setGeneratedPrompt(report);
            setAnalysisDone(true);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Error al generar el reporte de viabilidad.');
        } finally {
            setIsGenerating(false);
        }
    } else {
        setFormData(prev => {
            const newFormData = { ...prev, ...preset.data };
            newFormData.specifics = { ...prev.specifics };
            if (preset.data.specifics) {
                for (const key in preset.data.specifics) {
                    const contentTypeKey = key as ContentType;
                    newFormData.specifics[contentTypeKey] = {
                        ...prev.specifics[contentTypeKey],
                        ...(preset.data.specifics as any)[contentTypeKey]
                    };
                }
            }
            return newFormData;
        });
    }
};


const handleAnalyzeScript = useCallback(async () => {
    const sequence = formData.specifics[ContentType.Video]?.audiovisualSequence;
    if (!sequence || sequence.length === 0) return;
    setIsAnalyzing(true);
    setError('');
    try {
        const narrativeBrief = await analyzeFullSequenceNarrative(sequence);
        const updatedScenesPromises = sequence.map(async (scene) => {
            if (!scene.visualPromptPreset || !scene.soundDesign) {
                const suggestions = await analyzeSceneForSuggestions(scene.narration, scene.visualPromptFreeText, narrativeBrief);
                return {
                    ...scene,
                    visualPromptPreset: scene.visualPromptPreset || suggestions.visualPromptPreset,
                    soundDesign: scene.soundDesign || suggestions.soundDesign,
                };
            }
            return scene;
        });
        const updatedScenes = await Promise.all(updatedScenesPromises);
        handleSpecificsChange({ target: { name: 'audiovisualSequence', value: updatedScenes } });

    } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al analizar el guion.');
    } finally {
        setIsAnalyzing(false);
    }
}, [formData.specifics, handleSpecificsChange]);

  const handleAnalysis = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedPrompt('');
    setGeneratedImages([]);
    setFcnFeedback(null);
    setCntFeedback(null);
    setAgentSolutions(null);
    setError('');
    setImageError('');
    setIsAnalyzing(true);
    setAnalysisDone(false);
    setHasSubmittedOnce(true);
    
    try {
      const feedback = contentType === ContentType.Texto
        ? await generateTextualCoherenceFeedback(formData)
        : await generateNarrativeConsistencyFeedback(formData, contentType);
      
      if (contentType === ContentType.Texto) {
          setCntFeedback(feedback as TextualNarrativeCoherence);
      } else {
          setFcnFeedback(feedback as NarrativeConsistencyFeedback);
      }
      setAnalysisDone(true);

      const scores = Object.values(feedback).map((v: any) => v.score);
      if (scores.some(s => s < 0) && formData.activeAgents.length > 0) {
        const solutions = await generateAgentSolutions(formData, contentType, feedback, vgcData);
        setAgentSolutions(solutions);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error durante el análisis.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [formData, contentType, vgcData]);

  const handleGeneration = useCallback(async () => {
      setIsGenerating(true);
      setError('');
      setGeneratedPrompt('');

      try {
          const prompt = await generateEnhancedPrompt(formData, contentType, vgcData, { videoCreationMode: formData.specifics[ContentType.Video]?.videoCreationMode });
          setGeneratedPrompt(prompt);
          onPromptGenerated(receivedContext, prompt);
      } catch (err) {
          setError(err instanceof Error ? err.message : 'Ocurrió un error durante la generación.');
      } finally {
          setIsGenerating(false);
      }
  }, [formData, contentType, vgcData, onPromptGenerated, receivedContext]);

  const handleApplySolution = useCallback((solution: AgentSolution) => {
    setFormData(prevFormData => {
        const newFormData: FormData = JSON.parse(JSON.stringify(prevFormData));
        if (solution.changes.objective) newFormData.objective = solution.changes.objective;
        if (solution.changes.tone) newFormData.tone = solution.changes.tone;
        if (solution.changes.restrictions) newFormData.restrictions = solution.changes.restrictions;
        
        if (solution.changes.specifics) {
            for (const key in solution.changes.specifics) {
                const contentTypeKey = key as ContentType;
                if (!newFormData.specifics[contentTypeKey]) {
                    (newFormData.specifics as any)[contentTypeKey] = {};
                }
                (newFormData.specifics as any)[contentTypeKey] = {
                    ...(newFormData.specifics as any)[contentTypeKey],
                    ...(solution.changes.specifics as any)[contentTypeKey]
                };
            }
        }
        return newFormData;
    });
    setAnalysisDone(false);
    setFcnFeedback(null);
    setCntFeedback(null);
    setAgentSolutions(null);
    setGeneratedPrompt('');
  }, []);

  const handleCopyPrompt = useCallback(() => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt).then(() => {
        setIsPromptCopied(true);
        setTimeout(() => setIsPromptCopied(false), 2000);
    });
  }, [generatedPrompt]);

  const handleValidateLocation = useCallback(async () => {
    if (!formData.location) return;
    setIsVgcLoading(true);
    setVgcError('');
    setVgcData(null);
    try {
        const data = await validateGeoContext(formData.location);
        setVgcData(data);
    } catch (err) {
        setVgcError(err instanceof Error ? err.message : 'An error occurred during validation.');
    } finally {
        setIsVgcLoading(false);
    }
  }, [formData.location]);

  const handleMapClick = useCallback((payload: MapClickPayload) => {
    const newLocation = `${payload.lat.toFixed(5)}, ${payload.lng.toFixed(5)}`;
    setFormData(prev => ({...prev, location: newLocation}));
    
    const validateAfterClick = async (loc: string) => {
        setIsVgcLoading(true);
        setVgcError('');
        setVgcData(null);
        try {
            const data = await validateGeoContext(loc);
            setVgcData(data);
        } catch (err) {
            setVgcError(err instanceof Error ? err.message : 'An error occurred during validation.');
        } finally {
            setIsVgcLoading(false);
        }
    };
    validateAfterClick(newLocation);
  }, []);

  const handleSourceImageForVideoUpload = useCallback(async (file: File) => {
      const imageData = await fileToDataUrl(file);
      handleSpecificsChange({ target: { name: 'sourceImageForVideo', value: imageData }});
  }, [handleSpecificsChange]);

  const handleSourceVideoUpload = useCallback(async (file: File) => {
      const videoData = await fileToDataUrl(file);
      handleSpecificsChange({ target: { name: 'sourceVideo', value: videoData }});
  }, [handleSpecificsChange]);

  return (
    <>
      {isTutorialActive && <Tutorial steps={tutorialSteps} onClose={() => setIsTutorialActive(false)} />}
      {isAppendixOpen && <ScientificAppendixModal onClose={() => setIsAppendixOpen(false)} />}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <header className="text-center mb-10 flex justify-between items-center">
            <div className="w-48"></div>
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900">{t('creator.title')}</h2>
                <p className="mt-2 text-md text-gray-600">
                    {t('creator.subtitle')}
                </p>
            </div>
            <div className="w-48 flex justify-end">
                <button
                    onClick={() => setIsTutorialActive(true)}
                    className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
                    title="Iniciar tutorial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {t('creator.interactiveGuide')}
                </button>
            </div>
        </header>

        {isTaskModalOpen && <TaskModal onClose={() => setIsTaskModalOpen(false)} onSave={() => {}} />}

        <div id="tutorial-step-1">
            <ContentTypeSelector selectedType={contentType} onSelectType={handleContentTypeChange} />
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleAnalysis} className="space-y-6">
            <div id="tutorial-step-2">
                <FormTextarea label="Objetivo Principal" id="objective" name="objective" value={formData.objective} onChange={handleFormChange} required rows={3} placeholder="Describe la idea, escena o concepto principal de la forma más clara posible." />
            </div>
            
            <div>
                <FormInput
                    label="Tono"
                    id="tone"
                    name="tone"
                    value={formData.tone}
                    onChange={handleFormChange}
                    list="tones-datalist"
                    placeholder="Ej: Profesional, Creativo, Amistoso..."
                />
                <datalist id="tones-datalist">
                    {TONES.map(tone => <option key={tone} value={tone} />)}
                </datalist>
            </div>

             <GlobalControls
                formData={formData}
                handleChange={handleFormChange}
                onValidateLocation={handleValidateLocation}
                vgcData={vgcData}
                isVgcLoading={isVgcLoading}
                vgcError={vgcError}
                onMapClick={handleMapClick}
            />
            
            <div id="tutorial-step-3">
              <SpecificFields 
                contentType={contentType}
                formData={formData}
                handleChange={handleSpecificsChange}
                allStyles={allStyles}
                onAddStyle={onAddStyle}
                onReset={() => {}}
                errors={validationErrors}
                onAnalyzeInspiration={() => {}}
                inspirationAnalysisLoading={inspirationAnalysisLoading}
                onAnalyzeInspirationForVideo={handleVideoInspirationUpload}
                videoInspirationLoading={videoInspirationLoading}
                onAnalyzeScript={handleAnalyzeScript}
                onImageUpload={handleImageUpload}
                onAudioUpload={handleAudioUpload}
                onMusicUpload={handleMusicUpload}
                onDocumentUpload={handleDocumentUpload}
                onApplyAudioPreset={handleApplyAudioPreset}
                knowledgeSources={knowledgeSources}
                setView={setView}
                onApplyPreset={handleApplyPreset}
                onOpenAppendix={() => setIsAppendixOpen(true)}
              />
            </div>
            
            <div id="tutorial-step-4">
              <SuperAgentControl activeAgents={formData.activeAgents} handleChange={handleFormChange} />
            </div>

            <div id="tutorial-step-5" className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                <button type="submit" disabled={isAnalyzing || analysisDone} className="flex-grow flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 disabled:bg-gray-400">
                  {isAnalyzing ? 'Analizando...' : 'Analizar Coherencia Narrativa'}
                </button>
                <button type="button" onClick={() => setIsTaskModalOpen(true)} className="flex-grow bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800">Guardar como Tarea</button>
            </div>
          </form>

          <aside className="h-full">
            <div className="sticky top-8 space-y-6">
              {!hasSubmittedOnce ? (
                <div className="h-full flex flex-col items-center justify-center text-center bg-gray-50 rounded-lg p-8 border-2 border-dashed">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700">Panel de Resultados</h3>
                    <p className="mt-2 text-gray-500">El prompt mejorado, el feedback y las imágenes generadas aparecerán aquí.</p>
                </div>
              ) : (
                <>
                  <div id="tutorial-step-6">
                      <h3 className="text-xl font-bold text-gray-800">Análisis y Generación</h3>
                      {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                      {(isAnalyzing || isGenerating) && (
                        <div className="mt-4 text-center">
                          <svg className="animate-spin h-6 w-6 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <p className="mt-2 text-gray-500">{isAnalyzing ? 'Janus está analizando...' : 'Prometeo está generando...'}</p>
                        </div>
                      )}
                      
                      {analysisDone && (
                          <>
                            {fcnFeedback && <NarrativeFeedbackDisplay feedback={fcnFeedback} />}
                            {cntFeedback && <TextualFeedbackDisplay feedback={cntFeedback} />}
                            {agentSolutions && <AgentSolutionDisplay solutions={agentSolutions} onApply={handleApplySolution} />}
                            
                            {!isGenerating && !generatedPrompt &&(
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <button onClick={handleGeneration} disabled={isGenerating} className="w-full flex justify-center items-center bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">
                                        Generar Contenido Final
                                    </button>
                                </div>
                            )}
                          </>
                      )}
                  </div>
                  
                  <div id="tutorial-step-7">
                    {generatedPrompt && (
                      <div className="mt-4 p-4 bg-gray-800 text-gray-100 rounded-lg shadow-inner relative">
                        <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase">Resultado Generado</h4>
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{generatedPrompt}</pre>
                        <button onClick={handleCopyPrompt} className="absolute top-2 right-2 flex items-center bg-green-500 text-white font-bold py-1 px-2 rounded-md hover:bg-green-600 text-xs">
                          {isPromptCopied ? '¡Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};