import React from "react";

export const WorldwideLocationsSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] py-10 md:py-16 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:pl-[60px] md:pr-[40px]">
        <h2
          className="text-[32px] md:text-5xl font-semibold text-[#efeff0] text-center mb-8 md:mb-12"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Worldwide Locations
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Map Container */}
          <div className="flex-1 relative bg-[#1c1d22] rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] md:ml-8">
            {/* Placeholder for interactive map - will be replaced with actual map component */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#8e8e8f] text-lg mb-4">Interactive Map</p>
                <p className="text-[#5f657d] text-sm">Map integration will be added here</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="md:w-[250px] flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#99c221]" />
              <p className="text-[#cececf] text-sm md:text-base">Offices</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#99c221]" />
              <p className="text-[#cececf] text-sm md:text-base">Development & Lab</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#99c221]" />
              <p className="text-[#cececf] text-sm md:text-base">Distribution regions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
