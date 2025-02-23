import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const soalKepribadian = [
  {
    question: "Saya suka memecahkan teka-teki dan masalah logika.",
    role: "logical_reasoning",
  },
  {
    question:
      "Saya suka bekerja dengan tangan untuk membuat sesuatu (misalnya, seni, kerajinan).",
    role: "hands_on_creativity",
  },
  {
    question: "Saya tertarik memahami cara mesin dan teknologi bekerja.",
    role: "mechanical_interest",
  },
  {
    question:
      "Saya suka membantu orang lain menyelesaikan masalah pribadi atau emosional.",
    role: "emotional_support",
  },
  {
    question: "Saya lebih suka bekerja dalam tim daripada sendirian.",
    role: "teamwork",
  },
  {
    question: "Saya merasa puas saat mengatur acara atau mengelola proyek.",
    role: "organizational_skills",
  },
  {
    question: "Saya tertarik pada penemuan ilmiah dan eksperimen.",
    role: "scientific_inquiry",
  },
  {
    question: "Saya suka menulis cerita, puisi, atau esai.",
    role: "writing",
  },
  {
    question: "Saya merasa nyaman berbicara di depan banyak orang.",
    role: "public_speaking",
  },
  {
    question:
      "Saya tertarik pada pekerjaan yang melibatkan perjalanan atau menjelajahi tempat baru.",
    role: "adventure_seeking",
  },
  {
    question: "Saya bisa dengan cepat menganalisis data dan menemukan pola.",
    role: "data_analysis",
  },
  {
    question: "Saya pandai menghasilkan ide kreatif atau solusi.",
    role: "creative_thinking",
  },
  {
    question: "Saya mahir menjelaskan konsep sulit kepada orang lain.",
    role: "teaching",
  },
  {
    question: "Saya bisa tetap tenang dan fokus dalam situasi sulit.",
    role: "emotional_resilience",
  },
  {
    question: "Saya sangat teliti saat menyelesaikan tugas.",
    role: "attention_to_detail",
  },
  {
    question:
      "Saya suka belajar bahasa baru atau meningkatkan kemampuan komunikasi saya.",
    role: "language_learning",
  },
  {
    question: "Saya percaya diri menggunakan komputer dan alat digital.",
    role: "technology_proficiency",
  },
  {
    question:
      "Saya bisa dengan mudah beradaptasi dengan perubahan rencana atau situasi tak terduga.",
    role: "adaptability",
  },
  {
    question: "Saya mahir menyelesaikan konflik antar orang.",
    role: "conflict_resolution",
  },
  {
    question:
      "Saya suka bekerja pada proyek jangka panjang yang membutuhkan ketekunan.",
    role: "perseverance",
  },
];
export type ConvertedData = {
  question: string;
  role: string;
  score: number;
};

const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const getSoalAcak = (): ConvertedData[] => {
  const shuffledData = shuffleArray(soalKepribadian);
  return shuffledData.map((item) => ({
    ...item,
    score: 0,
  }));
};

type QuestionData = {
  question: string;
  role: string;
  score: number;
};

type TransformedData = {
  [key: string]: {
    question: string;
    score: number;
  };
};

export const transformData = (data: QuestionData[]): TransformedData => {
  return data.reduce((acc, item) => {
    acc[item.role] = {
      question: item.question,
      score: item.score,
    };
    return acc;
  }, {} as TransformedData);
};

export const generateToken = (length: number = 16): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

