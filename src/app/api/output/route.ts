import Anthropic from "@anthropic-ai/sdk";

export const POST = async (req: Request) => {
  try {
    const { soal } = await req.json();

    const finalPrompt = `${soal}
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

    console.log(msg);

    return Response.json((msg.content[0] as Anthropic.TextBlock).text ?? "");
  } catch (error) {
    console.log("INTERNAL_ERROR:", error);
    return new Response("Internal Error", { status: 500 });
  }
};
