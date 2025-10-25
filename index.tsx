import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Changed named import to default import to match the export in App.tsx
import App from './App';
// FIX: To ensure consistent module resolution, removed the .tsx extension from the import path.
import { LanguageProvider } from './contexts/LanguageContext';
// FIX: To ensure consistent module resolution, removed the .tsx extension from the import path.
import { UtilityCostProvider } from './contexts/UtilityCostContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <UtilityCostProvider>
        <App />
      </UtilityCostProvider>
    </LanguageProvider>
  </React.StrictMode>
);