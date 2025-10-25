// FIX: Changed import of 'VideoPreset' from './videoPresets' to '../types' to resolve export errors.
import type { VideoPreset } from '../types';

export interface GenrePack {
  genre: string;
  description: string;
  presets: VideoPreset[];
}

const cinemaVerite: VideoPreset[] = [
    {
        "preset_name": "Cámara Observacional (Fly-on-the-Wall)",
        "category": "Cinéma Vérité",
        "description": "Simula el estilo de un operador de cámara que es un observador invisible, reaccionando a los eventos a medida que ocurren.",
        "parameters": {
            "camera_movement": "Cámara en mano (handheld) con movimiento orgánico y reactivo. La cámara panea y se reencuadra para seguir la conversación o la acción, a veces de forma imperfecta.",
            "lens_and_focus": "Lente zoom para poder cambiar de plano general a primer plano rápidamente. El enfoque es manual y a veces 'busca' (focus hunting) para encontrar al sujeto.",
            "visual_style": "Estilo crudo, sin adornos. Se aceptan imperfecciones como reflejos en la lente (lens flares) si son causados por fuentes de luz reales.",
            "lighting": "Uso exclusivo de luz disponible (available light).",
            "color_grading": "Color natural y realista, sin estilización.",
            "environment_dynamics": "La acción no está montada; se captura la vida real tal como sucede."
        },
        "prompt_block": "Documentary Style: Cinéma Vérité (fly-on-the-wall). Camera: Handheld and reactive, panning and reframing to follow the action as it unfolds. Focus: Manual focus pulling, sometimes imperfectly. Lens: Shot on a zoom lens to allow for quick changes in framing. The style is raw, unadorned, and captures events authentically."
    },
    {
        "preset_name": "Sonido Directo Inmersivo",
        "category": "Cinéma Vérité",
        "description": "Captura el paisaje sonoro real del entorno, incluyendo todas sus imperfecciones, para una máxima inmersión.",
        "parameters": {
            "key_sounds": "Diálogos de los sujetos, capturados con su acústica natural.",
            "background_ambience": "El sonido ambiente del lugar es prominente y no se limpia: tráfico, viento, otras personas hablando.",
            "sound_quality": "Sonido sin pulir. El micrófono puede registrar el ruido del viento. El volumen de las voces varía según la distancia.",
            "music_style": "Estrictamente sin música no diegética (que no pertenezca a la escena).",
            "emotional_impact": "Realismo, autenticidad, inmersión."
        },
        "prompt_block": "Sound Design: Cinéma Vérité style. All audio is diegetic (direct sound) captured on location. The background ambience is prominent and unfiltered (wind, traffic, room tone). Dialogue is captured with its natural acoustics and imperfections. There is no non-diegetic music or score."
    },
    {
        "preset_name": "Iluminación Naturalista",
        "category": "Cinéma Vérité",
        "description": "Un preset que fuerza el uso exclusivo de la luz que se encuentra naturalmente en la escena, aceptando las 'imperfecciones' que esto genera.",
        "parameters": {
            "camera_movement": "N/A",
            "lens_and_focus": "N/A",
            "visual_style": "La imagen puede tener zonas de subexposición o sobreexposición. Alto grano en escenas con poca luz.",
            "lighting": "Luz estrictamente natural o disponible. Fuentes de luz incluyen el sol, ventanas, lámparas de la calle o del interior de una casa.",
            "color_grading": "Balance de blancos que refleja la temperatura de color real de la luz (cálida para interiores, fría para exteriores nublados).",
            "environment_dynamics": "La calidad de la luz cambia de forma natural (ej. una nube que pasa y oscurece el sol)."
        },
        "prompt_block": "Lighting Style: Naturalistic, available light only. The scene is lit exclusively by diegetic light sources (windows, sun, practical lamps). This may result in high-contrast, grainy, under- or over-exposed areas. The white balance reflects the real-world color temperature of the light."
    }
];

