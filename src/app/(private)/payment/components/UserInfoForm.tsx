import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserInfo, PaymentMethod } from "../types";

interface UserInfoFormProps {
  userInfo: UserInfo;
  onUpdate: (field: keyof UserInfo, value: string) => void;
  disabled?: boolean;
  selectedMethod: PaymentMethod | null;
}

export const UserInfoForm = ({
  userInfo,
  onUpdate,
  disabled = false,
  selectedMethod,
}: UserInfoFormProps) => {
  const isPhoneRequired = selectedMethod && selectedMethod !== "card";

  return (
    <div className="space-y-4 mb-6">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="Juan Dela Cruz"
          value={userInfo.name}
          onChange={(e) => onUpdate("name", e.target.value)}
          disabled={disabled}
          autoComplete="name"
        />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="juan@example.com"
          value={userInfo.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          disabled={disabled}
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number {isPhoneRequired && "*"}</Label>
        <Input
          id="phone"
          placeholder="09123456789"
          value={userInfo.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          disabled={disabled}
          autoComplete="tel"
          maxLength={15}
        />
        {isPhoneRequired && (
          <p className="text-xs text-muted-foreground mt-1">
            Required for GCash and PayMaya payments
          </p>
        )}
      </div>
    </div>
  );
};
