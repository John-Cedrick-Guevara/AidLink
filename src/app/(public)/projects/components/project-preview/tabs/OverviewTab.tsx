"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, AlertTriangle } from "lucide-react";
import type { Project } from "@/types";

interface OverviewTabProps {
  project: Project;
}

export function OverviewTab({ project }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Project Description */}
      <Card className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Project Description</h3>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {project.description}
        </p>
      </Card>

      {/* Expected Outcome */}
      {project.expected_outcome && (
        <Card className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-success" />
            <h3 className="text-xl font-semibold">Expected Outcome</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {project.expected_outcome}
          </p>
        </Card>
      )}

      {/* Potential Risks */}
      {project.potential_risks && (
        <Card className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="text-xl font-semibold">Potential Risks</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {project.potential_risks}
          </p>
        </Card>
      )}
    </div>
  );
}

export default OverviewTab;