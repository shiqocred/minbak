import { DATABASE_ID, UTAMA_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import Anthropic from "@anthropic-ai/sdk";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";

export const GET = async () => {
  const cookie = await cookies();

  const { databases } = await createSessionClient();

  const userId = cookie.get("MBTI_SESSION");

  if (!userId?.value) {
    const token = ID.unique();

    await databases.createDocument(DATABASE_ID, UTAMA_ID, token, {
      isPaid: null,
    });
    cookie.set("MBTI_SESSION", token);
    return Response.json({
      message: "User Created",
      isPaid: null,
      status: true,
      source: false,
      data: null,
    });
  }

  const userDoc = await databases.listDocuments(DATABASE_ID, UTAMA_ID, [
    Query.equal("$id", userId.value),
  ]);

  if (userDoc.total === 0) {
    const token = ID.unique();

    await databases.createDocument(DATABASE_ID, UTAMA_ID, token, {
      isPaid: false,
    });
    cookie.set("MBTI_SESSION", token);
    return Response.json({
      message: "User Created",
      isPaid: null,
      status: true,
      source: false,
      data: null,
    });
  }

  const docFound = userDoc.documents[0];

  if (!docFound.source) {
    return Response.json({
      message: "Welcome again.",
      isPaid: null,
      status: true,
      source: false,
      data: null,
    });
  }

  if (!docFound.isPaid || docFound.isPaid !== "SUCCESS") {
    return Response.json({
      message: "Welcome again.",
      isPaid: docFound.isPaid,
      status: true,
      source: true,
      data: null,
    });
  }

  if (!docFound.response) {
    const finalPrompt = `${docFound.source}
    Kamu adalah analis kepribadian berbasis AI yang cerdas dan naratif. Berdasarkan jawaban user dalam skala 1-5, berikan analisis kepribadian yang menarik, informatif, dan engaging berdasarkan **MBTI, DISC, dan Big Five Personality**.
    Buat output dalam bentuk **cerita yang menyenangkan** dengan struktur berikut:
    1. **Pembukaan yang personal & menarik**
    2. **Berikan analogi binatang yang sesuai dengan kepribadian mereka (contoh: Kamu seperti Elang karena…)**
    3. **Analisis MBTI user dengan penjelasan yang engaging**
    4. **Analisis DISC dan bagaimana mereka bekerja dalam tim**
    5. **Analisis Big Five Personality dengan insight mendalam**
    6. **Kesimpulan yang positif & ajakan refleksi**
    Gunakan bahasa santai, menghibur, tetapi tetap profesional. Jawaban harus dalam bahasa Indonesia. buatkan dalam bentuk markdown saja!. jangan lupa menambahkan 2 spasi diakhir agar membuat baris baru!

    contohnya seperti ini
    # 🐺 Sang Serigala Pemimpin: Kepribadian yang Visioner dan Adaptif 🐺

    Di sebuah hutan yang luas, ada seekor serigala yang tidak hanya kuat, tetapi juga cerdas dan penuh strategi. Ia adalah pemimpin alami, selalu memimpin kelompoknya dengan ketegasan, tetapi tetap peka terhadap perasaan sesama. Serigala ini bukan hanya berani mengambil risiko, tetapi juga berpikir jauh ke depan, merencanakan setiap langkah dengan hati-hati. Dan tahukah kamu? **Serigala itu adalah kamu!** 🐺✨

    ## 🌟 Kepribadianmu dalam MBTI: Sang Visioner yang Tertata 🌟
    Dari hasil analisis, kamu kemungkinan besar berada dalam spektrum **ENTJ atau INTJ**—seorang pemikir strategis yang suka merencanakan, berpikir logis, dan tetap fokus pada tujuan.

    🔹 **Pemimpin Alami** – Kamu nyaman mengambil peran sebagai pemimpin dalam kelompok. Tidak heran, karena kamu memang suka memastikan segala sesuatunya berjalan sesuai rencana.  
    🔹 **Perencana Ulung** – Kamu bukan tipe yang suka spontanitas berlebihan. Segala sesuatu lebih nyaman jika sudah ada jadwal dan struktur yang jelas.  
    🔹 **Logis & Objektif** – Dalam menghadapi masalah, kamu mengandalkan logika, bukan perasaan. Kamu mampu mengambil keputusan yang rasional tanpa terbawa emosi.  

    Namun, karena kamu juga memiliki sisi adaptif, ada kemungkinan kamu bisa berubah strategi saat situasi menuntut. Kamu bukan tipe yang kaku, tetapi tetap memiliki prinsip yang kuat!

    ---

    ## 💼 DISC: Sang Dominan yang Tetap Peduli 💼
    Dalam dunia kerja atau tim, kamu memiliki kombinasi **Dominance (D) dan Conscientiousness (C)**.

    🔥 **D (Dominance) – Pemimpin dan Pengambil Keputusan**  
    Kamu memiliki jiwa kepemimpinan yang tinggi dan tidak ragu mengambil keputusan besar. Jika ada tantangan, kamu lebih suka menghadapi daripada menghindari.

    🎯 **C (Conscientiousness) – Detail dan Perfeksionis**  
    Di sisi lain, kamu juga seorang yang sangat memperhatikan detail dan ketepatan. Kamu tidak hanya memimpin dengan visi besar, tetapi juga memastikan eksekusi berjalan dengan rapi dan terstruktur.

    Namun, meskipun kamu adalah pemimpin alami, terkadang tim bisa merasa kamu terlalu serius atau terlalu fokus pada hasil. Tantangannya? Jangan lupa memberi apresiasi kepada orang-orang di sekitarmu!

    ---

    ## 🧠 Big Five Personality: Keseimbangan yang Kuat 🧠
    Jika kita melihat kepribadianmu berdasarkan **Big Five Personality**, kamu memiliki keseimbangan yang cukup menarik:

    ✔ **Extraversion (4/5)** – Kamu menikmati berada di antara banyak orang, tetapi tetap bisa menghargai waktu sendiri. Ini membuatmu fleksibel dalam berbagai situasi sosial.  
    ✔ **Conscientiousness (4/5)** – Kedisiplinan dan keteraturan adalah kekuatan utamamu. Kamu bukan tipe yang suka hidup berantakan.  
    ✔ **Openness to Experience (4/5)** – Meskipun kamu suka perencanaan, kamu juga punya sisi kreatif dan senang mengeksplorasi ide-ide baru.  
    ✔ **Agreeableness (4/5)** – Kamu senang membantu orang lain dan memiliki empati yang cukup tinggi. Namun, kamu tetap bisa bersikap tegas saat dibutuhkan.  
    ✔ **Neuroticism (1/5)** – Kamu tetap tenang dalam tekanan dan tidak mudah panik. Ini membuatmu menjadi orang yang bisa diandalkan dalam situasi sulit.

    ---

    ## 🌟 Kesimpulan: Pemimpin Adaptif dengan Visi Kuat 🌟
    Kamu seperti **serigala pemimpin**—kuat, cerdas, dan visioner. Kamu memiliki keseimbangan antara logika dan empati, perencanaan dan fleksibilitas. Dalam tim, kamu akan bersinar sebagai pemimpin yang tidak hanya strategis, tetapi juga tetap memperhatikan orang-orang di sekitarmu.

    Namun, tantangan bagi orang sepertimu adalah **belajar untuk lebih menikmati momen dan tidak selalu harus perfeksionis**. Dunia tidak selalu bisa diprediksi, dan terkadang spontanitas bisa membawa hal-hal luar biasa dalam hidupmu.

    Jadi, pertanyaannya: **Apa langkah besar yang akan kamu ambil selanjutnya? 🚀**
    `;
    const anthropic = new Anthropic({
      apiKey: process.env.PUBLIC_NEXT_KEY_CLAUDE!, // defaults to process.env["ANTHROPIC_API_KEY"]
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: finalPrompt }],
    });

    await databases.updateDocument(DATABASE_ID, UTAMA_ID, userId.value, {
      response: (msg.content[0] as Anthropic.TextBlock).text ?? "",
    });

    const updatedDoc = await databases.getDocument(
      DATABASE_ID,
      UTAMA_ID,
      userId.value
    );

    return Response.json({
      message: "Welcome again.",
      isPaid: updatedDoc.isPaid,
      status: true,
      source: true,
      data: updatedDoc.response,
    });
  }

  return Response.json({
    message: "Welcome again",
    isPaid: docFound.isPaid,
    status: true,
    source: true,
    data: docFound.response,
  });
};
