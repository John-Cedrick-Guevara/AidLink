"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DollarSign, BadgeCheck, Clock, X } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";

interface DonationsTabProps {
  project: Project;
}

export function DonationsTab({ project }: DonationsTabProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <BadgeCheck className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const completedFunds =
    project.funds?.filter((f) => f.status === "approve") || [];
  const totalRaised = completedFunds.reduce(
    (sum, fund) => sum + fund.amount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Total Raised Summary */}
      {completedFunds.length > 0 && (
        <Card className="glass-card p-6 bg-linear-to-br from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Raised</p>
              <p className="text-3xl font-bold text-primary">
                ₱{totalRaised.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Backers</p>
              <p className="text-2xl font-bold">{completedFunds.length}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Donations List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Donations</h3>

        {!project.funds || project.funds.length === 0 ? (
          <Card className="glass-card p-8 text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              No donations yet. Be the first to support this project!
            </p>
          </Card>
        ) : (
          project.funds.map((fund) => (
            <Card
              key={fund.id}
              className="glass-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {getInitials(fund.user?.full_name || "Anonymous")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">
                      {fund.user?.full_name || "Anonymous Donor"}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(fund.created_at)}
                      </p>
                      {fund.method && (
                        <Badge variant="outline" className="text-xs">
                          {fund.method}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(fund.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(fund.status)}
                      {fund.status.charAt(0).toUpperCase() +
                        fund.status.slice(1)}
                    </span>
                  </Badge>
                  <p className="text-xl font-bold text-primary whitespace-nowrap">
                    ₱{fund.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default DonationsTab;