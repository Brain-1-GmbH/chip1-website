import React from "react";

// Import step images
import img1 from "../../assets/Picture-24.png";
import img2 from "../../assets/Picture-25.png";
import img3 from "../../assets/Picture-26.png";
import img4 from "../../assets/Picture-27.png";
import img5 from "../../assets/Picture-28.png";
import img6 from "../../assets/Picture-29.png";
import img7 from "../../assets/Picture-30.png";
import img8 from "../../assets/Picture-31.png";
import img9 from "../../assets/Picture-32.png";
import img10 from "../../assets/Picture-33.png";

interface VerificationStep {
  number: number;
  title: string;
  image: string;
}

const steps: VerificationStep[] = [
  {
    number: 1,
    title: "Documentation of delivery (condition of outer and inner package) incl. pictures",
    image: img1,
  },
  {
    number: 2,
    title: "Label verification of packed material (trays, tubes, reels, bulk)",
    image: img2,
  },
  {
    number: 3,
    title: "Sampling based on sampling plan",
    image: img3,
  },
  {
    number: 4,
    title: "Microscopy of component body, inscription, leads, etc",
    image: img4,
  },
  {
    number: 5,
    title: "Check of dimensions and weight",
    image: img5,
  },
  {
    number: 6,
    title: "Aceton wipe test incl. microscopy",
    image: img6,
  },
  {
    number: 7,
    title: "X-Ray",
    image: img7,
  },
  {
    number: 8,
    title: "Decapsulation incl. microscopy (Optional based on customer approval)",
    image: img8,
  },
  {
    number: 9,
    title: "Documentation",
    image: img9,
  },
  {
    number: 10,
    title: "Based on the results, further analysis (destructive and non-destructive) is proposed",
    image: img10,
  },
];

interface StepCardProps {
  step: VerificationStep;
  isEven: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, isEven }) => {
  const isFirst = step.number === 1;

  return (
    <div
      className={`bg-[#0e0e0f] flex gap-6 items-center rounded-2xl w-[784px] h-[267px] ${
        isEven ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Image */}
      <div className="w-[380px] h-[267px] rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-6 items-center">
        {/* Number Circle */}
        <div
          className={`w-20 h-20 rounded-full border-2 flex items-center justify-center ${
            isFirst
              ? "border-[#323335] bg-[#99c221]"
              : "border-[#323335] bg-transparent"
          }`}
        >
          <span
            className={`text-[30px] font-normal ${
              isFirst ? "text-black" : "text-white"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {step.number}
          </span>
        </div>

        {/* Title */}
        <p
          className="text-2xl font-medium text-[#e5e5e7] leading-[1.4] text-center"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {step.title}
        </p>
      </div>
    </div>
  );
};

export const VerificationStepsSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-20 py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10 text-center"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Verification Steps
        </h2>

        {/* Steps */}
        <div className="relative flex flex-col gap-[60px] items-center">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#323335] -translate-x-1/2" />

          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} isEven={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

