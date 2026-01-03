import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { IndustriesHeroSection } from "./IndustriesHeroSection";
import { IndustriesWeServeSection } from "./IndustriesWeServeSection";
import { ContactSection } from "../../components/Contact/ContactSection";

export const IndustriesPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <IndustriesHeroSection />

      {/* Industries We Serve */}
      <IndustriesWeServeSection />

      {/* Contact Section - Let's Connect */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

