import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { restrictUser, sendUserNotification } from "../server/usersActions";
import { toast } from "sonner";

export function useUserActions({
  onRestrictSuccess,
}: {
  onRestrictSuccess?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleUserRestriction = async function (
    userId: string | null,
    action: "restrict" | "unrestrict"
  ) {
    if (!userId) return;

    startTransition(async () => {
      try {
        const result = await restrictUser(userId, action);

        if (result.success) {
          toast.success(result.message);
          router.refresh();
        }
      } catch (error) {
        toast.error("Failed to update user status");
      }
    });
  };

  const handleSendNotification = async function (
    userId: string,
    title: string,
    message: string
  ) {
    startTransition(async () => {
      try {
        const result = await sendUserNotification(userId, title, message);

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to send notification");
      }
    });
  };

  return { isPending, handleToggleUserRestriction, handleSendNotification };
}
