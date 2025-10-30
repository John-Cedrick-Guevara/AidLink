/**
 * StatusBadge Component
 * A reusable badge component for displaying various status types with consistent styling
 */

import { Badge } from "@/components/ui/badge";
import {
  getProjectStatusBadgeVariant,
  getReceiptStatusBadgeVariant,
  getPaymentStatusBadgeVariant,
  getUserStatusBadgeVariant,
  capitalizeStatus,
  type ProjectStatus,
  type ReceiptStatus,
  type PaymentStatus,
  type UserStatus,
} from "@/lib/badge-utils";

type StatusBadgeProps =
  | {
      type: "project";
      status: ProjectStatus;
      className?: string;
    }
  | {
      type: "receipt";
      status: ReceiptStatus;
      className?: string;
    }
  | {
      type: "payment";
      status: PaymentStatus;
      className?: string;
    }
  | {
      type: "user";
      status: UserStatus;
      className?: string;
    };

export function StatusBadge({ type, status, className }: StatusBadgeProps) {
  const getVariant = () => {
    switch (type) {
      case "project":
        return getProjectStatusBadgeVariant(status as ProjectStatus);
      case "receipt":
        return getReceiptStatusBadgeVariant(status as ReceiptStatus);
      case "payment":
        return getPaymentStatusBadgeVariant(status as PaymentStatus);
      case "user":
        return getUserStatusBadgeVariant(status as UserStatus);
      default:
        return "default";
    }
  };

  return (
    <Badge variant={getVariant()} className={className}>
      {capitalizeStatus(status)}
    </Badge>
  );
}
