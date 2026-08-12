import React from 'react';

export const ArchHeader: React.FC<{ title: string; subtitle?: string; className?: string }> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#065F46] to-[#0A4D39] text-white p-8 md:p-10 shadow-2xl border border-[#065F46]/40 ${className}`}>
      {/* Background Geometric Arch Overlay */}
      <div className="absolute -right-8 -top-12 opacity-15 pointer-events-none">
        <svg width="320" height="320" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M100 10 C150 10, 190 50, 190 100 L10 100 C10 50, 50 10, 100 10 Z" stroke="#D4AF37" strokeWidth="3" />
          <polygon points="100,20 120,60 160,60 130,90 145,130 100,105 55,130 70,90 40,60 80,60" stroke="#D4AF37" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37] text-[#065F46] text-[10px] font-extrabold uppercase tracking-widest mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] animate-pulse"></span>
          Syariah App Digital Platform
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-white mb-3 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-emerald-100 opacity-90 text-sm md:text-base leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Gold bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-emerald-300 to-[#D4AF37] opacity-90" />
    </div>
  );
};

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent flex-1" />
      <div className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37] border border-[#D4AF37]" />
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent flex-1" />
    </div>
  );
};

export const DomeBadge: React.FC<{ label: string; icon?: React.ReactNode; variant?: 'emerald' | 'gold' | 'mint' }> = ({
  label,
  icon,
  variant = 'emerald',
}) => {
  const styles = {
    emerald: 'bg-[#ECFDF5] text-[#065F46] border-[#065F46]/20 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800',
    gold: 'bg-amber-50 text-amber-900 border-[#D4AF37]/40 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
    mint: 'bg-teal-50 text-teal-900 border-teal-200 dark:bg-teal-950/60 dark:text-teal-200 dark:border-teal-800',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[variant]} transition-all duration-200 shadow-2xs`}>
      {icon}
      <span>{label}</span>
    </span>
  );
};
