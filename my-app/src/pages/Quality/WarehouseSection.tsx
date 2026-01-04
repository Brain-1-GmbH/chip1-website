import React from "react";

// Import warehouse images
import img1 from "../../assets/Frame 41.png";
import img2 from "../../assets/Frame 41-2.png";
import img3 from "../../assets/Frame 41-3.png";
import img4 from "../../assets/Frame 41-4.png";
import img5 from "../../assets/Frame 41-5.png";
import img6 from "../../assets/Frame 41-6.png";

interface WarehouseFeature {
  id: string;
  title: string;
  description: string;
  image: string;
}

const warehouseFeatures: WarehouseFeature[] = [
  {
    id: "customer-experience",
    title: "Smooth Customer Experience",
    description:
      "Chip 1 streamlines electronic component fulfillment with fast order processing, real-time tracking, and ESD-safe packaging—delivering on-time, traceable parts to keep your production line moving.",
    image: img1,
  },
  {
    id: "lifecycle",
    title: "Lifecycle Analysis",
    description:
      "Our component lifecycle management flags obsolescence risk and date-code trends, enabling last-time-buy plans and approved alternates so Chip 1 Exchange customers avoid costly redesigns and shortages.",
    image: img2,
  },
  {
    id: "global-sourcing",
    title: "Resourceful Global Sourcing",
    description:
      "We use our vetted supplier network to find hard-to-get semiconductors with full traceability and compliance checks. You get genuine parts, quickly and securely.",
    image: img3,
  },
  {
    id: "buffer-stock",
    title: "Buffer Stock Solutions",
    description:
      "We build flexible buffer stock - VMI and bonded inventory - near your factories. Chip 1 releases just-in-time shipments that stabilize lead times without tying up working capital.",
    image: img4,
  },
  {
    id: "critical-stockpiles",
    title: "Securing Critical Stockpiles",
    description:
      "For high-risk or long-horizon builds, Chip 1 reserves serialized lots, maintains moisture - controlled, ESD - safe storage, and locks date codes to safeguard quality and continuity.",
    image: img5,
  },
  {
    id: "replacements",
    title: "Identifying Compatible Replacements",
    description:
      "Chip 1 engineering cross - references FFF -equivalent parts, validates specs and testing, and recommends cost - down replacements that meet performance targets and keep schedules on track.",
    image: img6,
  },
];

interface FeatureCardProps {
  feature: WarehouseFeature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="flex flex-col gap-6 items-center rounded-2xl">
      {/* Image */}
      <div className="w-full h-[304px] rounded-2xl overflow-hidden">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 items-center text-center">
        <h4
          className="text-2xl font-medium text-[#e5e5e7] leading-[1.4]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {feature.title}
        </h4>
        <p
          className="text-base text-[#b6b6b7] leading-[1.5]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export const WarehouseSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-20 py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Warehouse
        </h2>

        {/* Features Grid */}
        <div className="flex flex-col gap-10">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-10">
            <FeatureCard feature={warehouseFeatures[0]} />
            <FeatureCard feature={warehouseFeatures[1]} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-10">
            <FeatureCard feature={warehouseFeatures[2]} />
            <FeatureCard feature={warehouseFeatures[3]} />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-10">
            <FeatureCard feature={warehouseFeatures[4]} />
            <FeatureCard feature={warehouseFeatures[5]} />
          </div>
        </div>
      </div>
    </section>
  );
};

