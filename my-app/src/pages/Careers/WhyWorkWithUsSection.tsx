import React, { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import images from Services We Offer section
import imgShortage from "../../assets/941edb178a5b78fb1e830c178f3a470c3339c159.jpg";
import imgCostReduction from "../../assets/b54883385a044ffeedf0a85b03b8b7d954dc0b17.jpg";
import imgExcessInventory from "../../assets/9c1284035c09d0d720734412e97c76f59e8d3f49.jpg";
import imgQualityAssurance from "../../assets/cb49c02c33b6d15bbb887ddbef003d98833f352f.png";

interface Benefit {
  id: string;
  title: string;
  description: string;
  image: string;
}

const benefits: Benefit[] = [
  {
    id: "impactful",
    title: "Impactful Work",
    description:
      "At Chip 1, your work directly contributes to shaping the future of electronic components distribution. Every project you tackle, every solution you develop, and every relationship you build has a meaningful impact on our global network of partners and customers. You'll be part of a team that's revolutionizing how businesses source and manage electronic components, making a tangible difference in industries ranging from automotive to aerospace.",
    image: imgShortage,
  },
  {
    id: "learning",
    title: "Continuous Learning",
    description:
      "We invest heavily in our team's professional development. Through comprehensive training programs, mentorship opportunities, and access to cutting-edge technologies, you'll continuously expand your skills and knowledge. Whether you're interested in deepening your technical expertise, developing leadership capabilities, or exploring new domains, Chip 1 provides the resources and support to help you grow throughout your career.",
    image: imgCostReduction,
  },
  {
    id: "culture",
    title: "Collaborative Culture",
    description:
      "Our workplace thrives on collaboration, diversity, and mutual respect. We believe that the best solutions emerge when diverse perspectives come together. You'll work alongside talented professionals from around the world, sharing knowledge, challenging ideas, and supporting each other's success. Our open communication culture ensures that every voice is heard and valued, creating an environment where innovation flourishes.",
    image: imgExcessInventory,
  },
  {
    id: "benefits",
    title: "Competitive Benefits",
    description:
      "We recognize that our team members are our greatest asset, and we demonstrate this through comprehensive benefits packages. From competitive salaries and performance bonuses to health insurance, retirement plans, and flexible working arrangements, we ensure that you're well taken care of. Additionally, we offer generous vacation time, professional development budgets, and wellness programs to support your overall well-being.",
    image: imgQualityAssurance,
  },
];

interface TabItemProps {
  benefit: Benefit;
  isActive: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ benefit, isActive, onClick }) => {
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
        {benefit.title}
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

export const WhyWorkWithUsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % benefits.length);
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
    <section className="bg-[#0e0e0f] px-4 pt-2 pb-10 md:px-[60px] md:py-20 border-t-0 mb-[120px] md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[60px]">
        {/* Title */}
        <h2
          className="hidden md:block text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Why Work With Us?
        </h2>

        {/* Mobile Content */}
        <div className="md:hidden flex flex-col gap-6 items-center">
          {/* Image */}
          <div className="w-full h-[280px] rounded-2xl overflow-hidden relative">
            {benefits.map((benefit, index) => (
              <img
                key={benefit.id}
                src={benefit.image}
                alt={benefit.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: index === activeIndex ? 1 : 0,
                  pointerEvents: index === activeIndex ? "auto" : "none",
                }}
              />
            ))}
          </div>

          {/* Active Title */}
          <h3
            className="text-[24px] font-semibold text-[#e5e5e7] leading-[1.4] text-left w-full"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {benefits[activeIndex].title}
          </h3>
          <p
            className="text-[14px] text-[#cececf] leading-[1.5] text-left w-full"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {benefits[activeIndex].description}
          </p>

          {/* Benefits List */}
          <div className="flex flex-col gap-3 w-full">
            {benefits.map((benefit, index) => (
              <button
                key={benefit.id}
                onClick={() => handleTabClick(index)}
                className={`text-left text-[16px] leading-[1.4] transition-colors ${
                  index === activeIndex
                    ? "text-[#e5e5e7] font-semibold"
                    : "text-[#858586]"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {benefit.title}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden md:flex gap-[72px] items-start">
          {/* Left - Tabs */}
          <div className="flex flex-col gap-2 w-[512px]">
            {benefits.map((benefit, index) => (
              <TabItem
                key={benefit.id}
                benefit={benefit}
                isActive={index === activeIndex}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>

          {/* Right - Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Image */}
            <div className="h-[400px] rounded-2xl overflow-hidden relative">
              {benefits.map((benefit, index) => (
                <img
                  key={benefit.id}
                  src={benefit.image}
                  alt={benefit.title}
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
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id}
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
                    {benefit.title}
                  </h3>
                  <p
                    className="text-base text-[#cececf] leading-[1.5]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {benefit.description}
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
