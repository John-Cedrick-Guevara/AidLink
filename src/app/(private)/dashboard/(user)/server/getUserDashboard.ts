import { decrypt } from "@/lib/crypto";
import { createClient } from "@/lib/supabase/supabaseServer";
import { EncryptedBankAccount, Fund, FundSummary, Project } from "@/types";

export interface AdminStatsData {
  myProjectsCount: number;
  myDonationsCount: number;
  totalDonatedAmount: number;

  myProjects: Project[];
  myDonations: FundSummary[];
}

export async function getUserDashboardData(
  userId: string
): Promise<AdminStatsData> {
  const supabase = await createClient();

  const [myProjects, myDonations] = await Promise.all([
    // Fetch user's projects
    await supabase
      .from("projects")
      .select("*, funds (id, amount, status), bank_details(*), sector (*)")
      .eq("proposer", userId),

    // Fetch user's donations count
    await supabase.from("funds").select("*").eq("user", userId),
  ]);

  return {
    myProjectsCount: myProjects.data?.length || 0,
    myDonationsCount: myDonations.data?.length || 0,
    totalDonatedAmount:
      myDonations.data?.reduce((acc, donation) => acc + donation.amount, 0) ||
      0,
    myProjects:
      myProjects.data?.map((project) => ({
        ...project,
        bank_details: project.bank_details.map(
          (account: EncryptedBankAccount) => ({
            id: account.id,
            account_name: account.account_name
              ? decrypt(account.account_name)
              : "",
            account_number: account.account_number
              ? decrypt(account.account_number)
              : "",
            bank_name: account.bank_name ? decrypt(account.bank_name) : "",
          })
        ),
      })) || [],
    myDonations: myDonations.data || [],
  };
}
