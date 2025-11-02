"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectCard from "@/components/shared/ProjectCard";

import { motion } from "framer-motion";
import { Project } from "@/types";
import EmptyState from "./EmptyState";

interface ProjectsSectionProps {
  title: string;
  projects: Project[];
}

const ProjectsSection = ({
  title,
  projects,
}: ProjectsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <EmptyState />
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsSection;
