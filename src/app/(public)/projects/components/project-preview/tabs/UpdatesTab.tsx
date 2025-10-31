"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Calendar, User } from "lucide-react";
import type { Project } from "@/types";
import { UpdateDialog } from "@/components/shared/UpdateDialog";
import { useUser } from "@/components/providers/UserProvider";
import { Button } from "@/components/ui/button";

interface UpdatesTabProps {
  project: Project;
}

export function UpdatesTab({ project }: UpdatesTabProps) {
  const { user } = useUser();
  const isProjectOwner = user?.id === project.proposer.id;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) {
        return "Today";
      } else if (diffInDays === 1) {
        return "Yesterday";
      } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
      } else {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    } catch {
      return "N/A";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sortedUpdates = project.updates
    ? [...project.updates].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Post Update Button - Only for project owner */}
      {isProjectOwner && (
        <Card className="glass-card p-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Share Project Updates
              </h3>
              <p className="text-sm text-muted-foreground">
                Keep your supporters informed about your project's progress
              </p>
            </div>
            <UpdateDialog projectId={project.id} projectTitle={project.title}>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Post Update
              </Button>
            </UpdateDialog>
          </div>
        </Card>
      )}

      {/* Updates List */}
      {!sortedUpdates || sortedUpdates.length === 0 ? (
        <Card className="glass-card p-8 text-center">
          <Bell className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <h3 className="font-semibold text-lg mb-2">No Updates Yet</h3>
          <p className="text-muted-foreground">
            {isProjectOwner
              ? "Share the first update about your project with your supporters!"
              : "No updates have been posted for this project yet."}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedUpdates.map((update, index) => (
            <Card
              key={update.id}
              className="glass-card p-6 hover:shadow-md transition-shadow"
            >
              {/* Update Header */}
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {getInitials(project.proposer.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground">
                      {project.proposer.full_name}
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(update.created_at)}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1">
                      <Bell className="w-3 h-3" />
                      Latest Update
                    </span>
                  )}
                </div>
              </div>

              {/* Update Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {update.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {update.content}
                </p>
              </div>

              {/* Update Footer */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="w-3.5 h-3.5" />
                  <span>Posted by project owner</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Updates Timeline Info */}
      {sortedUpdates && sortedUpdates.length > 0 && (
        <Card className="glass-card p-4 bg-muted/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bell className="w-4 h-4" />
            <span>
              {sortedUpdates.length}{" "}
              {sortedUpdates.length === 1 ? "update" : "updates"} posted
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}

export default UpdatesTab;
