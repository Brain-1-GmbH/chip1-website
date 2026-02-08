import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import cpuChipIcon from "../../assets/cpu-chip-icon.png";
import cardStorage from "../../assets/card-storage.png";
import cardMemory from "../../assets/card-memory.png";
import cardPeripherals from "../../assets/card-peripherals.png";
import cardExpansion from "../../assets/card-expansion.png";
import cardPower from "../../assets/card-power.png";
import cardMotherboard from "../../assets/card-motherboard.png";
import cardGpu from "../../assets/card-gpu.png";

const hardwareCardImages = [
  cpuChipIcon,
  cardStorage,
  cardMemory,
  cardPeripherals,
  cardExpansion,
  cardPower,
  cardMotherboard,
  cardGpu,
];

// Mock data for Hardware categories
const hardwareCategories = [
  {
    title: "CPUs",
    count: 3643,
    image: 0,
    subcategories: [
      { name: "Desktop", count: 1222 },
      { name: "Embedded", count: 385 },
      { name: "Mobile", count: 749 },
      { name: "Server", count: 1208 },
      { name: "Workstation", count: 79 },
    ],
  },
  {
    title: "Storage",
    count: 2847,
    image: 1,
    subcategories: [
      { name: "Consumer Hard Disk Drives", count: 200 },
      { name: "Consumer Solid State Drives", count: 584 },
      { name: "Server Hard Disk Drives", count: 781 },
      { name: "Server Solid State Drives", count: 964 },
      { name: "USB Flash Drives & Memory Cards", count: 318 },
    ],
  },
  {
    title: "Memory Modules",
    count: 2370,
    image: 2,
    subcategories: [
      { name: "Desktop Memory Modules", count: 466 },
      { name: "Laptop Memory Modules", count: 429 },
      { name: "Server Memory Modules", count: 1475 },
    ],
  },
  {
    title: "Peripherals & Accessories",
    count: 1018,
    image: 3,
    subcategories: [
      { name: "Cooling Fans - Heatsinks", count: 698 },
      { name: "Single Board Computers", count: 83 },
      { name: "Transceiver Modules", count: 237 },
    ],
  },
  {
    title: "Expansion Cards",
    count: 962,
    image: 4,
    subcategories: [
      { name: "Cable Assemblies", count: 395 },
      { name: "Host Bus Adapters", count: 83 },
    ],
  },
  {
    title: "Power Supplies",
    count: 582,
    image: 5,
    subcategories: [
      { name: "Consumer Power Supplies", count: 417 },
      { name: "Industrial Power Supplies", count: 51 },
    ],
  },
  {
    title: "Motherboards",
    count: 520,
    image: 6,
    subcategories: [
      { name: "Desktop Motherboards", count: 26 },
      { name: "Server Motherboards", count: 494 },
    ],
  },
  {
    title: "GPUs",
    count: 336,
    image: 7,
    subcategories: [
      { name: "Accelerator Cards", count: 38 },
      { name: "Gaming Cards", count: 244 },
    ],
  },
];

// Mock data for Semiconductors categories
const semiconductorCategories = [
  {
    title: "Microcontrollers",
    count: 15234,
    icon: "🔧",
    subcategories: [
      { name: "8-bit Microcontrollers", count: 3421 },
      { name: "16-bit Microcontrollers", count: 2845 },
      { name: "32-bit Microcontrollers", count: 8968 },
    ],
  },
  {
    title: "Memory ICs",
    count: 8932,
    icon: "💿",
    subcategories: [
      { name: "DRAM", count: 2341 },
      { name: "SRAM", count: 1234 },
      { name: "Flash Memory", count: 4357 },
      { name: "EEPROM", count: 1000 },
    ],
  },
  {
    title: "Analog ICs",
    count: 6721,
    icon: "📊",
    subcategories: [
      { name: "Amplifiers", count: 2341 },
      { name: "Comparators", count: 1234 },
      { name: "Voltage Regulators", count: 3146 },
    ],
  },
  {
    title: "Power Management",
    count: 5432,
    icon: "🔋",
    subcategories: [
      { name: "Voltage Regulators", count: 2341 },
      { name: "Power Controllers", count: 1234 },
      { name: "Battery Management", count: 1857 },
    ],
  },
  {
    title: "RF & Wireless",
    count: 4321,
    icon: "📡",
    subcategories: [
      { name: "RF Amplifiers", count: 1234 },
      { name: "RF Switches", count: 987 },
      { name: "Wireless Modules", count: 2100 },
    ],
  },
];

