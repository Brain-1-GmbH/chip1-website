import React from "react";

// Import gallery images - using warehouse, testing, and verification images (no chips)
import img1 from "../../assets/Frame 41.png";
import img2 from "../../assets/Frame 41-2.png";
import img3 from "../../assets/Frame 41-3.png";
import img4 from "../../assets/Frame 41-4.png";
import img5 from "../../assets/Frame 41-5.png";
import img6 from "../../assets/Frame 41-6.png";
import img7 from "../../assets/8b82eb57d7256cc50c1670728afeab437a39c4cd.png";
import img8 from "../../assets/faa445785a11f0ad87420d6a8cc35fa956ca3273.png";
import img9 from "../../assets/df64faf26596b4a319efc1f642d0d2f6670d3376.png";
import img10 from "../../assets/38879d89f3e380685c56941a61a91b920f7f9abe.jpg";
import img11 from "../../assets/38e5e03e0479e9aff6e9db435e1a1c5bb3ec159a.jpg";
import img12 from "../../assets/image 222.png";
import img13 from "../../assets/image 222-2.png";
import img14 from "../../assets/image 222-3.png";

// Top row images
const topRowImages = [
  { src: img1, width: 420 },
  { src: img2, width: 416 },
  { src: img3, width: 416 },
  { src: img4, width: 407 },
  { src: img5, width: 416 },
  { src: img6, width: 410 },
  { src: img7, width: 416 },
];

// Bottom row images
const bottomRowImages = [
  { src: img8, width: 410 },
  { src: img9, width: 410 },
  { src: img10, width: 416 },
  { src: img11, width: 414 },
  { src: img12, width: 420 },
  { src: img13, width: 416 },
  { src: img14, width: 407 },
];

export const LabGallerySection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] py-10 md:py-24 overflow-hidden mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[60px]">
        {/* Header */}
        <div className="flex flex-col gap-6 md:gap-10 items-start mb-8 md:mb-12">
          <h2
            className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3] text-left"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Advanced Testing Laboratories
          </h2>
          <p
            className="text-[14px] md:text-2xl text-[#858586] leading-[1.4] text-left max-w-[1000px]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We operate in-house testing laboratories (Lab 1) in strategic locations worldwide,
            equipped with cutting-edge inspection and diagnostic equipment. Every component that
            passes through our doors undergoes comprehensive testing. This includes:
          </p>
        </div>
      </div>

      {/* Gallery - Three rows with scrolling animations */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0e0e0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0e0e0f] to-transparent z-10 pointer-events-none" />

        {/* Top Row - Scrolls Right */}
        <div className="mb-4 overflow-hidden">
          <div
            className="flex gap-4 animate-scroll-right"
            style={{
              width: "fit-content",
            }}
          >
            {/* Duplicate images for seamless loop */}
            {[...topRowImages, ...topRowImages, ...topRowImages].map((img, index) => (
              <div
                key={`top-${index}`}
                className="flex-shrink-0 h-[59px] md:h-[200px] overflow-hidden w-[122px] md:w-[var(--gallery-width)] rounded-lg border border-[#323335]"
                style={{ ["--gallery-width" as never]: `${img.width}px` } as React.CSSProperties}
              >
                <img
                  src={img.src}
                  alt={`Lab equipment ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle Row - Scrolls Left */}
        <div className="mb-4 overflow-hidden">
          <div
            className="flex gap-4 animate-scroll-left"
            style={{
              width: "fit-content",
            }}
          >
            {/* Duplicate images for seamless loop */}
            {[...bottomRowImages, ...bottomRowImages, ...bottomRowImages].map((img, index) => (
              <div
                key={`middle-${index}`}
                className="flex-shrink-0 h-[59px] md:h-[200px] overflow-hidden w-[122px] md:w-[var(--gallery-width)] rounded-lg border border-[#323335]"
                style={{ ["--gallery-width" as never]: `${img.width}px` } as React.CSSProperties}
              >
                <img
                  src={img.src}
                  alt={`Lab equipment ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolls Right */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 animate-scroll-right"
            style={{
              width: "fit-content",
            }}
          >
            {/* Duplicate images for seamless loop - using combination of both arrays */}
            {[...topRowImages, ...bottomRowImages, ...topRowImages, ...bottomRowImages].map((img, index) => (
              <div
                key={`bottom-${index}`}
                className="flex-shrink-0 h-[59px] md:h-[200px] overflow-hidden w-[122px] md:w-[var(--gallery-width)] rounded-lg border border-[#323335]"
                style={{ ["--gallery-width" as never]: `${img.width}px` } as React.CSSProperties}
              >
                <img
                  src={img.src}
                  alt={`Lab equipment ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

