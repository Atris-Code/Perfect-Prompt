import React from 'react';

// FIX: Removed unused 'Chat' type import.
// import type { Chat } from "@google/genai";

// FIX: Moved AIStudio interface into the global scope to resolve subsequent property declaration errors.
// This ensures there is only one, globally-scoped definition for AIStudio.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
    jspdf: any;
    html2canvas: any;
    exifr: any;
    // FIX: Moved pdfjsLib here to be a true global on the window object, resolving 'Cannot find name' errors.
    pdfjsLib: any;
  }
}

export interface ParallelSimulationResult {
    total_capacity_kg_h: number;
    total_biochar_kg_h: number;
    total_pyro_oil_kg_h: number;
    total_pyro_gas_kg_h: number;
    modules: number;
}

export enum ContentType {
  Texto = 'Texto',
  Imagen = 'Imagen',
  Video = 'Video',
  Audio = 'Audio',
  Codigo = 'Código',
}

export interface FormData {
  objective: string;
  tone: string;
  restrictions: string;
  outputLanguage?: string;
  location?: string;
  contextualLanguage?: string;
  keyVisualReference?: string;
  activeAgents: string[];
  specifics: {
    [ContentType.Texto]: {
      type?: string;
      audience?: string;
      narrativeCatalyst?: string;
      conflictPoint?: string;
      uvp?: string;
      cta?: string;
      rawData?: string;
      translationAudience?: string;
      uploadedDocument?: { name: string; content: string };
      visualToneSyncStyle?: string;
      simulationData?: ParallelSimulationResult; // Modified for fleet simulation results
      calculatedKpis?: any;
    };
    [ContentType.Imagen]: any;
    [ContentType.Video]: {
      audiovisualSequence?: AudiovisualScene[];
      videoCreationMode?: 'text-to-video' | 'image-to-video' | 'video-to-video';
      scriptSummary?: string;
      cameraMovement?: string;
      visualStyle?: string;
      vfx?: string;
      environment?: string;
      soundDesign?: string;
      musicGenre?: string;
      videoUrl?: string;
      inspirationImages?: { data: string; name: string; type: string; }[];
      // FIX: Add missing properties to the Video type to address TypeScript errors across multiple files.
      duration?: string | number;
      artisticStyle?: string[];
      marketingPreset?: string;
      enableAdvancedSpatialAudio?: boolean;
      musicSelectionMode?: string;
      musicPreset?: string;
      customMusicFile?: any;
      attenuationCurve?: string;
      sourceImageForVideo?: { data: string; name: string; type: string; };
      sourceVideo?: { data: string; name: string; type: string; };
      mediaToVideoPrompt?: string;
      aspectRatio?: '1:1' | '16:9' | '9:16';
    };
    [ContentType.Audio]: any;
    [ContentType.Codigo]: any;
  };
  scenarioA?: SimulationFormData;
  scenarioB?: SimulationFormData;
}

export interface ProFormData {
  pro_concept: string;
  pro_emotion: string;
  pro_symbolism: string;
  pro_composition_rule: string;
  pro_color_theory: string;
  pro_specific_palette: string;
  pro_focal_length: string;
  pro_shutter_speed: string;
  pro_iso: string;
  pro_lens_effects: string;
  pro_post_production: string;
}

export interface NarrativeConsistencyFeedback {
  stylisticCohesion: { score: number; analysis: string };
  emotionalIntensity: { score: number; analysis: string };
}

export interface TextualNarrativeCoherence {
  stylisticCohesion: { score: number; analysis: string };
  narrativeArchitecture: { score: number; analysis: string };
  audienceTranslation: { score: number; analysis: string };
}

export interface AgentSolution {
  agent: string;
  correctionType: string;
  description: string;
  changes: Partial<FormData>;
}

export interface GeoContextualData {
  validationMode: 'FACTUAL' | 'CONTEXTUAL';
  latitude?: string;
  longitude?: string;
  climate?: string;
  ambientAudio?: string;
  context?: string;
  symbolicConditions?: string;
  symbolicAudio?: string;
}

