"use client";

import { Card } from "@/components/ui/card";
import { Lightbulb, CheckCircle2, DollarSign, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { HowItWorksStep } from "@/types";

const steps: HowItWorksStep[] = [
  {
    icon: Lightbulb,
    title: "Propose Project",
    description:
      "Students and teachers submit detailed charity project proposals with clear goals and budgets.",
    step: "01",
  },
  {
    icon: CheckCircle2,
    title: "Get Approved",
    description:
      "Admin team reviews proposals for feasibility, impact, and alignment with platform guidelines.",
    step: "02",
  },
  {
    icon: DollarSign,
    title: "Receive Donations",
    description:
      "Approved projects go live and start receiving donations from supporters who believe in the cause.",
    step: "03",
  },
  {
    icon: BarChart3,
    title: "Update Supporters",
    description:
      "Project teams provide regular updates, photos, and reports to keep donors engaged and informed.",
    step: "04",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to make a difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card p-6 h-full relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-md">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
