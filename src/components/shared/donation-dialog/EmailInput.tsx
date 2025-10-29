"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

interface EmailInputProps {
  email: string;
  onEmailChange: (email: string) => void;
}

export const EmailInput = ({ email, onEmailChange }: EmailInputProps) => {
  return (
    <div className="space-y-4">
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
              onChange={(e) => onEmailChange(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </div>

      <Card className="p-3 bg-linear-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex gap-2">
          <div className="text-lg">🔒</div>
          <p className="text-xs text-muted-foreground">
            Your payment is secured with end-to-end encryption. We never store
            your payment information.
          </p>
        </div>
      </Card>
    </div>
  );
};
