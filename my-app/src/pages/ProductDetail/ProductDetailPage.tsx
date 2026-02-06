import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import cpuChipIcon from "../../assets/cpu-chip-icon.png";

type PartData = {
  id: number;
  mpn: string;
  manufacturer: string;
  category: string;
  description: string;
  parametric?: {
    capacity?: string;
    ddrType?: string;
    formFactor?: string;
    speed?: string;
    moduleType?: string;
  };
};

const tabs = [
  "Details",
  "Alternatives",
  "Documents",
  "RFQs",
  "Quotes",
  "Projects",
  "Pricing",
  "Sourcing Analysis",
];

export const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const part = (location.state?.part as PartData) || {
    id: 1,
    mpn: "M378A2G43CB3-CWE",
    manufacturer: "Samsung",
    category: "Memory Modules - Laptop Memory Modules",
    description: "Samsung 16GB DDR4 3200 UDIMM 1.2V Mem...",
    parametric: {
      capacity: "32GB",
      ddrType: "DDR5",
      formFactor: "ECC SODIMM",
      speed: "4800 MHz",
      moduleType: "ECC SODIMM",
    },
  };
  const { type = "hardware", category = "memory-modules", subtype = "laptop-memory-modules" } =
    location.state?.context || {};
  const [activeTab, setActiveTab] = useState("Details");
  const [generalExpanded, setGeneralExpanded] = useState(true);
  const [parametricExpanded, setParametricExpanded] = useState(true);

  const typeDisplay = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";
  const categoryDisplay = (category?.replace(/-/g, " ") || "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  const subtypeDisplay = (subtype?.replace(/-/g, " ") || "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  const categoryShort = part.category.split(" - ")[0] || part.category;

  const handleBackToResults = () => {
    navigate(`/category/${type}/${category}/${subtype}`);
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Header />

      {/* Breadcrumbs */}
      <section className="pt-24 pb-6">
        <div className="max-w-[1280px] mx-auto px-20">
          <nav className="text-sm text-[#8e8e8f]">
            <span
              className="hover:text-[#b6b6b7] cursor-pointer"
              onClick={() => navigate("/by-category")}
            >
              Parts
            </span>
            <span className="mx-2">/</span>
            <span
              className="hover:text-[#b6b6b7] cursor-pointer"
              onClick={() => navigate("/by-category")}
            >
              By Category
            </span>
            <span className="mx-2">/</span>
            <span
              className="hover:text-[#b6b6b7] cursor-pointer"
              onClick={() => navigate("/by-category")}
            >
              {typeDisplay} / {categoryDisplay} / {subtypeDisplay}
            </span>
            <span className="mx-2">/</span>
            <span className="text-[#b6b6b7]">{part.mpn}</span>
          </nav>
        </div>
      </section>

      {/* Product Title Section */}
      <section className="pb-8">
        <div className="max-w-[1280px] mx-auto px-20">
          <div className="flex justify-between items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center border-l-2 border-[#99c221] px-4 mb-4">
                <span
                  className="text-2xl text-[#99c221] leading-[1.1]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {categoryShort}
                </span>
              </div>
              <h1
                className="text-[48px] font-semibold text-[#fcfdfc] mb-2"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {part.mpn}
              </h1>
              <p
                className="text-xl text-[#8e8e8f]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {part.manufacturer}
              </p>
            </div>
            <div className="shrink-0">
              <img
                src={cpuChipIcon}
                alt={part.mpn}
                className="w-48 h-36 object-contain"
                style={{ filter: "grayscale(100%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-[#1C1D22]">
        <div className="max-w-[1280px] mx-auto px-20">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-[#fcfdfc] border-b-2 border-[#99c221]"
                    : "text-[#8e8e8f] hover:text-[#b6b6b7]"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content - Details tab plates */}
      <section className="pb-24 pt-8">
        <div className="max-w-[1280px] mx-auto px-20">
          {activeTab === "Details" && (
            <div className="relative overflow-visible bg-[#0F0F0F] border border-[#1C1D22]">
              {/* Corner circles */}
              <span className="absolute top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />

              {/* General Information - expandable */}
              <button
                onClick={() => setGeneralExpanded(!generalExpanded)}
                className="w-full flex items-center justify-between px-2 text-left hover:opacity-90 transition-opacity"
                style={{
                  height: 88,
                  background: "var(--Main-Gray-Scale-900, #111215)",
                }}
              >
                <span
                  className="text-base font-semibold text-[#fcfdfc]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  General Information
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`transition-transform ${generalExpanded ? "rotate-180" : ""}`}
                  style={{ color: "#B6B6B7" }}
                >
                  <path d="M12 15L7 10H17L12 15Z" fill="currentColor" />
                </svg>
              </button>
              {generalExpanded && (
                <div>
                  <div
                    className="flex items-center gap-4 flex-1 min-w-0 border-b border-[#1C1D22] px-2"
                    style={{ height: 72 }}
                  >
                    <div
                      className="flex flex-col justify-center shrink-0"
                      style={{ width: 408, height: 72 }}
                    >
                      <span className="text-sm text-[#8e8e8f]">Category</span>
                    </div>
                    <div
                      className="flex flex-col justify-center flex-1 min-w-0"
                      style={{ height: 72 }}
                    >
                      <span className="text-sm text-[#fcfdfc]">{part.category}</span>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-4 flex-1 min-w-0 px-2"
                    style={{ height: 72 }}
                  >
                    <div
                      className="flex flex-col justify-center shrink-0"
                      style={{ width: 408, height: 72 }}
                    >
                      <span className="text-sm text-[#8e8e8f]">Manufacturer</span>
                    </div>
                    <div
                      className="flex flex-col justify-center flex-1 min-w-0"
                      style={{ height: 72 }}
                    >
                      <span className="text-sm text-[#fcfdfc]">{part.manufacturer}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Parametric Data - expandable, same style as General Information */}
              <button
                onClick={() => setParametricExpanded(!parametricExpanded)}
                className="w-full flex items-center justify-between px-2 text-left hover:opacity-90 transition-opacity"
                style={{
                  height: 88,
                  background: "var(--Main-Gray-Scale-900, #111215)",
                }}
              >
                <span
                  className="text-base font-semibold text-[#fcfdfc]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Parametric Data
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`transition-transform ${parametricExpanded ? "rotate-180" : ""}`}
                  style={{ color: "#B6B6B7" }}
                >
                  <path d="M12 15L7 10H17L12 15Z" fill="currentColor" />
                </svg>
              </button>
              {parametricExpanded && part.parametric && (
                <div>
                  {part.parametric.capacity && (
                    <div
                      className="flex items-center gap-4 flex-1 min-w-0 px-2"
                      style={{ height: 72 }}
                    >
                      <div
                        className="flex flex-col justify-center shrink-0"
                        style={{ width: 408, height: 72 }}
                      >
                        <span className="text-sm text-[#8e8e8f]">Capacity</span>
                      </div>
                      <div
                        className="flex flex-col justify-center flex-1 min-w-0"
                        style={{ height: 72 }}
                      >
                        <span className="text-sm text-[#fcfdfc]">{part.parametric.capacity}</span>
                      </div>
                    </div>
                  )}
                  {part.parametric.ddrType && (
                    <div
                      className="flex items-center gap-4 flex-1 min-w-0 px-2"
                      style={{ height: 72 }}
                    >
                      <div
                        className="flex flex-col justify-center shrink-0"
                        style={{ width: 408, height: 72 }}
                      >
                        <span className="text-sm text-[#8e8e8f]">DDR Type</span>
                      </div>
                      <div
                        className="flex flex-col justify-center flex-1 min-w-0"
                        style={{ height: 72 }}
                      >
                        <span className="text-sm text-[#fcfdfc]">{part.parametric.ddrType}</span>
                      </div>
                    </div>
                  )}
                  {part.parametric.formFactor && (
                    <div
                      className="flex items-center gap-4 flex-1 min-w-0 px-2"
                      style={{ height: 72 }}
                    >
                      <div
                        className="flex flex-col justify-center shrink-0"
                        style={{ width: 408, height: 72 }}
                      >
                        <span className="text-sm text-[#8e8e8f]">Form Factor</span>
                      </div>
                      <div
                        className="flex flex-col justify-center flex-1 min-w-0"
                        style={{ height: 72 }}
                      >
                        <span className="text-sm text-[#fcfdfc]">{part.parametric.formFactor}</span>
                      </div>
                    </div>
                  )}
                  {part.parametric.speed && (
                    <div
                      className="flex items-center gap-4 flex-1 min-w-0 px-2"
                      style={{ height: 72 }}
                    >
                      <div
                        className="flex flex-col justify-center shrink-0"
                        style={{ width: 408, height: 72 }}
                      >
                        <span className="text-sm text-[#8e8e8f]">Speed</span>
                      </div>
                      <div
                        className="flex flex-col justify-center flex-1 min-w-0"
                        style={{ height: 72 }}
                      >
                        <span className="text-sm text-[#fcfdfc]">{part.parametric.speed}</span>
                      </div>
                    </div>
                  )}
                  {part.parametric.moduleType && (
                    <div
                      className="flex items-center gap-4 flex-1 min-w-0 px-2"
                      style={{ height: 72 }}
                    >
                      <div
                        className="flex flex-col justify-center shrink-0"
                        style={{ width: 408, height: 72 }}
                      >
                        <span className="text-sm text-[#8e8e8f]">Module Type</span>
                      </div>
                      <div
                        className="flex flex-col justify-center flex-1 min-w-0"
                        style={{ height: 72 }}
                      >
                        <span className="text-sm text-[#fcfdfc]">{part.parametric.moduleType}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {activeTab !== "Details" && (
            <div
              className="p-8 text-center text-[#8e8e8f]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {activeTab} content coming soon
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