export interface DirectorAnalysis {
  analyzedScene: {
    baseDescription: string;
    appliedTechnique: string;
    techniqueDescription: string;
  };
  impactAnalysis: {
    components: {
      component: string;
      criterion: string;
      result: string;
      professionalismIndex: number;
    }[];
    finalCompositeIndex: {
      result: string;
      professionalismIndex: number;
    };
  };
  directorsJudgment: {
    addedValue: string;
    risk: string;
    finalIndex: number;
  };
  academyConclusion: {
    techniqueLevel: string;
    analysisSummary: string;

    recommendation: string;
  };
  cinematicPrompt: string;
}

export interface PyrolysisMaterial {
  id: number;
  fase: 'Sólido' | 'Líquido' | 'Gaseoso';
  nombre: string;
  categoria: string;
  propiedades: any; // Can be Solid, Liquid, or Gaseous properties
  origen_feedstock?: string;
}

export interface SolidMaterial extends PyrolysisMaterial {
  fase: 'Sólido';
  propiedades: {
    composicion: { celulosa?: number; hemicelulosa?: number; lignina?: number };
    analisisElemental: { carbono: number; hidrogeno: number; oxigeno: number; nitrogeno: number; azufre: number };
    analisisInmediato: { humedad: number; cenizas: number; materiaVolatil: number; carbonoFijo: number };
    poderCalorificoSuperior: number;
    rendimientoProductos?: { temperatura: number; bio_aceite: number; carbon: number; gas: number }[];
    propiedadesFisicas?: {
      densidad_kg_m3?: number;
      conductividad_W_mK?: number;
      poderCalorificoInferior_MJ_kg?: number;
    };
  };
}

export interface LiquidMaterial extends PyrolysisMaterial {
    fase: 'Líquido';
    propiedades: {
        propiedadesFisicas: { densidad_kg_m3: number; viscosidad_cSt_a_50C: number; ph: number };
        analisisElemental: { carbono: number; hidrogeno: number; oxigeno: number; nitrogeno: number; azufre: number; cloro_porcentaje?: number };
        contenidoAgua_porcentaje: number;
        poderCalorificoSuperior_MJ_kg: number;
        composicionQuimica_porcentaje?: Record<string, number | undefined>;
        composicionHidrocarburos_porcentaje?: Record<string, number | undefined>;
    };
}

export interface GaseousMaterial extends PyrolysisMaterial {
    fase: 'Gaseoso';
    propiedades: {
        composicion_vol_porcentaje: { H2: number; CO: number; CO2: number; CH4: number; C2_C4: number; N2: number };
        poderCalorificoInferior_MJ_Nm3: number;
        relacion_H2_CO: number;
        contaminantes: { alquitran_g_Nm3: number; azufre_ppm: number; HCI_ppm?: number };
    };
}

export interface OracleRecommendation {
  catalystName: string;
  justification: string;
  citations: string[];
}

export interface OptimizationResult {
  temperatura: number;
  tiempoResidencia: number;
  oxigeno: number;
  justificacion: string;
}

export interface ExperimentResultPoint {
    params: Record<string, number>;
    result: SimulationResult;
    objectiveValue: number;
}

export interface ExperimentConfig {
    variables: ExperimentVariable[];
    objective: string;
    materialId: number;
}
export interface ExperimentResult {
    config: ExperimentConfig;
    resultsMatrix: ExperimentResultPoint[];
    optimalPoint: ExperimentResultPoint;
    concilioAnalysis: string;
}

export interface ExperimentVariable {
    id: string;
    name: 'temperatura' | 'tiempoResidencia' | 'oxigeno';
    min: number;
    max: number;
    steps: number;
}


export interface AudiovisualScene {
  id: string;
  sceneTitle: string;
  narration: string;
  duration: number;
  visualPromptPreset: string;
  visualPromptFreeText: string;
  soundDesign: string;
}

export interface NarrativeBrief {
    overallTone: string;
    emotionalArc: string;
    visualProgression: string;
    soundProgression: string;
    directorsNote: string;
}

export interface VideoPreset {
  preset_name: string;
  category: string;
  description: string;
  parameters: Record<string, any>;
  prompt_block: string;
}

