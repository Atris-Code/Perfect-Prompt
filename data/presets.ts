import type { Preset } from '../types';
import { ContentType } from '../types';

export const PRESETS: Preset[] = [
  {
    name: "Informe de Viabilidad de Flota",
    data: {
      objective: "Generar un informe ejecutivo sobre la viabilidad y la capacidad de producción de una configuración de flota de pirólisis con {modules} módulos EHP-500.",
      tone: "Analítico / Profesional",
      specifics: {
        [ContentType.Texto]: {
          type: "Informe Ejecutivo",
          audience: "Inversores (Capital Riesgo), Equipo de Dirección",
          conflictPoint: "Evaluar una planta es importante, pero proyectar la capacidad de una flota completa es lo que define una estrategia industrial.",
          uvp: "Este informe proporciona un análisis claro de la capacidad de producción total y la viabilidad de una flota de {modules} módulos, permitiendo una toma de decisiones estratégicas informada."
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "Informe de Costos Operativos de Utilities",
    data: {
      objective: "Generar un informe ejecutivo que resuma los costos operativos de los servicios auxiliares (utilities) del sitio.",
      tone: "Formal / Analítico",
      specifics: {
        [ContentType.Texto]: {
          type: "Informe Ejecutivo",
          audience: "Gerentes Financieros (CFO), Jefes de Planta (Operaciones)",
          conflictPoint: "La optimización de costos operativos es crucial para la rentabilidad, pero a menudo los costos de los servicios auxiliares están descentralizados y son difíciles de consolidar.",
          uvp: "Este informe presenta una visión consolidada y detallada de los costos de cada servicio auxiliar, permitiendo identificar áreas clave para la optimización de la eficiencia energética y la reducción de gastos."
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "Ficha Técnica de Pellet",
    data: {
      objective: "Generar una ficha técnica detallada para el pellet de biomasa producido por la planta Phoenix.",
      tone: "Técnico / Informativo",
      specifics: {
        [ContentType.Texto]: {
          type: "Ficha Técnica de Proceso",
          audience: "Ingenieros Químicos / R&D",
          uvp: "Esta ficha técnica proporciona todos los parámetros clave del producto final, incluyendo su calidad y la intensidad energética de su producción, para una total transparencia y evaluación.",
          rawData: "Pureza: {purity}%\nHumedad: {moisture}%\nIntensidad Energética de Producción: {intensity} kWh/tonelada",
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "Informe de Logística Circular",
    data: {
      objective: "Generar un informe de operaciones logísticas para la flota circular, analizando su eficiencia y autosuficiencia.",
      tone: "Analítico / Corporativo",
      specifics: {
        [ContentType.Texto]: {
          type: "Informe Ejecutivo",
          audience: "Equipo de Dirección, Gerentes de Logística",
          uvp: "Este informe presenta los indicadores clave de rendimiento (KPIs) de la flota logística, cuantificando su eficiencia operativa y su grado de autosuficiencia energética en el marco de la economía circular.",
          rawData: `
- Eficiencia de recolección: {efficiency_ton_km} ton/km
- Autosuficiencia de combustible: {self_sufficiency_percent}%
- Reducción de emisiones (vs. Diésel): {emission_reduction_percent}%
- Costo operativo final: {total_cost} €/día
`
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "CIENCIA FICCION EPICA (SUEÑO DEL ISOTOPO)",
    data: {
      objective: "Un sueño del isótopo de Hidrógeno 'Protio', quien observa una disputa cósmica entre las 'Tierras Raras', que son territoriales y complejas, y los 'Gases Nobles', que son etéreos y autosuficientes. La pirólisis se representa como un evento catalizador que descompone lo complejo (Tierras Raras) en sus esencias más puras (Gases Nobles), revelando una verdad fundamental sobre el universo.",
      tone: "Solemne / Filosófico",
      activeAgents: ['Crítico de Arte', 'Curator'],
      specifics: {
        [ContentType.Video]: {
          artisticStyle: ["Realismo Mágico"],
          scriptSummary: "Estilo visual inspirado en Terrence Malick y Denis Villeneuve, con una paleta de colores de espectros de emisión atómica. Lenguaje de cámara: Cinematografía Épica y Lenta (movimientos amplios, ángulos contrapicados/picados). VFX: Partículas Etéreas y Transformación Fractal. Representación visual: Gases Nobles como auroras, Tierras Raras como minerales cristalinos.",
          cameraMovement: "Epic Rising Panorama",
          vfx: "Partículas Mágicas (Energy Wisps)",
        },
        [ContentType.Audio]: {
          voiceTone: "Solemne / Filosófico",
          readingSpeed: 25,
          voiceType: "Grave y resonante",
          continuousAmbiance: "Ambiente Cósmico Inmersivo",
          musicGenre: "Score Orquestal Minimalista (estilo Hans Zimmer + Jóhann Jóhannsson)",
          enableAdvancedSpatialAudio: true,
          acousticEnvironmentScale: "macro",
          soundPositioning: "Gases Nobles se mueven libremente. Tierras Raras emiten sonidos graves y localizados. La voz del narrador (Hidrógeno) emana desde el centro.",
          surfaceMaterials: "Cristal",
        },
        [ContentType.Texto]: {},
        [ContentType.Imagen]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "DOCUMENTAL EXPLICATIVO (TIPO VOX)",
    data: {
        objective: "Explicar un proceso o resultado específico de la pirólisis a una audiencia general pero curiosa.",
        tone: "Claro / Didáctico",
        activeAgents: ['Redactor de Ensayos', 'Crítico de Arte'],
        specifics: {
            [ContentType.Video]: {
                scriptSummary: "Estilo visual 'Motion Graphics Informativo'. Movimientos de cámara 'Digitales y Precisos' (zooms rápidos, paneos sobre gráficos)."
            },
            [ContentType.Audio]: {
                voiceTone: "Claro / Didáctico",
                continuousAmbiance: "Silencio de estudio con efectos de sonido sutiles (clicks, pops, zumbidos)",
                musicGenre: "Electrónica minimalista y optimista"
            },
            [ContentType.Texto]: {},
            [ContentType.Imagen]: {},
            [ContentType.Codigo]: {},
        }
    }
  },
  {
    name: "PITCH DE VENTAS PARA CAPITAL DE RIESGO",
    data: {
        objective: "Presentar una oportunidad de inversión basada en los resultados de una simulación.",
        tone: "Seguro / Persuasivo",
        activeAgents: ['Curator', 'Redactor de Ensayos'],
        specifics: {
            [ContentType.Video]: {
                marketingPreset: "Testimonio de Cliente (Social Proof)",
                scriptSummary: "Estilo visual 'Corporativo Moderno y Limpio'. Movimientos de cámara 'Estables y Confiados' (planos fijos, travellings suaves). Marketing y Contenido de Marca con 'Enfoque en ROI y Sostenibilidad'."
            },
            [ContentType.Audio]: {
                voiceTone: "Seguro / Persuasivo",
                continuousAmbiance: "Oficina moderna y silenciosa",
                musicGenre: "Corporativa inspiradora y discreta"
            },
            [ContentType.Texto]: {},
            [ContentType.Imagen]: {},
            [ContentType.Codigo]: {},
        }
    }
  },
  {
    name: "EXPERIENCIA SENSORIAL ASMR CIENTIFICO",
    data: {
        objective: "Explorar la pirólisis desde una perspectiva sensorial, casi táctil.",
        tone: "Susurrado / Calmado",
        activeAgents: ['Crítico de Arte', 'Curator'],
        specifics: {
            [ContentType.Video]: {
                scriptSummary: "Estilo visual 'Macro y Primerísimos Planos'. Movimientos de cámara 'Observacionales y Estáticos'.",
            },
            [ContentType.Audio]: {
                voiceTone: "Susurrado / Calmado",
                isolatedEffects: "Sonidos de pellets de madera cayendo, el crujido sutil del carbón, el burbujeo del bio-oil.",
                enableAdvancedSpatialAudio: true,
                soundPositioning: "Sonidos muy cercanos al oyente/cámara. Trayectorias lentas de izquierda a derecha."
            },
            [ContentType.Texto]: {},
            [ContentType.Imagen]: {},
            [ContentType.Codigo]: {},
        }
    }
  },
  {
    name: "TRAILER DE IMPACTO SOCIAL",
    data: {
        objective: "Crear un trailer corto y emocional para una campaña de concienciación sobre la economía circular, usando la pirólisis como solución.",
        tone: "Apasionado / Esperanzador",
        activeAgents: ['Curator', 'Crítico de Arte'],
        specifics: {
            [ContentType.Video]: {
                visualStyle: "Estilo Documental Crudo y Realista",
                scriptSummary: "Estilo visual 'Documental Cinematográfico Emotivo'. Movimientos de cámara 'Cámara en mano, seguimiento a personajes'."
            },
            [ContentType.Audio]: {
                voiceTone: "Apasionado / Esperanzador",
                musicGenre: "Score Orquestal Ascendente y Emotivo"
            },
            [ContentType.Texto]: {},
            [ContentType.Imagen]: {},
            [ContentType.Codigo]: {},
        }
    }
  },
  {
    name: "ANÁLISIS DE EFICIENCIA ENERGÉTICA",
    data: {
      objective: "Comparar la eficiencia de conversión energética de diferentes procesos de pirólisis (ej. bio-aceites vs. syngas) para determinar el mayor retorno energético.",
      tone: "Analítico",
      activeAgents: ['Redactor de Ensayos'],
      specifics: {
        [ContentType.Texto]: {
          type: "Resumen Ejecutivo de Viabilidad",
          audience: "Inversores, Empresas de Energía, Investigadores",
          conflictPoint: "Optimiza tu producción energética: ¿Qué proceso ofrece el mayor retorno?",
          uvp: "Nuestro simulador muestra que el bio-aceite de [Material X] con pirólisis rápida ofrece un [X%] de eficiencia de conversión energética, mientras que el syngas de [Material Y] alcanza un [Y%]."
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "REPORTE DE IMPACTO AMBIENTAL (CO₂)",
    data: {
      objective: "Demostrar la reducción de emisiones de CO₂ de la pirólisis en comparación con métodos tradicionales como la incineración, contribuyendo a un futuro más verde.",
      tone: "Inspiracional",
      activeAgents: ['Redactor de Ensayos'],
      specifics: {
        [ContentType.Texto]: {
          type: "Informe de Sostenibilidad (ESG)",
          audience: "Políticos, Organismos Ambientales, Empresas con objetivos ESG",
          conflictPoint: "La sostenibilidad en acción: Reduce tu impacto ambiental con la pirólisis.",
          uvp: "La pirólisis de [Material X] puede reducir las emisiones de CO₂ en un [X%] en comparación con la incineración, generando [Y] kg de CO₂ por tonelada de materia procesada."
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "FICHA TÉCNICA DE CALIDAD DE PRODUCTO",
    data: {
      objective: "Analizar la calidad específica de los productos de la pirólisis (bio-aceite, biochar) para determinar su idoneidad en aplicaciones avanzadas.",
      tone: "Didáctico",
      activeAgents: ['Redactor de Ensayos'],
      specifics: {
        [ContentType.Texto]: {
          type: "Ficha Técnica de Proceso",
          audience: "Ingenieros de Proceso, Químicos, Agrónomos, Desarrolladores de Productos",
          conflictPoint: "¿Buscas un combustible líquido de alta calidad? ¿O un fertilizante innovador?",
          uvp: "La pirólisis de [Material X] produce un bio-aceite con un pH de [Y] y [Z]% de oxígeno, ideal para [aplicación]. Alternativamente, su biochar posee una superficie específica de [A] m²/g, excelente como enmienda agrícola."
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "PITCH DE INVERSIÓN (VIABILIDAD ECONÓMICA)",
    data: {
      objective: "Evaluar la viabilidad económica de un proceso de pirólisis, mostrando el balance económico simplificado y el potencial de ingresos.",
      tone: "Persuasivo",
      activeAgents: ['Redactor de Ensayos', 'Curator'],
      specifics: {
        [ContentType.Texto]: {
          type: "Pitch de Inversión (Llamada a la Acción)",
          audience: "Inversores (Capital Riesgo)",
          conflictPoint: "¿Es la pirólisis una inversión inteligente?",
          uvp: "Con un costo de materia prima de [X] €/tonelada, la simulación para [Material Y] muestra un potencial de ingresos de [Z] €/tonelada de productos, lo que indica un balance económico positivo de [W] €/tonelada."
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "ANÁLISIS DE REQUERIMIENTOS TECNOLÓGICOS",
    data: {
      objective: "Detallar la complejidad operacional y los requerimientos tecnológicos de un proceso de pirólisis específico.",
      tone: "Formal",
      activeAgents: ['Redactor de Ensayos'],
      specifics: {
        [ContentType.Texto]: {
          type: "Protocolo Experimental (Metodología)",
          audience: "Ingenieros de Planta, Diseñadores de Reactores, Investigadores",
          conflictPoint: "¿Estás listo para el desafío tecnológico de la pirólisis?",
          uvp: "El proceso de [Tipo de Proceso] de [Material X] con [Catalizador Y] se caracteriza por operar a [Condiciones de Temperatura/Presión], con una sensibilidad [baja/media/alta] a [Contaminante Z]. Requiere un pre-tratamiento de [Tipo de Pre-tratamiento]."
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: '[REPORTE] Viabilidad de Nuevo Activo (Chronos)',
    data: {
      objective: 'Generar [REPORTE] de Viabilidad de Nuevo Activo (Chronos)',
      tone: 'Analítico',
    },
  },
  {
    name: "Preset: Informe Comparativo de Viabilidad Energética",
    data: {
      objective: "Generar un informe ejecutivo que compare la viabilidad técnica y económica de una planta de Caldera de Biomasa Moderna frente a las alternativas energéticas tradicionales.",
      tone: "Analítico / Formal",
      specifics: {
        [ContentType.Texto]: {
          type: "Informe Ejecutivo",
          audience: "Equipo de Dirección / Inversores",
          conflictPoint: "La elección de una tecnología energética define el futuro de la rentabilidad y la sostenibilidad. Este análisis desglosa las cifras clave para una decisión informada.",
          uvp: "Este informe utiliza datos de simulación para proporcionar una comparación directa y cuantitativa, facilitando una decisión estratégica basada en evidencia."
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: 'CATALIZADOR: Argumento de Inversión',
    data: {
      objective: 'Redacta una presentación de 3 diapositivas para convencer a un inversor de que el Escenario A es la mejor opción. Utiliza los datos del análisis comparativo para resaltar sus fortalezas y mitigar sus debilidades frente al Escenario B.',
      tone: 'Persuasivo',
    },
  },
  {
    name: 'CATALIZADOR: Comunicado de Prensa de Innovación',
    data: {
      objective: 'Escribe un comunicado de prensa anunciando nuestra nueva tecnología, basada en el Escenario B. Explica por qué, a pesar de no ser la opción más rentable, sus beneficios técnicos y de sostenibilidad la convierten en la elección correcta para el futuro de la marca.',
      tone: 'Inspiracional',
    },
  },
  {
    name: 'CATALIZADOR: Memo de Decisión Interna',
    data: {
      objective: 'Genera un memo para el equipo de dirección. Expón de forma neutral el análisis comparativo de los escenarios A y B, y concluye con la recomendación final del Concilio para justificar la decisión estratégica.',
      tone: 'Analítico',
    },
  },
  {
    name: "Informe Técnico de Laboratorio",
    data: {
      tone: "Analítico / Formal",
      specifics: {
        [ContentType.Texto]: {
          type: "Informe Técnico de Laboratorio",
          audience: "Equipo de Ingeniería / I&D",
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "Resumen Ejecutivo para Inversores",
    data: {
      tone: "Persuasivo / Profesional",
      specifics: {
        [ContentType.Texto]: {
          type: "Pitch de Inversión (Llamada a la Acción)",
          audience: "Inversores (Capital Riesgo)",
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "Artículo de Blog Divulgativo A vs B",
    data: {
      tone: "Informativo / Casual",
      specifics: {
        [ContentType.Texto]: {
          type: "Artículo de blog",
          audience: "Público General",
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "Comunicado de Tokenización de Activo",
    data: {
      tone: "Profesional / Informativo",
      specifics: {
        [ContentType.Texto]: {
          type: "Comunicado de Prensa",
          audience: "Inversores (Capital Riesgo)",
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
  {
    name: "Actualización para Inversores de STO",
    data: {
      tone: "Informativo / Profesional",
      specifics: {
        [ContentType.Texto]: {
          type: "Artículo de blog",
          audience: "Inversores no técnicos",
        },
        [ContentType.Imagen]: {},
        [ContentType.Video]: {},
        [ContentType.Audio]: {},
        [ContentType.Codigo]: {},
      }
    }
  },
];