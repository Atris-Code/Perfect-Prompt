import { GoogleGenAI, Type, Modality, Chat, GenerateContentResponse } from "@google/genai";
// FIX: Changed import of 'VideoPreset' from '../data/videoPresets' to '../types' to resolve export errors.
// FIX: To ensure consistent module resolution, removed the .ts extension from the import path.
import { ContentType, Verdict } from '../types';
// FIX: Changed import of 'VideoPreset' from '../data/videoPresets' to '../types' to resolve export errors.
// FIX: Added SynthesizedCatalyst to type imports
// FIX: To ensure consistent module resolution, removed the .ts extension from the import path.
import type { FormData, NarrativeConsistencyFeedback, TextualNarrativeCoherence, AgentSolution, GeoContextualData, DirectorAnalysis, PyrolysisMaterial, SolidMaterial, OracleRecommendation, OptimizationResult, ExperimentResultPoint, ExperimentConfig, AudiovisualScene, NarrativeBrief, VideoPreset, ProFormData, AssaySuggestion, GasProposal, SynthesizedCatalyst } from '../types';
// FIX: Removed .ts extension for consistent module resolution.
import { ALL_VIDEO_PRESETS } from "../data/videoPresets";
// FIX: Removed .ts extension for consistent module resolution.
import { AGENTS_CODEX } from "../data/agentsCodex";

export { Chat };

const handleGeminiError = (error: unknown, action: string): Error => {
  console.error(`Error durante la acción de "${action}":`, error);

  if (error instanceof SyntaxError) {
    return new Error("La respuesta de la IA no es un JSON válido. Por favor, intenta de nuevo o ajusta tu solicitud.");
  }
  
  if (error instanceof Error) {
    const message = error.message;
    if (message.includes('API key not valid') || message.includes('API_KEY_INVALID') || message.includes('401')) {
      return new Error("Tu clave de API de Gemini no es válida o no tiene los permisos necesarios (Error 401).");
    }
    if (message.includes('429')) {
      return new Error(`Has excedido tu cuota de solicitudes para ${action} (Error 429). Por favor, espera un momento antes de intentarlo de nuevo.`);
    }
    if (message.includes('400')) {
      return new Error(`La solicitud para ${action} es incorrecta (Error 400). Esto puede deberse a contenido no permitido o a un formato inesperado.`);
    }
    if (message.includes('500') || message.includes('503')) {
      return new Error(`El servicio de IA está experimentando un problema temporal (Error 500 o 503). Por favor, inténtalo de nuevo más tarde.`);
    }
    if (message.toLowerCase().includes('fetch')) {
       return new Error(`Error de red durante la acción de "${action}". Por favor, comprueba tu conexión a internet e inténtalo de nuevo.`);
    }
  }

  return new Error(`No se pudo ${action}. Ocurrió un error inesperado.`);
};

