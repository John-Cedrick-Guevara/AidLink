"use client";
import { Card } from "@/components/ui/card";
import {
  FolderOpen,
  Clock,
  CheckCircle2,
  Users,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

interface AdminStatCardsProps {
  totalProjects: number;
  pendingProjects: number;
  approvedProjects: number;
  totalUsers: number;
  totalDonations: number;
}

const AdminStatCards = ({
  totalProjects,
  pendingProjects,
  approvedProjects,
  totalUsers,
  totalDonations,
}: AdminStatCardsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
    >
      <Card className="glass-card p-6 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold">{totalProjects}</p>
          <p className="text-sm text-muted-foreground">Total Projects</p>
        </div>
      </Card>

      <Card className="glass-card p-6 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
            <Clock className="w-6 h-6 text-accent-foreground" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-warning">{pendingProjects}</p>
          <p className="text-sm text-muted-foreground">Pending Approval</p>
        </div>
      </Card>

      <Card className="glass-card p-6 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-success">{approvedProjects}</p>
          <p className="text-sm text-muted-foreground">Approved</p>
        </div>
      </Card>

      <Card className="glass-card p-6 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
            <Users className="w-6 h-6 text-accent-foreground" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold">{totalUsers}</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>
      </Card>

      <Card className="glass-card p-6 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            ₱{(totalDonations / 1000).toFixed(0)}K
          </p>
          <p className="text-sm text-muted-foreground">Total Raised</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default AdminStatCards;
