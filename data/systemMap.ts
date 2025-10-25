import React from 'react';
// FIX: Removed conflicting local declaration of 'SystemElement'. The type is now imported from 'types.ts'.
import type { SystemElement, View, SystemCategory } from '../types';

const iconClass = "h-5 w-5 mr-3 transition-colors duration-200";

const CreatorIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }));
const LibraryIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }));
const ProIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" }));
const AcademiaIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { d: "M12 14l9-5-9-5-9 5 9 5z" }), React.createElement('path', { d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12l5.373 2.986" }));
const EditorIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }));
const GalleryIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }));
const LayoutsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 10h16M4 14h16M4 18h16" }));
const TasksIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }));
const HubIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }));
const LabIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.25 10.25l2.387.477a2 2 0 011.022.547l-2.387-.477a6 6 0 01-3.86-.517l-.318-.158a6 6 0 00-3.86-.517l-2.387-.477a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" }));
const KnowledgeIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }));
const ConverterIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" }));
const OptimizerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }));
const VisualizerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" }));
const EnergyIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 10V3L4 14h7v7l9-11h-7z" }));
const GuideIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }));
const GameIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
);
const DesignerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }));
const AtriumIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
  React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 10h18M3 14h18M3 18h18M4 22h16M7 10V4l5-3 5 3v6" })
);
const HMIControlRoomIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" }));
const AssayManagerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" }));
const Hyperion9Icon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" }));
const Aegis9Icon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 22.4l.05-.002.05.002a12.02 12.02 0 008.95-2.056A12.02 12.02 0 0021 20.944a11.955 11.955 0 01-2.382-3.04z" }));
const PhoenixIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.771-2.59 6.96-6.062 7.773M6.343 7.343A7.963 7.963 0 014 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8c-1.42 0-2.744.372-3.861 1.014" }));
const IAStudioIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
  React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }),
  React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 12l3-3 3 3 4-4" })
);
const VulcanoIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"},
  React.createElement('path', { d: "M2 22h20" }),
  React.createElement('path', { d: "M15.4 15.4C14 16.8 12 17 10 17c-2 0-4-.2-5.4-1.6" }),
  React.createElement('path', { d: "M15.4 11.4C14 12.8 12 13 10 13c-2 0-4-.2-5.4-1.6" }),
  React.createElement('path', { d: "m18 2-1 4-2-1-1 4-2-1-1 4-2-1-1 4" }),
  React.createElement('path', { d: "m22 6-1 4-2-1-1 4-2-1-1 4-2-1-1 4" })
);

const ChronosIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }));
const AgriDeFiIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 10h18M3 14h18M3 18h18M4 22h16M7 10V4l5-3 5 3v6" }));
const GaiaLabIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.25 10.25l2.387.477a2 2 0 011.022.547l-2.387-.477a6 6 0 01-3.86-.517l-.318-.158a6 6 0 00-3.86-.517l-2.387-.477a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 01.547-1.806z" }));
const ForgeIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"},
  React.createElement('path', { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5-2 4.5-2 4.5"}),
  React.createElement('path', { d: "M14.5 14.5a2.5 2.5 0 0 0 2.5-2.5c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5-2 4.5-2 4.5"}),
  React.createElement('path', { d: "M2 16h20"}),
  React.createElement('path', { d: "M7 16v4"}),
  React.createElement('path', { d: "M17 16v4"})
);
const KairosIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, 
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" })
);
const OrchestratorIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }));
const CatalystLabIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 2v11a5 5 0 0 0 10 0V2M5 5h14" }), React.createElement('circle', { cx: '12', cy: '16', r: '1' }), React.createElement('circle', { cx: '9', cy: '13', r: '1' }), React.createElement('circle', { cx: '15', cy: '13', r: '1' }));
const UtilitiesIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" }));
const GenerativeSimulatorIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2" }, React.createElement('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.771-2.59 6.96-6.062 7.773M6.343 7.343A7.963 7.963 0 014 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8c-1.42 0-2.744.372-3.861 1.014" }));
const CircularFleetIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v-4m-4-6h-2a2 2 0 00-2 2v6a2 2 0 002 2h2v-4m4 4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4l-3-3m0 3l3-3" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 21a2 2 0 01-2-2v-1.5a2.5 2.5 0 00-5 0V19a2 2 0 01-2 2" })
);
const EnergyExplorerIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }));


