import React from 'react';
import { Settings, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = React.useState(false);

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
    <div className="fixed bottom-4 right-4 w-72 bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 z-50">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="font-bold text-slate-800 text-sm">Panel de Admin</h3>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

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
              className="w-full border rounded px-2 py-1 text-sm"
            />
           </div>
           <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Protegidos</label>
            <input 
              type="number" 
              value={protectedSeals}
              onChange={(e) => setProtectedSeals(Number(e.target.value))}
              className="w-full border rounded px-2 py-1 text-sm"
            />
           </div>
        </div>

        <button 
          onClick={triggerPopup}
          className="w-full bg-emerald-600 text-white text-xs font-bold py-2 rounded hover:bg-emerald-700 transition"
        >
          Enviar Anuncio Pop-up
        </button>
      </div>
    </div>
  );
};