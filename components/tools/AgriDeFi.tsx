import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import type { STOState, Task } from '../../types';
import { ContentType } from '../../types';

interface AgriDeFiProps {
    stoState: STOState;
    onStartSTO: () => void;
    onSaveTask: (task: Task) => void;
}

const KpiCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center gap-4">
        <div className="bg-slate-700 p-3 rounded-lg text-cyan-400">{icon}</div>
        <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold font-mono">{value}</p>
        </div>
    </div>
);

const formatTime = (seconds: number) => {
    if (seconds < 0) seconds = 0;
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
};

const investorDistributionBuckets = (investors: { id: number; amount: number }[]) => {
    const buckets = {
        small: { name: 'Pequeños (<500)', count: 0 },
        medium: { name: 'Medianos (500-1500)', count: 0 },
        large: { name: 'Grandes (>1500)', count: 0 },
    };

    investors.forEach(inv => {
        if (inv.amount < 500) {
            buckets.small.count++;
        } else if (inv.amount <= 1500) {
            buckets.medium.count++;
        } else {
            buckets.large.count++;
        }
    });

    return [
        { name: buckets.small.name, value: buckets.small.count },
        { name: buckets.medium.name, value: buckets.medium.count },
        { name: buckets.large.name, value: buckets.large.count },
    ].filter(b => b.value > 0);
};

const COLORS = ['#67e8f9', '#a78bfa', '#fde047']; // cyan-300, violet-400, yellow-300

export const AgriDeFi: React.FC<AgriDeFiProps> = ({ stoState, onStartSTO, onSaveTask }) => {
    const { investors, fundsRaised, target, status } = stoState;
    const [priceData, setPriceData] = useState<{ time: number, price: number }[]>([]);
    const STO_DURATION = 300; // 5 minutes for simulation
    const [timeLeft, setTimeLeft] = useState(STO_DURATION);

    useEffect(() => {
        let priceInterval: number | undefined;
        let timerInterval: number | undefined;

        if (status === 'ACTIVE') {
            if (priceData.length === 0) {
              setPriceData([{ time: Date.now(), price: 1.00 }]);
            }
            if (timeLeft === STO_DURATION) {
                setTimeLeft(STO_DURATION -1);
            }

            priceInterval = window.setInterval(() => {
                if(fundsRaised < target) {
                    setPriceData(prevData => [...prevData, { time: Date.now(), price: 1.00 }].slice(-30));
                }
            }, 2000);

            timerInterval = window.setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1 || fundsRaised >= target) {
                        clearInterval(timerInterval);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (status === 'PREPARING') {
            setTimeLeft(STO_DURATION);
            setPriceData([]);
        }

        return () => {
            clearInterval(priceInterval);
            clearInterval(timerInterval);
        };
    }, [status, fundsRaised, target, priceData.length, timeLeft]);

    const tokensSold = fundsRaised; // Since price is 1 USDC per token
    const distributionData = useMemo(() => investorDistributionBuckets(investors), [investors]);

    const handleCreateProgressReport = () => {
        const rawData = `
### Paquete de Contexto (Progreso STO)
- **Fondos Recaudados:** ${fundsRaised.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
- **Tokens Vendidos:** ${tokensSold.toLocaleString()}
- **Número de Inversores:** ${investors.length}
- **Tiempo Restante:** ${formatTime(timeLeft)}
- **Distribución de Inversores:**
${distributionData.map(d => `  - ${d.name}: ${d.value} inversores`).join('\n')}
        `.trim();

        const newTask: Task = {
            id: `task-progress-report-${Date.now()}`,
            title: "Informe de Progreso: STO Cosecha de Soja 2026",
            createdAt: Date.now(),
            status: 'Por Hacer',
            contentType: ContentType.Texto,
            formData: {
                objective: "Redactar una actualización para la comunidad y los inversores sobre el estado actual del STO 'Cosecha de Soja 2026', destacando los hitos alcanzados.",
                specifics: {
                    [ContentType.Texto]: {
                        narrativeCatalyst: 'Actualización para Inversores de STO',
                        rawData: rawData
                    },
                    [ContentType.Imagen]: {},
                    [ContentType.Video]: {},
                    [ContentType.Audio]: {},
                    [ContentType.Codigo]: {},
                }
            },
            isIntelligent: false,
            eventType: 'ExecutiveReport',
        };

        onSaveTask(newTask);
        alert("Tarea 'Informe de Progreso' creada. Cárgala desde el Gestor de Tareas para autocompletar el Creador de Prompts.");
    };

    return (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl h-full flex flex-col font-sans relative">
             <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
            <header className="text-center mb-6">
                <div className="flex justify-center items-center gap-4">
                    <h2 className="text-3xl font-bold">Plataforma de Lanzamiento Agri-DeFi</h2>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                        status === 'ACTIVE' ? 'bg-green-500/20 text-green-300 ring-1 ring-green-400 animate-pulse' 
                        : status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-400' 
                        : 'bg-slate-500/20 text-slate-300'
                    }`}>
                        {status}
                    </span>
                </div>
                <p className="mt-2 text-md text-slate-400">Security Token Offering (STO) para la Cosecha de Soja 2026 (AGS26)</p>
            </header>

            <div className="mb-6 flex justify-end">
                <button
                    onClick={handleCreateProgressReport}
                    className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                >
                    Crear Informe de Progreso del STO (Sinergia)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <KpiCard title="Fondos Recaudados" value={fundsRaised.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
                <KpiCard title="Tokens Vendidos" value={tokensSold.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>} />
                <KpiCard title="Inversores" value={investors.length.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
                <KpiCard title="Tiempo Restante" value={formatTime(timeLeft)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow min-h-0">
                {/* Columna del Gráfico y Feed */}
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Actividad del Mercado</h3>
                    <div className="flex-grow h-64 mb-6">
                         <ResponsiveContainer>
                            <LineChart data={priceData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="time" tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString('es-ES')} stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                                <YAxis domain={[0.99, 1.01]} stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                                <RechartsTooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} labelStyle={{ color: '#F3F4F6' }} />
                                <Line type="monotone" dataKey="price" name="Precio (USDC)" stroke="#34D399" strokeWidth={2} dot={false} isAnimationActive={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mb-2">Feed de Inversiones en Vivo</h4>
                        <div className="space-y-2 h-40 overflow-y-auto pr-2">
                           {investors.map((inv) => (
                                <div key={inv.id} className="flex justify-between items-center text-sm p-2 bg-slate-700/50 rounded-md animate-fade-in">
                                    <span className="font-mono text-slate-400">Inversor #{inv.id}</span>
                                    <span className="font-semibold">{inv.amount.toLocaleString()} AGS26</span>
                                    <span className="font-mono text-green-400">{inv.amount.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</span>
                                </div>
                           ))}
                           {investors.length === 0 && <p className="text-sm text-slate-500 text-center pt-8">Esperando la primera inversión...</p>}
                        </div>
                    </div>
                </div>

                {/* Columna de la Distribución */}
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Distribución de Inversores</h3>
                    <div className="flex-grow flex items-center justify-center">
                        {distributionData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        nameKey="name"
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-sm text-slate-500">Sin datos de inversores para mostrar.</p>
                        )}
                    </div>
                </div>
            </div>

            {status === 'PREPARING' && (
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl animate-fade-in">
                    <h3 className="text-2xl font-bold mb-4">La Oferta de Tokens de Seguridad está lista.</h3>
                    <button
                        onClick={onStartSTO}
                        className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 text-lg"
                    >
                        🚀 Iniciar STO
                    </button>
                </div>
            )}
        </div>
    );
};