export async function generateDensificationVisualPrompt(moisture: number): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `Eres un director de arte experto en crear prompts visuales para IA generativa. Tu tono es técnico y conceptual, como un ingeniero.`;
        
        const userPrompt = `Genera un prompt de imagen para visualizar la ineficiencia de una Planta de Densificación de biomasa. 
        El objetivo es crear una metáfora visual impactante que muestre la cantidad de energía eléctrica desperdiciada al procesar biomasa con más del ${moisture}% de humedad.
        El prompt debe ser detallado, cinematográfico y apto para un generador de imágenes como Midjourney o DALL-E 3.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction,
            }
        });
        
        return response.text;
    } catch (error) {
        throw handleGeminiError(error, 'generar prompt visual de densificación');
    }
}

export async function extractMaterialFromDocument(documentText: string): Promise<SolidMaterial> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `Eres un asistente de investigación experto en ingeniería química y ciencia de materiales. Tu tarea es leer un documento científico sobre pirólisis y extraer los datos de un material de biomasa para estructurarlos en un formato JSON preciso. Si un valor no se encuentra, utiliza 'null'. NO inventes valores. Interpreta el texto para llenar los campos de la forma más precisa posible. El resultado debe ser solo el objeto JSON.`;

        const userPrompt = `
        Analiza el siguiente texto y extrae las propiedades de la materia prima principal descrita para un proceso de pirólisis. Genera un objeto JSON que siga el schema 'SolidMaterial'.

        Texto del Documento:
        ---
        ${documentText.substring(0, 15000)} 
        ---
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using Pro for better accuracy on complex documents
            contents: userPrompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.NUMBER, description: "Un ID temporal, usa la fecha actual como timestamp." },
                        fase: { type: Type.STRING, description: "Siempre debe ser 'Sólido' para este caso." },
                        nombre: { type: Type.STRING, description: "El nombre del material, ej. 'Neumáticos Fuera de Uso (NFU)'." },
                        categoria: { type: Type.STRING, description: "La categoría del material, ej. 'Residuos Sólidos Urbanos'." },
                        propiedades: {
                            type: Type.OBJECT,
                            properties: {
                                composicion: {
                                    type: Type.OBJECT,
                                    properties: {
                                        celulosa: { type: Type.NUMBER, nullable: true },
                                        hemicelulosa: { type: Type.NUMBER, nullable: true },
                                        lignina: { type: Type.NUMBER, nullable: true },
                                    }
                                },
                                analisisElemental: {
                                    type: Type.OBJECT,
                                    properties: {
                                        carbono: { type: Type.NUMBER },
                                        hidrogeno: { type: Type.NUMBER },
                                        oxigeno: { type: Type.NUMBER },
                                        nitrogeno: { type: Type.NUMBER },
                                        azufre: { type: Type.NUMBER },
                                    },
                                    required: ['carbono', 'hidrogeno', 'oxigeno', 'nitrogeno', 'azufre']
                                },
                                analisisInmediato: {
                                    type: Type.OBJECT,
                                    properties: {
                                        humedad: { type: Type.NUMBER },
                                        cenizas: { type: Type.NUMBER },
                                        materiaVolatil: { type: Type.NUMBER },
                                        carbonoFijo: { type: Type.NUMBER },
                                    },
                                    required: ['humedad', 'cenizas', 'materiaVolatil', 'carbonoFijo']
                                },
                                poderCalorificoSuperior: { type: Type.NUMBER },
                            },
                            required: ['composicion', 'analisisElemental', 'analisisInmediato', 'poderCalorificoSuperior']
                        }
                    },
                    required: ['id', 'fase', 'nombre', 'categoria', 'propiedades']
                }
            }
        });

        const jsonText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(jsonText);
        // Ensure ID is unique
        parsed.id = Date.now();
        return parsed as SolidMaterial;

    } catch (error) {
        throw handleGeminiError(error, 'extraer material del documento');
    }
}

