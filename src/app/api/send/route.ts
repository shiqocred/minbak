import { DATABASE_ID, UTAMA_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const { databases } = await createSessionClient();
  const cookie = await cookies();
  const sessionId = cookie.get("MBTI_SESSION");

  if (!sessionId?.value) {
    return new Response("Data not found.", { status: 404 });
  }

  const { soal } = await req.json();

  const userDoc = await databases.getDocument(
    DATABASE_ID,
    UTAMA_ID,
    sessionId.value
  );

  if (!userDoc) {
    return new Response("Data not found.", { status: 404 });
  }

  await databases.updateDocument(DATABASE_ID, UTAMA_ID, userDoc.$id, {
    source: JSON.stringify(soal),
    isPaid: null,
    response: null,
  });

  return Response.json({ status: true, message: "Soal created" });
};
