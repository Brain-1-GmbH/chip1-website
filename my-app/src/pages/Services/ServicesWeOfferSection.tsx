import React, { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import images for each service
import imgShortage from "../../assets/941edb178a5b78fb1e830c178f3a470c3339c159.jpg";
import imgCostReduction from "../../assets/b54883385a044ffeedf0a85b03b8b7d954dc0b17.jpg";
import imgExcessInventory from "../../assets/9c1284035c09d0d720734412e97c76f59e8d3f49.jpg";
import imgQualityAssurance from "../../assets/cb49c02c33b6d15bbb887ddbef003d98833f352f.png";
import imgSupplyChain from "../../assets/29a9b6ead21098b9ea294506ee7469d9fd7baf13.jpg";
import imgCustomized from "../../assets/6c6325d2103c5cac495a1e844b2cb19823748f34.jpg";

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "shortage",
    title: "Shortage & obsolescence sourcing",
    image: imgShortage,
    description:
      "When market shortages hit or parts go end-of-life, Chip 1 springs into action. We leverage our global supplier network and in-house inventory to locate obsolete and hard-to-find components, ensuring you can keep production on schedule. Our proactive sourcing team anticipates obsolescence issues and secures last-time buys or equivalent replacements so that your supply chain never misses a beat.",
  },
  {
    id: "cost",
    title: "Cost reduction programs",
    image: imgCostReduction,
    description:
      "Our cost reduction programs help you optimize procurement spending without compromising quality. We analyze your BOM, identify cost-saving opportunities, and negotiate competitive pricing with our extensive supplier network to deliver significant savings on your component purchases.",
  },
  {
    id: "excess",
    title: "Excess inventory management",
    image: imgExcessInventory,
    description:
      "Turn excess inventory into recovered capital. Our excess management services help you liquidate surplus stock, find buyers for obsolete parts, and optimize your inventory levels to reduce carrying costs and free up warehouse space.",
  },
  {
    id: "quality",
    title: "Quality assurance and testing",
    image: imgQualityAssurance,
    description:
      "Every component we source undergoes rigorous quality inspection and testing. Our in-house labs verify authenticity, functionality, and compliance with industry standards, ensuring only genuine, fully-tested parts reach your production line.",
  },
  {
    id: "risk",
    title: "Supply chain risk mitigation",
    image: imgSupplyChain,
    description:
      "Protect your supply chain from disruptions with our risk mitigation strategies. We provide market intelligence, alternative sourcing options, and buffer stock solutions to help you navigate supply chain volatility and maintain business continuity.",
  },
  {
    id: "customized",
    title: "Customized supply chain solutions",
    image: imgCustomized,
    description:
      "Every business is unique. We work closely with you to design tailored supply chain solutions that address your specific challenges, from vendor-managed inventory to just-in-time delivery programs and custom packaging requirements.",
  },
];

interface TabItemProps {
  service: ServiceItem;
  isActive: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ service, isActive, onClick }) => {
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
        {service.title}
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

export const ServicesWeOfferSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % servicesData.length);
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

  return (
    <section className="bg-[#0e0e0f] px-20 py-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Services We Offer
        </h2>

        {/* Content */}
        <div className="flex gap-[72px] items-start">
          {/* Left - Tabs */}
          <div className="flex flex-col gap-2 w-[512px]">
            {servicesData.map((service, index) => (
              <TabItem
                key={service.id}
                service={service}
                isActive={index === activeIndex}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>

          {/* Right - Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Image */}
            <div className="h-[400px] rounded-2xl overflow-hidden relative">
              {servicesData.map((service, index) => (
                <img
                  key={service.id}
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    pointerEvents: index === activeIndex ? 'auto' : 'none',
                  }}
                />
              ))}
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-4 relative min-h-[120px]">
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  className="absolute inset-0 flex flex-col gap-4 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    pointerEvents: index === activeIndex ? 'auto' : 'none',
                  }}
                >
                  <h3
                    className="text-[32px] font-semibold text-[#e5e5e7] leading-[1.4]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-base text-[#cececf] leading-[1.5]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {service.description}
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

