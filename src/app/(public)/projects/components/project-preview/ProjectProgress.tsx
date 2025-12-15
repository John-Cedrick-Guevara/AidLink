"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getTotalAmoaunt } from "@/lib/helper";
import type { Project } from "@/types";

interface ProjectProgressProps {
  project: Project;
}

export function ProjectProgress({ project }: ProjectProgressProps) {
  // Calculate total funds from funds array
  const paidFunds = project.funds.filter((fund) => fund.status === "paid");

  const currentFunds = getTotalAmoaunt(paidFunds);

  const targetFunds = project.target_funds || 1;
  const progress = Math.min((currentFunds / targetFunds) * 100, 100);
  const remaining = Math.max(targetFunds - currentFunds, 0);

  return (
    <div className="p-6 bg-linear-to-br from-primary/5 to-accent/5 rounded-xl">
      <div className="space-y-4">
        {/* Funding Info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              ₱{currentFunds.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              raised of ₱{targetFunds.toLocaleString()} goal
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl md:text-2xl font-bold">
              {Math.round(progress)}%
            </p>
            <p className="text-sm text-muted-foreground">funded</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-3" />

        {/* Remaining Amount */}
        <p className="text-sm text-muted-foreground text-center">
          ₱{(remaining < 0 ? 0 : remaining).toLocaleString()} remaining
        </p>
      </div>
    </div>
  );
}
