import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import { PaymentMethod, PaymentStatus } from "../types";
import Image from "next/image";

interface PaymentMethodButtonsProps {
  selectedMethod: PaymentMethod | null;
  status: PaymentStatus;
  onCardClick: () => void;
  onGCashClick: () => void;
  onPayMayaClick: () => void;
}

export const PaymentMethodButtons = ({
  selectedMethod,
  status,
  onCardClick,
  onGCashClick,
  onPayMayaClick,
}: PaymentMethodButtonsProps) => {
  const isProcessing = status === "processing";

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold mb-2">Select Payment Method</p>

      {/* Card Payment Button */}
      <Button
        onClick={onCardClick}
        disabled={isProcessing}
        className="w-full h-14 text-base"
        variant={selectedMethod === "card" ? "default" : "outline"}
        type="button"
      >
        {isProcessing && selectedMethod === "card" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            {selectedMethod === "card"
              ? "Confirm Card Payment"
              : "Pay with Card"}
          </>
        )}
      </Button>

      {/* GCash Payment Button */}
      <Button
        onClick={onGCashClick}
        disabled={isProcessing}
        className="w-full h-14 text-base bg-blue-600 hover:bg-blue-700"
        variant="default"
        type="button"
      >
        {isProcessing && selectedMethod === "gcash" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <span className="w-5 h-5 mr-2 inline-flex items-center justify-center text-white font-bold text-xs bg-blue-800 rounded">
              G
            </span>
            Pay with GCash
          </>
        )}
      </Button>

      {/* PayMaya Payment Button */}
      <Button
        onClick={onPayMayaClick}
        disabled={isProcessing}
        className="w-full h-14 text-base bg-green-600 hover:bg-green-700"
        variant="default"
        type="button"
      >
        {isProcessing && selectedMethod === "paymaya" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <span className="w-5 h-5 mr-2 inline-flex items-center justify-center text-white font-bold text-xs bg-green-800 rounded">
              PM
            </span>
            Pay with PayMaya
          </>
        )}
      </Button>
    </div>
  );
};
