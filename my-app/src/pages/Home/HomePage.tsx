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
      {/* Hero block: video + overlay text - scrolls with content */}
      <div className="relative min-h-screen">
        {/* Video - positioned lower so globe is visible below header */}
        <div className="absolute top-20 left-0 right-0 bottom-0 z-0">
          <div className="video-container video-container--hero h-full">
            <video
              className="video-background"
              style={{ objectPosition: "center 55%" }}
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
        </div>

        {/* Hero text + search overlaid on video */}
        <div className="relative z-10 min-h-screen flex items-center justify-center pointer-events-none [&>*]:pointer-events-auto">
          <HeroSection />
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Sections */}
      <AboutSection />
      <FAQSection />
      <div className="bg-[#0e0e0f] pt-[120px]">
        <ContactSection />
      </div>

      {/* Footer */}
      <div className="bg-[#0e0e0f] pt-[120px]">
        <Footer />
      </div>
    </>
  );
};

