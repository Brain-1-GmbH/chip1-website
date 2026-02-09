import React from "react";

// Import images for the cards
import imgIntegrity from "../../assets/ee2012c62e4847e31a8dbaec4ba5452b833b71b8.png";
import imgReliability from "../../assets/55121ab2dde75365593e108196d7d023bd3a4d4e.png";
import imgInnovation from "../../assets/571414e5e434938fa1da4c356b039a598f4b3fb6.png";

interface ValueCardProps {
  title: string;
  description: string;
  image: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, image }) => {
  return (
    <div className="relative w-full h-[260px] md:w-auto md:h-[363px] rounded-2xl overflow-hidden flex flex-col justify-end p-4 md:p-6">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14, 14, 15, 0) 0%, rgba(14, 14, 15, 0.263) 20.98%, rgba(14, 14, 15, 0.6) 39.74%, rgba(14, 14, 15, 0.88) 68.1%, rgba(14, 14, 15, 0.88) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3
          className="text-[20px] md:text-2xl font-semibold text-[#efeff0] leading-[1.4]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="text-[14px] md:text-base text-[#cececf] leading-[1.5]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const valuesData: ValueCardProps[] = [
  {
    title: "Integrity",
    description:
      "We safeguard your supply chain with transparent, compliant, and fully traceable component sourcing - ensuring your production stays protected and audit-ready",
    image: imgIntegrity,
  },
  {
    title: "Reliability",
    description:
      "We ensure consistent production uptime through dependable delivery, proven supplier networks, and proactive risk mitigation across volatile markets",
    image: imgReliability,
  },
  {
    title: "Innovation",
    description:
      "We strengthen your competitive advantage by optimizing sourcing strategies, leveraging market intelligence, and introducing flexible alternatives that reduce cost and supply-chain risk",
    image: imgInnovation,
  },
];

export const WhatDrivesUsSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-4 py-10 md:px-[60px] md:py-10 mb-[120px] md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[60px]">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:mb-20">
          <h2
            className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            What Drives Us
          </h2>
          <p
            className="text-[14px] md:text-2xl text-[#858586] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We exist to keep production lines running — no matter the market condition.
          </p>
        </div>

        {/* Value Cards */}
        <div className="flex flex-col items-stretch md:flex-row gap-4 md:gap-6">
          {valuesData.map((value) => (
            <ValueCard
              key={value.title}
              title={value.title}
              description={value.description}
              image={value.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

