"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, BookLock, Calendar, Target, Users } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import StarRating from "./StarRating";
import { Progress } from "../ui/progress";
import { Fund, Project } from "@/types";

import RatingComponent from "@/app/(public)/projects/components/RatingComponent";
import { DonationDialog } from "./donation-dialog/DonationDialog";
import { UpdateDialog } from "./UpdateDialog";
import { useUser } from "../providers/UserProvider";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { user } = useUser();

  const total_funds_raised = project.funds
    ? project.funds.reduce((sum: number, fund: Fund) => sum + fund.amount, 0)
    : 0;

  const tags = project.tags
    ? project.tags.split(",").map((tag) => tag.trim())
    : [];

  const progress = (total_funds_raised / project.target_funds) * 100;

  const isDone = new Date(project.target_start_date) <= new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="glass-card overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
        <div className="p-6 flex-1 flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground line-clamp-2 mb-2">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="font-normal">
                  {project.sector.title}
                </Badge>
              </div>
            </div>
          </div>

          {/* Average Rating */}
          {project.ratings && project.ratings.length > 0 && (
            <RatingComponent ratings={project.ratings} />
          )}

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Raised</span>
              <span className="font-semibold text-primary">
                ₱{total_funds_raised.toLocaleString()} / ₱
                {project.target_funds.toLocaleString()}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{Math.round(progress)}% funded</span>
              <span>
                ₱{(project.target_funds - total_funds_raised).toLocaleString()}{" "}
                remaining
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{project.team_size}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(project.target_start_date).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Link href={`/projects/${project.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            {user &&
              (isDone ? (
                <Button
                  disabled
                  className="flex-1 text-xs w-10 whitespace-break-spaces bg-gradient-primary hover:opacity-90 "
                >
                  <BookLock className="w-4 h-4 mr-2" />
                  Project no longer accepting donations
                </Button>
              ) : user?.id !== project.proposer.id ? (
                <DonationDialog
                  projectId={project.id}
                  projectTitle={project.title}
                  bankAccounts={project.bank_details}
                  sectorId={project.sector.id}
                >
                  <Button className="flex-1 bg-gradient-accent hover:opacity-90">
                    <Target className="w-4 h-4 mr-2" />
                    Donate
                  </Button>
                </DonationDialog>
              ) : (
                <UpdateDialog
                  projectId={project.id}
                  projectTitle={project.title}
                >
                  <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                    <Target className="w-4 h-4 mr-2" />
                    Post Update
                  </Button>
                </UpdateDialog>
              ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
