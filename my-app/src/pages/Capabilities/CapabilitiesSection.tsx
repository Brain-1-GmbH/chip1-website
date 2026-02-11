import React, { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import images for each capability
import imgTesting from "../../assets/9f4721981b9c1884c241f08f6c42cf1f67c62501.png";
import imgWarehouse from "../../assets/04e34253eb222c2efb2cc600d81965337771fe36.jpg";
import imgGlobal from "../../assets/9e7234906a15f55c89b9256932514df27b17078d.jpg";
import imgProgramming from "../../assets/87c4719c6b4f8965d13a2f360035a2c65f2f832f.jpg";
import imgPackaging from "../../assets/483c36b3a89fd7a34393a33421e9033aab8782fb.png";
import imgReporting from "../../assets/54dc757194b237eb6479486d92e9dd2d26a1ce26.jpg";

interface CapabilityItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

const capabilitiesData: CapabilityItem[] = [
  {
    id: "testing",
    title: "Component testing & inspection",
    image: imgTesting,
    description:
      "Our state-of-the-art testing laboratories perform comprehensive electrical, visual, and X-ray inspections on every component. We verify authenticity, functionality, and compliance with manufacturer specifications to ensure only genuine, quality-tested parts enter your supply chain.",
  },
  {
    id: "warehouse",
    title: "Warehouse & inventory management",
    image: imgWarehouse,
    description:
      "With strategically located warehouses across the globe, we maintain millions of components in controlled environments. Our advanced inventory management systems provide real-time visibility and enable rapid fulfillment of orders with same-day shipping capabilities.",
  },
  {
    id: "global",
    title: "Global logistics network",
    image: imgGlobal,
    description:
      "Our worldwide logistics infrastructure ensures fast, reliable delivery to any destination. We partner with leading carriers and maintain regional hubs to optimize shipping routes, reduce transit times, and provide flexible delivery options tailored to your needs.",
  },
  {
    id: "programming",
    title: "Device programming services",
    image: imgProgramming,
    description:
      "We offer in-house programming services for microcontrollers, FPGAs, and memory devices. Our programming capabilities reduce your time-to-market by delivering ready-to-use components, eliminating the need for additional programming steps in your production process.",
  },
  {
    id: "packaging",
    title: "Custom packaging & kitting",
    image: imgPackaging,
    description:
      "From tape and reel conversion to custom kitting solutions, we prepare components exactly how you need them. Our packaging services optimize your production line efficiency and reduce handling costs while maintaining component integrity.",
  },
  {
    id: "reporting",
    title: "Market intelligence & reporting",
    image: imgReporting,
    description:
      "Stay ahead with our comprehensive market intelligence services. We provide detailed reports on component availability, pricing trends, and supply chain risks, empowering you to make informed procurement decisions and plan strategically for the future.",
  },
];

interface TabItemProps {
  capability: CapabilityItem;
  isActive: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ capability, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full py-4 text-left transition-all duration-300 group ${
        isActive ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <span
        className={`text-2xl leading-[1.4] transition-colors duration-300 ${
          isActive
            ? "font-semibold text-[#e5e5e7]"
            : "font-normal text-[#545556] group-hover:text-[#858586]"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {capability.title}
      </span>
      <ChevronRight
        size={24}
        className={`transition-colors duration-300 ${
          isActive ? "text-[#e5e5e7]" : "text-[#545556] group-hover:text-[#858586]"
        }`}
      />
    </button>
  );
};

export const CapabilitiesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % capabilitiesData.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused || isAnimating) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isAnimating, goToNext]);

  const handleTabClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsAnimating(false), 600);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleMobileCategoryClick = (index: number) => {
    setExpandedIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        // If clicking on already expanded category, collapse it
        newSet.delete(index);
      } else {
        // Expand only the clicked category (close others)
        return new Set([index]);
      }
      return newSet;
    });
  };

  return (
    <section className="bg-[#0e0e0f] px-4 pt-2 pb-10 md:px-[80px] md:py-20 border-t-0 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
        {/* Title */}
        <h2
          className="hidden md:block text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Our Capabilities
        </h2>

        {/* Mobile Content */}
        <div className="md:hidden flex flex-col gap-6 items-center w-full">
          {/* Offer List with Expandable Items */}
          <div className="flex flex-col gap-3 w-full">
            {capabilitiesData.map((capability, index) => {
              const isExpanded = expandedIndexes.has(index);
              return (
                <div key={capability.id} className="flex flex-col w-full">
                  <button
                    onClick={() => handleMobileCategoryClick(index)}
                    className={`text-left text-[16px] leading-[1.4] transition-colors w-full py-2 ${
                      isExpanded
                        ? "text-[#e5e5e7] font-semibold"
                        : "text-[#858586]"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {capability.title}
                  </button>
                  {isExpanded && (
                    <div className="mt-3 mb-2 pl-0">
                      <div className="w-full h-[200px] rounded-2xl overflow-hidden mb-3">
                        <img
                          src={capability.image}
                          alt={capability.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p
                        className="text-[14px] text-[#cececf] leading-[1.5] text-left"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {capability.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden md:flex gap-[72px] items-start">
          {/* Left - Tabs */}
          <div className="flex flex-col gap-2 w-[512px]">
            {capabilitiesData.map((capability, index) => (
              <TabItem
                key={capability.id}
                capability={capability}
                isActive={index === activeIndex}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>

          {/* Right - Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Image */}
            <div className="h-[400px] rounded-2xl overflow-hidden relative">
              {capabilitiesData.map((capability, index) => (
                <img
                  key={capability.id}
                  src={capability.image}
                  alt={capability.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                />
              ))}
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-4 relative min-h-[120px]">
              {capabilitiesData.map((capability, index) => (
                <div
                  key={capability.id}
                  className="absolute inset-0 flex flex-col gap-4 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                >
                  <h3
                    className="text-[32px] font-semibold text-[#e5e5e7] leading-[1.4]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {capability.title}
                  </h3>
                  <p
                    className="text-base text-[#cececf] leading-[1.5]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

