import {
  // API_KEY,
  // baseUrl,
  CORE_ID,
  DATABASE_ID,
  PAYMENT_ID,
  // PAYMENT_URL,
} from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";

export const POST = async () =>
  // req: Request
  {
    try {
      const { databases } = await createSessionClient();
      // const { name, email, number } = await req.json();

      const cookie = await cookies();
      const sessionId = cookie.get("MBTI_SESSION")?.value;

      if (!sessionId) {
        return new Response("Data not found.", { status: 404 });
      }

      const existingDoc = await databases.listDocuments(DATABASE_ID, CORE_ID, [
        Query.equal("sessionId", sessionId),
      ]);

      if (existingDoc.total === 0) {
        return new Response("Data not found.", { status: 404 });
      }

      // const expiredPayment = new Date();
      // expiredPayment.setMinutes(new Date().getMinutes() + 10);

      // const payload = {
      //   name: name,
      //   email: email,
      //   mobile: number,
      //   amount: 9000,
      //   redirectUrl: `${baseUrl}/?page=result`,
      //   description: "Pembayaran MBTI",
      //   expiredAt: expiredPayment,
      // };

      // const response = await fetch(PAYMENT_URL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${API_KEY}`,
      //   },
      //   body: JSON.stringify(payload),
      // });

      // if (!response.ok) {
      //   console.log(await response.json());
      //   return new Response("Gateway Error", { status: 400 });
      // }

      // const { data } = await response.json();

      const payment = await databases.createDocument(
        DATABASE_ID,
        PAYMENT_ID,
        ID.unique(),
        {
          coreId: existingDoc.documents[0].$id,
          reference: "",
          isPaid: "SUCCESS",
        }
      );

      await databases.updateDocument(
        DATABASE_ID,
        CORE_ID,
        existingDoc.documents[0].$id,
        {
          paymentId: payment.$id,
        }
      );

      return Response.json({ success: true });
    } catch (error) {
      console.log(error);
      return new Response("Internal Error", { status: 500 });
    }
  };
