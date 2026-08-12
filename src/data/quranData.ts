import { Ayah, Surah } from '../types';

export const SURAH_LIST: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "Pembukaan", numberOfAyahs: 7, revelationType: "Meccan", latinName: "Al-Fatihah" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "Sapi Betina", numberOfAyahs: 286, revelationType: "Medinan", latinName: "Al-Baqarah" },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "Keluarga 'Imran", numberOfAyahs: 200, revelationType: "Medinan", latinName: "Ali 'Imran" },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "Wanita", numberOfAyahs: 176, revelationType: "Medinan", latinName: "An-Nisa" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "Hidangan", numberOfAyahs: 120, revelationType: "Medinan", latinName: "Al-Ma'idah" },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "Binatang Ternak", numberOfAyahs: 165, revelationType: "Meccan", latinName: "Al-An'am" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "Tempat Tertinggi", numberOfAyahs: 206, revelationType: "Meccan", latinName: "Al-A'raf" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "Rampasan Perang", numberOfAyahs: 75, revelationType: "Medinan", latinName: "Al-Anfal" },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "Pengampunan", numberOfAyahs: 129, revelationType: "Medinan", latinName: "At-Tawbah" },
  { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Nabi Yunus", numberOfAyahs: 109, revelationType: "Meccan", latinName: "Yunus" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "Gua", numberOfAyahs: 110, revelationType: "Meccan", latinName: "Al-Kahf" },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", numberOfAyahs: 83, revelationType: "Meccan", latinName: "Ya-Sin" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "Yang Maha Pengasih", numberOfAyahs: 78, revelationType: "Medinan", latinName: "Ar-Rahman" },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", englishNameTranslation: "Hari Kiamat", numberOfAyahs: 96, revelationType: "Meccan", latinName: "Al-Waqi'ah" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "Kerajaan", numberOfAyahs: 30, revelationType: "Meccan", latinName: "Al-Mulk" },
  { number: 78, name: "النبإ", englishName: "An-Naba'", englishNameTranslation: "Berita Besar", numberOfAyahs: 40, revelationType: "Meccan", latinName: "An-Naba'" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "Ikhlas", numberOfAyahs: 4, revelationType: "Meccan", latinName: "Al-Ikhlas" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "Waktu Subuh", numberOfAyahs: 5, revelationType: "Meccan", latinName: "Al-Falaq" },
  { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "Manusia", numberOfAyahs: 6, revelationType: "Meccan", latinName: "An-Nas" }
];

