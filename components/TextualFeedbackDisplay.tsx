import React from 'react';
import { TextualNarrativeCoherence } from '../types';

const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const colorClasses = score > 3 ? 'bg-green-100 text-green-800 border-green-300'
                     : score > -4 ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                     : 'bg-red-100 text-red-800 border-red-300';
  const sign = score > 0 ? '+' : '';
  
  return (
    <div className={`text-center p-4 rounded-lg border-2 ${colorClasses}`}>
      <div className="text-3xl font-bold">{sign}{score}</div>
      <div className="text-xs font-semibold uppercase tracking-wider mt-1">Índice CNT</div>
    </div>
  );
};

interface TextualFeedbackDisplayProps {
  feedback: TextualNarrativeCoherence;
}

export const TextualFeedbackDisplay: React.FC<TextualFeedbackDisplayProps> = ({ feedback }) => {
  return (
    <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg animate-fade-in">
      <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Chequeo de Coherencia Narrativa Textual (CNT)
      </h3>
      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <ScoreBadge score={feedback.stylisticCohesion.score} />
          <div>
            <h4 className="font-semibold text-gray-800">Cohesión Estilística</h4>
            <p className="text-sm text-gray-600 mt-1">{feedback.stylisticCohesion.analysis}</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <ScoreBadge score={feedback.narrativeArchitecture.score} />
          <div>
            <h4 className="font-semibold text-gray-800">Arquitectura Narrativa</h4>
            <p className="text-sm text-gray-600 mt-1">{feedback.narrativeArchitecture.analysis}</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <ScoreBadge score={feedback.audienceTranslation.score} />
          <div>
            <h4 className="font-semibold text-gray-800">Traducción de Audiencia</h4>
            <p className="text-sm text-gray-600 mt-1">{feedback.audienceTranslation.analysis}</p>
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default TextualFeedbackDisplay;