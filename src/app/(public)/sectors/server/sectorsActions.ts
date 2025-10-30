import { createClient } from "@/lib/supabase/supabaseServer";
import { title } from "process";

export async function getAllSectors() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sectors")
      .select("*, projects (id), funds (amount)");

    if (error) {
      throw new Error(error.message);
    }

    return data.map((sector) => ({
      title: sector.title,
      id: sector.id,
      description: sector.description,
      projectCount: sector.projects ? sector.projects.length : 0,
      totalRaised: sector.funds
        ? sector.funds.reduce(
            (total: number, fund: { amount: number }) => total + fund.amount,
            0
          )
        : 0,
    }));
  } catch (error) {
    console.error("Error fetching sectors:", error);
    throw error;
  }
}
