import React from "react";
import { getAllProjects } from "./server/projectActions";
import ProjectsPage from "./components/ProjectsPage";

const page = async () => {
  const projects = await getAllProjects();

  return <ProjectsPage initialProjects={projects} />;
};

export default page;
