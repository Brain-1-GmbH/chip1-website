import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Search } from "@carbon/icons-react";

// Mock data for parts
const mockParts = [
  {
    id: 1,
    mpn: "M378A2G43CB3-CWE",
    manufacturer: "Samsung",
    category: "Memory Modules - Laptop Memory Modules",
    description: "Samsung 16GB DDR4 3200 UDIMM 1.2V Mem...",
    lifecycle: "—",
    availability: "—",
    countryOfOrigin: "—",
    riskScore: "—",
    riskLevel: "—",
    parametric: { capacity: "32GB", ddrType: "DDR5", formFactor: "ECC SODIMM", speed: "4800 MHz", moduleType: "ECC SODIMM" },
  },
  {
    id: 2,
    mpn: "HMA82GS6CJR8N-XN",
    manufacturer: "SK Hynix",
    category: "Memory Modules - Desktop Memory Modules",
    description: "SK Hynix 16GB DDR4 3200 SODIMM 1.2V...",
    lifecycle: "—",
    availability: "—",
    countryOfOrigin: "—",
    riskScore: "—",
    riskLevel: "—",
    parametric: { capacity: "16GB", ddrType: "DDR4", formFactor: "SODIMM", speed: "3200 MHz", moduleType: "SODIMM" },
  },
  {
    id: 3,
    mpn: "CT16G4DFD832A",
    manufacturer: "Crucial",
    category: "Memory Modules - Desktop Memory Modules",
    description: "Crucial 16GB DDR4 3200 UDIMM 1.2V...",
    lifecycle: "—",
    availability: "—",
    countryOfOrigin: "—",
    riskScore: "—",
    riskLevel: "—",
    parametric: { capacity: "16GB", ddrType: "DDR4", formFactor: "UDIMM", speed: "3200 MHz", moduleType: "UDIMM" },
  },
  {
    id: 4,
    mpn: "KVR32N22D8/16",
    manufacturer: "Kingston",
    category: "Memory Modules - Server Memory Modules",
    description: "Kingston 16GB DDR4 3200 UDIMM 1.2V...",
    lifecycle: "—",
    availability: "—",
    countryOfOrigin: "—",
    riskScore: "—",
    riskLevel: "—",
    parametric: { capacity: "16GB", ddrType: "DDR4", formFactor: "UDIMM", speed: "3200 MHz", moduleType: "UDIMM" },
  },
  {
    id: 5,
    mpn: "F4-3200C16D-16GIS",
    manufacturer: "G.Skill",
    category: "Memory Modules - Desktop Memory Modules",
    description: "G.Skill 16GB DDR4 3200 UDIMM 1.2V...",
    lifecycle: "—",
    availability: "—",
    countryOfOrigin: "—",
    riskScore: "—",
    riskLevel: "—",
    parametric: { capacity: "16GB", ddrType: "DDR4", formFactor: "UDIMM", speed: "3200 MHz", moduleType: "UDIMM" },
  },
];

