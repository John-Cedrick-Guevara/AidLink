"use client";

import { Card } from "@/components/ui/card";
import { Target, Shield, Users, TrendingUp, Zap, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Feature } from "@/types";

const features: Feature[] = [
  {
    icon: Target,
    title: "Easy Funding",
    description:
      "Simple donation process with multiple payment options and instant confirmation.",
  },
  {
    icon: Shield,
    title: "Full Transparency",
    description:
      "Track every peso donated with detailed reports and real-time fund utilization updates.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Built-in tools for project teams to coordinate, assign tasks, and communicate effectively.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Visual dashboards showing project milestones, funding progress, and impact metrics.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description:
      "Real-time alerts for donations, project updates, approvals, and important milestones.",
  },
  {
    icon: Heart,
    title: "Community Engagement",
    description:
      "Comments, likes, and sharing features to build a supportive community around each project.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-20 bg-linear-to-br from-accent/5 to-primary/5"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Platform <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to run successful charity campaigns
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="glass-card p-6 h-full hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
