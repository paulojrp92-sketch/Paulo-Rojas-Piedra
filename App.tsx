import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Zap, Scroll, Menu, User } from 'lucide-react';
import { CloudBackground } from './components/CloudBackground';
import { PowerBalanceBar } from './components/PowerBalanceBar';
import { StatCard } from './components/StatCard';
import { MapSection } from './components/MapSection';
import { AdminPanel } from './components/AdminPanel';
import { PopupNotification } from './components/PopupNotification';
import { GlobalState } from './types';

const STORAGE_KEY = 'shinobi_gaiden_state';
const CHANNEL_NAME = 'shinobi_gaiden_sync';

const DEFAULT_STATE: GlobalState = {
  activeSeals: 12,
  protectedSeals: 5,
  konohaPercentage: 65,
  lastPopupTimestamp: 0,
};

const App: React.FC = () => {
  // Initialize state from localStorage or default
  const [state, setState] = useState<GlobalState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_STATE;
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Track the last timestamp we processed to avoid re-opening the popup if the user closed it
  const [lastProcessedPopupTime, setLastProcessedPopupTime] = useState(state.lastPopupTimestamp);

  // Broadcast Channel for cross-tab sync
  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);

    const handleMessage = (event: MessageEvent) => {
      if (event.data) {
        setState(event.data);
      }
    };

    channel.onmessage = handleMessage;

    return () => {
      channel.close();
    };
  }, []);

  // Sync with localStorage and trigger popup if timestamp changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    
    // Check if there is a new popup announcement
    if (state.lastPopupTimestamp > lastProcessedPopupTime && state.lastPopupTimestamp > 0) {
      setIsPopupOpen(true);
      setLastProcessedPopupTime(state.lastPopupTimestamp);
    }
  }, [state, lastProcessedPopupTime]);

  // Helper to update state and broadcast
  const updateGlobalState = useCallback((updates: Partial<GlobalState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage(newState);
      channel.close();
      return newState;
    });
  }, []);

  // Admin Actions
  const handleSetActiveSeals = (val: number) => updateGlobalState({ activeSeals: val });
  const handleSetProtectedSeals = (val: number) => updateGlobalState({ protectedSeals: val });
  const handleSetKonohaPercentage = (val: number) => updateGlobalState({ konohaPercentage: val });
  
  const triggerPopup = () => {
    updateGlobalState({ lastPopupTimestamp: Date.now() });
  };

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
            <PowerBalanceBar konohaPercentage={state.konohaPercentage} />
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
                    value={state.activeSeals} 
                    icon={Zap} 
                    colorClass="text-amber-500" 
                />
                <StatCard 
                    label="Protegidos" 
                    value={state.protectedSeals} 
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
        activeSeals={state.activeSeals}
        setActiveSeals={handleSetActiveSeals}
        protectedSeals={state.protectedSeals}
        setProtectedSeals={handleSetProtectedSeals}
        konohaPercentage={state.konohaPercentage}
        setKonohaPercentage={handleSetKonohaPercentage}
        triggerPopup={triggerPopup}
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