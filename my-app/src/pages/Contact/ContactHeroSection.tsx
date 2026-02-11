import React from "react";

// Import hero image
import contactHeroImg from "../../assets/Hero--960f8674-0f59-4879-b83f-1001df7578f8.png";

export const ContactHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 top-[66px]">
        <img
          src={contactHeroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover md:object-cover"
          style={{ objectPosition: "center top" }}
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
      <div className="relative max-w-[1280px] mx-auto px-4 pt-[220px] pb-4 md:px-[80px] md:pt-[360px] md:pb-20">
        <div className="flex flex-col gap-4 max-w-[736px]">
          {/* Tag */}
          <div className="flex items-center border-l-2 border-[#99c221] px-4">
            <span
              className="text-[14px] md:text-2xl text-[#99c221] capitalize leading-[1.1]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Contact Us
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
            Every region connected, every customer supported
          </h1>
        </div>
      </div>
    </section>
  );
};
