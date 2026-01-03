import React from "react";
import { Header } from "../../components/Header/Header";
import { HeroSection } from "../../components/Hero/HeroSection";
import { AboutSection } from "../../components/About/AboutSection";
import { FAQSection } from "../../components/FAQ/FAQSection";
import { ContactSection } from "../../components/Contact/ContactSection";
import { Footer } from "../../components/Footer/Footer";

import planetVideo from "../../assets/video/planet.mp4";

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Background Video */}
      <div className="video-container">
        <video
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          <source src={planetVideo} type="video/mp4" />
        </video>
        <div className="video-gradient-overlay" />
      </div>

      {/* Header */}
      <Header />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </>
  );
};

