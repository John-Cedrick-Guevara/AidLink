import { createClientUseClient } from "@/lib/supabase/supabaseClient";
import { createClient } from "@/lib/supabase/supabaseServer";

export async function getAllProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "*, sector (*), bank_details(*), funds (*), comments(*), proposer:users (*)"
    )
    .eq("status", "approved");

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

export async function getProjectById(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "*, sector (*), bank_details(*), funds (*, user(full_name)), comments(*, user_id(full_name, id)), proposer:users (*), ratings(*)"
    )
    .eq("id", projectId)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data || null;
}
