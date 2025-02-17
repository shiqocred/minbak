import { DATABASE_ID, UTAMA_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import Anthropic from "@anthropic-ai/sdk";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export const GET = async (req: Request) => {
  const cookie = await cookies();

  const { databases } = await createSessionClient();

  const userId = cookie.get("MBTI_SESSION");

  if (!userId?.value) {
    const token = ID.unique();

    await databases.createDocument(DATABASE_ID, UTAMA_ID, token, {
      isPaid: false,
    });
    cookie.set("MBTI_SESSION", token);
    return Response.json({
      message: "User Created",
      isPaid: false,
      status: true,
      source: false,
      data: null,
    });
  }

  const userDoc = await databases.getDocument(
    DATABASE_ID,
    UTAMA_ID,
    userId.value
  );

  if (!userDoc) {
    const token = ID.unique();

    await databases.createDocument(DATABASE_ID, UTAMA_ID, token, {
      isPaid: false,
    });
    cookie.set("MBTI_SESSION", token);
    return Response.json({
      message: "User Created",
      isPaid: false,
      status: true,
      source: false,
      data: null,
    });
  }

  if (!userDoc.source) {
    return Response.json({
      message: "User Created",
      isPaid: false,
      status: true,
      source: false,
      data: null,
    });
  }

  if (!userDoc.isPaid) {
    return Response.json({
      message: "User Created",
      isPaid: false,
      status: true,
      source: true,
      data: null,
    });
  }

  if (!userDoc.response) {
    const finalPrompt = `${userDoc.source}
    Kamu adalah analis kepribadian berbasis AI yang cerdas dan naratif. Berdasarkan jawaban user dalam skala 1-5, berikan analisis kepribadian yang menarik, informatif, dan engaging berdasarkan **MBTI, DISC, dan Big Five Personality**.
    Buat output dalam bentuk **cerita yang menyenangkan** dengan struktur berikut:
    1. **Pembukaan yang personal & menarik**
    2. **Berikan analogi binatang yang sesuai dengan kepribadian mereka (contoh: Kamu seperti Elang karena…)**
    3. **Analisis MBTI user dengan penjelasan yang engaging**
    4. **Analisis DISC dan bagaimana mereka bekerja dalam tim**
    5. **Analisis Big Five Personality dengan insight mendalam**
    6. **Kesimpulan yang positif & ajakan refleksi**
    Gunakan bahasa santai, menghibur, tetapi tetap profesional. Jawaban harus dalam bahasa Indonesia.
    
    buatkan dalam bentuk markdown saja`;
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
      message: "User Created",
      isPaid: updatedDoc.isPaid,
      status: true,
      source: true,
      data: updatedDoc.response,
    });
  }

  return Response.json({
    message: "User Created",
    isPaid: userDoc.isPaid,
    status: true,
    source: true,
    data: userDoc.response,
  });
};
