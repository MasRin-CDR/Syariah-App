import React from 'react';
import { BookOpen, CheckCircle2, Heart, Info, ShieldCheck, Mail } from 'lucide-react';
import { ArchHeader } from './IslamicPattern';

export const TentangView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <ArchHeader
        title="Tentang Syariah App"
        subtitle="Platform pembelajaran dan referensi syariah digital yang modern, inklusif, edukatif, dan ramah pengguna."
      />

      {/* App Core Identity Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-emerald-400 text-emerald-950 font-black flex items-center justify-center text-3xl shadow-lg">
            ☪
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 font-sans">
              Syariah App
            </h2>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">
              Versi 1.2.0 • Digital Islamic Education Platform
            </p>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-sans">
          Syariah App adalah platform edukasi Islam digital yang dirancang untuk mendukung proses belajar mengajar agama Islam bagi siswa sekolah dasar (SD), SMP, SMA, mahasiswa, guru, dosen, maupun masyarakat umum.
        </p>

        {/* Specs and Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Sumber Data Resmi</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Teks Al-Qur'an dan Terjemahan Kemenag RI, Kitab Hadis Shahih (Bukhari, Muslim, Arba'in Nawawi), serta Rujukan Fiqh Mawarith.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Kebijakan Privasi</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Aplikasi ini beroperasi secara transparan. Seluruh data bookmark dan riwayat belajar tersimpan aman secara lokal di perangkat pengguna.
            </p>
          </div>
        </div>

        {/* Developer Info & Contact */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
          <div className="font-bold text-slate-800 dark:text-slate-200">Tim Pengembang:</div>
          <p>Senior UI/UX & Software Architecture Team for Syariah App</p>
          <p className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
            <Mail className="w-3.5 h-3.5" />
            <span>Kontak & Pengaduan: support@syariah-app.internal</span>
          </p>
        </div>
      </div>
    </div>
  );
};
