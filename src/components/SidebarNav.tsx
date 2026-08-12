import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  BookText,
  Calculator,
  ChevronRight,
  Compass,
  GraduationCap,
  HelpCircle,
  History,
  Home,
  Info,
  Layers,
  Menu,
  Search,
  Settings,
  X,
} from 'lucide-react';
import { NavigationTab, UserMode } from '../types';

interface SidebarNavProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  darkMode: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  userMode,
  setUserMode,
  darkMode,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'quran', label: "Al-Qur'an", icon: <BookOpen className="w-5 h-5" />, badge: '114 Surah' },
    { id: 'hadis', label: 'Hadis Digital', icon: <BookText className="w-5 h-5" />, badge: 'Kitab' },
    { id: 'kalkulator-waris', label: 'Kalkulator Waris', icon: <Calculator className="w-5 h-5" />, badge: 'Fiqh' },
    { id: 'pencarian', label: 'Pencarian Global', icon: <Search className="w-5 h-5" /> },
    { id: 'bookmark', label: 'Bookmark / Simpan', icon: <Bookmark className="w-5 h-5" /> },
    { id: 'riwayat', label: 'Riwayat Belajar', icon: <History className="w-5 h-5" /> },
    { id: 'kuis', label: 'Kuis Interaktif', icon: <HelpCircle className="w-5 h-5" />, badge: 'Uji' },
    { id: 'pengaturan', label: 'Pengaturan', icon: <Settings className="w-5 h-5" /> },
    { id: 'tentang', label: 'Tentang Aplikasi', icon: <Info className="w-5 h-5" /> },
  ];

  const modeConfig: Record<UserMode, { label: string; badge: string; color: string; desc: string }> = {
    sd: { label: 'Mode SD', badge: 'SD', color: 'bg-emerald-500 text-white', desc: 'Materi dasar & kisah islami' },
    smp: { label: 'Mode SMP', badge: 'SMP', color: 'bg-teal-600 text-white', desc: 'Fiqh ibadah & rukun Islam' },
    sma: { label: 'Mode SMA', badge: 'SMA', color: 'bg-emerald-700 text-white', desc: 'Fiqh muamalah & waris dasar' },
    mahasiswa: { label: 'Mode Mahasiswa', badge: 'MHS', color: 'bg-amber-600 text-white', desc: 'Usul Fiqh & kitab rujukan' },
  };

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#065F46] text-white z-40 px-4 flex items-center justify-between shadow-md border-b border-[#0A4D39]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#065F46] font-black flex items-center justify-center text-sm shadow">
              ☪
            </div>
            <span className="font-bold text-lg tracking-wide font-sans text-white">Syariah App</span>
          </div>
        </div>

        {/* Active Mode Pill */}
        <button
          onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-xs font-semibold text-amber-200"
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{modeConfig[userMode].badge}</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container (Desktop Persistent, Mobile Drawer) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#065F46] text-emerald-50 border-r border-[#0A4D39] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="relative overflow-hidden">
          {/* Subtle Islamic Geometric Star Background Pattern */}
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
              <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="#FFF" />
              <circle cx="50" cy="50" r="35" stroke="#FFF" strokeWidth="1" />
            </svg>
          </div>

          {/* Sidebar Logo Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#065F46] font-black flex items-center justify-center text-xl shadow-lg">
                ☪
              </div>
              <div>
                <h1 className="font-extrabold text-lg tracking-tight text-white font-sans">Syariah App</h1>
                <p className="text-[11px] text-[#D4AF37] font-medium">Edukasi & Dalil Digital</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Mode Switcher Selector */}
          <div className="p-4 border-b border-white/10 bg-black/10">
            <div className="relative">
              <button
                onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 border border-emerald-800 text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${modeConfig[userMode].color}`}>
                    {modeConfig[userMode].badge}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{modeConfig[userMode].label}</div>
                    <div className="text-[10px] text-emerald-300/80 truncate max-w-[130px]">
                      {modeConfig[userMode].desc}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-emerald-300 transition-transform ${isModeDropdownOpen ? 'rotate-90' : ''}`} />
              </button>

              {/* Mode Selector Dropdown */}
              {isModeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-emerald-900 border border-emerald-700/80 rounded-xl shadow-2xl z-50 space-y-1">
                  {(['sd', 'smp', 'sma', 'mahasiswa'] as UserMode[]).map((modeKey) => (
                    <button
                      key={modeKey}
                      onClick={() => {
                        setUserMode(modeKey);
                        setIsModeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium transition-all ${
                        userMode === modeKey
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                          : 'text-emerald-100 hover:bg-emerald-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${modeConfig[modeKey].color}`}>
                          {modeConfig[modeKey].badge}
                        </span>
                        <span>{modeConfig[modeKey].label}</span>
                      </div>
                      {userMode === modeKey && <span className="text-amber-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
            <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#D4AF37]">
              Navigasi Utama
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-white/10 text-white font-bold rounded-xl border-l-4 border-[#D4AF37] shadow-xs'
                      : 'text-emerald-100 hover:bg-white/5 hover:text-white rounded-xl'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#D4AF37]' : 'text-emerald-200 group-hover:text-white'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-[#D4AF37] text-[#065F46]' : 'bg-white/10 text-emerald-200 border border-white/10'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center gap-3 text-xs text-emerald-200/80">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="truncate">Syariah App v1.2.0 • Online</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Quick Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#065F46] backdrop-blur-md border-t border-[#0A4D39] z-40 px-2 flex items-center justify-around text-emerald-200 shadow-2xl">
        {[
          { id: 'beranda', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
          { id: 'quran', label: "Qur'an", icon: <BookOpen className="w-5 h-5" /> },
          { id: 'hadis', label: 'Hadis', icon: <BookText className="w-5 h-5" /> },
          { id: 'kalkulator-waris', label: 'Waris', icon: <Calculator className="w-5 h-5" /> },
          { id: 'pencarian', label: 'Cari', icon: <Search className="w-5 h-5" /> },
        ].map((btn) => {
          const isActive = activeTab === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveTab(btn.id as NavigationTab)}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl text-[11px] font-medium transition-all ${
                isActive ? 'text-[#D4AF37] font-bold scale-105' : 'text-emerald-100/70 hover:text-white'
              }`}
            >
              {btn.icon}
              <span className="mt-0.5">{btn.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
