import { DATABASE_ID, PAYMENT_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export const POST = async (req: NextRequest) => {
  try {
    // Parsing body URL-encoded
    const body = await req.json();

    if (body.event !== "payment.received") {
      return new NextResponse("Event invalid", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const { status, productId } = body.data;

    // Appwrite Query
    const { databases } = await createSessionClient();
    const existingDoc = await databases.listDocuments(DATABASE_ID, PAYMENT_ID, [
      Query.equal("reference", productId),
    ]);

    if (existingDoc.total === 0) {
      return new NextResponse("Data not found", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    await databases.updateDocument(
      DATABASE_ID,
      PAYMENT_ID,
      existingDoc.documents[0].$id,
      {
        isPaid: status === "SUCCESS" ? "SUCCESS" : "FALSE",
      }
    );

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("INTERNAL_ERROR:", error);
    return new NextResponse("Internal Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
};
