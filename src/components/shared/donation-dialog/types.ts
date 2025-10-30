/**
 * Type definitions for Donation Dialog
 */

export interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}



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
