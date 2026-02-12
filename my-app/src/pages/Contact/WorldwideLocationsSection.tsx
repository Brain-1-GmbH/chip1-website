import React from "react";
import { WorldwideMap } from "./WorldwideMap";

export const WorldwideLocationsSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] py-10 md:py-16 mb-6 md:mb-[120px] overflow-visible">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px] overflow-visible">
        <h2
          className="text-[32px] md:text-5xl font-semibold text-[#efeff0] text-left"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 96 }}
        >
          Worldwide Locations
        </h2>

        <WorldwideMap />
      </div>
    </section>
  );
};