const historicoExpositivo: VideoPreset[] = [
    {
        "preset_name": "Voz en Off Autoritativa (Authoritative Voiceover)",
        "category": "Histórico Expositivo",
        "description": "Establece el tono sonoro para una narración omnisciente y autoritativa, que guía al espectador a través de la historia con claridad y peso emocional.",
        "parameters": {
            "key_sounds": "La voz clara y bien modulada de un narrador.",
            "background_ambience": "Silencio o un sonido ambiente muy sutil y relevante para la escena (ej. el crepitar de un fuego, el viento).",
            "sound_quality": "Calidad de estudio, nítida y sin imperfecciones.",
            "music_style": "Música instrumental emotiva (piano, cuerdas) que subraya la narración pero nunca la domina.",
            "emotional_impact": "Autoridad, nostalgia, solemnidad, claridad."
        },
        "prompt_block": "Sound Design: An authoritative, omniscient narrator's voiceover. The voice is clear, well-paced, and has a studio-quality recording. It is accompanied by a subtle, emotive instrumental score (piano, strings) that supports the emotional tone of the narrative without being distracting."
    },
    {
        "preset_name": "Mapa Animado Explicativo (Animated Explainer Map)",
        "category": "Histórico Expositivo",
        "description": "Un preset para crear mapas animados que explican movimientos geográficos, como campañas militares, exploraciones o migraciones.",
        "parameters": {
            "camera_movement": "Movimiento de cámara aéreo y cenital sobre un mapa de época o topográfico.",
            "lens_and_focus": "Enfoque profundo para mantener todo el mapa legible.",
            "visual_style": "Líneas animadas de colores (generalmente rojo o azul) que se dibujan sobre el mapa para mostrar rutas o fronteras cambiantes.",
            "lighting": "Iluminación suave y uniforme sobre la superficie del mapa.",
            "color_grading": "Tonos sepia o desaturados para darle un aspecto de documento antiguo.",
            "environment_dynamics": "El mapa puede tener una textura de papel o pergamino antiguo. Se pueden superponer fechas y nombres de lugares con tipografía clásica."
        },
        "prompt_block": "Visual Style: An animated explainer map with a vintage, parchment texture. Animated lines in a contrasting color (e.g., red) draw themselves across the map to illustrate a journey or battle plan. The camera is positioned in a top-down view. On-screen text with classic typography indicates dates and locations."
    },
    {
        "preset_name": "Lectura de Cartas (Letter Reading)",
        "category": "Histórico Expositivo",
        "description": "Crea una escena íntima donde el contenido de un documento histórico (una carta, un diario) es leído por una voz de actor, superpuesto a tomas de recurso.",
        "parameters": {
            "key_sounds": "La voz emotiva de un actor leyendo el texto, a menudo con un sonido ligeramente envejecido.",
            "background_ambience": "Sonidos sutiles relacionados con el contenido de la carta (ej. el sonido de una pluma escribiendo, el viento de un campo de batalla).",
            "sound_quality": "La voz es clara pero puede tener una ligera reverberación para indicar que es un pensamiento o un recuerdo.",
            "music_style": "Música melancólica y minimalista.",
            "emotional_impact": "Intimidad, conexión personal con el pasado, melancolía."
        },
        "prompt_block": "B-Roll Style: An actor's emotional voiceover reads from a historical document (letter, diary). This audio is played over slow-motion, symbolic B-roll footage (e.g., a macro shot of ink on paper, a shot of a relevant landscape). The sound design is intimate and melancholic, connecting the viewer personally to the past."
    }
];

