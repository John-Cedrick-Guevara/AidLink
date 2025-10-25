"use client";

import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 bg-linear-to-br from-secondary/30 to-background"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="gradient-text">AidLink</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AidLink is a revolutionary platform designed to solve the challenges
            of transparency and engagement in student-led charity initiatives.
            We empower students and teachers to propose meaningful projects,
            track progress in real-time, and receive support from a community
            that cares.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our mission is to create a transparent ecosystem where every peso
            donated makes a measurable impact, every project is tracked from
            proposal to completion, and every contributor can see the difference
            they're making.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
