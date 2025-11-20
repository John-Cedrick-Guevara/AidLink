import HeroSection from "@/app/(public)/(landing page)/sections/HeroSection";
import AboutSection from "@/app/(public)/(landing page)/sections/AboutSection";
import HowItWorksSection from "@/app/(public)/(landing page)/sections/HowItWorksSection";
import FeaturesSection from "@/app/(public)/(landing page)/sections/FeaturesSection";
import TeamSection from "@/app/(public)/(landing page)/sections/TeamSection";
import SupportSection from "@/app/(public)/(landing page)/sections/SupportSection";
import CTASection from "@/app/(public)/(landing page)/sections/CTASection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Landing = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <Navbar />
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
