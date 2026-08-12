import { WarisCalculationResult, WarisInput, WarisShareResult } from '../types';

export function calculateWaris(input: WarisInput): WarisCalculationResult {
  const totalHartaKotor = Math.max(0, input.totalHarta);
  const totalHutangBiaya = Math.max(0, input.hutang + input.biayaJenazah);
  const hartaSetelahHutang = Math.max(0, totalHartaKotor - totalHutangBiaya);

  // Wasiat maksimal 1/3 dari harta setelah hutang
  const maxWasiatAllowed = hartaSetelahHutang / 3;
  const wasiatNominal = Math.min(Math.max(0, input.wasiat), maxWasiatAllowed);

  const hartaBersihWaris = Math.max(0, hartaSetelahHutang - wasiatNominal);

  const shares: WarisShareResult[] = [];

  if (hartaBersihWaris <= 0) {
    return {
      totalHartaKotor,
      totalHutangBiaya,
      wasiatNominal,
      hartaBersihWaris: 0,
      shares: [],
      adjustmentsNote: 'Harta bersih setelah dipotong hutang, biaya pengurusan jenazah, dan wasiat tidak mencukupi untuk dibagikan.',
      disclaimer: 'Perhitungan ini adalah alat bantu edukasi syariah berdasarkan Fiqh Mawarith.',
    };
  }

  // Determine presence of children/grandchildren
  const hasChildren = input.anakLakiCount > 0 || input.anakPerempuanCount > 0;
  const hasGrandchildren = input.cucuLakiCount > 0 || input.cucuPerempuanCount > 0;
  const hasDescendants = hasChildren || hasGrandchildren;

  const totalSiblings =
    input.saudaraLakiKandungCount +
    input.saudaraPerempuanKandungCount +
    input.saudaraLakiSeayahCount +
    input.saudaraLakiSeibuCount;

  // Track numerators over a common denominator (LCM = 24)
  const DENOMINATOR = 24;
  let allocatedParts = 0;

  // 1. Suami / Istri
  if (input.genderPewaris === 'wanita' && input.suamiCount > 0) {
    // Suami mendapat 1/2 jika tidak ada anak, 1/4 jika ada anak
    const fraction = hasDescendants ? 1 / 4 : 1 / 2;
    const parts = fraction * DENOMINATOR;
    allocatedParts += parts;
    shares.push({
      heirKey: 'suami',
      name: 'Suami',
      arabicName: 'الزَّوْج',
      count: 1,
      fractionText: hasDescendants ? '1/4' : '1/2',
      percentage: Math.round(fraction * 100 * 10) / 10,
      nominalIDR: Math.round(hartaBersihWaris * fraction),
      dalilText: hasDescendants
        ? 'QS. An-Nisa: 12 (Suami mendapat 1/4 jika almarhumah memiliki anak)'
        : 'QS. An-Nisa: 12 (Suami mendapat 1/2 jika almarhumah tidak memiliki anak)',
    });
  } else if (input.genderPewaris === 'pria' && input.istriCount > 0) {
    // Istri mendapat 1/4 jika tidak ada anak, 1/8 jika ada anak
    const fraction = hasDescendants ? 1 / 8 : 1 / 4;
    const parts = fraction * DENOMINATOR;
    allocatedParts += parts;
    const count = Math.min(4, Math.max(1, input.istriCount));
    shares.push({
      heirKey: 'istri',
      name: count > 1 ? `Istri (${count} orang)` : 'Istri',
      arabicName: 'الزَّوْجَة',
      count,
      fractionText: hasDescendants ? '1/8' : '1/4',
      percentage: Math.round(fraction * 100 * 10) / 10,
      nominalIDR: Math.round(hartaBersihWaris * fraction),
      dalilText: hasDescendants
        ? 'QS. An-Nisa: 12 (Istri mendapat 1/8 bagian jika almarhum memiliki anak)'
        : 'QS. An-Nisa: 12 (Istri mendapat 1/4 bagian jika almarhum tidak memiliki anak)',
    });
  }

  // 2. Ibu
  if (input.ibuExist) {
    // Ibu mendapat 1/6 jika ada anak/cucu atau >= 2 saudara; selain itu 1/3
    const fraction = hasDescendants || totalSiblings >= 2 ? 1 / 6 : 1 / 3;
    const parts = fraction * DENOMINATOR;
    allocatedParts += parts;
    shares.push({
      heirKey: 'ibu',
      name: 'Ibu',
      arabicName: 'الأُّمّ',
      count: 1,
      fractionText: fraction === 1 / 6 ? '1/6' : '1/3',
      percentage: Math.round(fraction * 100 * 10) / 10,
      nominalIDR: Math.round(hartaBersihWaris * fraction),
      dalilText:
        fraction === 1 / 6
          ? 'QS. An-Nisa: 11 (Ibu mendapat 1/6 jika almarhum memiliki anak atau 2+ saudara)'
          : 'QS. An-Nisa: 11 (Ibu mendapat 1/3 jika almarhum tidak memiliki anak dan saudara)',
    });
  }

  // 3. Nenek (Mahjub jika ada Ibu)
  if (input.nenekExist) {
    if (input.ibuExist) {
      shares.push({
        heirKey: 'nenek',
        name: 'Nenek',
        arabicName: 'الجَدَّة',
        count: 1,
        fractionText: '0 (Terhalang)',
        percentage: 0,
        nominalIDR: 0,
        dalilText: 'Ijma Ulama Mawarith (Nenek terhalang/mahjub oleh keberadaan Ibu kandung)',
        isMahjub: true,
        reason: 'Mahjub oleh Ibu',
      });
    } else {
      const fraction = 1 / 6;
      const parts = fraction * DENOMINATOR;
      allocatedParts += parts;
      shares.push({
        heirKey: 'nenek',
        name: 'Nenek',
        arabicName: 'الجَدَّة',
        count: 1,
        fractionText: '1/6',
        percentage: Math.round(fraction * 100 * 10) / 10,
        nominalIDR: Math.round(hartaBersihWaris * fraction),
        dalilText: 'Hadis Sahih Riwayat Abu Daud & Tirmidzi (Nenek mendapat 1/6 jika Ibu tidak ada)',
      });
    }
  }

  // 4. Ayah
  let ayahIsAsabahOnly = false;
  if (input.ayahExist) {
    if (input.anakLakiCount > 0) {
      // Ayah mendapat 1/6 pasti
      const fraction = 1 / 6;
      const parts = fraction * DENOMINATOR;
      allocatedParts += parts;
      shares.push({
        heirKey: 'ayah',
        name: 'Ayah',
        arabicName: 'الأَب',
        count: 1,
        fractionText: '1/6',
        percentage: Math.round(fraction * 100 * 10) / 10,
        nominalIDR: Math.round(hartaBersihWaris * fraction),
        dalilText: 'QS. An-Nisa: 11 (Ayah mendapat 1/6 jika almarhum meninggalkan anak laki-laki)',
      });
    } else if (input.anakPerempuanCount > 0) {
      // Ayah mendapat 1/6 + Asabah sisanya
      const fraction = 1 / 6;
      const parts = fraction * DENOMINATOR;
      allocatedParts += parts;
      shares.push({
        heirKey: 'ayah',
        name: 'Ayah (1/6 + Sisa)',
        arabicName: 'الأَب',
        count: 1,
        fractionText: '1/6 + Asabah',
        percentage: Math.round(fraction * 100 * 10) / 10,
        nominalIDR: Math.round(hartaBersihWaris * fraction),
        dalilText: 'QS. An-Nisa: 11 & Kaidah Asabah (Ayah mendapat 1/6 serta berhak atas sisa harta)',
      });
    } else {
      // Ayah menjadi Asabah murni (mengambil sisa)
      ayahIsAsabahOnly = true;
    }
  }

  // 5. Kakek (Mahjub jika Ayah ada)
  if (input.kakekExist) {
    if (input.ayahExist) {
      shares.push({
        heirKey: 'kakek',
        name: 'Kakek',
        arabicName: 'الجَدّ',
        count: 1,
        fractionText: '0 (Terhalang)',
        percentage: 0,
        nominalIDR: 0,
        dalilText: 'Ijma Ulama Mawarith (Kakek terhalang/mahjub oleh keberadaan Ayah kandung)',
        isMahjub: true,
        reason: 'Mahjub oleh Ayah',
      });
    } else if (input.anakLakiCount > 0) {
      const fraction = 1 / 6;
      const parts = fraction * DENOMINATOR;
      allocatedParts += parts;
      shares.push({
        heirKey: 'kakek',
        name: 'Kakek',
        arabicName: 'الجَدّ',
        count: 1,
        fractionText: '1/6',
        percentage: Math.round(fraction * 100 * 10) / 10,
        nominalIDR: Math.round(hartaBersihWaris * fraction),
        dalilText: 'Kedudukan Kakek menggantikan Ayah ketika Ayah telah wafat (1/6)',
      });
    }
  }

  // 6. Anak Perempuan (tanpa Anak Laki-Laki)
  if (input.anakPerempuanCount > 0 && input.anakLakiCount === 0) {
    const fraction = input.anakPerempuanCount === 1 ? 1 / 2 : 2 / 3;
    const parts = fraction * DENOMINATOR;
    allocatedParts += parts;
    const title =
      input.anakPerempuanCount === 1
        ? 'Anak Perempuan (1 orang)'
        : `Anak Perempuan (${input.anakPerempuanCount} orang)`;
    shares.push({
      heirKey: 'anak_perempuan',
      name: title,
      arabicName: 'البِنْت',
      count: input.anakPerempuanCount,
      fractionText: input.anakPerempuanCount === 1 ? '1/2' : '2/3',
      percentage: Math.round(fraction * 100 * 10) / 10,
      nominalIDR: Math.round(hartaBersihWaris * fraction),
      dalilText:
        input.anakPerempuanCount === 1
          ? 'QS. An-Nisa: 11 (Seorang anak perempuan tunggal mendapat 1/2 bagian)'
          : 'QS. An-Nisa: 11 (Dua atau lebih anak perempuan mendapat 2/3 bagian dibagi rata)',
    });
  }

  // 7. Saudara Laki & Perempuan (Mahjub jika ada Ayah, Anak Laki, atau Cucu Laki)
  const isSiblingsMahjub = input.ayahExist || input.anakLakiCount > 0 || input.cucuLakiCount > 0;

  if (totalSiblings > 0) {
    if (isSiblingsMahjub) {
      if (input.saudaraLakiKandungCount > 0 || input.saudaraPerempuanKandungCount > 0) {
        shares.push({
          heirKey: 'saudara_kandung',
          name: 'Saudara Kandung',
          arabicName: 'الأَخ / الأُخْت الشَّقِيقَة',
          count: input.saudaraLakiKandungCount + input.saudaraPerempuanKandungCount,
          fractionText: '0 (Terhalang)',
          percentage: 0,
          nominalIDR: 0,
          dalilText: 'QS. An-Nisa: 176 (Saudara terhalang/mahjub oleh keberadaan Ayah atau Anak Laki-Laki)',
          isMahjub: true,
          reason: 'Mahjub oleh Ayah/Anak Laki-Laki',
        });
      }
    }
  }

  // 8. ASABAH (Penerima Sisa Harta)
  // Sisa bagian dalam kuintil / pecahan
  let remainingParts = DENOMINATOR - allocatedParts;
  let adjustmentsNote = '';
  let hasAul = false;
  let hasRadd = false;

  if (remainingParts < 0) {
    // Pembagian mengalami 'AUL (Total bagian pasti melebihi 100%)
    hasAul = true;
    adjustmentsNote =
      "Terjadi 'AUL: Jumlah bagian Ashabul Furudh melebihi total harta kotor (100%). Seluruh bagian disesuaikan secara proporsional agar adil sesuai kaidah Fiqh Mawarith.";
    const totalPartsNeeded = allocatedParts;
    // Rescale all fixed shares
    shares.forEach((s) => {
      if (!s.isMahjub && s.nominalIDR > 0) {
        const ratio = (s.percentage / 100 * DENOMINATOR) / totalPartsNeeded;
        s.nominalIDR = Math.round(hartaBersihWaris * ratio);
        s.percentage = Math.round(ratio * 100 * 10) / 10;
        s.fractionText = `${s.fractionText} ('Aul)`;
      }
    });
  } else if (remainingParts > 0) {
    // Sisa harta dialokasikan ke Asabah
    if (input.anakLakiCount > 0) {
      // Anak Laki + Anak Perempuan menjadi Asabah bi Ghairihi
      const maleWeight = input.anakLakiCount * 2;
      const femaleWeight = input.anakPerempuanCount * 1;
      const totalWeight = maleWeight + femaleWeight;

      const asabahNominalTotal = Math.round((remainingParts / DENOMINATOR) * hartaBersihWaris);

      if (input.anakLakiCount > 0) {
        const maleShareNominal = Math.round((asabahNominalTotal * maleWeight) / totalWeight);
        const maleFraction = (remainingParts / DENOMINATOR) * (maleWeight / totalWeight);
        shares.push({
          heirKey: 'anak_laki',
          name: `Anak Laki-Laki (${input.anakLakiCount} orang)`,
          arabicName: 'الاِبْن',
          count: input.anakLakiCount,
          fractionText: 'Asabah (Sisa)',
          percentage: Math.round(maleFraction * 100 * 10) / 10,
          nominalIDR: maleShareNominal,
          dalilText: 'QS. An-Nisa: 11 (Anak laki-laki mendapat bagian Asabah dengan rasio 2:1 dari anak perempuan)',
          isAsabah: true,
        });
      }

      if (input.anakPerempuanCount > 0 && input.anakLakiCount > 0) {
        const femaleShareNominal = Math.round((asabahNominalTotal * femaleWeight) / totalWeight);
        const femaleFraction = (remainingParts / DENOMINATOR) * (femaleWeight / totalWeight);
        // Update or add female entry
        shares.push({
          heirKey: 'anak_perempuan_asabah',
          name: `Anak Perempuan bersama Anak Laki-Laki (${input.anakPerempuanCount} orang)`,
          arabicName: 'البِنْت مَعَ الاِبْن',
          count: input.anakPerempuanCount,
          fractionText: 'Asabah bi Ghairihi',
          percentage: Math.round(femaleFraction * 100 * 10) / 10,
          nominalIDR: femaleShareNominal,
          dalilText: 'QS. An-Nisa: 11 (Menjadi Asabah bi Ghairihi bersama saudara laki-lakinya)',
          isAsabah: true,
        });
      }
      remainingParts = 0;
    } else if (ayahIsAsabahOnly) {
      // Ayah mengambil seluruh sisa harta sebagai Asabah Binafsihi
      const nominal = Math.round((remainingParts / DENOMINATOR) * hartaBersihWaris);
      const fraction = remainingParts / DENOMINATOR;
      shares.push({
        heirKey: 'ayah_asabah',
        name: 'Ayah (Asabah)',
        arabicName: 'الأَب (عَصَبَة)',
        count: 1,
        fractionText: 'Asabah Binafsihi (Sisa Harta)',
        percentage: Math.round(fraction * 100 * 10) / 10,
        nominalIDR: nominal,
        dalilText: 'Hadis Muttafaq Alaih: "Berikan bagian warisan kepada ahli warisnya, sisanya untuk laki-laki terdekat (Ayah)"',
        isAsabah: true,
      });
      remainingParts = 0;
    } else if (!isSiblingsMahjub && input.saudaraLakiKandungCount > 0) {
      // Saudara Laki Kandung menjadi Asabah
      const nominal = Math.round((remainingParts / DENOMINATOR) * hartaBersihWaris);
      const fraction = remainingParts / DENOMINATOR;
      shares.push({
        heirKey: 'saudara_laki_kandung_asabah',
        name: `Saudara Laki-Laki Kandung (${input.saudaraLakiKandungCount} orang)`,
        arabicName: 'الأَخ الشَّقِيق',
        count: input.saudaraLakiKandungCount,
        fractionText: 'Asabah Binafsihi',
        percentage: Math.round(fraction * 100 * 10) / 10,
        nominalIDR: nominal,
        dalilText: 'QS. An-Nisa: 176 (Saudara laki-laki kandung mewarisi sisa harta jika almarhum Kalalah)',
        isAsabah: true,
      });
      remainingParts = 0;
    } else if (remainingParts > 0 && shares.length > 0) {
      // Terjadi RADD (Sisa harta dikembalikan kepada ahli waris selain suami/istri)
      hasRadd = true;
      adjustmentsNote =
        "Terjadi RADD: Seluruh bagian Ashabul Furudh telah dibagikan namun masih ada sisa harta tanpa Asabah. Sisa dikembalikan secara proporsional kepada ahli waris utama.";
      const activeShares = shares.filter((s) => !s.isMahjub && s.heirKey !== 'suami' && s.heirKey !== 'istri');
      if (activeShares.length > 0) {
        const activeSumNominal = activeShares.reduce((acc, s) => acc + s.nominalIDR, 0);
        const spouseNominal = shares.filter((s) => s.heirKey === 'suami' || s.heirKey === 'istri').reduce((acc, s) => acc + s.nominalIDR, 0);
        const poolForRadd = hartaBersihWaris - spouseNominal;

        activeShares.forEach((s) => {
          const ratio = activeSumNominal > 0 ? s.nominalIDR / activeSumNominal : 1 / activeShares.length;
          s.nominalIDR = Math.round(poolForRadd * ratio);
          s.percentage = Math.round((s.nominalIDR / hartaBersihWaris) * 100 * 10) / 10;
          s.fractionText = `${s.fractionText} (+Radd)`;
        });
      }
    }
  }

  return {
    totalHartaKotor,
    totalHutangBiaya,
    wasiatNominal,
    hartaBersihWaris,
    shares,
    adjustmentsNote: adjustmentsNote || undefined,
    hasAul,
    hasRadd,
    disclaimer:
      'Pemberitahuan: Kalkulator Waris Syariah ini merupakan media edukasi dan simulasi perhitungan Fiqh Mawarith. Untuk penetapan waris hukum mengikat dan sengketa keluarga, silakan konsultasikan dengan Pengadilan Agama atau Lembaga Fatwa resmi.',
  };
}
