
import HeroSection from "@/app/(public)/(landing page)/sections/HeroSection";
import AboutSection from "@/app/(public)/(landing page)/sections/AboutSection";
import HowItWorksSection from "@/app/(public)/(landing page)/sections/HowItWorksSection";
import FeaturesSection from "@/app/(public)/(landing page)/sections/FeaturesSection";
import TeamSection from "@/app/(public)/(landing page)/sections/TeamSection";
import SupportSection from "@/app/(public)/(landing page)/sections/SupportSection";
import CTASection from "@/app/(public)/(landing page)/sections/CTASection";
import ProjectsSection from "@/app/(private)/dashboard/components/shared/ProjectsSection";
import { getAllProjects } from "../projects/server/projectActions";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Landing =  () => {

  return (
    <div className="min-h-screen">
      <Navbar/>
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TeamSection />
      <SupportSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;
