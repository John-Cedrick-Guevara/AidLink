import { createClient } from "@/lib/supabase/supabaseServer";

export interface AdminDashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalPendingProjects: number;
  totalApprovedProjects: number;
  totalFunds: number;
  totalSectors: number;
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const supabase = await createClient();

  const [
    totalUsers,
    totalProjects,
    totalPendingProjects,
    totalApprovedProjects,
    totalFunds,
    totalSectors,
  ] = await Promise.all([
    // User counts
    supabase.from("users").select("id", { count: "exact" }),

    // Project counts
    supabase.from("projects").select("id", { count: "exact" }),

    // Approved projects
    supabase
      .from("projects")
      .select("id", { count: "exact" })
      .eq("status", "approved"),

    // Pending projects
    supabase
      .from("projects")
      .select("id", { count: "exact" })
      .eq("status", "pending"),

    // Fund counts
    supabase.from("funds").select("id", { count: "exact" }),

    // Sector counts
    supabase.from("sectors").select("id", { count: "exact" }),
  ]);

  return {
    totalUsers: totalUsers.count || 0,
    totalProjects: totalProjects.count || 0,
    totalPendingProjects: totalPendingProjects.count || 0,
    totalApprovedProjects: totalApprovedProjects.count || 0,
    totalFunds: totalFunds.count || 0,
    totalSectors: totalSectors.count || 0,
  };
}

