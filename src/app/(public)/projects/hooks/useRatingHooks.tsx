import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { rateProject } from "../server/ratingAction";

export const useRatingHooks = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const addRating = async (projectId: string, rating: number) => {
    startTransition(async () => {
      try {
        const result = await rateProject(projectId, rating);

        if (result.success) {
          toast.success(result.message);
          router.refresh(); // Refresh the page data
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
