import { createClient } from "@/lib/supabase/supabaseServer";


export async function getAllProjects() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select(
        "*, sector (*), bank_details(*), funds (*), comments(*), proposer:users (*), ratings(*), updates(*)"
      )
      .eq("status", "approved");

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectById(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "*, sector (*), bank_details(*), funds (*, user(full_name)), comments(*, user_id(full_name, id)), proposer:users (*), ratings(*), updates(*)"
    )
    .eq("id", projectId)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data || null;
}

export async function getProjectReceipts(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("funds")
    .select(
      `id,
      amount,
      receipt_url,
      method,
      status,
      created_at,
      project!inner (
        title,
        proposer
      ),
      user:users (
        full_name,
        email,
        id
      )
    `
    )
    .eq("project.proposer", userId)
    .neq("method", "direct_paymongo");
  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data;
}
