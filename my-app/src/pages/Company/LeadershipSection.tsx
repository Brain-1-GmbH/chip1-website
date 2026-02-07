import React from "react";

// Import leader images
import imgSasan from "../../assets/1.png";
import imgDamon from "../../assets/2.png";
import imgVolkan from "../../assets/3.png";

interface LeaderData {
  name: string;
  role: string;
  image: string;
  description: string;
}

interface LeaderCardProps extends LeaderData {
  isExpanded: boolean;
  onToggle: () => void;
}

const LeaderCard: React.FC<LeaderCardProps> = ({
  name,
  role,
  image,
  description,
  isExpanded,
  onToggle,
}) => {
  return (
    <div
      className="relative w-full h-[400px] md:flex-1 md:h-[466px] rounded-2xl overflow-hidden border border-[#333] flex flex-col justify-end p-4 group cursor-pointer md:cursor-default"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onToggle();
        }
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradient Overlay - stays visible */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 47.6%, rgba(0,0,0,0.263) 66.1%, rgba(0,0,0,0.686) 100%)",
          }}
        />
      </div>

      {/* Name Card with transparent hover effect */}
      <div
        className="relative z-10 rounded-lg p-4 flex flex-col gap-2 transition-all duration-500 leader-card"
        style={{
          background: "rgba(3, 3, 3, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <h3
          className="text-[20px] md:text-2xl font-semibold text-[#e5e5e7] leading-[1.4] transition-all duration-500 md:group-hover:text-white"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {name}
        </h3>
        <p
          className="text-[16px] md:text-xl text-[#cececf] leading-[1.5] transition-all duration-500 md:group-hover:text-[#e5e5e7]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {role}
        </p>

        {!isExpanded && (
          <button
            type="button"
            className="md:hidden self-center text-[#99c221] text-sm font-medium"
            onClick={onToggle}
          >
            Read More
          </button>
        )}
        
        {/* Description - appears on hover */}
        <p
          className={`text-[14px] md:text-base text-[#cececf] leading-[1.5] overflow-hidden transition-all duration-500 ${
            isExpanded ? "mt-4 max-h-[500px] opacity-100" : "mt-0 max-h-0 opacity-0"
          } md:mt-2 md:max-h-0 md:opacity-0 md:group-hover:max-h-[500px] md:group-hover:mt-4 md:group-hover:opacity-100`}
          style={{
            fontFamily: "'Inter', sans-serif",
            transition: "max-height 0.8s ease-out, margin-top 0.8s ease-out, opacity 0.6s ease-out 0.2s",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const leadersData: LeaderData[] = [
  {
    name: "Sasan Tabib",
    role: "CEO",
    image: imgSasan,
    description:
      "Sasan is the Founder and CEO of Chip 1 Exchange, bringing 25+ years of hands-on experience in the global electronic and semiconductor market. As the driving visionary behind the company, he leads global strategy, expansion, and partnerships. His leadership has propelled Chip 1 to continuous growth and new business sectors worldwide",
  },
  {
    name: "Damon P. Eisenhauer",
    role: "COO",
    image: imgDamon,
    description:
      "Damon is the Co-Founder and COO of Chip 1 Exchange, bringing 20+ years of entrepreneurial and operational experience. He leads the company's global growth with a focus on innovation, efficiency, and strong customer relationships",
  },
  {
    name: "Volkan Sanverdi",
    role: "CFO",
    image: imgVolkan,
    description:
      "Volkan is the Co-Founder and CFO of Chip 1 Exchange, bringing deep expertise in financial leadership, global finance operations, and risk management. He oversees the company's financial strategy and stability, driving scalable growth and supporting Chip 1s expansion across international markets",
  },
];

export const LeadershipSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  return (
    <section className="bg-[#0e0e0f] px-4 py-10 md:px-20 md:py-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:mb-20">
          <h2
            className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Leadership Team
          </h2>
          <p
            className="text-[14px] md:text-2xl text-[#858586] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Meet the leaders powering Chip 1 – seasoned professionals guiding
            our vision, operations, financial strategy to ensure world-class
            service and growth
          </p>
        </div>

        {/* Leader Cards */}
        <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6">
          {leadersData.map((leader, index) => (
            <LeaderCard
              key={leader.name}
              name={leader.name}
              role={leader.role}
              image={leader.image}
              description={leader.description}
              isExpanded={expandedIndex === index}
              onToggle={() =>
                setExpandedIndex((prev) => (prev === index ? null : index))
              }
            />
          ))}
        </div>
      </div>

      <style>{`
        .group:hover .leader-card {
          background: rgba(3, 3, 4, 0.75) !important;
        }
      `}</style>
    </section>
  );
};

