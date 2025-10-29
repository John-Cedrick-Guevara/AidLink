import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDetails } from "../types";

interface CardDetailsFormProps {
  cardDetails: CardDetails;
  onUpdate: (field: keyof CardDetails, value: string) => void;
  disabled?: boolean;
}

export const CardDetailsForm = ({
  cardDetails,
  onUpdate,
  disabled = false,
}: CardDetailsFormProps) => {
  return (
    <div className="space-y-4 mb-6 p-4 border rounded-lg bg-muted/30">
      <h3 className="font-semibold text-sm">Card Details</h3>

      <div>
        <Label htmlFor="cardNumber">Card Number *</Label>
        <Input
          id="cardNumber"
          placeholder="4343 4343 4343 4345"
          value={cardDetails.cardNumber}
          onChange={(e) => onUpdate("cardNumber", e.target.value)}
          maxLength={19}
          disabled={disabled}
          autoComplete="cc-number"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Test card: 4343 4343 4343 4345
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor="expMonth">Month *</Label>
          <Input
            id="expMonth"
            placeholder="12"
            value={cardDetails.expMonth}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 2) {
                onUpdate("expMonth", value);
              }
            }}
            maxLength={2}
            disabled={disabled}
            autoComplete="cc-exp-month"
          />
        </div>

        <div>
          <Label htmlFor="expYear">Year *</Label>
          <Input
            id="expYear"
            placeholder="25"
            value={cardDetails.expYear}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 2) {
                onUpdate("expYear", value);
              }
            }}
            maxLength={2}
            disabled={disabled}
            autoComplete="cc-exp-year"
          />
        </div>

        <div>
          <Label htmlFor="cvc">CVC *</Label>
          <Input
            id="cvc"
            placeholder="123"
            value={cardDetails.cvc}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 4) {
                onUpdate("cvc", value);
              }
            }}
            maxLength={4}
            disabled={disabled}
            autoComplete="cc-csc"
          />
        </div>
      </div>
    </div>
  );
};
