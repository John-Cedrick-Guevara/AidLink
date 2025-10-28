import { createClient } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const event = body.data.attributes;
  const supabase = await createClient();

  if (event.type === "payment.paid") {
    const paymentData = event.data.attributes;

    // Example: update funds table
    await supabase.from("funds").insert({
      amount: paymentData.amount ,
      status: "paid",
      reference_id: paymentData.id,
      user_email: paymentData.billing.email,
    });
  }

  return NextResponse.json({ received: true });
}
