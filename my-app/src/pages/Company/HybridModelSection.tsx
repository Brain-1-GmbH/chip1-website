import React from "react";

export const HybridModelSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-20 py-10">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-10">
          <h2
            className="text-5xl font-semibold text-[#efeff0] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            The Hybrid Distribution Model
          </h2>
          <p
            className="text-xl text-[#b6b6b7] leading-[1.5] max-w-[706px]"
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
        <div className="relative flex items-center justify-between py-10">
          {/* Left Side - Franchised Sourcing */}
          <div className="flex flex-col gap-9 items-start">
            <h3
              className="text-[32px] font-medium text-[#cececf] leading-[1.4]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Franchised sourcing
            </h3>
            <div
              className="flex flex-col gap-4 text-2xl text-[#cececf] leading-[1.4]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <p>Franchised sourcing</p>
              <p>Compliance</p>
              <p>Traceability</p>
            </div>
          </div>

          {/* Center - Chip Illustration */}
          <div className="relative flex items-center justify-center">
            {/* Left curved arrow */}
            <svg
              className="absolute -left-[120px] top-1/2 -translate-y-1/2"
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
              className="absolute -right-[120px] top-1/2 -translate-y-1/2"
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

            {/* Chip SVG */}
            <svg
              width="320"
              height="280"
              viewBox="0 0 320 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Chip body - isometric view */}
              <g transform="translate(40, 60)">
                {/* Top face of chip */}
                <path
                  d="M120 0 L240 60 L120 120 L0 60 Z"
                  fill="#1a1a1b"
                  stroke="#99c221"
                  strokeWidth="1.5"
                />
                {/* Left face */}
                <path
                  d="M0 60 L0 100 L120 160 L120 120 Z"
                  fill="#0e0e0f"
                  stroke="#99c221"
                  strokeWidth="1.5"
                />
                {/* Right face */}
                <path
                  d="M240 60 L240 100 L120 160 L120 120 Z"
                  fill="#141415"
                  stroke="#99c221"
                  strokeWidth="1.5"
                />

                {/* Text on chip */}
                <text
                  x="120"
                  y="55"
                  textAnchor="middle"
                  fill="#99c221"
                  fontSize="16"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="500"
                  transform="rotate(-30, 120, 55)"
                >
                  Hybrid model
                </text>

                {/* Left pins */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={`left-${i}`}>
                    <line
                      x1={15 + i * 12}
                      y1={30 + i * 6}
                      x2={15 + i * 12 - 20}
                      y2={30 + i * 6 - 30}
                      stroke="#99c221"
                      strokeWidth="1"
                    />
                    <rect
                      x={15 + i * 12 - 22}
                      y={30 + i * 6 - 35}
                      width="4"
                      height="8"
                      fill="#99c221"
                      transform={`rotate(-60, ${15 + i * 12 - 20}, ${30 + i * 6 - 31})`}
                    />
                  </g>
                ))}

                {/* Right pins */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={`right-${i}`}>
                    <line
                      x1={135 + i * 12}
                      y1={78 - i * 6}
                      x2={135 + i * 12 + 20}
                      y2={78 - i * 6 - 30}
                      stroke="#99c221"
                      strokeWidth="1"
                    />
                    <rect
                      x={135 + i * 12 + 18}
                      y={78 - i * 6 - 35}
                      width="4"
                      height="8"
                      fill="#99c221"
                      transform={`rotate(60, ${135 + i * 12 + 20}, ${78 - i * 6 - 31})`}
                    />
                  </g>
                ))}

                {/* Bottom left pins */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={`bottom-left-${i}`}>
                    <line
                      x1={15 + i * 12}
                      y1={90 + i * 6}
                      x2={15 + i * 12 - 15}
                      y2={90 + i * 6 + 25}
                      stroke="#99c221"
                      strokeWidth="1"
                    />
                  </g>
                ))}

                {/* Bottom right pins */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={`bottom-right-${i}`}>
                    <line
                      x1={135 + i * 12}
                      y1={138 - i * 6}
                      x2={135 + i * 12 + 15}
                      y2={138 - i * 6 + 25}
                      stroke="#99c221"
                      strokeWidth="1"
                    />
                  </g>
                ))}
              </g>
            </svg>
          </div>

          {/* Right Side - Open-market Sourcing */}
          <div className="flex flex-col gap-9 items-start">
            <h3
              className="text-[32px] font-medium text-[#cececf] leading-[1.4]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Open-market sourcing
            </h3>
            <div
              className="flex flex-col gap-4 text-2xl text-[#cececf] leading-[1.4]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <p>Speed</p>
              <p>Flexibility</p>
              <p>Availability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

