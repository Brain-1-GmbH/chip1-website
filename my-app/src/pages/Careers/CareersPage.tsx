import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContactSection } from "../../components/Contact/ContactSection";
import { CareersHeroSection } from "./CareersHeroSection";
import { WhyWorkWithUsSection } from "./WhyWorkWithUsSection";
import { OpenPositionsSection } from "./OpenPositionsSection";
import { JobListingsSection } from "./JobListingsSection";

export const CareersPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <CareersHeroSection />

      {/* Why Work With Us Section */}
      <WhyWorkWithUsSection />

      {/* Open Positions Section */}
      <OpenPositionsSection />

      {/* Job Listings Section */}
      <JobListingsSection />

      {/* Contact Section - Let's Connect */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};
