import React from 'react';

export const Game: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <header className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Juego de Simulación</h2>
        <p className="mt-2 text-md text-gray-600">
          Este módulo está en construcción. Aquí podrás participar en un juego de simulación interactivo.
        </p>
      </header>
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500">Próximamente...</p>
      </div>
    </div>
  );
};
