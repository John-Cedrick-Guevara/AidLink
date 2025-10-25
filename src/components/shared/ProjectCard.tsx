"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, Calendar, Target, Users } from "lucide-react";
import { motion } from "motion/react";
import { Project, projectRatings } from "@/data/dummyData";
import { Badge } from "../ui/badge";
import StarRating from "./StarRating";
import { Progress } from "../ui/progress";

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
}

const ProjectCard = ({ project, showActions = true }: ProjectCardProps) => {
  const progress = (project.current_funds / project.target_funds) * 100;
  const projectRatingsList = projectRatings.filter(
    (r) => r.project_id === project.id
  );
  const averageRating =
    projectRatingsList.length > 0
      ? projectRatingsList.reduce((sum, r) => sum + r.rating, 0) /
        projectRatingsList.length
      : 0;

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
                  {project.sector}
                </Badge>
              </div>
            </div>
          </div>

          {/* Rating */}
          {averageRating > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={averageRating} readonly size="sm" showValue />
              <span className="text-xs text-muted-foreground">
                ({projectRatingsList.length}{" "}
                {projectRatingsList.length === 1 ? "review" : "reviews"})
              </span>
            </div>
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
                ₱{project.current_funds.toLocaleString()} / ₱
                {project.target_funds.toLocaleString()}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{Math.round(progress)}% funded</span>
              <span>
                ₱
                {(
                  project.target_funds - project.current_funds
                ).toLocaleString()}{" "}
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
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex gap-2 pt-2">
              <Link href={`/projects/${project.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
              <Button className="flex-1 bg-gradient-accent hover:opacity-90">
                <Target className="w-4 h-4 mr-2" />
                Donate
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
