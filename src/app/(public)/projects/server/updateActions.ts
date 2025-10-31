"use server";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/supabaseServer";
import { Description } from "@radix-ui/react-dialog";

export async function addProjectUpdate(
  projectId: string,
  content: string,
  title: string
) {
  try {
    const supabase = await createClient();
    // get current user
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: "User not authenticated" };
    }

    // gets the project
    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("id, title")
      .eq("proposer", user.id)
      .eq("id", projectId)
      .single();

    if (projectError) {
      console.error("Error fetching project:", projectError);
      return { success: false, message: "The project does not exist" };
    }

    console.log(projectId, projectData, user.id);

    const { data, error } = await supabase.from("updates").insert({
      project: projectId,
      user: user.id,
      title,
      description: content,
    });

    console.log(data);

    if (error) {
      console.error("Error adding project update:", error);
      return { success: false, message: "Error adding project update" };
    }

    return { success: true, message: "Project update added successfully" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}
