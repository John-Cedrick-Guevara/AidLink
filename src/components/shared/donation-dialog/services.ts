/**
 * Payment processing services for donations
 */

import { DonationFormData } from "./types";

/**
 * Process a direct payment through PayMongo
 */
export const processDirectPayment = async (
  data: DonationFormData,
  projectId: string,
  sectorId: string
): Promise<void> => {
  const response = await fetch("/api/payments/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      projectId,
      amount: data.amount,
      email: data.email,
      description: `Donation to project ${projectId}`,
      sectorId: sectorId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Payment failed");
  }

  const responseData = await response.json();

  if (!responseData.success || !responseData.clientKey) {
    throw new Error("Invalid payment response");
  }

  // Redirect to payment page with client key and user info
  const paymentUrl = new URL("/payment", window.location.origin);
  paymentUrl.searchParams.set("client_key", responseData.clientKey);
  paymentUrl.searchParams.set("amount", data.amount.toString());
  paymentUrl.searchParams.set("project_id", projectId);
  paymentUrl.searchParams.set("email", data.email);

  window.location.href = paymentUrl.toString();
};

/**
 * Process a bank transfer donation
 */
export const processBankTransfer = async (
  data: DonationFormData,
  projectId: string
): Promise<void> => {
  // TODO: Create pending donation record in database
  // Example implementation:
  // await fetch("/api/donations/create-pending", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     projectId,
  //     amount: data.amount,
  //     method: "bank_transfer",
  //   }),
  // });

  // For now, just return successfully
  return Promise.resolve();
};
