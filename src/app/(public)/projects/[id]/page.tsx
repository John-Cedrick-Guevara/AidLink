import React from "react";
import { getProjectById } from "../server/projectActions";
import ProjectPreview from "../components/ProjectPreview";
import { getCurrentUser } from "@/lib/auth";

const project = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const projectData = await getProjectById(id);
  console.log(user)

  return (
    <ProjectPreview
      initialProject={projectData}
      showTabs={user ? true : false}
    />
  );
};

export default project;
