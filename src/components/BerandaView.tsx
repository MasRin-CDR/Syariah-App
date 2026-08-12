import React from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  BookText,
  Bookmark,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Compass,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Share2,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { FEATURED_AYAH } from '../data/quranData';
import { getMaterialsByLevel } from '../data/materialsData';
import { NavigationTab, UserMode } from '../types';
import { ArchHeader, GoldDivider } from './IslamicPattern';

interface BerandaViewProps {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  setActiveTab: (tab: NavigationTab) => void;
  onSaveBookmark: (title: string, sub: string, arab?: string, indo?: string, ref?: string) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  userMode,
  setUserMode,
  setActiveTab,
  onSaveBookmark,
}) => {
  const modeCards: {
    key: UserMode;
    title: string;
    buttonLabel: string;
    target: string;
    desc: string;
    badgeBg: string;
    iconBg: string;
    highlights: string[];
    bgPattern: string;
  }[] = [
    {
      key: 'sd',
      title: 'Tingkat Sekolah Dasar (SD)',
      buttonLabel: 'Masuk ke mode SD',
      target: 'Siswa SD & Anak-anak',
      desc: 'Materi dasar rukun Islam, Rukun Iman, tata cara wudhu, doa harian, dan hafalan surah pendek.',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-300',
      iconBg: 'from-emerald-400 to-teal-500',
      highlights: ['Rukun Islam & Iman', 'Tata Cara Wudhu & Shalat', 'Kuis Interaktif Bergambar'],
      bgPattern: 'from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20',
    },
    {
      key: 'smp',
      title: 'Tingkat SMP / Tsanawiyah',
      buttonLabel: 'Masuk ke mode SMP',
      target: 'Siswa SMP & Pelajar',
      desc: 'Fiqh ibadah, jenis najis, syarat sah shalat, sejarah nabi, dan tafsir ringkas ayat-ayat pilihan.',
      badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200 border-teal-300',
      iconBg: 'from-teal-500 to-emerald-600',
      highlights: ['Thaharah & Penyucian Najis', 'Syarat & Rukun Shalat', 'Hadis Akhlak Sehari-hari'],
      bgPattern: 'from-teal-50 to-emerald-50/50 dark:from-teal-950/30 dark:to-emerald-950/20',
    },
    {
      key: 'sma',
      title: 'Tingkat SMA / Aliyah',
      buttonLabel: 'Masuk ke mode SMA',
      target: 'Siswa SMA & Remaja',
      desc: 'Fiqh Muamalah dasar, pengenalan Kalkulator Waris, Hadis Arba\'in, dan etika transaksi bisnis syariah.',
      badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 border-amber-300',
      iconBg: 'from-amber-500 to-emerald-600',
      highlights: ['Akad Jual Beli & Riba', 'Dasar Kalkulator Waris', 'Takhrij Hadis Arba\'in'],
      bgPattern: 'from-amber-50/80 to-emerald-50/50 dark:from-amber-950/30 dark:to-emerald-950/20',
    },
    {
      key: 'mahasiswa',
      title: 'Tingkat Mahasiswa & Umum',
      buttonLabel: 'Mahasiswa',
      target: 'Mahasiswa, Guru, Dosen',
      desc: 'Usul Fiqh, studi komparatif mazhab, Fiqh Mawarith tingkat lanjut, dan rujukan kitab-kitab induk.',
      badgeBg: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200 border-indigo-300',
      iconBg: 'from-indigo-600 to-emerald-700',
      highlights: ['Kaidah Fiqhiyyah & Usul Fiqh', 'Hitung Waris Kompleks (\'Aul/Radd)', 'Perbandingan Mazhab'],
      bgPattern: 'from-indigo-50/80 to-emerald-50/50 dark:from-indigo-950/30 dark:to-emerald-950/20',
    },
  ];

  const currentMaterials = getMaterialsByLevel(userMode);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <ArchHeader
        title="Syariah App - Platform Belajar & Dalil Digital"
        subtitle="Sumber belajar Al-Qur'an, Hadis shahih, Fiqh ibadah, dan Kalkulator Waris interaktif yang terstruktur untuk seluruh jenjang pendidikan."
      />

      {/* Featured Ayah / Daily Reminder Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 md:p-8 shadow-sm border border-[#065F46]/10 dark:border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950 text-[#D4AF37] border border-[#D4AF37]/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-[#2D3648] dark:text-slate-100 text-sm">Ayah Hari Ini</h3>
              <p className="text-xs text-[#718096] dark:text-slate-400">Tadabbur Al-Qur'an & Dalil Utama</p>
            </div>
          </div>
          <button
            onClick={() =>
              onSaveBookmark(
                'Ayat Kursi (QS. Al-Baqarah: 255)',
                'Ayah Pilihan Hari Ini',
                FEATURED_AYAH.textArab,
                FEATURED_AYAH.textIndo,
                'QS. Al-Baqarah: 255'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ECFDF5] dark:bg-emerald-950 text-[#065F46] dark:text-emerald-200 border border-[#065F46]/20 text-xs font-semibold hover:bg-[#065F46] hover:text-white transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Simpan</span>
          </button>
        </div>

        {/* Arabic Verse */}
        <div className="text-right font-arabic text-2xl md:text-3xl text-[#065F46] dark:text-emerald-100 my-4 leading-loose font-bold">
          {FEATURED_AYAH.textArab}
        </div>

        {/* Translation */}
        <p className="text-[#2D3648] dark:text-slate-300 text-sm leading-relaxed italic mb-3">
          "{FEATURED_AYAH.textIndo}"
        </p>

        <div className="flex items-center justify-between text-xs text-[#718096] dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="font-semibold text-[#065F46] dark:text-emerald-400">QS. Al-Baqarah: 255</span>
          <button
            onClick={() => setActiveTab('quran')}
            className="flex items-center gap-1 text-[#065F46] dark:text-emerald-400 hover:underline font-bold"
          >
            <span>Buka Al-Qur'an</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <GoldDivider />

      {/* SECTION 6: 4 MAIN MODE SELECTION CARDS */}
      <div>
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] text-xs font-extrabold mb-2 border border-[#065F46]/20">
            <GraduationCap className="w-4 h-4 text-[#065F46]" />
            Pilihan Mode Pembelajaran
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#065F46] dark:text-emerald-300 tracking-tight">
            Pilih Mode Sesuai Jenjang Pendidikan Anda
          </h2>
          <p className="text-[#718096] dark:text-slate-400 text-sm mt-1 italic">
            Saat Anda memilih mode, aplikasi menyesuaikan tingkat materi, kompleksitas penjelasan, dan rekomendasi konten.
          </p>
        </div>

        {/* Grid of 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modeCards.map((card) => {
            const isSelected = userMode === card.key;
            return (
              <div
                key={card.key}
                onClick={() => setUserMode(card.key)}
                className={`group bg-white dark:bg-slate-900 rounded-[24px] p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/30 scale-[1.01]'
                    : 'border-2 border-transparent hover:border-[#065F46] shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Header inside Card */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] dark:bg-emerald-950 text-[#065F46] dark:text-emerald-300 flex items-center justify-center font-extrabold text-2xl shadow-inner border border-[#065F46]/10">
                        {card.key === 'sd' && '👦'}
                        {card.key === 'smp' && '🎒'}
                        {card.key === 'sma' && '📖'}
                        {card.key === 'mahasiswa' && '🎓'}
                      </div>
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1 ${
                          isSelected ? 'bg-[#D4AF37] text-[#065F46]' : 'bg-slate-100 dark:bg-slate-800 text-[#718096]'
                        }`}>
                          {card.target}
                        </span>
                        <h3 className="text-lg font-bold text-[#2D3648] dark:text-slate-100 font-sans">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="px-2.5 py-1 bg-[#D4AF37] text-[#065F46] text-[10px] font-black rounded-full uppercase tracking-wider shadow-xs shrink-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Mode Aktif</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[#718096] dark:text-slate-300 text-xs md:text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>

                  {/* Highlights List */}
                  <ul className="space-y-2 mb-6">
                    {card.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#2D3648] dark:text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button Action inside Card */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMode(card.key);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-colors ${
                    isSelected
                      ? 'bg-[#065F46] text-white shadow-md'
                      : 'bg-[#F1F5F9] dark:bg-slate-800 text-[#475569] dark:text-slate-200 group-hover:bg-[#065F46] group-hover:text-white'
                  }`}
                >
                  <span>{isSelected ? 'Sedang Digunakan' : card.buttonLabel}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <GoldDivider />

      {/* QUICK ACCESS TOOLS SECTION */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 font-sans flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-600" />
          <span>Fitur Utama & Alat Bantu Syariah</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('quran')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-900/10 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
              Al-Qur'an Digital
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              114 Surah, terjemahan Kemenag, audio murattal & bookmark.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('hadis')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-900/10 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-teal-700 dark:group-hover:text-teal-400">
              Hadis Digital
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Bukhari, Muslim, Hadis Arba'in Nawawi, lengkap dengan Takhrij.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('kalkulator-waris')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-900/10 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-amber-700 dark:group-hover:text-amber-400">
              Kalkulator Waris
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Simulasi perhitungan harta peninggalan berbasis Fiqh Mawarith.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('kuis')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-900/10 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
              Kuis Interaktif
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Uji pemahaman syariah sesuai jenjang pendidikan Anda.
            </p>
          </button>
        </div>
      </div>

      {/* RECOMMENDED MATERIALS FOR CURRENT ACTIVE MODE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Materi Terkomposisi
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans">
              Rekomendasi Pembelajaran ({userMode.toUpperCase()})
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('pencarian')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentMaterials.map((mat) => (
            <div
              key={mat.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                  {mat.category}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  ⏳ {mat.readTimeMinutes} min baca
                </span>
              </div>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1 font-sans">
                {mat.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                {mat.summary}
              </p>

              <button
                onClick={() => setActiveTab('pencarian')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <span>Baca Materi Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
