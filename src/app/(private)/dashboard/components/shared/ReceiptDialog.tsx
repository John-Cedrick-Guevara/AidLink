"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FundingReceipt } from "@/data/dummyData";
import { FundSummary } from "@/types";
import { CheckCircle } from "lucide-react";

interface ReceiptDialogProps {
  receipt: FundSummary | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAsPaid?: (fundId: string) => void;
  isMarkingAsPaid?: boolean;
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

const ReceiptDialog = ({
  receipt,
  open,
  onOpenChange,
  onMarkAsPaid,
  isMarkingAsPaid = false,
}: ReceiptDialogProps) => {
  if (!receipt) return null;

  const BUCKET_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/donations_receipts`;
  const imagePath = `${BUCKET_URL}/${receipt.receipt_url}`;

  const isPending = receipt.status === "pending";
  const isPaid = receipt.status === "paid";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
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
              <p className="font-medium">{receipt.project.title}</p>
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
              <p className="font-medium">{receipt.user.full_name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">
                Donor Email
              </Label>
              <p className="font-medium">{receipt.user.email}</p>
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
                {new Date(receipt.created_at).toLocaleDateString()}
              </p>
            </div>
            {receipt.created_at && (
              <div>
                <Label className="text-muted-foreground text-sm">
                  Reviewed Date
                </Label>
                <p className="font-medium">
                  {new Date(receipt.created_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label className="text-muted-foreground text-sm mb-2 block">
              Receipt Document
            </Label>
            <div className="mt-2 border border-border rounded-lg bg-muted/30 overflow-hidden">
              <div className="relative w-full bg-gray-100 dark:bg-gray-800">
                <img
                  src={imagePath}
                  alt="Receipt"
                  className="w-full h-auto object-contain max-h-96 mx-auto"
                  loading="lazy"
                  onLoad={(e) => {
                    console.log("✅ Image loaded successfully");
                  }}
                  onError={(e) => {
                    console.error("❌ Image failed to load:", imagePath);
                    // Fallback if image fails to load
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "block";
                  }}
                />
                <div className="hidden p-4">
                  <p className="text-sm text-muted-foreground font-mono break-all">
                    {imagePath}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Unable to display image preview. The image may be loading or
                    the URL may be incorrect.
                  </p>
                  <a
                    href={imagePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline mt-2 inline-block"
                  >
                    Try opening in new tab
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Mark as Paid button */}
        {isPending && onMarkAsPaid && (
          <DialogFooter className="sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Mark this receipt as paid once the fund has been received
            </p>
            <Button
              onClick={() => onMarkAsPaid(receipt.id)}
              disabled={isMarkingAsPaid}
              className="bg-gradient-primary"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {isMarkingAsPaid ? "Processing..." : "Mark as Paid"}
            </Button>
          </DialogFooter>
        )}

        {isPaid && (
          <DialogFooter>
            <div className="flex items-center text-success gap-2 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>This receipt has been marked as paid</span>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
