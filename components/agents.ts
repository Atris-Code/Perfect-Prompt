// FIX: This file was missing, causing build errors. It is created to centralize agent definitions.
export interface AgentDefinition {
    id: string;
    name: string;
    description: string;
}

export const AGENTS: AgentDefinition[] = [
    { id: 'Crítico de Arte', name: 'Crítico de Arte', description: 'Juez estético. Evalúa la coherencia visual (estilo, color, iluminación).' },
    { id: 'Curator', name: 'Curator (Estrategia Narrativa)', description: 'Juez de propósito. Alinea la técnica (cámara, plano) con el impacto emocional.' },
    { id: 'Redactor de Ensayos', name: 'Redactor de Ensayos', description: 'Traductor de conceptos. Justifica conflictos visuales a través de una nueva capa narrativa.' },
];