export async function generateViabilityReport(data: {
    projectName: string;
    assetValue: number;
    capitalToRaise: number;
    vpn: number;
    tir: number;
    payback: number;
    assetDetails: string;
}): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `Eres un equipo de agentes de IA. Kairos es el estratega financiero, Synthia Pro es la redactora. Vuestra misión es generar un reporte de viabilidad para un proyecto de tokenización en un formato profesional de Markdown. Sé conciso y directo.`;

        const userPrompt = `
        Genera un "[REPORTE] Viabilidad de Nuevo Activo" en formato Markdown con la siguiente estructura y datos:

        **Datos Clave del Proyecto:**
        - **Nombre del Activo:** ${data.projectName}
        - **Valor de Mercado del Activo:** ${data.assetValue.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
        - **Capital a Recaudar (Inversión Inicial):** ${data.capitalToRaise.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
        - **Coste de Capital de Referencia:** 12%

        **Proyección Financiera Calculada:**
        - **VPN:** ${data.vpn.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
        - **TIR:** ${data.tir.toFixed(2)}%
        - **Payback:** ${data.payback.toFixed(2)} años

        **--- INICIO DEL REPORTE ---**

        ### 1. Resumen Ejecutivo
        *Genera un veredicto principal (Recomendado / No Recomendado) basado en si la TIR del ${data.tir.toFixed(2)}% supera el coste de capital del 12%. Presenta los KPIs clave de forma concisa.*

        ### 2. Análisis del Activo
        *Genera una breve descripción del activo basado en: "${data.assetDetails}".*

        ### 3. Proyección Financiera
        *Presenta los KPIs (VPN, TIR, Payback) en una tabla Markdown simple.*

        ### 4. Análisis de Riesgos de Kairos
        *Genera un párrafo evaluando la TIR contra el coste de capital. Asume un sentimiento de mercado "moderado pero optimista" para este tipo de activo agrícola.*

        ### 5. Veredicto del Concilio de Titanes
        *Genera una recomendación estratégica final y concisa para el Director, basada en todos los datos anteriores.*

        **--- FIN DEL REPORTE ---**
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: { systemInstruction }
        });
        
        return response.text.replace(/```markdown/g, '').replace(/```/g, '').trim();

    } catch (error) {
        throw handleGeminiError(error, 'generar reporte de viabilidad');
    }
}


export async function generateEnhancedPrompt(
    formData: FormData,
    contentType: ContentType,
    vgcData: GeoContextualData | null,
    options: { videoCreationMode?: string }
): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `Eres un asistente experto en "prompt engineering" para IAs generativas. Tu tarea es refinar y combinar las ideas del usuario en un prompt cohesivo y de alta calidad para el tipo de contenido especificado.`;
    let userInstruction = `Genera un prompt para ${contentType} con el siguiente objetivo: ${formData.objective}`;

    if (contentType === ContentType.Video) {
        const videoSpecifics = formData.specifics[ContentType.Video] || {};
        userInstruction = `
        Basado en los siguientes detalles, crea un prompt cinematográfico detallado y de un solo párrafo para una IA de generación de video. Combina todo en una narrativa fluida.

        - **Concepto Principal / Historia:** ${videoSpecifics.scriptSummary || formData.objective}
        - **Tono General:** ${formData.tone || 'No especificado'}
        - **Estilo(s) Artístico(s):** ${videoSpecifics.artisticStyle?.join(', ') || 'No especificado'}
        - **Movimiento de Cámara:** ${videoSpecifics.cameraMovement || 'No especificado'}
        - **Estilo Visual:** ${videoSpecifics.visualStyle || 'No especificado'}
        - **Efectos Visuales (VFX):** ${videoSpecifics.vfx || 'No especificado'}
        - **Entorno / Ambiente:** ${videoSpecifics.environment || 'No especificado'}
        - **Diseño de Sonido:** ${videoSpecifics.soundDesign || 'No especificado'}
        - **Música:** ${videoSpecifics.musicGenre || 'No especificado'}

        Ejemplo de Fusión: En lugar de listar "Estilo: Film Noir, Cámara: Estática", escribe "Una toma estática de estilo film noir de...". No enumeres los parámetros; intégralos en la descripción.
        `;
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userInstruction,
        config: {
            systemInstruction: systemInstruction,
        }
    });
    return response.text;

  } catch (error) {
    throw handleGeminiError(error, 'generar prompt mejorado');
  }
}

export async function generateImages(prompt: string, aspectRatio?: string): Promise<string[]> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 2,
                aspectRatio: aspectRatio === '16:9' ? '16:9' : aspectRatio === '9:16' ? '9:16' : '1:1',
            },
        });
        return response.generatedImages.map(img => img.image.imageBytes);
    } catch (error) {
        throw handleGeminiError(error, 'generar imágenes');
    }
}

export async function generateCinematicImage(prompt: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                aspectRatio: '16:9',
            },
        });
        if (response.generatedImages.length === 0) {
            throw new Error("La IA no generó ninguna imagen.");
        }
        return response.generatedImages[0].image.imageBytes;
    } catch (error) {
        throw handleGeminiError(error, 'generar imagen cinemática');
    }
}

export async function generateCinematicVideo(prompt: string, onProgress: (message: string, progress: number) => void): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        onProgress('hmi.cinematicView.videoStatus.generating', 10);
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
            }
        });

        onProgress('hmi.cinematicView.videoStatus.polling', 40);
        let checks = 0;
        const maxChecks = 12; // 12 * 10s = 2 minutes timeout

        while (!operation.done && checks < maxChecks) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
            checks++;
            onProgress('hmi.cinematicView.videoStatus.polling', 40 + (checks / maxChecks * 40));
        }

        if (!operation.done) {
            throw new Error("La generación de video excedió el tiempo límite.");
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) {
            throw new Error("No se encontró el enlace de descarga del video en la respuesta de la IA.");
        }

        onProgress('hmi.cinematicView.videoStatus.downloading', 90);
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!response.ok) {
            const errorText = await response.text();
            if (errorText.includes("Requested entity was not found")) {
                throw new Error("Requested entity was not found.");
            }
            throw new Error(`Error al descargar el video: ${response.statusText}`);
        }
        
        const videoBlob = await response.blob();
        
        onProgress('hmi.cinematicView.videoStatus.ready', 100);
        return URL.createObjectURL(videoBlob);

    } catch (error) {
        if (error instanceof Error && error.message.includes("Requested entity was not found")) {
            throw error;
        }
        throw handleGeminiError(error, 'generar video cinemático');
    }
}

export async function generateNarrativeConsistencyFeedback(formData: FormData, contentType: ContentType): Promise<NarrativeConsistencyFeedback> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Analiza la consistencia narrativa para un prompt de ${contentType} con el objetivo "${formData.objective}" y tono "${formData.tone}". Devuelve un JSON con 'stylisticCohesion' y 'emotionalIntensity', cada uno con 'score' (de -9 a 9) y 'analysis'.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text) as NarrativeConsistencyFeedback;
    } catch (error) {
        throw handleGeminiError(error, 'generar feedback de consistencia');
    }
}

export async function generateTextualCoherenceFeedback(formData: FormData): Promise<TextualNarrativeCoherence> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Analiza la coherencia textual para un prompt de texto con el objetivo "${formData.objective}". Devuelve un JSON con 'stylisticCohesion', 'narrativeArchitecture', y 'audienceTranslation', cada uno con 'score' (de -9 a 9) y 'analysis'.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text) as TextualNarrativeCoherence;
    } catch (error) {
        throw handleGeminiError(error, 'generar feedback de coherencia textual');
    }
}

export async function generateAgentSolutions(
    formData: FormData,
    contentType: ContentType,
    feedback: NarrativeConsistencyFeedback | TextualNarrativeCoherence,
    vgcData: GeoContextualData | null
): Promise<AgentSolution[]> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Basado en el siguiente feedback negativo, genera un array de soluciones en formato JSON. Cada solución debe tener 'agent', 'correctionType', 'description', y 'changes' (un objeto con los campos de FormData a cambiar). Feedback: ${JSON.stringify(feedback)}`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });
    return JSON.parse(response.text) as AgentSolution[];
  } catch (error) {
    throw handleGeminiError(error, 'generar soluciones de agente');
  }
}

