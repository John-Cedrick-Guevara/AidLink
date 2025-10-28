"use client";

/**
 * PayMongo Payment Page
 *
 * PAYMENT FLOW:
 * 1. User fills in their billing details (name, email, phone)
 * 2. For CARD: User enters card number, expiry, CVC
 * 3. For GCASH/PAYMAYA: User is redirected to their app to authorize
 * 4. Payment is sent to the project's bank account (from project.bank_details)
 * 5. The receiving account is configured in PayMongo Dashboard, not in code
 *
 * ARCHITECTURE:
 * - Modular components for each UI section
 * - Custom hooks for business logic separation
 * - Service layer for API calls
 * - Validation utilities for form validation
 */

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LoadingState,
  ErrorState,
  SuccessState,
  PaymentForm,
} from "./components";
import { usePaymentProcessor, usePaymentForm, useProjectData } from "./hooks";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract URL parameters
  const clientKey = searchParams.get("client_key");
  const amount = searchParams.get("amount");
  const projectId = searchParams.get("project_id");

  // Custom hooks for state management
  const { project } = useProjectData(projectId);

  const {
    status,
    setStatus,
    errorMessage,
    selectedMethod,
    setSelectedMethod,
    processCardPayment,
    processEWalletPayment,
  } = usePaymentProcessor({ clientKey, projectId });

  const { userInfo, cardDetails, updateUserInfo, updateCardDetails } =
    usePaymentForm();

  // Initialize payment page
  useEffect(() => {
    if (!clientKey) {
      setStatus("error");
      return;
    }
    setStatus("ready");
  }, [clientKey, setStatus]);

  // Event handlers
  const handleCardPayment = () => {
    if (selectedMethod === "card") {
      processCardPayment(userInfo, cardDetails);
    } else {
      setSelectedMethod("card");
    }
  };

  const handleGCashPayment = () => {
    setSelectedMethod("gcash");
    processEWalletPayment("gcash", userInfo);
  };

  const handlePayMayaPayment = () => {
    setSelectedMethod("paymaya");
    processEWalletPayment("paymaya", userInfo);
  };

  const handleCancel = () => {
    router.push(`/projects/${projectId}`);
  };

  // Render different states
  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "error") {
    return (
      <ErrorState
        errorMessage={errorMessage || "Invalid payment session"}
        onReturnToProject={handleCancel}
      />
    );
  }

  if (status === "success") {
    return <SuccessState amount={amount || "0"} />;
  }

  // Main payment form
  return (
    <PaymentForm
      amount={amount || "0"}
      project={project}
      userInfo={userInfo}
      cardDetails={cardDetails}
      selectedMethod={selectedMethod}
      status={status}
      onUpdateUserInfo={updateUserInfo}
      onUpdateCardDetails={updateCardDetails}
      onSelectCard={handleCardPayment}
      onSelectGCash={handleGCashPayment}
      onSelectPayMaya={handlePayMayaPayment}
      onCancel={handleCancel}
    />
  );
}
