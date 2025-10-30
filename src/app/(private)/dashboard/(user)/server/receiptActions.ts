"use server";
import { createClient } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notificationActions";

export async function markAsRecieve(fundId: string) {
  const supabase = await createClient();

  try {
    // First, fetch the fund details to get donor info and project details
    const { data: fund, error: fetchError } = await supabase
      .from("funds")
      .select("amount, user, project (title)")
      .eq("id", fundId)
      .single();

    if (fetchError || !fund) {
      console.error("Error fetching fund details:", fetchError);
      return { success: false, message: "Error fetching fund details." };
    }

    // Update fund status to paid
    const { error } = await supabase
      .from("funds")
      .update({ status: "paid" })
      .eq("id", fundId);

    if (error) {
      console.error("Error updating fund status:", error);
      return { success: false, message: "Error marking fund as received." };
    }

    // Notify the donor that their donation has been confirmed
    if (fund.user) {
      const projectTitle = (fund.project as any)?.title || "the project";
      await createNotification(
        fund.user,
        "confirmation",
        "✅ Donation Confirmed",
        `Your donation of ₱${fund.amount.toLocaleString()} to "${projectTitle}" has been confirmed by the project owner. Thank you for your generosity!`
      );
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Fund marked as received." };
  } catch (error) {
    console.error("Server error:", error);
    return { success: false, message: "Server error." };
  }
}
