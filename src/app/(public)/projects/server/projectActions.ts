import { decrypt } from "@/lib/crypto";
import { createClient } from "@/lib/supabase/supabaseServer";
import { EncryptedBankAccount } from "@/types";

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


    return data && data.length > 0
      ? data.map((p) => ({
          ...p,
          bank_details: p.bank_details.map((account: EncryptedBankAccount) => ({
            id: account.id,
            account_name: account.account_name
              ? decrypt(account.account_name)
              : "",
            account_number: account.account_number
              ? decrypt(account.account_number)
              : "",
            bank_name: account.bank_name ? decrypt(account.bank_name) : "",
          })),
        }))
      : [];
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

  return data
    ? {
        ...data,
        bank_details: data.bank_details
          ? data.bank_details.map((account: EncryptedBankAccount) => ({
              id: account.id,
              account_name: account.account_name
                ? decrypt(account.account_name)
                : "",
              account_number: account.account_number
                ? decrypt(account.account_number)
                : "",
              bank_name: account.bank_name ? decrypt(account.bank_name) : "",
            }))
          : [],
      }
    : null;
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
