import { useTransition } from "react";

import { toast } from "sonner";
import { rateProject } from "../server/ratingAction";

export const useRatingHooks = () => {
  const [isPending, startTransition] = useTransition();

  const addRating = async (projectId: string, rating: number) => {
    startTransition(async () => {
      try {
        const result = await rateProject(projectId, rating);

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error in addRating hook:", error);
        toast.error("Failed to submit rating");
      }
    });
  };

  return { addRating, isPending };
};
