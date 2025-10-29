import { createClient } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";

import { getUserInitialData } from "./(user)/server/getUserDashboard";
import AdminDashboard from "./(admin)/AdminDashboard";
import UserDashboard from "./(user)/UserDashboard";
import { getAllUsersForAdmin } from "./(admin)/server/usersActions";
import { getAllSectorsForAdmin } from "./(admin)/server/sectorActions";
import { getAllProjectsForAdmin } from "./(admin)/server/projectActions";
import { getAllProjects, getProjectReceipts } from "@/app/(public)/projects/server/projectActions";
import { FundSummary } from "@/types";

const page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to sign-in page if not authenticated
    redirect("/sign-in");
  }

  const userRole = user?.user_metadata.role;
  if (userRole === "admin") {
    // fetch necessary data for admin dashboard
    const sectors = await getAllSectorsForAdmin();
    const users = await getAllUsersForAdmin();
    const projects = await getAllProjectsForAdmin();

    // Redirect to admin dashboard
    return (
      <AdminDashboard sectors={sectors} users={users} projects={projects} />
    );
  } else if (userRole === "user") {
    // Redirect to user dashboard
    const dashboardData = await getUserInitialData(user?.id);
    const projects = await getAllProjects();
    const receipts = await getProjectReceipts(user.id);

console.log(receipts);
    return <UserDashboard initialData={dashboardData} projects={projects} receipts={receipts as any}/>;
  }
};

export default page;
