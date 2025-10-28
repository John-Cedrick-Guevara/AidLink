"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  dummyProjects,
  dummyUsers,
  fundingReceipts,
  type FundingReceipt,
} from "@/data/dummyData";
import { motion } from "framer-motion";
import { toast } from "sonner";
import AdminReceiptDialog from "./components/dialogs/sector/AdminReceiptDialog";
import AdminStatCards from "./components/AdminStatCards";
import FundingManagementTab from "./components/tabs/FundingManagementTab";
import ProjectsManagementTab from "./components/tabs/ProjectsManagementTab";

import UsersManagementTab from "./components/tabs/UsersManagementTab";
import { Project, Sector, User } from "@/types";
import SectorsManagementTab from "./components/tabs/SectorsManagementTab";

interface AdminDashboardProps {
  sectors: Sector[];
  users: User[];
  projects: Project[]; 
}

const AdminDashboard = ({ sectors, users, projects }: AdminDashboardProps) => {
  // State management
  const [projectFilter, setProjectFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [receipts, setReceipts] = useState(fundingReceipts);
  const [selectedReceipt, setSelectedReceipt] = useState<FundingReceipt | null>(
    null
  );
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);

  // Stats

  // Project Handlers
  const handleApprove = (projectId: string, projectTitle: string) => {
   
    toast.success(`Project "${projectTitle}" has been approved`);
  };

  const handleReject = (projectId: string, projectTitle: string) => {
 
    toast.error(`Project "${projectTitle}" has been rejected`);
  };

  // Receipt Handlers
  const handleApproveReceipt = (receiptId: string, donorName: string) => {
    setReceipts(
      receipts.map((r) =>
        r.id === receiptId ? { ...r, status: "approved" as const } : r
      )
    );
    toast.success(`Receipt from ${donorName} has been approved`);
  };

  const handleRejectReceipt = (receiptId: string, donorName: string) => {
    setReceipts(
      receipts.map((r) =>
        r.id === receiptId ? { ...r, status: "rejected" as const } : r
      )
    );
    toast.error(`Receipt from ${donorName} has been rejected`);
  };

  // User Handlers
  const handleRestrictUser = (userId: string, userName: string) => {
    toast.success(`User ${userName} has been restricted`);
  };

  const handleViewReceipt = (receipt: FundingReceipt) => {
    setSelectedReceipt(receipt);
    setReceiptDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Manage projects, users, and platform analytics
            </p>
          </motion.div>

          {/* Stats Cards */}
          {/* <AdminStatCards
            totalProjects={stats.totalProjects}
            pendingProjects={stats.pendingProjects}
            approvedProjects={stats.approvedProjects}
            totalUsers={stats.totalUsers}
            totalDonations={stats.totalDonations}
          /> */}

          {/* Tabbed Management Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="funding">Funding</TabsTrigger>
                <TabsTrigger value="sectors">Sectors</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>

              {/* Projects Tab */}
              <TabsContent value="projects">
                <ProjectsManagementTab
                  projects={projects}
                />
              </TabsContent>

              {/* Funding Tab */}
              <TabsContent value="funding">
                <FundingManagementTab
                  receipts={receipts}
                  onViewReceipt={handleViewReceipt}
                  onApprove={handleApproveReceipt}
                  onReject={handleRejectReceipt}
                />
              </TabsContent>

              {/* Sectors Tab */}
              <TabsContent value="sectors">
                <SectorsManagementTab sectors={sectors} />
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <UsersManagementTab users={users} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Receipt View Dialog */}
      <AdminReceiptDialog
        open={receiptDialogOpen}
        onOpenChange={setReceiptDialogOpen}
        receipt={selectedReceipt}
        onApprove={handleApproveReceipt}
        onReject={handleRejectReceipt}
      />
    </div>
  );
};

export default AdminDashboard;
