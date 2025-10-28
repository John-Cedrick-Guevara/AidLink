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
import { Trash2, Loader2, UserX } from "lucide-react";
import { User } from "@/types";
import { useUserActions } from "../../../hooks/adminUserHooks";

interface RestrictUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RestrictUserDialog = ({
  user,
  open,
  onOpenChange,
}: RestrictUserDialogProps) => {
  const { isPending, handleToggleUserRestriction } = useUserActions({
    onRestrictSuccess: () => {
      onOpenChange(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will restrict{" "}
            <span className="font-semibold text-foreground">
              "{user?.full_name}"
            </span>
            . and limit user's access.
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
              handleToggleUserRestriction(
                user?.id ?? null,
                user?.status === "restricted" ? "unrestrict" : "restrict"
              )
            }
            disabled={isPending}
            className={`${
              user?.status === "restricted"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-destructive hover:bg-destructive/90 "
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Restricting...
              </>
            ) : (
              <>
                <UserX className="w-4 h-4 mr-2" />
                {user?.status === "restricted" ? "Unrestrict" : "Restrict"}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RestrictUserDialog;
