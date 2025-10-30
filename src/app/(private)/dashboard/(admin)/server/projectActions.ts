"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { createNotification } from "../../(user)/server/notificationActions";

export async function getAllProjectsForAdmin() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, sector (*), funds (*), proposer:users (*)");

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    // Return plain serializable data
    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching projects:", error);
    return [];
  }
}

export async function updateProjectStatus(projectId: string, approve: boolean) {
  try {
    const supabase = await createClient();

    // First, get the project details to notify the proposer
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("title, proposer")
      .eq("id", projectId)
      .single();

    if (fetchError) {
      console.error("Error fetching project details:", fetchError);
      return { success: false, message: fetchError.message };
    }

    // Update project status
    const { error } = await supabase
      .from("projects")
      .update({
        status: approve ? "approved" : "rejected",
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (error) {
      console.error("Error updating project status:", error);
      return { success: false, message: error.message };
    }

    // Send notification to project proposer
    if (project?.proposer) {
      await createNotification(
        project.proposer,
        approve ? "approval" : "rejection",
        approve ? "🎉 Project Approved!" : "📋 Project Status Update",
        approve
          ? `Great news! Your project "${project.title}" has been approved and is now live on the platform.`
          : `Your project "${project.title}" was not approved. Please review the guidelines and consider resubmitting with improvements.`
      );
    }

    // Revalidate admin dashboard to reflect changes
    revalidatePath("/dashboard");

    return { success: true, message: "Project status updated successfully" };
  } catch (error) {
    console.error("Unexpected error updating project status:", error);
    return { success: false, message: "Error updating project status" };
  }
}

// Delete a project by its ID
export async function deleteProject(projectId: string) {
  try {
    const supabase = await createClient();

    // Delete related bank details first (if any)
    await supabase.from("bank_details").delete().eq("project", projectId);

    // Delete the project
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      console.error("Error deleting project:", error);
      return { success: false, message: error.message };
    }

    // Revalidate admin dashboard
    revalidatePath("/dashboard");

    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Unexpected error deleting project:", error);
    return { success: false, message: "Error deleting project" };
  }
}
