import { useTransition } from "react";
import { restrictUser } from "../server/usersActions";
import { toast } from "sonner";

export function useUserActions({
  onRestrictSuccess,
}: {
  onRestrictSuccess?: () => void;
}) {
  const [isPending, startTransition] = useTransition();

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
        }
      } catch (error) {
        toast.error("Failed to update user status");
      }
    });
  };

  return { isPending, handleToggleUserRestriction };
}
