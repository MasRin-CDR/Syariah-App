import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Coins,
  DollarSign,
  FileText,
  HelpCircle,
  Info,
  PieChart,
  RefreshCw,
  Users,
} from 'lucide-react';
import { WarisCalculationResult, WarisInput } from '../types';
import { calculateWaris } from '../utils/warisCalculator';
import { ArchHeader, GoldDivider } from './IslamicPattern';

export const KalkulatorWarisView: React.FC = () => {
  const [input, setInput] = useState<WarisInput>({
    genderPewaris: 'pria',
    suamiCount: 0,
    istriCount: 1,
    anakLakiCount: 1,
    anakPerempuanCount: 1,
    cucuLakiCount: 0,
    cucuPerempuanCount: 0,
    ayahExist: true,
    ibuExist: true,
    kakekExist: false,
    nenekExist: false,
    saudaraLakiKandungCount: 0,
    saudaraPerempuanKandungCount: 0,
    saudaraLakiSeayahCount: 0,
    saudaraLakiSeibuCount: 0,
    totalHarta: 500000000, // 500 juta rupiah
    hutang: 10000000, // 10 juta
    biayaJenazah: 5000000, // 5 juta
    wasiat: 10000000, // 10 juta
  });

  const [result, setResult] = useState<WarisCalculationResult | null>(() => calculateWaris(input));

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setResult(calculateWaris(input));
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8 pb-12">
      <ArchHeader
        title="Kalkulator Waris Syariah (Fiqh Mawarith)"
        subtitle="Alat bantu hitung pembagian harta peninggalan berbasis Fiqh Mawarith (Al-Qur'an An-Nisa: 11-12, 176). Menghitung otomatis bagian Ashabul Furudh, Asabah, 'Aul, dan Radd."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM SECTION */}
        <div className="lg:col-span-6 space-y-6">
          <form
            onSubmit={handleCalculate}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-sans flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Data Pewaris & Ahli Waris</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  const defaultVal: WarisInput = {
                    genderPewaris: 'pria',
                    suamiCount: 0,
                    istriCount: 1,
                    anakLakiCount: 1,
                    anakPerempuanCount: 1,
                    cucuLakiCount: 0,
                    cucuPerempuanCount: 0,
                    ayahExist: true,
                    ibuExist: true,
                    kakekExist: false,
                    nenekExist: false,
                    saudaraLakiKandungCount: 0,
                    saudaraPerempuanKandungCount: 0,
                    saudaraLakiSeayahCount: 0,
                    saudaraLakiSeibuCount: 0,
                    totalHarta: 300000000,
                    hutang: 0,
                    biayaJenazah: 0,
                    wasiat: 0,
                  };
                  setInput(defaultVal);
                  setResult(calculateWaris(defaultVal));
                }}
                className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* 1. Gender Pewaris */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Jenis Kelamin Pewaris yang Wafat
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setInput({
                      ...input,
                      genderPewaris: 'pria',
                      suamiCount: 0,
                      istriCount: Math.max(1, input.istriCount),
                    })
                  }
                  className={`py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                    input.genderPewaris === 'pria'
                      ? 'bg-emerald-900 text-amber-300 border-emerald-800 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>👨 Pria (Suami/Ayah)</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setInput({
                      ...input,
                      genderPewaris: 'wanita',
                      istriCount: 0,
                      suamiCount: 1,
                    })
                  }
                  className={`py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                    input.genderPewaris === 'wanita'
                      ? 'bg-emerald-900 text-amber-300 border-emerald-800 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>👩 Wanita (Istri/Ibu)</span>
                </button>
              </div>
            </div>

            {/* 2. Pasangan (Suami/Istri) */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 space-y-3">
              <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-200">
                {input.genderPewaris === 'pria' ? 'Jumlah Istri yang Ditinggalkan' : 'Suami yang Ditinggalkan'}
              </label>
              {input.genderPewaris === 'pria' ? (
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setInput({ ...input, istriCount: num })}
                      className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all ${
                        input.istriCount === num
                          ? 'bg-amber-500 text-emerald-950 border-amber-400 font-extrabold shadow'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <span className="text-xs text-slate-500 font-medium">Istri</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {[0, 1].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setInput({ ...input, suamiCount: num })}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        input.suamiCount === num
                          ? 'bg-amber-500 text-emerald-950 border-amber-400 font-extrabold shadow'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {num === 0 ? 'Tidak Ada' : ' Ada Suami (1)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Anak-anak */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Anak Laki-Laki
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={input.anakLakiCount}
                  onChange={(e) => setInput({ ...input, anakLakiCount: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Anak Perempuan
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={input.anakPerempuanCount}
                  onChange={(e) =>
                    setInput({ ...input, anakPerempuanCount: Math.max(0, parseInt(e.target.value) || 0) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* 4. Orang Tua & Kakek Nenek */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Orang Tua & Kakek / Nenek
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={input.ayahExist}
                    onChange={(e) => setInput({ ...input, ayahExist: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span>Ayah Masih Hidup</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={input.ibuExist}
                    onChange={(e) => setInput({ ...input, ibuExist: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span>Ibu Masih Hidup</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={input.kakekExist}
                    onChange={(e) => setInput({ ...input, kakekExist: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span>Kakek (dari Ayah)</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={input.nenekExist}
                    onChange={(e) => setInput({ ...input, nenekExist: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span>Nenek</span>
                </label>
              </div>
            </div>

            {/* 5. Saudara */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Saudara Laki Kandung
                </label>
                <input
                  type="number"
                  min="0"
                  value={input.saudaraLakiKandungCount}
                  onChange={(e) =>
                    setInput({ ...input, saudaraLakiKandungCount: Math.max(0, parseInt(e.target.value) || 0) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Saudara Perempuan Kandung
                </label>
                <input
                  type="number"
                  min="0"
                  value={input.saudaraPerempuanKandungCount}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      saudaraPerempuanKandungCount: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* 6. Harta, Hutang, Biaya & Wasiat */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>Nilai Harta & Kewajiban Finansial (IDR)</span>
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Total Harta Kotor Peninggalan
                </label>
                <input
                  type="number"
                  step="1000000"
                  min="0"
                  value={input.totalHarta}
                  onChange={(e) => setInput({ ...input, totalHarta: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-extrabold text-emerald-800 dark:text-emerald-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Hutang Almarhum
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={input.hutang}
                    onChange={(e) => setInput({ ...input, hutang: Math.max(0, parseFloat(e.target.value) || 0) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Biaya Jenazah
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={input.biayaJenazah}
                    onChange={(e) =>
                      setInput({ ...input, biayaJenazah: Math.max(0, parseFloat(e.target.value) || 0) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Wasiat (Maks 1/3)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={input.wasiat}
                    onChange={(e) => setInput({ ...input, wasiat: Math.max(0, parseFloat(e.target.value) || 0) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Calculator className="w-5 h-5 text-amber-300" />
              <span>Hitung Pembagian Waris Sekarang</span>
            </button>
          </form>
        </div>

        {/* CALCULATION RESULT BREAKDOWN SECTION */}
        <div className="lg:col-span-6 space-y-6">
          {result && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 shadow-sm space-y-6">
              {/* Header summary */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-sans flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-amber-500" />
                  <span>Hasil Pembagian Waris</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold">
                  Fiqh Mawarith
                </span>
              </div>

              {/* Financial Calculation Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 font-medium">Total Harta Kotor</div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                    {formatIDR(result.totalHartaKotor)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <div className="text-amber-800 dark:text-amber-300 font-medium">Hutang, Biaya & Wasiat</div>
                  <div className="text-sm font-extrabold text-amber-900 dark:text-amber-200 mt-1">
                    {formatIDR(result.totalHutangBiaya + result.wasiatNominal)}
                  </div>
                </div>

                <div className="col-span-2 p-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white shadow-md">
                  <div className="text-emerald-200 text-xs font-medium">Net Harta Siap Dibagi (Harta Bersih)</div>
                  <div className="text-xl md:text-2xl font-black text-amber-300 mt-1 font-sans">
                    {formatIDR(result.hartaBersihWaris)}
                  </div>
                </div>
              </div>

              {/* Special adjustments note (Aul or Radd) */}
              {result.adjustmentsNote && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{result.adjustmentsNote}</p>
                </div>
              )}

              {/* Visual Distribution Progress Bar */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Visualisasi Proporsi Pembagian:
                </div>
                <div className="h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex border border-slate-200 dark:border-slate-700">
                  {result.shares
                    .filter((s) => !s.isMahjub && s.percentage > 0)
                    .map((s, idx) => {
                      const colors = [
                        'bg-emerald-600',
                        'bg-amber-500',
                        'bg-teal-500',
                        'bg-indigo-600',
                        'bg-blue-500',
                        'bg-rose-500',
                      ];
                      return (
                        <div
                          key={s.heirKey}
                          style={{ width: `${s.percentage}%` }}
                          className={`h-full ${colors[idx % colors.length]}`}
                          title={`${s.name}: ${s.percentage}%`}
                        />
                      );
                    })}
                </div>
              </div>

              {/* Shares Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold uppercase">
                    <tr>
                      <th className="p-3">Ahli Waris</th>
                      <th className="p-3">Porsi</th>
                      <th className="p-3">Persentase</th>
                      <th className="p-3 text-right">Nominal (IDR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                    {result.shares.map((share) => (
                      <tr
                        key={share.heirKey}
                        className={`transition-colors ${
                          share.isMahjub
                            ? 'bg-slate-50/50 dark:bg-slate-900 opacity-60'
                            : 'hover:bg-emerald-50/30 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="p-3">
                          <div className="font-bold text-slate-900 dark:text-slate-100">{share.name}</div>
                          <div className="text-[10px] font-arabic text-emerald-700 dark:text-emerald-400">
                            {share.arabicName}
                          </div>
                          {share.dalilText && (
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 italic mt-0.5">
                              {share.dalilText}
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-bold text-emerald-800 dark:text-emerald-300">
                          {share.fractionText}
                        </td>
                        <td className="p-3 font-bold text-slate-700 dark:text-slate-300">
                          {share.percentage}%
                        </td>
                        <td className="p-3 text-right font-extrabold text-slate-900 dark:text-slate-100">
                          {formatIDR(share.nominalIDR)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Educational Disclaimer */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>Catatan Edukasi Syariah</span>
                </div>
                <p className="leading-relaxed">{result.disclaimer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
