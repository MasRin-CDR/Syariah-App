import { LearningMaterial, UserMode } from '../types';

export const LEARNING_MATERIALS: LearningMaterial[] = [
  // --- SD LEVEL ---
  {
    id: 'mat_sd_1',
    title: 'Mengenal Rukun Islam & Rukun Iman',
    subtitle: 'Pondasi Utama Agama Kita sejak Dini',
    category: 'Aqidah',
    level: 'sd',
    readTimeMinutes: 3,
    iconName: 'BookOpen',
    summary: 'Belajar 5 Rukun Islam dan 6 Rukun Iman dengan bahasa ringkas dan mudah dipahami anak SD.',
    contentSections: [
      {
        heading: 'Apa itu Rukun Islam?',
        text: 'Rukun Islam adalah 5 amalan utama yang wajib dilakukan oleh setiap muslim: Syahadat, Shalat, Zakat, Puasa, dan Naik Haji bila mampu.',
        dalilArab: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ',
        dalilIndo: 'Islam dibangun di atas lima perkara (HR. Bukhari & Muslim).'
      },
      {
        heading: 'Apa itu Rukun Iman?',
        text: 'Rukun Iman adalah 6 hal yang wajib kita yakini dalam hati: Beriman kepada Allah, Malaikat-Nya, Kitab-Kitab-Nya, Para Rasul-Nya, Hari Kiamat, serta Qadha dan Qadar.'
      }
    ]
  },
  {
    id: 'mat_sd_2',
    title: 'Tata Cara Wudhu yang Benar',
    subtitle: 'Bersuci Sebelum Melaksanakan Shalat',
    category: 'Fiqh',
    level: 'sd',
    readTimeMinutes: 4,
    iconName: 'Droplets',
    summary: 'Langkah-langkah praktis berwudhu mulai dari niat, membasuh muka hingga mengusap kaki.',
    contentSections: [
      {
        heading: 'Urutan Wudhu',
        text: '1. Niat dalam hati dan membaca Bismillah.\n2. Membasuh kedua telapak tangan 3x.\n3. Berkumur dan membersihkan hidung 3x.\n4. Membasuh seluruh wajah 3x.\n5. Membasuh kedua tangan sampai siku 3x.\n6. Mengusap sebagian kepala dan telinga 1x.\n7. Membasuh kedua kaki sampai mata kaki 3x.'
      }
    ]
  },

  // --- SMP LEVEL ---
  {
    id: 'mat_smp_1',
    title: 'Fiqh Thaharah & Ketentuan Najasah',
    subtitle: 'Memahami Jenis Najis dan Cara Menyucikannya',
    category: 'Fiqh',
    level: 'smp',
    readTimeMinutes: 5,
    iconName: 'ShieldCheck',
    summary: 'Penjelasan rinci Najis Mukhaffafah, Mutawassithah, dan Mughallazhah beserta dalil penyuciannya.',
    contentSections: [
      {
        heading: 'Klasifikasi Najis dalam Fiqh',
        text: '1. Najis Mukhaffafah (Ringan): Air kencing bayi laki-laki yang belum makan selain ASI. Cukup diperciki air.\n2. Najis Mutawassithah (Sedang): Darah, nanah, bangkai. Disucikan sampai hilang bau, warna, dan rasa.\n3. Najis Mughallazhah (Berat): Anjing dan babi. Disucikan 7 kali pembasuhan, salah satunya dengan tanah bersih.'
      }
    ]
  },
  {
    id: 'mat_smp_2',
    title: 'Syarat Sah & Rukun Shalat Fardhu',
    subtitle: 'Pilar Ketiga dalam Beragama',
    category: 'Fiqh',
    level: 'smp',
    readTimeMinutes: 6,
    iconName: 'Clock',
    summary: 'Perbedaan antara syarat wajib, syarat sah, dan rukun shalat serta pembatal shalat.',
    contentSections: [
      {
        heading: 'Rukun Shalat',
        text: 'Rukun shalat adalah bagian inti dari shalat yang tidak boleh ditinggalkan baik sengaja maupun lupa. Di antaranya: Niat, Takbiratul Ihram, Berdiri bagi yang mampu, Membaca Al-Fatihah, Ruku\', I\'tidal, Sujud 2x, Duduk antara dua sujud, Tasyahud Akhir, dan Salam.'
      }
    ]
  },

  // --- SMA LEVEL ---
  {
    id: 'mat_sma_1',
    title: 'Pengantar Fiqh Muamalah & Akad Syariah',
    subtitle: 'Prinsip Transaksi Keuangan Bebas Riba, Gharar, & Maysir',
    category: 'Muamalah',
    level: 'sma',
    readTimeMinutes: 7,
    iconName: 'Coins',
    summary: 'Memahami rukun jual beli syariah, larangan Riba (Fadl & Nasi\'ah), Gharar, dan etika bisnis Islam.',
    contentSections: [
      {
        heading: 'Prinsip Jual Beli dalam Islam',
        text: "Jual beli disyariatkan berdasarkan kerelaan kedua belah pihak (An-Taradhin). Rukun jual beli meliputi: Penjual & Pembeli ('Aqidain), Barang/Jasa (Ma'qud 'Alaih), serta Ijab dan Qabul (Sighat).",
        dalilArab: 'وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',
        dalilIndo: 'Dan Allah telah menghalalkan jual beli dan mengharamkan riba (QS. Al-Baqarah: 275).'
      }
    ]
  },
  {
    id: 'mat_sma_2',
    title: 'Dasar-Dasar Ilmu Mawarith (Faradh)',
    subtitle: 'Hukum Pembagian Waris Menurut Syariat Islam',
    category: 'Mawarith',
    level: 'sma',
    readTimeMinutes: 8,
    iconName: 'Calculator',
    summary: 'Pengenalan Ashabul Furudh, bagian-bagian pasti (1/2, 1/4, 1/8, 2/3, 1/3, 1/6) dan golongan Asabah.',
    contentSections: [
      {
        heading: 'Mengapa Ilmu Waris Penting?',
        text: 'Ilmu Waris menjaga keadilan pembagian harta peninggalan almarhum agar tidak memicu perselisihan di antara ahli waris. Islam memprioritaskan penyelesaian hutang, biaya pengurusan jenazah, dan wasiat sebelum harta dibagikan.',
        dalilArab: 'تِلْكَ حُدُودُ اللَّهِ',
        dalilIndo: 'Hukum-hukum waris itu adalah ketentuan-ketentuan dari Allah (QS. An-Nisa: 13).'
      }
    ]
  },

  // --- MAHASISWA LEVEL ---
  {
    id: 'mat_mhs_1',
    title: 'Pengantar Usul Fiqh & Metodologi Ijtihad',
    subtitle: 'Memahami Sumber Hukum: Al-Qur\'an, Sunnah, Ijma, dan Qiyas',
    category: 'Fiqh',
    level: 'mahasiswa',
    readTimeMinutes: 10,
    iconName: 'GraduationCap',
    summary: 'Studi komparatif penetapan hukum syara\', dalil qath\'i vs zhanni, serta kaidah-kaidah Fiqhiyyah utama.',
    contentSections: [
      {
        heading: 'Hierarki Sumber Hukum Islam',
        text: '1. Al-Qur\'an (Wahyu Qath\'i al-Wurud)\n2. As-Sunnah (Penjelas dan Penentu Hukum Syara\')\n3. Al-Ijma\' (Kesepakatan para Mujtahid setelah wafat Rasulullah SAW)\n4. Al-Qiyas (Menganalogikan hukum hukum baru dengan hukum asal berdasarkan persaamaan \'illat).'
      },
      {
        heading: 'Kaidah Fiqhiyyah Utama (Al-Qawa\'id Al-Khamsah)',
        text: '1. Al-Umuru bi Maqasidiha (Segala perkara bergantung pada niatnya)\n2. Al-Yaqinu La Yazulu bisy-Syakk (Keyakinan tidak hilang dengan keraguan)\n3. Al-Masyaqqatu Tajlibut-Taysir (Kesulitan mendatangkan kemudahan/rukhsah)\n4. Adh-Dhararu Yuzal (Kemudaratan harus dihilangkan)\n5. Al-\'Aadatu Muhakkamah (Adat kebiasaan dapat dijadikan dasar hukum selama tidak bertentangan dengan dalil).'
      }
    ]
  },
  {
    id: 'mat_mhs_2',
    title: 'Studi Komparatif Perbandingan Mazhab Fiqh (Al-Fiqh Al-Muqaran)',
    subtitle: 'Peta Pemikiran Hanafi, Maliki, Syafi\'i, dan Hanbali',
    category: 'Fiqh',
    level: 'mahasiswa',
    readTimeMinutes: 12,
    iconName: 'BookMarked',
    summary: 'Memahami latar belakang perbedaan pendapat (Ikhtilaf) para imam mazhab dengan adab akademis dan sikap toleran.',
    contentSections: [
      {
        heading: 'Sebab-Sebab Ikhtilaf Fuqaha',
        text: 'Perbedaan penetapan hukum antarmazhab bersumber dari perbedaan dalam penerimaan sanad hadis, pemahaman Lafadz (Musytarak, Haqiqah/Majaz), penetapan dalil sekunder (Maslahah Mursalah, Istihsan, \'Urf), serta metode istinbath hukum.'
      }
    ]
  }
];

export const getMaterialsByLevel = (level: UserMode): LearningMaterial[] => {
  return LEARNING_MATERIALS.filter((m) => m.level === level);
};