export const STATIC_SURAHS_DATA: Record<number, Ayah[]> = {
  1: [
    {
      numberInSurah: 1,
      globalIndex: 1,
      textArab: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      transliteration: "Bismillāhir-raḥmānir-raḥīm",
      textIndo: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.",
      surahNumber: 1,
      surahName: "Al-Fatihah",
      tafsirShort: "Awal setiap perbuatan baik hendaknya dimulai dengan menyebut nama Allah.",
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"
    },
    {
      numberInSurah: 2,
      globalIndex: 2,
      textArab: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      transliteration: "Al-ḥamdu lillāhi rabbil-'ālamīn",
      textIndo: "Segala puji bagi Allah, Tuhan seluruh alam.",
      surahNumber: 1,
      surahName: "Al-Fatihah",
      tafsirShort: "Pujian tulus dari hamba kepada Sang Pencipta yang menguasai seluruh semesta.",
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3"
    },
    {
      numberInSurah: 3,
      globalIndex: 3,
      textArab: "الرَّحْمَٰنِ الرَّحِيمِ",
      transliteration: "Ar-raḥmānir-raḥīm",
      textIndo: "Yang Maha Pengasih lagi Maha Penyayang.",
      surahNumber: 1,
      surahName: "Al-Fatihah",
      tafsirShort: "Rahmat Allah meliputi seluruh makhluk di dunia dan khusus bagi orang beriman di akhirat.",
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3"
    },
    {
      numberInSurah: 4,
      globalIndex: 4,
      textArab: "مَالِكِ يَوْمِ الدِّينِ",
      transliteration: "Māliki yaumid-dīn",
      textIndo: "Pemilik hari pembalasan.",
      surahNumber: 1,
      surahName: "Al-Fatihah",
      tafsirShort: "Allah adalah penguasa mutlak pada hari perhitungan dan keadilan sejati.",
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3"
    },
    {
      numberInSurah: 5,
      globalIndex: 5,
      textArab: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      transliteration: "Iyyāka na'budu wa iyyāka nasta'īn",
      textIndo: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.",
      surahNumber: 1,
      surahName: "Al-Fatihah",
      tafsirShort: "Inti tauhid ibadah dan kemurnian doa tanpa menyukutukan Allah.",
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3"
    },
    {
      numberInSurah: 6,
      globalIndex: 6,
      textArab: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      transliteration: "Ihdinaṣ-ṣirāṭal-mustaqīm",
      textIndo: "Bimbinglah kami ke jalan yang lurus.",
      surahNumber: 1,
      surahName: "Al-Fatihah",
      tafsirShort: "Permohonan hidayah Islam, petunjuk kebenaran, dan keteguhan iman.",
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3"
    },
    {
      numberInSurah: 7,
      globalIndex: 7,
      textArab: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      transliteration: "Ṣirāṭallażīna an'amta 'alaihim gairil-magḍūbi 'alaihim wa laḍ-ḍāllīn",
      textIndo: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
      surahNumber: 1,
      surahName: "Al-Fatihah",
      tafsirShort: "Jalan para nabi, shiddiqin, syuhada, dan shalihin.",
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3"
    }
  ],
  112: [
    {
      numberInSurah: 1,
      textArab: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      transliteration: "Qul huwallāhu aḥad",
      textIndo: "Katakanlah (Muhammad), \"Dialah Allah, Yang Maha Esa.\"",
      surahNumber: 112,
      surahName: "Al-Ikhlas",
      tafsirShort: "Ketauhidan mutlak, Allah adalah Esa tidak berbilang."
    },
    {
      numberInSurah: 2,
      textArab: "اللَّهُ الصَّمَدُ",
      transliteration: "Allāhuṣ-ṣamad",
      textIndo: "Allah tempat meminta segala sesuatu.",
      surahNumber: 112,
      surahName: "Al-Ikhlas",
      tafsirShort: "As-Samad: Seluruh makhluk bergantung dan membutuhkan-Nya."
    },
    {
      numberInSurah: 3,
      textArab: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      transliteration: "Lam yalid wa lam yūlad",
      textIndo: "(Allah) tidak beranak dan tidak pula diperanakkan,",
      surahNumber: 112,
      surahName: "Al-Ikhlas",
      tafsirShort: "Maha Suci Allah dari sifat jasmani dan silsilah."
    },
    {
      numberInSurah: 4,
      textArab: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      transliteration: "Wa lam yakul lahū kufuwan aḥad",
      textIndo: "dan tidak ada sesuatu pun yang setara dengan Dia.",
      surahNumber: 112,
      surahName: "Al-Ikhlas",
      tafsirShort: "Tiada sekutu maupun tandingan bagi keagungan Allah."
    }
  ],
  113: [
    {
      numberInSurah: 1,
      textArab: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
      transliteration: "Qul a'ūżu birabbil-falaq",
      textIndo: "Katakanlah, \"Aku berlindung kepada Tuhan yang menguasai subuh (fajar),\"",
      surahNumber: 113,
      surahName: "Al-Falaq",
      tafsirShort: "Perlindungan diri kepada Allah dari kejahatan malam dan sihir."
    },
    {
      numberInSurah: 2,
      textArab: "مِن شَرِّ مَا خَلَقَ",
      transliteration: "Min syarri mā khalaq",
      textIndo: "dari kejahatan (makhluk yang) Dia ciptakan,",
      surahNumber: 113,
      surahName: "Al-Falaq",
      tafsirShort: "Mohon perlindungan dari marabahaya makhluk ciptaan."
    },
    {
      numberInSurah: 3,
      textArab: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      transliteration: "Wa min syarri gāsiqin iżā waqab",
      textIndo: "dan dari kejahatan malam apabila telah gelap gulita,",
      surahNumber: 113,
      surahName: "Al-Falaq",
      tafsirShort: "Kejahatan yang tersembunyi di dalam kegelapan malam."
    },
    {
      numberInSurah: 4,
      textArab: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      transliteration: "Wa min syarrin-naffāṡāti fil-'uqad",
      textIndo: "dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),",
      surahNumber: 113,
      surahName: "Al-Falaq",
      tafsirShort: "Perlindungan dari sihir dan gangguan kejahatan gaib."
    },
    {
      numberInSurah: 5,
      textArab: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      transliteration: "Wa min syarri ḥāsidin iżā ḥasad",
      textIndo: "dan dari kejahatan orang yang dengki apabila dia dengki.\"",
      surahNumber: 113,
      surahName: "Al-Falaq",
      tafsirShort: "Perlindungan dari sifat dengki dan 'ain."
    }
  ],
  114: [
    {
      numberInSurah: 1,
      textArab: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      transliteration: "Qul a'ūżu birabbin-nās",
      textIndo: "Katakanlah, \"Aku berlindung kepada Tuhannya manusia,\"",
      surahNumber: 114,
      surahName: "An-Nas",
      tafsirShort: "Permohonan perlindungan kepada Pemelihara manusia."
    },
    {
      numberInSurah: 2,
      textArab: "مَلِكِ النَّاسِ",
      transliteration: "Malikin-nās",
      textIndo: "Raja manusia,",
      surahNumber: 114,
      surahName: "An-Nas",
      tafsirShort: "Penguasa sejati alam semesta."
    },
    {
      numberInSurah: 3,
      textArab: "إِلَٰهِ النَّاسِ",
      transliteration: "Ilāhin-nās",
      textIndo: "Sembahan manusia,",
      surahNumber: 114,
      surahName: "An-Nas",
      tafsirShort: "Tuhan yang berhak disembah."
    },
    {
      numberInSurah: 4,
      textArab: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      transliteration: "Min syarril-waswāsil-khannās",
      textIndo: "dari kejahatan (bisikan) setan yang bersembunyi,",
      surahNumber: 114,
      surahName: "An-Nas",
      tafsirShort: "Bisikan jahat setan yang selalu mengintai kehancuran manusia."
    },
    {
      numberInSurah: 5,
      textArab: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      transliteration: "Allażī yuwaswisu fī ṣudūrin-nās",
      textIndo: "yang membisikkan (kejahatan) ke dalam dada manusia,",
      surahNumber: 114,
      surahName: "An-Nas",
      tafsirShort: "Bisikan meragukan dalam dada dan hati."
    },
    {
      numberInSurah: 6,
      textArab: "مِنَ الْجِنَّةِ وَالنَّاسِ",
      transliteration: "Minal-jinnati wan-nās",
      textIndo: "dari (golongan) jin dan manusia.\"",
      surahNumber: 114,
      surahName: "An-Nas",
      tafsirShort: "Setan bisa berasal dari kalangan jin maupun manusia."
    }
  ]
};

// Featured daily verse for the Home hero section
export const FEATURED_AYAH: Ayah = {
  numberInSurah: 255,
  textArab: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
  transliteration: "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm, lā ta'khużuhū sinatuw wa lā naūm...",
  textIndo: "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus-menerus mengurus (makhluk-Nya). Tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan di bumi. (QS. Al-Baqarah: 255 - Ayat Kursi)",
  surahNumber: 2,
  surahName: "Al-Baqarah",
  tafsirShort: "Ayat paling agung dalam Al-Qur'an memuat keagungan Tauhid dan Kekuasaan Allah."
};