export async function validateGeoContext(location: string): Promise<GeoContextualData> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Valida la localización: "${location}". Determina si es 'FACTUAL' o 'CONTEXTUAL'. Devuelve un JSON con 'validationMode' y los campos correspondientes.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text) as GeoContextualData;
    } catch (error) {
        throw handleGeminiError(error, 'validar geo-contexto');
    }
}

export async function analyzeInspirationWall(images: { data: string; mimeType: string }[]): Promise<any> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const imageParts = images.map(image => ({
            inlineData: {
                data: image.data,
                mimeType: image.mimeType,
            },
        }));
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [...imageParts, { text: "Analiza estas imágenes y sugiere 'elements', 'lighting', 'colorPalette', 'visualStyle' y 'tone' en formato JSON." }] },
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        throw handleGeminiError(error, 'analizar muro de inspiración');
    }
}

export async function generateScriptFromImageAnalysis(analysis: any): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `Eres un director de fotografía y un guionista experto. Tu tarea es traducir un análisis visual en un prompt de video cinematográfico y evocador.`;
        
        const userPrompt = `
        Basado en el siguiente análisis de un muro de inspiración, fusiona todos los elementos en un único párrafo descriptivo. Este párrafo servirá como prompt inicial para una IA de generación de video. Sé poético y visual, no listes los elementos, intégralos en una narrativa fluida.

        Análisis Visual:
        - Elementos Principales: ${analysis.elements || 'no especificado'}
        - Iluminación: ${analysis.lighting || 'no especificado'}
        - Paleta de Colores: ${analysis.colorPalette || 'no especificado'}
        - Estilo Visual: ${analysis.visualStyle || 'no especificado'}
        - Tono General: ${analysis.tone || 'no especificado'}

        Crea un prompt que capture la esencia de estas imágenes.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction,
            }
        });

        return response.text;
    } catch (error) {
        throw handleGeminiError(error, 'generar guion desde análisis de imagen');
    }
}

export async function analyzeFullSequenceNarrative(sequence: AudiovisualScene[]): Promise<NarrativeBrief> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const scriptSummary = sequence.map((scene, index) => `
            ---
            Escena ${index + 1}: ${scene.sceneTitle}
            Duración: ${scene.duration}s
            Narración: ${scene.narration}
            Descripción Visual: ${scene.visualPromptFreeText}
            ---
        `).join('\n');

        const prompt = `
            Eres un director de cine experto y un estratega narrativo. Analiza la siguiente secuencia de escenas de un guion de video. Tu objetivo es entender el flujo narrativo y emocional completo para poder guiar las decisiones estilísticas.

            Guion Completo:
            ${scriptSummary}

            Basado en el guion completo, proporciona un "brief de dirección" en formato JSON. Este brief debe contener las siguientes claves:
            - "overallTone": (string) El tono general de la pieza (Ej: "Melancólico y reflexivo", "Enérgico y optimista", "Tenso y de suspense").
            - "emotionalArc": (string) Describe el arco emocional a lo largo de las escenas (Ej: "Comienza con calma, aumenta la tensión hasta un clímax y termina con una resolución esperanzadora").
            - "visualProgression": (string) Sugiere una progresión visual (Ej: "Empezar con planos amplios y luminosos, transicionar a primeros planos más oscuros y claustrofóbicos a medida que aumenta el drama").
            - "soundProgression": (string) Sugiere una progresión en el diseño de sonido (Ej: "Iniciar con sonidos ambientales minimalistas, introducir un piano melancólico y construir hasta un score orquestal completo en el clímax").
            - "directorsNote": (string) Una nota concisa del director que resuma la visión artística general para guiar al equipo.

            Responde únicamente con el objeto JSON.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        const jsonText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonText) as NarrativeBrief;

    } catch (error) {
        throw handleGeminiError(error, 'analizar la narrativa de la secuencia completa');
    }
}

