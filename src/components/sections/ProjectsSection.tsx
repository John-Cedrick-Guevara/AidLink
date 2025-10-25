"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/shared/ProjectCard";
import { dummyProjects } from "@/data/dummyData";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  const featuredProjects = dummyProjects
    .filter((p) => p.status === "approved")
    .slice(0, 3);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore active charity initiatives making a real difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/dashboard/user">
            <Button size="lg" variant="outline" className="px-8">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
