/**
 * Badge Utility Functions
 * Provides consistent badge styling across the application
 */

import { type VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

// Status types for projects
export type ProjectStatus = "pending" | "approved" | "rejected" | "completed";

// Payment/Receipt status types
export type ReceiptStatus = "pending" | "approved" | "rejected";

// Payment status types
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

// User status types
export type UserStatus = "normal" | "restricted";

/**
 * Get badge variant for project status
 */
export function getProjectStatusBadgeVariant(
  status: ProjectStatus
): VariantProps<typeof badgeVariants>["variant"] {
  const statusMap: Record<
    ProjectStatus,
    VariantProps<typeof badgeVariants>["variant"]
  > = {
    pending: "warning",
    approved: "success",
    rejected: "destructive",
    completed: "info",
  };

  return statusMap[status] || "default";
}

/**
 * Get badge variant for receipt/funding status
 */
export function getReceiptStatusBadgeVariant(
  status: ReceiptStatus
): VariantProps<typeof badgeVariants>["variant"] {
  const statusMap: Record<
    ReceiptStatus,
    VariantProps<typeof badgeVariants>["variant"]
  > = {
    pending: "warning",
    approved: "success",
    rejected: "destructive",
  };

  return statusMap[status] || "default";
}

/**
 * Get badge variant for payment status
 */
export function getPaymentStatusBadgeVariant(
  status: PaymentStatus
): VariantProps<typeof badgeVariants>["variant"] {
  const statusMap: Record<
    PaymentStatus,
    VariantProps<typeof badgeVariants>["variant"]
  > = {
    pending: "warning",
    paid: "success",
    failed: "destructive",
    refunded: "info",
  };

  return statusMap[status] || "default";
}

/**
 * Get badge variant for user status
 */
export function getUserStatusBadgeVariant(
  status: UserStatus
): VariantProps<typeof badgeVariants>["variant"] {
  const statusMap: Record<
    UserStatus,
    VariantProps<typeof badgeVariants>["variant"]
  > = {
    normal: "success",
    restricted: "destructive",
  };

  return statusMap[status] || "default";
}

/**
 * Capitalize first letter of a string
 */
export function capitalizeStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
