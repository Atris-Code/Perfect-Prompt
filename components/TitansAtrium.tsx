import React from 'react';
import { AGENTS_CODEX } from '../data/agentsCodex';
import type { View, CharacterProfile } from '../types';

// Icons for the multimedia sections
const ImageIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const AudioIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 12h.01M12 12h.01M18.142 12h.01M4 12a8 8 0 1116 0 8 8 0 01-16 0z" /></svg>);
const VideoIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
const CodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>);


const AgentCard: React.FC<{ character: CharacterProfile; onStartChat: (character: CharacterProfile) => void }> = ({ character, onStartChat }) => {
    return (
        <div className="bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-cyan-500/20 hover:shadow-2xl hover:transform hover:-translate-y-1">
            <div className="p-6">
                <h3 className="text-2xl font-bold text-cyan-400">{character.claveName}</h3>
                <p className="text-sm uppercase text-gray-400 tracking-wider">{character.archetype}</p>
            </div>
            <div className="px-6 py-4 bg-gray-900/50">
                <p className="text-gray-300 italic">"{character.mantra}"</p>
            </div>

            <div className="p-6 flex-grow space-y-3">
                <div className="flex items-start gap-4 p-3 bg-gray-700/50 rounded-lg">
                    <ImageIcon />
                    <div>
                        <h4 className="font-semibold">Imagen</h4>
                        <p className="text-xs text-gray-400 mt-1">Un retrato de personaje de alta calidad que capture su esencia.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-gray-700/50 rounded-lg">
                    <AudioIcon />
                    <div>
                        <h4 className="font-semibold">Audio</h4>
                        <p className="text-xs text-gray-400 mt-1">{character.audio.description} (Voz: {character.audio.voice}; Sonido: {character.audio.soundDesign})</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-3 bg-gray-700/50 rounded-lg">
                    <VideoIcon />
                    <div>
                        <h4 className="font-semibold">Video</h4>
                        <p className="text-xs text-gray-400 mt-1">{character.video.description}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-3 bg-gray-700/50 rounded-lg">
                    <CodeIcon />
                    <div>
                        <h4 className="font-semibold">Código</h4>
                        <p className="text-xs text-gray-400 mt-1">{character.code.description}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 mt-auto">
                <button 
                    onClick={() => onStartChat(character)}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    Conversar con {character.claveName.split(',')[0]}
                </button>
            </div>
        </div>
    );
};

interface TitansAtriumProps {
    setView: (view: View) => void;
    onStartChat: (character: CharacterProfile) => void;
}

export const TitansAtrium: React.FC<TitansAtriumProps> = ({ setView, onStartChat }) => {
    return (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-lg min-h-full">
        <header className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">El Atrio de los Titanes</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                ¿Con quién te gustaría conversar? Elige un agente para iniciar una sesión de chat y activar su conciencia.
            </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {AGENTS_CODEX.map(character => (
                <AgentCard key={character.claveName} character={character} onStartChat={onStartChat} />
            ))}
        </div>
    </div>
    );
};