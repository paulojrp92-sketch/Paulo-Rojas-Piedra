import React, { useState } from 'react';
import { Shield, Zap, Scroll, Menu, User } from 'lucide-react';
import { CloudBackground } from './components/CloudBackground';
import { PowerBalanceBar } from './components/PowerBalanceBar';
import { StatCard } from './components/StatCard';
import { MapSection } from './components/MapSection';
import { AdminPanel } from './components/AdminPanel';
import { PopupNotification } from './components/PopupNotification';

const App: React.FC = () => {
  // State for the application
  const [activeSeals, setActiveSeals] = useState(12);
  const [protectedSeals, setProtectedSeals] = useState(5);
  const [konohaPercentage, setKonohaPercentage] = useState(65); // Default: Konoha winning slightly
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-slate-800">
      <CloudBackground />
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
            <button className="p-2 text-slate-500 hover:bg-emerald-50 rounded-full transition-colors">
                <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-display font-bold text-2xl tracking-tight text-emerald-950 uppercase">
                Shinobi Gaiden
            </h1>
            <button className="p-2 text-slate-500 hover:bg-emerald-50 rounded-full transition-colors">
                <User className="w-5 h-5" />
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6 pb-24">
        
        {/* Power Balance Section */}
        <section className="mb-8">
            <PowerBalanceBar konohaPercentage={konohaPercentage} />
        </section>

        {/* Seals Status Section */}
        <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
                <Scroll className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                    Sellos (Descubiertos)
                </h2>
            </div>
            
            <div className="flex gap-4 w-full">
                <StatCard 
                    label="Activos" 
                    value={activeSeals} 
                    icon={Zap} 
                    colorClass="text-amber-500" 
                />
                <StatCard 
                    label="Protegidos" 
                    value={protectedSeals} 
                    icon={Shield} 
                    colorClass="text-emerald-600" 
                />
            </div>
        </section>

        {/* Map Section */}
        <section>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Localización de Sellos
                    </h2>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border">LIVE</span>
            </div>
            <MapSection />
             <p className="mt-4 text-xs text-center text-slate-400 max-w-xs mx-auto">
                El mapa se actualiza en tiempo real según los informes de los ANBU en el campo.
            </p>
        </section>

      </main>

      {/* Admin / Interactive Demo Controls */}
      <AdminPanel 
        activeSeals={activeSeals}
        setActiveSeals={setActiveSeals}
        protectedSeals={protectedSeals}
        setProtectedSeals={setProtectedSeals}
        konohaPercentage={konohaPercentage}
        setKonohaPercentage={setKonohaPercentage}
        triggerPopup={() => setIsPopupOpen(true)}
      />

      {/* Popups */}
      <PopupNotification 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />

    </div>
  );
};

export default App;