export const ByCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type") || "hardware";
  const [activeTab, setActiveTab] = useState<"hardware" | "semiconductors">(
    typeParam === "semiconductors" ? "semiconductors" : "hardware"
  );

  // Update tab when query parameter changes
  useEffect(() => {
    const newType = typeParam === "semiconductors" ? "semiconductors" : "hardware";
    setActiveTab(newType);
  }, [typeParam]);

  const categories = activeTab === "hardware" ? hardwareCategories : semiconductorCategories;

  const handleSubcategoryClick = (categoryTitle: string, subcategoryName: string) => {
    const categorySlug = categoryTitle.toLowerCase().replace(/\s+/g, "-");
    const subcategorySlug = subcategoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${activeTab}/${categorySlug}/${subcategorySlug}`);
  };

  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-20">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <nav className="text-sm text-[#8e8e8f]">
              <span className="hover:text-[#b6b6b7] cursor-pointer">Parts</span>
              <span className="mx-2">/</span>
              <span className="text-[#b6b6b7]">By Category</span>
            </nav>
          </div>

          {/* Tag */}
          <div className="flex items-center border-l-2 border-[#99c221] px-4 mb-4">
            <span
              className="text-2xl text-[#99c221] capitalize leading-[1.1]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Browse by Category
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[56px] font-semibold leading-[1.1] mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background:
                "radial-gradient(ellipse at 75% 100%, #b1b2b1 0%, #d2d4d2 50%, #f4f5f4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Explore Our Parts Catalog
          </h1>

          {/* Subtitle */}
          <p
            className="text-2xl text-[#8e8e8f] leading-[1.4] mb-12"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Find the components you need by browsing through our comprehensive categories
          </p>

          {/* Tabs */}
          <div className="mb-8 border-b border-[#494B59]">
            <div className="flex gap-8">
              <button
                onClick={() => {
                  setActiveTab("hardware");
                  navigate("/by-category?type=hardware", { replace: true });
                }}
                className={`pb-4 px-1 text-base font-medium transition-colors ${
                  activeTab === "hardware"
                    ? "text-[#fcfdfc] border-b-2 border-[#99c221]"
                    : "text-[#8e8e8f] hover:text-[#b6b6b7]"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Hardware
              </button>
              <button
                onClick={() => {
                  setActiveTab("semiconductors");
                  navigate("/by-category?type=semiconductors", { replace: true });
                }}
                className={`pb-4 px-1 text-base font-medium transition-colors ${
                  activeTab === "semiconductors"
                    ? "text-[#fcfdfc] border-b-2 border-[#99c221]"
                    : "text-[#8e8e8f] hover:text-[#b6b6b7]"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Semiconductors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="pb-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.title}
                className="relative overflow-visible transition-all cursor-pointer group/card border border-[#1C1D22] bg-transparent hover:bg-[#111215]"
                style={{
                  display: "flex",
                  padding: "var(--gap-padding-l, 24px)",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                {/* Corner circles - on the corners, centered at vertex */}
                <span className="absolute top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22] group-hover/card:bg-[#1C1D22] transition-colors" aria-hidden />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22] group-hover/card:bg-[#1C1D22] transition-colors" aria-hidden />
                <span className="absolute bottom-0 left-0 w-1.5 h-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22] group-hover/card:bg-[#1C1D22] transition-colors" aria-hidden />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22] group-hover/card:bg-[#1C1D22] transition-colors" aria-hidden />
                {/* Category Icon - 152×115px, black & white */}
                <img
                  src={
                    activeTab === "hardware"
                      ? hardwareCardImages[(category as { image?: number }).image ?? 0]
                      : cpuChipIcon
                  }
                  alt={category.title}
                  className="object-contain"
                  style={{ width: 152, height: 115, filter: "grayscale(100%)" }}
                />

                {/* Category Title */}
                <h3
                  className="text-lg font-semibold text-[#fcfdfc] break-words"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {category.title} ({category.count.toLocaleString()})
                </h3>

                {/* Subcategories */}
                <ul className="flex flex-col gap-0 w-full overflow-visible">
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory.name}
                      onClick={() => handleSubcategoryClick(category.title, subcategory.name)}
                      className="flex items-center gap-2 text-sm text-[#b6b6b7] hover:text-[#E5E5E7] cursor-pointer group/item transition-colors break-words"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        width: "348px",
                        maxWidth: "100%",
                        padding: "16px 0",
                      }}
                    >
                      <span className="flex-1 min-w-0">
                        {subcategory.name} ({subcategory.count.toLocaleString()})
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M9.03885 3.97286L16.5389 11.4729C16.6086 11.5425 16.6639 11.6252 16.7016 11.7163C16.7394 11.8073 16.7588 11.9049 16.7588 12.0035C16.7588 12.1021 16.7394 12.1996 16.7016 12.2907C16.6639 12.3817 16.6086 12.4645 16.5389 12.5341L9.03885 20.0341C8.89812 20.1748 8.70725 20.2539 8.50823 20.2539C8.30921 20.2539 8.11833 20.1748 7.9776 20.0341C7.83687 19.8934 7.75781 19.7025 7.75781 19.5035C7.75781 19.3045 7.83687 19.1136 7.9776 18.9729L14.9479 12.0035L7.9776 5.03411C7.90792 4.96443 7.85265 4.88171 7.81493 4.79066C7.77722 4.69962 7.75781 4.60204 7.75781 4.50349C7.75781 4.40494 7.77722 4.30736 7.81493 4.21632C7.85265 4.12527 7.90792 4.04255 7.9776 3.97286C8.04729 3.90318 8.13001 3.84791 8.22106 3.81019C8.3121 3.77248 8.40968 3.75307 8.50823 3.75307C8.60678 3.75307 8.70436 3.77248 8.7954 3.81019C8.88645 3.84791 8.96917 3.90318 9.03885 3.97286Z"
                          className="fill-[#545556] group-hover/item:fill-white transition-colors"
                        />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
