import React from "react";

// Import step images
import img1 from "../../assets/image 222.png";
import img2 from "../../assets/image 222-2.png";
import img3 from "../../assets/image 222-3.png";
import img4 from "../../assets/image 222-4.png";
import img5 from "../../assets/image 222-5.png";
import img6 from "../../assets/image 222-6.png";
import img7 from "../../assets/image 222-7.png";
import img8 from "../../assets/image 222-8.png";
import img9 from "../../assets/image 222-9.png";
import img10 from "../../assets/image 222-10.png";

interface VerificationStep {
  number: number;
  title: string;
  image: string;
  position: "left" | "right";
}

const steps: VerificationStep[] = [
  {
    number: 1,
    title: "Documentation of delivery (condition of outer and inner package) incl. pictures",
    image: img1,
    position: "left",
  },
  {
    number: 2,
    title: "Label verification of packed material (trays, tubes, reels, bulk)",
    image: img2,
    position: "right",
  },
  {
    number: 3,
    title: "Sampling based on sampling plan",
    image: img3,
    position: "left",
  },
  {
    number: 4,
    title: "Microscopy of component body, inscription, leads, etc",
    image: img4,
    position: "right",
  },
  {
    number: 5,
    title: "Check of dimensions and weight",
    image: img5,
    position: "left",
  },
  {
    number: 6,
    title: "Aceton wipe test incl. microscopy",
    image: img6,
    position: "right",
  },
  {
    number: 7,
    title: "X-Ray",
    image: img7,
    position: "left",
  },
  {
    number: 8,
    title: "Decapsulation incl. microscopy (Optional based on customer approval)",
    image: img8,
    position: "right",
  },
  {
    number: 9,
    title: "Documentation",
    image: img9,
    position: "left",
  },
  {
    number: 10,
    title: "Based on the results, further analysis (destructive and non-destructive) is proposed",
    image: img10,
    position: "right",
  },
];

interface StepCardProps {
  step: VerificationStep;
  isFirst?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, isFirst = false }) => {
  const isLeft = step.position === "left";

  return (
    <div
      className={`flex flex-col gap-6 md:gap-10 w-full max-w-[343px] md:max-w-none md:w-[378px] ${
        isLeft ? "items-start text-left" : "items-end text-right"
      }`}
    >
      {/* Image */}
      <div className={`w-[240px] md:w-[378px] h-[152px] md:h-[240px] rounded-lg overflow-hidden ${isLeft && isFirst ? 'md:ml-0 -ml-4' : ''}`}>
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover"
          style={isLeft && isFirst ? { objectPosition: "left center" } : undefined}
        />
      </div>

      {/* Text Content */}
      <div className={`flex flex-col gap-3 md:gap-4 ${isLeft ? "items-start" : "items-end"}`}>
        <div className={`flex flex-col ${isLeft ? "items-start" : "items-end"}`}>
          <span
            className="text-[32px] md:text-5xl font-semibold text-[#99c221] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {step.number}
          </span>
          <span
            className="text-[20px] md:text-2xl font-medium text-[#cececf] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {step.title}
          </span>
        </div>
      </div>
    </div>
  );
};

// OUTER line positions - lines are on the OUTSIDE of cards (near screen edges)
const LEFT_OUTER_LINE = "left-0";
const RIGHT_OUTER_LINE = "right-0";

// Connector between timeline items (Our Story style)
const TimelineConnector: React.FC<{
  fromPosition: "left" | "right";
  toPosition: "left" | "right";
}> = ({ fromPosition, toPosition }) => {
  const goingLeftToRight = fromPosition === "left" && toPosition === "right";
  const goingRightToLeft = fromPosition === "right" && toPosition === "left";

  return (
    <div className="relative h-[100px] w-full">
      {goingLeftToRight && (
        <>
          <div className={`absolute top-0 w-[2px] h-[50px] bg-[#323335] ${LEFT_OUTER_LINE}`} />
          <div className="absolute top-[50px] left-0 right-0 h-[2px] bg-[#323335]" />
          <div className={`absolute top-[50px] w-[2px] h-[50px] bg-[#323335] ${RIGHT_OUTER_LINE}`} />
        </>
      )}
      {goingRightToLeft && (
        <>
          <div className={`absolute top-0 w-[2px] h-[50px] bg-[#323335] ${RIGHT_OUTER_LINE}`} />
          <div className="absolute top-[50px] left-0 right-0 h-[2px] bg-[#323335]" />
          <div className={`absolute top-[50px] w-[2px] h-[50px] bg-[#323335] ${LEFT_OUTER_LINE}`} />
        </>
      )}
    </div>
  );
};

export const VerificationStepsSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-4 py-4 md:px-[60px] md:py-24 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[60px]">
        {/* Header */}
        <div className="flex flex-col gap-2 md:gap-4 mb-10 md:mb-24">
          <h2
            className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Verification Steps
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative w-full max-w-[1100px] mx-auto">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const nextStep = steps[index + 1];

            return (
              <div key={step.number}>
                {/* Timeline Card Row */}
                <div className="relative">
                  {/* Vertical line on the OUTER edge (outside the card) */}
                  <div
                    className={`absolute w-[2px] bg-[#323335] ${
                      step.position === "left" ? LEFT_OUTER_LINE : RIGHT_OUTER_LINE
                    }`}
                    style={{
                      height: isFirst ? "calc(100% - 120px)" : "100%",
                      top: isFirst ? "120px" : "0",
                    }}
                  />

                  {/* Card - with padding to leave room for outer line */}
                  <div
                    className={`flex ${
                      step.position === "left" ? "justify-start pl-10" : "justify-end pr-10"
                    }`}
                  >
                    <StepCard step={step} isFirst={isFirst} />
                  </div>
                </div>

                {/* Connector to next item */}
                {!isLast && nextStep && (
                  <TimelineConnector
                    fromPosition={step.position}
                    toPosition={nextStep.position}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

