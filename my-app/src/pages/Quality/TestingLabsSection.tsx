import React, { useState } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import testing images
import imgVisual from "../../assets/8b82eb57d7256cc50c1670728afeab437a39c4cd.png";
import imgElectrical from "../../assets/faa445785a11f0ad87420d6a8cc35fa956ca3273.png";
import imgXRay from "../../assets/df64faf26596b4a319efc1f642d0d2f6670d3376.png";
import imgDecapsulation from "../../assets/38879d89f3e380685c56941a61a91b920f7f9abe.jpg";
import imgSolderability from "../../assets/38e5e03e0479e9aff6e9db435e1a1c5bb3ec159a.jpg";

interface TestingMethod {
  id: string;
  title: string;
  image: string;
  description: string;
}

const testingMethods: TestingMethod[] = [
  {
    id: "visual",
    title: "Visual and Microscopic Inspection",
    image: imgVisual,
    description:
      "Trained inspectors carefully examine each part for any signs of remarking, resurfacing, or physical defects. We verify logos, date codes, and other markings against known standards.",
  },
  {
    id: "electrical",
    title: "Electrical Testing and Programming",
    image: imgElectrical,
    description:
      "Comprehensive electrical testing ensures components meet specifications. We verify functionality, timing, and parametric values using advanced test equipment.",
  },
  {
    id: "xray",
    title: "X-Ray and XRF Analysis",
    image: imgXRay,
    description:
      "Non-destructive X-ray inspection reveals internal structure and solder joint quality. XRF analysis confirms material composition and detects counterfeit components.",
  },
  {
    id: "decapsulation",
    title: "Decapsulation and Die Verification",
    image: imgDecapsulation,
    description:
      "When required, we perform controlled decapsulation to expose the die for verification against manufacturer specifications and known authentic samples.",
  },
  {
    id: "solderability",
    title: "Solderability Test Standard",
    image: imgSolderability,
    description:
      "We test component leads for proper solder wetting characteristics to ensure reliable assembly and long-term joint integrity in your production process.",
  },
];

interface TestingTabProps {
  method: TestingMethod;
  isActive: boolean;
  onClick: () => void;
}

const TestingTab: React.FC<TestingTabProps> = ({ method, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full py-4 text-left transition-all duration-300 group ${
        isActive ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <span
        className={`text-2xl leading-[1.4] transition-colors duration-300 ${
          isActive
            ? "font-semibold text-[#e5e5e7]"
            : "font-normal text-[#545556] group-hover:text-[#858586]"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {method.title}
      </span>
      <ChevronRight
        size={24}
        className={`transition-colors duration-300 flex-shrink-0 ${
          isActive ? "text-[#e5e5e7]" : "text-[#545556] group-hover:text-[#858586]"
        }`}
      />
    </button>
  );
};

export const TestingLabsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMethod = testingMethods[activeIndex];

  return (
    <section className="bg-[#0e0e0f] px-20 py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Advanced Testing Laboratories
        </h2>

        {/* Content */}
        <div className="flex gap-[72px] items-start">
          {/* Left - Method Tabs */}
          <div className="flex flex-col gap-2 w-[512px] flex-shrink-0">
            {testingMethods.map((method, index) => (
              <TestingTab
                key={method.id}
                method={method}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Right - Method Details */}
          <div className="flex-1 flex flex-col gap-6 items-center">
            {/* Image */}
            <div className="w-full h-[400px] rounded-2xl overflow-hidden">
              <img
                src={activeMethod.image}
                alt={activeMethod.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Description */}
            <div className="flex flex-col gap-4 w-full">
              <h3
                className="text-[32px] font-semibold text-[#e5e5e7] leading-[1.4]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {activeMethod.title}
              </h3>
              <p
                className="text-base text-[#cececf] leading-[1.5]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {activeMethod.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

