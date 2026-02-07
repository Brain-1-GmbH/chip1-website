import React from "react";

// Background image for Company hero
import companyHeroBg from "../../assets/1c3d9fa78d1c27b4e0bbe9456e57cb226b901842.jpg";

interface CompanyHeroSectionProps {
  tag?: string;
  title: string;
  subtitle: string;
}

export const CompanyHeroSection: React.FC<CompanyHeroSectionProps> = ({
  tag = "Company",
  title,
  subtitle,
}) => {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 top-[66px]">
        <img
          src={companyHeroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(225deg, rgba(14, 14, 15, 0) 55%, rgba(14, 14, 15, 0.7) 92%), linear-gradient(rgba(14, 14, 15, 0.08) 19%, rgba(14, 14, 15, 0.7) 78%, rgb(14, 14, 15) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1280px] mx-auto px-4 pt-[220px] pb-10 md:px-20 md:pt-[360px] md:pb-20">
        <div className="flex flex-col gap-4 max-w-[736px]">
          {/* Tag */}
          <div className="flex items-center border-l-2 border-[#99c221] px-4">
            <span
              className="text-[14px] md:text-2xl text-[#99c221] capitalize leading-[1.1]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {tag}
            </span>
          </div>

          {/* Title with Gradient */}
          <h1
            className="text-[32px] md:text-[56px] font-normal md:font-semibold leading-[1.1]"
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
            className="text-[14px] md:text-2xl text-[#8e8e8f] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

