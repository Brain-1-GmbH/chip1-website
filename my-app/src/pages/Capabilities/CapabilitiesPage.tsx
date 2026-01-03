import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { CapabilitiesHeroSection } from "./CapabilitiesHeroSection";
import { CapabilitiesSection } from "./CapabilitiesSection";
import { ContactSection } from "../../components/Contact/ContactSection";

export const CapabilitiesPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <CapabilitiesHeroSection />

      {/* Capabilities - Interactive Tabs */}
      <CapabilitiesSection />

      {/* Contact Section - Let's Connect */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

