"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { dummyProjects, sectors } from "@/data/dummyData";
import { ChevronRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectorList } from "@/types";
import SectorCard from "./SectorCard";

const SectorsGrid = ({ sectors }: { sectors: SectorList[] }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">
                Explore by <span className="gradient-text">Sectors</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Browse projects categorized by their impact areas
              </p>

              {/* Sector Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectors.map((sector, index) => (
                  <SectorCard key={sector.id} sector={sector} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <Card className="glass-card p-8 text-center bg-linear-to-br from-primary/5 to-accent/5">
                <h2 className="text-2xl font-bold mb-3">
                  Can't find what you're looking for?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Create your own project and make a difference in your chosen
                  sector
                </p>
                <Link href="/proposal-form">
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    Start a New Project
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SectorsGrid;
