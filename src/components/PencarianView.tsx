import { useState } from 'react';
import {
  BookOpen,
  BookText,
  Bookmark,
  ChevronRight,
  Filter,
  GraduationCap,
  Search,
} from 'lucide-react';
import { HADITH_ITEMS } from '../data/hadisData';
import { LEARNING_MATERIALS } from '../data/materialsData';
import { STATIC_SURAHS_DATA, SURAH_LIST } from '../data/quranData';
import { NavigationTab, UserMode } from '../types';
import { ArchHeader } from './IslamicPattern';

interface PencarianViewProps {
  userMode: UserMode;
  setActiveTab: (tab: NavigationTab) => void;
  onSaveBookmark: (title: string, sub: string, arab?: string, indo?: string, ref?: string) => void;
}

export const PencarianView: React.FC<PencarianViewProps> = ({
  userMode,
  setActiveTab,
  onSaveBookmark,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'quran' | 'hadis' | 'materi'>('all');

  // Search Quran
  const quranResults = SURAH_LIST.filter(
    (s) =>
      s.latinName.toLowerCase().includes(query.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(query.toLowerCase()) ||
      s.number.toString() === query
  );

  // Search Hadith
  const hadisResults = HADITH_ITEMS.filter(
    (h) =>
      h.indo.toLowerCase().includes(query.toLowerCase()) ||
      h.category.toLowerCase().includes(query.toLowerCase()) ||
      h.bookName.toLowerCase().includes(query.toLowerCase()) ||
      h.arab.includes(query)
  );

  // Search Materials
  const materialResults = LEARNING_MATERIALS.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.summary.toLowerCase().includes(query.toLowerCase()) ||
      m.category.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults =
    (activeCategory === 'all' || activeCategory === 'quran' ? quranResults.length : 0) +
    (activeCategory === 'all' || activeCategory === 'hadis' ? hadisResults.length : 0) +
    (activeCategory === 'all' || activeCategory === 'materi' ? materialResults.length : 0);

  return (
    <div className="space-y-6 pb-12">
      <ArchHeader
        title="Pencarian Global Syariah App"
        subtitle="Temukan ayat Al-Qur'an, hadis nabi, istilah syariah, dan materi pembelajaran fikih berdasarkan kata kunci."
      />

      {/* Search Input Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />
          <input
            type="text"
            placeholder="Ketik kata kunci (misal: shalat, waris, ikhlas, Yasin, wudhu)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-13 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            autoFocus
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {[
            { id: 'all', label: 'Semua Hasil' },
            { id: 'quran', label: "Al-Qur'an" },
            { id: 'hadis', label: 'Hadis Digital' },
            { id: 'materi', label: 'Materi & Fiqh' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-900 text-amber-300 shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH RESULTS */}
      <div className="space-y-6">
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Menampilkan {totalResults} hasil pencarian untuk "{query || 'Semua'}"
        </div>

        {/* Quran Results Section */}
        {(activeCategory === 'all' || activeCategory === 'quran') && quranResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm font-sans flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Surah Al-Qur'an ({quranResults.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quranResults.slice(0, 6).map((surah) => (
                <button
                  key={surah.number}
                  onClick={() => setActiveTab('quran')}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-left flex items-center justify-between shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                      {surah.number}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {surah.latinName}
                      </div>
                      <div className="text-xs text-slate-500">{surah.englishNameTranslation}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hadis Results Section */}
        {(activeCategory === 'all' || activeCategory === 'hadis') && hadisResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm font-sans flex items-center gap-2">
              <BookText className="w-4 h-4 text-teal-600" />
              <span>Hadis Digital ({hadisResults.length})</span>
            </h3>

            <div className="space-y-3">
              {hadisResults.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">
                      {item.bookName} No. {item.number}
                    </span>
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
                      className="p-1 rounded text-slate-400 hover:text-amber-500"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-arabic text-right text-lg text-emerald-950 dark:text-emerald-100 my-1">
                    {item.arab}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic">"{item.indo}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Material Results Section */}
        {(activeCategory === 'all' || activeCategory === 'materi') && materialResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm font-sans flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>Materi & Fiqh ({materialResults.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {materialResults.map((mat) => (
                <div
                  key={mat.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold uppercase">
                      {mat.level} • {mat.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{mat.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{mat.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
