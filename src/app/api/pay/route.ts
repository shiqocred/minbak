import {
  API_KEY,
  baseUrl,
  DATABASE_ID,
  MERCHANT_CODE,
  PAYMENT_URL,
  UTAMA_ID,
} from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import crypto from "crypto";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  try {
    const { databases } = await createSessionClient();
    const { email } = await req.json();

    const cookie = await cookies();
    const sessionId = cookie.get("MBTI_SESSION")?.value;

    if (!sessionId) {
      return new Response("Data not found.", { status: 404 });
    }
    // Generate timestamp dalam milidetik (Jakarta Time)
    const timestamp = Date.now().toString();

    // Membuat signature SHA256
    const signatureString = `${MERCHANT_CODE}${timestamp}${API_KEY}`;
    const signature = crypto
      .createHash("sha256")
      .update(signatureString)
      .digest("hex");

    const payload = {
      paymentAmount: 10000,
      merchantOrderId: `${sessionId}-${timestamp}`,
      productDetails: "Payment for result test",
      additionalParam: "",
      merchantUserInfo: "",
      customerVaName: "",
      email: email,
      phoneNumber: "",
      callbackUrl: `${baseUrl}/api/callback`,
      returnUrl: `${baseUrl}/redirect`,
      expiryPeriod: 10,
    };

    const response = await fetch(PAYMENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-duitku-signature": signature,
        "x-duitku-timestamp": timestamp,
        "x-duitku-merchantcode": MERCHANT_CODE,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.log(await response.json());
      return new Response("Gateway Error", { status: 400 });
    }

    const data = await response.json();

    await databases.updateDocument(DATABASE_ID, UTAMA_ID, sessionId, {
      reference: data.reference,
      isPaid: false,
      response: null,
    });

    return Response.json(data.paymentUrl);
  } catch (error) {
    console.log(error);
    return new Response("Internal Error", { status: 500 });
  }
};
