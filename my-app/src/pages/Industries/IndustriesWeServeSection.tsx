import React, { useState } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import industry images (reusing available assets)
import imgAutomotive from "../../assets/Picture-33.png";
import imgAerospace from "../../assets/Picture-34.png";
import imgIndustrial from "../../assets/Picture-35.png";
import imgConsumer from "../../assets/Picture-36.png";
import imgMedical from "../../assets/Picture-29.png";
import imgTelecom from "../../assets/Picture-30.png";
import imgEnergy from "../../assets/Picture-31.png";
import imgComputing from "../../assets/Picture-32.png";
import imgIoT from "../../assets/Picture-10.png";

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

  const activeIndustry = industriesData[activeIndex];

  return (
    <section className="bg-[#0e0e0f] px-20 py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Content */}
        <div className="flex gap-[72px] items-start">
          {/* Left - Industry Tabs */}
          <div className="flex flex-col gap-2 w-[512px] flex-shrink-0">
            {industriesData.map((industry, index) => (
              <IndustryTab
                key={industry.id}
                industry={industry}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Right - Industry Details */}
          <div className="flex-1 flex flex-col gap-6 items-center">
            {/* Image */}
            <div className="w-full h-[400px] rounded-2xl overflow-hidden">
              <img
                src={activeIndustry.image}
                alt={activeIndustry.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Description */}
            <div className="flex flex-col gap-4 w-full">
              <h3
                className="text-[32px] font-semibold text-[#e5e5e7] leading-[1.4]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {activeIndustry.title}
              </h3>
              <p
                className="text-base text-[#cececf] leading-[1.5]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {activeIndustry.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

