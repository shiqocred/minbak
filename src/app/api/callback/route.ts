import { DATABASE_ID, UTAMA_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";

export const POST = async (
  req: Request,
  {
    searchParams,
  }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) => {
  try {
    const { databases } = await createSessionClient();
    const { resultCode } = await searchParams;

    const cookie = await cookies();
    const sessionId = cookie.get("MBTI_SESSION");

    if (!sessionId?.value) {
      return new Response("Data not found", { status: 404 });
    }

    console.log(resultCode);

    const existingDoc = await databases.getDocument(
      DATABASE_ID,
      UTAMA_ID,
      sessionId.value
    );

    if (!existingDoc) {
      return new Response("Data not found", { status: 404 });
    }

    if (resultCode === "01" || resultCode === "02") {
      return new Response("Payment failed", { status: 400 });
    }

    await databases.updateDocument(DATABASE_ID, UTAMA_ID, sessionId.value, {
      isPaid: true,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.log("INTERNAL_ERROR:", error);
    return new Response("Internal Error", { status: 500 });
  }
};
