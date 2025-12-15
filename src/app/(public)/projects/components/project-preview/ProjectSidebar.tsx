"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Users, Calendar, BookLock } from "lucide-react";
import type { Project } from "@/types";

import RatingComponent from "../RatingComponent";
import { DonationDialog } from "@/components/shared/donation-dialog/DonationDialog";
import Link from "next/link";
import { useUser } from "@/components/providers/UserProvider";
import LockCard from "@/components/shared/LockCard";

interface ProjectSidebarProps {
  project: Project;
}

export function ProjectSidebar({ project }: ProjectSidebarProps) {
  const daysRemaining = () => {
    try {
      const startDate = new Date(project.target_start_date);
      const today = new Date();
      const diffTime = startDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch {
      return 0;
    }
  };

  const { user } = useUser();

  const filePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project_documents/${project.documents_url}`;

  const isDone = new Date(project.target_start_date) <= new Date(); 

  return (
    <div className="space-y-6">
      {/* Support Card */}
      {user ? (
        isDone ? (
          <Button
            disabled
            className="w-full text-xs whitespace-break-spaces bg-gradient-primary hover:opacity-90 "
          >
            <BookLock className="w-4 h-4 mr-2" />
            Project no longer accepting donations
          </Button>
        ) : (
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Support This Project</h3>
            <DonationDialog
              projectId={project.id}
              projectTitle={project.title}
              bankAccounts={project.bank_details}
              sectorId={project.sector.id}
            >
              <Button
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
            </DonationDialog>
          </Card>
        )
      ) : (
        <LockCard
          title={"Log In to Donate"}
          message={"For secure access to donation options, please log in."}
        />
      )}

      {/* Project Stats */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Project Stats</h3>

        {/* Average Rating */}
        {project.ratings && project.ratings.length > 0 && (
          <RatingComponent ratings={project.ratings} />
        )}

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Backers
            </span>
            <span className="font-semibold">
              {project.funds?.filter((f) => f.status === "paid").length || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Days Left
            </span>
            <span className="font-semibold">{daysRemaining()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Comments
            </span>
            <span className="font-semibold">
              {project.comments?.length || 0}
            </span>
          </div>
        </div>
      </Card>

      {/* Proposer Info */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Project Creator</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">
              {project.proposer?.full_name || "Unknown"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm">{project.proposer?.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Supporting Documents</p>
            {project.documents_url ? (
              <Link
                href={filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                Supporting Documents
              </Link>
            ) : (
              <p className="text-sm">N/A</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
