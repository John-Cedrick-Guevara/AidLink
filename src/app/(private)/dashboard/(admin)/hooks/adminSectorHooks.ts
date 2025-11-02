import { useTransition } from "react";
import { toast } from "sonner"; // or "@/components/ui/use-toast"

import type { Sector } from "@/types";
import {
  createNewSector,
  deleteSector,
  editSector,
} from "../server/sectorActions";

export function useSectorActions({ onSuccess }: { onSuccess?: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleAddSector = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await createNewSector(null, formData);

        if (result.success) {
          toast.success(result.message);
          onSuccess?.();
        } else {
          toast.error(result.message || "Failed to create sector");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Error creating sector:", error);
      }
    });
  };

  const handleEditSector = async (
    e: React.FormEvent<HTMLFormElement>,
    editingSector: Sector | null
  ) => {
    e.preventDefault();
    if (!editingSector) return;

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await editSector(null, formData);

        if (result.success) {
          toast.success(result.message);
          onSuccess?.();
        } else {
          toast.error(result.message || "Failed to update sector");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Error updating sector:", error);
      }
    });
  };

  const handleDeleteSector = async (deletingSector: Sector | null) => {
    if (!deletingSector) return;

    startTransition(async () => {
      try {
        const result = await deleteSector(null, deletingSector.id);

        if (result.success) {
          toast.success(result.message);
          onSuccess?.();
        } else {
          toast.error(result.message || "Failed to delete sector");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Error deleting sector:", error);
      }
    });
  };

  return {
    isPending,
    handleAddSector,
    handleEditSector,
    handleDeleteSector,
  };
}
