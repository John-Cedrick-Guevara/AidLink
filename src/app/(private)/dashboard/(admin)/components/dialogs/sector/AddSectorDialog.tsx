"use client";

import { useState } from "react";
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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { useSectorActions } from "../../../hooks/adminSectorHooks";

interface AddSectorDialogProps {
  trigger?: React.ReactNode;
}

const AddSectorDialog = ({ trigger }: AddSectorDialogProps) => {
  const [open, setOpen] = useState(false);

  const { isPending, handleAddSector } = useSectorActions({
    onSuccess: () => {
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Sector
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Sector</DialogTitle>
          <DialogDescription>
            Create a new project category sector
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => handleAddSector(e)} className="space-y-4 pt-4">
          {/* Sector Name */}
          <div className="space-y-2">
            <Label htmlFor="sectorName">
              Sector Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="sectorName"
              name="sectorName"
              placeholder="e.g., Sports & Recreation"
              required
              disabled={isPending}
              minLength={3}
            />
          </div>

          {/* Sector Description */}
          <div className="space-y-2">
            <Label htmlFor="sectorDescription">
              Sector Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              name="sectorDescription"
              id="sectorDescription"
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
              onClick={() => setOpen(false)}
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
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sector
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectorDialog;
