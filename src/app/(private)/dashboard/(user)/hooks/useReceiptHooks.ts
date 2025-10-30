"use client";
import { useTransition } from "react";
import { markAsRecieve } from "../server/receiptActions";
import { toast } from "sonner";

export function useReceiptActions({ onSuccess }: { onSuccess?: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsPaid = async (fundId: string | null) => {
    if (!fundId) return;

    startTransition(async () => {
      try {
        const result = await markAsRecieve(fundId);
        if (result.success) {
          toast.success(result.message);
          onSuccess?.();
        } else {
          toast.error(result.message || "Failed to mark receipt as paid");
        }
      } catch (error) {
        toast.error("Error marking receipt as paid");
        console.error("Error marking receipt as paid:", error);
      }
    });
  };

  return {
    isPending,
    handleMarkAsPaid,
  };
}
