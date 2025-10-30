"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="projects" className="py-20 bg-linear-to-r from-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90">
            Join AidLink today and be part of a community that's changing lives
            through transparent, impactful charity work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-base bg-white/10 text-white border-white hover:bg-white hover:text-primary shadow-lg"
              >
                Browse Projects
              </Button>
            </Link>
            <Link href="/sectors">
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-base bg-white/10 text-white border-white hover:bg-white hover:text-primary shadow-lg"
              >
                Browse Sectors
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
