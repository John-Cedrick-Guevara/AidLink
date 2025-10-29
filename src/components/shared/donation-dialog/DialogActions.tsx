"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { PaymentMethod } from "./types";

interface DialogActionsProps {
  isProcessing: boolean;
  paymentMethod: PaymentMethod;
  onCancel: () => void;
  onSubmit: () => void;
}

export const DialogActions = ({
  isProcessing,
  paymentMethod,
  onCancel,
  onSubmit,
}: DialogActionsProps) => {
  return (
    <div className="flex gap-3 pt-2">
      <Button
        variant="outline"
        onClick={onCancel}
        className="flex-1"
        type="button"
        disabled={isProcessing}
      >
        Cancel
      </Button>
      <Button
        onClick={onSubmit}
        className="flex-1 bg-gradient-primary hover:opacity-90"
        type="button"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : paymentMethod === "direct" ? (
          "Proceed to Payment"
        ) : (
          "Confirm Donation"
        )}
      </Button>
    </div>
  );
};
