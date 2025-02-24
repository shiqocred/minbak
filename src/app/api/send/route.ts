import { CORE_ID, DATABASE_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

export const POST = async (req: Request) => {
  const { databases } = await createSessionClient();
  const cookie = await cookies();
  const sessionId = cookie.get("MBTI_SESSION");

  if (!sessionId?.value) {
    return new Response("Data not found.", { status: 404 });
  }

  const { soal } = await req.json();

  const userDoc = await databases.listDocuments(DATABASE_ID, CORE_ID, [
    Query.equal("sessionId", sessionId.value),
  ]);

  if (userDoc.total === 0) {
    return new Response("Data not found.", { status: 404 });
  }

  await databases.updateDocument(
    DATABASE_ID,
    CORE_ID,
    userDoc.documents[0].paymentId,
    {
      isPaid: "FALSE",
    }
  );

  await databases.updateDocument(
    DATABASE_ID,
    CORE_ID,
    userDoc.documents[0].$id,
    {
      source: JSON.stringify(soal),
      response: null,
      paymentId: null,
    }
  );

  return Response.json({ status: true, message: "Soal created" });
};
