"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import { ProposalFormData } from "../types";

interface BankAccountInsert {
  account_name: string;
  account_number: string;
  bank_name: string;
  user: string;
  project: string;
}

export async function handleCreateProject(formData: ProposalFormData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return { success: false, message: "User not authenticated." };
    }

    // Check if user is restricted
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("status")
      .eq("id", user.id)
      .single();

    if (userError || !userData) {
      console.error("Error fetching user data:", userError);
      return { success: false, message: "Failed to fetch user data." };
    }

    if (userData.status === "restricted") {
      return {
        success: false,
        message: "Your account is restricted. You cannot create new projects.",
      };
    }

    const userId = user.id;

    // Insert project proposal
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        title: formData.title,
        description: formData.description,
        proposer: userId,
        sector: formData.sector,
        team_size: formData.team_size,
        expected_outcome: formData.expected_outcome,
        potential_risks: formData.potential_risks,
        target_funds: parseFloat(formData.target_funds) || 0,
        target_start_date: formData.target_start_date,
        tags: formData.tags,
      })
      .select()
      .single();

    if (projectError || !project) {
      console.error("Error creating project:", projectError);
      return {
        success: false,
        message: "Failed to create project proposal. Please try again.",
      };
    }

    // Insert bank account details
    const bankAccountInserts: BankAccountInsert[] = formData.bank_accounts.map(
      (account) => ({
        account_name: account.account_name,
        account_number: account.account_number,
        bank_name: account.bank_name,
        user: userId,
        project: project.id,
      })
    );

    const { error: bankAccountError } = await supabase
      .from("bank_details")
      .insert(bankAccountInserts);

    if (bankAccountError) {
      console.error("Error creating bank details:", bankAccountError);
      // Optionally: rollback project creation here
      return {
        success: false,
        message: "Failed to save bank account details. Please try again.",
      };
    }

    // Upload supporting documents if any
    if (formData.supporting_docs.length > 0) {
      const uploadPromises = formData.supporting_docs.map(
        async (file: File) => {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}_${Math.random()
            .toString(36)
            .substring(7)}.${fileExt}`;
          const filePath = `${project.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("project_documents")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            console.error("Error uploading file:", uploadError);
            throw uploadError;
          }

          return filePath;
        }
      );

      try {
        await Promise.all(uploadPromises);
      } catch (uploadError) {
        console.error("Error uploading documents:", uploadError);
        return {
          success: false,
          message: "Project created but failed to upload some documents.",
        };
      }
    }

    // Revalidate relevant paths
    revalidatePath("/dashboard");
    revalidatePath("/proposal-form");

    return {
      success: true,
      message: "Project proposal submitted successfully!",
      projectId: project.id,
    };
  } catch (error) {
    console.error("Unexpected error creating project:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function handleGetSectors() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("sectors").select("*");

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching sectors:", error);
    return {
      success: false,
      message: "Failed to fetch sectors. Please try again.",
    };
  }
}
