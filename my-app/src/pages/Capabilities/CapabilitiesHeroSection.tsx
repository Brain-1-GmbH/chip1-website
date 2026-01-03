import React from "react";
import imgBackground from "../../assets/Picture-24.png";

interface CapabilitiesHeroSectionProps {
  tag?: string;
  title?: string;
  subtitle?: string;
}

export const CapabilitiesHeroSection: React.FC<CapabilitiesHeroSectionProps> = ({
  tag = "Capabilities",
  title = "Expertise that delivers results",
  subtitle = "Advanced testing, global logistics, and quality assurance capabilities",
}) => {
  return (
    <div className="relative w-full h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          src={imgBackground}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(212.915deg, rgba(14, 14, 15, 0) 44.565%, rgba(14, 14, 15, 0.7) 78.124%), linear-gradient(rgba(14, 14, 15, 0.08) 19.492%, rgba(14, 14, 15, 0.7) 77.657%, rgb(14, 14, 15) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 items-start w-full max-w-[1280px] mx-auto px-20 pt-[200px]">
        {/* Tag */}
        <div className="border-l-2 border-[#99c221] pl-4">
          <p
            className="text-2xl text-[#99c221] capitalize leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {tag}
          </p>
        </div>

        {/* Title with gradient text */}
        <h1
          className="text-[56px] font-semibold leading-[1.1] max-w-[769px]"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            background:
              "radial-gradient(ellipse at 75% 100%, #b1b2b1 0%, #d2d4d2 50%, #f4f5f4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-2xl text-[#8e8e8f] leading-[1.4]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

