"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

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
  return { success: true, message: `User has been ${action}ed successfully` };
}
