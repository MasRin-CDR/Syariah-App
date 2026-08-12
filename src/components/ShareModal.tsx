import React, { useState } from 'react';
import { Check, Copy, Share2, X } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  textArab: string;
  textIndo: string;
  refText: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  textArab,
  textIndo,
  refText,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullText = `${textArab}\n\n"${textIndo}"\n\n📌 ${refText}\n- Syariah App Digital`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-emerald-900/20 dark:border-slate-800 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 font-sans flex items-center gap-2">
          <Share2 className="w-5 h-5 text-emerald-600" />
          <span>Bagikan Dalil Syariah</span>
        </h3>

        {/* Visual Graphic Card Preview */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white space-y-4 shadow-lg border border-amber-400/30">
          <div className="text-right font-arabic text-2xl text-amber-300 leading-loose">
            {textArab}
          </div>
          <p className="text-xs text-emerald-100 italic leading-relaxed">
            "{textIndo}"
          </p>
          <div className="pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[11px]">
            <span className="font-extrabold text-amber-400">{refText}</span>
            <span className="text-emerald-300/80 font-mono">Syariah App</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Teks Tersalin!' : 'Salin Teks Kutipan'}</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
