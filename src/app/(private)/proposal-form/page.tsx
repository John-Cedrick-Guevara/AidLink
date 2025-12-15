"use client";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import MultiStepProjectForm from "./components/MultiStepForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/components/providers/UserProvider";

const ProjectForm = () => {
  const router = useRouter();
  const { user } = useUser();

  if (user?.status === "restricted") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div
          role="alert"
          className="
        relative
        max-w-md w-full
        rounded-lg
        border border-border
        bg-card
        text-card-foreground
        p-6
        shadow-sm
      "
        >
          {/* geometric corner accents */}
          <span className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t border-l border-border" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-border" />

          {/* header */}
          <div className="mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest">
              Submission Restricted
            </h3>
          </div>

          {/* body */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your account is currently restricted from submitting new projects
            due to a violation of platform rules. This action was applied by an
            administrator.
          </p>

          {/* footer */}
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Status: <span className="text-red-700">Restricted</span>
            </span>

            <a
              href="#support"
              className="
            text-xs uppercase tracking-widest
            border border-border
            px-3 py-1.5
            rounded-md
            hover:bg-muted
            transition-colors
          "
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="pt-26 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => router.push("/projects")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-4xl font-bold mb-2">
                Create New <span className="gradient-text">Project</span>
              </h1>
              <p className="text-muted-foreground">
                Complete the multi-step form to submit your charity project
                proposal
              </p>
            </div>

            {/* Multi-Step Form */}
            <MultiStepProjectForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
