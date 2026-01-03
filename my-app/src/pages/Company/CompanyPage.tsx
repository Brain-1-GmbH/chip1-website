import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { CompanyHeroSection } from "./CompanyHeroSection";
import { OurStorySection } from "./OurStorySection";
import { WhatDrivesUsSection } from "./WhatDrivesUsSection";
import { HybridModelSection } from "./HybridModelSection";
import { LeadershipSection } from "./LeadershipSection";
import { ContactSection } from "../../components/Contact/ContactSection";

export const CompanyPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <CompanyHeroSection
        tag="Company"
        title="A trusted global distributor for over two decades"
        subtitle="Delivering reliable electronic components through innovation, global reach, and hybrid sourcing."
      />

      {/* Our Story Section */}
      <OurStorySection />

      {/* What Drives Us Section */}
      <WhatDrivesUsSection />

      {/* Hybrid Model Section */}
      <HybridModelSection />

      {/* Leadership Team Section */}
      <LeadershipSection />

      {/* Contact Section - Let's Connect */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

