import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { InsightsHeroSection } from "./InsightsHeroSection";
import { LatestArticlesSection } from "./LatestArticlesSection";
import { ArticlesSection } from "./ArticlesSection";
import { NewsletterSection } from "./NewsletterSection";

export const InsightsPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0f] min-h-screen overflow-x-hidden">
      <Header />
      <InsightsHeroSection />
      <LatestArticlesSection />
      <ArticlesSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

