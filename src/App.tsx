import React, { useEffect, useState } from 'react';
import { BerandaView } from './components/BerandaView';
import { BookmarkView } from './components/BookmarkView';
import { HadisView } from './components/HadisView';
import { Header } from './components/Header';
import { KalkulatorWarisView } from './components/KalkulatorWarisView';
import { KuisView } from './components/KuisView';
import { PencarianView } from './components/PencarianView';
import { PengaturanView } from './components/PengaturanView';
import { QuranView } from './components/QuranView';
import { RiwayatView } from './components/RiwayatView';
import { ShareModal } from './components/ShareModal';
import { SidebarNav } from './components/SidebarNav';
import { TentangView } from './components/TentangView';
import { UpdateModal } from './components/UpdateModal';
import {
  AppSettings,
  BookmarkItem,
  HistoryItem,
  NavigationTab,
  UserMode,
} from './types';
import {
  addHistoryStorage,
  clearHistoryStorage,
  getBookmarksStorage,
  getHistoryStorage,
  getLastReadQuran,
  getSettingsStorage,
  getUserMode,
  saveBookmarkStorage,
  saveSettingsStorage,
  setLastReadQuran,
  setUserModeStorage,
} from './utils/storage';

export default function App() {
  const [userMode, setUserModeState] = useState<UserMode>(() => getUserMode());
  const [activeTab, setActiveTabState] = useState<NavigationTab>('beranda');
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => getBookmarksStorage());
  const [history, setHistory] = useState<HistoryItem[]>(() => getHistoryStorage());
  const [settings, setSettings] = useState<AppSettings>(() => getSettingsStorage());
  const [lastRead, setLastReadState] = useState(() => getLastReadQuran());

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    title: string;
    textArab: string;
    textIndo: string;
    refText: string;
  }>({
    isOpen: false,
    title: '',
    textArab: '',
    textIndo: '',
    refText: '',
  });

  // Apply Dark Mode class to HTML document body
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Show update modal notification on first launch if not dismissed
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdateModalOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSetUserMode = (mode: UserMode) => {
    setUserModeState(mode);
    setUserModeStorage(mode);
  };

  const handleSetActiveTab = (tab: NavigationTab) => {
    setActiveTabState(tab);
    // Log tab view in history
    const tabLabels: Record<NavigationTab, string> = {
      beranda: 'Beranda',
      quran: 'Al-Qur\'an Digital',
      hadis: 'Hadis Digital',
      'kalkulator-waris': 'Kalkulator Waris',
      pencarian: 'Pencarian Global',
      bookmark: 'Bookmark',
      riwayat: 'Riwayat',
      kuis: 'Kuis Interaktif',
      pengaturan: 'Pengaturan',
      tentang: 'Tentang Aplikasi',
    };
    const updatedHist = addHistoryStorage({
      type: tab === 'quran' ? 'quran' : tab === 'hadis' ? 'hadis' : 'materi',
      title: `Membuka ${tabLabels[tab]}`,
      detail: `Mode Pembelajaran: ${userMode.toUpperCase()}`,
      targetTab: tab,
    });
    setHistory(updatedHist);
  };

  const handleSaveBookmark = (
    title: string,
    subtitle: string,
    arab?: string,
    indo?: string,
    ref?: string
  ) => {
    const newItem: BookmarkItem = {
      id: `bm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type: activeTab === 'quran' ? 'quran' : activeTab === 'hadis' ? 'hadis' : 'materi',
      title,
      subtitle,
      contentArab: arab,
      contentIndo: indo,
      reference: ref || 'Syariah App',
      timestamp: new Date().toISOString(),
    };
    const updated = saveBookmarkStorage(newItem);
    setBookmarks(updated);
  };

  const handleRemoveBookmark = (id: string) => {
    const current = getBookmarksStorage();
    const updated = current.filter((b) => b.id !== id);
    try {
      localStorage.setItem('syariah_app_bookmarks', JSON.stringify(updated));
    } catch {}
    setBookmarks(updated);
  };

  const handleSetLastRead = (surahNumber: number, surahName: string, ayahNumber: number) => {
    const data = {
      surahNumber,
      surahName,
      ayahNumber,
      timestamp: new Date().toISOString(),
    };
    setLastReadQuran(data);
    setLastRead(data);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettingsStorage(newSettings);
  };

  const handleClearHistory = () => {
    clearHistoryStorage();
    setHistory([]);
  };

  const handleOpenShareModal = (title: string, textArab: string, textIndo: string, refText: string) => {
    setShareModal({
      isOpen: true,
      title,
      textArab,
      textIndo,
      refText,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        userMode={userMode}
        setUserMode={handleSetUserMode}
        darkMode={settings.darkMode}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen pt-16 lg:pt-0">
        {/* Header App Bar */}
        <Header
          userMode={userMode}
          setUserMode={handleSetUserMode}
          darkMode={settings.darkMode}
          setDarkMode={(val) => handleUpdateSettings({ ...settings, darkMode: val })}
          setActiveTab={handleSetActiveTab}
          onOpenUpdateModal={() => setUpdateModalOpen(true)}
        />

        {/* Dynamic View Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'beranda' && (
            <BerandaView
              userMode={userMode}
              setUserMode={handleSetUserMode}
              setActiveTab={handleSetActiveTab}
              onSaveBookmark={handleSaveBookmark}
            />
          )}

          {activeTab === 'quran' && (
            <QuranView
              onSaveBookmark={handleSaveBookmark}
              onSetLastRead={handleSetLastRead}
              onShareItem={handleOpenShareModal}
              arabicFontSize={settings.arabicFontSize}
            />
          )}

          {activeTab === 'hadis' && (
            <HadisView
              onSaveBookmark={handleSaveBookmark}
              onShareItem={handleOpenShareModal}
            />
          )}

          {activeTab === 'kalkulator-waris' && <KalkulatorWarisView />}

          {activeTab === 'pencarian' && (
            <PencarianView
              userMode={userMode}
              setActiveTab={handleSetActiveTab}
              onSaveBookmark={handleSaveBookmark}
            />
          )}

          {activeTab === 'bookmark' && (
            <BookmarkView
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmark}
              setActiveTab={handleSetActiveTab}
            />
          )}

          {activeTab === 'riwayat' && (
            <RiwayatView
              history={history}
              onClearHistory={handleClearHistory}
              setActiveTab={handleSetActiveTab}
            />
          )}

          {activeTab === 'kuis' && <KuisView userMode={userMode} />}

          {activeTab === 'pengaturan' && (
            <PengaturanView
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onOpenUpdateModal={() => setUpdateModalOpen(true)}
            />
          )}

          {activeTab === 'tentang' && <TentangView />}
        </main>
      </div>

      {/* Update Notification Dialog Modal (Section 13) */}
      <UpdateModal
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onDownload={() => {
          alert('Mengunduh pembaruan versi terbaru Syariah App...');
          setUpdateModalOpen(false);
        }}
      />

      {/* Share Quote Card Modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ ...shareModal, isOpen: false })}
        title={shareModal.title}
        textArab={shareModal.textArab}
        textIndo={shareModal.textIndo}
        refText={shareModal.refText}
      />
    </div>
  );
}
