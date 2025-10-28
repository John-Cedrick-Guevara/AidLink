
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TeamSection from "@/components/sections/TeamSection";
import SupportSection from "@/components/sections/SupportSection";
import CTASection from "@/components/sections/CTASection";
import ProjectsSection from "@/app/(private)/dashboard/components/shared/ProjectsSection";
import { getAllProjects } from "../projects/server/projectActions";

const Landing =  () => {

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TeamSection />
      <SupportSection />
      <CTASection />
    </div>
  );
};

export default Landing;
