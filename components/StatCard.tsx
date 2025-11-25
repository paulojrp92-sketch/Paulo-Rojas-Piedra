import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  colorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center min-w-[140px] flex-1">
      <div className={`p-3 rounded-full bg-opacity-10 mb-3 ${colorClass.replace('text-', 'bg-')}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <span className="text-4xl font-display font-bold text-slate-800 mb-1">
        {value}
      </span>
      <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">
        {label}
      </span>
    </div>
  );
};