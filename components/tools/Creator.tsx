import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ContentTypeSelector } from '../ContentTypeSelector';
import { GlobalControls } from '../form/GlobalControls';
import { SpecificFields } from '../form/SpecificFields';
import { NarrativeFeedbackDisplay } from '../NarrativeFeedbackDisplay';
import AgentSolutionDisplay from '../AgentSolutionDisplay';
import TextualFeedbackDisplay from '../TextualFeedbackDisplay';
import SuperAgentControl from '../SuperAgentControl';
import TaskModal from '../TaskModal';
import { TONES } from '../../constants';
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
} from '../../services/geminiService';
import PDFPreviewModal from '../PDFPreviewModal';
import { Accordion } from '../form/Accordion';
import { FormSelect, FormTextarea, FormInput } from '../form/FormControls';
import { PRESETS } from '../../data/presets';
import type { View, ChronosState, STOState } from '../../types';
import { Tutorial } from '../Tutorial';
import type { TutorialStep } from '../Tutorial';
import { ALL_VIDEO_PRESETS } from '../../data/videoPresets';
import { useTranslations } from '../../contexts/LanguageContext';
import ScientificAppendixModal from '../ScientificAppendixModal';

// FIX: Corrected import path for types.
import { ContentType } from '../../types';
// FIX: Corrected import path for types.
import type { FormData, NarrativeConsistencyFeedback, TextualNarrativeCoherence, AgentSolution, GeoContextualData, MapClickPayload, Task, StyleDefinition, AudiovisualScene, SubTask, NarrativeBrief } from '../../types';

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
    // FIX: The `videoCreationMode` property was incorrectly set to 'manual'. It has been corrected to 'text-to-video' to align with the allowed types.
    [ContentType.Video]: { 
      audiovisualSequence: [], 
      videoCreationMode: 'text-to-video', 
      inspirationImages: [],
      enableAdvancedSpatialAudio: false,
      musicSelectionMode: 'none',
      musicPreset: '',
      customMusicFile: undefined,
      attenuationCurve: '',
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
                