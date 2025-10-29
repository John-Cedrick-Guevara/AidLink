"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-primary/5" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-muted-foreground">
              Transform Lives Through Student-Led Charity
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            A Web-Based Platform That
            <br />
            Bridges <span className="gradient-text">Ideas</span> Into
            <br />
            Real Action
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern platform where students and teachers propose, browse, and
            support meaningful charity projects with complete transparency and
            engagement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard/user">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 shadow-lg text-base px-8"
              >
                Explore Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="text-base px-8">
                Learn How It Works
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-12 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">50+</div>
              <div className="text-sm text-muted-foreground">
                Active Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">₱2M+</div>
              <div className="text-sm text-muted-foreground">Funds Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">1000+</div>
              <div className="text-sm text-muted-foreground">
                Students Helped
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
