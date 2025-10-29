"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { Eye, Receipt } from "lucide-react";
import { FundingReceipt } from "@/data/dummyData";
import TableUI from "@/components/shared/TableUI";
import { FundSummary } from "@/types";

interface ReceiptsTableProps {
  receipts: FundSummary[] | null;
  onViewReceipt: (receipt: FundSummary) => void;
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

const ReceiptsTable = ({ receipts, onViewReceipt }: ReceiptsTableProps) => {
  if (receipts?.length === 0) {
    return (
      <Card className="glass-card p-6">
        <div className="text-center py-8 text-muted-foreground">
          <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No funding receipts yet</p>
        </div>
      </Card>
    );
  }

  const renderRow = (receipt: FundSummary, index: number) => (
    <TableRow key={index} className="hover:bg-muted/30 my-2">
      {/* 💻 Desktop View */}
      <TableCell className="hidden lg:table-cell">
        <div className="font-medium">{receipt.project.title}</div>
      </TableCell>

      <TableCell className="hidden lg:table-cell font-semibold">
        ₱{receipt.amount.toLocaleString()}
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        {receipt.user.full_name}
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        <Badge className={getStatusBadgeClass(receipt.status)}>
          {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
        </Badge>
      </TableCell>

      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
        {new Date(receipt.created_at).toLocaleDateString()}
      </TableCell>

      <TableCell className="hidden lg:table-cell text-right">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onViewReceipt(receipt)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </TableCell>

      {/* 📱 Mobile View */}
      <TableCell colSpan={1000} className="p-0 lg:hidden block m-2 h-full">
        <div className="flex flex-col rounded-lg border p-4 shadow-sm h-full w-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="font-semibold text-base whitespace-normal flex-1 pr-2">
              {receipt.project.title}
            </div>
            <Badge className={getStatusBadgeClass(receipt.status)}>
              {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
            </Badge>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Amount</p>
              <p className="font-semibold text-lg">
                ₱{receipt.amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Donor</p>
              <p className="font-medium">{receipt.user.full_name}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Submitted Date</p>
              <p className="font-medium">
                {new Date(receipt.created_at).toLocaleDateString("en-US", {
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
              View Details
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Card className="glass-card p-6">
      <div className="rounded-lg border border-border/50 overflow-hidden">
        <TableUI
          items={receipts || []}
          tableHeads={[
            "Project",
            "Amount",
            "Donor",
            "Status",
            "Submitted",
            "Actions",
          ]}
          tableRow={renderRow}
        ></TableUI>
      </div>
    </Card>
  );
};

export default ReceiptsTable;
