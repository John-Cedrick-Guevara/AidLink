"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { createNotification } from "../../(user)/server/notificationActions";

export async function getAllUsersForAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*, funds (id, amount), projects(id, title)");
  if (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
  return data;
}

export async function restrictUser(
  userId: string,
  action: "restrict" | "unrestrict"
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("users")
    .update({ status: action === "restrict" ? "restricted" : "normal" })
    .eq("id", userId);

  if (error) {
    return {
      success: false,
      message: `Error updating user status: ${error.message}`,
    };
  }

  // Send notification to the user about their account status change
  await createNotification(
    userId,
    "restriction",
    action === "restrict" ? "⚠️ Account Restricted" : "✅ Account Restored",
    action === "restrict"
      ? "Your account has been restricted due to policy violations. Please contact support for more information."
      : "Good news! Your account restrictions have been lifted. Welcome back to the platform."
  );

  revalidatePath("/dashboard");
  return { success: true, message: `User has been ${action}ed successfully` };
}
