import { createClient } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Raw webhook:", JSON.stringify(body, null, 2));

    const event = body.data;
    const eventType = event.attributes.type;
    const paymentData = event.attributes.data?.attributes;

    if (!paymentData) {
      console.error("Missing payment data");
      return new Response("Missing payment data", { status: 400 });
    }

    const metadata = paymentData.metadata;
    const amount = paymentData.amount;
    const status = paymentData.status;

    console.log("Webhook received:", { eventType, metadata, amount, status });

    // Example update in Supabase
    if (metadata?.transaction_id) {
      const supabase = await createClient();

      const { data: paymentData, error: paymentError } = await supabase
        .from("funds")
        .insert({
          user: metadata?.user_id,
          project: metadata?.project_id,
          sector: metadata?.sector_id,
          amount: amount,
          method: "direct_paymongo",
          status: "paid",
        })
        .select()
        .single();

      if (paymentError) {
        console.error(paymentError);
        return NextResponse.json(
          { success: false, message: paymentError.message },
          { status: 400 }
        );
      }

      console.log(`✅ Updated transaction ${metadata.transaction_id}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
