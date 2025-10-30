"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  userName: string;
  status?: string| undefined;
}

const DashboardHeader = ({ userName, status }: DashboardHeaderProps) => {
  console.log(status);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{userName}</span> 👋
          </h1>
          <p className="text-muted-foreground">
            Manage your charity projects and explore new opportunities
          </p>
        </div>
        {status === "normal" && (
          <Link href="/proposal-form">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 shadow-md"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create New Project
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
