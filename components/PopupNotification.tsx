import React from 'react';
import { AlertCircle, X, ExternalLink } from 'lucide-react';

interface PopupNotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PopupNotification: React.FC<PopupNotificationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border-l-4 border-emerald-500 animate-[fadeIn_0.3s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 p-3 rounded-full shrink-0">
             <AlertCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-slate-800 mb-2">
              ¡Sello Descubierto!
            </h3>
            <p className="text-slate-600 mb-4 leading-relaxed text-sm">
              Nuestros exploradores han encontrado una nueva ubicación. 
              La ventaja táctica podría cambiar en cualquier momento.
            </p>
            <button className="flex items-center gap-2 text-emerald-700 font-bold text-sm hover:underline">
              Consulta el foro para más información <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};