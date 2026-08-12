import React from 'react';
import { History, Trash2, ArrowRight } from 'lucide-react';
import { HistoryItem, NavigationTab } from '../types';
import { ArchHeader } from './IslamicPattern';

interface RiwayatViewProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const RiwayatView: React.FC<RiwayatViewProps> = ({
  history,
  onClearHistory,
  setActiveTab,
}) => {
  return (
    <div className="space-y-6 pb-12">
      <ArchHeader
        title="Riwayat Aktivitas & Pembelajaran"
        subtitle="Catatan halaman, bacaan ayat, pencarian, dan kalkulasi waris yang pernah Anda akses."
      />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">
          {history.length} Aktivitas Teratat
        </span>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Bersihkan Riwayat</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <History className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
          <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base">
            Belum ada riwayat aktivitas
          </h3>
          <p className="text-xs text-slate-500">
            Aktivitas Anda seperti membaca Qur'an atau kalkulator waris akan muncul otomatis di sini.
          </p>
        </div>
      ) : (
        <div className="relative border-l-2 border-emerald-900/20 dark:border-slate-800 ml-4 pl-6 space-y-6">
          {history.map((item) => (
            <div key={item.id} className="relative group">
              <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-900" />
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
                    {item.type}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm font-sans">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                </div>
                <button
                  onClick={() => setActiveTab(item.targetTab)}
                  className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                  title="Buka Kembali"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
