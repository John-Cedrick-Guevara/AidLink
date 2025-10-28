"use client";

import { Card } from "@/components/ui/card";
import { Users, Calendar, Target } from "lucide-react";
import type { Project } from "@/types";

interface ProjectMetaProps {
  project: Project;
}

export function ProjectMeta({ project }: ProjectMetaProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Team Size */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Team Size</p>
          <p className="font-medium truncate">{project.team_size || "N/A"}</p>
        </div>
      </div>

      {/* Start Date */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
        <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-accent-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Start Date</p>
          <p className="font-medium truncate">
            {formatDate(project.target_start_date)}
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Category</p>
          <p className="font-medium truncate">
            {typeof project.sector === "object"
              ? project.sector.title
              : project.sector}
          </p>
        </div>
      </div>
    </div>
  );
}
