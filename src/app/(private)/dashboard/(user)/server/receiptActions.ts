"use server";
import { createClient } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";

export async function markAsRecieve(fundId: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("funds")
      .update({ status: "paid" })
      .eq("id", fundId);

      console.log(fundId);

    if (error) {
      console.log(error);
      return { success: false, message: "Error marking fund as receive." };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Fund marked as recieve." };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Server error." };
  }
}
