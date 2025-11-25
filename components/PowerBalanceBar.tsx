import React from 'react';

interface PowerBalanceBarProps {
  konohaPercentage: number;
}

export const PowerBalanceBar: React.FC<PowerBalanceBarProps> = ({ konohaPercentage }) => {
  // Clamp value between 0 and 100
  const validPercentage = Math.max(0, Math.min(100, konohaPercentage));
  const kiriPercentage = 100 - validPercentage;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-2 px-1">
        <span className="text-konoha-dark font-display font-bold text-lg uppercase tracking-wider">
          Konoha
        </span>
        <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">
          Balance de Guerra
        </span>
        <span className="text-kiri-dark font-display font-bold text-lg uppercase tracking-wider">
          Kirigakure
        </span>
      </div>
      
      <div className="h-6 w-full flex rounded-full overflow-hidden shadow-inner bg-gray-200 border border-gray-300">
        <div 
          className="h-full bg-konoha transition-all duration-700 ease-in-out flex items-center justify-start pl-2"
          style={{ width: `${validPercentage}%` }}
        >
          {validPercentage > 15 && <span className="text-white text-[10px] font-bold opacity-80">{validPercentage}%</span>}
        </div>
        <div 
          className="h-full bg-kiri transition-all duration-700 ease-in-out flex items-center justify-end pr-2"
          style={{ width: `${kiriPercentage}%` }}
        >
          {kiriPercentage > 15 && <span className="text-white text-[10px] font-bold opacity-80">{kiriPercentage}%</span>}
        </div>
      </div>
    </div>
  );
};