export const CategoryResultsPage: React.FC = () => {
  const { type, category, subtype } = useParams<{
    type: string;
    category: string;
    subtype: string;
  }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter states
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [selectedDdrTypes, setSelectedDdrTypes] = useState<string[]>([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState<string[]>([]);

  const capacities = ["1GB", "2GB", "4GB", "8GB", "16GB", "32GB", "48GB"];
  const ddrTypes = ["DDR2", "DDR3", "DDR4", "DDR5"];
  const formFactors = ["DIMM", "SODIMM", "ECC DIMM", "UDIMM", "RDIMM", "LRDIMM", "MicroDIMM", "MiniDIMM"];

  const handleCapacityToggle = (capacity: string) => {
    setSelectedCapacities((prev) =>
      prev.includes(capacity) ? prev.filter((c) => c !== capacity) : [...prev, capacity]
    );
  };

  const handleDdrTypeToggle = (ddrType: string) => {
    setSelectedDdrTypes((prev) =>
      prev.includes(ddrType) ? prev.filter((d) => d !== ddrType) : [...prev, ddrType]
    );
  };

  const handleFormFactorToggle = (formFactor: string) => {
    setSelectedFormFactors((prev) =>
      prev.includes(formFactor) ? prev.filter((f) => f !== formFactor) : [...prev, formFactor]
    );
  };

  const clearFilters = () => {
    setSelectedCapacities([]);
    setSelectedDdrTypes([]);
    setSelectedFormFactors([]);
  };

  const appliedFiltersCount =
    selectedCapacities.length + selectedDdrTypes.length + selectedFormFactors.length;

  const categoryDisplayName = (category?.replace(/-/g, " ") || "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  const subtypeDisplayName = subtype?.replace(/-/g, " ") || "";
  const typeDisplayName = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12">
        <div className="max-w-[1280px] mx-auto px-20">
          {/* Breadcrumbs */}
          <div className="mb-6">
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
              <span className="text-[#b6b6b7] capitalize">
                {typeDisplayName} / {categoryDisplayName} / {subtypeDisplayName}
              </span>
            </nav>
          </div>

          {/* Tag */}
          <div className="flex items-center border-l-2 border-[#99c221] px-4 mb-4">
            <span
              className="text-2xl text-[#99c221] capitalize leading-[1.1]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {categoryDisplayName}
            </span>
          </div>

          {/* Title - card name from main page (e.g. CPUs) */}
          <h1
            className="text-[56px] font-semibold leading-[1.3] mb-4 pb-1"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background:
                "radial-gradient(ellipse at 75% 100%, #b1b2b1 0%, #d2d4d2 50%, #f4f5f4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {categoryDisplayName}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-[1280px] mx-auto px-20">
          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <div className="relative overflow-visible w-64 shrink-0 bg-[#0F0F0F] border border-[#1C1D22] p-4 h-fit sticky top-24">
              {/* Corner circles */}
              <span className="absolute top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <div className="mb-6">
                <h2
                  className="text-base font-semibold text-[#fcfdfc] mb-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Filters
                </h2>
                <p className="text-sm text-[#8e8e8f]">{appliedFiltersCount} Applied</p>
              </div>

              {/* Capacity Filter */}
              <div className="mb-6">
                <h3
                  className="text-sm font-medium text-[#fcfdfc] mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Capacity/Size
                </h3>
                <div className="space-y-2">
                  {capacities.slice(0, 4).map((capacity) => (
                    <label
                      key={capacity}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#fcfdfc] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCapacities.includes(capacity)}
                        onChange={() => handleCapacityToggle(capacity)}
                        className="w-4 h-4 text-[#99c221] focus:ring-[#99c221] focus:ring-offset-0"
                    style={{
                      borderRadius: "var(--Radius-xs, 4px)",
                      border: "1px solid var(--Main-Primary-Scale-Primary, #99C221)",
                      background: "var(--Mobile-Basic-Layer-1, #1E2024)",
                      appearance: "none",
                      WebkitAppearance: "none",
                      accentColor: "#99C221",
                    }}
                      />
                      <span className="text-sm text-[#b6b6b7]">{capacity}</span>
                    </label>
                  ))}
                  <button className="text-sm text-[#99c221] hover:text-[#b6db40] transition-colors">
                    See More
                  </button>
                </div>
              </div>

              {/* DDR Type Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-sm font-medium text-[#fcfdfc]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    DDR Type ({ddrTypes.length})
                  </h3>
                  {selectedDdrTypes.length > 0 && (
                    <span className="text-xs text-[#8e8e8f]">
                      {selectedDdrTypes.length} selected{" "}
                      <button
                        onClick={() => setSelectedDdrTypes([])}
                        className="text-[#99c221] hover:text-[#b6db40] transition-colors"
                      >
                        X
                      </button>
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {ddrTypes.map((ddrType) => (
                    <label
                      key={ddrType}
                      className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-colors ${
                        selectedDdrTypes.includes(ddrType)
                          ? "bg-[#252833] border border-[rgba(184,212,52,0.2)]"
                          : "hover:bg-[#252833]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedDdrTypes.includes(ddrType)}
                        onChange={() => handleDdrTypeToggle(ddrType)}
                        className="w-4 h-4 text-[#99c221] focus:ring-[#99c221] focus:ring-offset-0"
                    style={{
                      borderRadius: "var(--Radius-xs, 4px)",
                      border: "1px solid var(--Main-Primary-Scale-Primary, #99C221)",
                      background: "var(--Mobile-Basic-Layer-1, #1E2024)",
                      appearance: "none",
                      WebkitAppearance: "none",
                      accentColor: "#99C221",
                    }}
                      />
                      <span className="text-sm text-[#b6b6b7]">{ddrType}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form Factor Filter */}
              <div className="mb-6">
                <h3
                  className="text-sm font-medium text-[#fcfdfc] mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Form Factor ({formFactors.length})
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {formFactors.map((formFactor) => (
                    <label
                      key={formFactor}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#fcfdfc] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFormFactors.includes(formFactor)}
                        onChange={() => handleFormFactorToggle(formFactor)}
                        className="w-4 h-4 text-[#99c221] focus:ring-[#99c221] focus:ring-offset-0"
                    style={{
                      borderRadius: "var(--Radius-xs, 4px)",
                      border: "1px solid var(--Main-Primary-Scale-Primary, #99C221)",
                      background: "var(--Mobile-Basic-Layer-1, #1E2024)",
                      appearance: "none",
                      WebkitAppearance: "none",
                      accentColor: "#99C221",
                    }}
                      />
                      <span className="text-sm text-[#b6b6b7]">{formFactor}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons - bottom centered */}
              <div className="flex flex-col items-center gap-2 pt-4 border-t border-[#1C1D22]">
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#8e8e8f] hover:text-[#b6b6b7] transition-colors"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Clear
                </button>
                <button
                  onClick={() => {}}
                  className="flex h-10 w-full max-w-[420px] justify-center items-center gap-2 text-[#0F0F0F] font-medium hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    padding: "16px",
                    borderRadius: "var(--Radius-l, 24px)",
                    borderTop: "1px solid var(--Main-Primary-Scale-300, #CEEA6C)",
                    background: "var(--Main-Primary-Scale-Primary, #99C221)",
                    boxShadow: "0 4px 4px 0 rgba(17, 18, 21, 0.35)",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Right Content - Results */}
            <div className="relative overflow-visible flex-1 bg-[#0F0F0F] border border-[#1C1D22]">
              {/* Corner circles */}
              <span className="absolute top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
              {/* Parts count (left) + Search Bar (right) */}
              <div className="p-4 border-b border-[#1C1D22] flex items-center justify-between bg-[#0F0F0F]">
                <p
                  className="text-sm text-[#8e8e8f]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {mockParts.length} parts
                </p>
                <div className="relative w-64">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
                    style={{ color: "#B6B6B7" }}
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-[#fcfdfc] placeholder-[#8e8e8f] focus:outline-none focus:ring-2 focus:ring-[#99c221] focus:border-transparent transition-colors"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      borderRadius: "48px",
                      border: "1px solid rgba(77, 77, 78, 0.34)",
                      background: "#161616",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0F0F0F] border-b border-[#1C1D22]">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#99c221] focus:ring-[#99c221] focus:ring-offset-0"
                    style={{
                      borderRadius: "var(--Radius-xs, 4px)",
                      border: "1px solid var(--Main-Primary-Scale-Primary, #99C221)",
                      background: "var(--Mobile-Basic-Layer-1, #1E2024)",
                      appearance: "none",
                      WebkitAppearance: "none",
                      accentColor: "#99C221",
                    }}
                        />
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold text-[#fcfdfc]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Mfr Part # | Manufacturer
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold text-[#fcfdfc]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Category | Description
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold text-[#fcfdfc]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Lifecycle | Availability
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold text-[#fcfdfc]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Country of Origin
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-semibold text-[#fcfdfc]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Risk Score | Level
                      </th>
                      <th className="px-4 py-3 text-left">
                        <span className="text-[#8e8e8f]">⋯</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1D22]">
                    {mockParts.map((part) => (
                      <tr
                        key={part.id}
                        className="hover:bg-[#252833] transition-colors cursor-pointer"
                        onClick={() =>
                          navigate("/product", {
                            state: { part, context: { type, category, subtype } },
                          })
                        }
                      >
                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-[#99c221] focus:ring-[#99c221] focus:ring-offset-0"
                    style={{
                      borderRadius: "var(--Radius-xs, 4px)",
                      border: "1px solid var(--Main-Primary-Scale-Primary, #99C221)",
                      background: "var(--Mobile-Basic-Layer-1, #1E2024)",
                      appearance: "none",
                      WebkitAppearance: "none",
                      accentColor: "#99C221",
                    }}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span
                              className="text-sm font-medium text-[#fcfdfc]"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {part.mpn}
                            </span>
                            <span
                              className="text-sm text-[#8e8e8f]"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {part.manufacturer}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span
                              className="text-sm text-[#fcfdfc]"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {part.category}
                            </span>
                            <span
                              className="text-sm text-[#8e8e8f]"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {part.description}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span
                              className="text-sm text-[#fcfdfc]"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {part.lifecycle}
                            </span>
                            <span
                              className="text-sm text-[#8e8e8f]"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {part.availability}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className="text-sm text-[#fcfdfc]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {part.countryOfOrigin}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span
                              className="text-sm text-[#fcfdfc]"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {part.riskScore}
                            </span>
                            <span
                              className="text-sm text-[#8e8e8f]"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {part.riskLevel}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                          <button className="text-[#8e8e8f] hover:text-[#b6b6b7] transition-colors">
                            ⋯
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
