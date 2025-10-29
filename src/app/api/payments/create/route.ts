import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount, description, email, projectId, sectorId } = await req.json();
  const supabase = await createClient();
  const user = await getCurrentUser();

  try {
    const secretKey = process.env.PAYMONGO_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        {
          success: false,
          message: "PAYMONGO_SECRET_KEY is not configured in environment",
        },
        { status: 500 }
      );
    }

    // Clean the secret key (remove any whitespace)
    const cleanSecretKey = secretKey.trim();

    // Encode for Basic Auth: "secret_key:" (colon with no password)
    const authString = `${cleanSecretKey}:`;
    const encoded = Buffer.from(authString).toString("base64");

    const paymentPayload = {
      data: {
        attributes: {
          amount: amount * 100, // PayMongo expects amount in centavos
          payment_method_allowed: ["card", "gcash", "paymaya"],
          payment_method_options: { card: { request_three_d_secure: "any" } },
          currency: "PHP",
          description,
          statement_descriptor: "AidlLink Donation",
          metadata: {
            sector_id: sectorId,
            project_id: projectId,
            user_id: user?.id,
          },
        },
      },
    };

    const res = await fetch("https://api.paymongo.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encoded}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });

    console.log(res);

    const data = await res.json();

    if (!res.ok) {
      console.error("PayMongo Error:", data);
      return NextResponse.json(
        {
          success: false,
          message:
            data.errors?.[0]?.detail || "Failed to create payment intent",
          errors: data.errors,
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      clientKey: data.data.attributes.client_key,
    });
  } catch (error) {
    console.error("PayMongo error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}