export const SYSTEM_MAP: SystemElement[] = [
    // Creación
    { id: 'creator', nameKey: 'view.creator', icon: CreatorIcon(), type: 'Creación' },
    { id: 'pro', nameKey: 'view.pro', icon: ProIcon(), type: 'Creación' },
    { id: 'editor', nameKey: 'view.editor', icon: EditorIcon(), type: 'Creación' },
    
    // Inspiración
    { id: 'library', nameKey: 'view.library', icon: LibraryIcon(), type: 'Inspiración' },
    { id: 'gallery', nameKey: 'view.gallery', icon: GalleryIcon(), type: 'Inspiración' },
    { id: 'pro-layouts', nameKey: 'view.proLayouts', icon: LayoutsIcon(), type: 'Inspiración' },
    { id: 'academia', nameKey: 'view.academia', icon: AcademiaIcon(), type: 'Inspiración' },
    
    // Simulación Industrial
    { id: 'phoenix', nameKey: 'view.phoenix', icon: PhoenixIcon(), type: 'Simulación Industrial' },
    { id: 'vulcano', nameKey: 'view.vulcano', icon: VulcanoIcon(), type: 'Simulación Industrial' },
    { id: 'hmi-control-room', nameKey: 'view.hmiControlRoom', icon: HMIControlRoomIcon(), type: 'Simulación Industrial' },
    { id: 'hyperion-9', nameKey: 'view.hyperion9', icon: Hyperion9Icon(), type: 'Simulación Industrial' },
    { id: 'aegis-9', nameKey: 'view.aegis9', icon: Aegis9Icon(), type: 'Simulación Industrial' },
    { id: 'pyrolysis-hub', nameKey: 'view.pyrolysisHub', icon: HubIcon(), type: 'Simulación Industrial' },
    { id: 'gaia-lab', nameKey: 'view.gaiaLab', icon: GaiaLabIcon(), type: 'Simulación Industrial' },
    { id: 'bioeconomy-lab', nameKey: 'view.bioeconomyLab', icon: IAStudioIcon(), type: 'Simulación Industrial' },
    { id: 'catalyst-lab', nameKey: 'view.catalystLab', icon: CatalystLabIcon(), type: 'Simulación Industrial' },
    { id: 'comparative-lab', nameKey: 'view.comparativeLab', icon: LabIcon(), type: 'Simulación Industrial' },
    { id: 'innovation-forge', nameKey: 'view.innovationForge', icon: ForgeIcon(), type: 'Simulación Industrial' },
    { id: 'process-optimizer', nameKey: 'view.processOptimizer', icon: OptimizerIcon(), type: 'Simulación Industrial' },
    { id: 'experiment-designer', nameKey: 'view.experimentDesigner', icon: DesignerIcon(), type: 'Simulación Industrial' },
    { id: 'energy-balance', nameKey: 'view.energyBalance', icon: EnergyIcon(), type: 'Simulación Industrial' },
    { id: 'cogeneration-simulator', nameKey: 'view.cogenerationSimulator', icon: EnergyIcon(), type: 'Simulación Industrial' },
    { id: 'fleet-simulator', nameKey: 'view.fleetSimulator', icon: OrchestratorIcon(), type: 'Simulación Industrial' },
    { id: 'utilities-simulator', nameKey: 'view.utilitiesSimulator', icon: UtilitiesIcon(), type: 'Simulación Industrial' },
    { id: 'circular-fleet', nameKey: 'view.circularFleet', icon: CircularFleetIcon(), type: 'Simulación Industrial' },
    
    // Análisis Estratégico
    { id: 'generative-simulator', nameKey: 'view.generativeSimulator', icon: GenerativeSimulatorIcon(), type: 'Análisis Estratégico' },
    { id: 'energy-explorer', nameKey: 'view.energyExplorer', icon: EnergyExplorerIcon(), type: 'Análisis Estratégico' },

    // Finanzas Descentralizadas
    { id: 'chronos', nameKey: 'view.chronos', icon: ChronosIcon(), type: 'Finanzas Descentralizadas' },
    { id: 'kairos-panel', nameKey: 'view.kairos', icon: KairosIcon(), type: 'Finanzas Descentralizadas' },
    { id: 'agriDeFi', nameKey: 'view.agriDeFi', icon: AgriDeFiIcon(), type: 'Finanzas Descentralizadas' },

    // Análisis y Datos
    { id: 'tasks', nameKey: 'view.tasks', icon: TasksIcon(), type: 'Análisis y Datos' },
    { id: 'assay-manager', nameKey: 'view.assayManager', icon: AssayManagerIcon(), type: 'Análisis y Datos' },
    { id: 'property-visualizer', nameKey: 'view.propertyVisualizer', icon: VisualizerIcon(), type: 'Análisis y Datos' },
    { id: 'knowledge-base', nameKey: 'view.knowledgeBase', icon: KnowledgeIcon(), type: 'Análisis y Datos' },
    { id: 'unit-converter', nameKey: 'view.unitConverter', icon: ConverterIcon(), type: 'Análisis y Datos' },
    
    // Sistema
    { id: 'titans-atrium', nameKey: 'view.titansAtrium', icon: AtriumIcon(), type: 'Sistema' },
    { id: 'user-guide', nameKey: 'view.userGuide', icon: GuideIcon(), type: 'Sistema' },
    { id: 'game', nameKey: 'view.game', icon: GameIcon(), type: 'Sistema' },
];