import React from 'react';

export const CloudBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-40">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cloud-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
             <path 
               d="M25,50 Q35,35 50,40 Q60,25 75,40 Q90,35 90,55 Q95,65 85,75 Q75,85 50,80 Q30,85 15,70 Q5,60 15,50 Q20,40 25,50 Z" 
               fill="none" 
               stroke="#10b981" 
               strokeWidth="1.5" 
               opacity="0.2"
             />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#cloud-pattern)" />
      </svg>
    </div>
  );
};