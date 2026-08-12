import React from 'react';
import { Download, Sparkles, X } from 'lucide-react';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  onDownload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-emerald-900/20 dark:border-slate-800 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-2xl">
          <Sparkles className="w-6 h-6 text-amber-600" />
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 font-sans">
            Syariah App Update
          </h3>
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
            Versi terbaru v1.2.5 siap diunduh!
          </p>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans">
          Versi terbaru telah tersedia. Unduh versi terbaru untuk mendapatkan fitur tambahan, perbaikan perhitungan waris, dan peningkatan kecepatan aplikasi.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onDownload}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Unduh Versi Terbaru</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
          >
            Nanti
          </button>
        </div>
      </div>
    </div>
  );
};
