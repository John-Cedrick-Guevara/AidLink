import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentStatus } from "../types";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "Loading payment processor...",
}: LoadingStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">{message}</p>
      </Card>
    </div>
  );
};

interface ErrorStateProps {
  errorMessage: string;
  onReturnToProject: () => void;
}

export const ErrorState = ({
  errorMessage,
  onReturnToProject,
}: ErrorStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 text-center max-w-md">
        <XCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
        <h2 className="text-xl font-semibold mb-2">Payment Error</h2>
        <p className="text-muted-foreground mb-4">{errorMessage}</p>
        <Button onClick={onReturnToProject}>Return to Project</Button>
      </Card>
    </div>
  );
};

interface SuccessStateProps {
  amount: string;
}

export const SuccessState = ({ amount }: SuccessStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 text-center max-w-md">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-600" />
        <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground mb-4">
          Thank you for your donation of ₱{amount}
        </p>
        <p className="text-sm text-muted-foreground">
          Redirecting to project page...
        </p>
      </Card>
    </div>
  );
};
