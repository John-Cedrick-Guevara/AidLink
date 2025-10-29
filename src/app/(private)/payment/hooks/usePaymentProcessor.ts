import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PaymentMethod, UserInfo, CardDetails, PaymentStatus } from "../types";
import { PaymentService } from "../services/paymentService";
import { validateUserInfo, validateCardDetails } from "../utils/validation";

interface UsePaymentProcessorProps {
  clientKey: string | null;
  projectId: string | null;
}

export const usePaymentProcessor = ({
  clientKey,
  projectId,
}: UsePaymentProcessorProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );

  const resetError = useCallback(() => {
    setErrorMessage("");
    setStatus("ready");
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setStatus("success");
    toast.success("Payment successful!");
    setTimeout(() => {
      router.push(`/projects/${projectId}`);
    }, 2000);
  }, [router, projectId]);

  const handlePaymentRedirect = useCallback((redirectUrl: string) => {
    window.location.href = redirectUrl;
  }, []);

  const handlePaymentError = useCallback((error: unknown) => {
    console.error("Payment error:", error);
    const message = error instanceof Error ? error.message : "Payment failed";
    setStatus("error");
    setErrorMessage(message);
    toast.error(message);
  }, []);

  const processCardPayment = useCallback(
    async (userInfo: UserInfo, cardDetails: CardDetails) => {
      if (!clientKey) {
        toast.error("Invalid payment session");
        return;
      }

      // Validate user info
      const userValidationError = validateUserInfo(userInfo, false);
      if (userValidationError) {
        toast.error(userValidationError);
        return;
      }

      // Validate card details
      const cardValidationError = validateCardDetails(cardDetails);
      if (cardValidationError) {
        toast.error(cardValidationError);
        return;
      }

      setStatus("processing");

      try {
        // Create payment method
        const { paymentMethodId } =
          await PaymentService.createCardPaymentMethod(cardDetails, userInfo);

        // Attach payment method to intent
        const result = await PaymentService.attachPaymentMethod(
          clientKey,
          paymentMethodId,
          `${window.location.origin}/payment/success?project_id=${projectId}`
        );

        // Handle result
        if (result.status === "succeeded") {
          handlePaymentSuccess();
        } else if (result.next_action?.redirect?.url) {
          // 3D Secure authentication required
          handlePaymentRedirect(result.next_action.redirect.url);
        } else {
          throw new Error("Unexpected payment status");
        }
      } catch (error) {
        handlePaymentError(error);
      }
    },
    [
      clientKey,
      projectId,
      handlePaymentSuccess,
      handlePaymentRedirect,
      handlePaymentError,
    ]
  );

  const processEWalletPayment = useCallback(
    async (type: "gcash" | "paymaya", userInfo: UserInfo) => {
      if (!clientKey) {
        toast.error("Invalid payment session");
        return;
      }

      // Validate user info (phone required for e-wallets)
      const validationError = validateUserInfo(userInfo, true);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      setStatus("processing");

      try {
        // Create payment method
        const { paymentMethodId } =
          await PaymentService.createEWalletPaymentMethod(type, userInfo);

        // Attach payment method to intent
        const result = await PaymentService.attachPaymentMethod(
          clientKey,
          paymentMethodId,
          `${window.location.origin}/payment/success?project_id=${projectId}`
        );

        // E-wallets always require redirect
        if (result.next_action?.redirect?.url) {
          handlePaymentRedirect(result.next_action.redirect.url);
        } else {
          throw new Error("No redirect URL received");
        }
      } catch (error) {
        handlePaymentError(error);
      }
    },
    [clientKey, projectId, handlePaymentRedirect, handlePaymentError]
  );

  return {
    status,
    setStatus,
    errorMessage,
    selectedMethod,
    setSelectedMethod,
    resetError,
    processCardPayment,
    processEWalletPayment,
  };
};
