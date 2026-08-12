export type UserMode = 'sd' | 'smp' | 'sma' | 'mahasiswa';

export type NavigationTab = 
  | 'beranda'
  | 'quran'
  | 'hadis'
  | 'kalkulator-waris'
  | 'pencarian'
  | 'bookmark'
  | 'riwayat'
  | 'kuis'
  | 'pengaturan'
  | 'tentang';

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  latinName: string;
}

export interface Ayah {
  numberInSurah: number;
  globalIndex?: number;
  textArab: string;
  transliteration?: string;
  textIndo: string;
  surahNumber: number;
  surahName: string;
  tafsirShort?: string;
  audioUrl?: string;
}

export interface HadithBook {
  id: string;
  name: string;
  arabicName: string;
  totalHadith: number;
  description: string;
  badgeColor?: string;
}

export interface HadithItem {
  id: string;
  bookId: string;
  bookName: string;
  number: number;
  arab: string;
  indo: string;
  category: string;
  sanad?: string;
  grade?: 'Sahih' | 'Hasan' | 'Muttafaq 'Alaih';
  levelTag?: UserMode[];
}

export interface WarisInput {
  genderPewaris: 'pria' | 'wanita';
  suamiCount: number; // 0 or 1
  istriCount: number; // 0 to 4
  anakLakiCount: number;
  anakPerempuanCount: number;
  cucuLakiCount: number;
  cucuPerempuanCount: number;
  ayahExist: boolean;
  ibuExist: boolean;
  kakekExist: boolean;
  nenekExist: boolean;
  saudaraLakiKandungCount: number;
  saudaraPerempuanKandungCount: number;
  saudaraLakiSeayahCount: number;
  saudaraLakiSeibuCount: number;
  totalHarta: number; // Dalam Rupiah
  hutang: number;
  biayaJenazah: number;
  wasiat: number; // Maksimal 1/3 harta bersih
}

export interface WarisShareResult {
  heirKey: string;
  name: string;
  arabicName: string;
  count: number;
  fractionText: string;
  percentage: number;
  nominalIDR: number;
  dalilText: string;
  isAsabah?: boolean;
  isMahjub?: boolean;
  reason?: string;
}

export interface WarisCalculationResult {
  totalHartaKotor: number;
  totalHutangBiaya: number;
  wasiatNominal: number;
  hartaBersihWaris: number;
  shares: WarisShareResult[];
  adjustmentsNote?: string;
  hasAul?: boolean;
  hasRadd?: boolean;
  disclaimer: string;
}

export interface BookmarkItem {
  id: string;
  type: 'quran' | 'hadis' | 'materi' | 'waris';
  title: string;
  subtitle: string;
  contentArab?: string;
  contentIndo?: string;
  reference: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface HistoryItem {
  id: string;
  type: 'quran' | 'hadis' | 'pencarian' | 'materi' | 'waris';
  title: string;
  detail: string;
  targetTab: NavigationTab;
  payload?: Record<string, unknown>;
  timestamp: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  subtitle: string;
  category: 'Fiqh' | 'Tafsir' | 'Aqidah' | 'Akhlak' | 'Mawarith' | 'Muamalah';
  level: UserMode;
  readTimeMinutes: number;
  iconName: string;
  summary: string;
  contentSections: {
    heading: string;
    text: string;
    dalilArab?: string;
    dalilIndo?: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  level: UserMode;
  category: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  dalilRef?: string;
}

export interface AppSettings {
  darkMode: boolean;
  arabicFontSize: 'small' | 'medium' | 'large' | 'xlarge';
  translationFontSize: 'small' | 'medium' | 'large';
  showTransliteration: boolean;
  showTafsirInline: boolean;
  reciterVoice: string;
  autoPlayNextAudio: boolean;
  searchServerUrl: string;
  selectedLanguage: 'id' | 'en';
}
