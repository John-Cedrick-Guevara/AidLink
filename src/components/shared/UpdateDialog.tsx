"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bell, Loader2 } from "lucide-react";
import { userUpdateHooks } from "@/app/(public)/projects/hooks/useUpdateHooks";

interface UpdateDialogProps {
  projectId: string;
  projectTitle: string;
  children?: React.ReactNode;
}

export function UpdateDialog({
  projectId,
  projectTitle,
  children,
}: UpdateDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { insertProjectUpdate, isPending } = userUpdateHooks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    await insertProjectUpdate(projectId, title, description);

    // Reset form and close dialog on success
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Post Update
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Post Project Update</DialogTitle>
            <DialogDescription>
              Share updates about <strong>{projectTitle}</strong> with your
              supporters and followers. This cannot be updated.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="update-title">
                Update Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="update-title"
                placeholder="e.g., Construction Phase Completed"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPending}
                maxLength={100}
                required
              />
              <p className="text-xs text-muted-foreground">
                {title.length}/100 characters
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="update-description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="update-description"
                placeholder="Share details about your project progress, milestones, or any important information..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isPending}
                rows={6}
                maxLength={1000}
                required
              />
              <p className="text-xs text-muted-foreground">
                {description.length}/1000 characters
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !title.trim() || !description.trim()}
              className="bg-gradient-primary"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 mr-2" />
                  Post Update
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
