"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PRESET_AMOUNTS, MIN_DONATION_AMOUNT } from "./constants";

interface AmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  onPresetSelect: (amount: number) => void;
}

export const AmountInput = ({
  amount,
  onAmountChange,
  onPresetSelect,
}: AmountInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="amount" className="text-base font-semibold">
        Donation Amount (₱)
      </Label>
      <Input
        id="amount"
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        className="text-lg h-12"
        min={MIN_DONATION_AMOUNT.toString()}
      />

      {/* Preset Amount Buttons */}
      <div className="grid grid-cols-4 gap-2 pt-2">
        {PRESET_AMOUNTS.map((preset) => (
          <Button
            key={preset}
            variant="outline"
            size="sm"
            onClick={() => onPresetSelect(preset)}
            className="text-xs hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            ₱{preset.toLocaleString()}
          </Button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground pt-1">
        Minimum donation: ₱{MIN_DONATION_AMOUNT}
      </p>
    </div>
  );
};
