"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  badgeText: string;
  badgeVariant?: "success" | "warning" | "default";
  gradientClass: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  badgeText,
  badgeVariant = "default",
  gradientClass,
}: StatCardProps) => {
  const getBadgeClass = () => {
    switch (badgeVariant) {
      case "success":
        return "bg-success/10 text-success";
      case "warning":
        return "bg-warning/10 text-warning";
      default:
        return "";
    }
  };

  return (
    <Card className="glass-card p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <Badge variant="secondary" className={`text-xs ${getBadgeClass()}`}>
          {badgeText}
        </Badge>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </Card>
  );
};

export default StatCard;
