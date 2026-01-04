import React from "react";

// Import packaging images
import img1 from "../../assets/image 222-11.png";
import img2 from "../../assets/image 222-12.png";
import img3 from "../../assets/image 222-13.png";
import img4 from "../../assets/image 222-14.png";

interface PackagingStep {
  number: number;
  title: string;
  description: string;
  image: string;
  position: "top" | "bottom";
}

const packagingSteps: PackagingStep[] = [
  {
    number: 1,
    title: "Product Inspection",
    description: "Thoroughly inspect the appearance, quality, and quantity of the chips",
    image: img1,
    position: "top",
  },
  {
    number: 2,
    title: "Vacuum Sealing",
    description:
      "Seal the chips in vacuum bags, removing all air to prevent moisture from affecting their performance",
    image: img2,
    position: "top",
  },
  {
    number: 3,
    title: "ESD Packaging",
    description:
      "Carefully package the chips with appropriate ESD precautions, including humidity indicators and desiccants",
    image: img3,
    position: "bottom",
  },
  {
    number: 4,
    title: "Documented Shipment",
    description:
      "Capture the entire shipping process through comprehensive photography. Entrust the delivery to professional logistics couriers",
    image: img4,
    position: "bottom",
  },
];

interface PackagingCardProps {
  step: PackagingStep;
}

const PackagingCard: React.FC<PackagingCardProps> = ({ step }) => {
  const isTop = step.position === "top";

  return (
    <div className="flex flex-col gap-4 items-center w-[382px]">
      {/* Connector line above */}
      {!isTop && <div className="w-[2px] h-16 bg-[#323335]" />}

      {/* Content */}
      <div className="bg-[#0e0e0f] flex flex-col gap-6 items-center rounded-2xl">
        {/* Image */}
        <div className="w-[320px] h-[160px] rounded-lg overflow-hidden">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2 items-center text-center w-[382px]">
          <h4
            className="text-2xl font-semibold text-[#99c221] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {step.title}
          </h4>
          <p
            className="text-base text-[#e5e5e7] leading-[1.5]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {step.description}
          </p>
        </div>
      </div>

      {/* Connector line below */}
      {isTop && <div className="w-[2px] h-16 bg-[#323335]" />}
    </div>
  );
};

export const PackagingStepsSection: React.FC = () => {
  const topSteps = packagingSteps.filter((s) => s.position === "top");
  const bottomSteps = packagingSteps.filter((s) => s.position === "bottom");

  return (
    <section className="bg-[#0e0e0f] px-20 py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Packaging Steps
        </h2>

        {/* Steps Layout */}
        <div className="relative">
          {/* Top Row */}
          <div className="flex justify-between px-2">
            {topSteps.map((step) => (
              <PackagingCard key={step.number} step={step} />
            ))}
          </div>

          {/* Horizontal Connection Line with Numbers */}
          <div className="relative h-20 flex items-center justify-between px-[190px]">
            {/* Line */}
            <div className="absolute left-[50px] right-[50px] top-1/2 h-[2px] bg-[#323335] -translate-y-1/2" />

            {/* Number Circles */}
            {packagingSteps.map((step) => (
              <div
                key={step.number}
                className="relative z-10 w-20 h-20 rounded-full border-2 border-[#323335] bg-[#0e0e0f] flex items-center justify-center"
              >
                <span
                  className="text-[30px] font-normal text-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {step.number}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between px-[294px]">
            {bottomSteps.map((step) => (
              <PackagingCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

