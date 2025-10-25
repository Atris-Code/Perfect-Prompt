import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ViewSelector } from './components/ViewSelector';
import { Creator } from './components/Creator';
import { StyleLibrary } from './components/StyleLibrary';
import { ProStudio } from './components/ProStudio';
import { Academia } from './components/Academia';
import { ProfessionalEditor } from './components/ProfessionalEditor';
import { InspirationGallery } from './components/InspirationGallery';
import { ProLayoutGallery } from './components/ProLayoutGallery';
import { TaskManager } from './components/TaskManager';
import { PyrolysisHub } from './components/tools/PyrolysisHub';
import { ComparativeScenariosLab } from './components/tools/ComparativeScenariosLab';
import { KnowledgeBase } from './components/KnowledgeBase';
import { UnitConverter } from './components/UnitConverter';
import { ProcessOptimizer } from './components/tools/ProcessOptimizer';
import { PropertyVisualizer } from './components/tools/PropertyVisualizer';
import EnergyBalanceSimulator from './components/EnergyBalanceSimulator';
import { UserGuide } from './components/UserGuide';
import { Game } from './components/Game';
import { ExperimentDesigner } from './components/tools/ExperimentDesigner';
import { TitansAtrium } from './components/TitansAtrium';
import { HMIControlRoom } from './components/tools/HMIControlRoom';
import { Hyperion9 } from './components/tools/Hyperion-9';
import { AssayManager } from './components/tools/AssayManager';
import { Aegis9 } from './components/tools/Aegis9';
import { Phoenix } from './components/tools/Phoenix';
import { Vulcano } from './components/tools/Vulcano';
import { IAProStudio } from './components/tools/IAProStudio';
import { Chronos } from './components/tools/Chronos';
import { AgriDeFi } from './components/tools/AgriDeFi';
import { GaiaLab } from './components/tools/GaiaLab';
import { InnovationForge } from './components/tools/InnovationForge';
import { KairosFinancialPanel } from './components/tools/KairosFinancialPanel';
import CogenerationSimulator from './components/tools/CogenerationSimulator';
import FleetSimulator from './components/tools/FleetSimulator';
import { CatalystLab } from './components/tools/CatalystLab';
import { UtilitiesSimulator } from './components/tools/UtilitiesSimulator';
import { GenerativeSimulator } from './components/tools/GenerativeSimulator';
import { CircularFleet } from './components/tools/CircularFleet';
import { EnergyExplorer } from './components/tools/EnergyExplorer';

import { useTranslations } from './contexts/LanguageContext';
import AboutModal from './components/AboutModal';
import AgentChatModal from './components/AgentChatModal';

import { ALL_STYLES } from './data/styles';
import { OFF_STATE, RUNNING_STATE } from './data/hmiConstants';

import {
  initializeAgentChat,
  continueAgentChat,
  generateNarrativeFields,
} from './services/geminiService';
import type { Chat } from './services/geminiService';

import { ContentType } from './types';
import type {
  View,
  FormData,
  Task,
  StyleDefinition,
  CharacterProfile,
  ChatMessage,
  HMIState,
  HMIStatus,
  Alarm,
  ReactorState,
  ArgusModel,
  PhoenixState,
  AegisState,
  AegisEvent,
  AlarmConfig,
  ReactorStatus,
  VulcanoState,
  ChronosState,
  IssuanceState,
  STOState,
  DEXListing,
  SubTask,
  GaiaLabState,
  PyrolysisMaterial,
  ParallelSimulationResult,
  UtilityWidgetState,
  UtilityDutyType,
  FleetSimulationResult,
} from './types';
import { PYROLYSIS_MATERIALS, SIMULATION_ENGINE } from './data/pyrolysisMaterials';
import { CO_PRESETS } from './data/coPresets';
import { KNOWLEDGE_BASE } from './data/knowledgeBase';
import { PRESETS } from './data/presets';

const historicalLogCsv = `Hora,Temp. Reactor,Presión Reactor,Tasa Alim.
17:32:40,41.25,1.01,0.00
17:32:45,115.47,1.03,0.00
17:32:50,179.21,1.05,0.00
17:32:55,233.95,1.06,0.00
17:33:00,280.95,1.07,0.00
17:33:06,321.31,1.08,0.00
17:33:11,355.97,1.09,0.00
17:33:16,385.74,1.09,0.00
17:33:21,411.29,1.10,0.00
17:33:26,433.24,1.10,0.00
17:33:31,452.09,1.11,0.00
17:33:36,468.28,1.11,0.00
17:33:41,482.18,1.12,0.00
17:33:46,494.11,1.12,0.00
17:33:51,500.73,1.11,38.10
17:33:56,500.31,1.10,38.76
17:34:01,499.25,1.11,37.20
17:34:06,500.24,1.14,36.62
17:34:11,499.71,1.10,38.22
17:34:16,499.37,1.10,36.03
17:34:23,500.60,1.10,39.97
17:34:28,499.92,1.11,35.30
17:34:33,499.66,1.13,36.83
17:34:38,500.26,1.13,36.32
17:34:41,500.00,1.14,35.73
17:34:46,500.05,1.12,35.19
17:34:51,499.63,1.11,37.41
17:34:56,500.33,1.10,38.57
17:35:01,500.69,1.11,38.52
17:35:06,499.99,1.12,36.85
17:35:11,500.51,1.12,35.07
17:35:16,499.58,1.10,38.49
17:35:21,500.18,1.11,37.07
17:35:26,500.01,1.14,36.73
17:35:31,499.52,1.13,38.28
17:35:36,499.72,1.11,39.24
17:35:41,499.72,1.10,38.35
17:35:46,499.78,1.10,39.52
17:35:51,499.61,1.14,36.22
17:35:56,499.82,1.12,39.29
17:36:01,500.59,1.13,39.62
17:36:06,499.40,1.12,35.70
17:36:11,500.22,1.10,35.43
17:36:16,500.72,1.12,35.61
17:36:21,500.28,1.13,36.93
17:36:26,500.70,1.13,37.28
17:36:31,500.29,1.12,36.59
17:36:36,500.56,1.11,37.39
17:36:42,500.75,1.13,37.75
17:36:46,499.67,1.13,39.08
17:36:51,499.95,1.10,39.03
17:36:56,500.47,1.12,35.63
17:37:01,500.42,1.10,37.64
17:37:06,500.38,1.13,38.50
17:37:11,499.63,1.14,37.27`;

const initialMinuteLog: (HMIState & { time: string })[] = historicalLogCsv.split('\n').slice(1).map(row => {
    const [time, temp, pressure, rate] = row.split(',');
    if (time && temp && pressure && rate) {
        return {
            ...OFF_STATE,
            time: time.trim(),
            reactorTemp: parseFloat(temp),
            reactorPressure: parseFloat(pressure),
            feedRate: parseFloat(rate)
        };
    }
    return null;
}).filter((item): item is HMIState & { time: string } => item !== null);

