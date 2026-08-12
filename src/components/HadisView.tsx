import { useState } from 'react';
import {
  BookText,
  Bookmark,
  Check,
  Copy,
  Filter,
  Search,
  Share2,
} from 'lucide-react';
import { HADITH_BOOKS, HADITH_ITEMS } from '../data/hadisData';
import { HadithItem } from '../types';
import { ArchHeader } from './IslamicPattern';

interface HadisViewProps {
  onSaveBookmark: (title: string, sub: string, arab?: string, indo?: string, ref?: string) => void;
  onShareItem: (title: string, textArab: string, textIndo: string, ref: string) => void;
}

export const HadisView: React.FC<HadisViewProps> = ({
  onSaveBookmark,
  onShareItem,
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = Array.from(new Set(HADITH_ITEMS.map((h) => h.category)));

  const filteredHadiths = HADITH_ITEMS.filter((item) => {
    const matchesBook = selectedBookId === 'all' || item.bookId === selectedBookId;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.indo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.arab.includes(searchQuery) ||
      item.number.toString() === searchQuery ||
      item.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBook && matchesCategory && matchesSearch;
  });

  const handleCopy = (item: HadithItem) => {
    const copyString = `${item.arab}\n\n"${item.indo}"\n\n(${item.sanad} - Syariah App)`;
    navigator.clipboard.writeText(copyString);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      <ArchHeader
        title="Hadis Digital & Sunnah Nabawiyah"
        subtitle="Rujukan kumpulan hadis shahih bersumber dari Kutubut Tiss'ah dan Hadis Arba'in Nawawi, dilengkapi teks Arab, terjemahan, sanad, dan tingkat kesahihan."
      />

      {/* Kitab Cards Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={() => setSelectedBookId('all')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedBookId === 'all'
              ? 'bg-emerald-900 text-white border-emerald-800 shadow-md font-bold'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
          }`}
        >
          <div className="text-xs font-semibold">Semua Kitab</div>
          <div className="text-[10px] opacity-80 mt-0.5">{HADITH_ITEMS.length} Hadis Tampil</div>
        </button>

        {HADITH_BOOKS.map((book) => {
          const isSelected = selectedBookId === book.id;
          return (
            <button
              key={book.id}
              onClick={() => setSelectedBookId(book.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-emerald-900 text-white border-emerald-800 shadow-md font-bold'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div className="text-xs font-bold font-sans truncate">{book.name}</div>
              <div className="text-[10px] opacity-80 truncate font-arabic">{book.arabicName}</div>
            </button>
          );
        })}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kata kunci, nomor hadis, atau topik (cth: niat, shalat, ikhlas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Kategori Topik</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hadiths List */}
      <div className="space-y-4">
        {filteredHadiths.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm transition-all hover:border-emerald-500/30"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-900 text-amber-300 font-extrabold text-xs">
                    {item.bookName} No. {item.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-xs font-bold">
                    {item.category}
                  </span>
                  {item.grade && (
                    <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200 text-xs font-extrabold">
                      ✓ {item.grade}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onSaveBookmark(
                        `${item.bookName} No. ${item.number}`,
                        item.category,
                        item.arab,
                        item.indo,
                        item.sanad || item.bookName
                      )
                    }
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                    title="Simpan Hadis"
                  >
                    <Bookmark className="w-4 h-4 text-amber-600" />
                  </button>

                  <button
                    onClick={() => handleCopy(item)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Salin Hadis"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() =>
                      onShareItem(
                        `${item.bookName} No. ${item.number}`,
                        item.arab,
                        item.indo,
                        item.sanad || item.bookName
                      )
                    }
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Bagikan Hadis"
                  >
                    <Share2 className="w-4 h-4 text-teal-600" />
                  </button>
                </div>
              </div>

              {/* Arabic Hadith Text */}
              <div className="font-arabic text-right text-2xl md:text-3xl text-emerald-950 dark:text-emerald-100 my-4 leading-loose">
                {item.arab}
              </div>

              {/* Translation */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans mb-3">
                "{item.indo}"
              </p>

              {/* Sanad / Takhrij Footer */}
              {item.sanad && (
                <div className="pt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 border-t border-slate-100 dark:border-slate-800">
                  📌 {item.sanad}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
