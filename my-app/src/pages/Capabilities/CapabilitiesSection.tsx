import React, { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import images for each capability
import imgTesting from "../../assets/Picture-25.png";
import imgWarehouse from "../../assets/Picture-26.png";
import imgGlobal from "../../assets/Picture-27.png";
import imgProgramming from "../../assets/Picture-28.png";
import imgPackaging from "../../assets/Picture-29.png";
import imgReporting from "../../assets/Picture-30.png";

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
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % capabilitiesData.length);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const activeCapability = capabilitiesData[activeIndex];

  return (
    <section className="bg-[#0e0e0f] px-20 py-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Our Capabilities
        </h2>

        {/* Content */}
        <div className="flex gap-[72px] items-start">
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
              <img
                src={activeCapability.image}
                alt={activeCapability.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                key={activeCapability.id}
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-4">
              <h3
                className="text-[32px] font-semibold text-[#e5e5e7] leading-[1.4]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {activeCapability.title}
              </h3>
              <p
                className="text-base text-[#cececf] leading-[1.5]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {activeCapability.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

