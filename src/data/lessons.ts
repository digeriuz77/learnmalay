export interface WordEntry {
  malay: string;
  english: string;
  partOfSpeech?: string;
}

export interface Sentence {
  id: string;
  malay: string;
  english: string;
  words: WordEntry[];
}

export interface Collocation {
  id: string;
  malay: string[];
  english: string[];
  correctPair: [number, number][];
}

export interface FillBlank {
  id: string;
  sentence: string;
  blank: string;
  options: string[];
  correctIndex: number;
  englishHint: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleMalay: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  sentences: Sentence[];
  collocations: Collocation[];
  fillBlanks: FillBlank[];
}

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Greetings & Introductions',
    titleMalay: 'Salam & Perkenalan',
    description: 'Learn basic Malay greetings and how to introduce yourself in academic and social settings.',
    level: 'beginner',
    sentences: [
      {
        id: 's1-1',
        malay: 'Selamat pagi, nama saya Ahmad.',
        english: 'Good morning, my name is Ahmad.',
        words: [
          { malay: 'Selamat', english: 'Safe / Greetings', partOfSpeech: 'adjective' },
          { malay: 'pagi', english: 'morning', partOfSpeech: 'noun' },
          { malay: 'nama', english: 'name', partOfSpeech: 'noun' },
          { malay: 'saya', english: 'I / my', partOfSpeech: 'pronoun' },
          { malay: 'Ahmad', english: 'Ahmad (name)', partOfSpeech: 'proper noun' },
        ],
      },
      {
        id: 's1-2',
        malay: 'Apa khabar? Saya sihat, terima kasih.',
        english: 'How are you? I am well, thank you.',
        words: [
          { malay: 'Apa', english: 'What', partOfSpeech: 'pronoun' },
          { malay: 'khabar', english: 'news / condition', partOfSpeech: 'noun' },
          { malay: 'Saya', english: 'I', partOfSpeech: 'pronoun' },
          { malay: 'sihat', english: 'healthy / well', partOfSpeech: 'adjective' },
          { malay: 'terima', english: 'receive / accept', partOfSpeech: 'verb' },
          { malay: 'kasih', english: 'love / affection', partOfSpeech: 'noun' },
        ],
      },
      {
        id: 's1-3',
        malay: 'Saya pelajar dari universiti.',
        english: 'I am a student from the university.',
        words: [
          { malay: 'Saya', english: 'I', partOfSpeech: 'pronoun' },
          { malay: 'pelajar', english: 'student / learner', partOfSpeech: 'noun' },
          { malay: 'dari', english: 'from', partOfSpeech: 'preposition' },
          { malay: 'universiti', english: 'university', partOfSpeech: 'noun' },
        ],
      },
      {
        id: 's1-4',
        malay: 'Sila duduk di sini.',
        english: 'Please sit here.',
        words: [
          { malay: 'Sila', english: 'Please', partOfSpeech: 'adverb' },
          { malay: 'duduk', english: 'sit', partOfSpeech: 'verb' },
          { malay: 'di', english: 'at / in', partOfSpeech: 'preposition' },
          { malay: 'sini', english: 'here', partOfSpeech: 'adverb' },
        ],
      },
      {
        id: 's1-5',
        malay: 'Selamat tinggal, jumpa lagi.',
        english: 'Goodbye, see you again.',
        words: [
          { malay: 'Selamat', english: 'Safe / Greetings', partOfSpeech: 'adjective' },
          { malay: 'tinggal', english: 'stay / remain', partOfSpeech: 'verb' },
          { malay: 'jumpa', english: 'meet / see', partOfSpeech: 'verb' },
          { malay: 'lagi', english: 'again / more', partOfSpeech: 'adverb' },
        ],
      },
    ],
    collocations: [
      {
        id: 'c1-1',
        malay: ['Selamat pagi', 'Terima kasih', 'Apa khabar', 'Selamat tinggal'],
        english: ['Good morning', 'Thank you', 'How are you', 'Goodbye'],
        correctPair: [[0, 0], [1, 1], [2, 2], [3, 3]],
      },
    ],
    fillBlanks: [
      {
        id: 'f1-1',
        sentence: 'Selamat ___, nama saya Ali.',
        blank: 'pagi',
        options: ['pagi', 'malam', 'tinggal', 'kasih'],
        correctIndex: 0,
        englishHint: 'Good ___ (morning), my name is Ali.',
      },
      {
        id: 'f1-2',
        sentence: 'Apa ___? Saya sihat.',
        blank: 'khabar',
        options: ['nama', 'khabar', 'pagi', 'saya'],
        correctIndex: 1,
        englishHint: 'How are you (What ___)?  I am well.',
      },
      {
        id: 'f1-3',
        sentence: 'Saya ___ dari universiti.',
        blank: 'pelajar',
        options: ['guru', 'pelajar', 'doktor', 'polis'],
        correctIndex: 1,
        englishHint: 'I am a ___ (student) from the university.',
      },
    ],
  },
  {
    id: 'lesson-2',
    title: 'At the University',
    titleMalay: 'Di Universiti',
    description: 'Navigate university life in Malay — classrooms, libraries, and academic discussions.',
    level: 'beginner',
    sentences: [
      {
        id: 's2-1',
        malay: 'Perpustakaan dibuka pada pukul lapan pagi.',
        english: 'The library opens at eight in the morning.',
        words: [
          { malay: 'Perpustakaan', english: 'Library', partOfSpeech: 'noun' },
          { malay: 'dibuka', english: 'is opened', partOfSpeech: 'verb (passive)' },
          { malay: 'pada', english: 'at / on', partOfSpeech: 'preposition' },
          { malay: 'pukul', english: "o'clock", partOfSpeech: 'noun' },
          { malay: 'lapan', english: 'eight', partOfSpeech: 'numeral' },
          { malay: 'pagi', english: 'morning', partOfSpeech: 'noun' },
        ],
      },
      {
        id: 's2-2',
        malay: 'Kelas bahasa Melayu bermula hari ini.',
        english: 'The Malay language class starts today.',
        words: [
          { malay: 'Kelas', english: 'Class', partOfSpeech: 'noun' },
          { malay: 'bahasa', english: 'language', partOfSpeech: 'noun' },
          { malay: 'Melayu', english: 'Malay', partOfSpeech: 'adjective' },
          { malay: 'bermula', english: 'begins / starts', partOfSpeech: 'verb' },
          { malay: 'hari', english: 'day', partOfSpeech: 'noun' },
          { malay: 'ini', english: 'this', partOfSpeech: 'determiner' },
        ],
      },
      {
        id: 's2-3',
        malay: 'Profesor mengajar subjek sains komputer.',
        english: 'The professor teaches computer science.',
        words: [
          { malay: 'Profesor', english: 'Professor', partOfSpeech: 'noun' },
          { malay: 'mengajar', english: 'teaches', partOfSpeech: 'verb' },
          { malay: 'subjek', english: 'subject', partOfSpeech: 'noun' },
          { malay: 'sains', english: 'science', partOfSpeech: 'noun' },
          { malay: 'komputer', english: 'computer', partOfSpeech: 'noun' },
        ],
      },
      {
        id: 's2-4',
        malay: 'Saya perlu membaca buku teks ini.',
        english: 'I need to read this textbook.',
        words: [
          { malay: 'Saya', english: 'I', partOfSpeech: 'pronoun' },
          { malay: 'perlu', english: 'need', partOfSpeech: 'verb' },
          { malay: 'membaca', english: 'to read', partOfSpeech: 'verb' },
          { malay: 'buku', english: 'book', partOfSpeech: 'noun' },
          { malay: 'teks', english: 'text', partOfSpeech: 'noun' },
          { malay: 'ini', english: 'this', partOfSpeech: 'determiner' },
        ],
      },
    ],
    collocations: [
      {
        id: 'c2-1',
        malay: ['buku teks', 'sains komputer', 'bahasa Melayu', 'hari ini'],
        english: ['textbook', 'computer science', 'Malay language', 'today'],
        correctPair: [[0, 0], [1, 1], [2, 2], [3, 3]],
      },
    ],
    fillBlanks: [
      {
        id: 'f2-1',
        sentence: '___ dibuka pada pukul lapan pagi.',
        blank: 'Perpustakaan',
        options: ['Perpustakaan', 'Universiti', 'Kelas', 'Bilik'],
        correctIndex: 0,
        englishHint: 'The ___ (library) opens at eight in the morning.',
      },
      {
        id: 'f2-2',
        sentence: 'Profesor ___ subjek sains komputer.',
        blank: 'mengajar',
        options: ['membaca', 'mengajar', 'menulis', 'bermula'],
        correctIndex: 1,
        englishHint: 'The professor ___ (teaches) computer science.',
      },
      {
        id: 'f2-3',
        sentence: 'Saya perlu ___ buku teks ini.',
        blank: 'membaca',
        options: ['menulis', 'membaca', 'mengajar', 'membeli'],
        correctIndex: 1,
        englishHint: 'I need to ___ (read) this textbook.',
      },
    ],
  },
  {
    id: 'lesson-3',
    title: 'Daily Activities',
    titleMalay: 'Aktiviti Harian',
    description: 'Describe your daily routine and activities using common Malay verbs and time expressions.',
    level: 'intermediate',
    sentences: [
      {
        id: 's3-1',
        malay: 'Saya bangun awal setiap pagi untuk bersenam.',
        english: 'I wake up early every morning to exercise.',
        words: [
          { malay: 'Saya', english: 'I', partOfSpeech: 'pronoun' },
          { malay: 'bangun', english: 'wake up / get up', partOfSpeech: 'verb' },
          { malay: 'awal', english: 'early', partOfSpeech: 'adjective' },
          { malay: 'setiap', english: 'every', partOfSpeech: 'determiner' },
          { malay: 'pagi', english: 'morning', partOfSpeech: 'noun' },
          { malay: 'untuk', english: 'to / for', partOfSpeech: 'preposition' },
          { malay: 'bersenam', english: 'to exercise', partOfSpeech: 'verb' },
        ],
      },
      {
        id: 's3-2',
        malay: 'Kami makan tengah hari di kantin universiti.',
        english: 'We eat lunch at the university canteen.',
        words: [
          { malay: 'Kami', english: 'We (exclusive)', partOfSpeech: 'pronoun' },
          { malay: 'makan', english: 'eat', partOfSpeech: 'verb' },
          { malay: 'tengah', english: 'middle', partOfSpeech: 'noun' },
          { malay: 'hari', english: 'day', partOfSpeech: 'noun' },
          { malay: 'di', english: 'at / in', partOfSpeech: 'preposition' },
          { malay: 'kantin', english: 'canteen', partOfSpeech: 'noun' },
          { malay: 'universiti', english: 'university', partOfSpeech: 'noun' },
        ],
      },
      {
        id: 's3-3',
        malay: 'Mereka belajar di perpustakaan selepas kelas.',
        english: 'They study at the library after class.',
        words: [
          { malay: 'Mereka', english: 'They', partOfSpeech: 'pronoun' },
          { malay: 'belajar', english: 'study / learn', partOfSpeech: 'verb' },
          { malay: 'di', english: 'at / in', partOfSpeech: 'preposition' },
          { malay: 'perpustakaan', english: 'library', partOfSpeech: 'noun' },
          { malay: 'selepas', english: 'after', partOfSpeech: 'preposition' },
          { malay: 'kelas', english: 'class', partOfSpeech: 'noun' },
        ],
      },
    ],
    collocations: [
      {
        id: 'c3-1',
        malay: ['makan tengah hari', 'bangun awal', 'setiap pagi', 'selepas kelas'],
        english: ['eat lunch', 'wake up early', 'every morning', 'after class'],
        correctPair: [[0, 0], [1, 1], [2, 2], [3, 3]],
      },
    ],
    fillBlanks: [
      {
        id: 'f3-1',
        sentence: 'Saya ___ awal setiap pagi.',
        blank: 'bangun',
        options: ['tidur', 'bangun', 'makan', 'pergi'],
        correctIndex: 1,
        englishHint: 'I ___ (wake up) early every morning.',
      },
      {
        id: 'f3-2',
        sentence: 'Mereka belajar di ___ selepas kelas.',
        blank: 'perpustakaan',
        options: ['kantin', 'perpustakaan', 'bilik', 'padang'],
        correctIndex: 1,
        englishHint: 'They study at the ___ (library) after class.',
      },
    ],
  },
];
