import crypto from "crypto";

export const POST = async () => {
  const MERCHANT_CODE = process.env.NEXT_PUBLIC_DUITKU_MERCHANT_CODE!;
  const API_KEY = process.env.NEXT_PUBLIC_DUITKU_API_KEY!;
  const PAYMENT_URL =
    "https://api-sandbox.duitku.com/api/merchant/createInvoice";

  // Generate timestamp dalam milidetik (Jakarta Time)
  const timestamp = Date.now().toString();

  // Membuat signature SHA256
  const signatureString = `${MERCHANT_CODE}-${timestamp}-${API_KEY}`;
  const signature = crypto
    .createHash("sha256")
    .update(signatureString)
    .digest("hex");

  console.log(signatureString, signature);

  const payload = {
    paymentAmount: 10000,
    merchantOrderId: "1648542419",
    productDetails: "Test Pay with duitku",
    additionalParam: "", // optional
    merchantUserInfo: "", // optional
    customerVaName: "John Doe", // optional
    email: "test@test.com",
    phoneNumber: "08123456789", // optional
    callbackUrl: "https://example.com/api-pop/backend/callback.php",
    returnUrl: "https://example.com/api-pop/backend/redirect.php",
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

  const data = await response.json();

  return Response.json(data);
};
