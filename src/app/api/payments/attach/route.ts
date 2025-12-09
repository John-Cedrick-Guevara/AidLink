import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { clientKey, paymentMethodId, returnUrl } = await req.json();

    const secretKey = process.env.PAYMONGO_SECRET_KEY;


    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Payment configuration error" },
        { status: 500 }
      );
    }

    // Extract payment intent ID from client key
    // Client key format: pi_xxxxx_client_yyyyy
    const paymentIntentId = clientKey.split("_client_")[0];

    const authString = `${secretKey.trim()}:`;
    const encoded = Buffer.from(authString).toString("base64");

    const res = await fetch(
      `https://api.paymongo.com/v1/payment_intents/${paymentIntentId}/attach`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${encoded}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            attributes: {
              payment_method: paymentMethodId,
              client_key: clientKey,
              return_url: returnUrl,
            },
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("PayMongo Attach Error:", data);
      return NextResponse.json(
        {
          success: false,
          message:
            data.errors?.[0]?.detail || "Failed to attach payment method",
          errors: data.errors,
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      status: data.data.attributes.status,
      next_action: data.data.attributes.next_action,
    });
  } catch (error) {
    console.error("Payment attachment error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