export interface AssaySuggestion {
  titulos: string[];
  objetivos: string[];
  metodologias: string[];
  consejoDelDia: {
    agente: string;
    mensaje: string;
  };
}

export interface GasProposal {
    id: number;
    titulo: string;
    objetivo: string;
    metodologiaSugerida: string;
    isDreamInspired: boolean;
}

export interface Verdict {
    estado: 'OK' | 'ADVERTENCIA' | 'ERROR';
    mensaje: string;
}

export interface StyleDefinition {
  id_style: string;
  style: string;
  description: string;
  category: string;
  categoryName: string;
  sensacion_atmosfera: [string, string];
  color_palette?: {
    dominant: string[];
    accent: string[];
  };
  artist_inspiration?: string[];
  keywords?: string[];
  video_presets?: Record<string, any>;
  pep_config?: any;
}

export interface ClassifiedStyleGroup {
  id: string;
  category: string;
  styles: string[];
}

export interface SensationCategory {
  id: string;
  name: string;
  narrativePurpose: string;
}

export type View = 'creator' | 'library' | 'pro' | 'academia' | 'editor' | 'gallery' | 'pro-layouts' | 'tasks' | 'pyrolysis-hub' | 'comparative-lab' | 'knowledge-base' | 'unit-converter' | 'process-optimizer' | 'property-visualizer' | 'energy-balance' | 'user-guide' | 'game' | 'experiment-designer' | 'titans-atrium' | 'hmi-control-room' | 'hyperion-9' | 'assay-manager' | 'aegis-9' | 'phoenix' | 'vulcano' | 'bioeconomy-lab' | 'chronos' | 'agriDeFi' | 'gaia-lab' | 'innovation-forge' | 'kairos-panel' | 'cogeneration-simulator' | 'fleet-simulator' | 'catalyst-lab' | 'utilities-simulator' | 'generative-simulator' | 'circular-fleet' | 'energy-explorer';
export type SystemCategory = 'Creación' | 'Inspiración' | 'Simulación Industrial' | 'Análisis Estratégico' | 'Análisis y Datos' | 'Sistema' | 'Finanzas Descentralizadas';
export interface SystemElement {
  id: View;
  nameKey: string;
  icon: React.ReactNode;
  type: SystemCategory;
}

export interface InspirationItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  formData: Partial<FormData>;
}

export interface PepPreset {
  type: string;
  category: string;
  action: string;
  technical_output: string;
  style_reference_suggestion?: string;
}

export interface Preset {
  name: string;
  data: Partial<FormData>;
}

export type TaskStatus = 'Por Hacer' | 'En Progreso' | 'Completado';
export type EventType = 'ViabilityAnalysis' | 'VisualCampaign' | 'ExecutiveReport' | 'MarketOpportunityAnalysis' | 'ComparativeAnalysis' | 'Assay' | 'Resultado de Simulación' | 'LogisticsReport';

