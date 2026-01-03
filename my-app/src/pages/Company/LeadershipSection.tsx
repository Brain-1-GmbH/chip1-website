import React from "react";

// Import leader images
import imgSasan from "../../assets/Picture-32.png";
import imgDamon from "../../assets/Picture-33.png";
import imgVolkan from "../../assets/Picture-34.png";

interface LeaderCardProps {
  name: string;
  role: string;
  image: string;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ name, role, image }) => {
  return (
    <div className="relative flex-1 h-[466px] rounded-2xl overflow-hidden border border-[#333] flex flex-col justify-end p-4">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 47.6%, rgba(0,0,0,0.263) 66.1%, rgba(0,0,0,0.686) 100%)",
          }}
        />
      </div>

      {/* Name Card with glassmorphism */}
      <div
        className="relative z-10 rounded-lg p-4 flex flex-col gap-2"
        style={{
          background: "rgba(3, 3, 3, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <h3
          className="text-2xl font-semibold text-[#e5e5e7] leading-[1.4]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {name}
        </h3>
        <p
          className="text-xl text-[#cececf] leading-[1.5]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {role}
        </p>
      </div>
    </div>
  );
};

const leadersData: LeaderCardProps[] = [
  {
    name: "Sasan Tabib",
    role: "CEO",
    image: imgSasan,
  },
  {
    name: "Damon P. Eisenhauer",
    role: "COO",
    image: imgDamon,
  },
  {
    name: "Volkan Sanverdi",
    role: "CFO",
    image: imgVolkan,
  },
];

export const LeadershipSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-20 py-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-20">
          <h2
            className="text-5xl font-semibold text-[#efeff0] leading-[1.3]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Leadership Team
          </h2>
          <p
            className="text-2xl text-[#858586] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Meet the leaders powering Chip 1 – seasoned professionals guiding
            our vision, operations, financial strategy to ensure world-class
            service and growth
          </p>
        </div>

        {/* Leader Cards */}
        <div className="flex gap-6">
          {leadersData.map((leader) => (
            <LeaderCard
              key={leader.name}
              name={leader.name}
              role={leader.role}
              image={leader.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

