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

const LEFT_OUTER_LINE = "left-0";
const RIGHT_OUTER_LINE = "right-0";

const MobileConnector: React.FC<{
  fromLeft: boolean;
  toLeft: boolean;
}> = ({ fromLeft, toLeft }) => {
  const goingLeftToRight = fromLeft && !toLeft;
  const goingRightToLeft = !fromLeft && toLeft;

  return (
    <div className="relative h-[80px] w-full">
      {goingLeftToRight && (
        <>
          <div className={`absolute top-0 w-[2px] h-[40px] bg-[#323335] ${LEFT_OUTER_LINE}`} />
          <div className="absolute top-[40px] left-0 right-0 h-[2px] bg-[#323335]" />
          <div className={`absolute top-[40px] w-[2px] h-[40px] bg-[#323335] ${RIGHT_OUTER_LINE}`} />
        </>
      )}
      {goingRightToLeft && (
        <>
          <div className={`absolute top-0 w-[2px] h-[40px] bg-[#323335] ${RIGHT_OUTER_LINE}`} />
          <div className="absolute top-[40px] left-0 right-0 h-[2px] bg-[#323335]" />
          <div className={`absolute top-[40px] w-[2px] h-[40px] bg-[#323335] ${LEFT_OUTER_LINE}`} />
        </>
      )}
    </div>
  );
};

export const VerificationStepsSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-4 py-10 md:px-20 md:py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <h2
          className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-8 md:mb-10 text-center"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Verification Steps
        </h2>

        {/* Mobile Roadmap (Our Story style) */}
        <div className="md:hidden relative w-full max-w-[1100px] mx-auto">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const fromLeft = index % 2 === 0;
            const toLeft = (index + 1) % 2 === 0;

            return (
              <div key={step.number}>
                <div className="relative">
                  <div
                    className={`absolute w-[2px] bg-[#323335] ${
                      fromLeft ? LEFT_OUTER_LINE : RIGHT_OUTER_LINE
                    }`}
                    style={{
                      height: isFirst ? "calc(100% - 80px)" : "100%",
                      top: isFirst ? "80px" : "0",
                    }}
                  />
                  <div
                    className={`flex ${fromLeft ? "justify-start pl-10" : "justify-end pr-10"}`}
                  >
                    <div
                      className={`flex flex-col gap-4 w-[240px] ${
                        fromLeft ? "items-start text-left" : "items-end text-right"
                      }`}
                    >
                      <div className="w-[240px] h-[152px] rounded-lg overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className={`w-12 h-12 rounded-full border border-[#323335] flex items-center justify-center ${
                          step.number === 1 ? "bg-[#99c221]" : "bg-transparent"
                        }`}
                      >
                        <span
                          className={`text-[20px] font-semibold ${
                            step.number === 1 ? "text-black" : "text-white"
                          }`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {step.number}
                        </span>
                      </div>
                      <p
                        className="text-[14px] text-[#e5e5e7] leading-[1.5] w-[240px]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <MobileConnector fromLeft={fromLeft} toLeft={toLeft} />
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Steps */}
        <div className="hidden md:flex relative flex-col gap-[60px] items-center">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#323335] -translate-x-1/2" />
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} isEven={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

