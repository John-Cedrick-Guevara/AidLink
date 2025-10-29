import { Rating } from "@/types";
import { Star } from "lucide-react";
import React from "react";

const RatingComponent = ({ ratings }: { ratings: Rating[] }) => {
  const calculateAverageRating = () => {
    if (!ratings || ratings.length === 0) {
      return { average: 0, count: 0 };
    }
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return {
      average: total / ratings.length,
      count: ratings.length,
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
  return (
    <div className="flex items-center gap-2 ">
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
  );
};

export default RatingComponent;
