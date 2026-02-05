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
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadDocumentType, setDownloadDocumentType] = useState<"datasheet" | "pcn" | null>(null);
  const [downloadDocumentUrl, setDownloadDocumentUrl] = useState<string | null>(null);
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

  const handleDocumentClick = (e: React.MouseEvent<HTMLAnchorElement>, type: "datasheet" | "pcn", url: string) => {
    e.preventDefault();
    setDownloadDocumentType(type);
    setDownloadDocumentUrl(url);
    setIsDownloadModalOpen(true);
  };

  const renderDownloadModal = () => {
    if (!isDownloadModalOpen || !downloadDocumentType || !downloadDocumentUrl) return null;

    // @ts-expect-error - TODO: fix this
    const partData = selectedPart?.data?.globalPart;
    const mpn = partData?.mpn || "N/A";
    const documentName = downloadDocumentType === "datasheet" ? "Data Sheet" : "PCN Document";
    const documentInfo = downloadDocumentType === "datasheet" ? "Data Sheet" : "PCN Document • Data Sheet";

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" 
        onClick={() => {
          setIsDownloadModalOpen(false);
          setDownloadDocumentType(null);
          setDownloadDocumentUrl(null);
        }}
      >
        <div 
          className="relative flex flex-col items-center gap-6 w-[680px] p-6 rounded-[24px] border border-[#1C1D22] bg-[#111215]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              setIsDownloadModalOpen(false);
              setDownloadDocumentType(null);
              setDownloadDocumentUrl(null);
            }}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.781 18.7178C19.8507 18.7875 19.906 18.8702 19.9437 18.9613C19.9814 19.0523 20.0008 19.1499 20.0008 19.2485C20.0008 19.347 19.9814 19.4446 19.9437 19.5356C19.906 19.6267 19.8507 19.7094 19.781 19.7791C19.7114 19.8488 19.6286 19.904 19.5376 19.9418C19.4465 19.9795 19.349 19.9989 19.2504 19.9989C19.1519 19.9989 19.0543 19.9795 18.9632 19.9418C18.8722 19.904 18.7895 19.8488 18.7198 19.7791L12.5004 13.5588L6.28104 19.7791C6.14031 19.9198 5.94944 19.9989 5.75042 19.9989C5.55139 19.9989 5.36052 19.9198 5.21979 19.7791C5.07906 19.6384 5 19.4475 5 19.2485C5 19.0494 5.07906 18.8586 5.21979 18.7178L11.4401 12.4985L5.21979 6.27909C5.07906 6.13836 5 5.94749 5 5.74846C5 5.54944 5.07906 5.35857 5.21979 5.21784C5.36052 5.07711 5.55139 4.99805 5.75042 4.99805C5.94944 4.99805 6.14031 5.07711 6.28104 5.21784L12.5004 11.4382L18.7198 5.21784C18.8605 5.07711 19.0514 4.99805 19.2504 4.99805C19.4494 4.99805 19.6403 5.07711 19.781 5.21784C19.9218 5.35857 20.0008 5.54944 20.0008 5.74846C20.0008 5.94749 19.9218 6.13836 19.781 6.27909L13.5607 12.4985L19.781 18.7178Z" fill="#CECECF"/>
            </svg>
          </button>

          {/* Header */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2 className="text-[16px] font-medium text-[#f7f7f7]">Download Part Documents</h2>
          </div>

          {/* Document Info Container */}
          <div className="flex items-center gap-2 self-stretch py-2 px-3 border-b border-[#212225] bg-[#111215]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M20.0306 7.71938L14.7806 2.46938C14.7109 2.39975 14.6282 2.34454 14.5371 2.3069C14.4461 2.26926 14.3485 2.24992 14.25 2.25H5.25C4.85218 2.25 4.47064 2.40804 4.18934 2.68934C3.90804 2.97064 3.75 3.35218 3.75 3.75V20.25C3.75 20.6478 3.90804 21.0294 4.18934 21.3107C4.47064 21.592 4.85218 21.75 5.25 21.75H18.75C19.1478 21.75 19.5294 21.592 19.8107 21.3107C20.092 21.0294 20.25 20.6478 20.25 20.25V8.25C20.2501 8.15148 20.2307 8.05391 20.1931 7.96286C20.1555 7.87182 20.1003 7.78908 20.0306 7.71938ZM15 4.81031L17.6897 7.5H15V4.81031ZM18.75 20.25H5.25V3.75H13.5V8.25C13.5 8.44891 13.579 8.63968 13.7197 8.78033C13.8603 8.92098 14.0511 9 14.25 9H18.75V20.25Z" fill="#99C221"/>
            </svg>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-[14px] font-medium text-[#f7f7f7]">{mpn}</p>
              <p className="text-[12px] text-[#b6b6b7]">{documentInfo}</p>
            </div>
          </div>

          {/* Main Content - Two Cards */}
          <div className="flex items-center gap-8 self-stretch">
            {/* Card 1 - Quick Download */}
            <div className="flex flex-col items-center gap-6 h-[328px] py-6 px-4 flex-1 rounded-[24px] border border-[#323335] shadow-[0_4px_4px_0_rgba(17,18,21,0.35)]">
              <h3 className="text-[16px] font-medium text-[#f7f7f7]">Quick Download</h3>
              <div className="flex flex-col gap-2 flex-1 w-full mt-[20px]">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#b6b6b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[14px] text-[#b6b6b7] leading-[20px]">Get this datasheet only</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#b6b6b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[14px] text-[#b6b6b7] leading-[20px]">No signup required</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#b6b6b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[14px] text-[#b6b6b7] leading-[20px]">Instant access</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  window.open(downloadDocumentUrl, '_blank');
                  setIsDownloadModalOpen(false);
                  setDownloadDocumentType(null);
                  setDownloadDocumentUrl(null);
                }}
                className="w-full h-12 px-4 bg-transparent border border-[#99C221] rounded-2xl text-[14px] font-medium text-[#99C221] hover:bg-[#99C221]/10 transition-colors"
              >
                Download Now
              </button>
            </div>

            {/* Card 2 - MyChip1 Account */}
            <div className="relative flex flex-col items-center gap-6 h-[328px] py-6 px-4 flex-1 rounded-[24px] border border-[#323335] shadow-[0_4px_4px_0_rgba(17,18,21,0.35)]">
              {/* Badge */}
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-[#99C221] rounded-full">
                <p className="text-[10px] font-medium text-[#05080d]">100% Free</p>
              </div>
              <div className="flex flex-col items-center gap-0">
                <h3 className="text-[16px] font-medium text-[#f7f7f7]">MyChip1 Account</h3>
                <p className="text-[12px] text-[#b6b6b7]">30 sec signup</p>
              </div>
              <div className="flex flex-col gap-2 flex-1 w-full">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#99C221" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[14px] text-[#b6b6b7] leading-[20px]">Unlimited downloads</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#99C221" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[14px] text-[#b6b6b7] leading-[20px]">Access ALL datasheets</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#99C221" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[14px] text-[#b6b6b7] leading-[20px]">Part lifecycle alerts</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#99C221" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[14px] text-[#b6b6b7] leading-[20px]">Part health monitoring</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  // Navigate to signup or handle signup
                  navigate("/");
                }}
                className="w-full h-12 px-4 bg-[#99C221] border border-[#111215] rounded-2xl text-[14px] font-medium text-[#05080d] hover:bg-[#a8d32f] transition-colors"
              >
                Get Free Access
              </button>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-[14px] text-[#b6b6b7] text-center">
            Already a MyChip1 member? <span className="text-[#99C221] cursor-pointer hover:underline">Sign In</span>
          </p>
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
            <p className="text-[14px] text-[#f7f7f7]">Availability</p>
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
              <a 
                href={pcnSource} 
                onClick={(e) => handleDocumentClick(e, "pcn", pcnSource)}
                className="text-[14px] text-[#5d97ee] underline flex items-center gap-1.5 cursor-pointer"
              >
                PCN Document
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.5 11.25V16.25C17.5 16.4158 17.4342 16.5747 17.3169 16.6919C17.1997 16.8092 17.0408 16.875 16.875 16.875H3.125C2.95924 16.875 2.80027 16.8092 2.68306 16.6919C2.56585 16.5747 2.5 16.4158 2.5 16.25V11.25C2.5 11.0842 2.56585 10.9253 2.68306 10.8081C2.80027 10.6908 2.95924 10.625 3.125 10.625C3.29076 10.625 3.44973 10.6908 3.56694 10.8081C3.68415 10.9253 3.75 11.0842 3.75 11.25V15.625H16.25V11.25C16.25 11.0842 16.3158 10.9253 16.4331 10.8081C16.5503 10.6908 16.7092 10.625 16.875 10.625C17.0408 10.625 17.1997 10.6908 17.3169 10.8081C17.4342 10.9253 17.5 11.0842 17.5 11.25ZM9.55781 11.6922C9.61586 11.7503 9.68479 11.7964 9.76066 11.8279C9.83654 11.8593 9.91787 11.8755 10 11.8755C10.0821 11.8755 10.1635 11.8593 10.2393 11.8279C10.3152 11.7964 10.3841 11.7503 10.4422 11.6922L13.5672 8.56719C13.6253 8.50912 13.6713 8.44018 13.7027 8.36431C13.7342 8.28844 13.7503 8.20712 13.7503 8.125C13.7503 8.04288 13.7342 7.96156 13.7027 7.88569C13.6713 7.80982 13.6253 7.74088 13.5672 7.68281C13.5091 7.62474 13.4402 7.57868 13.3643 7.54725C13.2884 7.51583 13.2071 7.49965 13.125 7.49965C13.0429 7.49965 12.9616 7.51583 12.8857 7.54725C12.8098 7.57868 12.7409 7.62474 12.6828 7.68281L10.625 9.74141V2.5C10.625 2.33424 10.5592 2.17527 10.4419 2.05806C10.3247 1.94085 10.1658 1.875 10 1.875C9.83424 1.875 9.67527 1.94085 9.55806 2.05806C9.44085 2.17527 9.375 2.33424 9.375 2.5V9.74141L7.31719 7.68281C7.19991 7.56554 7.04085 7.49965 6.875 7.49965C6.70915 7.49965 6.55009 7.56554 6.43281 7.68281C6.31554 7.80009 6.24965 7.95915 6.24965 8.125C6.24965 8.29085 6.31554 8.44991 6.43281 8.56719L9.55781 11.6922Z" fill="#5D97EE"/>
                </svg>
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
              <a 
                href={datasheet} 
                onClick={(e) => handleDocumentClick(e, "datasheet", datasheet)}
                className="text-[14px] text-[#5d97ee] underline flex items-center gap-1.5 cursor-pointer"
              >
                Data Sheet
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.5 11.25V16.25C17.5 16.4158 17.4342 16.5747 17.3169 16.6919C17.1997 16.8092 17.0408 16.875 16.875 16.875H3.125C2.95924 16.875 2.80027 16.8092 2.68306 16.6919C2.56585 16.5747 2.5 16.4158 2.5 16.25V11.25C2.5 11.0842 2.56585 10.9253 2.68306 10.8081C2.80027 10.6908 2.95924 10.625 3.125 10.625C3.29076 10.625 3.44973 10.6908 3.56694 10.8081C3.68415 10.9253 3.75 11.0842 3.75 11.25V15.625H16.25V11.25C16.25 11.0842 16.3158 10.9253 16.4331 10.8081C16.5503 10.6908 16.7092 10.625 16.875 10.625C17.0408 10.625 17.1997 10.6908 17.3169 10.8081C17.4342 10.9253 17.5 11.0842 17.5 11.25ZM9.55781 11.6922C9.61586 11.7503 9.68479 11.7964 9.76066 11.8279C9.83654 11.8593 9.91787 11.8755 10 11.8755C10.0821 11.8755 10.1635 11.8593 10.2393 11.8279C10.3152 11.7964 10.3841 11.7503 10.4422 11.6922L13.5672 8.56719C13.6253 8.50912 13.6713 8.44018 13.7027 8.36431C13.7342 8.28844 13.7503 8.20712 13.7503 8.125C13.7503 8.04288 13.7342 7.96156 13.7027 7.88569C13.6713 7.80982 13.6253 7.74088 13.5672 7.68281C13.5091 7.62474 13.4402 7.57868 13.3643 7.54725C13.2884 7.51583 13.2071 7.49965 13.125 7.49965C13.0429 7.49965 12.9616 7.51583 12.8857 7.54725C12.8098 7.57868 12.7409 7.62474 12.6828 7.68281L10.625 9.74141V2.5C10.625 2.33424 10.5592 2.17527 10.4419 2.05806C10.3247 1.94085 10.1658 1.875 10 1.875C9.83424 1.875 9.67527 1.94085 9.55806 2.05806C9.44085 2.17527 9.375 2.33424 9.375 2.5V9.74141L7.31719 7.68281C7.19991 7.56554 7.04085 7.49965 6.875 7.49965C6.70915 7.49965 6.55009 7.56554 6.43281 7.68281C6.31554 7.80009 6.24965 7.95915 6.24965 8.125C6.24965 8.29085 6.31554 8.44991 6.43281 8.56719L9.55781 11.6922Z" fill="#5D97EE"/>
                </svg>
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

      {/* Download Modal */}
      {renderDownloadModal()}
    </section>
  );
};

