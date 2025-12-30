import React from 'react';
import type { View, IssuanceState, GaiaLabState, Task } from '../../types';
import { useTranslations } from '../../contexts/LanguageContext';

interface IAProStudioProps {
    issuanceState: IssuanceState;
    handleDeployContract: () => void;
    handleMintTokens: () => void;
    gaiaLabState: GaiaLabState;
    onTakeSample: () => void;
    setView: (view: View) => void;
    onSaveTask: (task: Task) => void;
}

const KpiCard: React.FC<{ label: string; value: string | number; unit: string; }> = ({ label, value, unit }) => (
    <div className="bg-slate-700 p-4 rounded-lg text-center">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-3xl font-bold font-mono text-white mt-1">
            {typeof value === 'number' ? value.toFixed(2) : value}
            <span className="text-lg text-slate-300 ml-1">{unit}</span>
        </p>
    </div>
);

export const IAProStudio: React.FC<IAProStudioProps> = ({
    issuanceState,
    handleDeployContract,
    handleMintTokens,
    gaiaLabState,
    onTakeSample,
    setView,
    onSaveTask,
}) => {
    const { t } = useTranslations();
    const { isNewBatchReady, sampleId, analysisResults, quality } = gaiaLabState;
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">

            {/* Columna 1: Muestreo y Clasificación */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center justify-between">
                        {t('iaProStudio.samplingPanel')}
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    </h3>
                    <div className="flex-grow flex flex-col items-center justify-center text-center mt-4">
                        <p className="text-gray-600">
                            {isNewBatchReady ? 
                                <span className="text-green-600 font-semibold animate-pulse">{t('iaProStudio.newBatchReady')}</span> :
                                t('iaProStudio.waitingForBatch')
                            }
                        </p>
                        <button
                            onClick={onTakeSample}
                            disabled={!isNewBatchReady || !!sampleId}
                            className="mt-4 w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {sampleId && !analysisResults ? t('iaProStudio.takingSample') : analysisResults ? t('iaProStudio.sampleTaken') : t('iaProStudio.takeSample')}
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col">
                     <h3 className="text-xl font-bold text-gray-800 flex items-center justify-between">
                        {t('iaProStudio.classificationPanel')}
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" /></svg>
                    </h3>
                    <div className="flex-grow flex flex-col items-center justify-center text-center mt-4">
                        {!quality ? (
                            <p className="text-slate-500">{t('iaProStudio.waitingForResults')}</p>
                        ) : (
                            <>
                                <p className="text-sm text-slate-500">{t('iaProStudio.sampleLot')}: <span className="font-mono">{sampleId}</span></p>
                                <div className={`mt-4 px-6 py-3 rounded-lg border-2 ${quality === 'PREMIUM' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-500 bg-gray-100'}`}>
                                    <p className="text-xs uppercase tracking-widest text-slate-600">{t('iaProStudio.hefestoVerdict')}</p>
                                    <p className={`text-2xl font-bold ${quality === 'PREMIUM' ? 'text-yellow-600' : 'text-gray-800'}`}>
                                        {quality === 'PREMIUM' ? t('iaProStudio.quality.premium') : t('iaProStudio.quality.standard')}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {quality === 'PREMIUM' ? t('iaProStudio.aptitude.premium') : t('iaProStudio.aptitude.standard')}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Columna 2: Análisis */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 flex items-center justify-between">
                    {t('iaProStudio.analysisPanel')}
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </h3>
                <div className="flex-grow flex flex-col items-center justify-center mt-4">
                    {!analysisResults && !sampleId ? (
                        <div className="text-center text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.25l2.387.477a2 2 0 011.022.547l-2.387-.477a6 6 0 01-3.86-.517l-.318-.158a6 6 0 00-3.86-.517l-2.387-.477a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" /></svg>
                            <p>{t('iaProStudio.waitingForAnalysis')}</p>
                        </div>
                    ) : !analysisResults && sampleId ? (
                        <div className="text-center text-slate-500 animate-pulse">
                            <svg className="animate-spin mx-auto h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            <p>{t('iaProStudio.analyzing', { sampleId })}</p>
                        </div>
                    ) : (
                        <div className="w-full text-white bg-slate-800 p-6 rounded-lg grid grid-cols-2 gap-6 animate-fade-in">
                            <KpiCard label={t('iaProStudio.carbon')} value={analysisResults.carbon} unit="%" />
                            <KpiCard label={t('iaProStudio.ph')} value={analysisResults.ph} unit="" />
                            <KpiCard label={t('iaProStudio.porosity')} value={analysisResults.porosity} unit="m²/g" />
                            <KpiCard label={t('iaProStudio.ash')} value={analysisResults.ash} unit="%" />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};