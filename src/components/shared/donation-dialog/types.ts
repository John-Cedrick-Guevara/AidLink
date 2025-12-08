import { BankAccount } from "@/types";

export type { BankAccount };

export type PaymentMethod = "direct" | "manual";

export interface DonationFormData {
  amount: number;
  email: string;
  paymentMethod: PaymentMethod;
}

export interface DonationDialogProps {
  projectId: string;
  projectTitle: string;
  bankAccounts?: BankAccount[];
  children?: React.ReactNode;
  sectorId: string;
}
