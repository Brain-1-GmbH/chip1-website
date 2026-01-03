import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ProductsHeroSection } from "./ProductsHeroSection";
import { ComponentsWeOfferSection } from "./ComponentsWeOfferSection";
import { ContactSection } from "../../components/Contact/ContactSection";

export const ProductsPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <ProductsHeroSection />

      {/* Components We Offer */}
      <ComponentsWeOfferSection />

      {/* Contact Section - Let's Connect */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

