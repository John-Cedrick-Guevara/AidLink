import React from "react";
import { getProjectById } from "../server/projectActions";
import ProjectPreview from "../components/ProjectPreview";

const project = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const projectData = await getProjectById(id);

  return <ProjectPreview initialProject={projectData} />;
 
};

export default project;