export async function analyzeSceneForSuggestions(
    narration: string, 
    visualPromptFreeText: string,
    narrativeBrief?: NarrativeBrief 
): Promise<{ soundDesign: string; visualPromptPreset: string }> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const visualPresets = ALL_VIDEO_PRESETS
            .filter(p => p.category === 'Estilos Visuales y Fílmicos' || p.category === 'Entornos y Atmósferas' || p.category === 'Lenguaje de la Cámara (Movimientos y Ángulos)')
            .map(p => p.preset_name)
            .join(', ');
            
        const soundPresets = ALL_VIDEO_PRESETS
            .filter(p => p.category === 'Diseño de Sonido' || p.category === 'Música para Score Emocional')
            .map(p => p.preset_name)
            .join(', ');

        const narrativeContext = narrativeBrief ? `
            CONTEXTO NARRATIVO GENERAL (Brief del Director):
            - Tono General: ${narrativeBrief.overallTone}
            - Arco Emocional: ${narrativeBrief.emotionalArc}
            - Progresión Visual Sugerida: ${narrativeBrief.visualProgression}
            - Progresión Sonora Sugerida: ${narrativeBrief.soundProgression}
            - Nota del Director: ${narrativeBrief.directorsNote}

            Usa este contexto para asegurar que tus sugerencias para esta escena específica encajen en la visión global de la película.
        ` : '';

        const prompt = `
            Eres un asistente de dirección cinematográfica experto. Tu tarea es analizar una escena específica de un guion y sugerir las mejores opciones de estilo visual y diseño de sonido para potenciar la narrativa, considerando el contexto general de la historia.
            
            ${narrativeContext}

            ESCENA ESPECÍFICA A ANALIZAR:
            - Narración: "${narration}"
            - Descripción Visual Inicial: "${visualPromptFreeText}"

            OPCIONES DISPONIBLES:
            - Presets Visuales: ${visualPresets}
            - Diseños de Sonido: ${soundPresets}

            Basado en el tono, la emoción y el contenido de ESTA ESCENA ESPECÍFICA, y cómo se alinea con el CONTEXTO NARRATIVO GENERAL, elige el MEJOR 'visualPromptPreset' y el MEJOR 'soundDesign' de las listas proporcionadas. Tu respuesta debe ser únicamente un objeto JSON con las claves "visualPromptPreset" y "soundDesign". No incluyas explicaciones adicionales, solo el JSON.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        const jsonText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonText);
    } catch (error) {
        throw handleGeminiError(error, 'analizar escena para sugerencias');
    }
}

export async function generateAcademyDemonstration(action: string, selectedPreset: VideoPreset): Promise<DirectorAnalysis> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Genera un análisis de director para la acción "${action}" aplicando la técnica "${selectedPreset.preset_name}". Devuelve un JSON con la estructura de DirectorAnalysis.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text) as DirectorAnalysis;
    } catch (error) {
        throw handleGeminiError(error, 'generar demostración de academia');
    }
}

export async function editImageWithPep(
    originImage: { data: string; mimeType: string },
    styleReference: string,
    action: string,
    technicalOutput: string,
    advancedControls: any
): Promise<{ imageData: string | null; text: string | null }> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const promptText = `Edita la imagen. Acción: ${action}. Salida técnica: ${technicalOutput}. Estilo de referencia: ${styleReference}. Controles avanzados: ${JSON.stringify(advancedControls)}.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: originImage.data.split(',')[1], mimeType: originImage.mimeType } },
                    { text: promptText },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        let imageData: string | null = null;
        let text: string | null = null;

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                imageData = part.inlineData.data;
            } else if (part.text) {
                text = part.text;
            }
        }
        return { imageData, text };
    } catch (error) {
        throw handleGeminiError(error, 'editar imagen con PEP');
    }
}

