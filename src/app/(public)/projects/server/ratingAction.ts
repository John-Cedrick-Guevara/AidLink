"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { RatingSchema } from "@/lib/validations";

export async function rateProject(projectId: string, rating: number) {
  try {
    // Validate input
    const validated = RatingSchema.parse({ projectId, rating });

    // Require authentication
    const user = await requireAuth();

    const supabase = await createClient();

    // Check for existing rating
    const { data: existingRating } = await supabase
      .from("ratings")
      .select("*")
      .eq("project", validated.projectId)
      .eq("user_id", user.id)
      .single();

    if (existingRating) {
      // Update existing rating
      const { error } = await supabase
        .from("ratings")
        .update({ rating: validated.rating })
        .eq("id", existingRating.id);

      if (error) {
        console.error("Error updating rating:", error);
        return { success: false, message: "Error updating rating" };
      }
    } else {
      // Insert new rating
      const { error } = await supabase.from("ratings").insert({
        project: validated.projectId,
        user_id: user.id,
        rating: validated.rating,
      });

      if (error) {
        console.error("Error adding rating:", error);
        return { success: false, message: "Error adding rating" };
      }
    }

    revalidatePath(`/projects/${validated.projectId}`);
    return { success: true, message: "Rating submitted successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    console.error("Caught error in rateProject:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to submit rating",
    };
  }
}
