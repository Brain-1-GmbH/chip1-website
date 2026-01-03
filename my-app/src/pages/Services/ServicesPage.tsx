import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ServicesHeroSection } from "./ServicesHeroSection";
import { ServicesWeOfferSection } from "./ServicesWeOfferSection";
import { ContactSection } from "../../components/Contact/ContactSection";

export const ServicesPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <ServicesHeroSection />

      {/* Services We Offer - Interactive Tabs */}
      <ServicesWeOfferSection />

      {/* Contact Section - Let's Connect */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

