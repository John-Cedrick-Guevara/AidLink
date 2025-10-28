import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Building2 } from "lucide-react";
import type { FormStepProps } from "../../types";

const Step3Funding = ({
  formData,
  onFormChange,
  onAddBankAccount,
  onRemoveBankAccount,
}: FormStepProps) => {
  const [newAccount, setNewAccount] = useState({
    account_name: "",
    account_number: "",
    bank_name: "",
  });

  const handleAddAccount = () => {
    if (
      !newAccount.account_name ||
      !newAccount.account_number ||
      !newAccount.bank_name
    ) {
      return;
    }

    onAddBankAccount?.(newAccount);
    setNewAccount({
      account_name: "",
      account_number: "",
      bank_name: "",
    });
  };

  const handleRemoveAccount = (id: string) => {
    onRemoveBankAccount?.(id);
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Funding Details</h2>
        <p className="text-muted-foreground">
          Budget requirements and bank account information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="target_funds">
            Target Funds (₱) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="target_funds"
            name="target_funds"
            type="number"
            value={formData.target_funds}
            onChange={onFormChange}
            placeholder="50000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target_start_date">
            Target Start Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="target_start_date"
            name="target_start_date"
            type="date"
            value={formData.target_start_date}
            onChange={onFormChange}
          />
        </div>
      </div>

      {/* Bank Accounts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Bank Accounts</h3>
            <p className="text-sm text-muted-foreground">
              Add one or more bank accounts for receiving donations
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {formData.bank_accounts.length} account(s) added
          </div>
        </div>

        {/* Existing Bank Accounts List */}
        {formData.bank_accounts.length > 0 && (
          <div className="space-y-3">
            {formData.bank_accounts.map((account) => (
              <Card
                key={account.id}
                className="p-4 bg-muted/30 border border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{account.bank_name}</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">
                        Account Name:{" "}
                        <span className="text-foreground">
                          {account.account_name}
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        Account Number:{" "}
                        <span className="text-foreground font-mono">
                          {account.account_number}
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAccount(account.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add New Bank Account Form */}
        <Card className="p-4 bg-muted/20 border-2 border-dashed border-border">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-muted-foreground" />
              <h4 className="font-semibold">Add New Bank Account</h4>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new_account_name">
                Account Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="new_account_name"
                value={newAccount.account_name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, account_name: e.target.value })
                }
                placeholder="Juan Dela Cruz"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new_bank_name">
                  Bank Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="new_bank_name"
                  value={newAccount.bank_name}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, bank_name: e.target.value })
                  }
                  placeholder="BDO, BPI, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_account_number">
                  Account Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="new_account_number"
                  value={newAccount.account_number}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      account_number: e.target.value,
                    })
                  }
                  placeholder="0000-1111-2222"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={handleAddAccount}
              disabled={
                !newAccount.account_name ||
                !newAccount.account_number ||
                !newAccount.bank_name
              }
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Bank Account
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Step3Funding;
