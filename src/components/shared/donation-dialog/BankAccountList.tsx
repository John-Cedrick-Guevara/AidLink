"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import type { BankAccount } from "./types";

interface BankAccountListProps {
  bankAccounts: BankAccount[];
}

export const BankAccountList = ({ bankAccounts }: BankAccountListProps) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopyAccount = useCallback((accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);

    toast.success("Account number copied!", {
      description: "Paste it in your banking app",
    });

    setTimeout(() => setCopiedAccount(null), 2000);
  }, []);

  if (bankAccounts.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No bank accounts available for this project yet.
        </p>
      </Card>
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Transfer your donation to one of these verified bank accounts:
      </p>

      <div className="space-y-3">
        {bankAccounts.map((account) => (
          <Card
            key={account.id}
            className="p-4 hover:shadow-md transition-all hover:border-primary/50"
          >
            <div className="space-y-3">
              {/* Bank Name Header */}
              <div className="flex items-center gap-2 pb-2 border-b">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-base">{account.bank_name}</h4>
              </div>

              {/* Account Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">
                    Account Name:
                  </span>
                  <span className="font-medium text-right">
                    {account.account_name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">
                    Account Number:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">
                      {account.account_number}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 hover:bg-primary/10"
                      onClick={() => handleCopyAccount(account.account_number)}
                      aria-label={`Copy ${account.bank_name} account number`}
                    >
                      {copiedAccount === account.account_number ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Instructions Card */}
      <Card className="p-4 bg-warning/5 border-warning/30">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">📌</span>
            <h5 className="font-semibold text-sm">Important Instructions</h5>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 ml-7">
            <li>• Transfer the exact amount to one of the listed accounts</li>
            <li>• Take a clear photo or screenshot of the receipt</li>
            <li>
              • Send the proof of payment to the project team for verification
            </li>
            <li>
              • Your donation will be credited within 24-48 hours after
              verification
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};
