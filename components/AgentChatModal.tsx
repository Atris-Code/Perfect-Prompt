import React, { useState, useEffect, useRef } from 'react';
import type { CharacterProfile, ChatMessage } from '../types';

interface AgentChatModalProps {
  agent: CharacterProfile;
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatMessage[];
  onSendMessage: (message: string, file?: { name: string; type: string; data: string; }) => void;
  isAgentReplying: boolean;
}

const AgentChatModal: React.FC<AgentChatModalProps> = ({
  agent,
  isOpen,
  onClose,
  chatHistory,
  onSendMessage,
  isAgentReplying,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chatHistory]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
    // Reset file input to allow selecting the same file again
    e.target.value = '';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputMessage.trim() && !selectedFile) || isAgentReplying) return;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const fileData = loadEvent.target?.result as string;
        onSendMessage(inputMessage.trim(), {
          name: selectedFile.name,
          type: selectedFile.type,
          data: fileData,
        });
        setSelectedFile(null);
        setInputMessage('');
      };
      reader.readAsDataURL(selectedFile);
    } else {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden transform animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-900/50 flex-shrink-0">
          <div>
            <h3 id="chat-modal-title" className="text-xl font-bold text-cyan-400">
              Conversando con {agent.claveName}
            </h3>
            <p className="text-sm text-gray-400">{agent.archetype}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Cerrar chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="flex-grow p-6 overflow-y-auto space-y-6">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && (
                 <div className="w-8 h-8 rounded-full bg-cyan-500 flex-shrink-0 flex items-center justify-center text-gray-900 font-bold text-sm">
                   {agent.claveName.charAt(0)}
                 </div>
              )}
              <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                 {msg.file && (
                  <div className="mb-2">
                    {msg.file.type.startsWith('image/') ? (
                      <img src={msg.file.data} alt={msg.file.name} className="max-w-xs rounded-lg" />
                    ) : msg.file.type.startsWith('audio/') ? (
                      <audio controls src={msg.file.data} className="w-full" />
                    ) : msg.file.type.startsWith('video/') ? (
                       <video controls src={msg.file.data} className="max-w-xs rounded-lg" />
                    ) : (
                      <div className="p-3 bg-gray-600 rounded-lg flex items-center gap-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                        <span className="text-xs truncate">{msg.file.name}</span>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
               {msg.role === 'user' && (
                 <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                   TÚ
                 </div>
              )}
            </div>
          ))}
          {isAgentReplying && (
            <div className="flex items-start gap-3">
               <div className="w-8 h-8 rounded-full bg-cyan-500 flex-shrink-0 flex items-center justify-center text-gray-900 font-bold text-sm">
                 {agent.claveName.charAt(0)}
               </div>
               <div className="max-w-md lg:max-w-lg p-3 rounded-2xl bg-gray-700 rounded-bl-none flex items-center">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
                    <div style={{animationDelay: '0.2s'}} className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                    <div style={{animationDelay: '0.4s'}} className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 bg-gray-900/50 border-t border-gray-700 flex-shrink-0">
          {selectedFile && (
            <div className="px-2 pb-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-300 bg-gray-700 px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                <span className="truncate max-w-xs">{selectedFile.name}</span>
              </div>
              <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-white font-bold p-1">&times;</button>
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Adjuntar archivo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={isAgentReplying}
              className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={(!inputMessage.trim() && !selectedFile) || isAgentReplying}
              className="bg-cyan-500 text-gray-900 p-2 rounded-full hover:bg-cyan-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
              aria-label="Enviar mensaje"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </footer>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AgentChatModal;