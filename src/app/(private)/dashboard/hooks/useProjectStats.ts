import { useMemo } from "react";
import { Project } from "@/data/dummyData";

export const useProjectStats = (projects: Project[]) => {
  const stats = useMemo(() => {
    const totalDonations = projects.reduce(
      (sum, p) => sum + p.current_funds,
      0
    );
    const totalTarget = projects.reduce((sum, p) => sum + p.target_funds, 0);
    const activeProjects = projects.filter(
      (p) => p.status === "approved"
    ).length;
    const fundingRate =
      totalTarget > 0 ? Math.round((totalDonations / totalTarget) * 100) : 0;

    return {
      totalProjects: projects.length,
      activeProjects,
      totalDonations,
      totalTarget,
      fundingRate,
    };
  }, [projects]);

  return stats;
};
