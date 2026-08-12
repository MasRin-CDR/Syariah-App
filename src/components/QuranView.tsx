import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Info,
  Play,
  Pause,
  Search,
  Share2,
  Sliders,
  Volume2,
} from 'lucide-react';
import { STATIC_SURAHS_DATA, SURAH_LIST } from '../data/quranData';
import { Ayah, Surah } from '../types';
import { ArchHeader } from './IslamicPattern';

interface QuranViewProps {
  onSaveBookmark: (title: string, sub: string, arab?: string, indo?: string, ref?: string) => void;
  onSetLastRead: (surahNumber: number, surahName: string, ayahNumber: number) => void;
  onShareItem: (title: string, textArab: string, textIndo: string, ref: string) => void;
  arabicFontSize: string;
}

export const QuranView: React.FC<QuranViewProps> = ({
  onSaveBookmark,
  onSetLastRead,
  onShareItem,
  arabicFontSize,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('large');
  const [showTransliteration, setShowTransliteration] = useState(true);

  // Filter surahs list
  const filteredSurahs = SURAH_LIST.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString() === searchQuery;
    const matchesType = activeTabFilter === 'all' || s.revelationType === activeTabFilter;
    return matchesSearch && matchesType;
  });

  const getAyahsForSurah = (surahNum: number): Ayah[] => {
    if (STATIC_SURAHS_DATA[surahNum]) {
      return STATIC_SURAHS_DATA[surahNum];
    }
    // Generated fallback verses for demonstration if surah isn't statically loaded
    return Array.from({ length: Math.min(10, selectedSurah?.numberOfAyahs || 7) }, (_, i) => ({
      numberInSurah: i + 1,
      textArab: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ - آية ${i + 1} من سورة ${selectedSurah?.name || 'القرآن'}`,
      transliteration: `Bismillāhir-raḥmānir-raḥīm - Ayah ${i + 1}`,
      textIndo: `Teks terjemahan ayat ${i + 1} dari Surah ${selectedSurah?.latinName} (${selectedSurah?.englishNameTranslation}). Hikmah dan petunjuk bagi umat manusia.`,
      surahNumber: surahNum,
      surahName: selectedSurah?.latinName || 'Al-Qur\'an',
      tafsirShort: `Tafsir ringkas Kemenag RI untuk ayat ${i + 1} Surah ${selectedSurah?.latinName}.`,
    }));
  };

  const handleCopy = (textArab: string, textIndo: string, index: number, ref: string) => {
    const copyString = `${textArab}\n\n"${textIndo}"\n(${ref} - Syariah App)`;
    navigator.clipboard.writeText(copyString);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleToggleAudio = (index: number, audioUrl?: string) => {
    if (playingAudioIndex === index) {
      setPlayingAudioIndex(null);
    } else {
      setPlayingAudioIndex(index);
      // Play web audio sound or simulation
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play().catch(() => console.log('Audio playback simulated'));
      }
    }
  };

  const fontSizeClasses = {
    small: 'text-xl leading-relaxed',
    medium: 'text-2xl leading-loose',
    large: 'text-3xl leading-loose',
    xlarge: 'text-4xl leading-loose',
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <ArchHeader
        title="Al-Qur'an Digital"
        subtitle="Membaca dan merenungkan firman Allah dengan teks Uthmani yang jernih, transliterasi, terjemahan resmi Kemenag RI, serta audio murattal."
      />

      {/* SURAH READER VIEW OR SURAH LIST */}
      {selectedSurah ? (
        /* SURAH DETAIL READER */
        <div className="space-y-6">
          {/* Back button & Surah Info Header */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <button
                onClick={() => setSelectedSurah(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali ke Daftar Surah</span>
              </button>

              {/* Font Controls & Options */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Ukuran Teks Arab:
                </span>
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                  {(['small', 'medium', 'large', 'xlarge'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`px-2 py-0.5 rounded text-xs font-bold uppercase transition-all ${
                        fontSize === sz
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {sz[0]}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowTransliteration(!showTransliteration)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                    showTransliteration
                      ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200'
                      : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  Latin
                </button>
              </div>
            </div>

            {/* Surah Title Banner */}
            <div className="text-center py-6 px-4 rounded-xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white relative overflow-hidden">
              <div className="text-3xl md:text-4xl font-arabic mb-1 text-amber-300 font-bold">
                {selectedSurah.name}
              </div>
              <h2 className="text-xl font-extrabold font-sans">
                {selectedSurah.number}. {selectedSurah.latinName}
              </h2>
              <p className="text-xs text-emerald-200 mt-1">
                "{selectedSurah.englishNameTranslation}" • {selectedSurah.numberOfAyahs} Ayat • {selectedSurah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}
              </p>

              {/* Bismillah Opening */}
              {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                <div className="mt-6 pt-4 border-t border-emerald-700/60 font-arabic text-2xl text-amber-200">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              )}
            </div>
          </div>

          {/* Verses List */}
          <div className="space-y-4">
            {getAyahsForSurah(selectedSurah.number).map((ayah) => {
              const refString = `QS. ${selectedSurah.latinName}: ${ayah.numberInSurah}`;
              const isCopied = copiedIndex === ayah.numberInSurah;
              const isPlaying = playingAudioIndex === ayah.numberInSurah;

              return (
                <div
                  key={ayah.numberInSurah}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm transition-all hover:border-emerald-500/30"
                >
                  {/* Verse Top Action Toolbar */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-emerald-900 text-amber-300 font-extrabold text-xs flex items-center justify-center border border-amber-400/40">
                        {ayah.numberInSurah}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {refString}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audio Play Button */}
                      <button
                        onClick={() => handleToggleAudio(ayah.numberInSurah, ayah.audioUrl)}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                          isPlaying
                            ? 'bg-amber-500 text-emerald-950 animate-pulse'
                            : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100'
                        }`}
                        title="Putar Murattal"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Audio'}</span>
                      </button>

                      {/* Mark Last Read */}
                      <button
                        onClick={() => onSetLastRead(selectedSurah.number, selectedSurah.latinName, ayah.numberInSurah)}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-xs font-bold transition-colors"
                        title="Tandai Terakhir Dibaca"
                      >
                        📍 Terakhir Dibaca
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={() =>
                          onSaveBookmark(
                            `${selectedSurah.latinName}: Ayat ${ayah.numberInSurah}`,
                            `Surah ${selectedSurah.number}`,
                            ayah.textArab,
                            ayah.textIndo,
                            refString
                          )
                        }
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                        title="Simpan Bookmark"
                      >
                        <Bookmark className="w-4 h-4 text-amber-600" />
                      </button>

                      {/* Copy */}
                      <button
                        onClick={() => handleCopy(ayah.textArab, ayah.textIndo, ayah.numberInSurah, refString)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Salin Ayat"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {/* Share */}
                      <button
                        onClick={() => onShareItem(refString, ayah.textArab, ayah.textIndo, refString)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Bagikan Ayat"
                      >
                        <Share2 className="w-4 h-4 text-teal-600" />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <div
                    className={`font-arabic text-right text-emerald-950 dark:text-emerald-100 my-4 ${
                      fontSizeClasses[fontSize]
                    }`}
                  >
                    {ayah.textArab}
                  </div>

                  {/* Transliteration */}
                  {showTransliteration && ayah.transliteration && (
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-mono my-2 font-medium">
                      {ayah.transliteration}
                    </p>
                  )}

                  {/* Translation */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {ayah.textIndo}
                  </p>

                  {/* Tafsir Short Accordion */}
                  {ayah.tafsirShort && (
                    <details className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                      <summary className="cursor-pointer font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        <span>Lihat Tafsir Ringkas Kemenag</span>
                      </summary>
                      <p className="mt-2 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        {ayah.tafsirShort}
                      </p>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* SURAH LIST SELECTION GRID */
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Field */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama surah, nomor, atau terjemahan (cth: Yasin, Al-Baqarah, 36)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Revelation Type Filter Tabs */}
              <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {(['all', 'Meccan', 'Medinan'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveTabFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTabFilter === filter
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {filter === 'all' && 'Semua 114'}
                    {filter === 'Meccan' && 'Makkiyah'}
                    {filter === 'Medinan' && 'Madaniyah'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Surah Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurahs.map((surah) => (
              <button
                key={surah.number}
                onClick={() => setSelectedSurah(surah)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-900/10 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-sm flex items-center justify-center border border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-sans group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {surah.latinName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayat
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-arabic text-xl font-bold text-emerald-900 dark:text-emerald-200">
                    {surah.name}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    {surah.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
