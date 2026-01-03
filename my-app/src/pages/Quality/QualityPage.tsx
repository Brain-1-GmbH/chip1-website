import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContactSection } from "../../components/Contact/ContactSection";
import { QualityHeroSection } from "./QualityHeroSection";
import { TestingLabsSection } from "./TestingLabsSection";
import { WarehouseSection } from "./WarehouseSection";
import { VerificationStepsSection } from "./VerificationStepsSection";
import { PackagingStepsSection } from "./PackagingStepsSection";
import { LabGallerySection } from "./LabGallerySection";

export const QualityPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <QualityHeroSection />

      {/* Advanced Testing Laboratories */}
      <TestingLabsSection />

      {/* Warehouse */}
      <WarehouseSection />

      {/* Verification Steps */}
      <VerificationStepsSection />

      {/* Packaging Steps */}
      <PackagingStepsSection />

      {/* Lab Gallery */}
      <LabGallerySection />

      {/* Contact Section - Let's Connect */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

