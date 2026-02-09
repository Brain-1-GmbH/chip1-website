import React, { useRef, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { HeroSection } from "../../components/Hero/HeroSection";
import { AboutSection } from "../../components/About/AboutSection";
import { FAQSection } from "../../components/FAQ/FAQSection";
import { ContactSection } from "../../components/Contact/ContactSection";
import { Footer } from "../../components/Footer/Footer";

import planetVideo from "../../assets/video/planet.mp4";

export const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;

      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      const timeDelta = currentTime - lastScrollTime.current;
      
      // Calculate scroll speed (pixels per millisecond)
      const scrollSpeed = timeDelta > 0 ? scrollDelta / timeDelta : 0;

      // If there's significant scroll movement, play the video with increased speed
      if (scrollDelta > 1) {
        // Calculate playback rate based on scroll speed
        // Base speed: 1.0x, increase up to 2.5x based on scroll speed
        // Normalize scroll speed (adjust multiplier as needed for sensitivity)
        const normalizedSpeed = Math.min(scrollSpeed * 50, 1.5); // Cap at 1.5x multiplier
        const playbackRate = 1.0 + normalizedSpeed; // Range: 1.0x to 2.5x
        
        videoRef.current.playbackRate = playbackRate;
        
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {
            // Ignore play errors (e.g., autoplay restrictions)
          });
        }

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Pause video after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }, 150); // Small delay to detect scroll end
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Background Video */}
      <div className="video-container">
        <video
          ref={videoRef}
          className="video-background"
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

