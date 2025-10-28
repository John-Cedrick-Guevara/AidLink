"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { getCurrentUser, requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  CommentSchema,
  EditCommentSchema,
  DeleteCommentSchema,
} from "@/lib/validations";

export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user?.id || null;
}

export async function addCommentToProject(projectId: string, content: string) {
  try {
    // Validate input
    const validated = CommentSchema.parse({ projectId, content });

    // Require authentication
    const user = await requireAuth();

    const supabase = await createClient();
    const { data, error } = await supabase.from("comments").insert({
      project: validated.projectId,
      user_id: user.id,
      content: validated.content,
    });

    if (error) {
      console.error("Error adding comment:", error);
      return { success: false, message: "Error adding comment" };
    }

    revalidatePath(`/projects/${validated.projectId}`);
    return { success: true, message: "Comment added successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    console.error("Caught error in addCommentToProject:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add comment",
    };
  }
}

export async function editCommentInProject(commentId: string, content: string) {
  try {
    // Validate input
    const validated = EditCommentSchema.parse({ commentId, content });

    // Require authentication
    const user = await requireAuth();

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("comments")
      .update({
        content: validated.content,
      })
      .eq("id", validated.commentId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error editing comment:", error);
      return { success: false, message: "Error editing comment" };
    }

    revalidatePath("/projects");
    return { success: true, message: "Comment edited successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    console.error("Caught error in editCommentInProject:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to edit comment",
    };
  }
}

export async function deleteComment(commentId: string, userId: string) {
  try {
    // Validate input
    const validated = DeleteCommentSchema.parse({ commentId, userId });

    // Require authentication
    const user = await requireAuth();

    // Ensure the authenticated user matches the userId parameter
    if (user.id !== validated.userId) {
      return { success: false, message: "Unauthorized" };
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", validated.commentId)
      .eq("user_id", validated.userId);

    if (error) {
      console.error("Error deleting comment:", error);
      return { success: false, message: "Error deleting comment" };
    }

    revalidatePath("/projects");
    return { success: true, message: "Comment deleted successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    console.error("Caught error in deleteComment:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete comment",
    };
  }
}
