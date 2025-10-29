"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function SimulationBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="fixed top-0 left-0 w-full z-50 p-3"
        >
          <Card className="relative flex items-center justify-center bg-gradient-to-r from-yellow-100 via-yellow-50 to-white border border-yellow-300 shadow-sm rounded-none py-3">
            <AlertTriangle className="text-yellow-600 mr-2 w-5 h-5" />
            <span className="text-yellow-800 font-medium text-sm">
              You are currently in <strong>Testing / Simulation Mode</strong>.
              Actions performed here won’t affect real data.
            </span>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-4 text-yellow-700 hover:text-yellow-900 transition"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
