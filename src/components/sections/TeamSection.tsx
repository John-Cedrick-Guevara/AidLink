"use client";

import { Card } from "@/components/ui/card";
import { developers } from "@/data/dummyData";
import { motion } from "framer-motion";

const TeamSection = () => {
  return (
    <section
      id="developers"
      className="py-20 bg-linear-to-br from-primary/5 to-accent/5"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The talented individuals behind AidLink
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card p-6 text-center hover:shadow-lg transition-all">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-md">
                  {dev.avatar}
                </div>
                <h3 className="text-lg font-semibold mb-1">{dev.name}</h3>
                <div className="text-sm text-primary font-medium mb-3">
                  {dev.role}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {dev.bio}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
