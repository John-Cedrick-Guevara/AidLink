"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FundingReceipt } from "@/data/dummyData";

interface ReceiptDialogProps {
  receipt: FundingReceipt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-warning/10 text-warning";
    case "approved":
      return "bg-success/10 text-success";
    case "rejected":
      return "bg-destructive/10 text-destructive";
    default:
      return "";
  }
};

const ReceiptDialog = ({ receipt, open, onOpenChange }: ReceiptDialogProps) => {
  if (!receipt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Funding Receipt Details</DialogTitle>
          <DialogDescription>
            View your submitted funding receipt information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground text-sm">Project</Label>
              <p className="font-medium">{receipt.project_title}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Amount</Label>
              <p className="font-semibold text-lg">
                ₱{receipt.amount.toLocaleString()}
              </p>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">
                Donor Name
              </Label>
              <p className="font-medium">{receipt.donor_name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">
                Donor Email
              </Label>
              <p className="font-medium">{receipt.donor_email}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Status</Label>
              <Badge className={getStatusBadgeClass(receipt.status)}>
                {receipt.status.charAt(0).toUpperCase() +
                  receipt.status.slice(1)}
              </Badge>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">
                Submitted Date
              </Label>
              <p className="font-medium">
                {new Date(receipt.submitted_at).toLocaleDateString()}
              </p>
            </div>
            {receipt.reviewed_at && (
              <div>
                <Label className="text-muted-foreground text-sm">
                  Reviewed Date
                </Label>
                <p className="font-medium">
                  {new Date(receipt.reviewed_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">
              Receipt Document
            </Label>
            <div className="mt-2 p-4 border border-border rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Receipt: {receipt.receipt_url}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your submitted receipt document
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
