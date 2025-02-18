import { DATABASE_ID, UTAMA_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { NextRequest } from "next/server";
import { Query } from "node-appwrite";

export const POST = async (req: NextRequest) => {
  try {
    const { databases } = await createSessionClient();
    const body = await req.text();
    const params = new URLSearchParams(body);
    const resultCode = params.get("resultCode");
    const reference = params.get("reference");
    if (!resultCode || !reference) {
      return new Response("Missing data required", { status: 400 });
    }

    const existingDoc = await databases.listDocuments(DATABASE_ID, UTAMA_ID, [
      Query.equal("reference", reference),
    ]);

    if (existingDoc.total === 0) {
      return new Response("Data not found", { status: 404 });
    }

    if (resultCode === "01" || resultCode === "02") {
      return new Response("Payment failed", { status: 400 });
    }

    await databases.updateDocument(
      DATABASE_ID,
      UTAMA_ID,
      existingDoc.documents[0].$id,
      {
        isPaid: true,
      }
    );

    return Response.json(
      { success: true },
      { headers: { append: "Access-Control-Allow-Origin: *" } }
    );
  } catch (error) {
    console.log("INTERNAL_ERROR:", error);
    return new Response("Internal Error", { status: 500 });
  }
};
