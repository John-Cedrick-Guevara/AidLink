"use client";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import MultiStepProjectForm from "./components/MultiStepForm";
import { useRouter } from "next/navigation";

const ProjectForm = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <div className="pt-6 pb-16">
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