const naturalezaEpica: VideoPreset[] = [
    {
        "preset_name": "Macro Extremo en Cámara Lenta",
        "category": "Naturaleza Épica (Estilo BBC)",
        "description": "Captura detalles invisibles a simple vista de la flora o fauna en ultra cámara lenta, revelando la belleza oculta de sus movimientos.",
        "parameters": {
            "camera_movement": "Cámara completamente estática para una estabilidad absoluta.",
            "lens_and_focus": "Lente macro con una profundidad de campo extremadamente selectiva (razor-thin depth of field). Enfoque perfecto en el sujeto (ej. un insecto).",
            "visual_style": "Grabado a una velocidad de fotogramas muy alta (high-frame-rate) para una reproducción en cámara lenta fluida y detallada.",
            "lighting": "Iluminación controlada para resaltar la textura y los detalles del sujeto.",
            "color_grading": "Colores vibrantes y saturados para resaltar la belleza de la naturaleza.",
            "environment_dynamics": "El movimiento del sujeto (ej. el batir de las alas de un colibrí) se revela con una claridad asombrosa."
        },
        "prompt_block": "Nature Macro Shot: An extreme slow-motion macro shot of a subject (e.g., an insect, a flower opening). Shot with a high-frame-rate camera. Lighting: Controlled and detailed, highlighting textures. Focus: Razor-thin depth of field with perfect focus on the subject. Color: Vibrant, saturated, and hyper-realistic colors. The result is a poetic and scientific look at movement."
    },
    {
        "preset_name": "Time-Lapse de Paisaje",
        "category": "Naturaleza Épica (Estilo BBC)",
        "description": "Muestra la progresión del tiempo a gran escala, como el paso de las nubes, el movimiento de las estrellas o el cambio de estaciones.",
        "parameters": {
            "camera_movement": "Cámara estática o con un movimiento de slider muy lento (hyperlapse) para añadir dinamismo.",
            "lens_and_focus": "Lente gran angular con enfoque profundo, manteniendo todo el paisaje nítido.",
            "visual_style": "Calidad de imagen ultra nítida (8K). Transiciones de luz suaves y perfectas (ej. de día a noche).",
            "lighting": "Luz natural que cambia dramáticamente a lo largo de la secuencia.",
            "color_grading": "Colores intensos y dramáticos para resaltar la belleza del cielo y el paisaje.",
            "environment_dynamics": "Las nubes se mueven rápidamente, las estrellas giran en el cielo, las flores se abren y cierran."
        },
        "prompt_block": "Nature Time-Lapse: An epic time-lapse of a vast landscape. Camera is locked down or on a very slow slider. Lens: Wide-angle lens with deep focus. Dynamics: Captures the rapid movement of clouds, the rotation of stars (star trail), or a day-to-night transition. Visuals: Ultra-sharp 8K quality with smooth light transitions and dramatic, saturated colors."
    },
    {
        "preset_name": "Seguimiento Aéreo con Dron",
        "category": "Naturaleza Épica (Estilo BBC)",
        "description": "Un plano aéreo épico que sigue a un animal o un rebaño, o que revela la inmensidad de un paisaje desde el aire.",
        "parameters": {
            "camera_movement": "Movimiento de dron suave y estabilizado, a menudo volando bajo y a gran velocidad para un efecto dinámico, o ascendiendo lentamente para una revelación.",
            "lens_and_focus": "Lente gran angular con enfoque profundo.",
            "visual_style": "Estilo cinematográfico de alta producción.",
            "lighting": "Luz natural, preferiblemente durante la 'golden hour' para crear largas sombras y colores cálidos.",
            "color_grading": "Colores ricos y cinematográficos que resaltan la belleza del paisaje.",
            "environment_dynamics": "Sigue a un animal corriendo, un rebaño migrando, o la cresta de una montaña."
        },
        "prompt_block": "Nature Aerial Shot: A smooth and stabilized aerial drone shot. Movement: The drone tracks a moving subject (e.g., a running animal) or glides over a vast landscape (e.g., a river canyon). Lighting: Shot during the golden hour to create long, dramatic shadows. Visuals: Epic, cinematic, and high-production value with rich colors."
    },
    {
        "preset_name": "Cinematic Landscape",
        "category": "Naturaleza Épica (Estilo BBC)",
        "description": "Un plano aéreo cinematográfico y panorámico de un paisaje grandioso, filmado durante la 'golden hour' para maximizar la belleza y el drama.",
        "parameters": {
            "camera_movement": "Movimiento de dron lento y panorámico que revela la vastedad del paisaje.",
            "lens_and_focus": "Lente gran angular con enfoque profundo.",
            "visual_style": "Estilo cinematográfico, limpio y de alta resolución.",
            "lighting": "Luz cálida y direccional de la 'golden hour' (amanecer o atardecer), creando largas sombras.",
            "color_grading": "Colores ricos y muy saturados para un look dramático y vibrante."
        },
        "prompt_block": "A slow, panoramic, and cinematic drone shot revealing a vast landscape. The scene is captured during the golden hour, with warm, dramatic light creating long shadows. Colors are rich and saturated. Shot with a wide-angle lens and deep focus for a high-resolution, epic feel."
    }
];

export const CLASSIFIED_GENRE_PRESETS: GenrePack[] = [
    {
        genre: "Cinéma Vérité",
        description: "Captura la realidad sin adornos, como si el espectador fuera un observador invisible, priorizando la autenticidad total.",
        presets: cinemaVerite
    },
    {
        genre: "Histórico Expositivo (Estilo Ken Burns)",
        description: "Construye documentales históricos clásicos, combinando narración, análisis de expertos y material de archivo de forma emotiva y clara.",
        presets: historicoExpositivo
    },
    {
        genre: "Naturaleza Épica (Estilo BBC)",
        description: "Captura la majestuosidad del mundo natural con un nivel de producción impecable, utilizando técnicas visuales que evocan asombro y admiración.",
        presets: naturalezaEpica
    }
];

export const ALL_GENRE_PRESETS: VideoPreset[] = [
    ...cinemaVerite,
    ...historicoExpositivo,
    ...naturalezaEpica,
];
