import React from "react";

// Import timeline images
import img2001 from "../../assets/image 169-2.png";
import img2005 from "../../assets/image 169-3.png";
import img2007 from "../../assets/image 169-4.png";
import img2009 from "../../assets/image 169-5.png";
import img2012 from "../../assets/image 169-6.png";
import img2016 from "../../assets/image 169-7.png";
import img2019 from "../../assets/image 170-2.png";
import img2024 from "../../assets/image 171-2.png";
import imgToday from "../../assets/image 172-2.png";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
  position: "left" | "right";
}

const timelineData: TimelineItem[] = [
  {
    year: "2001",
    title: "Foundation (Germany)",
    description:
      "Founded by industry veterans to reliably source hard-to-find components for engineers and manufacturers.",
    image: img2001,
    position: "left",
  },
  {
    year: "2005",
    title: "European Growth",
    description:
      "Opened offices across Europe and deepened OEM/supplier partnerships.",
    image: img2005,
    position: "right",
  },
  {
    year: "2007",
    title: "Americas Expansion",
    description:
      "Established U.S. operations for a larger market with local responsiveness.",
    image: img2007,
    position: "left",
  },
  {
    year: "2009",
    title: "Reaching Asia",
    description:
      "Expanded footprint to enable 24/7 sourcing and local support.",
    image: img2009,
    position: "right",
  },
  {
    year: "2012",
    title: "Global Logistics Network",
    description:
      "Launched large-scale warehouses and automation to speed delivery and quality.",
    image: img2012,
    position: "left",
  },
  {
    year: "2016",
    title: "Laboratory Network Expansion",
    description: "Scaled test capability into a full lab network with offices.",
    image: img2016,
    position: "right",
  },
  {
    year: "2019",
    title: "Hybrid Distribution Model",
    description:
      "Combined franchised sourcing with open-market flexibility for resilience.",
    image: img2019,
    position: "left",
  },
  {
    year: "2024",
    title: "Data-Intelligence Sourcing",
    description:
      "Introduced a real-time sourcing, tracking, and pricing platform.",
    image: img2024,
    position: "right",
  },
  {
    year: "Today",
    title: "One Partner, End-to-End",
    description:
      "A global, data-driven partner helping customers derisk supply and keep production on schedule.",
    image: imgToday,
    position: "left",
  },
];

interface TimelineCardProps {
  item: TimelineItem;
  isFirst?: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, isFirst = false }) => {
  const isLeft = item.position === "left";

  return (
    <div
      className={`flex flex-col gap-6 md:gap-10 w-full max-w-[343px] md:max-w-none md:w-[378px] ${
        isLeft ? "items-start text-left" : "items-end text-right"
      }`}
    >
      {/* Image */}
      <div className={`w-[240px] md:w-[378px] h-[152px] md:h-[240px] rounded-lg overflow-hidden ${isLeft && isFirst ? 'md:ml-0 -ml-4' : ''}`}>
        <img
          src={item.image}
          alt={item.title}
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
            {item.year}
          </span>
          <span
            className="text-[20px] md:text-2xl font-medium text-[#cececf] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {item.title}
          </span>
        </div>
        <p className="text-[14px] md:text-base text-[#e5e5e7] leading-[1.5]">
          {item.description}
        </p>
      </div>
    </div>
  );
};

// OUTER line positions - lines are on the OUTSIDE of cards (near screen edges)
// Cards are 378px wide, positioned at edges with some padding
// Left outer line: near the left edge of the container
// Right outer line: near the right edge of the container
const LEFT_OUTER_LINE = "left-0";
const RIGHT_OUTER_LINE = "right-0";

// Component to render the zigzag connecting lines between timeline items
const TimelineConnector: React.FC<{
  fromPosition: "left" | "right";
  toPosition: "left" | "right";
}> = ({ fromPosition, toPosition }) => {
  // Line goes from one outer side to another with right-angle turns
  const goingLeftToRight = fromPosition === "left" && toPosition === "right";
  const goingRightToLeft = fromPosition === "right" && toPosition === "left";

  return (
    <div className="relative h-[100px] w-full">
      {/* Connector from left outer edge to right outer edge */}
      {goingLeftToRight && (
        <>
          {/* Vertical from left outer side down */}
          <div className={`absolute top-0 w-[2px] h-[50px] bg-[#323335] ${LEFT_OUTER_LINE}`} />
          {/* Horizontal across the full width at bottom */}
          <div className="absolute top-[50px] left-0 right-0 h-[2px] bg-[#323335]" />
          {/* Vertical down to right outer side */}
          <div className={`absolute top-[50px] w-[2px] h-[50px] bg-[#323335] ${RIGHT_OUTER_LINE}`} />
        </>
      )}

      {goingRightToLeft && (
        <>
          {/* Vertical from right outer side down */}
          <div className={`absolute top-0 w-[2px] h-[50px] bg-[#323335] ${RIGHT_OUTER_LINE}`} />
          {/* Horizontal across the full width */}
          <div className="absolute top-[50px] left-0 right-0 h-[2px] bg-[#323335]" />
          {/* Vertical down to left outer side */}
          <div className={`absolute top-[50px] w-[2px] h-[50px] bg-[#323335] ${LEFT_OUTER_LINE}`} />
        </>
      )}
    </div>
  );
};

export const OurStorySection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-4 py-4 md:px-[60px] md:py-24 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[60px]">
        {/* Header */}
        <div className="flex flex-col gap-2 md:gap-4 mb-10 md:mb-24">
          <h2
            className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Story
          </h2>
          <p
            className="text-[14px] md:text-2xl text-[#858586] leading-[1.4] max-w-[900px]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Over two decades, our commitment to reliability, speed, and customer
            focus turned challenges into opportunities. Today, Chip 1 stands as
            one of the largest independent stocking distributors worldwide,
            trusted by leading OEMs, EMS providers, and engineers across more
            than 50 countries.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative w-full max-w-[1100px] mx-auto">
          {timelineData.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === timelineData.length - 1;
            const nextItem = timelineData[index + 1];

            return (
              <div key={item.year}>
                {/* Timeline Card Row */}
                <div className="relative">
                  {/* Vertical line on the OUTER edge (outside the card) */}
                  <div
                    className={`absolute w-[2px] bg-[#323335] ${
                      item.position === "left" ? LEFT_OUTER_LINE : RIGHT_OUTER_LINE
                    }`}
                    style={{
                      height: isFirst ? "calc(100% - 120px)" : "100%",
                      top: isFirst ? "120px" : "0",
                    }}
                  />

                  {/* Card - with padding to leave room for outer line */}
                  <div
                    className={`flex ${
                      item.position === "left" ? "justify-start pl-10" : "justify-end pr-10"
                    }`}
                  >
                    <TimelineCard item={item} isFirst={isFirst} />
                  </div>
                </div>

                {/* Connector to next item */}
                {!isLast && nextItem && (
                  <TimelineConnector
                    fromPosition={item.position}
                    toPosition={nextItem.position}
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
