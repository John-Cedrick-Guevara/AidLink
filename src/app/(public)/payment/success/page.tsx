"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  const projectId = searchParams.get("project_id");
  const paymentIntentId = searchParams.get("payment_intent_id");

  useEffect(() => {
    // Verify payment status
    const verifyPayment = async () => {
      if (!paymentIntentId) {
        setStatus("error");
        return;
      }

      try {
        // TODO: Call your backend to verify the payment
        // const response = await fetch(`/api/payments/verify?intent=${paymentIntentId}`);
        // const data = await response.json();

        // For now, assume success
        setTimeout(() => {
          setStatus("success");
        }, 2000);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [paymentIntentId]);

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Verifying Payment...</h2>
          <p className="text-muted-foreground">
            Please wait while we confirm your donation
          </p>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <XCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
          <h2 className="text-xl font-semibold mb-2">
            Payment Verification Failed
          </h2>
          <p className="text-muted-foreground mb-6">
            We couldn't verify your payment. Please contact support if you were
            charged.
          </p>
          <Button onClick={() => router.push(`/projects/${projectId}`)}>
            Return to Project
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Thank You! 🎉</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Your donation has been received successfully
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-muted-foreground mb-2">
            A confirmation email has been sent to your inbox.
          </p>
          <p className="text-sm text-muted-foreground">
            Your generosity makes a real difference. Thank you for supporting
            this project!
          </p>
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => router.push(`/projects/${projectId}`)}
            className="w-full"
          >
            View Project
          </Button>
          <Button
            onClick={() => router.push("/projects")}
            variant="outline"
            className="w-full"
          >
            Browse More Projects
          </Button>
        </div>
      </Card>
    </div>
  );
}