export async function generateMaterialVisual(material: PyrolysisMaterial, aiCriteria: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Genera una representación visual fotorrealista de "${material.nombre}" (${material.categoria}). Criterios adicionales: ${aiCriteria}`;
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
        });
        return response.generatedImages[0].image.imageBytes;
    } catch (error) {
        throw handleGeminiError(error, 'generar visualización de material');
    }
}


export async function estimateThermalConductivity(material: SolidMaterial): Promise<{ conductivity: string; reasoning: string }> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Estima la conductividad térmica (W/m·K) para ${material.nombre} basado en su composición. Devuelve un JSON con 'conductivity' y 'reasoning'. Composición: ${JSON.stringify(material.propiedades)}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        throw handleGeminiError(error, 'estimar conductividad térmica');
    }
}

export async function getOracleRecommendation(materialName: string): Promise<OracleRecommendation> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Para la pirólisis de "${materialName}", recomienda el mejor catalizador. Devuelve un JSON con 'catalystName', 'justification' y 'citations'.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text) as OracleRecommendation;
    } catch (error) {
        throw handleGeminiError(error, 'obtener recomendación del oráculo');
    }
}


export async function optimizeProcess(material: PyrolysisMaterial, goal: string): Promise<OptimizationResult> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Optimiza el proceso de pirólisis para "${material.nombre}" con el objetivo de "${goal}". Devuelve un JSON con las condiciones óptimas: 'temperatura' (número en °C), 'tiempoResidencia' (número en segundos), 'oxigeno' (número en %) y 'justificacion' (texto).`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        temperatura: {
                            type: Type.NUMBER,
                            description: "Temperatura óptima en grados Celsius."
                        },
                        tiempoResidencia: {
                            type: Type.NUMBER,
                            description: "Tiempo de residencia óptimo en segundos."
                        },
                        oxigeno: {
                            type: Type.NUMBER,
                            description: "Concentración de oxígeno óptima en porcentaje."
                        },
                        justificacion: {
                            type: Type.STRING,
                            description: "Explicación de por qué estas condiciones son óptimas."
                        }
                    },
                    required: ["temperatura", "tiempoResidencia", "oxigeno", "justificacion"]
                }
            }
        });
        const result = JSON.parse(response.text);
        // Coerce to number to prevent runtime errors if the API returns a stringified number.
        return {
            temperatura: Number(result.temperatura),
            tiempoResidencia: Number(result.tiempoResidencia),
            oxigeno: Number(result.oxigeno),
            justificacion: result.justificacion,
        };
    } catch (error) {
        throw handleGeminiError(error, 'optimizar proceso');
    }
}

export async function getConcilioAnalysis(optimalPoint: ExperimentResultPoint, config: ExperimentConfig): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Realiza un análisis del "Concilio de Titanes" sobre el siguiente punto óptimo de un experimento. Config: ${JSON.stringify(config)}. Punto Óptimo: ${JSON.stringify(optimalPoint)}.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        throw handleGeminiError(error, 'obtener análisis del Concilio');
    }
}

export async function generateProPrompt(formData: ProFormData): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = `Eres un director de arte y un experto en "prompt engineering" para generadores de imágenes de IA. Tu tarea es traducir una ficha de dirección de arte detallada en un prompt cinematográfico, coherente y evocador. Combina los elementos técnicos y conceptuales en una narrativa visual fluida, no en una lista de parámetros. El resultado debe ser un único párrafo que un generador de imágenes como Midjourney o DALL-E pueda interpretar para crear una obra maestra.`;
    
    const userPrompt = `
    Traduce la siguiente dirección de arte en un prompt cinematográfico:

    - **Concepto Central:** ${formData.pro_concept || 'No especificado.'}
    - **Emoción a Evocar:** ${formData.pro_emotion || 'No especificada.'}
    - **Símbolos Clave:** ${formData.pro_symbolism || 'Ninguno.'}
    - **Composición:** ${formData.pro_composition_rule || 'No especificada.'}
    - **Color:** Teoría de ${formData.pro_color_theory || 'color no especificada'}, con una paleta específica de ${formData.pro_specific_palette || 'no definida'}.
    - **Óptica:** Lente de ${formData.pro_focal_length || 'distancia focal no especificada'}, velocidad de obturación de ${formData.pro_shutter_speed || 'no especificada'}, sensibilidad de ${formData.pro_iso || 'no especificada'}, y efectos de lente como ${formData.pro_lens_effects || 'ninguno'}.
    - **Acabado Final:** Estilo de post-producción ${formData.pro_post_production || 'no especificado'}.
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction: systemInstruction,
        }
    });
    return response.text;
  } catch (error) {
    throw handleGeminiError(error, 'generar prompt profesional');
  }
}

export async function getSolidModeSuggestions(materialName: string): Promise<AssaySuggestion> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const agentMood = "+15% Aversión al Riesgo";
        const prompt = `Como asistente de laboratorio experto (Concilio de Helena y Marco), para el material "${materialName}", sugiere 3 títulos de ensayo, 3 objetivos y 3 metodologías estándar. Además, dado que el "ánimo del día" de Marco es '${agentMood}', da un "consejoDelDia" relevante como el agente Marco.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        titulos: {
                            type: Type.ARRAY,
                            description: "Array de 3 títulos de ensayo estandarizados.",
                            items: { type: Type.STRING }
                        },
                        objetivos: {
                            type: Type.ARRAY,
                            description: "Array de 3 objetivos comunes para los ensayos.",
                            items: { type: Type.STRING }
                        },
                        metodologias: {
                            type: Type.ARRAY,
                            description: "Array de 3 metodologías estándar correspondientes.",
                            items: { type: Type.STRING }
                        },
                        consejoDelDia: {
                            type: Type.OBJECT,
                            description: "Un consejo del día del agente Marco, basado en su estado de ánimo.",
                            properties: {
                                agente: { type: Type.STRING, description: "El nombre del agente que da el consejo." },
                                mensaje: { type: Type.STRING, description: "El contenido del consejo." }
                            },
                            required: ['agente', 'mensaje']
                        }
                    },
                    required: ['titulos', 'objetivos', 'metodologias', 'consejoDelDia']
                }
            }
        });
        return JSON.parse(response.text) as AssaySuggestion;
    } catch (error) {
        throw handleGeminiError(error, 'generar sugerencias de Modo Sólido');
    }
}

