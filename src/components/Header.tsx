import React from 'react';
import {
  Bell,
  GraduationCap,
  Moon,
  Search,
  Sparkles,
  Sun,
} from 'lucide-react';
import { NavigationTab, UserMode } from '../types';

interface HeaderProps {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenUpdateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userMode,
  setUserMode,
  darkMode,
  setDarkMode,
  setActiveTab,
  onOpenUpdateModal,
}) => {
  const modeBadgeLabels: Record<UserMode, { label: string; bg: string }> = {
    sd: { label: 'Mode SD', bg: 'bg-[#ECFDF5] text-[#065F46] border-[#065F46]/30 dark:bg-emerald-950 dark:text-emerald-200' },
    smp: { label: 'Mode SMP', bg: 'bg-teal-50 text-teal-800 border-teal-300 dark:bg-teal-950 dark:text-teal-200' },
    sma: { label: 'Mode SMA', bg: 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200' },
    mahasiswa: { label: 'Mode Mahasiswa', bg: 'bg-indigo-50 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-200' },
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-[#065F46]/10 dark:border-slate-800 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Greeting Section */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-serif font-bold text-[#065F46] dark:text-emerald-300 tracking-tight">
              Assalamualaikum
            </span>
            <span className="inline-block animate-bounce text-[#D4AF37]">✨</span>
          </div>
          <p className="text-xs md:text-sm text-[#718096] dark:text-slate-400 font-medium hidden sm:block italic">
            Selamat datang di Syariah App - Platform Dalil & Belajar Syariah Digital
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Global Search Trigger */}
          <button
            onClick={() => setActiveTab('pencarian')}
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#2D3648] dark:text-slate-200 text-xs font-medium border border-[#065F46]/20 dark:border-slate-700 shadow-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-[#065F46] dark:text-emerald-400" />
            <span>Cari ayat, hadis, atau fikih...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#FAF9F5] dark:bg-slate-900 text-[10px] text-slate-400 border border-slate-200 dark:border-slate-700 font-mono">
              /
            </kbd>
          </button>

          {/* User Mode Selector Badge */}
          <div className="relative group">
            <button
              onClick={() => setActiveTab('beranda')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold border shadow-xs transition-transform active:scale-95 ${modeBadgeLabels[userMode].bg}`}
              title="Klik untuk mengubah Mode Pembelajaran"
            >
              <GraduationCap className="w-4 h-4 text-[#065F46] dark:text-emerald-400" />
              <span>{modeBadgeLabels[userMode].label}</span>
            </button>
          </div>

          {/* Notification Bell / Update Trigger */}
          <button
            onClick={onOpenUpdateModal}
            className="relative p-2 rounded-xl bg-white dark:bg-slate-800 text-[#065F46] dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-[#065F46]/10 dark:border-slate-700 shadow-xs transition-colors"
            title="Pembaruan & Notifikasi"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 text-[#065F46] dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-[#065F46]/10 dark:border-slate-700 shadow-xs transition-colors"
            title={darkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-[#D4AF37]" />
            ) : (
              <Moon className="w-5 h-5 text-[#065F46]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
