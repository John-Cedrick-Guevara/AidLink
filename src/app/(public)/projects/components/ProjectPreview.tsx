"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, AlertCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types";
import { ProjectHeader } from "./project-preview/ProjectHeader";
import { ProjectTabs } from "./project-preview/ProjectTabs";
import { ProjectSidebar } from "./project-preview/ProjectSidebar";
import { useProject } from "@/app/(public)/projects/hooks/useProjectsHooks";

interface ProjectPreviewProps {
  initialProject: Project | null;
  showTabs?: boolean;
}

export default function ProjectPreview({
  initialProject,
  showTabs = false,
}: ProjectPreviewProps) {
  const router = useRouter();

  // Use SWR with initial data from server
  const { project, isLoading, error } = useProject(
    initialProject?.id || null,
    initialProject
  );

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 container mx-auto px-4 lg:px-8 py-6">
        <Card className="max-w-lg mx-auto p-6">
          <div className="flex items-center gap-2 text-red-500 mb-4">
            <AlertCircle className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Error Loading Project</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            {error.message || "Failed to load project details."}
          </p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // Loading state (only if no initial data)
  if (isLoading && !initialProject) {
    return (
      <div className="min-h-screen container mx-auto px-4 lg:px-8 py-6">
        <Skeleton className="h-10 w-24 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/4 mb-6" />
              <Skeleton className="h-20 w-full" />
            </Card>
            <Card className="p-6">
              <Skeleton className="h-40 w-full" />
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <Skeleton className="h-32 w-full" />
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Use SWR data if available, fallback to initial project
  const displayProject = project || initialProject;

  if (!displayProject) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 container mx-auto px-4 lg:px-8 py-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/projects")} size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pb-16 pt-6">
        <div className="container mx-auto px-4 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ProjectHeader project={displayProject} />
              {showTabs ? (
                <ProjectTabs project={displayProject} />
              ) : (
                <Card className="w-full max-w-sm mx-auto border border-gray-200 shadow-md rounded-2xl bg-linear-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Lock className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Log in to see more details
                    </CardTitle>
                    <CardDescription className="text-gray-500 text-sm mt-1">
                      Access your personalized dashboard and explore more
                      content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center mt-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                      Log In
                    </Button>
                  </CardContent>
                  <CardFooter className="text-center text-xs text-gray-400 mt-1">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                      Sign up
                    </a>
                  </CardFooter>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <ProjectSidebar project={displayProject} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