export async function getGasModeProposals(userQuery: string): Promise<{ propuestas: GasProposal[] }> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Actúas como Prometeo, una IA creativa. Un usuario quiere "${userQuery}". Genera 3 propuestas de ensayos no convencionales. Una de las tres propuestas DEBE ser una "Inspiración Onírica".`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        propuestas: {
                            type: Type.ARRAY,
                            description: "Un array de 3 propuestas de ensayos no convencionales.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.INTEGER, description: "Un ID numérico único para la propuesta." },
                                    titulo: { type: Type.STRING, description: "El título creativo del ensayo." },
                                    objetivo: { type: Type.STRING, description: "El objetivo científico o conceptual del ensayo." },
                                    metodologiaSugerida: { type: Type.STRING, description: "Una descripción de la metodología no convencional a utilizar." },
                                    isDreamInspired: { type: Type.BOOLEAN, description: "Indica si la propuesta se originó a partir de una 'Inspiración Onírica'." },
                                },
                                required: ['id', 'titulo', 'objetivo', 'metodologiaSugerida', 'isDreamInspired']
                            }
                        }
                    },
                    required: ['propuestas']
                }
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        throw handleGeminiError(error, 'generar propuestas de Modo Gaseoso');
    }
}

export async function getLiquidModeVerdict(assayDetails: { objective: string, methodology: string }): Promise<Verdict> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const janus = AGENTS_CODEX.find(a => a.claveName === 'Janus, el Conciliador');
        if (!janus) throw new Error("Agente Janus no encontrado en el códice.");
        
        const prompt = `Actúas como Janus. Realiza una "Lectura Vertical". Compara el ensayo (Objetivo: "${assayDetails.objective}", Metodología: "${assayDetails.methodology}") con el código ético: "${janus.subjectiveProfile.codigo_etico}". Emite un veredicto en JSON con claves "estado" ('OK', 'ADVERTENCIA', o 'ERROR') y "mensaje". 
        - OK: si está alineado.
        - ADVERTENCIA: si hay una preocupación menor (ecológica, eficiencia) y sugiere una alternativa.
        - ERROR: si viola un principio de seguridad u operativo clave.
        Responde únicamente con el objeto JSON.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text) as Verdict;
    } catch (error) {
        throw handleGeminiError(error, 'generar veredicto de Modo Líquido');
    }
}

