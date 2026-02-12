import React, { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import images for each capability
import imgTesting from "../../assets/9f4721981b9c1884c241f08f6c42cf1f67c62501.png";
import imgWarehouse from "../../assets/04e34253eb222c2efb2cc600d81965337771fe36.jpg";
import imgGlobal from "../../assets/9e7234906a15f55c89b9256932514df27b17078d.jpg";
import imgProgramming from "../../assets/87c4719c6b4f8965d13a2f360035a2c65f2f832f.jpg";
import imgPackaging from "../../assets/483c36b3a89fd7a34393a33421e9033aab8782fb.png";
import imgReporting from "../../assets/54dc757194b237eb6479486d92e9dd2d26a1ce26.jpg";

interface CapabilityItem {
  id: string;
  title: string;
  image: string;
  description: string | React.ReactNode;
}

const capabilitiesData: CapabilityItem[] = [
  {
    id: "inventory",
    title: "Extensive In-Stock Inventory",
    image: imgTesting,
    description:
      "We are proud to maintain one of the industry's largest in-house inventories of electronic components – with $100Mn+ worth of parts in stock at any time. This means immediate availability for many critical components, reducing your lead times and keeping your production lines moving. Our status as the largest independent stocking distributor means we likely have what you need on our shelves, ready to ship, even when others don't.",
  },
  {
    id: "global",
    title: "Global Reach, Local Support",
    image: imgWarehouse,
    description: (
      <>
        <p className="mb-4">
          At Chip 1, our global footprint is more than just geography—it's a strategic advantage for our customers. We deliver personalized service through our regional teams while leveraging our global sourcing power.
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-semibold text-[#e5e5e7] mb-1">North-America</p>
            <p>
              We operate distribution hubs in Texas, California, Boston, and Guadalajara, offering 24/7 support to North American OEMs and EMS providers. Local knowledge with fast shipping options and compliance support (ITAR-ready).
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#e5e5e7] mb-1">Europe</p>
            <p>
              From our German HQ to offices in the Netherlands, Italy, Romania and UK, we support European design houses and manufacturers with localized compliance, regional logistics, and multilingual service.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#e5e5e7] mb-1">Asia-Pacific</p>
            <p>
              With presence in the Philippines, Hong Kong, China and Singapore, we offer sourcing proximity to leading fabs and CMs, enabling shorter lead times and stronger supplier relationships.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "hybrid",
    title: "Hybrid Sourcing Model",
    image: imgGlobal,
    description:
      "A key Chip 1 advantage is our hybrid distribution model. We have direct franchised distributor authorizations for select product lines – giving you the confidence of factory-direct supply – while also excelling in open market sourcing for more flexibility. This dual approach means we can fulfill scheduled production orders as an authorized partner when available, or tap into the open market to solve urgent shortages and find cost-saving alternates when needed. It's the best of both worlds: authorized reliability plus brokerage agility.",
  },
  {
    id: "quality",
    title: "Quality / Laboratories",
    image: imgProgramming,
    description:
      "Our commitment to quality isn't just a promise - it's built into our operations. We operate state-of-the-art Quality Control (QC) laboratories on multiple continents, staffed by trained engineers and inspectors. Chip 1 Laboratories are equipped with advanced tools for counterfeit detection and reliability testing (high-powered microscopes, X-ray, XRF analysis, functional test stations, and more). Every part undergoes a strict multi-point inspection process. We are certified to ISO 9001:2015, AS6081 and AS9120B standards for quality management, ANSI/ESD S20.20 for electrostatic discharge control, and we are ITAR-registered for handling defense-related components. Our memberships and certifications (including ERAI and others) mean you can trust our components to meet the highest industry standards for authenticity and performance.",
  },
  {
    id: "logistics",
    title: "Scalable Logistics & Fast Delivery",
    image: imgPackaging,
    description:
      "With multiple warehouse locations and logistics centers, we can scale to handle orders of any size – from small batch prototypes to massive production runs. Our logistics processes are optimized for speed and accuracy, offering services like just-in-time delivery, drop shipments, and consolidated invoicing to streamline your operations. We partner with reliable global carriers and manage all customs/export compliance (backed by our ITAR registration and knowledge of international trade regulations) so that your parts arrive on time and hassle-free.",
  },
  {
    id: "warehouse",
    title: "Warehouse",
    image: imgReporting,
    description: (
      <>
        <p className="mb-4">
          A true differentiator in the independent distribution landscape, Chip 1's Warehousing Capability offers OEMs a smarter way to manage their global inventory — without the hassle.
        </p>
        <p className="mb-4">
          Here's how it works: OEMs store their strategic inventory directly within one of Chip 1's secure, climate-controlled global warehouses. As soon as any of their approved EMS or CM partners need access to specific parts, Chip 1 handles the entire fulfillment process — from part release and packaging to delivery and full documentation. We even integrate directly with the OEM's ERP system to ensure real-time inventory visibility, traceability, and audit compliance.
        </p>
        <p className="mb-4">
          With this model, OEMs gain:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Centralized inventory control across global production sites</li>
          <li>Faster, more reliable part delivery to manufacturing partners</li>
          <li>ERP-integrated documentation and tracking for compliance and planning</li>
          <li>Reduced logistics overhead, warehousing cost, and coordination burden</li>
        </ul>
        <p>
          This white-glove service ensures precision logistics at scale, backed by Chip 1's fulfillment expertise and global reach. For customers, it's the best of both worlds — centralized inventory with decentralized fulfillment agility. Few in the industry offer anything comparable.
        </p>
      </>
    ),
  },
];

interface TabItemProps {
  capability: CapabilityItem;
  isActive: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ capability, isActive, onClick }) => {
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
        {capability.title}
      </span>
      <ChevronRight
        size={24}
        className={`transition-colors duration-300 ${
          isActive ? "text-[#e5e5e7]" : "text-[#545556] group-hover:text-[#858586]"
        }`}
      />
    </button>
  );
};

export const CapabilitiesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % capabilitiesData.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused || isAnimating) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isAnimating, goToNext]);

  const handleTabClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsAnimating(false), 600);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleMobileCategoryClick = (index: number) => {
    setExpandedIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        // If clicking on already expanded category, collapse it
        newSet.delete(index);
      } else {
        // Expand only the clicked category (close others)
        return new Set([index]);
      }
      return newSet;
    });
  };

  return (
    <section className="bg-[#0e0e0f] px-4 pt-2 pb-10 md:px-[80px] md:py-20 border-t-0 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
        {/* Title */}
        <h2
          className="hidden md:block text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Our Capabilities
        </h2>

        {/* Mobile Content */}
        <div className="md:hidden flex flex-col gap-6 items-center w-full">
          {/* Offer List with Expandable Items */}
          <div className="flex flex-col gap-3 w-full">
            {capabilitiesData.map((capability, index) => {
              const isExpanded = expandedIndexes.has(index);
              return (
                <div key={capability.id} className="flex flex-col w-full">
                  <button
                    onClick={() => handleMobileCategoryClick(index)}
                    className={`text-left text-[16px] leading-[1.4] transition-colors w-full py-2 ${
                      isExpanded
                        ? "text-[#e5e5e7] font-semibold"
                        : "text-[#858586]"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {capability.title}
                  </button>
                  {isExpanded && (
                    <div className="mt-3 mb-2 pl-0">
                      <div className="w-full h-[200px] rounded-2xl overflow-hidden mb-3">
                        <img
                          src={capability.image}
                          alt={capability.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className="text-[14px] text-[#cececf] leading-[1.5] text-left"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {typeof capability.description === "string" ? (
                          <p>{capability.description}</p>
                        ) : (
                          capability.description
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden md:flex gap-[72px] items-start">
          {/* Left - Tabs */}
          <div className="flex flex-col gap-2 w-[512px]">
            {capabilitiesData.map((capability, index) => (
              <TabItem
                key={capability.id}
                capability={capability}
                isActive={index === activeIndex}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>

          {/* Right - Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Image */}
            <div className="h-[400px] rounded-2xl overflow-hidden relative">
              {capabilitiesData.map((capability, index) => (
                <img
                  key={capability.id}
                  src={capability.image}
                  alt={capability.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                />
              ))}
            </div>

            {/* Text Content - expands to fit, no scroll */}
            <div className="flex flex-col gap-4">
              {capabilitiesData.map((capability, index) =>
                index === activeIndex ? (
                  <React.Fragment key={capability.id}>
                    <h3
                      className="text-[32px] font-semibold text-[#e5e5e7] leading-[1.4]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {capability.title}
                    </h3>
                    <div
                      className="text-base text-[#cececf] leading-[1.5]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {typeof capability.description === "string" ? (
                        <p>{capability.description}</p>
                      ) : (
                        capability.description
                      )}
                    </div>
                  </React.Fragment>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

