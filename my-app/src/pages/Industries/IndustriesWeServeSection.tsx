import React, { useState } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import industry images
import imgAutomotive from "../../assets/Container-169718be-b839-4cd6-946e-13c3df2c5bf4.png";
import imgAerospace from "../../assets/Container2-419029ab-b23c-484c-af39-31f531fcd6d4.png";
import imgIndustrial from "../../assets/Container3-90802cef-3618-4094-90b5-3c8b314b983e.png";
import imgConsumer from "../../assets/Container4-f92d4836-b016-4a1c-b6e3-cec6e8bacaea.png";
import imgMedical from "../../assets/Container5-830af0ee-4b7b-45b8-a421-565b443b2efd.png";
import imgTelecom from "../../assets/Container6-16fee834-8039-4f8e-ad66-7720af7f1cce.png";
import imgEnergy from "../../assets/Container7-3744d0d2-180e-4757-9b7d-b88603d25151.png";
import imgComputing from "../../assets/Containe8r-bb441119-7c5f-466b-a35b-ba6babad6ae5.png";
import imgIoT from "../../assets/575d16e137d3b53e7a89806ec3a48a1a3fd9eacf.png";

interface IndustryData {
  id: string;
  title: string;
  image: string;
  description: string;
}

const industriesData: IndustryData[] = [
  {
    id: "automotive",
    title: "Automotive and Transportation",
    image: imgAutomotive,
    description:
      "From electric vehicles to advanced driver assistance systems (ADAS), we supply high-reliability components that meet automotive-grade standards.",
  },
  {
    id: "aerospace",
    title: "Aerospace and Defense",
    image: imgAerospace,
    description:
      "Mission-critical components for aviation, satellites, and defense systems with stringent quality certifications and traceability.",
  },
  {
    id: "industrial",
    title: "Industrial Automation and Robotics",
    image: imgIndustrial,
    description:
      "Precision components for manufacturing automation, robotics, and industrial control systems that drive Industry 4.0.",
  },
  {
    id: "consumer",
    title: "Consumer Electronics",
    image: imgConsumer,
    description:
      "Components for smartphones, wearables, gaming, and smart home devices with fast time-to-market support.",
  },
  {
    id: "medical",
    title: "Medical Devices",
    image: imgMedical,
    description:
      "FDA-compliant components for diagnostic equipment, patient monitoring, and life-saving medical devices.",
  },
  {
    id: "telecom",
    title: "Telecommunications and Networking",
    image: imgTelecom,
    description:
      "High-performance components for 5G infrastructure, network equipment, and communication systems.",
  },
  {
    id: "energy",
    title: "Energy and Power Systems",
    image: imgEnergy,
    description:
      "Components for renewable energy, power generation, and smart grid applications with long-term reliability.",
  },
  {
    id: "computing",
    title: "Computing and Data Centers",
    image: imgComputing,
    description:
      "High-performance semiconductors for servers, storage systems, and cloud infrastructure.",
  },
  {
    id: "iot",
    title: "IoT and Smart Systems",
    image: imgIoT,
    description:
      "Connected device components for smart cities, industrial IoT, and edge computing applications.",
  },
];

interface IndustryTabProps {
  industry: IndustryData;
  isActive: boolean;
  onClick: () => void;
}

const IndustryTab: React.FC<IndustryTabProps> = ({
  industry,
  isActive,
  onClick,
}) => {
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
        {industry.title}
      </span>
      <ChevronRight
        size={24}
        className={`transition-colors duration-300 flex-shrink-0 ${
          isActive ? "text-[#e5e5e7]" : "text-[#545556] group-hover:text-[#858586]"
        }`}
      />
    </button>
  );
};

export const IndustriesWeServeSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
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
    <section className="bg-[#0e0e0f] px-4 pt-2 pb-10 md:px-[80px] md:py-24 border-t-0 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
        {/* Mobile Content */}
        <div className="md:hidden flex flex-col gap-6 items-center w-full">
          {/* Industries List with Expandable Items */}
          <div className="flex flex-col gap-3 w-full">
            {industriesData.map((industry, index) => {
              const isExpanded = expandedIndexes.has(index);
              return (
                <div key={industry.id} className="flex flex-col w-full">
                  <button
                    onClick={() => handleMobileCategoryClick(index)}
                    className={`text-left text-[16px] leading-[1.4] transition-colors w-full py-2 ${
                      isExpanded
                        ? "text-[#e5e5e7] font-semibold"
                        : "text-[#858586]"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {industry.title}
                  </button>
                  {isExpanded && (
                    <div className="mt-3 mb-2 pl-0">
                      <div className="w-full aspect-[696/400] max-h-[400px] rounded-2xl overflow-hidden mb-3">
                        <img
                          src={industry.image}
                          alt={industry.title}
                          className="w-full h-full object-fill"
                        />
                      </div>
                      <p
                        className="text-[14px] text-[#cececf] leading-[1.5] text-left"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {industry.description}
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
          {/* Left - Industry Tabs */}
          <div className="flex flex-col gap-2 w-[512px] flex-shrink-0">
            {industriesData.map((industry, index) => (
              <IndustryTab
                key={industry.id}
                industry={industry}
                isActive={index === activeIndex}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>

          {/* Right - Industry Details */}
          <div className="flex-1 flex flex-col gap-6 items-center">
            {/* Image - 696×400px stretched */}
            <div className="w-[696px] max-w-full h-[400px] rounded-2xl overflow-hidden relative">
              {industriesData.map((industry, index) => (
                <img
                  key={industry.id}
                  src={industry.image}
                  alt={industry.title}
                  className="absolute inset-0 w-full h-full object-fill transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                />
              ))}
            </div>

            {/* Title and Description */}
            <div className="flex flex-col gap-4 w-full relative min-h-[120px]">
              {industriesData.map((industry, index) => (
                <div
                  key={industry.id}
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
                    {industry.title}
                  </h3>
                  <p
                    className="text-base text-[#cececf] leading-[1.5]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {industry.description}
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

