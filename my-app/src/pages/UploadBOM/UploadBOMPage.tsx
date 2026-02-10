import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { UploadBOMSection } from "./UploadBOMSection";

export const UploadBOMPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      <Header />
      <UploadBOMSection />
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};
