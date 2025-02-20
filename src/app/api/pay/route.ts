import { API_KEY, baseUrl, DATABASE_ID, PAYMENT_URL, UTAMA_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";

export const POST = async () => {
  try {
    const { databases } = await createSessionClient();

    const cookie = await cookies();
    const sessionId = cookie.get("MBTI_SESSION")?.value;

    if (!sessionId) {
      return new Response("Data not found.", { status: 404 });
    }

    const existingDoc = await databases.getDocument(
      DATABASE_ID,
      UTAMA_ID,
      sessionId
    );

    if (!existingDoc) {
      return new Response("Data not found.", { status: 404 });
    }

    const expiredPayment = new Date();
    expiredPayment.setMinutes(new Date().getMinutes() + 10);

    const payload = {
      name: "yanto",
      email: "tes@mail.com",
      mobile: "0888888888",
      amount: 9000,
      redirectUrl: `${baseUrl}`,
      description: "Pembayaran MBTI",
      expiredAt: expiredPayment,
    };

    const response = await fetch(PAYMENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.log(await response.json());
      return new Response("Gateway Error", { status: 400 });
    }

    const { data } = await response.json();

    await databases.updateDocument(DATABASE_ID, UTAMA_ID, existingDoc.$id, {
      reference: data.id,
      isPaid: "WAIT",
    });

    return Response.json(data.link);
  } catch (error) {
    console.log(error);
    return new Response("Internal Error", { status: 500 });
  }
};
