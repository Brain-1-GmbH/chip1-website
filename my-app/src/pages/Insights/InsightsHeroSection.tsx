import React from "react";

// Import hero background image
import heroBg from "../../assets/f19cc08cb6e32f981e8f2d194fbcf11a743a58d4.jpg";

export const InsightsHeroSection: React.FC = () => {
  return (
    <section className="relative h-[440px] md:h-[776px] overflow-hidden bg-[#080809]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Insights background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(213deg, rgba(14, 14, 15, 0) 44.57%, rgba(14, 14, 15, 0.7) 78.12%), linear-gradient(rgba(14, 14, 15, 0.08) 19.49%, rgba(14, 14, 15, 0.7) 77.66%, rgb(14, 14, 15) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute left-4 top-[160px] md:left-20 md:top-[362px] flex flex-col gap-4">
        {/* Tag */}
        <div className="border-l-2 border-[#99c221] px-4">
          <p
            className="text-[14px] md:text-2xl text-[#99c221] capitalize leading-[1.1]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Insights
          </p>
        </div>

        {/* Title */}
        <h1
          className="text-[32px] md:text-[56px] font-semibold leading-[1.2] md:leading-[1.1] w-[320px] md:w-[625px]"
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
    </section>
  );
};

