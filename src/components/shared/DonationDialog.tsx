"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Heart,
  CreditCard,
  Building2,
  Copy,
  Check,
  Mail,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// ============================================================================
// Types & Interfaces
// ============================================================================

interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

interface DonationDialogProps {
  projectId: string;
  projectTitle: string;
  bankAccounts?: BankAccount[];
  children?: React.ReactNode;
  sectorId: string;
}

type PaymentMethod = "direct" | "manual";

interface DonationFormData {
  amount: number;
  email: string;
  paymentMethod: PaymentMethod;
}

// ============================================================================
// Constants
// ============================================================================

const PRESET_AMOUNTS = [500, 1000, 2500, 5000] as const;
const MIN_DONATION_AMOUNT = 50;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ============================================================================
// Validation Utilities
// ============================================================================

const validateEmail = (email: string): boolean => EMAIL_REGEX.test(email);

const validateAmount = (amount: string): { valid: boolean; error?: string } => {
  const numAmount = Number(amount);

  if (!amount || isNaN(numAmount)) {
    return { valid: false, error: "Please enter a valid donation amount" };
  }

  if (numAmount <= 0) {
    return { valid: false, error: "Donation amount must be greater than ₱0" };
  }

  if (numAmount < MIN_DONATION_AMOUNT) {
    return {
      valid: false,
      error: `Minimum donation is ₱${MIN_DONATION_AMOUNT}`,
    };
  }

  return { valid: true };
};

// ============================================================================
// Main Component
// ============================================================================

export default function DonationDialog({
  projectId,
  projectTitle,
  bankAccounts = [],
  children,
  sectorId,
}: DonationDialogProps) {
  // ============================================================================
  // State Management
  // ============================================================================

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("direct");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // ============================================================================
  // Event Handlers
  // ============================================================================

  /**
   * Handle copying bank account number to clipboard
   */
  const handleCopyAccount = useCallback((accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);

    toast.success("Account number copied!", {
      description: "Paste it in your banking app",
    });

    setTimeout(() => setCopiedAccount(null), 2000);
  }, []);

  /**
   * Handle preset amount selection
   */
  const handlePresetAmount = useCallback((preset: number) => {
    setAmount(preset.toString());
  }, []);

  /**
   * Validate form based on payment method
   */
  const validateForm = useCallback((): boolean => {
    // Validate amount
    const amountValidation = validateAmount(amount);
    if (!amountValidation.valid) {
      toast.error("Invalid amount", {
        description: amountValidation.error,
      });
      return false;
    }

    // Validate email for direct payment only
    if (paymentMethod === "direct") {
      if (!email.trim()) {
        toast.error("Email required", {
          description: "Please enter your email address",
        });
        return false;
      }

      if (!validateEmail(email)) {
        toast.error("Invalid email", {
          description: "Please enter a valid email address",
        });
        return false;
      }
    }

    return true;
  }, [amount, email, paymentMethod]);

  /**
   * Process direct payment
   */
  const processDirectPayment = useCallback(
    async (data: DonationFormData) => {
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
      paymentUrl.searchParams.set("email", data.email); // Pass email to payment page

      window.location.href = paymentUrl.toString();
    },
    [projectId]
  );

  /**
   * Process bank transfer
   */
  const processBankTransfer = useCallback(
    async (data: DonationFormData) => {
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

      toast.success("Instructions sent!", {
        description: `Transfer ₱${data.amount.toLocaleString()} to one of the listed bank accounts`,
      });
    },
    [projectId]
  );

  /**
   * Handle donation submission
   */
  const handleDonate = useCallback(async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const donationData: DonationFormData = {
        amount: Number(amount),
        email: email.trim(),
        paymentMethod,
      };

      if (paymentMethod === "direct") {
        await processDirectPayment(donationData);
      } else {
        await processBankTransfer(donationData);
      }

      // Reset form and close dialog
      setAmount("");
      setEmail("");
      setOpen(false);
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Something went wrong", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [
    amount,
    email,
    paymentMethod,
    validateForm,
    processDirectPayment,
    processBankTransfer,
  ]);

  /**
   * Reset form on dialog close
   */
  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      // Reset form when closing
      setAmount("");
      setEmail("");
      setCopiedAccount(null);
    }
  }, []);

  // ============================================================================
  // Computed Values
  // ============================================================================

  const hasBankAccounts = bankAccounts.length > 0;
  const formattedAmount = amount ? `₱${Number(amount).toLocaleString()}` : "";

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button
            className="w-full bg-gradient-accent hover:opacity-90"
            size="lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Donate Now
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Support {projectTitle}</DialogTitle>
          <DialogDescription>
            Choose your preferred donation method and amount
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Amount Input Section */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base font-semibold">
              Donation Amount (₱)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg h-12"
              min="50"
            />

            {/* Preset Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {PRESET_AMOUNTS.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetAmount(preset)}
                  className="text-xs hover:bg-primary/10 hover:text-primary hover:border-primary"
                >
                  ₱{preset.toLocaleString()}
                </Button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground pt-1">
              Minimum donation: ₱50
            </p>
          </div>

          {/* Payment Method Tabs */}
          <Tabs
            value={paymentMethod}
            onValueChange={(value) =>
              setPaymentMethod(value as "direct" | "manual")
            }
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
              <p className="text-sm text-muted-foreground">
                Enter your email to receive payment instructions:
              </p>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
              </div>

              <Card className="p-3 bg-linear-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="flex gap-2">
                  <div className="text-lg">🔒</div>
                  <p className="text-xs text-muted-foreground">
                    Your payment is secured with end-to-end encryption. We never
                    store your payment information.
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Bank Transfer Tab */}
            <TabsContent value="manual" className="space-y-4 mt-4">
              {hasBankAccounts ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Transfer your donation to one of these verified bank
                    accounts:
                  </p>

                  <div className="space-y-3">
                    {bankAccounts.map((account: BankAccount) => (
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
                            <h4 className="font-semibold text-base">
                              {account.bank_name}
                            </h4>
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
                                  onClick={() =>
                                    handleCopyAccount(account.account_number)
                                  }
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
                        <h5 className="font-semibold text-sm">
                          Important Instructions
                        </h5>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-7">
                        <li>
                          • Transfer the exact amount to one of the listed
                          accounts
                        </li>
                        <li>
                          • Take a clear photo or screenshot of the receipt
                        </li>
                        <li>
                          • Send the proof of payment to the project team for
                          verification
                        </li>
                        <li>
                          • Your donation will be credited within 24-48 hours
                          after verification
                        </li>
                      </ul>
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No bank accounts available for this project yet.
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="flex-1"
              type="button"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDonate}
              className="flex-1 bg-gradient-primary hover:opacity-90"
              type="button"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : paymentMethod === "direct" ? (
                "Proceed to Payment"
              ) : (
                "Confirm Donation"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