const App: React.FC = () => {
  const [view, setView] = useState<View>('creator');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const { language, setLanguage } = useTranslations();

  const [initialCreatorData, setInitialCreatorData] = useState<Partial<FormData> | null>(null);
  const [initialCreatorContentType, setInitialCreatorContentType] = useState<ContentType | undefined>(undefined);
  const [initialLabMaterialIds, setInitialLabMaterialIds] = useState<number[] | null>(null);
  const [initialUtilityContext, setInitialUtilityContext] = useState<{
    tab?: string;
    demand?: number;
    demands?: { [key: string]: number };
  } | null>(null);

  const [fleetSimulationResult, setFleetSimulationResult] = useState<FleetSimulationResult | null>(null);


  const [tasks, setTasks] = useState<Task[]>([
    {
      id: `task-video-pyrolysis-${Date.now()}`,
      title: "Video Explicativo del Proceso de Pirólisis",
      createdAt: Date.now(),
      status: 'Por Hacer',
      contentType: ContentType.Video,
      formData: {
        objective: "Crear un vídeo corto que ilustre el proceso de pirólisis, desde la materia prima hasta los productos finales, mostrando las condiciones de operación y el papel de los catalizadores.",
        tone: "Didáctico / Informativo",
        specifics: {
          [ContentType.Video]: {
            videoCreationMode: 'text-to-video',
            aspectRatio: '16:9',
            scriptSummary: `
              **Escena 1: Materia Prima (5 seg).** Estilo 'Proceso en Acción'. Planos macro en cámara lenta de pellets de biomasa cayendo en una tolva de acero inoxidable. Iluminación limpia y de estudio. Sonido: 'Ambiente Industrial Eficiente' inicia con el sonido satisfactorio de los pellets cayendo.
              **Escena 2: El Corazón del Reactor (8 seg).** Corte transversal animado de un reactor de pirólisis. Flechas indican el flujo de gas inerte y el aumento de temperatura (mostrar un termómetro digital subiendo a 500°C). Pequeñas partículas (catalizador) se mezclan con la biomasa. La biomasa se oscurece y se descompone. Sonido: El zumbido del reactor se intensifica. Se añaden clics rítmicos y un siseo de presión.
              **Escena 3: Los Productos (7 seg).** Secuencia de tres planos 'Proceso en Acción':
              - Un líquido oscuro y viscoso (bio-aceite) goteando en un recipiente de vidrio de laboratorio.
              - Un sólido negro y poroso (biochar) siendo descargado.
              - Una llama controlada (syngas) ardiendo limpiamente en un mechero.
              Sonido: El zumbido del reactor disminuye, reemplazado por sonidos específicos de cada producto.
              **Escena 4: Cierre (3 seg).** Plano cenital de los tres productos (bio-aceite, biochar, syngas) dispuestos de forma ordenada. Superposición de texto: 'Pirólisis: Residuos a Valor'. Sonido: Un pulso electrónico final y fundido a silencio.
            `,
          },
          [ContentType.Texto]: {},
          [ContentType.Imagen]: {},
          [ContentType.Audio]: {},
          [ContentType.Codigo]: {},
        }
      },
      isIntelligent: true,
      agentId: 'Orquestador',
      eventType: 'VisualCampaign',
      subTasks: [
          { name: 'Análisis de Guion y Estilo', status: 'pending' },
          { name: 'Generación de Escenas Visuales', status: 'pending' },
          { name: 'Diseño de Sonido y Sincronización', status: 'pending' },
          { name: 'Renderizado y Compilación Final', status: 'pending' },
      ],
    }
  ]);
  const [allStyles, setAllStyles] = useState<StyleDefinition[]>(ALL_STYLES);
  const [knowledgeSources, setKnowledgeSources] = useState<{ name: string; content: string }[]>([
      { name: "Análisis Energético a una Planta de Biocombustibles", content: KNOWLEDGE_BASE.BIOMASS_PYROLYSIS_MODELING },
      { name: "Utilities and Energy Efficient Design", content: KNOWLEDGE_BASE.UTILITIES_ENERGY_DESIGN },
      { name: "Análisis de Calidad y Efectividad del Prompt", content: KNOWLEDGE_BASE.PROMPT_QUALITY_ANALYSIS },
  ]);

  // Chat state
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<CharacterProfile | null>(null);
  const agentChatRef = useRef<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAgentReplying, setIsAgentReplying] = useState(false);
  const [initialHubSearch, setInitialHubSearch] = useState<string | null>(null);

  // Pyrolysis Hub -> Creator context
  const [creativeContext, setCreativeContext] = useState<any | null>(null);
  const [generatedPrompts, setGeneratedPrompts] = useState<Record<string, string>>({});
  
  // HMI State
  const [hmiState, setHmiState] = useState<HMIState>(OFF_STATE);
  const [systemStatus, setSystemStatus] = useState<HMIStatus>('APAGADO');
  const [heatingSeconds, setHeatingSeconds] = useState(0);
  const [coolingSeconds, setCoolingSeconds] = useState(0);
  const [stableSeconds, setStableSeconds] = useState(0);
  const [isCondenserObstructed, setIsCondenserObstructed] = useState(false);
  const [isGasLineObstructed, setIsGasLineObstructed] = useState(false);
  const [isTempSensorFailed, setIsTempSensorFailed] = useState(false);
  const [isBiomassContaminated, setIsBiomassContaminated] = useState(false);
  const [activeAlarms, setActiveAlarms] = useState<Alarm[]>([]);
  const [events, setEvents] = useState<string[]>(['17:32:38: Iniciando calentamiento del reactor...', '14:20:04: Sistema listo.']);
  const [historyData, setHistoryData] = useState<(HMIState & { time: number })[]>([]);
  const [minuteLog, setMinuteLog] = useState<(HMIState & { time: string })[]>(initialMinuteLog);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // --- HMI CONFIGURATION STATES ---
  const [pidGains, setPidGains] = useState({ kp: 0.8, ki: 0.05, kd: 0.1 });
  const [selectedFeedstockId, setSelectedFeedstockId] = useState(PYROLYSIS_MATERIALS[0].id);
  const [selectedCatalystId, setSelectedCatalystId] = useState(SIMULATION_ENGINE.catalysts[0].id);
  const [alarmConfigs, setAlarmConfigs] = useState<Record<string, AlarmConfig>>({
    reactorTemp: { enabled: true, med: 520, high: 540, crit: 560, medSound: 'Beep Corto', highSound: 'Beep Continuo', critSound: 'Sirena Intermitente' },
    reactorPressure: { enabled: true, med: 1.5, high: 1.8, crit: 2.0, medSound: 'Beep Corto', highSound: 'Beep Continuo', critSound: 'Sirena Intermitente' },
    condenserTemp: { enabled: true, med: 40, high: 60, crit: 80, medSound: 'Beep Corto', highSound: 'Beep Continuo', critSound: 'Alerta Vocal' },
    biomassHopper: { enabled: true, med: 20, high: 0, crit: 0, medSound: 'Beep Corto', highSound: '', critSound: '' },
    bioOilTank: { enabled: true, med: 85, high: 0, crit: 0, medSound: 'Beep Corto', highSound: '', critSound: '' },
  });
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const [initialHmiTab, setInitialHmiTab] = useState<string | null>(null);
  
  // --- DEFI SIMULATION STATE ---
  const [chronosState, setChronosState] = useState<ChronosState>({
    phase: 3,
    assetOrigin: {
        assetType: 'Cosecha de Soja 2026',
        estimatedVolume: 1000,
        marketValue: 800000,
        liquidationDate: 'Diciembre 2026',
        status: 'VERIFIED',
    },
    tokenStructure: {
        rights: 'Participación sobre ingresos futuros de la venta de la cosecha',
        tokenName: 'AgroToken Soja 2026 (AGS26)',
        nominalValue: 1,
        totalSupply: 400000,
    },
    liquidation: {
        status: 'PENDING',
        salePrice: null,
        profitPercentage: null,
    },
    secondaryAssets: [],
  });
  const [issuanceState, setIssuanceState] = useState<IssuanceState>({
      contractStatus: 'UNDEPLOYED',
      tokenStatus: 'UNMINTED',
      contractAddress: null,
      events: ['Consola de simulación iniciada. Esperando acciones...'],
  });
  const [stoState, setStoState] = useState<STOState>({
      assetId: null,
      investors: [],
      fundsRaised: 0,
      target: 400000,
      status: 'PREPARING',
  });
  const [dexListing, setDexListing] = useState<DEXListing | null>(null);
  const stoIntervalRef = useRef<number | null>(null);
  const dexIntervalRef = useRef<number | null>(null);

  // --- GAIA LAB STATE ---
  const [gaiaLabState, setGaiaLabState] = useState<GaiaLabState>({
      isNewBatchReady: true,
      sampleId: null,
      analysisResults: null,
      quality: null,
  });

  const [virtualMaterialForHub, setVirtualMaterialForHub] = useState<PyrolysisMaterial | null>(null);

  const [utilityWidgetState, setUtilityWidgetState] = useState<UtilityWidgetState>({
    isOpen: false,
    duty: null,
    dutyType: null,
    unit: null,
  });

  const handleOpenUtilityWidget = useCallback((duty: number, dutyType: UtilityDutyType, unit: string) => {
    setUtilityWidgetState({ isOpen: true, duty, dutyType, unit });
  }, []);

  const handleCloseUtilityWidget = useCallback(() => {
    setUtilityWidgetState({ isOpen: false, duty: null, dutyType: null, unit: null });
  }, []);
  
  const handleNavigateToUtilities = useCallback((context: {
    tab?: string;
    demand?: number;
    demands?: { [key: string]: number };
  }) => {
    setInitialUtilityContext(context);
    setView('utilities-simulator');
  }, []);

  const handleAddVirtualMaterialToHub = (material: PyrolysisMaterial) => {
    setVirtualMaterialForHub(material);
    setView('pyrolysis-hub');
  };
  
  const handleStartMixtureSimulation = (materialIds: number[]) => {
    if (materialIds.length > 0) {
      setInitialLabMaterialIds(materialIds);
      setView('comparative-lab');
    }
  };

  const handleCreateContentFromMaterial = (objective: string, rawData: string) => {
    const newFormData: Partial<FormData> = {
        objective: objective,
        tone: 'Analítico', // A good default
        specifics: {
            [ContentType.Texto]: {
                type: 'Ficha Técnica de Proceso',
                audience: 'Ingenieros Químicos / R&D',
                rawData: rawData,
            },
            [ContentType.Imagen]: {},
            [ContentType.Video]: {},
            [ContentType.Audio]: {},
            [ContentType.Codigo]: {},
        }
    };
    setInitialCreatorData(newFormData);
    setInitialCreatorContentType(ContentType.Texto);
    setView('creator');
  };

  const handleCreateReportFromFleet = (simulationResult: ParallelSimulationResult) => {
    const preset = PRESETS.find(p => p.name === "Informe de Viabilidad de Flota");
    if (!preset?.data) return;

    // Deep copy to avoid modifying original preset
    const populatedPresetData = JSON.parse(JSON.stringify(preset.data));

    // Replace placeholders
    if (populatedPresetData.objective) {
        populatedPresetData.objective = populatedPresetData.objective.replace('{modules}', String(simulationResult.modules));
    }
    if (populatedPresetData.specifics?.[ContentType.Texto]?.uvp) {
        populatedPresetData.specifics[ContentType.Texto].uvp = populatedPresetData.specifics[ContentType.Texto].uvp.replace('{modules}', String(simulationResult.modules));
    }

    // Format raw data
    const rawData = `
Resultados de Simulación de Flota en Paralelo:
- Módulos: ${simulationResult.modules} x EHP-500
- Capacidad Total: ${simulationResult.total_capacity_kg_h.toFixed(2)} kg/h
- Producción de Biochar: ${simulationResult.total_biochar_kg_h.toFixed(2)} kg/h
- Producción de Aceite: ${simulationResult.total_pyro_oil_kg_h.toFixed(2)} kg/h
- Producción de Gas: ${simulationResult.total_pyro_gas_kg_h.toFixed(2)} kg/h
    `.trim();

    if (!populatedPresetData.specifics) populatedPresetData.specifics = {};
    if (!populatedPresetData.specifics[ContentType.Texto]) populatedPresetData.specifics[ContentType.Texto] = {};
    
    populatedPresetData.specifics[ContentType.Texto].rawData = rawData;

    setInitialCreatorData(populatedPresetData);
    setInitialCreatorContentType(ContentType.Texto);
    setView('creator');
  };

  const handleTakeSample = () => {
      setGaiaLabState(prev => ({ ...prev, isNewBatchReady: false }));
      // Simulate analysis
      setTimeout(() => {
          const results = { carbon: 75.00, ph: 8.50, porosity: 350.00, ash: 8.00 };
          setGaiaLabState(prev => ({
              ...prev,
              sampleId: `BC-LOTE-006150`,
              analysisResults: results,
              quality: 'PREMIUM' // Based on good results
          }));
      }, 2000);
  };


  const addEvent = useCallback((message: string) => {
    const time = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    setEvents(prev => [`${time}: ${message}`, ...prev].slice(0, 100));
  }, []);

  type FleetCommand = { type: 'APPLY_PRESET'; payload: string } | { type: 'START_ALL' } | { type: 'STOP_ALL' };

  const handleFleetCommand = (command: FleetCommand) => {
      addEvent(`Comando de flota recibido: ${command.type}`);
      switch (command.type) {
          case 'APPLY_PRESET':
              const presetName = command.payload;
              const preset = CO_PRESETS.find(p => p.name === presetName);
              if (preset) {
                  setReactorStates(prev => prev.map(reactor => 
                      reactor.id !== 'P-01' ? { ...reactor, targetTemp: preset.targetTemp } : reactor
                  ));
                  setHmiState(prev => ({ ...prev, targetTemp: preset.targetTemp, residenceTime: preset.residenceTime, n2Flow: preset.flowN2, agentMode: preset.agentMode as HMIState['agentMode'] }));
                  addEvent(`Preset '${preset.name}' aplicado a la flota.`);
              }
              break;
          case 'START_ALL':
              setReactorStates(prev => prev.map(reactor => 
                  reactor.id !== 'P-01' && reactor.status === 'Inactivo' ? { ...reactor, status: 'Arrancando' } : reactor
              ));
              if (systemStatus === 'APAGADO') {
                  setSystemStatus('CALENTANDO');
                  addEvent("Iniciando calentamiento del reactor P-01 via comando de flota...");
              }
              addEvent(`Iniciando todos los reactores inactivos.`);
              break;
          case 'STOP_ALL':
              setReactorStates(prev => prev.map(reactor => 
                  reactor.id !== 'P-01' && (reactor.status === 'Estable' || reactor.status === 'Arrancando') ? { ...reactor, status: 'Enfriando' } : reactor
              ));
              if (systemStatus === 'ESTABLE' || systemStatus === 'CALENTANDO') {
                  setSystemStatus('ENFRIANDO');
                  addEvent("Iniciando secuencia de apagado para P-01 via comando de flota.");
              }
              addEvent(`Deteniendo todos los reactores activos.`);
              break;
      }
  };


    const runElectricalDiagnostics = useCallback(() => {
        setIsDiagnosing(true);
        addEvent("Ejecutando diagnóstico de seguridad eléctrica...");
        setTimeout(() => {
            setHmiState(prev => ({
                ...prev,
                groundingStatus: 'OK',
                insulationIntegrity: 99.9,
            }));
            addEvent("Diagnóstico eléctrico completo. Sistema verificado.");
            setIsDiagnosing(false);
        }, 3000);
    }, [addEvent]);

  const handleSaveTask = useCallback((task: Task) => {
    setTasks(prevTasks => [task, ...prevTasks]);
    setView('tasks');
  }, []);
  
  // --- ECOSYSTEM INTEGRATION STATES ---
  const [argusModel, setArgusModel] = useState<ArgusModel>({
    datasetSize: 50000,
    precision: 92.5,
    falsePositiveRate: 4.2
  });

  const [continuousLearning, setContinuousLearning] = useState(false);

  const [phoenixState, setPhoenixState] = useState<PhoenixState>({
    isRunning: true,
    wasteComposition: { biomasaOrganica: 70, plasticosDeseados: 10, plasticosContaminantes: 5, metales: 5, inertes: 10 },
    argusKpis: { tasaClasificacion: 110, purezaOrganico: 92.5, eficienciaDeteccion: 95.8 },
    continuousLearning: false,
    trituradorasStatus: 'OK',
    secadorStatus: 'OK',
    pelletProduction: 500, // kg/h
    pelletQuality: { purity: 92.5, moisture: 12.0 },
    pelletSiloLevel: 2500, // kg
  });
  
  const [vulcanoState, setVulcanoState] = useState<VulcanoState>({
    isRunning: true,
    inputTonsPerDay: 50,
    storageLevelTons: 150,
    fireRisk: 15,
    sanitaryRisk: 20,
    machines: {
        debeader: 'OK',
        primaryShredder: 'ATASCO',
        rasperMill: 'OK',
        granulators: 'OK',
        magneticSeparators: 'OK',
        textileClassifiers: 'OK',
    },
    processingRateTiresPerHour: 100,
    outputPurity: { gcr: 99.5, steel: 98.0, fiber: 95.0 },
    productionRateKgPerHour: { gcr: 750, steel: 200, fiber: 50 },
    siloLevelsKg: { gcr: 5000, steel: 2000, fiber: 500 },
  });
  const prevVulcanoState = useRef<VulcanoState>(vulcanoState);

  const [reactorStates, setReactorStates] = useState<ReactorState[]>([
      { id: 'P-01', status: 'Inactivo', feedstock: 'Pellets (Phoenix)', feedstockType: 'Biomasa procesada', agentMode: 'Solo Monitoreo', temperature: 25, targetTemp: 500, pressure: 1.01, feedRate: 0, bioOilOutput: 0, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 92.5, pelletMoisture: 10.0, efficiencyFactor: 1.0 },
      { id: 'P-02', status: 'Estable', feedstock: 'Pellets (Phoenix)', feedstockType: 'Biomasa procesada', agentMode: 'Auto-Optimización (IA)', temperature: 428.0, targetTemp: 450, pressure: 1.2, feedRate: 650, bioOilOutput: 271.6, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 77.7, pelletMoisture: 12.0, efficiencyFactor: 59.7 },
      { id: 'P-03', status: 'Estable', feedstock: 'Grano de Caucho (Vulcano)', feedstockType: 'Grano de Caucho', agentMode: 'Auto-Optimización (IA)', temperature: 845.0, targetTemp: 850, pressure: 2.5, feedRate: 800, bioOilOutput: 235.3, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 99.55, pelletMoisture: 1.0, efficiencyFactor: 98.0 },
      { id: 'P-04', status: 'Inactivo', feedstock: 'Pellets (Phoenix)', feedstockType: 'Biomasa procesada', agentMode: 'Solo Monitoreo', temperature: 30.0, targetTemp: 500, pressure: 1.0, feedRate: 0, bioOilOutput: 0, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 77.7, pelletMoisture: 12.0, efficiencyFactor: 59.7 },
      { id: 'P-05', status: 'Enfriando', feedstock: 'Pellets (Phoenix)', feedstockType: 'Biomasa procesada', agentMode: 'Manual', temperature: 150.0, targetTemp: 25, pressure: 1.05, feedRate: 0, bioOilOutput: 0, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 77.7, pelletMoisture: 12.0, efficiencyFactor: 59.7 },
      { id: 'P-06', status: 'Inactivo', feedstock: 'Pellets (Phoenix)', feedstockType: 'Biomasa procesada', agentMode: 'Solo Monitoreo', temperature: 28.0, targetTemp: 500, pressure: 1.0, feedRate: 0, bioOilOutput: 0, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 77.7, pelletMoisture: 12.0, efficiencyFactor: 59.7 },
      { id: 'P-07', status: 'Inactivo', feedstock: 'Pellets (Phoenix)', feedstockType: 'Biomasa procesada', agentMode: 'Solo Monitoreo', temperature: 26.0, targetTemp: 500, pressure: 1.0, feedRate: 0, bioOilOutput: 0, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 77.7, pelletMoisture: 12.0, efficiencyFactor: 59.7 },
      { id: 'P-08', status: 'Inactivo', feedstock: 'Pellets (Phoenix)', feedstockType: 'Biomasa procesada', agentMode: 'Solo Monitoreo', temperature: 29.0, targetTemp: 500, pressure: 1.0, feedRate: 0, bioOilOutput: 0, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 77.7, pelletMoisture: 12.0, efficiencyFactor: 59.7 },
      { id: 'P-09', status: 'Inactivo', feedstock: 'Pellets (Phoenix)', feedstockType: 'Biomasa procesada', agentMode: 'Solo Monitoreo', temperature: 27.0, targetTemp: 500, pressure: 1.0, feedRate: 0, bioOilOutput: 0, emergencyStop: 'ARMADO', o2Level: 20.9, pelletPurity: 77.7, pelletMoisture: 12.0, efficiencyFactor: 59.7 },
  ]);

  const [aegisState, setAegisState] = useState<AegisState>({
    ncsLevel: 3,
    activeSector: 'Laboratorio P-07 (Zona Roja)',
    events: ([
      { id: `evt-init-3`, timestamp: Date.now() - 20000, sector: 'Phoenix', type: 'Seguridad', message: 'Patrulla de seguridad completada. Sin novedades.', level: 'Info' },
      { id: `evt-init-2`, timestamp: Date.now() - 10000, sector: 'Phoenix', type: 'Seguridad', message: 'NCS elevado a 2. Anomalía menor detectada. Monitoreo aumentado.', level: 'Vigilancia' },
      { id: `evt-init-1`, timestamp: Date.now() - 5000, sector: 'Delta', type: 'Seguridad', message: 'NCS elevado a 3. Amenaza potencial detectada. Se requiere doble autenticación.', level: 'Alerta' },
    ] as AegisEvent[]).sort((a, b) => b.timestamp - a.timestamp),
    directorDirective: "Amenaza potencial detectada. Se requiere doble autenticación.",
  });
  
  // --- DEFI HANDLERS & SIMULATIONS ---
  const handleVerifyAsset = useCallback(() => {
    setChronosState(prev => ({ ...prev, assetOrigin: { ...prev.assetOrigin, status: 'VERIFYING' } }));
    setTimeout(() => {
        setChronosState(prev => ({ ...prev, assetOrigin: { ...prev.assetOrigin, status: 'VERIFIED' }, phase: 2 }));
    }, 2000);
  }, []);

  const handleDeployContract = useCallback(() => {
    const address = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setIssuanceState(prev => ({ ...prev, events: [...prev.events, 'Desplegando Smart Contract...'] }));
    setTimeout(() => {
        setIssuanceState(prev => ({ ...prev, contractStatus: 'DEPLOYED', contractAddress: address, events: [...prev.events, `ÉXITO: Smart Contract desplegado en ${address}`] }));
    }, 2500);
  }, []);

  const handleMintTokens = useCallback(() => {
      const { totalSupply, tokenName } = chronosState.tokenStructure;
      setIssuanceState(prev => ({ ...prev, events: [...prev.events, `Acuñando ${totalSupply.toLocaleString()} ${tokenName}...`] }));
      setTimeout(() => {
          setIssuanceState(prev => ({ ...prev, tokenStatus: 'MINTED', events: [...prev.events, `ÉXITO: ${totalSupply.toLocaleString()} ${tokenName} acuñados en la billetera del propietario.`] }));
          setChronosState(prev => ({ ...prev, phase: 4 }));
      }, 2000);
  }, [chronosState.tokenStructure]);
  
  const handleLiquidation = useCallback(() => {
    const salePrice = (stoState.target || chronosState.tokenStructure.totalSupply) * 1.20; // 20% profit
    const profitPercentage = 20;

    setChronosState(prev => ({ ...prev, liquidation: { status: 'EXECUTED', salePrice, profitPercentage } }));

    const finalReportTask: Task = {
        id: `task-report-${Date.now()}`,
        title: `Informe de Liquidación: ${stoState.assetId ? chronosState.secondaryAssets.find(a => a.id === stoState.assetId)?.tokenName : chronosState.tokenStructure.tokenName}`,
        createdAt: Date.now(),
        status: 'Completado',
        contentType: ContentType.Texto,
        formData: {
            objective: `Generar un informe ejecutivo sobre el resultado de la liquidación del activo tokenizado.`,
            tone: 'Formal',
            specifics: {
              [ContentType.Texto]: {},
              [ContentType.Imagen]: {},
              [ContentType.Video]: {},
              [ContentType.Audio]: {},
              [ContentType.Codigo]: {},
            }
        },
        isIntelligent: false,
        agentId: 'Synthia Pro',
        eventType: 'ExecutiveReport',
        result: {
            text: `Informe de Liquidación:\n\nRentabilidad del 20% distribuida exitosamente a ${stoState.investors.length} inversores.\n\n- Valor de Venta: ${salePrice.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}\n- Distribución por token: 1.20 USDC`
        }
    };
    handleSaveTask(finalReportTask);
}, [chronosState, stoState, handleSaveTask]);

