import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContactHeroSection } from "./ContactHeroSection";
import { WorldwideLocationsSection } from "./WorldwideLocationsSection";
import { ContactInformationSection } from "./ContactInformationSection";
import { PerformanceSection } from "./PerformanceSection";
import { ContactSection } from "../../components/Contact/ContactSection";

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <ContactHeroSection />

      {/* Worldwide Locations */}
      <WorldwideLocationsSection />

      {/* Contact Information */}
      <ContactInformationSection />

      {/* Performance Section */}
      <PerformanceSection />

      {/* Let's Connect Section */}
      <div className="bg-[#0e0e0f] pt-[120px]">
        <ContactSection />
      </div>

      {/* Footer */}
      <div className="bg-[#0e0e0f] pt-[120px]">
        <Footer />
      </div>
    </div>
  );
};
