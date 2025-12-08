"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building2 } from "lucide-react";
import { EmailInput } from "./EmailInput";
import { BankAccountList } from "./BankAccountList";
import type { PaymentMethod, BankAccount } from "./types";
import { decrypt } from "@/lib/crypto";
import { BankAccount as DecryptedBankAccount } from "@/app/(private)/proposal-form/types";

interface PaymentMethodTabsProps {
  paymentMethod: PaymentMethod;
  email: string;
  bankAccounts: BankAccount[];
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onEmailChange: (email: string) => void;
  onReceiptFileSelect?: (file: File | null) => void;
}

export const PaymentMethodTabs = ({
  paymentMethod,
  email,
  bankAccounts,
  onPaymentMethodChange,
  onEmailChange,
  onReceiptFileSelect,
}: PaymentMethodTabsProps) => {
  // Decrypt bank accounts for display
  const decryptedBankAccounts = useMemo<DecryptedBankAccount[]>(() => {
    return bankAccounts.map((account) => ({
      id: account.id,
      account_name: decrypt(account.account_name),
      account_number: decrypt(account.account_number),
      bank_name: decrypt(account.bank_name),
    }));
  }, [bankAccounts]);

  return (
    <Tabs
      value={paymentMethod}
      onValueChange={(value) => onPaymentMethodChange(value as PaymentMethod)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 h-11">
        <TabsTrigger value="direct" className="gap-2">
          <CreditCard className="w-4 h-4" />
          <span className="hidden sm:inline">Direct Payment</span>
          <span className="sm:hidden">Direct</span>
        </TabsTrigger>
        <TabsTrigger value="manual" className="gap-2">
          <Building2 className="w-4 h-4" />
          <span className="hidden sm:inline">Bank Transfer</span>
          <span className="sm:hidden">Bank</span>
        </TabsTrigger>
      </TabsList>

      {/* Direct Payment Tab */}
      <TabsContent value="direct" className="space-y-4 mt-4">
        <EmailInput email={email} onEmailChange={onEmailChange} />
      </TabsContent>

      {/* Bank Transfer Tab */}
      <TabsContent value="manual" className="space-y-4 mt-4">
        <BankAccountList
          bankAccounts={decryptedBankAccounts}
          onFileSelect={onReceiptFileSelect}
        />
      </TabsContent>
    </Tabs>
  );
};
