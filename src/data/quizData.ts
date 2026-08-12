import { QuizQuestion, UserMode } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // SD Level Quizzes
  {
    id: 'q_sd_1',
    level: 'sd',
    category: 'Rukun Islam',
    question: 'Ada berapa jumlah Rukun Islam?',
    options: ['3 Perkara', '5 Perkara', '6 Perkara', '10 Perkara'],
    correctAnswerIndex: 1,
    explanation: 'Rukun Islam ada 5: Syahadat, Shalat, Zakat, Puasa, dan Naik Haji bagi yang mampu.',
    dalilRef: 'HR. Bukhari & Muslim',
  },
  {
    id: 'q_sd_2',
    level: 'sd',
    category: 'Wudhu',
    question: 'Sebelum melaksanakan Shalat, kita diwajibkan untuk...',
    options: ['Tidur', 'Makan', 'Berwudhu', 'Berlari'],
    correctAnswerIndex: 2,
    explanation: 'Wudhu adalah syarat sah shalat untuk menyucikan diri dari hadats kecil.',
    dalilRef: 'QS. Al-Ma\'idah: 6',
  },
  {
    id: 'q_sd_3',
    level: 'sd',
    category: 'Al-Qur\'an',
    question: 'Surah Al-Fatihah terdiri dari berapa ayat?',
    options: ['5 Ayat', '7 Ayat', '10 Ayat', '3 Ayat'],
    correctAnswerIndex: 1,
    explanation: 'Surah Al-Fatihah memiliki 7 ayat dan dinamakan juga As-Sab\'ul Mathani.',
  },

  // SMP Level Quizzes
  {
    id: 'q_smp_1',
    level: 'smp',
    category: 'Thaharah',
    question: 'Najis anjing atau babi dinamakan Najis...',
    options: ['Mukhaffafah', 'Mutawassithah', 'Mughallazhah', 'Ma\'fu'],
    correctAnswerIndex: 2,
    explanation: 'Najis berat (Mughallazhah) disucikan dengan membasuh 7 kali, salah satunya dicampur dengan tanah.',
    dalilRef: 'HR. Muslim',
  },
  {
    id: 'q_smp_2',
    level: 'smp',
    category: 'Shalat Fardhu',
    question: 'Manakah di bawah ini yang termasuk Rukun Shalat?',
    options: ['Membaca Doa Iftitah', 'Membaca Surat Pendek', 'Membaca Al-Fatihah', 'Mengangkat tangan saat Takbir'],
    correctAnswerIndex: 2,
    explanation: 'Membaca Al-Fatihah adalah Rukun Shalat. Tanpa Al-Fatihah, shalat tidak sah.',
    dalilRef: 'HR. Bukhari & Muslim: "Tidak sah shalat bagi yang tidak membaca Al-Fatihah."',
  },

  // SMA Level Quizzes
  {
    id: 'q_sma_1',
    level: 'sma',
    category: 'Fiqh Muamalah',
    question: 'Penambahan nilai atas hutang atau penukaran barang sejenis yang tidak seimbang dinamakan...',
    options: ['Gharar', 'Riba', 'Maysir', 'Sirkah'],
    correctAnswerIndex: 1,
    explanation: 'Riba secara bahasa berarti tambahan yang diharamkan dalam syariat Islam.',
    dalilRef: 'QS. Al-Baqarah: 275',
  },
  {
    id: 'q_sma_2',
    level: 'sma',
    category: 'Mawarith',
    question: 'Berapakah bagian waris untuk seorang istri jika almarhum suami memiliki anak?',
    options: ['1/2', '1/4', '1/8', '2/3'],
    correctAnswerIndex: 2,
    explanation: 'Istri mendapat 1/8 bagian jika ada anak, dan 1/4 bagian jika tidak memiliki anak.',
    dalilRef: 'QS. An-Nisa: 12',
  },

  // Mahasiswa Level Quizzes
  {
    id: 'q_mhs_1',
    level: 'mahasiswa',
    category: 'Usul Fiqh',
    question: 'Kaidah "Al-Yaqinu La Yazulu bisy-Syakk" memiliki arti...',
    options: ['Kesulitan mendatangkan kemudahan', 'Keyakinan tidak dapat dihilangkan oleh keraguan', 'Segala perkara bergantung pada niatnya', 'Kemudaratan harus dihilangkan'],
    correctAnswerIndex: 1,
    explanation: 'Salah satu dari 5 Kaidah Fiqhiyyah Utama (Al-Qawa\'id Al-Khamsah Al-Kubra).',
  },
  {
    id: 'q_mhs_2',
    level: 'mahasiswa',
    category: 'Mawarith Lanjutan',
    question: 'Istilah "Ashabul Furudh" dalam Fiqh Mawarith merujuk pada ahli waris yang...',
    options: ['Mendapat sisa harta warisan saja', 'Mendapat bagian pasti yang ditentukan Al-Qur\'an dan As-Sunnah', 'Terhalang total dari warisan', 'Bukan kerabat kandung'],
    correctAnswerIndex: 1,
    explanation: 'Ashabul Furudh adalah penerima bagian pasti seperti 1/2, 1/4, 1/8, 2/3, 1/3, dan 1/6.',
    dalilRef: 'QS. An-Nisa: 11-12',
  }
];

export const getQuizByLevel = (level: UserMode): QuizQuestion[] => {
  return QUIZ_QUESTIONS.filter((q) => q.level === level);
};
