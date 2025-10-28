"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  DollarSign,
} from "lucide-react";
import type { Project } from "@/types";
import { OverviewTab, CommentsTab, DonationsTab, RatingsTab } from "./tabs";

interface ProjectTabsProps {
  project: Project;
}

export function ProjectTabs({ project }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="overview" className="gap-2">
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="comments" className="gap-2">
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Comments</span>
          {project.comments && project.comments.length > 0 && (
            <span className="ml-1 text-xs">({project.comments.length})</span>
          )}
        </TabsTrigger>
        <TabsTrigger value="donations" className="gap-2">
          <DollarSign className="w-4 h-4" />
          <span className="hidden sm:inline">Donations</span>
          {project.funds && project.funds.length > 0 && (
            <span className="ml-1 text-xs">({project.funds.length})</span>
          )}
        </TabsTrigger>
        <TabsTrigger value="ratings" className="gap-2">
          <Star className="w-4 h-4" />
          <span className="hidden sm:inline">Ratings</span>
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="overview" className="space-y-6 m-0">
          <OverviewTab project={project} />
        </TabsContent>

        <TabsContent value="comments" className="space-y-6 m-0">
          <CommentsTab project={project} />
        </TabsContent>

        <TabsContent value="donations" className="space-y-4 m-0">
          <DonationsTab project={project} />
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4 m-0">
          <RatingsTab project={project} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