export async function getAiCatalystAnalysis(catalyst: SynthesizedCatalyst): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `Eres el Dr. Pirolis, un experto mundial en pirólisis catalítica con décadas de experiencia en diseño de catalizadores. Tu tono es autoritario, preciso y profundamente científico. Analiza el siguiente catalizador de zeolita sintetizado virtualmente y proporciona un veredicto en formato Markdown.

Tu análisis debe ser riguroso. DEBES citar la base de conocimiento interna (ej., MENGUAL_2010_CRACKING_THESIS, ZEOLITE_FRAMEWORK_AEL) para respaldar tus conclusiones, especialmente al discutir la selectividad de forma y los mecanismos de desactivación.

Tu análisis debe incluir:
1.  **Veredicto General:** Una frase concisa sobre su viabilidad.
2.  **Análisis de Propiedades:** Un desglose de cada propiedad (Acidez, Estabilidad, Porosidad, etc.). Explica la implicación de su **framework (${catalyst.frameworkType})** y su **dimensionalidad de canal** en la selectividad de forma, referenciando los datos de la base de conocimiento sobre AEL, AST o MFI.
3.  **Aplicación Recomendada:** Sugiere el mejor uso para este catalizador.
4.  **Riesgos y Consideraciones:** Advierte sobre posibles inconvenientes, citando mecanismos de desactivación relevantes de la base de conocimiento.`;

        const userPrompt = `
        Analiza el siguiente catalizador sintetizado:
        ---
        ${JSON.stringify(catalyst, null, 2)}
        ---
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction,
            }
        });

        return response.text.replace(/```markdown/g, '').replace(/```/g, '').trim();
    } catch (error) {
        throw handleGeminiError(error, 'analizar catalizador con IA');
    }
}

interface AssayContextPacket {
    titulo: string;
    tipoDeTarea: string;
    material: string;
    metodologia: string;
    resultados: Record<string, string>;
}

export async function generateNarrativeFields(context: AssayContextPacket): Promise<{
    objective: string;
    audience: string;
    conflictPoint: string;
    uvp: string;
}> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `Eres Janus, una IA experta en comunicación científica y estrategia. Tu tarea es tomar un paquete de datos de un ensayo de laboratorio y traducirlo en los componentes clave para un documento de comunicación. Responde únicamente con un objeto JSON.`;

        const prompt = `
        Basado en el siguiente "Paquete de Contexto del Ensayo", genera los campos para un "Creador de Prompt".

        Paquete de Contexto:
        - Título: "${context.titulo}"
        - Tipo de Tarea: "${context.tipoDeTarea}"
        - Material: "${context.material}"
        - Metodología: "${context.metodologia}"
        - Resultados Clave: ${JSON.stringify(context.resultados)}

        Genera el siguiente contenido:
        1.  **objective**: Un "Objetivo Principal" para el documento. Debe ser una frase clara que combine el título y la metodología para explicar el propósito del comunicado. Ejemplo: "Comunicar de forma clara y precisa los resultados del análisis de composición de la Paja de Trigo mediante el Método Van Soest."
        2.  **audience**: El "Público Objetivo" más lógico para este tipo de informe técnico. Infiérelo del tipo de tarea. Ejemplo para "Análisis Composicional": "Equipo de Ingeniería / I+D".
        3.  **conflictPoint**: Un "Punto de Conflicto (Hook)" que establezca la importancia del análisis. Debe explicar por qué estos datos son cruciales. Ejemplo: "Para optimizar la pirólisis, es fundamental conocer la composición exacta de la materia prima. Sin datos precisos, el proceso es ineficiente."
        4.  **uvp**: Una "Propuesta Única de Valor (Solución)" que presente el análisis como la solución al conflicto. Ejemplo: "Presentamos un análisis riguroso que desglosa los componentes clave de la Paja de Trigo, permitiendo un ajuste exacto de los parámetros del proceso para maximizar el rendimiento."

        Responde únicamente con el objeto JSON estructurado.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        objective: { type: Type.STRING },
                        audience: { type: Type.STRING },
                        conflictPoint: { type: Type.STRING },
                        uvp: { type: Type.STRING },
                    },
                    required: ["objective", "audience", "conflictPoint", "uvp"],
                }
            }
        });

        return JSON.parse(response.text);

    } catch (error) {
        throw handleGeminiError(error, 'generar campos narrativos desde contexto');
    }
}

export function initializeAgentChat(systemPrompt: string): Chat {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemPrompt,
    },
  });
  return chat;
}

export async function continueAgentChat(
  chat: Chat,
  newMessage: string,
  file?: { name: string; type: string; data: string }
): Promise<string> {
  try {
    const parts: ({ text: string } | { inlineData: { mimeType: string; data: string; } })[] = [];
    
    // The user's prompt text should come first.
    if (newMessage.trim()) {
      parts.push({ text: newMessage });
    }
    
    if (file) {
      const base64Data = file.data.split(',')[1];
      parts.push({
        inlineData: {
          mimeType: file.type,
          data: base64Data,
        },
      });
    }

    if (parts.length === 0) {
      return "Por favor, envía un mensaje o un archivo.";
    }

    const response: GenerateContentResponse = await chat.sendMessage({
      contents: { parts }
    });
    return response.text;
  } catch (error) {
    throw handleGeminiError(error, 'continuar chat con agente');
  }
}