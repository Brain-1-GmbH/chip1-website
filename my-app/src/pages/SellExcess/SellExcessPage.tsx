import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { SellExcessSection } from "./SellExcessSection";

export const SellExcessPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      <Header />
      <SellExcessSection />
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};
