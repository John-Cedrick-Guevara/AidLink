"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit, Loader2 } from "lucide-react";
import { Sector } from "@/types";
import { useSectorActions } from "../../../hooks/adminSectorHooks";

interface EditSectorDialogProps {
  sector: Sector | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const EditSectorDialog = ({
  sector,
  open,
  onOpenChange,
}: EditSectorDialogProps) => {
  const { isPending, handleEditSector } = useSectorActions({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Sector</DialogTitle>
          <DialogDescription>
            Update the sector name and description
          </DialogDescription>
        </DialogHeader>

        {sector && (
          <form
            onSubmit={(e) => handleEditSector(e, sector)}
            className="space-y-4 pt-4"
          >
            {/* Hidden Sector ID */}
            <input type="hidden" name="sectorId" value={sector.id} />

            {/* Sector Name */}
            <div className="space-y-2">
              <Label htmlFor="editSectorName">
                Sector Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="editSectorName"
                name="sectorName"
                defaultValue={sector.title}
                placeholder="e.g., Sports & Recreation"
                required
                disabled={isPending}
                minLength={3}
              />
            </div>

            {/* Sector Description */}
            <div className="space-y-2">
              <Label htmlFor="editSectorDescription">
                Sector Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                name="sectorDescription"
                id="editSectorDescription"
                defaultValue={sector.description}
                placeholder="e.g., Projects related to sports activities and recreational facilities"
                required
                disabled={isPending}
                rows={3}
                minLength={10}
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-primary"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Sector
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditSectorDialog;
