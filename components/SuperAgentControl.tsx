import React from 'react';
import { Accordion } from './form/Accordion';

// FIX: Inlined AGENTS definition and its type to avoid creating a new file, as per instructions.
interface AgentDefinition {
    id: string;
    name: string;
    description: string;
}

const AGENTS: AgentDefinition[] = [
    { id: 'Crítico de Arte', name: 'Crítico de Arte', description: 'Juez estético. Evalúa la coherencia visual (estilo, color, iluminación).' },
    { id: 'Curator', name: 'Curator (Estrategia Narrativa)', description: 'Juez de propósito. Alinea la técnica (cámara, plano) con el impacto emocional.' },
    { id: 'Redactor de Ensayos', name: 'Redactor de Ensayos', description: 'Traductor de conceptos. Justifica conflictos visuales a través de una nueva capa narrativa.' },
];

interface SuperAgentControlProps {
  activeAgents: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SuperAgentControl: React.FC<SuperAgentControlProps> = ({ activeAgents, handleChange }) => {
  return (
    <Accordion title="Super-Agente Híbrido (SAH)" defaultOpen={true}>
      <div className="md:col-span-2 space-y-4">
        <p className="text-sm text-gray-600">
          Si el Feedback de Consistencia Narrativa (FCN) es bajo, activa uno o más agentes para recibir soluciones proactivas.
        </p>
        <div className="space-y-3">
            {AGENTS.map(agent => (
                <label key={agent.id} className="flex items-start p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                    <input
                        type="checkbox"
                        name="activeAgents"
                        value={agent.id}
                        checked={activeAgents.includes(agent.id)}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                    />
                    <div className="ml-3">
                        <span className="font-semibold text-gray-800">{agent.name}</span>
                        <p className="text-sm text-gray-600">{agent.description}</p>
                    </div>
                </label>
            ))}
        </div>
      </div>
    </Accordion>
  );
};

export default SuperAgentControl;
