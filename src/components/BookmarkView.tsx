import React, { useState } from 'react';
import { Bookmark, Trash2, ExternalLink } from 'lucide-react';
import { BookmarkItem, NavigationTab } from '../types';
import { ArchHeader } from './IslamicPattern';

interface BookmarkViewProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const BookmarkView: React.FC<BookmarkViewProps> = ({
  bookmarks,
  onRemoveBookmark,
  setActiveTab,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = bookmarks.filter((b) => filterType === 'all' || b.type === filterType);

  return (
    <div className="space-y-6 pb-12">
      <ArchHeader
        title="Daftar Bookmark & Item Tersimpan"
        subtitle="Kumpulan ayat Al-Qur'an, hadis pilihan, materi pembelajaran, dan hasil kalkulator waris yang Anda simpan."
      />

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {[
          { id: 'all', label: `Semua (${bookmarks.length})` },
          { id: 'quran', label: 'Qur\'an' },
          { id: 'hadis', label: 'Hadis' },
          { id: 'waris', label: 'Waris' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === tab.id
                ? 'bg-emerald-900 text-amber-300 shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Saved Items List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Bookmark className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
          <h3 className="font-bold text-slate-700 dark:text-slate-300 text-base">
            Belum ada item tersimpan
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tekan ikon bookmark pada ayat, hadis, atau materi untuk menyimpannya di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 uppercase">
                    {item.subtitle}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base font-sans mt-1">
                    {item.title}
                  </h4>
                </div>
                <button
                  onClick={() => onRemoveBookmark(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Hapus Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {item.contentArab && (
                <p className="font-arabic text-right text-xl text-emerald-950 dark:text-emerald-100 my-2">
                  {item.contentArab}
                </p>
              )}

              {item.contentIndo && (
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{item.contentIndo}"
                </p>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>📌 {item.reference}</span>
                <span>{new Date(item.timestamp).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
