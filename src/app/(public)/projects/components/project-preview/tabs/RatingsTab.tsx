"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { Project } from "@/types";
import { useRatingHooks } from "../../../hooks/useRatingHooks";

interface RatingsTabProps {
  project: Project;
}

export function RatingsTab({ project }: RatingsTabProps) {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addRating } = useRatingHooks();

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleRatingSubmit = async () => {
    if (userRating === 0) {
      return;
    }

    setIsSubmitting(true);
    await addRating(project.id, userRating);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Submit Rating */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Rate This Project</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Your Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                  disabled={isSubmitting}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      rating <= (hoveredRating || userRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {userRating > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                You selected {userRating} star{userRating > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Button
            onClick={handleRatingSubmit}
            className="bg-gradient-primary"
            disabled={isSubmitting || userRating === 0}
          >
            <Star className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
