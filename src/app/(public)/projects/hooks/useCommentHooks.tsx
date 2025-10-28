import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  addCommentToProject,
  editCommentInProject,
  deleteComment,
} from "../server/commentActions";
import { toast } from "sonner";

export const useCommentHooks = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const addComment = async (projectId: string, content: string) => {
    startTransition(async () => {
      try {
        const result = await addCommentToProject(projectId, content);

        if (result.success) {
          toast.success(result.message);
          router.refresh(); // Refresh the page data
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error in addComment hook:", error);
        toast.error("Failed to add comment");
      }
    });
  };

  const editComment = async (
    projectId: string,
    commentId: string,
    content: string
  ) => {
    startTransition(async () => {
      try {
        const result = await editCommentInProject(commentId, content);

        if (result.success) {
          toast.success(result.message);
          router.refresh(); // Refresh the page data
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error in editComment hook:", error);
        toast.error("Failed to edit comment");
      }
    });
  };

  const removeComment = async (commentId: string, userId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteComment(commentId, userId);

        if (result.success) {
          toast.success(result.message);
          router.refresh(); // Refresh the page data
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error in deleteComment hook:", error);
        toast.error("Failed to delete comment");
      }
    });
  };

  return { addComment, editComment, removeComment, isPending };
};
