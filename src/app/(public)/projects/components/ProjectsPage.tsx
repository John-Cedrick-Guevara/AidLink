"use client";
import ProjectFilters from "@/app/(private)/dashboard/components/shared/ProjectFilters";
import ProjectCard from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useProjects } from "@/app/(public)/projects/hooks/useProjects";
import { Project } from "@/types";
import { motion } from "framer-motion";
import { PlusCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

const ProjectsPage = ({ initialProjects }: { initialProjects: Project[] }) => {
  // Use SWR with initial data from server
  const { projects, isLoading, error } = useProjects(initialProjects);
  const router = useRouter();

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-lg mx-auto p-6">
          <div className="flex items-center gap-2 text-red-500 mb-4">
            <AlertCircle className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Error Loading Projects</h2>
          </div>
          <p className="text-muted-foreground">
            {error.message ||
              "Failed to load projects. Please try again later."}
          </p>
        </Card>
      </div>
    );
  }

  // Loading state (only show if no initial data)
  if (isLoading && initialProjects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6">

      <Navbar/>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push("/projects")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Browse <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-muted-foreground">
              Discover and support meaningful charity initiatives
            </p>
          </div>
          <Link href="/proposal-form">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 shadow-md"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Project
            </Button>
          </Link>
        </div>

        <ProjectFilters />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
