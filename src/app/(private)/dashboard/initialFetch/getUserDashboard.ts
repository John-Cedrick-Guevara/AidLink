import { FundingReceipt, Project } from "@/data/dummyData";
import { createClient } from "@/lib/supabase/supabaseServer";

export interface userInitialData {
  myProjectsCount: number;
  myDonationsCount: number;
  totalDonatedAmount: number;

  myProjects: Project[];
  myDonations: FundingReceipt[];
}

export async function getUserInitialData(userId: string): Promise<userInitialData> {
  const supabase = await createClient();

  const [
    { data: myProjects },
    { data: myDonations },
  ] = await Promise.all([
    // Fetch user's projects
    await supabase
      .from("projects")
      .select("*, funds, comments:Comments")
      .eq("proposer", userId),


    // Fetch user's donations count
    await supabase
      .from("funding_receipts")
      .select("*")
      .eq("user", userId),
  ]);

  return {
    myProjectsCount: myProjects?.length || 0,
    myDonationsCount: myDonations?.length || 0,
    totalDonatedAmount: myDonations?.reduce((acc, donation) => acc + donation.amount, 0) || 0,
    myProjects: myProjects || [],
    myDonations: myDonations || [],
  };
}