export interface SubTask {
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface AssayDetails {
    linkedMaterialId: number | null;
    objective: string;
    methodology: string;
    labResults: { name: string; content: string }[];
}

export interface Task {
    id: string;
    title: string;
    createdAt: number;
    dueDate?: number;
    status: TaskStatus;
    contentType: ContentType;
    formData: Partial<FormData>;
    isIntelligent?: boolean;
    agentId?: string;
    eventType?: EventType;
    subTasks?: SubTask[];
    latitude?: number;
    longitude?: number;
    videoUrl?: string;
    result?: { text: string };
    zone?: 'Sólida' | 'Líquida' | 'Gaseosa';
    stateLabel?: string;
    originSource?: 'Concilio' | 'Prometeo' | 'user';
    activeAgent?: string;
    assayDetails?: AssayDetails;
}

export interface MapClickPayload {
    lat: number;
    lng: number;
}

export interface CorporateEntity {
  EntityID: string;
  EntityName: string;
  EntityType: string;
  HeadquartersCountry: string;
  WikiURL: string;
  OwnershipPercentage?: number; // As per data structure in corporateDataService
  Subsidiaries: CorporateEntity[];
  Assets: Asset[];
}

export interface Asset {
  AssetID?: string;
  PlantID?: string;
  AssetName?: string;
  PlantName?: string;
  Country: string;
  Status: string;
  Capacity: number;
  CapacityUnit: string;
  OwnershipPercentage: number;
  AssetType: string;
}

export type Board = (number | null)[][];
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CoPreset {
    name: string;
    initialTemp?: number;
    targetTemp: number;
    residenceTime: number;
    flowN2: number;
    agentMode: string;
    cinematicDescription: string;
}

export interface CharacterProfile {
  claveName: string;
  archetype: string;
  physicalAppearance: string;
  emotionalPersonality: string;
  relationalState: string;
  linkedIn: {
    name: string;
    title: string;
    about: string;
    skills: string[];
  };
  mantra: string;
  imagePrompt: string;
  system_prompt: string;
  audio: {
    description: string;
    voice: string;
    soundDesign: string;
  };
  video: {
    description: string;
  };
  code: {
    description: string;
    language: string;
    snippet: string;
  };
  subjectiveProfile: {
    carta_astral: string[];
    codigo_etico: string;
    diario_de_sueños?: { type: string, content: string, timestamp: number }[];
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  file?: {
    name: string;
    type: string;
    data: string;
  };
}

export type LayoutBlockId = 'image' | 'data' | 'fcn' | 'prompt' | 'title' | 'video' | 'history';

export interface LayoutItem {
  id: LayoutBlockId;
  className?: string;
  span?: number;
}

export interface LayoutStructure {
  type: 'flex' | 'grid';
  direction?: 'row' | 'col';
  columns?: number;
  gap?: number;
  className?: string;
  items: (LayoutStructure | LayoutItem)[];
}

export interface ProLayout {
  id: string;
  title: string;
  rationale: string;
  category: 'visual' | 'text_code';
  structure: LayoutStructure;
}

export interface GenerationHistory {
  appliedSolution: AgentSolution;
}

export interface Marker {
  lat: number;
  lng: number;
  popupText: string;
}

export interface Feedstock {
  name: string;
  type: string;
  composition: {
    carbon: number;
    hydrogen: number;
    oxygen: number;
    cellulose?: number;
    hemicellulose?: number;
    lignin?: number;
  };
}

export interface BiomassPyrolysisMode {
  id: string;
  nombre: string;
  condiciones_tipicas: { temperatura_C: string; tasa_calentamiento: string; tiempo_residencia: string };
  rendimiento_base_porcentaje: { liquido: number; solido: number; gas: number };
  analisis_ia: string;
}

export interface Catalyst {
  id: string;
  nombre: string;
  descripcion: string;
  aplicable_a: string[];
  efecto_simulado: {
    modificador_condiciones: string;
    modificador_rendimiento: { liquido: string; solido: string; gas: string };
    mejora_calidad_liquido: string;
    mejora_calidad_gas: string;
  };
}

export interface HeatSource {
  id: string;
  nombre: string;
  descripcion: string;
  efecto_simulado: HeatSourceEffect;
}
export interface SimulationKPIs {
    coste_bio_aceite: number;
    eficiencia_carbono: number;
    eficiencia_energetica: number;
    emisiones_netas: number;
}
export interface HeatSourceEffect {
    kpis: SimulationKPIs;
    analisis_ia: string;
    carbon_balance?: Record<string, number>;
    sensitivity_analysis?: { parameter: string, impact_factor: number }[];
}

export interface GasPhaseComposition {
  H2: number;
  CO: number;
  CO2: number;
  CH4: number;
  C2_C4: number;
  N2: number;
}
export interface PlasticPyrolysisMode {
    id: string;
    nombre: string;
    condiciones_tipicas: { temperatura_C: string };
    rendimiento_base_porcentaje: { liquido: number; solido: number; gas: number, ceras?: number };
    analisis_ia: string;
}

export interface SimulationInsights {
    key_findings: string[];
    recommendations: string[];
    sensitivity_analysis: string;
}

export interface SimulationEngine {
  biomass_pyrolysis_modes: BiomassPyrolysisMode[];
  plastic_pyrolysis_modes: PlasticPyrolysisMode[];
  catalysts: Catalyst[];
  heat_sources: HeatSource[];
  biomass_materials: number[];
  plastic_materials: number[];
}

export interface SimulationFormData {
  simulationMode: 'simple' | 'avanzado' | 'extremo';
  composition: { celulosa: number; hemicelulosa: number; lignina: number };
  simpleCatalystId: string | null;
  mixture: { materialId: number; percentage: number }[];
  advancedCatalystId: string | null;
  selectedBiomassModeId: string;
  selectedHeatSourceId: string;
  sensitivityChange: number;
  temperatura: number;
  tiempoResidencia: number;
  oxigeno: number;
}

export interface PlantModel {
  capacityGallonsPerYear: number;
  ethanolFlowGallonsPerHour: number;
  electricalDemandKW: number;
  thermalDemandKJPerHour: number;
  fuelConsumptionTonsPerDay: number;
}

export interface SimulationResult {
    simulatedYield: { liquido: number; solido: number; gas: number; ceras?: number } | null;
    kpis: SimulationKPIs | null;
    qualityInsights: string[];
    aiAnalysis: string;
    carbonBalance: Record<string, number> | null;
    gasComposition: GasPhaseComposition | null;
    simulationInsights: SimulationInsights | null;
    effectiveMaterial?: PyrolysisMaterial;
    plantModel: PlantModel | null;
}

export interface ArgusModel {
    datasetSize: number;
    precision: number;
    falsePositiveRate: number;
}

export type ReactorStatus = 'Inactivo' | 'Arrancando' | 'Estable' | 'Enfriando' | 'Alerta';
export type OrionViewType = 'thermal' | 'production' | 'security' | 'maintenance' | 'agents' | 'camera';
export type AgentMode = 'Manual' | 'Automático (PID)' | 'Auto-Optimización (IA)' | 'Solo Monitoreo';

export interface ReactorState {
    id: string;
    status: ReactorStatus;
    feedstock: string;
    feedstockType: string;
    agentMode: AgentMode;
    temperature: number;
    targetTemp: number;
    pressure: number;
    feedRate: number;
    bioOilOutput: number;
    emergencyStop: 'ARMADO' | 'DESARMADO';
    o2Level: number;
    pelletPurity: number;
    pelletMoisture: number;
    efficiencyFactor: number;
}

export type HMIStatus = 'APAGADO' | 'CALENTANDO' | 'ESTABLE' | 'ENFRIANDO';

export interface HMIState {
  targetTemp: number;
  residenceTime: number;
  oxygenConcentration: number;
  agentMode: string;
  systemMode: HMIStatus; // Reemplazado por HMIStatus
  reactorTemp: number;
  reactorWallTemp: number;
  reactorPressure: number;
  pyrometerCoreTemp: number;
  thermocoupleCoreTemp: number;
  energyConsumption: number;
  feedRate: number;
  vaporFlow: number;
  n2Flow: number;
  n2Pressure: number;
  biomassFeederRpm: number;
  biomassFeederState: boolean;
  biomassHopperLevel: number;
  bioOilTankLevel: number;
  aqueousPhaseTankLevel: number;
  condenserState: string;
  condensateFlow: number;
  condenserTemp: number;
  coolingPower: number;
  dischargeSystemState: string;
  dischargeValve: string;
  dischargeRate: number;
  coolerState: string;
  biocharTemp: number;
  coolingWaterFlow: number;
  biocharContainerLevel: number;
  biocharTempCooler: number;
  catalystSystemState: string;
  selectedCatalyst: string;
  catalystDoseTarget: number;
  catalystDoseActual: number;
  catalystFeederRpm: number;
  catalystDoseValve: string;
  catalystHopperLevel: number;
  co: number;
  co2: number;
  h2: number;
  ch4: number;
  safetySystem: string;
  ambientO2: number;
  inertGasPurge: string;
  refrigerationSystemState: string;
  coolantTempIn: number;
  coolantTempOut: number;
  coolantPressure: number;
  chillerPower: number;
  refrigerationPumpState: string;
  groundingStatus: 'OK' | 'FALLO';
  insulationIntegrity: number;
}

export interface Alarm {
    id: string;
    timestamp: number;
    type: string;
    message: string;
    level: 'med' | 'high' | 'crit';
    acknowledged: boolean;
}

export interface AlarmConfig {
    enabled: boolean;
    med: number;
    high: number;
    crit: number;
    medSound: string;
    highSound: string;
    critSound: string;
}

export interface KnowledgeBaseData {
    id: string;
    studyTitle: string;
    summary: string;
    sensitivity: string;
    regulations?: string[];
    massBalance?: {
        title: string;
        unit: string;
        inputs: { name: string; value: number }[];
        outputs: { name: string; value: number }[];
        notes: string;
    };
    customContent?: React.ReactNode;
}

export type WasteComposition = {
  biomasaOrganica: number;
  plasticosDeseados: number;
  plasticosContaminantes: number;
  metales: number;
  inertes: number;
};

export type ArgusKpis = {
  tasaClasificacion: number;
  purezaOrganico: number;
  eficienciaDeteccion: number;
};

export type MachineStatus = 'OK' | 'ATASCO' | 'SOBRECALENTAMIENTO';

export interface PhoenixState {
    isRunning: boolean;
    wasteComposition: WasteComposition;
    argusKpis: ArgusKpis;
    continuousLearning: boolean;
    trituradorasStatus: MachineStatus;
    secadorStatus: MachineStatus;
    pelletProduction: number; // kg/h
    pelletQuality: {
        purity: number; // %
        moisture: number; // %
    };
    pelletSiloLevel: number; // kg
}

export interface AegisEvent {
    id: string;
    timestamp: number;
    sector: string;
    type: 'Seguridad' | 'Mecánica' | 'Incendio' | 'Vigilancia';
    level: 'Info' | 'Advertencia' | 'Alerta' | 'Vigilancia';
    message: string;
}

export interface AegisState {
    ncsLevel: 1 | 2 | 3 | 4 | 5;
    activeSector: string;
    events: AegisEvent[];
    directorDirective: string | null;
}

export type VulcanoMachineStatus = 'OK' | 'ATASCO' | 'APAGADO';

export interface VulcanoState {
    isRunning: boolean;
    inputTonsPerDay: number;
    storageLevelTons: number; // Current inventory of used tires
    fireRisk: number; // 0-100
    sanitaryRisk: number; // 0-100
    machines: {
        debeader: VulcanoMachineStatus;
        primaryShredder: VulcanoMachineStatus;
        rasperMill: VulcanoMachineStatus;
        granulators: VulcanoMachineStatus;
        magneticSeparators: VulcanoMachineStatus;
        textileClassifiers: VulcanoMachineStatus;
    };
    processingRateTiresPerHour: number;
    outputPurity: {
        gcr: number;
        steel: number;
        fiber: number;
    };
    productionRateKgPerHour: {
        gcr: number;
        steel: number;
        fiber: number;
    };
    siloLevelsKg: {
        gcr: number;
        steel: number;
        fiber: number;
    };
}

// --- Gaia Module Types ---
export interface GaiaLabState {
    isNewBatchReady: boolean;
    sampleId: string | null;
    analysisResults: {
        carbon: number;
        ph: number;
        porosity: number;
        ash: number;
    } | null;
    quality: 'PREMIUM' | 'ESTÁNDAR' | null;
}

// --- Chronos Module Types ---
export interface AssetOriginState {
    assetType: string;
    estimatedVolume: number;
    marketValue: number;
    liquidationDate: string;
    status: 'PENDING' | 'VERIFYING' | 'VERIFIED';
}

export interface TokenizableAsset extends AssetOriginState {
    id: string;
    category: 'Commodity' | 'CarbonCredit';
    tokenName: string;
    nominalValue: number;
}

export interface TokenStructureState {
    rights: string;
    tokenName: string;
    nominalValue: number;
    totalSupply: number;
}

export interface IssuanceState {
    contractStatus: 'UNDEPLOYED' | 'DEPLOYED';
    tokenStatus: 'UNMINTED' | 'MINTED';
    contractAddress: string | null;
    events: string[];
}

export interface STOState {
    assetId: string | null;
    investors: { id: number; amount: number }[];
    fundsRaised: number;

