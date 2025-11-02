
import { createClient } from "@/lib/supabase/supabaseServer";
import { Fund, FundSummary, Project } from "@/types";

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
      .select("*, funds (id, amount, status)")
      .eq("proposer", userId),

    // Fetch user's donations count
    await supabase.from("funds").select("*").eq("user", userId),
  ]);

  return {
    myProjectsCount: myProjects.data?.length || 0,
    myDonationsCount: myDonations.data?.length || 0,
    totalDonatedAmount:
      myDonations.data?.reduce((acc, donation) => acc + donation.amount, 0) || 0,
    myProjects: myProjects.data || [],
    myDonations: myDonations.data || [],
  };
}
