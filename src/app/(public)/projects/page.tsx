import React from "react";
import { getAllProjects } from "./server/projectActions";
import ProjectsPage from "./components/ProjectsPage";
import { getCurrentUser } from "@/lib/auth";

const page = async () => {
  const projects = await getAllProjects();
  const user = await getCurrentUser();
  
  console.log(user);

  return <ProjectsPage initialProjects={projects} />;
};

export default page;
