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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BellRing, Loader2 } from "lucide-react";
import { User } from "@/types";

interface NotifyUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendNotification: (userId: string, title: string, message: string) => void;
  isPending: boolean;
}

// Predefined notification templates
const notificationTemplates = [
  {
    value: "custom",
    label: "Custom Message",
    title: "",
    message: "",
  },
  {
    value: "update_project",
    label: "Request Project Update",
    title: "📋 Please Provide a Project Update",
    message:
      "Hello! We noticed your project hasn't been updated recently. Please share the latest progress with your supporters to keep them engaged and informed.",
  },
  {
    value: "complete_profile",
    label: "Complete Profile",
    title: "👤 Complete Your Profile",
    message:
      "We noticed your profile is incomplete. Please take a moment to fill in your profile information to enhance your experience on our platform.",
  },
  {
    value: "verify_documents",
    label: "Verify Documents",
    title: "📄 Document Verification Required",
    message:
      "Please upload and verify your required documents to continue using all features of the platform. This helps us maintain trust and security.",
  },
  {
    value: "policy_reminder",
    label: "Policy Reminder",
    title: "📢 Important Policy Reminder",
    message:
      "This is a friendly reminder to review our community guidelines and platform policies. Adhering to these policies ensures a positive experience for everyone.",
  },
  {
    value: "engagement",
    label: "Increase Engagement",
    title: "💡 Tips to Increase Project Engagement",
    message:
      "Want to attract more supporters? Try posting regular updates, responding to comments, and sharing compelling stories about your project's impact!",
  },
];

export function NotifyUserDialog({
  user,
  open,
  onOpenChange,
  onSendNotification,
  isPending,
}: NotifyUserDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("custom");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    const template = notificationTemplates.find((t) => t.value === value);
    if (template) {
      setTitle(template.title);
      setMessage(template.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !title.trim() || !message.trim()) {
      return;
    }

    onSendNotification(user.id, title, message);

    // Reset form and close dialog
    setSelectedTemplate("custom");
    setTitle("");
    setMessage("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedTemplate("custom");
    setTitle("");
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Send Notification to User</DialogTitle>
            <DialogDescription>
              Send a notification to{" "}
              <strong>{user?.full_name || "this user"}</strong> (
              {user?.email || "N/A"})
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Template Selector */}
            <div className="grid gap-2">
              <Label htmlFor="template">Notification Template</Label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
                disabled={isPending}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {notificationTemplates.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title Input */}
            <div className="grid gap-2">
              <Label htmlFor="notification-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="notification-title"
                placeholder="e.g., Please provide a project update"
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

            {/* Message Textarea */}
            <div className="grid gap-2">
              <Label htmlFor="notification-message">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="notification-message"
                placeholder="Enter your message to the user..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isPending}
                rows={6}
                maxLength={500}
                required
              />
              <p className="text-xs text-muted-foreground">
                {message.length}/500 characters
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
              disabled={isPending || !title.trim() || !message.trim()}
              className="bg-gradient-primary"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <BellRing className="w-4 h-4 mr-2" />
                  Send Notification
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