    target: number;
    status: 'PREPARING' | 'ACTIVE' | 'COMPLETED';
}

export interface DEXListing {
    tokenName: string;
    price: number;
    change24h: number;
}

export interface ChronosState {
    phase: 1 | 2 | 3 | 4 | 5;
    assetOrigin: AssetOriginState;
    tokenStructure: TokenStructureState;
    liquidation: {
        status: 'PENDING' | 'EXECUTED';
        salePrice: number | null;
        profitPercentage: number | null;
    };
    secondaryAssets: TokenizableAsset[];
}

export type GroupKey = 'A' | 'B' | 'C';
export type GroupData = { preset: CoPreset | null; reactors: string[] };

export interface PerformanceProfile {
  temperature_range_c: string;
  yield_biochar_percent: number;
  yield_pyro_oil_percent: number;
  yield_pyro_gas_percent: number;
}

export interface PyrolysisPlantData {
  id: string;
  model_name: string;
  capacity_kg_h: number;
  technology: string;
  input_feedstock: string[];
  performance: {
    low_temp_pyrolysis: PerformanceProfile;
    medium_temp_pyrolysis: PerformanceProfile;
    high_temp_pyrolysis: PerformanceProfile;
  };
}

export type FleetModuleStatus = 'Inactivo' | 'Operando' | 'En Espera' | 'Falla';

export interface FleetModule {
    id: string;
    presetId: string;
    status: FleetModuleStatus;
    results: {
        bioOil: number;
        biochar: number;
        gas: number;
        energyConsumption: number; // in kW
        temperature: number;
        pressure: number;
    } | null;
}

export interface FleetSimulationResult {
    totalBioOil_kg_h: number;
    totalBiochar_kg_h: number;
    totalGas_kg_h: number;
    totalEnergy_kW: number;
    generalStatus: string;
}

export interface SynthesizedCatalyst {
  name: string;
  // Synthesis params
  siAlRatio: number;
  templateType: 'Orgánico (TPAOH)' | 'Inorgánico (Na+)' | 'Sin Plantilla';
  crystallizationTime: number; // Renamed from synthesisTime
  calcinationTemp: number;
  // Simulated properties
  properties: {
    acidity: number; // 0-100 scale
    thermalStability: number; // 0-100 scale
    cokeResistance: number; // 0-100 scale
    shapeSelectivity: 'Alta' | 'Media' | 'Baja';
    microporeVolume: number; // cm³/g
    mesoporeVolume: number; // cm³/g
    crystalSize: number; // nm
  };
  frameworkType: 'AEL' | 'AST' | 'MFI' | null;
}

export interface UtilityCostState {
  steamHpPrice: number;
  steamMpPrice: number;
  steamLpPrice: number;
  refrigerationPriceKwhCooling: number;
  coolingWaterPriceM3: number;
  compressedAirPriceKwh: number;
  firedHeatPriceMMBtu: number;
  gridElectricityPrice: number;
  biogasPrice_m3: number;
}

export type UtilityDutyType = 'fired-heat' | 'refrigeration' | 'cooling-water' | 'compressed-air' | 'process-power' | 'fleet-fuel';

export interface UtilityWidgetState {
    isOpen: boolean;
    duty: number | null;
    dutyType: UtilityDutyType | null;
    unit: string | null;
}

// --- Circular Fleet Module Types ---
export type VehicleTechnology = 'Eléctrico' | 'Gas Natural/Biogás' | 'Híbrido';
export type VehicleStatus = 'En Ruta' | 'Recargando' | 'En Pausa';

export interface Vehicle {
  id: string;
  tech: VehicleTechnology;
  model: string;
  status: VehicleStatus;
  fuelLevel: number; // 0-100
  kpis: {
    distance: number; // km
    wasteCollected: number; // ton
    operatingHours: number;
  };
}

export interface FleetVehicleOption {
  tech: VehicleTechnology;
  manufacturer: string;
  model: string;
  country?: string;
  consumptionRate_m3_h?: number; // for gas trucks
  consumptionRate_percent_h?: number; // unified consumption in % per hour
  chargeRate_percent_h?: number; // for electric
  refuelRate_percent_h?: number; // for gas, to simulate fast refueling
  fuelCapacity_m3_or_kwh?: number;
}