"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import type { FundingReceipt } from "@/data/dummyData";

interface AdminReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receipt: FundingReceipt | null;
  onApprove: (receiptId: string, donorName: string) => void;
  onReject: (receiptId: string, donorName: string) => void;
}

const AdminReceiptDialog = ({
  open,
  onOpenChange,
  receipt,
  onApprove,
  onReject,
}: AdminReceiptDialogProps) => {
  if (!receipt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Funding Receipt Details</DialogTitle>
          <DialogDescription>
            Review the funding receipt information
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
              <Badge
                className={
                  receipt.status === "pending"
                    ? "bg-warning/10 text-warning"
                    : receipt.status === "approved"
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }
              >
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
                View and download the receipt document
              </p>
            </div>
          </div>
          {receipt.status === "pending" && (
            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  onReject(receipt.id, receipt.donor_name);
                  onOpenChange(false);
                }}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button
                className="bg-success hover:bg-success/90"
                onClick={() => {
                  onApprove(receipt.id, receipt.donor_name);
                  onOpenChange(false);
                }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminReceiptDialog;
