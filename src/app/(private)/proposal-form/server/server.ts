"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";

interface BankAccountInsert {
  account_name: string;
  account_number: string;
  bank_name: string;
  user: string;
  project: string;
}

export async function handleCreateProject(formData: FormData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log(user);

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return { success: false, message: "User not authenticated." };
    }

    const userId = user.id;

    // Extract and validate form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const sector = formData.get("sector") as string;
    const team_size = formData.get("team_size") as string;
    const expected_outcome = formData.get("expected_outcome") as string;
    const potential_risks = formData.get("potential_risks") as string;
    const target_funds = formData.get("target_funds") as string;
    const target_start_date = formData.get("target_start_date") as string;
    const tags = formData.get("tags") as string;


    console.log(formData);
    // Validate required fields
    if (!title || !description || !sector || !team_size || !target_funds) {
      return { success: false, message: "Please fill in all required fields." };
    }

    // Parse bank accounts (sent as JSON string)
    const bankAccountsJson = formData.get("bank_accounts") as string;
    let bank_accounts: any[] = [];

    try {
      bank_accounts = JSON.parse(bankAccountsJson);
      if (!Array.isArray(bank_accounts) || bank_accounts.length === 0) {
        return {
          success: false,
          message: "At least one bank account is required.",
        };
      }
    } catch (parseError) {
      console.error("Error parsing bank accounts:", parseError);
      return { success: false, message: "Invalid bank account data." };
    }

    // Get supporting documents
    const files = formData.getAll("supporting_docs") as File[];
    const validFiles = files.filter((file) => file && file.size > 0);

    // Insert project proposal
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        title,
        description,
        proposer: userId,
        sector,
        team_size: team_size ,
        expected_outcome,
        potential_risks,
        target_funds: parseFloat(target_funds) || 0,
        target_start_date,
        tags,
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
    const bankAccountInserts: BankAccountInsert[] = bank_accounts.map(
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
    if (validFiles.length > 0) {
      const uploadPromises = validFiles.map(async (file) => {
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
      });

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
