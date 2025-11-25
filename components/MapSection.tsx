import React from 'react';
import { MapPin } from 'lucide-react';

interface MarkerProps {
  top: string;
  left: string;
  label: string;
  colorClass: string;
  delay?: string;
  coords: string;
}

const Marker: React.FC<MarkerProps> = ({ top, left, label, colorClass, delay, coords }) => {
  return (
    <div 
      className="absolute group/marker z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 hover:z-20"
      style={{ top, left }}
    >
      <MapPin 
        className={`w-6 h-6 drop-shadow-md animate-bounce ${colorClass}`} 
        style={{ animationDelay: delay || '0s' }} 
        fill="currentColor" 
      />
      
      {/* Tooltip - Coordinates & Label */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center opacity-0 group-hover/marker:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <div className="bg-slate-800/90 backdrop-blur text-white text-[10px] px-3 py-1.5 rounded-lg shadow-xl border border-slate-700 flex flex-col items-center z-30">
          <span className="font-display font-bold tracking-wide uppercase text-emerald-400 mb-0.5">{label}</span>
          <span className="font-mono text-[9px] text-slate-300">
            {coords}
          </span>
        </div>
        {/* Arrow */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-800/90"></div>
      </div>
    </div>
  );
};

export const MapSection: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-2xl p-1 border border-emerald-100 shadow-sm overflow-hidden">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-emerald-50 group">
            {/* 
              Map Image: Shinobi World Map
            */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/World_of_Naruto_Map.svg/2560px-World_of_Naruto_Map.svg.png" 
              alt="Mapa del Mundo Shinobi" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay for integration with app theme */}
            <div className="absolute inset-0 bg-emerald-900/5 pointer-events-none mix-blend-overlay"></div>

            {/* Markers */}
            <Marker 
              top="60%" 
              left="48%" 
              label="Konoha" 
              colorClass="text-konoha" 
              coords="35°41′N 139°46′E"
            />

            <Marker 
              top="55%" 
              left="88%" 
              label="Kirigakure" 
              colorClass="text-kiri" 
              delay="0.5s"
              coords="34°20′N 134°10′E" 
            />

            {/* Seal Location Example - Land of Earth */}
             <Marker 
              top="25%" 
              left="20%" 
              label="Sello Detectado" 
              colorClass="text-amber-500" 
              delay="1s"
              coords="40°12′N 128°30′E"
            />
            
            {/* Seal Location Example - Land of Lightning */}
             <Marker 
              top="20%" 
              left="75%" 
              label="Sello Detectado" 
              colorClass="text-amber-500" 
              delay="1.5s"
              coords="38°50′N 136°40′E"
            />

            {/* UI Overlay */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-emerald-800 shadow-sm border border-emerald-100 flex items-center gap-2 pointer-events-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Rastreo Satelital Activo
            </div>
        </div>
    </div>
  );
};