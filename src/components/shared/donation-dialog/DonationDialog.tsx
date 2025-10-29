"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { AmountInput } from "./AmountInput";
import { PaymentMethodTabs } from "./PaymentMethodTabs";
import { DialogActions } from "./DialogActions";
import { useDonationForm } from "./useDonationForm";
import type { DonationDialogProps } from "./types";

export const DonationDialog = ({
  projectId,
  projectTitle,
  bankAccounts = [],
  children,
  sectorId,
}: DonationDialogProps) => {
  // Custom Hook for Form Management

  const {
    amount,
    email,
    paymentMethod,
    isProcessing,
    receiptFile,
    setAmount,
    setEmail,
    setPaymentMethod,
    handleSubmit,
    resetForm,
    handlePresetAmount,
    handleReceiptFileSelect,
  } = useDonationForm({ projectId, sectorId });

  // Local State for Dialog

  const [open, setOpen] = useState(false);

  // Event Handlers

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        resetForm();
      }
    },
    [resetForm]
  );

  const handleDonate = useCallback(async () => {
    const success = await handleSubmit();
    if (success) {
      setOpen(false);
    }
  }, [handleSubmit]);

  // Render

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button
            className="w-full bg-gradient-accent hover:opacity-90"
            size="lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Donate Now
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Support {projectTitle}</DialogTitle>
          <DialogDescription>
            Choose your preferred donation method and amount
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Amount Input Section */}
          <AmountInput
            amount={amount}
            onAmountChange={setAmount}
            onPresetSelect={handlePresetAmount}
          />

          {/* Payment Method Tabs */}
          <PaymentMethodTabs
            paymentMethod={paymentMethod}
            email={email}
            bankAccounts={bankAccounts}
            onPaymentMethodChange={setPaymentMethod}
            onEmailChange={setEmail}
            onReceiptFileSelect={handleReceiptFileSelect}
          />

          {/* Action Buttons */}
          <DialogActions
            isProcessing={isProcessing}
            paymentMethod={paymentMethod}
            onCancel={() => handleOpenChange(false)}
            onSubmit={handleDonate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
