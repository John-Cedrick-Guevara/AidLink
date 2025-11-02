"use client";

import { useState } from "react";
import { dummyProjects, sectors, fundingReceipts } from "@/data/dummyData";
import { motion } from "framer-motion";
import { FolderOpen, TrendingUp, Heart, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

import DashboardHeader from "../components/shared/DashboardHeader";
import EmptyState from "../components/shared/EmptyState";

import ReceiptDialog from "../components/shared/ReceiptDialog";
import ReceiptsTable from "../components/shared/ReceiptsTable";
import StatCard from "../components/shared/StatCard";

import { AdminStatsData } from "./server/getUserDashboard";

import { FundSummary, Project } from "@/types";
import ProjectCard from "@/components/shared/ProjectCard";
import { useUser } from "@/components/providers/UserProvider";
import { useReceiptActions } from "./hooks/useReceiptHooks";
import ProjectsSection from "../components/shared/ProjectsSection";

export interface UserDashboardProps {
  stats: AdminStatsData;
  receipts: FundSummary[] | null;
}

const UserDashboard = ({ stats,  receipts }: UserDashboardProps) => {
  const [selectedReceipt, setSelectedReceipt] = useState<FundSummary | null>(
    null
  );
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const { user } = useUser();

  // Receipt actions hook
  const { isPending, handleMarkAsPaid } = useReceiptActions({
    onSuccess: () => {
      setReceiptDialogOpen(false);
    },
  });

  // Data

  const handleViewReceipt = (receipt: FundSummary) => {
    setSelectedReceipt(receipt);
    setReceiptDialogOpen(true);
  };

  console.log(stats);
  return (
    <div className="min-h-screen">
      <div className="pt-26 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <DashboardHeader
            userName={user?.full_name || "User"}
            status={user?.status}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard
              title="My Projects"
              value={stats.myProjectsCount}
              icon={FolderOpen}
              badgeText="Total"
              gradientClass="bg-gradient-primary"
            />
            <StatCard
              title="Active Campaigns"
              value={stats.myProjectsCount}
              icon={TrendingUp}
              badgeText="Active"
              badgeVariant="success"
              gradientClass="bg-gradient-accent"
            />
            <StatCard
              title="Total Donations"
              value={`${(stats.totalDonatedAmount / 1000).toFixed(0)}K`}
              icon={Heart}
              badgeText="Raised"
              gradientClass="bg-gradient-primary"
            />
          </div>

          {/* My Projects Section */}
          <ProjectsSection
            title="My Projects"
            projects={stats.myProjects}
         
          />

          {/* Funding Receipts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Funding Receipts</h2>
            </div>
            <ReceiptsTable
              receipts={receipts}
              onViewReceipt={handleViewReceipt}
            />
          </motion.div>
        </div>
      </div>

      {/* Receipt View Dialog */}
      <ReceiptDialog
        receipt={selectedReceipt}
        open={receiptDialogOpen}
        onOpenChange={setReceiptDialogOpen}
        onMarkAsPaid={handleMarkAsPaid}
        isMarkingAsPaid={isPending}
      />
    </div>
  );
};

export default UserDashboard;
