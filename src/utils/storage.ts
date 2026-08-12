import { AppSettings, BookmarkItem, HistoryItem, UserMode } from '../types';

const STORAGE_KEYS = {
  USER_MODE: 'syariah_app_user_mode',
  BOOKMARKS: 'syariah_app_bookmarks',
  HISTORY: 'syariah_app_history',
  SETTINGS: 'syariah_app_settings',
  LAST_READ_QURAN: 'syariah_app_last_read_quran',
  UPDATE_DISMISSED: 'syariah_app_update_dismissed_v1_2',
};

export const defaultSettings: AppSettings = {
  darkMode: false,
  arabicFontSize: 'large',
  translationFontSize: 'medium',
  showTransliteration: true,
  showTafsirInline: false,
  reciterVoice: 'Mishary Rashid Alafasy',
  autoPlayNextAudio: true,
  searchServerUrl: 'https://api.syariah-app.internal/v1/search',
  selectedLanguage: 'id',
};

export const getUserMode = (): UserMode => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_MODE);
    if (saved === 'sd' || saved === 'smp' || saved === 'sma' || saved === 'mahasiswa') {
      return saved;
    }
  } catch {
    // fallback
  }
  return 'sma'; // default level
};

export const setUserModeStorage = (mode: UserMode): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_MODE, mode);
  } catch (e) {
    console.error('Error saving user mode:', e);
  }
};

export const getBookmarksStorage = (): BookmarkItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveBookmarkStorage = (item: BookmarkItem): BookmarkItem[] => {
  const current = getBookmarksStorage();
  const exists = current.some((b) => b.id === item.id);
  let updated: BookmarkItem[];
  if (exists) {
    updated = current.filter((b) => b.id !== item.id);
  } else {
    updated = [item, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving bookmark:', e);
  }
  return updated;
};

export const getHistoryStorage = (): HistoryItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const addHistoryStorage = (item: Omit<HistoryItem, 'id' | 'timestamp'>): HistoryItem[] => {
  const current = getHistoryStorage();
  const newItem: HistoryItem = {
    ...item,
    id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
  };
  // keep max 50 items
  const updated = [newItem, ...current.filter((h) => h.title !== item.title || h.type !== item.type)].slice(0, 50);
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving history:', e);
  }
  return updated;
};

export const clearHistoryStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {
    console.error('Error clearing history:', e);
  }
};

export const getSettingsStorage = (): AppSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const saveSettingsStorage = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings:', e);
  }
};

export interface LastReadQuran {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: string;
}

export const getLastReadQuran = (): LastReadQuran | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_READ_QURAN);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const setLastReadQuran = (data: LastReadQuran): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_READ_QURAN, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving last read:', e);
  }
};
