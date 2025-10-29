"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { validateEmailWithError, validateAmount } from "@/lib/validations";
import { processDirectPayment, processBankTransfer } from "./services";
import type { PaymentMethod, DonationFormData } from "./types";

interface UseDonationFormProps {
  projectId: string;
  sectorId: string;
}

export const useDonationForm = ({
  projectId,
  sectorId,
}: UseDonationFormProps) => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("direct");
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = useCallback((): boolean => {
    // Validate amount
    const amountValidation = validateAmount(amount, { minAmount: 50 });
    if (!amountValidation.valid) {
      toast.error("Invalid amount", {
        description: amountValidation.error,
      });
      return false;
    }

    // Validate email for direct payment only
    if (paymentMethod === "direct") {
      const emailValidation = validateEmailWithError(email);
      if (!emailValidation.valid) {
        toast.error("Invalid email", {
          description: emailValidation.error,
        });
        return false;
      }
    }

    return true;
  }, [amount, email, paymentMethod]);

  /**
   * Handle donation submission
   */
  const handleSubmit = useCallback(async (): Promise<boolean> => {
    if (!validateForm()) return false;

    setIsProcessing(true);

    try {
      const donationData: DonationFormData = {
        amount: Number(amount),
        email: email.trim(),
        paymentMethod,
      };

      if (paymentMethod === "direct") {
        await processDirectPayment(donationData, projectId, sectorId);
      } else {
        await processBankTransfer(donationData, projectId);
        toast.success("Instructions sent!", {
          description: `Transfer ₱${donationData.amount.toLocaleString()} to one of the listed bank accounts`,
        });
      }

      return true;
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Something went wrong", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [amount, email, paymentMethod, projectId, sectorId, validateForm]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setAmount("");
    setEmail("");
    setPaymentMethod("direct");
    setIsProcessing(false);
  }, []);

  /**
   * Handle preset amount selection
   */
  const handlePresetAmount = useCallback((preset: number) => {
    setAmount(preset.toString());
  }, []);

  return {
    // State
    amount,
    email,
    paymentMethod,
    isProcessing,
    // Setters
    setAmount,
    setEmail,
    setPaymentMethod,
    // Actions
    handleSubmit,
    resetForm,
    handlePresetAmount,
  };
};
