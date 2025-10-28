'use client'
import { useTransition } from "react";
import { deleteProject, updateProjectStatus } from "../server/projectActions";
import { toast } from "sonner";

export function useProjectActions({ onSuccess }: { onSuccess?: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleUpdateProjectStatus = async (
    projectId: string | null,
    approve: boolean
  ) => {
    if (!projectId) return;
    startTransition(async () => {
      try {
        const result = await updateProjectStatus(projectId, approve);
        if (result.success) {
          toast.success(result.message);
          onSuccess?.();
        } else {
          toast.error(result.message || "Failed to update project status");
        }
      } catch (error) {
        toast.error("Error updating project status");
        console.error("Error updating project status:", error);
      }
    });
  };

  const handleDeleteProject = async (projectId: string | null) => {
    if (!projectId) return;
    startTransition(async () => {
      try {
        const result = await deleteProject(projectId);
        if (result.success) {
          toast.success(result.message);
          onSuccess?.();
        } else {
          toast.error(result.message || "Failed to delete project");
        }
      } catch (error) {
        toast.error("Error deleting project");
        console.error("Error deleting project:", error);
      }
    });
  };

  return {
    isPending,
    handleUpdateProjectStatus,
    handleDeleteProject,
  };
}
