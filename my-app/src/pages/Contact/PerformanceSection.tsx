import React from "react";
import teamPhoto from "../../assets/team-photo.png";

export const PerformanceSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] py-10 md:py-16 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:pl-[60px] md:pr-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-10 md:gap-6 items-center">
          {/* Left Column - Text */}
          <div className="flex flex-col gap-6">
            <h2
              className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.2]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Driven by people. Defined by performance.
            </h2>
            <p className="text-base md:text-xl text-[#858586] leading-[1.5]">
              Each milestone reflects our commitment to reliability, transparency, and long-term customer success.
            </p>
          </div>

          {/* Right Column - Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Card 1: 50+ Countries served */}
            <div
              className="flex flex-col justify-between items-start rounded-2xl p-6 self-stretch"
              style={{
                height: "214px",
                background: "#1D1D21",
              }}
            >
              <span
                className="text-[#efeff0] text-4xl font-semibold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                50+
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-[#cececf] text-base font-medium">
                  Countries served
                </p>
                <p className="text-[#858586] text-sm">
                  Global presence with local support across major regions.
                </p>
              </div>
            </div>

            {/* Card 2: $100M+ Inventory in stock */}
            <div
              className="flex flex-col justify-between items-start rounded-2xl p-6"
              style={{
                height: "250px",
                background: "#99C221",
              }}
            >
              <span
                className="text-[#05080D] text-4xl font-semibold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                $100M+
              </span>
              <div className="flex flex-col gap-2">
                <p
                  className="text-[#05080D] text-xl font-medium"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    lineHeight: "140%",
                  }}
                >
                  Inventory in stock
                </p>
                <p
                  className="text-[#323335] text-sm"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "150%",
                  }}
                >
                  Over $100 million worth of components ready for immediate delivery.
                </p>
              </div>
            </div>

            {/* Card 3: 1M+ Orders shipped */}
            <div
              className="p-[1px] rounded-2xl self-stretch"
              style={{
                background: "linear-gradient(to bottom, #0E0E0F, #333333)",
              }}
            >
              <div
                className="flex flex-col justify-between items-start p-6 h-full rounded-2xl bg-[#0e0e0f]"
                style={{
                  height: "214px",
                }}
              >
                <span
                  className="text-[#CECECF] text-4xl font-semibold"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  1M+
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-[#CECECF] text-base font-medium">
                    Orders shipped
                  </p>
                  <p className="text-[#858586] text-sm">
                    More than one million shipments delivered worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: 20+ Years of experience */}
            <div
              className="flex flex-col justify-between items-start rounded-2xl p-6"
              style={{
                height: "195px",
                background: "#1D1D21",
              }}
            >
              <span
                className="text-[#efeff0] text-4xl font-semibold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                20+
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-[#cececf] text-base font-medium">
                  Years of experience
                </p>
                <p className="text-[#858586] text-sm">
                  Two decades of reliability in component distribution.
                </p>
              </div>
            </div>

            {/* Team Photo */}
            <div className="rounded-2xl overflow-hidden self-stretch" style={{ height: "214px" }}>
              <img
                src={teamPhoto}
                alt="Team Spirit"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 5: 100+ Global suppliers */}
            <div
              className="p-[1px] rounded-2xl self-stretch"
              style={{
                background: "linear-gradient(to bottom, #0E0E0F, #333333)",
              }}
            >
              <div
                className="flex flex-col justify-between items-start p-6 h-full rounded-2xl bg-[#0e0e0f]"
                style={{
                  height: "214px",
                }}
              >
                <span
                  className="text-[#CECECF] text-4xl font-semibold"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  100+
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-[#CECECF] text-base font-medium">
                    Global suppliers
                  </p>
                  <p className="text-[#858586] text-sm">
                    Trusted partnerships ensuring flexible and secure sourcing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
