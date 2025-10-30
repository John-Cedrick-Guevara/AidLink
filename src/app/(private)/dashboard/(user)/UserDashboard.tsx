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

import { userInitialData } from "./server/getUserDashboard";

import { FundSummary, Project } from "@/types";
import ProjectCard from "@/components/shared/ProjectCard";
import { useUser } from "@/components/providers/UserProvider";
import { useReceiptActions } from "./hooks/useReceiptHooks";

export interface UserDashboardProps {
  initialData: userInitialData;
  projects: Project[];
  receipts: FundSummary[] | null;
}

const UserDashboard = ({
  initialData,
  projects,
  receipts,
}: UserDashboardProps) => {
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
  const userProjects = projects.filter((p) => p.proposer.id === user?.id);
  const userReceipts = fundingReceipts.filter((receipt) =>
    userProjects.some((p) => p.id === receipt.project_id)
  );

  const handleViewReceipt = (receipt: FundSummary) => {
    setSelectedReceipt(receipt);
    setReceiptDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="pt-26 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <DashboardHeader userName={user?.full_name || "User"} />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="My Projects"
              value={initialData.myProjectsCount}
              icon={FolderOpen}
              badgeText="Total"
              gradientClass="bg-gradient-primary"
            />
            <StatCard
              title="Active Campaigns"
              value={initialData.myProjectsCount}
              icon={TrendingUp}
              badgeText="Active"
              badgeVariant="success"
              gradientClass="bg-gradient-accent"
            />
            <StatCard
              title="Total Donations"
              value={`${(initialData.totalDonatedAmount / 1000).toFixed(0)}K`}
              icon={Heart}
              badgeText="Raised"
              gradientClass="bg-gradient-primary"
            />
            <StatCard
              title="Funding Rate"
              value={`${
                initialData.myProjectsCount > 0
                  ? (
                      (initialData.totalDonatedAmount /
                        initialData.myProjectsCount) *
                      100
                    ).toFixed(0)
                  : 0
              }%`}
              icon={Activity}
              badgeText="Progress"
              gradientClass="bg-gradient-accent"
            />
          </div>

          {/* My Projects Section */}
          {/* <ProjectsSection
            title="My Projects"
            projects={userProjects.slice(0, 3)}
            showViewAll={true}
            delay={0.1}
          /> */}

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

          {/* Browse All Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Browse All Projects</h2>

            {/* <ProjectFilters
              searchQuery={searchQuery}
              selectedSector={selectedSector}
              selectedStatus={selectedStatus}
              sectors={sectors}
              filteredCount={filteredProjects.length}
              onSearchChange={setSearchQuery}
              onSectorChange={setSelectedSector}
              onStatusChange={setSelectedStatus}
              onClearFilters={clearFilters}
            /> */}

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
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
