import React, { useState } from 'react';
import { Settings, X, Lock, KeyRound } from 'lucide-react';

interface AdminPanelProps {
  activeSeals: number;
  setActiveSeals: (val: number) => void;
  protectedSeals: number;
  setProtectedSeals: (val: number) => void;
  konohaPercentage: number;
  setKonohaPercentage: (val: number) => void;
  triggerPopup: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  activeSeals,
  setActiveSeals,
  protectedSeals,
  setProtectedSeals,
  konohaPercentage,
  setKonohaPercentage,
  triggerPopup
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'PauloRLZ') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const resetAndClose = () => {
    setIsOpen(false);
    // Optional: setIsAuthenticated(false); // Uncomment if you want to require login every time it opens
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-colors z-50 opacity-50 hover:opacity-100"
        title="Admin Controls"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 z-50 animate-[fadeIn_0.2s_ease-out]">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          {isAuthenticated ? <Settings className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          Panel de Admin
        </h3>
        <button onClick={resetAndClose} className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">
              Contraseña Requerida
            </label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese contraseña..."
                className={`w-full border rounded px-3 py-2 text-sm pl-9 outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-emerald-200'}`}
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
            {error && <p className="text-red-500 text-[10px] mt-1">Contraseña incorrecta</p>}
          </div>
          <button 
            type="submit"
            className="w-full bg-slate-800 text-white text-xs font-bold py-2 rounded hover:bg-slate-700 transition"
          >
            Acceder
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">
              Guerra (Konoha %)
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={konohaPercentage}
              onChange={(e) => setKonohaPercentage(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{konohaPercentage}%</span>
              <span>{100 - konohaPercentage}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
             <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">Activos</label>
              <input 
                type="number" 
                value={activeSeals}
                onChange={(e) => setActiveSeals(Number(e.target.value))}
                className="w-full border rounded px-2 py-1 text-sm outline-none focus:border-emerald-400"
              />
             </div>
             <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">Protegidos</label>
              <input 
                type="number" 
                value={protectedSeals}
                onChange={(e) => setProtectedSeals(Number(e.target.value))}
                className="w-full border rounded px-2 py-1 text-sm outline-none focus:border-emerald-400"
              />
             </div>
          </div>

          <div className="pt-2 border-t border-dashed">
             <button 
              onClick={triggerPopup}
              className="w-full bg-emerald-600 text-white text-xs font-bold py-2 rounded hover:bg-emerald-700 transition flex items-center justify-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Enviar Anuncio Pop-up
            </button>
            <p className="text-[10px] text-slate-400 mt-1 text-center">
              Esto activará el anuncio para todos los usuarios.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};