"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2, X } from "lucide-react";
import { Project, Sector } from "@/types";
import { useSectorActions } from "../../../hooks/adminSectorHooks";
import { useProjectActions } from "../../../hooks/adminProjectHooks";

interface AlertProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toDelete: boolean;
}

const AlertProjectDialog = ({
  project,
  open,
  onOpenChange,
  toDelete,
}: AlertProjectDialogProps) => {
  const { isPending, handleDeleteProject, handleUpdateProjectStatus } =
    useProjectActions({
      onSuccess: () => {
        onOpenChange(false);
      },
    });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {toDelete
              ? "This will permanently delete the project "
              : "You are about to reject the project "}
            <span className="font-semibold text-foreground">
              "{project?.title}" by {project?.proposer.full_name}
            </span>
            . This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              toDelete
                ? handleDeleteProject(project?.id || "")
                : handleUpdateProjectStatus(project?.id || "", false)
            }
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {toDelete ? "Deleting..." : "Rejecting..."}
              </>
            ) : (
              <>
                {toDelete ? (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </>
                )}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertProjectDialog;
