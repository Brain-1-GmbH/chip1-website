import React from "react";
import hybridModelChip from "../../assets/hybrid-model-chip.png";

export const HybridModelSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-4 py-10 md:px-[80px] md:py-10 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:mb-10">
          <h2
            className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            The Hybrid Distribution Model
          </h2>
          <p
            className="text-[14px] md:text-xl text-[#b6b6b7] leading-[1.5] max-w-[706px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our hybrid model connects the stability of franchised sourcing with
            the agility of the open market. By blending both worlds, we ensure
            every customer gets factory-original parts with the flexibility to
            source alternatives when markets tighten. It's how we guarantee
            continuity, even in global supply disruptions.
          </p>
        </div>

        {/* Hybrid Model Diagram */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 py-6 md:py-10">
          {/* Left Side - Franchised Sourcing */}
          <div className="order-2 md:order-none flex flex-col gap-4 md:gap-9 items-start w-full md:w-auto">
            <h3
              className="text-[20px] md:text-[32px] font-medium text-[#cececf] leading-[1.4]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Franchised sourcing
            </h3>
            <div className="hidden md:flex flex-col gap-4 text-2xl text-[#cececf] leading-[1.4]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <p>Franchised sourcing</p>
              <p>Compliance</p>
              <p>Traceability</p>
            </div>
            <div className="flex md:hidden flex-wrap gap-2">
              {["Stability", "Compliance", "Traceability"].map((item) => (
                <span
                  key={item}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-[40px] border border-[#323335] bg-[#0E0E0F] text-[14px] text-[#cececf]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Center - Chip Illustration */}
          <div className="order-1 md:order-none relative flex items-center justify-center">
            {/* Left curved arrow */}
            <svg
              className="hidden md:block absolute -left-[120px] top-1/2 -translate-y-1/2"
              width="140"
              height="300"
              viewBox="0 0 140 300"
              fill="none"
            >
              <path
                d="M140 150 Q 20 150, 20 50 Q 20 0, 60 0"
                stroke="#99c221"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
              />
              <path
                d="M140 150 Q 20 150, 20 250 Q 20 300, 60 300"
                stroke="#99c221"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Right curved arrow */}
            <svg
              className="hidden md:block absolute -right-[120px] top-1/2 -translate-y-1/2"
              width="140"
              height="300"
              viewBox="0 0 140 300"
              fill="none"
            >
              <path
                d="M0 150 Q 120 150, 120 50 Q 120 0, 80 0"
                stroke="#99c221"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
              />
              <path
                d="M0 150 Q 120 150, 120 250 Q 120 300, 80 300"
                stroke="#99c221"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Chip Image */}
            <div className="scale-75 md:scale-100 flex items-center justify-center">
              <img
                src={hybridModelChip}
                alt="Hybrid model chip"
                className="w-auto h-auto max-w-[320px] max-h-[280px]"
              />
            </div>
          </div>

          {/* Right Side - Open-market Sourcing */}
          <div className="order-3 md:order-none flex flex-col gap-4 md:gap-9 items-start w-full md:w-auto">
            <h3
              className="text-[20px] md:text-[32px] font-medium text-[#cececf] leading-[1.4]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Open-market sourcing
            </h3>
            <div className="hidden md:flex flex-col gap-4 text-2xl text-[#cececf] leading-[1.4]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <p>Speed</p>
              <p>Flexibility</p>
              <p>Availability</p>
            </div>
            <div className="flex md:hidden flex-wrap gap-2">
              {["Speed", "Flexibility", "Availability"].map((item) => (
                <span
                  key={item}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-[40px] border border-[#323335] bg-[#0E0E0F] text-[14px] text-[#cececf]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

