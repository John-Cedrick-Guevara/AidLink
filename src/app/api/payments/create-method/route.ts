import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { type, details, billing } = await req.json();

    const secretKey = process.env.PAYMONGO_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Payment configuration error" },
        { status: 500 }
      );
    }

    const authString = `${secretKey.trim()}:`;
    const encoded = Buffer.from(authString).toString("base64");

    const payload: any = {
      data: {
        attributes: {
          type,
          billing,
        },
      },
    };

    // Add details only for card payments
    if (type === "card" && details) {
      payload.data.attributes.details = details;
    }

    const res = await fetch("https://api.paymongo.com/v1/payment_methods", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encoded}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("PayMongo Error:", data);
      return NextResponse.json(
        {
          success: false,
          message:
            data.errors?.[0]?.detail || "Failed to create payment method",
          errors: data.errors,
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      paymentMethodId: data.data.id,
    });
  } catch (error) {
    console.error("Payment method creation error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
