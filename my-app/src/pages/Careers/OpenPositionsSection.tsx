import React, { useState } from "react";
import { Search } from "@carbon/icons-react";
import { CareersDropdown } from "./CareersDropdown";

// Import gallery images from Advanced Testing Laboratories
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

export const OpenPositionsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const departments = [
    { value: "", label: "Department" },
    { value: "sales", label: "Sales" },
    { value: "engineering", label: "Engineering" },
    { value: "operations", label: "Operations" },
    { value: "marketing", label: "Marketing" },
    { value: "trainee", label: "Trainee" },
  ];

  const locations = [
    { value: "", label: "Location" },
    { value: "neu-isenburg", label: "Neu-Isenburg" },
    { value: "munich", label: "Munich" },
    { value: "berlin", label: "Berlin" },
    { value: "remote", label: "Remote" },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden mb-6 md:mb-[120px]">
      {/* Background Gallery with Horizontal Scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
                className="flex-shrink-0 h-[59px] md:h-[200px] overflow-hidden w-[122px] md:w-[var(--gallery-width)] rounded-lg"
                style={{ 
                  ["--gallery-width" as never]: `${img.width}px`,
                  opacity: 0.30,
                } as React.CSSProperties}
              >
                <img
                  src={img.src}
                  alt=""
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
                className="flex-shrink-0 h-[59px] md:h-[200px] overflow-hidden w-[122px] md:w-[var(--gallery-width)] rounded-lg"
                style={{ 
                  ["--gallery-width" as never]: `${img.width}px`,
                  opacity: 0.30,
                } as React.CSSProperties}
              >
                <img
                  src={img.src}
                  alt=""
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
            {[...topRowImages, ...topRowImages, ...topRowImages].map((img, index) => (
              <div
                key={`bottom-${index}`}
                className="flex-shrink-0 h-[59px] md:h-[200px] overflow-hidden w-[122px] md:w-[var(--gallery-width)] rounded-lg"
                style={{ 
                  ["--gallery-width" as never]: `${img.width}px`,
                  opacity: 0.30,
                } as React.CSSProperties}
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(14, 14, 15, 0.8) 0%, rgba(14, 14, 15, 0.95) 100%)",
          }}
        />
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
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-[80px]">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {/* Title */}
          <h2
            className="text-[32px] md:text-5xl font-semibold text-white text-center leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Open Positions
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-[#b6b6b7] text-center max-w-2xl leading-[1.5]">
            Join our dynamic team and contribute to innovation in electronic
            components distribution
          </p>

          {/* Search and Filter Bar */}
          <div className="w-full max-w-4xl mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search size={20} className="text-[#8e8e8f]" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-[#1c1d22] border border-[#323335] text-white placeholder-[#8e8e8f] outline-none focus:border-[#99c221] transition-colors"
                  style={{ 
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    borderRadius: "48px",
                  }}
                />
              </div>

              {/* Dropdowns Container - Side by Side */}
              <div className="flex flex-row gap-4">
                {/* Department Dropdown */}
                <CareersDropdown
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  options={departments}
                  placeholder="Department"
                  width={154}
                />

                {/* Location Dropdown */}
                <CareersDropdown
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  options={locations}
                  placeholder="Location"
                  width={123}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
