"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Share2, Star } from "lucide-react";
import type { Project } from "@/types";
import { ProjectProgress } from "./ProjectProgress";
import { ProjectMeta } from "./ProjectMeta";

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "approved":
        return "bg-success/10 text-success border-success/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const calculateAverageRating = () => {
    if (!project.ratings || project.ratings.length === 0) {
      return { average: 0, count: 0 };
    }
    const total = project.ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    return {
      average: total / project.ratings.length,
      count: project.ratings.length,
    };
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 absolute" />
            <div className="overflow-hidden absolute w-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="glass-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Title and Status */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 break-words">
              {project.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="font-medium">
                {typeof project.sector === "object"
                  ? project.sector.title
                  : project.sector}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </Badge>
            </div>

            {/* Average Rating */}
            {project.ratings && project.ratings.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  {renderStars(calculateAverageRating().average)}
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {calculateAverageRating().average.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({calculateAverageRating().count}{" "}
                  {calculateAverageRating().count === 1 ? "rating" : "ratings"})
                </span>
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Proposer Info */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-primary text-white text-sm">
              {getInitials(project.proposer?.full_name || "Unknown")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">
            Proposed by{" "}
            <span className="font-medium text-foreground">
              {project.proposer?.full_name || "Unknown"}
            </span>
          </span>
        </div>

        {/* Project Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2">
            {project.tags.split(",").map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        )}

        <ProjectProgress project={project} />
        <ProjectMeta project={project} />
      </div>
    </Card>
  );
}
