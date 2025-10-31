import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addProjectUpdate } from "../server/updateActions";
import { toast } from "sonner";

export function userUpdateHooks() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const insertProjectUpdate = async (
    projectId: string,
    title: string,
    content: string
  ) => {
    startTransition(async () => {
      try {
        const result = await addProjectUpdate(projectId, title, content);
        console.log(result);

        if (result?.success) {
          console.log("Project update added successfully");
          toast.success("Project update added successfully");
          router.refresh(); // Refresh the page data
        } else {
          console.error("Failed to add project update:", result?.message);
          toast.error(`Failed to add project update: ${result?.message}`);
        }
      } catch (error) {
        console.error("Error in insertProjectUpdate hook:", error);
        toast.error("Failed to add project update");
      }
    });
  };

  return { insertProjectUpdate, isPending };
}
