"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Edit2, Trash2, X, Check } from "lucide-react";
import type { Project } from "@/types";
import { toast } from "sonner";
import { useCommentHooks } from "../../../hooks/useCommentHooks";
import { getCurrentUserId } from "../../../server/commentActions";
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

interface CommentsTabProps {
  project: Project;
}

export function CommentsTab({ project }: CommentsTabProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

  const { addComment, editComment, removeComment } = useCommentHooks();

  useEffect(() => {
    // Get current user ID
    (async () => {
      const userId = await getCurrentUserId();
      setCurrentUserId(userId);
    })();
  }, []);

  console.log(currentUserId);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);
    await addComment(project.id, comment);
    setComment(""); // Clear the input after submission
    setIsSubmitting(false);
  };

  const handleEditClick = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editedContent.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    console.log("Saving comment:", commentId, "with content:", editedContent);

    await editComment(commentId, editedContent);
    setEditingCommentId(null);
    setEditedContent("");
  };

  const handleDeleteConfirm = async () => {
    if (deleteCommentId && currentUserId) {
      await removeComment(deleteCommentId, currentUserId);
      setDeleteCommentId(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Add Comment Form */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
        <div className="space-y-4">
          <Textarea
            placeholder="Share your thoughts about this project..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            disabled={isSubmitting}
          />
          <Button
            onClick={handleSubmitComment}
            className="bg-gradient-primary"
            disabled={isSubmitting || !comment.trim()}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {!project.comments || project.comments.length === 0 ? (
          <Card className="glass-card p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              No comments yet. Be the first to comment!
            </p>
          </Card>
        ) : (
          project.comments.map((commentItem) => {
            const isEditing = editingCommentId === commentItem.id;
            const isOwner = currentUserId === commentItem.user_id?.id;

            return (
              <Card key={commentItem.id} className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-accent text-accent-foreground">
                      {getInitials(commentItem.user_id?.full_name || "Unknown")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {commentItem.user_id?.full_name || "Unknown"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(commentItem.created_at)}
                        </span>
                      </div>
                      {isOwner && !isEditing && (
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleEditClick(
                                commentItem.id,
                                commentItem.content
                              )
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteCommentId(commentItem.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {isEditing ? (
                      <div className="space-y-3 mt-2">
                        <Textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          rows={3}
                          className="resize-none"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(commentItem.id)}
                            className="bg-gradient-primary"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {commentItem.content}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteCommentId}
        onOpenChange={(open) => !open && setDeleteCommentId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
