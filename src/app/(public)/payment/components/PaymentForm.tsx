import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserInfoForm } from "./UserInfoForm";
import { CardDetailsForm } from "./CardDetailsForm";
import { ProjectBankInfo } from "./ProjectBankInfo";
import { PaymentMethodButtons } from "./PaymentMethodButtons";
import { UserInfo, CardDetails, PaymentMethod, PaymentStatus } from "../types";
import { Project } from "@/types";

interface PaymentFormProps {
  amount: string;
  project: Project | null;
  userInfo: UserInfo;
  cardDetails: CardDetails;
  selectedMethod: PaymentMethod | null;
  status: PaymentStatus;
  onUpdateUserInfo: (field: keyof UserInfo, value: string) => void;
  onUpdateCardDetails: (field: keyof CardDetails, value: string) => void;
  onSelectCard: () => void;
  onSelectGCash: () => void;
  onSelectPayMaya: () => void;
  onCancel: () => void;
}

export const PaymentForm = ({
  amount,
  project,
  userInfo,
  cardDetails,
  selectedMethod,
  status,
  onUpdateUserInfo,
  onUpdateCardDetails,
  onSelectCard,
  onSelectGCash,
  onSelectPayMaya,
  onCancel,
}: PaymentFormProps) => {
  const isProcessing = status === "processing";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2">Complete Your Donation</h1>
        <p className="text-muted-foreground mb-6">
          Amount: <span className="font-semibold">₱{amount}</span>
        </p>

        {/* Display project bank account info if available */}
        {project && <ProjectBankInfo project={project} />}

        {/* User Information Form */}
        <UserInfoForm
          userInfo={userInfo}
          onUpdate={onUpdateUserInfo}
          disabled={isProcessing}
          selectedMethod={selectedMethod}
        />

        {/* Card Details (only show when card is selected) */}
        {selectedMethod === "card" && (
          <CardDetailsForm
            cardDetails={cardDetails}
            onUpdate={onUpdateCardDetails}
            disabled={isProcessing}
          />
        )}

        {/* Payment Method Selection */}
        <PaymentMethodButtons
          selectedMethod={selectedMethod}
          status={status}
          onCardClick={onSelectCard}
          onGCashClick={onSelectGCash}
          onPayMayaClick={onSelectPayMaya}
        />

        <Button
          onClick={onCancel}
          variant="ghost"
          className="w-full mt-4"
          disabled={isProcessing}
          type="button"
        >
          Cancel
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-6">
          🔒 Secure payment powered by PayMongo
        </p>
      </Card>
    </div>
  );
};
