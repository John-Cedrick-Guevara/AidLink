"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { validateEmailWithError, validateAmount } from "@/lib/validations";
import { processDirectPayment } from "./services";
import type { PaymentMethod, DonationFormData } from "./types";
import { uploadReceipt } from "./server/RecieptUploadAction";

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
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

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

        console.log(receiptFile)
        // Validate receipt file exists
        if (!receiptFile) {
          toast.error("Receipt required", {
            description: "Please upload a receipt for bank transfer",
          });
          return false;
        }

        // Create FormData to pass file to server action
        const formData = new FormData();
        formData.append("file", receiptFile);
        formData.append("amount", donationData.amount.toString());
        formData.append("projectId", projectId);
        formData.append("sectorId", sectorId);

        const uploadResult = await uploadReceipt(formData);
        if (!uploadResult.success) {
          toast.error("Receipt upload failed", {
            description: uploadResult.message,
          });
          return false;
        }

        toast.success("Donation submitted!", {
          description: `Your donation of ₱${donationData.amount.toLocaleString()} is pending verification`,
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
  }, [amount, email, paymentMethod, projectId, sectorId, receiptFile, validateForm]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setAmount("");
    setEmail("");
    setPaymentMethod("direct");
    setIsProcessing(false);
    setReceiptFile(null);
  }, []);

  /**
   * Handle preset amount selection
   */
  const handlePresetAmount = useCallback((preset: number) => {
    setAmount(preset.toString());
  }, []);

  /**
   * Handle receipt file selection
   */
  const handleReceiptFileSelect = useCallback((file: File | null) => {
    console.log(file)
    setReceiptFile(file);
  }, []);

  return {
    // State
    amount,
    email,
    paymentMethod,
    isProcessing,
    receiptFile,
    // Setters
    setAmount,
    setEmail,
    setPaymentMethod,
    // Actions
    handleSubmit,
    resetForm,
    handlePresetAmount,
    handleReceiptFileSelect,
  };
};
