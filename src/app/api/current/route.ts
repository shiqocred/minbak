import { CORE_ID, DATABASE_ID, PAYMENT_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { generateToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const GET = async () => {
  const cookie = await cookies();

  const { databases } = await createSessionClient();

  const userId = cookie.get("MBTI_SESSION");
  const notif = cookie.get("notif");
  const setNotif = (data: string) => cookie.set("notif", data);
  const delNotif = () => cookie.delete("notif");

  if (!userId?.value) {
    let token;
    let isUnique = false;

    while (!isUnique) {
      token = generateToken(50);

      // Cek apakah token sudah ada di database
      const existingSessions = await databases.listDocuments(
        DATABASE_ID,
        CORE_ID,
        [Query.equal("sessionId", token)]
      );

      if (existingSessions.documents.length === 0) {
        isUnique = true;
      }
    }

    await databases.createDocument(DATABASE_ID, CORE_ID, ID.unique(), {
      sessionId: token,
      source: null,
      response: null,
      paymentId: null,
    });

    cookie.set("MBTI_SESSION", token as string, {
      maxAge: 30 * 24 * 60 * 60, // 30 hari dalam detik
      path: "/",
    });

    if (notif) {
      delNotif();
    }
    return Response.json({
      message: "User Created",
      isPaid: null,
      status: true,
      source: false,
      data: null,
    });
  }

  const userDoc = await databases.listDocuments(DATABASE_ID, CORE_ID, [
    Query.equal("sessionId", userId.value),
  ]);

  if (userDoc.total === 0) {
    let token;
    let isUnique = false;

    while (!isUnique) {
      token = generateToken(50);

      // Cek apakah token sudah ada di database
      const existingSessions = await databases.listDocuments(
        DATABASE_ID,
        CORE_ID,
        [Query.equal("sessionId", token)]
      );

      if (existingSessions.documents.length === 0) {
        isUnique = true;
      }
    }

    await databases.createDocument(DATABASE_ID, CORE_ID, ID.unique(), {
      sessionId: token,
      isPaid: null,
      source: null,
      response: null,
      paymentId: null,
    });

    cookie.set("MBTI_SESSION", token as string, {
      maxAge: 30 * 24 * 60 * 60, // 30 hari dalam detik
      path: "/",
    });

    if (notif) {
      delNotif();
    }
    return Response.json({
      message: "User Created",
      isPaid: null,
      status: true,
      source: false,
      data: null,
    });
  }

  const docFound = userDoc.documents[0];

  if (!docFound.source && !docFound.paymentId) {
    if (notif) {
      delNotif();
    }
    return Response.json({
      message: "Welcome again. 1",
      isPaid: null,
      status: true,
      source: false,
      data: null,
    });
  }

  if (docFound.source && !docFound.paymentId) {
    if (notif) {
      delNotif();
    }
    return Response.json({
      message: "Welcome again. 2",
      isPaid: null,
      status: true,
      source: true,
      data: null,
    });
  }

  const payment = await databases.getDocument(
    DATABASE_ID,
    PAYMENT_ID,
    docFound.paymentId
  );

  if (docFound.source && !payment) {
    if (notif) {
      delNotif();
    }
    return Response.json({
      message: "Welcome again. 3",
      isPaid: null,
      status: true,
      source: true,
      data: null,
    });
  }

  if (!payment.isPaid || payment.isPaid !== "SUCCESS") {
    if (payment.isPaid === "FALSE") {
      setNotif("01");
    }
    return Response.json({
      message: "Welcome again. 4",
      isPaid: payment.isPaid,
      status: true,
      source: true,
      data: null,
    });
  }

  if (!docFound.response && payment.isPaid === "SUCCESS") {
    const finalPrompt = `${docFound.source}
    Kamu adalah AI asesmen minat dan bakat. Pengguna akan menjawab serangkaian pertanyaan berbasis skala Likert (1-5) untuk mengukur kecenderungan minat dan keterampilan mereka. Berdasarkan jawaban mereka, berikan analisis menyeluruh mengenai:
    - Minat & Bakat – Identifikasi kecenderungan minat dan bakat pengguna.
    - Saran Pendidikan – Rekomendasi jurusan S1 & S2 yang sesuai.
    - Universitas di Indonesia – Kampus yang menawarkan jurusan yang relevan.
    - Rekomendasi Karier – Pekerjaan yang cocok dengan estimasi gaji di Indonesia.
    Instruksi untuk AI:
    - Analisis jawaban pengguna berdasarkan pola skor mereka.
    - Kelompokkan hasil ke dalam bidang yang sesuai (misalnya: analitis, kreatif, sosial, teknis, manajerial, dsb.).
    - Cocokkan bidang tersebut dengan jurusan S1 dan S2 yang relevan.
    - Berikan rekomendasi universitas di Indonesia yang memiliki program S1 dan S2 terbaik dalam bidang tersebut.
    - Berikan daftar pekerjaan yang cocok berdasarkan minat dan bakat yang terdeteksi.
    - Sertakan estimasi gaji rata-rata di Indonesia untuk setiap pekerjaan yang direkomendasikan.
    Gunakan bahasa santai, menghibur, tetapi tetap profesional. Jawaban harus dalam bahasa Indonesia. buatkan dalam bentuk markdown saja!. jangan lupa menambahkan 2 spasi diakhir agar membuat baris baru! ngga usah make 2 bintang (**) diakhir! nama role tidak boleh ada diresponse kecuali sudah diartikan menjadi bahasa indonesia yang baik!

    contohnya seperti ini:
    ## Analisis Minat & Bakat
    Berdasarkan jawaban dengan skor **4 pada semua pertanyaan**, kamu menunjukkan kecenderungan minat dan bakat yang cukup merata di berbagai bidang. Ini mengindikasikan bahwa kamu memiliki kemampuan yang seimbang dalam **analitis, kreatif, sosial, teknis, dan manajerial.**

    1. **Analitis & Logika** – Kamu memiliki minat dalam pemecahan masalah, analisis data, dan berpikir kritis.
    2. **Kreativitas & Inovasi** – Kamu tertarik dalam menulis, menghasilkan ide, dan bekerja dengan tangan.
    3. **Sosial & Komunikasi** – Kamu nyaman berbicara di depan umum, menyelesaikan konflik, dan membantu orang lain.
    4. **Teknis & Digital** – Kamu percaya diri dalam menggunakan teknologi dan memahami cara kerja mesin.
    5. **Manajerial & Kepemimpinan** – Kamu menikmati mengatur proyek dan bekerja dalam tim.

    Dengan profil yang luas ini, kamu bisa mengeksplorasi berbagai jalur pendidikan dan karier yang fleksibel.

    ---

    ## Rekomendasi Pendidikan
    ### S1 (Sarjana)
    Berdasarkan minat dan bakatmu, berikut beberapa jurusan yang sesuai:

    - **Manajemen atau Administrasi Bisnis** → Cocok dengan minat manajerial dan kepemimpinan.
    - **Psikologi** → Sesuai dengan ketertarikan dalam membantu orang lain dan menyelesaikan konflik.
    - **Teknik Informatika / Ilmu Komputer** → Mendukung minatmu dalam teknologi dan analisis data.
    - **Statistika atau Data Science** → Sesuai dengan kemampuan analitis dan ketelitianmu.
    - **Ilmu Komunikasi** → Cocok dengan bakatmu dalam berbicara di depan umum dan menulis.
    
    ### S2 (Magister)
    Jika ingin melanjutkan S2, beberapa pilihan yang relevan:

    - **MBA (Master of Business Administration)** – Jika ingin mendalami manajerial & kepemimpinan.
    - **Magister Psikologi** – Jika tertarik pada interaksi sosial dan penyelesaian konflik.
    - **Magister Data Science / Big Data Analytics** – Jika ingin fokus pada analisis data dan teknologi.
    - **Magister Ilmu Komunikasi** – Untuk mengembangkan keterampilan komunikasi dan media.

    ---

    ## Rekomendasi Universitas di Indonesia
    Beberapa universitas terbaik untuk jurusan yang sesuai:

    - **Manajemen / Bisnis:** UI, UGM, ITB, BINUS
    - **Psikologi:** UI, UGM, Unpad
    - **Teknik Informatika / Ilmu Komputer:** ITB, BINUS, UI
    - **Statistika / Data Science:** ITS, IPB, UI
    - **Ilmu Komunikasi:** UI, UGM, Unair

    ---

    ## Rekomendasi Karier & Estimasi Gaji di Indonesia
    Berdasarkan minat dan bakat yang terdeteksi, berikut beberapa profesi yang cocok untukmu:

    1. **Product Manager** (Rp15 - 40 juta/bulan): Cocok jika ingin peran manajerial, analitis, dan teknis.
    2. **Data Analyst / Data Scientist** (Rp10 - 35 juta/bulan): Menggunakan keterampilan analisis data dan logika.
    3. **Digital Marketing Specialist** (Rp8 - 25 juta/bulan): Memanfaatkan kemampuan komunikasi dan kreativitas.
    4. **HR / Talent Development Specialist** (Rp8 - 20 juta/bulan): Mengembangkan keterampilan interpersonal dan kepemimpinan.
    5. **Management Consultant** (Rp15 - 35 juta/bulan): Cocok dengan minat dalam strategi bisnis dan pemecahan masalah.
    6. **Software Engineer / IT Specialist** (Rp10 - 30 juta/bulan): Jika ingin fokus pada teknologi dan pemrograman.
    7. **Content Creator / Writer** (Rp5 - 20 juta/bulan): Jika ingin mengembangkan bakat menulis dan komunikasi.

    Karena kamu memiliki **minat yang serba luas**, kamu bisa memilih jalur karier yang fleksibel dan berkembang ke berbagai industri.

    Apakah ada jalur tertentu yang lebih ingin kamu eksplorasi lebih lanjut? 🚀
    `;

    const genAI = new GoogleGenerativeAI(process.env.PUBLIC_NEXT_KEY_GEMINI!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(finalPrompt);

    const updatedDoc = await databases.updateDocument(
      DATABASE_ID,
      CORE_ID,
      docFound.$id,
      {
        response: result.response.text(),
      }
    );

    const paymentUpdate = await databases.getDocument(
      DATABASE_ID,
      PAYMENT_ID,
      updatedDoc.paymentId
    );

    setNotif("00");

    return Response.json({
      message: "Welcome again. 5",
      isPaid: paymentUpdate.isPaid,
      status: true,
      source: true,
      data: updatedDoc.response,
    });
  }

  return Response.json({
    message: "Welcome again 6",
    isPaid: payment.isPaid,
    status: true,
    source: true,
    data: docFound.response,
  });
};
