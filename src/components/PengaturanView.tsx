import React from 'react';
import {
  Bell,
  CheckCircle2,
  Globe,
  Moon,
  RefreshCw,
  Search,
  Settings,
  Sliders,
  Sun,
  Type,
} from 'lucide-react';
import { AppSettings } from '../types';
import { ArchHeader } from './IslamicPattern';

interface PengaturanViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onOpenUpdateModal: () => void;
}

export const PengaturanView: React.FC<PengaturanViewProps> = ({
  settings,
  onUpdateSettings,
  onOpenUpdateModal,
}) => {
  return (
    <div className="space-y-6 pb-12">
      <ArchHeader
        title="Pengaturan Aplikasi Syariah App"
        subtitle="Sesuaikan mode tampilan, ukuran teks Arab & terjemahan, notifikasi, serta konfigurasi server pencarian."
      />

      {/* 1. TAMPILAN */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-sans flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" />
          <span>Tampilan & Tipografi</span>
        </h3>

        {/* Dark Mode */}
        <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="font-bold text-sm text-slate-800 dark:text-slate-200">Mode Tampilan</div>
            <div className="text-xs text-slate-500">Pilih antara Mode Terang atau Mode Gelap</div>
          </div>
          <button
            onClick={() => onUpdateSettings({ ...settings, darkMode: !settings.darkMode })}
            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all ${
              settings.darkMode
                ? 'bg-amber-500 text-emerald-950 border-amber-400'
                : 'bg-emerald-900 text-white border-emerald-800'
            }`}
          >
            {settings.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{settings.darkMode ? 'Mode Gelap' : 'Mode Terang'}</span>
          </button>
        </div>

        {/* Font Size */}
        <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="font-bold text-sm text-slate-800 dark:text-slate-200">Ukuran Teks Arab</div>
            <div className="text-xs text-slate-500">Sesuaikan kenyamanan membaca dalam waktu lama</div>
          </div>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['small', 'medium', 'large', 'xlarge'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => onUpdateSettings({ ...settings, arabicFontSize: sz })}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                  settings.arabicFontSize === sz
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. PENCARIAN & STATUS KONEKSI */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-sans flex items-center gap-2">
          <Search className="w-5 h-5 text-emerald-600" />
          <span>Konfigurasi Pencarian Server</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            URL Server Pencarian Lokal/API
          </label>
          <input
            type="text"
            value={settings.searchServerUrl}
            onChange={(e) => onUpdateSettings({ ...settings, searchServerUrl: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-2">
          <span className="text-slate-500">Status Koneksi Database Syariah:</span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Terhubung (Lokal Cache Ready)</span>
          </span>
        </div>
      </div>

      {/* 3. PEMBARUAN APLIKASI */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-sans flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-teal-600" />
          <span>Pembaruan Versi Aplikasi</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Versi Terpasang: <span className="font-bold">v1.2.0 (Stabil)</span>
        </p>

        <button
          onClick={onOpenUpdateModal}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Bell className="w-4 h-4 text-amber-300" />
          <span>Cek Pembaruan Versi Terbaru</span>
        </button>
      </div>
    </div>
  );
};
