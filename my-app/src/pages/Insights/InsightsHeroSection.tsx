import React from "react";
import heroBg from "../../assets/f19cc08cb6e32f981e8f2d194fbcf11a743a58d4.jpg";

export const InsightsHeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[440px] md:h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={heroBg}
          alt="Insights background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
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
      <div className="relative z-10 flex flex-col gap-4 items-start w-full max-w-[1280px] mx-auto px-4 pt-[160px] md:px-[80px] md:pt-[200px]">
        {/* Tag */}
        <div className="border-l-2 border-[#99c221] pl-4">
          <p
            className="text-[14px] md:text-2xl text-[#99c221] capitalize leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Insights
          </p>
        </div>

        {/* Title with gradient text */}
        <h1
          className="text-[32px] md:text-[56px] font-semibold leading-[1.2] md:leading-[1.1] max-w-[769px]"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            background:
              "radial-gradient(ellipse at 75% 100%, #b1b2b1 0%, #d2d4d2 50%, #f4f5f4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Connecting Innovation and Supply
        </h1>

        {/* Subtitle */}
        <p
          className="text-[14px] md:text-2xl text-[#8e8e8f] leading-[1.4]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          The Latest Semiconductor Trends
        </p>
      </div>
    </div>
  );
};

