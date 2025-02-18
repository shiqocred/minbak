import { DATABASE_ID, UTAMA_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export const POST = async (req: NextRequest) => {
  try {
    // Pastikan request memiliki Content-Type yang benar
    if (
      req.headers.get("content-type") !== "application/x-www-form-urlencoded"
    ) {
      return new NextResponse("Invalid Content-Type", {
        status: 415, // Unsupported Media Type
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Parsing body URL-encoded
    const body = await req.text();
    const params = new URLSearchParams(body);
    const resultCode = params.get("resultCode");
    const reference = params.get("reference");

    if (!resultCode || !reference) {
      return new NextResponse("Missing data required", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Appwrite Query
    const { databases } = await createSessionClient();
    const existingDoc = await databases.listDocuments(DATABASE_ID, UTAMA_ID, [
      Query.equal("reference", reference),
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

    if (resultCode === "01" || resultCode === "02") {
      return new NextResponse("Payment failed", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    await databases.updateDocument(
      DATABASE_ID,
      UTAMA_ID,
      existingDoc.documents[0].$id,
      {
        isPaid: true,
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
