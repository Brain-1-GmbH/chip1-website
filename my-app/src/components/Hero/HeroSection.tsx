import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Close, Search, Upload, Box } from "@carbon/icons-react";
import axios from "axios";

import { CategoryCard } from "./CategoryCard";
import { ActionButton } from "./ActionButton";
import { SimpleLoader } from "../UI/SimpleLoader";

interface SearchResult {
  id: string;
  searchDescription?: string;
  mpn: string;
  additionalSearchDescription?: string;
  imagePath: string;
  type: "LOCAL" | "EXTERNAL";
  manufacturer?: string;
  description?: string;
  images?: string[];
  globalPartId?: string;
}

const categories = [
  { title: "Hardware", subtitle: "13,118 Products" },
  { title: "Semiconductors", subtitle: "743,274 Products" },
  { title: "Manufactures", subtitle: "373 Manufactures" },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [hasExternalResults, setHasExternalResults] = useState(false);
  const [isLoadingExternal, setIsLoadingExternal] = useState(false);
  const [selectedPart, setSelectedPart] = useState<unknown | null>(null);
  const [partDataLoading, setPartDataLoading] = useState<
    string | null | number
  >(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearSearch = () => {
    // Cancel any pending API request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setSearchValue("");
    setSearchResult([]);
    setIsSearching(false);
    setSelectedPart(null);
    setIsDropdownVisible(false);
    setPartDataLoading(null);
    setHasExternalResults(false);
    setIsLoadingExternal(false);
  };


  const handleSearch = (value: string) => {
    if (value.length === 0) return;

    setIsSearching(true);
    setIsDropdownVisible(true);
    setHasExternalResults(false);
    setIsLoadingExternal(false);

    // Always search LOCAL by default
      axios
        .get(
          `/api/transaction/public/searches/global/parts?query=${value}&size=10&scope=LOCAL`
        )
        .then((res) => {
          if (res.data?.data?.length > 0) {
            setSearchResult(
              res.data?.data.map((item: SearchResult) => ({
                ...item,
              imagePath: "",
                type: "LOCAL",
              }))
            );
        } else {
          setSearchResult([]);
          }

          setIsSearching(false);
      })
      .catch(() => {
        setIsSearching(false);
        setSearchResult([]);
        });
  };

  const handleExternalSearch = (value: string) => {
    if (value.length === 0 || hasExternalResults || isLoadingExternal) return;

    setIsLoadingExternal(true);

      axios
        .get(
          `/api/transaction/public/searches/global/parts?query=${value}&size=10&scope=EXTERNAL`
        )
        .then((res) => {
          if (res.data?.data?.length > 0) {
          const externalResults = res.data?.data.map((item: SearchResult) => ({
                ...item,
            imagePath: "",
                type: "EXTERNAL",
          }));
          
          // Merge external results with existing local results
          // Filter out duplicates based on id or mpn
          setSearchResult((prev) => {
            const existingIds = new Set(prev.map(r => r.id));
            const existingMpns = new Set(prev.map(r => r.mpn.toLowerCase()));
            
            const newExternalResults = externalResults.filter(
              (ext: SearchResult) => !existingIds.has(ext.id) && !existingMpns.has(ext.mpn.toLowerCase())
            );
            
            return [...prev, ...newExternalResults];
          });
        }

        setHasExternalResults(true);
        setIsLoadingExternal(false);
      })
      .catch(() => {
        setIsLoadingExternal(false);
      });
  };

  const handleSearchUpdate = (newValue: string) => {
    setSearchValue(newValue);
    handleSearch(newValue);
  };

  const getOnePartData = (part: SearchResult) => {
    // Cancel any previous pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new AbortController for this request
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    // Don't clear selectedPart if we already have one - keep showing current data while loading
    setPartDataLoading(part.id);
    // Keep search results visible while loading - will hide when data loads
    
    let url = `/api/part/public/parts/full-details?id=${part.id}`;

    if (part.globalPartId) {
      url = `${url}&globalPartId=${part.globalPartId}`;
    }

    axios.get(url, { signal: controller.signal })
      .then((res) => {
        setSelectedPart(res.data);
        setPartDataLoading(null);
        // Hide search results dropdown only after data is loaded (but keep results for re-focus)
        setIsDropdownVisible(false);
        abortControllerRef.current = null;
      })
      .catch((error) => {
        // Only handle errors that are not abort errors
        if (!axios.isCancel(error)) {
          console.error("Error fetching part details:", error);
          setPartDataLoading(null);
        }
      });
  };

  const renderPart = () => {
    // @ts-expect-error - TODO: fix this
    const partData = selectedPart?.data?.globalPart;
    // @ts-expect-error - TODO: fix this
    const partInfo = selectedPart?.data?.part;
    const hasData = !!partData;
    const healthScore = partInfo?.chip1HealthScore ?? 0;

    // Info field component for consistent styling
    const InfoField = ({ label, value }: { label: string; value: string | undefined | null }) => {
      const displayValue = value ? String(value) : "N/A";
      const shouldTruncate = displayValue.length > 7;
      const truncatedValue = shouldTruncate ? displayValue.substring(0, 7) + "..." : displayValue;
      
      return (
        <div className="flex flex-col gap-0.5">
          <p className="text-[12px] text-[#cececf] leading-[1.4]">{label}</p>
          <p 
            className="text-[14px] text-[#e5e5e7] font-medium leading-[1.4] truncate"
            title={shouldTruncate ? displayValue : undefined}
          >
            {truncatedValue}
          </p>
        </div>
      );
    };

    return (
      <div className="flex gap-4 items-stretch w-full">
        {/* Part Health */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <p className="text-[16px] font-medium text-[#fcfdfc] leading-[1.4] w-full">
            Part Health
          </p>

          <div className="flex flex-col items-center gap-1">
            <div className="relative w-[197px] h-[107px]">
              {/* Semi-circular gauge */}
              <svg viewBox="0 0 200 110" className="w-full h-full">
                {/* Background arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#3F4451"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Progress arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(Number(healthScore) / 100) * 251.2} 251.2`}
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b6db40" />
                    <stop offset="100%" stopColor="#99c221" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Score text */}
              <p className="absolute top-[43px] left-1/2 -translate-x-1/2 text-[28px] font-medium text-[#ecf0fa]">
                {hasData ? healthScore : "N/A"}
              </p>
              {/* Chip1 Health Score label */}
              <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-[#ecf0fa] opacity-90">
                Chip1 Health Score
              </p>
            </div>
            {/* Risk labels - positioned below the widget */}
            <div className="relative w-[197px] flex justify-between px-1">
              <p className="text-[10px] text-[#b6b6b7]">
                High Risk
              </p>
              <p className="text-[10px] text-[#b6b6b7]">
                Low Risk
              </p>
            </div>
          </div>

          <button className="bg-[#252833] text-[#ecebf5] text-[11px] px-2 py-1 rounded-full hover:bg-[#2f3340] transition-colors">
            See Full Analysis
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gradient-to-b from-transparent via-[#494b59] to-transparent self-stretch" />

        {/* General Information */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <p className="text-[16px] font-medium text-[#fcfdfc] leading-[1.4]">
            General Information
          </p>

          <div className="flex gap-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <InfoField label="Manufacturer" value={partData?.manufacturer} />
              <InfoField label="Category" value={partData?.category} />
              <InfoField label="Packaging" value={partData?.packaging || "Tape and Reel"} />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2 w-[152px] shrink-0">
              <InfoField label="Lifecycle" value={partData?.lifecycleRisk?.lifecycle} />
              <InfoField label="Introduced" value={partData?.introductionDate} />
              <InfoField label="Cage Code" value={partData?.mfrCageCode} />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-2 w-[120px] shrink-0">
              <InfoField label="Lead-Free Status" value={partData?.environmentData?.leadFree || "Compliant"} />
              <InfoField label="RoHS Status" value={partData?.environmentData?.rohsStatus || "Compliant"} />
              <InfoField label="REACH Status" value={partData?.environmentData?.reachStatus || "Unaffected"} />
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-2 w-[104px] shrink-0">
              <InfoField label="ECCN" value={partData?.eccn} />
              <InfoField label="HTSUSA" value={partData?.htsusa || partData?.environmentData?.htsus} />
              <InfoField label="UNSPSC" value={partData?.unspsc} />
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gradient-to-b from-transparent via-[#494b59] to-transparent self-stretch" />

        {/* Alternatives */}
        <div className="flex flex-col gap-4 w-[312px] shrink-0">
          <p className="text-[16px] font-medium text-[#fcfdfc] leading-[1.4]">
            Alternatives
          </p>

          <div className="flex flex-col gap-6">
            {partData?.alternateParts && partData.alternateParts.length > 0 ? (
              [...partData.alternateParts]
                .sort((a: unknown, b: unknown) => {
                  // @ts-expect-error - TODO: fix this
                  const aCompat = (a.compatibility || "").toLowerCase();
                  // @ts-expect-error - TODO: fix this
                  const bCompat = (b.compatibility || "").toLowerCase();
                  
                  // Check if compatibility contains "drop" (for "drop-in" or "drop in")
                  const aIsDropIn = aCompat.includes("drop");
                  const bIsDropIn = bCompat.includes("drop");
                  
                  // Pin-to-pin drop-in replacements should come first
                  if (aIsDropIn && !bIsDropIn) return -1;
                  if (!aIsDropIn && bIsDropIn) return 1;
                  
                  // If both or neither are drop-in, maintain original order
                  return 0;
                })
                .slice(0, 2)
                .map((alt: unknown, index: number) => (
                  <div key={index} className="flex flex-col gap-1">
                    <p className="text-[14px] font-medium text-[#efeff0] leading-[1.4]">
                      {/* @ts-expect-error - TODO: fix this */}
                      {alt.mpn || "N/A"}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] text-[#b6b6b7] leading-[1.4]">
                        {/* @ts-expect-error - TODO: fix this */}
                        {alt.manufacturer || "N/A"}
                      </p>
                      <div className="w-1 h-1 rounded-full bg-[#b6b6b7]" />
                      <p className="text-[14px] text-[#b6b6b7] leading-[1.4] flex-1">
                        {/* @ts-expect-error - TODO: fix this */}
                        {alt.compatibility || "Pin to Pin Replacement"}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] font-medium text-[#efeff0] leading-[1.4]">
                    C2012X7R1E334K
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] text-[#b6b6b7] leading-[1.4]">TDK</p>
                    <div className="w-1 h-1 rounded-full bg-[#b6b6b7]" />
                    <p className="text-[14px] text-[#b6b6b7] leading-[1.4] flex-1">
                      Pin to Pin Drop in Replacement
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] font-medium text-[#efeff0] leading-[1.4]">
                    MCAST21GSB7334KTNA01
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] text-[#b6b6b7] leading-[1.4]">Taiyo Yuden</p>
                    <div className="w-1 h-1 rounded-full bg-[#b6b6b7]" />
                    <p className="text-[14px] text-[#b6b6b7] leading-[1.4] flex-1">
                      Pin to Pin Compatible
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPartTable = () => {
    // @ts-expect-error - TODO: fix this
    const partData = selectedPart?.data?.globalPart;
    // @ts-expect-error - TODO: fix this
    const prices = selectedPart?.data?.prices;
    
    const countries = partData?.countryOfOrigin?.map((c: { country: string }) => c.country).join(", ") || "N/A";
    const leadTime = partData?.pricingData?.minLeadTime || "N/A";
    const lifecycle = partData?.lifecycleRisk?.lifecycle || "N/A";
    const lifecycleRisk = partData?.lifecycleRisk?.lifecycleRisk || "Unknown";
    const pcnSource = partData?.pcnData?.pcnDto?.lastPcnSource;
    const eolYears = partData?.lifecycleRisk?.estimatedYearsToEol;
    const datasheet = partData?.document?.latestDatasheet;
    const franchiseStock = prices?.find((p: { origin: { value: string } }) => p.origin?.value === "Franchise")?.quantityInStock;

    return (
      <div className="bg-[#1F222B] border border-solid border-[#494B59] rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#323543] border-b border-[#494B59] flex items-center">
          <div className="w-[192px] px-4 py-3">
            <p className="text-[14px] text-[#f7f7f7]">Mfr Part #</p>
          </div>
          <div className="w-[112px] px-4 py-3">
            <p className="text-[14px] text-[#f7f7f7]">Lead Time</p>
          </div>
          <div className="w-[144px] px-4 py-3">
            <p className="text-[14px] text-[#f7f7f7]">Lifecycle / Risk</p>
          </div>
          <div className="w-[176px] px-4 py-3">
            <p className="text-[14px] text-[#f7f7f7]">Country of origin</p>
          </div>
          <div className="w-[192px] px-4 py-3">
            <p className="text-[14px] text-[#f7f7f7]">Latest PCN / End of Life</p>
          </div>
          <div className="w-[116px] px-4 py-3">
            <p className="text-[14px] text-[#f7f7f7]">Data Sheet</p>
          </div>
          <div className="flex-1 px-4 py-3">
            <p className="text-[14px] text-[#f7f7f7]">Availability / Prices</p>
          </div>
        </div>
        
        {/* Table Row */}
        <div className="flex items-start border-b border-[#494B59]">
          <div className="w-[192px] px-4 py-5">
            <p className="text-[14px] text-[#f7f7f7]">{partData?.mpn || "N/A"}</p>
          </div>
          <div className="w-[112px] px-4 py-5">
            <p className="text-[14px] text-[#f7f7f7]">{leadTime}</p>
          </div>
          <div className="w-[144px] px-4 py-5 flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <p className="text-[14px] text-[#f7f7f7]">{lifecycleRisk} Risk</p>
              {lifecycleRisk === "High" && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 5V9M8 11V11.5M2 14H14L8 3L2 14Z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p className="text-[14px] text-[#b6b6b7]">{lifecycle}</p>
          </div>
          <div className="w-[176px] px-4 py-5">
            <p className="text-[14px] text-[#f7f7f7]">{countries}</p>
          </div>
          <div className="w-[192px] px-4 py-5 flex flex-col gap-1">
            {pcnSource ? (
              <a href={pcnSource} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#5d97ee] underline">
                PCN Document
              </a>
            ) : (
              <p className="text-[14px] text-[#f7f7f7]">N/A</p>
            )}
            {eolYears && (
              <p className="text-[12px] text-[#f7f7f7]">{eolYears} years to end of life</p>
            )}
          </div>
          <div className="w-[116px] px-4 py-5">
            {datasheet ? (
              <a href={datasheet} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#5d97ee] underline">
                Data Sheet
              </a>
            ) : (
              <p className="text-[14px] text-[#f7f7f7]">N/A</p>
            )}
          </div>
          <div className="flex-1 px-4 py-5 flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-[12px] text-[#b6b6b7]">Franchise</p>
              <p className="text-[14px] text-[#f7f7f7]">
                {franchiseStock ? `In Stock: ${franchiseStock.toLocaleString()}+` : "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-[12px] text-[#b6b6b7]">Open Market</p>
              <p className="text-[14px] text-[#f7f7f7]">Available</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRFQSection = () => {
    return (
      <div className="bg-[#1F222B] border border-solid border-[#494B59] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#323543] border-b border-[#494B59] px-4 py-3">
          <p className="text-[14px] text-[#f7f7f7]">Request for Quote</p>
        </div>
        
        {/* Form */}
        <div className="p-4 flex flex-col gap-6">
          <div className="flex gap-4">
            {/* Quantity */}
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[14px] text-[#cececf]">Quantity</label>
              <input
                type="text"
                placeholder="Enter quantity"
                className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-[16px] text-white placeholder-[#323335] outline-none focus:border-[#494B59]"
              />
            </div>
            {/* Contact Name */}
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[14px] text-[#cececf]">Contact Name</label>
              <input
                type="text"
                placeholder="Enter contact name"
                className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-[16px] text-white placeholder-[#323335] outline-none focus:border-[#494B59]"
              />
            </div>
            {/* Company Name */}
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[14px] text-[#cececf]">Company Name</label>
              <input
                type="text"
                placeholder="Enter company name"
                className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-[16px] text-white placeholder-[#323335] outline-none focus:border-[#494B59]"
              />
            </div>
            {/* Email */}
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[14px] text-[#cececf]">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-[16px] text-white placeholder-[#323335] outline-none focus:border-[#494B59]"
              />
            </div>
          </div>
          
          {/* Bottom row */}
          <div className="flex items-center gap-10">
            <p className="flex-1 text-[14px] text-[#b6b6b7]">
              By submitting this RFQ, you get complimentary access to our partner Partwatch - a live market platform with real-time availability and pricing from franchised and independent distributors, BOM health insights, PCNs, datasheets, approved alt
            </p>
            <button className="h-12 px-8 bg-[#99c221] border-t border-[#ceea6c] rounded-3xl shadow-md text-[16px] font-semibold text-[#05080d] hover:bg-[#a8d12f] transition-colors">
              Submit RFQ
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen pt-20">
      {/* Glow Effect Behind Title */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[738px] h-[320px] pointer-events-none">
        <div
          className="w-full h-full rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(184, 212, 52, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-14 z-10">
        {/* Title Section */}
        <div className="flex flex-col items-center gap-4 text-center max-w-[898px]">
          <h1
            className="text-[60px] font-semibold leading-[1.1] capitalize"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background:
                "radial-gradient(ellipse at 58% 100%, #b1b2b1 0%, #d2d4d2 50%, #f4f5f4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Powering your
            <br />
            component needs
          </h1>
          <p
            className="text-xl text-[#b6b6b7] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Which parts are you searching for today?
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col items-center gap-6">
          {/* Search Input Container - positioned relative for dropdown */}
          <div className="relative">
            {/* Search Input */}
            <div className="relative flex items-center">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                {isSearching ? (
                  <SimpleLoader size="xsmall" containerClassName="p-0" />
                ) : (
                  <Search size={24} className="text-[#8e8e8f]" />
                )}
              </div>
              <input
                value={searchValue}
                type="text"
                placeholder="Search"
                className="w-[495px] h-12 pl-14 pr-12 rounded-full 
                         bg-[#17181a] backdrop-blur-sm
                         border border-[rgba(77,77,78,0.34)]
                         text-base text-white placeholder-[#8e8e8f]
                         outline-none focus:border-[rgba(184,212,52,0.4)] transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                onChange={(e) => handleSearchUpdate(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchValue.length > 0 && !hasExternalResults) {
                    handleExternalSearch(searchValue);
                  }
                }}
                onFocus={() => {
                  if (searchResult.length > 0) {
                    setIsDropdownVisible(true);
                  }
                }}
              />
              {searchValue && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  onClick={clearSearch}
                >
                  <Close size={18} className="text-[#8e8e8f]" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown - absolute positioned overlay */}
            {searchResult?.length > 0 && isDropdownVisible && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#17181a]/95 backdrop-blur-md rounded-2xl border border-[rgba(77,77,78,0.34)] shadow-2xl z-50">
                {!hasExternalResults && (
                  <p className="text-sm text-[#8e8e8f] mb-2">
                    {isLoadingExternal ? "Loading extended results..." : "Press enter to view extended results"}
                  </p>
                )}
                <p className="text-sm text-[#8e8e8f] mb-2">
                  {searchResult.length} results found
                </p>
                <ul className="flex flex-col gap-2 max-h-[240px] overflow-y-auto">
                  {searchResult.map((result: SearchResult) => (
                    <div
                      key={result.id}
                      className="flex items-center gap-3 rounded-xl border border-[rgba(77,77,78,0.34)] 
                               bg-[#171819] p-3 cursor-pointer hover:border-[rgba(184,212,52,0.4)] transition-colors"
                      onClick={() => getOnePartData(result)}
                    >
                      {result.type === "LOCAL" && (
                        <>
                          <div className="w-10 h-10 rounded-lg bg-[#323543] flex items-center justify-center shrink-0">
                            <Box size={20} className="text-[#8e8e8f]" />
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#efeff0] truncate">
                              {result.mpn}
                            </p>
                            <div className="flex items-center flex-wrap">
                              {result.searchDescription && (
                                <p className="text-xs text-[#8e8e8f] truncate">
                                  {result.searchDescription}
                                </p>
                              )}
                              {result.additionalSearchDescription && (
                                <p className="text-xs text-[#8e8e8f] truncate">
                                  &nbsp;•&nbsp;
                                  {result.additionalSearchDescription}
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      {result.type === "EXTERNAL" && (
                        <>
                          <div className="w-10 h-10 rounded-lg bg-[#323543] flex items-center justify-center shrink-0">
                            <Box size={20} className="text-[#8e8e8f]" />
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#efeff0] truncate">
                              {result.mpn}
                            </p>
                            <div className="flex items-center flex-wrap">
                              {result.manufacturer && (
                                <p className="text-xs text-[#8e8e8f] truncate">
                                  {result.manufacturer}
                                </p>
                              )}
                              {result.description && (
                                <p className="text-xs text-[#8e8e8f] truncate">
                                  &nbsp;•&nbsp;{result.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      {partDataLoading === result.id && (
                        <div className="ml-auto">
                          <SimpleLoader size="xsmall" />
                        </div>
                      )}
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <ActionButton icon={<Upload size={18} />} label="Upload a BOM" onClick={() => navigate("/upload-bom")} />
            <ActionButton icon={<Box size={18} />} label="Sell excess" onClick={() => navigate("/sell-excess")} />
          </div>
        </div>

        {/* Category Cards OR Selected Part Details */}
        {selectedPart ? (
          <div className="flex flex-col gap-4 w-[1000px]">
            {/* Part Info Section */}
            <div className="bg-[#1F222B] border border-solid border-[#494B59] rounded-lg p-4 overflow-hidden">
              {renderPart()}
            </div>
            
            {/* Part Details Table */}
            {renderPartTable()}
            
            {/* Request for Quote Section */}
            {renderRFQSection()}
          </div>
        ) : (
          <div className="flex items-center gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                subtitle={category.subtitle}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