const handleStartSTO = useCallback(() => {
    if (stoState.status === 'PREPARING') {
        setStoState(prev => ({ ...prev, status: 'ACTIVE' }));
    }
}, [stoState.status]);


  // STO Simulation Effect
  useEffect(() => {
      if (stoState.status === 'ACTIVE' && !stoIntervalRef.current) {
          stoIntervalRef.current = window.setInterval(() => {
              setStoState(prev => {
                  if (prev.fundsRaised >= prev.target) {
                      if (stoIntervalRef.current) clearInterval(stoIntervalRef.current);
                      stoIntervalRef.current = null;
                      setChronosState(p => ({ ...p, phase: 5 }));
                      return { ...prev, status: 'COMPLETED' };
                  }
                  
                  const newInvestor = {
                      id: prev.investors.length + 1,
                      amount: Math.floor(Math.random() * 2000) + 50
                  };
                  
                  const newFundsRaised = Math.min(prev.target, prev.fundsRaised + newInvestor.amount);
                  
                  return {
                      ...prev,
                      investors: [newInvestor, ...prev.investors],
                      fundsRaised: newFundsRaised,
                  };
              });
          }, 1000);
      }
      return () => { if (stoIntervalRef.current) clearInterval(stoIntervalRef.current); stoIntervalRef.current = null; };
  }, [stoState.status, stoState.target]);

  // DEX Simulation Effect
  useEffect(() => {
      if (stoState.status === 'COMPLETED' && !dexListing) {
          const tokenName = stoState.assetId ? chronosState.secondaryAssets.find(a => a.id === stoState.assetId)?.tokenName : chronosState.tokenStructure.tokenName;
          const nominalValue = stoState.assetId ? chronosState.secondaryAssets.find(a => a.id === stoState.assetId)?.nominalValue : chronosState.tokenStructure.nominalValue;
          
          if (tokenName && nominalValue) {
            const initialListing: DEXListing = {
                tokenName: tokenName,
                price: nominalValue,
                change24h: 0,
            };
            setDexListing(initialListing);

            dexIntervalRef.current = window.setInterval(() => {
                setDexListing(prev => {
                    if (!prev) return null;
                    const change = (Math.random() - 0.49) * 5; // Fluctuation between roughly -2.5% and +2.5%
                    const newPrice = Math.max(0.1, prev.price * (1 + change / 100));
                    return {
                        ...prev,
                        price: newPrice,
                        change24h: prev.change24h * 0.95 + change, // Smoothed change
                    }
                });
            }, 3000);
          }
      }
       return () => { if (dexIntervalRef.current) clearInterval(dexIntervalRef.current); };
  }, [stoState.status, dexListing, chronosState]);


  // Refs to hold the latest HMI state for intervals, preventing stale closures.
  const hmiStateRef = useRef(hmiState);
  const systemStatusRef = useRef(systemStatus);
  const minuteLogCounterRef = useRef(0);
  useEffect(() => { hmiStateRef.current = hmiState; }, [hmiState]);
  useEffect(() => { systemStatusRef.current = systemStatus; }, [systemStatus]);

  // HMI Simulation Loop
  useEffect(() => {
    const hmiInterval = setInterval(() => {
        setCurrentTime(new Date());

        setHmiState(prevHmi => {
            let nextHmi = { ...prevHmi };
            let nextStatus = systemStatusRef.current;

            switch (systemStatusRef.current) {
                case 'CALENTANDO':
                    setHeatingSeconds(s => s + 1);
                    setCoolingSeconds(0);
                    setStableSeconds(0);

                    const tempRise = (nextHmi.targetTemp > nextHmi.reactorTemp) ? (nextHmi.targetTemp - nextHmi.reactorTemp) * 0.03 + 2 : 0;
                    nextHmi.reactorTemp = Math.min(nextHmi.targetTemp, nextHmi.reactorTemp + tempRise);
                    nextHmi.reactorWallTemp = nextHmi.reactorTemp * 0.98 + (Math.random() - 0.5);
                    nextHmi.reactorPressure = 1.01 + ((nextHmi.reactorTemp - 25) / (nextHmi.targetTemp - 25)) * 0.11;
                    nextHmi.energyConsumption = 8.5 + (Math.random() - 0.5);
                    
                    nextHmi.thermocoupleCoreTemp = nextHmi.reactorTemp + (Math.random() - 0.5) * 0.5;
                    nextHmi.pyrometerCoreTemp = nextHmi.reactorTemp * 0.95 + (Math.random() - 0.5);

                    if (nextHmi.reactorTemp >= nextHmi.targetTemp) {
                        nextStatus = 'ESTABLE';
                        addEvent("Reactor P-01 estabilizado a temperatura objetivo.");
                    }
                    break;

                case 'ESTABLE':
                    setStableSeconds(s => s + 1);
                    nextHmi = { ...prevHmi }; 
                    
                    nextHmi.systemMode = 'ESTABLE';
                    nextHmi.condenserState = 'ACTIVO';
                    nextHmi.dischargeSystemState = 'DESCARGANDO';
                    nextHmi.dischargeValve = 'ABIERTA';
                    nextHmi.coolerState = 'ENFRIANDO';
                    nextHmi.catalystSystemState = 'ACTIVO';
                    nextHmi.catalystDoseValve = 'ABIERTA';
                    nextHmi.safetySystem = 'ARMADO';
                    nextHmi.inertGasPurge = 'ACTIVO';
                    nextHmi.refrigerationSystemState = 'ACTIVO';
                    nextHmi.refrigerationPumpState = 'ACTIVO';
                    nextHmi.biomassFeederState = true;

                    nextHmi.reactorTemp = prevHmi.targetTemp + (Math.random() - 0.5) * 1.5;
                    nextHmi.reactorWallTemp = nextHmi.reactorTemp * 0.98 + (Math.random() - 0.5);
                    if (isTempSensorFailed) {
                        // Sensor gets stuck at a plausible but incorrect value
                        nextHmi.thermocoupleCoreTemp = 485.5 + (Math.random() - 0.5) * 0.1;
                    } else {
                        nextHmi.thermocoupleCoreTemp = nextHmi.reactorTemp + (Math.random() - 0.5) * 0.5;
                    }
                    nextHmi.pyrometerCoreTemp = nextHmi.reactorTemp * 0.95 + (Math.random() - 0.5);
                    nextHmi.reactorPressure = 1.12 + (Math.random() - 0.5) * 0.05;

                    nextHmi.energyConsumption = 7.8 + (Math.random() - 0.5) * 0.5;
                    nextHmi.feedRate = 37.5 + (Math.random() - 0.5) * 5;
                    nextHmi.vaporFlow = nextHmi.feedRate * 0.7;
                    nextHmi.condensateFlow = nextHmi.vaporFlow * 0.93;
                    nextHmi.condenserTemp = 21.0 + (Math.random() - 0.5) * 2;
                    nextHmi.coolingPower = 8.3 + (Math.random() - 0.5);
                    
                    nextHmi.biomassFeederRpm = 250 + (Math.random() - 0.5) * 10;
                    
                    nextHmi.biomassHopperLevel = Math.max(0, prevHmi.biomassHopperLevel - 0.01 * (nextHmi.feedRate / 37.5));
                    nextHmi.bioOilTankLevel = Math.min(100, prevHmi.bioOilTankLevel + 0.02 * (nextHmi.condensateFlow / 24.41));
                    nextHmi.aqueousPhaseTankLevel = Math.min(100, prevHmi.aqueousPhaseTankLevel + 0.005);
                    nextHmi.biocharContainerLevel = Math.min(100, prevHmi.biocharContainerLevel + 0.008);

                    nextHmi.dischargeRate = 7.5 + (Math.random() - 0.5);
                    nextHmi.biocharTemp = 45 + (Math.random() - 0.5) * 5;
                    nextHmi.coolingWaterFlow = 15 + (Math.random() - 0.5) * 2;
                    nextHmi.biocharTempCooler = 44 + (Math.random() - 0.5) * 2;
                    
                    nextHmi.catalystDoseActual = 5.0 + (Math.random() - 0.5) * 0.2;
                    nextHmi.catalystFeederRpm = 30 + (Math.random() - 0.5) * 3;

                    nextHmi.co = 41.7 + (Math.random() - 0.5) * 2;
                    nextHmi.co2 = 20.6 + (Math.random() - 0.5) * 2;
                    nextHmi.h2 = 25.3 + (Math.random() - 0.5) * 2;
                    nextHmi.ch4 = 9.3 + (Math.random() - 0.5) * 1;
                    
                    if (isCondenserObstructed) {
                        nextHmi.condenserTemp += 2.5; // Simulate temperature rise due to obstruction
                        nextHmi.condensateFlow *= 0.8; // Reduce flow
                        nextHmi.reactorPressure += 0.02; // Pressure builds up
                    }
                    if (isGasLineObstructed) {
                        nextHmi.reactorPressure += 0.05; // Simulate rapid pressure build-up
                        nextHmi.vaporFlow *= 0.5;
                    }
                    if (isBiomassContaminated) {
                        nextHmi.reactorTemp -= 0.7; // Efficiency drops, temperature struggles to maintain
                        nextHmi.condensateFlow *= 0.95; // Lower oil yield
                        nextHmi.co2 += 0.5; // More CO2, less useful gas
                        nextHmi.ch4 = Math.max(0, nextHmi.ch4 - 0.3);
                        nextHmi.h2 = Math.max(0, nextHmi.h2 - 0.2);
                        nextHmi.reactorPressure += 0.01; // Unstable gas production
                    }
                    
                    if (Math.random() < 0.001) { 
                        nextHmi.groundingStatus = 'FALLO';
                        addEvent("ALERTA: Fallo detectado en la puesta a tierra del reactor.");
                    }
                    if (Math.random() < 0.005) { 
                        nextHmi.insulationIntegrity = Math.max(85, prevHmi.insulationIntegrity - Math.random() * 0.1);
                    }
                    break;

                case 'ENFRIANDO':
                    setCoolingSeconds(s => s + 1);
                    if(heatingSeconds > 0) setHeatingSeconds(0);
                    const tempDrop = (nextHmi.reactorTemp > 25) ? (nextHmi.reactorTemp - 25) * 0.03 + 2 : 0;
                    nextHmi.reactorTemp = Math.max(25, nextHmi.reactorTemp - tempDrop);
                    nextHmi.reactorWallTemp = nextHmi.reactorTemp * 1.01;
                    nextHmi.reactorPressure = 1.01 + ((nextHmi.reactorTemp - 25) / 500);
                    nextHmi.energyConsumption = 0;
                    nextHmi.feedRate = 0;
                    nextHmi.vaporFlow = 0;
                    nextHmi.condensateFlow = 0;
                    
                    nextHmi.thermocoupleCoreTemp = nextHmi.reactorTemp + (Math.random() - 0.5) * 0.5;
                    nextHmi.pyrometerCoreTemp = nextHmi.reactorTemp * 0.95 + (Math.random() - 0.5);

                    if (nextHmi.reactorTemp <= 25.1) {
                        nextStatus = 'APAGADO';
                        addEvent("Reactor completamente enfriado. Sistema apagado.");
                    }
                    break;
                
                case 'APAGADO':
                    setCoolingSeconds(0);
                    setHeatingSeconds(0);
                    setStableSeconds(0);
                    break;
            }
            
            if (nextStatus !== systemStatusRef.current) {
                setSystemStatus(nextStatus);
            }

            setHistoryData(prev => {
                const now = (prev[prev.length - 1]?.time || 0) + 1;
                const newData = [...prev, { ...nextHmi, time: now }];
                return newData.length > 100 ? newData.slice(newData.length - 100) : newData;
            });

            return nextHmi;
        });

        // Log data every 5 seconds
        minuteLogCounterRef.current += 1;
        if (minuteLogCounterRef.current >= 5) {
            minuteLogCounterRef.current = 0;
            if (systemStatusRef.current !== 'APAGADO') {
                setMinuteLog(prevLog => {
                    const newLog = {
                        ...hmiStateRef.current,
                        time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
                    };
                    const updatedLog = [...prevLog, newLog];
                    return updatedLog.length > 100 ? updatedLog.slice(-100) : updatedLog;
                });
            }
        }
    }, 1000);

    return () => clearInterval(hmiInterval);
  }, [addEvent, isBiomassContaminated, isCondenserObstructed, isGasLineObstructed, isTempSensorFailed]);

  // --- MAIN ECOSYSTEM SIMULATION LOOP ---
  useEffect(() => {
    const simulationInterval = setInterval(() => {
        
      const currentPhoenixState = phoenixState;
      const currentReactorStates = reactorStates;
      const currentAegisState = aegisState;
      const currentVulcanoState = vulcanoState;
      const previousVulcanoState = prevVulcanoState.current;
      
      let nextPhoenixState = { ...currentPhoenixState };
      let nextReactorStates = [...currentReactorStates];
      let nextAegisState = { ...currentAegisState, events: [...currentAegisState.events] };
      let nextVulcanoState = { ...currentVulcanoState, machines: { ...currentVulcanoState.machines } };

      if (nextVulcanoState.isRunning) {
        const TIRE_WEIGHT_KG = 10;
        const MAX_STORAGE_TONS = 1000;
        
        const processingRateTonsPerDay = (nextVulcanoState.processingRateTiresPerHour * TIRE_WEIGHT_KG * 24) / 1000;
        const dailyChange = nextVulcanoState.inputTonsPerDay - processingRateTonsPerDay;
        nextVulcanoState.storageLevelTons += dailyChange / (24 * 60 * 60);
        nextVulcanoState.storageLevelTons = Math.max(0, Math.min(MAX_STORAGE_TONS, nextVulcanoState.storageLevelTons));

        const storagePercentage = (nextVulcanoState.storageLevelTons / MAX_STORAGE_TONS) * 100;
        nextVulcanoState.fireRisk = Math.min(100, storagePercentage * 1.2 + Math.random() * 2);
        nextVulcanoState.sanitaryRisk = Math.min(100, storagePercentage * 1.5 + Math.random() * 3);
        
        let allMachinesOk = true;
        for (const key in nextVulcanoState.machines) {
            const machine = key as keyof VulcanoState['machines'];
            if (nextVulcanoState.machines[machine] === 'OK' && Math.random() < 0.0025) { 
                if (machine !== 'primaryShredder') { // Don't randomly jam the one we set manually
                    nextVulcanoState.machines[machine] = 'ATASCO';
                }
            } else if (nextVulcanoState.machines[machine] === 'ATASCO' && Math.random() < 0.01) { 
                nextVulcanoState.machines[machine] = 'OK';
            }
            if (nextVulcanoState.machines[machine] !== 'OK') {
                allMachinesOk = false;
            }
        }

        nextVulcanoState.processingRateTiresPerHour = allMachinesOk ? 100 + (Math.random() - 0.5) * 10 : 0;
        
        const totalProductionKgPerHour = (nextVulcanoState.processingRateTiresPerHour * TIRE_WEIGHT_KG);
        nextVulcanoState.productionRateKgPerHour = {
            gcr: totalProductionKgPerHour * 0.75,
            steel: totalProductionKgPerHour * 0.20,
            fiber: totalProductionKgPerHour * 0.05,
        };

        const MAX_SILO_KG = 20000;
        nextVulcanoState.siloLevelsKg.gcr = Math.min(MAX_SILO_KG, nextVulcanoState.siloLevelsKg.gcr + nextVulcanoState.productionRateKgPerHour.gcr / 3600);
        nextVulcanoState.siloLevelsKg.steel = Math.min(MAX_SILO_KG, nextVulcanoState.siloLevelsKg.steel + nextVulcanoState.productionRateKgPerHour.steel / 3600);
        nextVulcanoState.siloLevelsKg.fiber = Math.min(MAX_SILO_KG, nextVulcanoState.siloLevelsKg.fiber + nextVulcanoState.productionRateKgPerHour.fiber / 3600);

        nextVulcanoState.outputPurity = {
            gcr: 99.5 + (Math.random() - 0.5) * 0.2,
            steel: 98.0 + (Math.random() - 0.5) * 0.5,
            fiber: 95.0 + (Math.random() - 0.5) * 1.0,
        };
      }

      const previousTrituradorasStatus = currentPhoenixState.trituradorasStatus;
      const previousSecadorStatus = currentPhoenixState.secadorStatus;
      
      let pelletSiloDrawn = 0;
      let gcrSiloDrawn = 0;
      currentReactorStates.forEach(reactor => {
        if (reactor.status !== 'Inactivo' && reactor.feedRate > 0) {
            if (reactor.feedstockType === 'Grano de Caucho') {
                gcrSiloDrawn += reactor.feedRate / 3600;
            } else {
                pelletSiloDrawn += reactor.feedRate / 3600;
            }
        }
      });
      
      nextVulcanoState.siloLevelsKg.gcr = Math.max(0, currentVulcanoState.siloLevelsKg.gcr - gcrSiloDrawn);

      if (currentPhoenixState.isRunning) {
        nextPhoenixState.trituradorasStatus = (Math.random() < 0.008) ? 'ATASCO' : (Math.random() < 0.02) ? 'OK' : currentPhoenixState.trituradorasStatus;
        nextPhoenixState.secadorStatus = (Math.random() < 0.005) ? 'SOBRECALENTAMIENTO' : (Math.random() < 0.02) ? 'OK' : currentPhoenixState.secadorStatus;
        
        if (nextPhoenixState.continuousLearning && Math.random() < 0.1) {
            setArgusModel(prevModel => ({
                datasetSize: prevModel.datasetSize + Math.floor(Math.random() * 50) + 1,
                precision: Math.min(99.9, prevModel.precision + 0.005),
                falsePositiveRate: Math.max(0.1, prevModel.falsePositiveRate - 0.001)
            }));
        }

        const totalContaminants = Number(currentPhoenixState.wasteComposition.plasticosContaminantes) + Number(currentPhoenixState.wasteComposition.metales) + Number(currentPhoenixState.wasteComposition.inertes);
        const penaltyFactor = totalContaminants * 0.8;
        nextPhoenixState.argusKpis = {
            tasaClasificacion: 110 + (Math.random() - 0.5) * 10,
            purezaOrganico: Math.max(0, (argusModel.precision / 100) * (100 - penaltyFactor)),
            eficienciaDeteccion: Math.max(0, 100 - argusModel.falsePositiveRate - (totalContaminants * 0.1))
        };
        nextPhoenixState.pelletQuality = {
            purity: parseFloat(nextPhoenixState.argusKpis.purezaOrganico.toFixed(2)),
            moisture: parseFloat((10 + (totalContaminants / 10)).toFixed(2))
        };
        nextPhoenixState.pelletProduction = (nextPhoenixState.trituradorasStatus === 'OK' && nextPhoenixState.secadorStatus === 'OK') ? 500 : 0;
        const productionPerSecond = nextPhoenixState.pelletProduction / 3600;
        nextPhoenixState.pelletSiloLevel = Math.max(0, currentPhoenixState.pelletSiloLevel + productionPerSecond - pelletSiloDrawn);

      } else { 
        nextPhoenixState.trituradorasStatus = 'OK';
        nextPhoenixState.secadorStatus = 'OK';
        nextPhoenixState.pelletProduction = 0;
        nextPhoenixState.argusKpis = { tasaClasificacion: 0, purezaOrganico: 0, eficienciaDeteccion: 0 };
        nextPhoenixState.pelletQuality = { purity: 0, moisture: 0 };
        nextPhoenixState.pelletSiloLevel = Math.max(0, currentPhoenixState.pelletSiloLevel - pelletSiloDrawn);
      }
      
      const siloHasPellets = nextPhoenixState.pelletSiloLevel > 0;
      const siloHasGcr = nextVulcanoState.siloLevelsKg.gcr > 0;
      const { purity: nextPelletPurity, moisture: nextPelletMoisture } = nextPhoenixState.pelletQuality;
      const { gcr: gcrPurity } = nextVulcanoState.outputPurity;

      const mapHmiStatusToReactorStatus = (status: HMIStatus): ReactorStatus => {
          switch (status) {
              case 'CALENTANDO': return 'Arrancando';
              case 'ESTABLE': return 'Estable';
              case 'ENFRIANDO': return 'Enfriando';
              case 'APAGADO': default: return 'Inactivo';
          }
      };
      
      nextReactorStates = currentReactorStates.map(reactor => {
          if (reactor.id === 'P-01') {
              const latestHmiState = hmiStateRef.current;
              const latestSystemStatus = systemStatusRef.current;
              return { ...reactor, status: mapHmiStatusToReactorStatus(latestSystemStatus), temperature: latestHmiState.reactorTemp, pressure: latestHmiState.reactorPressure, feedRate: latestHmiState.feedRate, bioOilOutput: latestHmiState.condensateFlow, targetTemp: latestHmiState.targetTemp, agentMode: latestHmiState.agentMode as any, };
          }

          let newReactorState = { ...reactor };
          if (reactor.feedstockType === 'Grano de Caucho') {
            if (!siloHasGcr && reactor.status !== 'Inactivo') {
                newReactorState.status = 'Inactivo';
                addEvent(`Reactor ${reactor.id} detenido: Sin GCR desde Vulcano.`);
            }
            newReactorState.pelletPurity = gcrPurity;
            newReactorState.pelletMoisture = 1.0;
          } else {
             if (!siloHasPellets && reactor.status !== 'Inactivo' && reactor.feedRate > 0) {
                newReactorState.status = 'Inactivo';
                addEvent(`Reactor ${reactor.id} detenido: Sin pellets desde Phoenix.`);
            }
            newReactorState.pelletPurity = nextPhoenixState.isRunning ? nextPelletPurity : reactor.pelletPurity;
            newReactorState.pelletMoisture = nextPhoenixState.isRunning ? nextPelletMoisture : reactor.pelletMoisture;
          }
          
          const efficiencyFactor = (newReactorState.pelletPurity / 100) - (newReactorState.pelletMoisture * 0.015);
          newReactorState.efficiencyFactor = Math.max(0.1, Math.min(1.1, efficiencyFactor));
          
          if (newReactorState.status === 'Estable') {
              const baseConversionRate = newReactorState.targetTemp > 700 ? 0.3 : 0.35;
              newReactorState.bioOilOutput = newReactorState.feedRate * baseConversionRate * newReactorState.efficiencyFactor;
              newReactorState.temperature = reactor.targetTemp - ((1 - newReactorState.efficiencyFactor) * 50) + (Math.random() - 0.5) * 5;
          } else if (newReactorState.status !== 'Inactivo' && newReactorState.status !== 'Enfriando') {
             newReactorState.temperature = Math.max(25, newReactorState.temperature - 5);
             newReactorState.bioOilOutput = 0;
          }
          return newReactorState;
      });

      let newAegisEvents: AegisEvent[] = [];
      if (nextPhoenixState.trituradorasStatus === 'ATASCO' && previousTrituradorasStatus !== 'ATASCO') {
          newAegisEvents.push({ id: `evt-tr-${Date.now()}`, timestamp: Date.now(), sector: 'Phoenix', type: 'Mecánica', message: 'Atasco detectado en Trituradora (T-101)', level: 'Advertencia' });
      }
      if (nextPhoenixState.secadorStatus === 'SOBRECALENTAMIENTO' && previousSecadorStatus !== 'SOBRECALENTAMIENTO') {
          newAegisEvents.push({ id: `evt-sc-${Date.now()}`, timestamp: Date.now(), sector: 'Phoenix', type: 'Incendio', message: 'Pico de Temperatura en Secador (D-102)', level: 'Alerta' });
      }

      const vulcanoMachineNameMap: Record<keyof VulcanoState['machines'], string> = {
          debeader: 'Destalonadora', primaryShredder: 'Trituradora Primaria', rasperMill: 'Molino Rasper', granulators: 'Granuladores', magneticSeparators: 'Separadores Magnéticos', textileClassifiers: 'Clasificadores Textiles'
      };
      for (const key in nextVulcanoState.machines) {
          const machine = key as keyof VulcanoState['machines'];
          if (nextVulcanoState.machines[machine] === 'ATASCO' && previousVulcanoState.machines[machine] !== 'ATASCO') {
              newAegisEvents.push({ id: `evt-vulcano-${key}-${Date.now()}`, timestamp: Date.now(), sector: 'Sector Vulcano', type: 'Mecánica', message: `Atasco detectado en ${vulcanoMachineNameMap[machine]}`, level: 'Advertencia' });
          }
      }

      const rasperMillJammed = nextVulcanoState.machines.rasperMill === 'ATASCO';
      const highFireRisk = nextVulcanoState.fireRisk > 75;
      const previousRasperMillJammed = previousVulcanoState.machines.rasperMill === 'ATASCO';
      if (rasperMillJammed && highFireRisk && !previousRasperMillJammed) {
          nextAegisState.ncsLevel = 4;
          const directive = "Alerta de seguridad en Sector Vulcano: Atasco mecánico con alto riesgo de incendio. Se recomienda parada del módulo.";
          nextAegisState.directorDirective = directive;
          newAegisEvents.push({ id: `evt-warden-${Date.now()}`, timestamp: Date.now(), sector: 'Sector Vulcano', type: 'Seguridad', message: directive, level: 'Alerta' });
      }

      if (newAegisEvents.length > 0) {
          nextAegisState.events = [...newAegisEvents, ...currentAegisState.events].slice(0, 50).sort((a,b) => b.timestamp - a.timestamp);
      }

      setPhoenixState(nextPhoenixState);
      setReactorStates(nextReactorStates);
      setAegisState(nextAegisState);
      setVulcanoState(nextVulcanoState);
      prevVulcanoState.current = nextVulcanoState;

    }, 1000);

    return () => clearInterval(simulationInterval);
  }, [phoenixState, reactorStates, aegisState, vulcanoState, argusModel, addEvent]);


  const handleStartChat = (agent: CharacterProfile) => {
    setActiveAgent(agent);
    agentChatRef.current = initializeAgentChat(agent.system_prompt);
    setChatHistory([]);
    setIsChatModalOpen(true);
  };

  const handleSendMessage = async (message: string, file?: { name: string; type: string; data: string; }) => {
    if (!agentChatRef.current) return;
    const userMessage: ChatMessage = { role: 'user', text: message, file };
    setChatHistory(prev => [...prev, userMessage]);
    setIsAgentReplying(true);

    try {
        const responseText = await continueAgentChat(agentChatRef.current, message, file);
        const agentMessage: ChatMessage = { role: 'model', text: responseText };
        setChatHistory(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error("Error communicating with agent:", error);
      const errorMessage: ChatMessage = {
        role: 'model',
        text: 'Lo siento, he encontrado un error y no puedo responder en este momento.',
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsAgentReplying(false);
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleUpdateStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleLoadTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        if (task.eventType === 'ComparativeAnalysis') {
            const preset = PRESETS.find(p => p.name === "Preset: Informe Comparativo de Viabilidad Energética");
            if (preset && preset.data) {
                const newFormData = JSON.parse(JSON.stringify(preset.data));
                
                if (task.formData?.specifics?.[ContentType.Texto]?.rawData) {
                    try {
                        const reportData = JSON.parse(task.formData.specifics[ContentType.Texto].rawData);
                        let markdownTable = `| Métrica | Tu Simulación | Central de Carbón (Base) | Caldera de Biomasa (Base) |\n`;
                        markdownTable += `|---|---|---|---|\n`;
                        markdownTable += `| Producción Energética (MJ/h) | ${reportData.currentEnergy.toFixed(0)} | ${reportData.coalEnergy.toFixed(0)} | ${reportData.biomassEnergy.toFixed(0)} |\n`;
                        markdownTable += `| Producción de Cenizas (kg/h) | ${reportData.currentAsh.toFixed(1)} | ${reportData.coalAsh.toFixed(1)} | ${reportData.biomassAsh.toFixed(1)} |\n`;

                        if (!newFormData.specifics) newFormData.specifics = {};
                        if (!newFormData.specifics[ContentType.Texto]) newFormData.specifics[ContentType.Texto] = {};
                        newFormData.specifics[ContentType.Texto].rawData = markdownTable;
                    } catch (e) {
                        console.error("Failed to parse/format comparative data", e);
                        if (newFormData.specifics?.[ContentType.Texto]) {
                            newFormData.specifics[ContentType.Texto].rawData = task.formData.specifics[ContentType.Texto].rawData;
                        }
                    }
                }
                setInitialCreatorData(newFormData);
                setInitialCreatorContentType(ContentType.Texto);
                setView('creator');
                return;
            }
        }
      setInitialCreatorData(task.formData);
      setInitialCreatorContentType(task.contentType);
      setView('creator');
    }
  };

  const handleLoadNarrativeFromTask = async (task: Task) => {
      if (!task.assayDetails) return;
      
      const material = PYROLYSIS_MATERIALS.find(m => m.id === task.assayDetails?.linkedMaterialId);
      const contextPacket = {
          titulo: task.title,
          tipoDeTarea: task.eventType || 'Ensayo de Laboratorio',
          material: material?.nombre || 'No especificado',
          metodologia: task.assayDetails.methodology,
          resultados: task.assayDetails.labResults.reduce((acc, res) => ({...acc, [res.name]: res.content}), {})
      };

      const narrativeFields = await generateNarrativeFields(contextPacket);
      
      const newFormData: Partial<FormData> = {
          objective: narrativeFields.objective,
          specifics: {
              [ContentType.Texto]: {
                  type: 'Informe Técnico de Laboratorio',
                  audience: narrativeFields.audience,
                  conflictPoint: narrativeFields.conflictPoint,
                  uvp: narrativeFields.uvp,
              },
              [ContentType.Imagen]: {},
              [ContentType.Video]: {},
              [ContentType.Audio]: {},
              [ContentType.Codigo]: {},
          }
      };
      setInitialCreatorData(newFormData);
      setInitialCreatorContentType(ContentType.Texto);
      setView('creator');
  };

  const renderView = () => {
    switch (view) {
      case 'creator':
        return <Creator 
          initialData={initialCreatorData} 
          initialContentType={initialCreatorContentType}
          onDataConsumed={() => { setInitialCreatorData(null); setInitialCreatorContentType(undefined); }}
          onSaveTask={handleSaveTask}
          allStyles={allStyles}
          onAddStyle={(newStyle) => setAllStyles(prev => [newStyle, ...prev])}
          creativeContext={creativeContext}
          onPromptGenerated={(context, prompt) => { if(context) setGeneratedPrompts(p => ({...p, [context.timestamp]: prompt}))}}
          knowledgeSources={knowledgeSources}
          setView={setView}
          chronosState={chronosState}
          stoState={stoState}
        />;
      case 'library':
        return <StyleLibrary allStyles={allStyles} onAddStyle={(newStyle) => setAllStyles(prev => [newStyle, ...prev])} onApplyVideoStyle={() => {}} onApplyPepStyle={() => {}} />;
      case 'pro':
        return <ProStudio formData={{} as any} handleChange={()=>{}} handleSubmit={()=>{}} isLoading={false} error="" generatedPrompt="" onReset={()=>{}} onMetadataExtract={()=>{}} onUseInCreator={()=>{}} />;
      case 'academia':
        return <Academia />;
      case 'editor':
        return <ProfessionalEditor onAddStyle={(newStyle) => setAllStyles(prev => [newStyle, ...prev])} initialData={null} setInitialData={() => {}} />;
      case 'gallery':
        return <InspirationGallery onUseInspiration={() => {}} />;
      case 'pro-layouts':
        return <ProLayoutGallery selectedLayout="layout-01" onSelectLayout={() => {}} allStyles={allStyles} />;
      case 'tasks':
        return <TaskManager tasks={tasks} onUpdateStatus={handleUpdateStatus} onUpdateTask={handleUpdateTask} onDelete={handleDeleteTask} onLoad={handleLoadTask} onSaveTask={handleSaveTask} setView={setView} setInitialHubSearch={setInitialHubSearch} knowledgeSources={knowledgeSources} onLoadNarrative={handleLoadNarrativeFromTask} />;
      case 'pyrolysis-hub':
        return <PyrolysisHub 
            onSimulateMixture={handleStartMixtureSimulation} 
            onEditImage={()=>{}} 
            initialSearch={initialHubSearch} 
            onCreateContentFromMaterial={handleCreateContentFromMaterial} 
            setView={setView}
            virtualMaterial={virtualMaterialForHub}
            onVirtualMaterialConsumed={() => setVirtualMaterialForHub(null)}
          />;
      case 'comparative-lab':
        return <ComparativeScenariosLab 
          onSaveTask={handleSaveTask} 
          initialMaterialIds={initialLabMaterialIds}
          onDataConsumed={() => setInitialLabMaterialIds(null)}
        />;
      case 'knowledge-base':
        return <KnowledgeBase 
            sources={knowledgeSources} 
            onAddSource={(s) => setKnowledgeSources(p => [...p, s])} 
            onClearSources={() => setKnowledgeSources([])}
            onAddVirtualMaterial={handleAddVirtualMaterialToHub}
        />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'process-optimizer':
        return <ProcessOptimizer onSaveTask={handleSaveTask} />;
      case 'property-visualizer':
        return <PropertyVisualizer />;
      case 'energy-balance':
        return <EnergyBalanceSimulator onNavigateWithContext={() => {}} generatedPrompts={generatedPrompts} />;
      case 'energy-explorer':
        return <EnergyExplorer onSaveTask={handleSaveTask} />;
      case 'user-guide':
        return <UserGuide setView={setView} setContentType={setInitialCreatorContentType} setVideoModeToAgent={() => {}} />;
      case 'game':
        return <Game />;
      case 'experiment-designer':
        return <ExperimentDesigner onUseAnalysisForPrompt={()=>{}}/>;
      case 'titans-atrium':
        return <TitansAtrium setView={setView} onStartChat={handleStartChat} />;
      case 'hmi-control-room':
        return <HMIControlRoom 
                    hmiState={hmiState} setHmiState={setHmiState}
                    systemStatus={systemStatus} setSystemStatus={setSystemStatus}
                    heatingSeconds={heatingSeconds} coolingSeconds={coolingSeconds}
                    stableSeconds={stableSeconds}
                    activeAlarms={activeAlarms} setActiveAlarms={setActiveAlarms}
                    events={events} addEvent={addEvent}
                    historyData={historyData} minuteLog={minuteLog}
                    currentTime={currentTime} setView={setView}
                    alarmConfigs={alarmConfigs} onAlarmConfigChange={setAlarmConfigs}
                    pidGains={pidGains} onPidChange={setPidGains}
                    selectedFeedstockId={selectedFeedstockId} onFeedstockChange={setSelectedFeedstockId}
                    selectedCatalystId={selectedCatalystId} onCatalystChange={setSelectedCatalystId}
                    initialTab={initialHmiTab} onTabVisited={() => setInitialHmiTab(null)}
                    isDiagnosing={isDiagnosing}
                    runElectricalDiagnostics={runElectricalDiagnostics}
// FIX: The prop 'isCondenserObstructed' had a typo 'isCondenserOb' and was incomplete. The full set of boolean state props for HMIControlRoom has been added to fix the syntax error and ensure the component receives all necessary state handlers.
                    isCondenserObstructed={isCondenserObstructed}
                    setIsCondenserObstructed={setIsCondenserObstructed}
                    isGasLineObstructed={isGasLineObstructed}
                    setIsGasLineObstructed={setIsGasLineObstructed}
                    isTempSensorFailed={isTempSensorFailed}
                    setIsTempSensorFailed={setIsTempSensorFailed}
                    isBiomassContaminated={isBiomassContaminated}
                    setIsBiomassContaminated={setIsBiomassContaminated}
                    onOpenUtilityWidget={handleOpenUtilityWidget}
                />;
      case 'hyperion-9':
        return <Hyperion9 
                    reactors={reactorStates} 
                    navigateToHmi={(tab) => { setInitialHmiTab(tab || null); setView('hmi-control-room'); }} 
                    setView={setView} 
                    heatingSeconds={heatingSeconds} 
                    coolingSeconds={coolingSeconds}
                    phoenixSiloLevel={phoenixState.pelletSiloLevel}
                    dexListing={dexListing}
                    onFleetCommand={handleFleetCommand}
                />;
      case 'assay-manager':
        return <AssayManager tasks={tasks} onSaveTask={handleSaveTask} onUpdateTask={handleUpdateTask} setView={setView} />;
      case 'aegis-9':
        return <Aegis9 aegisState={aegisState} setAegisState={setAegisState} />;
      case 'phoenix':
        return <Phoenix phoenixState={phoenixState} setPhoenixState={setPhoenixState} argusModel={argusModel} onNavigateToUtilities={handleNavigateToUtilities} onSaveTask={handleSaveTask} />;
      case 'vulcano':
        return <Vulcano vulcanoState={vulcanoState} setVulcanoState={setVulcanoState} setView={setView} onNavigateToUtilities={handleNavigateToUtilities} onSaveTask={handleSaveTask}/>;
      case 'bioeconomy-lab':
        return <IAProStudio 
          issuanceState={issuanceState}
          handleDeployContract={handleDeployContract}
          handleMintTokens={handleMintTokens}
          gaiaLabState={gaiaLabState}
          onTakeSample={handleTakeSample}
          setView={setView}
          onSaveTask={handleSaveTask}
        />;
      case 'chronos':
        return <Chronos
          chronosState={chronosState}
          issuanceState={issuanceState}
          stoState={stoState}
          setView={setView}
          handleVerifyAsset={handleVerifyAsset}
          handleLiquidation={handleLiquidation}
        />;
      case 'agriDeFi':
        return <AgriDeFi stoState={stoState} onStartSTO={handleStartSTO} onSaveTask={handleSaveTask} />;
      case 'gaia-lab':
        return <GaiaLab gaiaLabState={gaiaLabState} onTakeSample={handleTakeSample} />;
      case 'innovation-forge':
        return <InnovationForge coPresets={CO_PRESETS} reactors={reactorStates} addEvent={addEvent} />;
      case 'kairos-panel':
        return <KairosFinancialPanel chronosState={chronosState} stoState={stoState} />;
      case 'cogeneration-simulator':
        return <CogenerationSimulator onSaveTask={handleSaveTask} />;
      case 'fleet-simulator':
        return <FleetSimulator 
                    onSaveTask={handleSaveTask}
                    setView={setView} 
                    onCreateReport={handleCreateReportFromFleet} 
                    onOpenUtilityWidget={handleOpenUtilityWidget}
                    onSimulationComplete={(results) => setFleetSimulationResult(results)}
                />;
      case 'catalyst-lab':
        return <CatalystLab />;
      case 'utilities-simulator':
        return <UtilitiesSimulator onSaveTask={handleSaveTask} initialActiveTab={initialUtilityContext?.tab} initialDemands={initialUtilityContext?.demands} onDataConsumed={() => setInitialUtilityContext(null)} />;
      case 'generative-simulator':
        return <GenerativeSimulator onSaveTask={handleSaveTask} />;
      case 'circular-fleet':
        return <CircularFleet fleetSimulationResult={fleetSimulationResult} onSaveTask={handleSaveTask} onNavigateToUtilities={handleNavigateToUtilities} />;
      case 'energy-explorer':
        return <EnergyExplorer onSaveTask={handleSaveTask} />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto flex flex-col">
        <div className="flex items-center gap-3 mb-6 px-2">
          <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h1 className="text-xl font-bold text-gray-800">Synthia</h1>
        </div>
        <ViewSelector currentView={view} setView={setView} />
         <div className="mt-auto pt-4 border-t border-gray-200">
           <div className="flex items-center justify-between px-3">
             <button onClick={() => setIsAboutModalOpen(true)} className="text-sm font-medium text-gray-600 hover:text-blue-600">Acerca de</button>
             <select value={language} onChange={(e) => setLanguage(e.target.value as 'es' | 'en')} className="text-sm border-none bg-transparent focus:ring-0">
               <option value="es">ES</option>
               <option value="en">EN</option>
             </select>
           </div>
         </div>
      </aside>
      <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
        {renderView()}
      </div>
       {isAboutModalOpen && <AboutModal onClose={() => setIsAboutModalOpen(false)} />}
       {isChatModalOpen && activeAgent && (
         <AgentChatModal
            agent={activeAgent}
            isOpen={isChatModalOpen}
            onClose={() => setIsChatModalOpen(false)}
            chatHistory={chatHistory}
            onSendMessage={handleSendMessage}
            isAgentReplying={isAgentReplying}
         />
       )}
    </div>
  );
};

export default App;