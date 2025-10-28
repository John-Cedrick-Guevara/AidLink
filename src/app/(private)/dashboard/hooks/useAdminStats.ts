import { useMemo } from "react";
import type { Project, User } from "@/data/dummyData";

interface AdminStats {
  totalProjects: number;
  pendingProjects: number;
  approvedProjects: number;
  totalUsers: number;
  totalDonations: number;
}
