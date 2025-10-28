"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectCard from "@/components/shared/ProjectCard";

import { motion } from "framer-motion";
import { Project } from "@/types";

interface ProjectsSectionProps {
  title: string;
  projects: Project[];
  showViewAll?: boolean;
  delay?: number;
}

const ProjectsSection = ({
  title,
  projects,
  showViewAll = false,
  delay = 0,
}: ProjectsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <Link href="/projects/new">
            <Button variant="outline">View All</Button>
          </Link>
        )}
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No projects to display</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsSection;
