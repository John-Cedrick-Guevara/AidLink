"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import TableUI from "@/components/shared/TableUI";
import { Eye, CheckCircle2, XCircle } from "lucide-react";
import type { FundingReceipt } from "@/data/dummyData";

interface FundingManagementTabProps {
  receipts: FundingReceipt[];
  onViewReceipt: (receipt: FundingReceipt) => void;
  onApprove: (receiptId: string, donorName: string) => void;
  onReject: (receiptId: string, donorName: string) => void;
}

const FundingManagementTab = ({
  receipts,
  onViewReceipt,
  onApprove,
  onReject,
}: FundingManagementTabProps) => {
  const tableHeads = [
    "Project",
    "Donor",
    "Amount",
    "Status",
    "Submitted",
    "Actions",
  ];

  const renderRow = (receipt: FundingReceipt, index: number) => (
    <TableRow key={receipt.id} className="hover:bg-muted/30 my-2">
      {/* 💻 Desktop View */}
      <TableCell className="hidden lg:table-cell">
        <div className="font-medium">{receipt.project_title}</div>
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        <div className="font-medium">{receipt.donor_name}</div>
        <div className="text-xs text-muted-foreground">
          {receipt.donor_email}
        </div>
      </TableCell>

      <TableCell className="hidden lg:table-cell font-semibold">
        ₱{receipt.amount.toLocaleString()}
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        <Badge
          className={
            receipt.status === "pending"
              ? "bg-warning/10 text-warning"
              : receipt.status === "approved"
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          }
        >
          {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
        </Badge>
      </TableCell>

      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
        {new Date(receipt.submitted_at).toLocaleDateString()}
      </TableCell>

      <TableCell className="hidden lg:table-cell text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onViewReceipt(receipt)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {receipt.status === "pending" && (
            <>
              <Button
                size="sm"
                className="bg-success hover:bg-success/90"
                onClick={() => onApprove(receipt.id, receipt.donor_name)}
              >
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onReject(receipt.id, receipt.donor_name)}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </>
          )}
        </div>
      </TableCell>

      {/* 📱 Mobile View */}
      <TableCell colSpan={1000} className="p-0 lg:hidden block m-2 h-full">
        <div className="flex flex-col rounded-lg border p-4 shadow-sm h-full w-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="font-semibold text-base whitespace-normal flex-1 pr-2">
              {receipt.project_title}
            </div>
            <Badge
              className={
                receipt.status === "pending"
                  ? "bg-warning/10 text-warning"
                  : receipt.status === "approved"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }
            >
              {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
            </Badge>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Donor</p>
              <p className="font-medium">{receipt.donor_name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {receipt.donor_email}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Amount</p>
              <p className="font-semibold text-lg">
                ₱{receipt.amount.toLocaleString()}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Submitted Date</p>
              <p className="font-medium">
                {new Date(receipt.submitted_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t mt-auto">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onViewReceipt(receipt)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            {receipt.status === "pending" && (
              <>
                <Button
                  size="sm"
                  className="bg-success hover:bg-success/90 flex-1"
                  onClick={() => onApprove(receipt.id, receipt.donor_name)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => onReject(receipt.id, receipt.donor_name)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Funding Management</h2>

      <Card className="glass-card p-6">
        {receipts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No funding receipts found</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <TableUI
              items={receipts}
              tableHeads={tableHeads}
              tableRow={renderRow}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default FundingManagementTab;
