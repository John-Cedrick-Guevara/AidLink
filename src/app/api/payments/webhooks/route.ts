import { createClient } from "@/lib/supabase/supabaseServer";

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
    const amount = paymentData.amount / 100;
    const status = paymentData.status;

    console.log("Webhook received:", { eventType, metadata, amount, status });

    // Example update in Supabase
    if (metadata?.transaction_id) {
      const supabase = await createClient();

      const { error } = await supabase
        .from("funds")
        .update({
          status: "paid",
        })
        .eq("id", metadata.transaction_id);

      if (error) {
        console.error("Supabase update error:", error);
        return new Response("Supabase update error", { status: 500 });
      }

      await supabase.from("debug_logs").insert({
        message: "Payment webhook received",
      });

      console.log(`✅ Updated transaction ${metadata.transaction_id}`);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response("Error", { status: 500 });
  }
}
