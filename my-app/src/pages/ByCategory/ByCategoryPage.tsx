import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

// Mock data for Hardware categories
const hardwareCategories = [
  {
    title: "CPUs",
    count: 3643,
    icon: "🖥️",
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
    icon: "💾",
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
    icon: "🧠",
    subcategories: [
      { name: "Desktop Memory Modules", count: 466 },
      { name: "Laptop Memory Modules", count: 429 },
      { name: "Server Memory Modules", count: 1475 },
    ],
  },
  {
    title: "Peripherals & Accessories",
    count: 1018,
    icon: "🌀",
    subcategories: [
      { name: "Cooling Fans - Heatsinks", count: 698 },
      { name: "Single Board Computers", count: 83 },
      { name: "Transceiver Modules", count: 237 },
    ],
  },
  {
    title: "Expansion Cards",
    count: 962,
    icon: "🔌",
    subcategories: [
      { name: "Cable Assemblies", count: 395 },
      { name: "Host Bus Adapters", count: 83 },
    ],
  },
  {
    title: "Power Supplies",
    count: 582,
    icon: "⚡",
    subcategories: [
      { name: "Consumer Power Supplies", count: 417 },
      { name: "Industrial Power Supplies", count: 51 },
    ],
  },
  {
    title: "Motherboards",
    count: 520,
    icon: "📱",
    subcategories: [
      { name: "Desktop Motherboards", count: 26 },
      { name: "Server Motherboards", count: 494 },
    ],
  },
  {
    title: "GPUs",
    count: 336,
    icon: "🎮",
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
        <div className="max-w-[1280px] mx-auto px-20">
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
                onClick={() => setActiveTab("hardware")}
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
                onClick={() => setActiveTab("semiconductors")}
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
        <div className="max-w-[1280px] mx-auto px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.title}
                className="bg-[#171819] border border-[#292a2a] rounded-2xl p-6 hover:border-[rgba(184,212,52,0.4)] transition-all hover:shadow-lg hover:shadow-[rgba(184,212,52,0.15)] cursor-pointer group"
              >
                {/* Category Icon */}
                <div className="text-4xl mb-4">{category.icon}</div>

                {/* Category Title */}
                <h3
                  className="text-lg font-semibold text-[#fcfdfc] mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {category.title} ({category.count.toLocaleString()})
                </h3>

                {/* Subcategories */}
                <ul className="space-y-3">
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory.name}
                      onClick={() => handleSubcategoryClick(category.title, subcategory.name)}
                      className="flex items-center justify-between text-sm text-[#b6b6b7] hover:text-[#fcfdfc] cursor-pointer group transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <span>
                        {subcategory.name} ({subcategory.count.toLocaleString()})
                      </span>
                      <span className="text-[#8e8e8f] group-hover:text-[#99c221] transition-colors">→</span>
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