export const responseExample = `## Analisis Minat & Bakat **  

Wah, berdasarkan jawabanmu, kamu ini **multipotensial** banget! Skor kamu tinggi di banyak bidang, menunjukkan minat dan bakatmu tersebar merata. Keren! Ini artinya kamu punya potensi besar untuk sukses di berbagai jalur karier. Yuk, kita bedah satu per satu! **  

1. **Logika & Analisis**: Skor tinggi di *logical reasoning* dan *data analysis* nunjukin kamu jago memecahkan masalah dan menganalisis informasi. Otakmu encer banget nih! **  
2. **Kreativitas & Inovasi**: Skor tinggi di *hands-on creativity* dan *creative thinking* berarti kamu punya imajinasi yang kaya dan suka menciptakan sesuatu yang baru. Jiwa seniman dalam dirimu kuat! **  
3. **Sosial & Empati**: Skor tinggi di *emotional support* dan *conflict resolution* menandakan kamu peduli pada orang lain dan punya kemampuan komunikasi yang baik. Kamu bisa jadi pendengar yang baik dan penengah yang handal. **  
4. **Organisasi & Manajemen**: Skor tinggi di *organizational skills* dan *attention to detail* menunjukkan kamu teratur, teliti, dan bisa diandalkan. Kamu cocok banget jadi pemimpin atau manajer. **  
5. **Teknologi & Pembelajaran**: Skor tinggi di *technology proficiency* dan *language learning* berarti kamu cepat belajar dan tertarik pada hal-hal baru, terutama yang berkaitan dengan teknologi. **  

## Rekomendasi Pendidikan **  

Dengan minat dan bakat yang beragam ini, kamu punya banyak pilihan menarik untuk kuliah! **  

### S1 (Sarjana) **  

- **Informatika/Ilmu Komputer**: Cocok buat kamu yang suka logika, analisis data, dan teknologi. **  
- **Psikologi**: Pas buat kamu yang peduli pada orang lain dan tertarik memahami perilaku manusia. **  
- **Manajemen/Administrasi Bisnis**: Tepat buat kamu yang punya jiwa kepemimpinan dan ingin belajar tentang bisnis. **  
- **Desain Komunikasi Visual (DKV)**: Cocok buat kamu yang kreatif dan suka визуальное. **  
- **Statistika**: Buat kamu yang teliti dan suka menganalisis data. **  

### S2 (Magister) **  

- **Magister Informatika**: Untuk memperdalam ilmu komputer dan teknologi. **  
- **Magister Psikologi**: Jika ingin fokus pada konseling atau psikologi industri. **  
- **MBA (Master of Business Administration)**: Buat kamu yang ingin jadi pemimpin bisnis handal. **  
- **Magister Desain**: Untuk mengembangkan kemampuan desainmu lebih lanjut. **  

## Rekomendasi Universitas di Indonesia **  

- **UI (Universitas Indonesia)**: Pilihan tepat untuk semua jurusan, terutama Psikologi, Informatika, dan Manajemen. **  
- **ITB (Institut Teknologi Bandung)**: Jagoan untuk Informatika, Desain, dan jurusan teknik lainnya. **  
- **UGM (Universitas Gadjah Mada)**: Unggul dalam Psikologi, Manajemen, dan Statistika. **  
- **BINUS (Bina Nusantara University)**: Terbaik untuk Informatika, Desain, dan Bisnis. **  

## Rekomendasi Karier & Estimasi Gaji di Indonesia **  

Kamu punya banyak pilihan karier yang menjanjikan, nih! **  

1. **UI/UX Designer** (Rp8 - 25 juta/bulan): Menggabungkan kemampuan desain, logika, dan pemahaman tentang user experience. **  
2. **Data Scientist** (Rp10 - 35 juta/bulan): Mengolah data dan memberikan insight berharga untuk perusahaan. **  
3. **Software Engineer** (Rp10 - 30 juta/bulan): Menciptakan aplikasi dan sistem yang memudahkan hidup banyak orang. **  
4. **Konsultan Manajemen** (Rp15 - 35 juta/bulan): Membantu perusahaan memecahkan masalah dan meningkatkan kinerja. **  
5. **Psikolog** (Rp8 - 20 juta/bulan): Membantu orang lain mengatasi masalah emosional dan mental. **  
6. **Product Manager** (Rp15 - 40 juta/bulan): Bertanggung jawab atas pengembangan produk dari ide hingga peluncuran. **  

## Kesimpulan **  

Kamu punya potensi besar untuk sukses di bidang apapun yang kamu pilih. Jangan takut untuk mencoba hal-hal baru dan mengikuti kata hatimu. Ingat, yang penting adalah **passion** dan **kerja keras**. Selamat berpetualang di dunia pendidikan dan karier! **  

Gimana? Apakah ada bidang tertentu yang ingin kamu gali lebih dalam? Atau mungkin ada pertanyaan lain yang ingin kamu tanyakan? Jangan ragu untuk bertanya, ya!  **  
`;
