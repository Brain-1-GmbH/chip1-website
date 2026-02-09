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

interface StepTimelineCardProps {
  step: VerificationStep;
  position: "left" | "right";
}

const StepTimelineCard: React.FC<StepTimelineCardProps> = ({ step, position }) => {
  const isLeft = position === "left";
  const isFirst = step.number === 1;

  return (
    <div
      className={`relative z-10 flex w-[784px] h-[267px] items-center gap-6 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Image */}
      <div className="w-[380px] h-[267px] rounded-lg overflow-hidden flex-shrink-0 mt-3">
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Number + Title */}
      <div className="flex flex-col gap-4 items-center text-center">
        <div
          className={`w-20 h-20 rounded-full border-2 flex items-center justify-center ${
            isFirst ? "border-[#323335] bg-[#99c221]" : "border-[#323335] bg-transparent"
          }`}
        >
          <span
            className={`text-[30px] font-normal ${isFirst ? "text-black" : "text-white"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {step.number}
          </span>
        </div>
        <p
          className="text-2xl font-medium text-[#e5e5e7] leading-[1.4] max-w-[360px]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {step.title}
        </p>
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
    <section className="bg-[#0e0e0f] px-4 py-10 md:px-[60px] md:py-24 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[60px]">
        {/* Title */}
        <h2
          className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-8 md:mb-10 text-center"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Verification Steps
        </h2>

        {/* Roadmap - same layout as Our Story */}
        <div className="relative flex flex-col items-start gap-[60px] w-[784px] mx-auto pt-6 overflow-visible">
          {/* Desktop dashed line */}
          <svg
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 mt-2 z-0"
            width="816"
            height="3264.545"
            viewBox="0 0 816 3264.545"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 2V328.455H817.402M2.59809 3266.55H818V2940.09H2.59809V2613.64H818V2287.18H2.59809V1960.73H818V1634.27H2.59809V1307.82H818V981.364H2.59809V654.909H818V328.455L2.59809 328.455"
              stroke="#323335"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="16 16"
            />
          </svg>
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const position = index % 2 === 0 ? "left" : "right";
            const nextPosition = (index + 1) % 2 === 0 ? "left" : "right";

            return (
              <div key={step.number}>
                <div className="relative">
                  <div
                    className={`absolute w-[2px] bg-[#323335] md:hidden ${
                      position === "left" ? LEFT_OUTER_LINE : RIGHT_OUTER_LINE
                    }`}
                    style={{
                      height: isFirst ? "calc(100% - 120px)" : "100%",
                      top: isFirst ? "120px" : "0",
                    }}
                  />
                  <StepTimelineCard step={step} position={position} />
                </div>

                {!isLast && (
                  <div className="md:hidden">
                    <TimelineConnector
                      fromPosition={position}
                      toPosition={nextPosition}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

