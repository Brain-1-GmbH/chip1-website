import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Close, Search } from "@carbon/icons-react";
import axios from "axios";
import JSZip from "jszip";

import { ActionButton } from "./ActionButton";
import { SimpleLoader } from "../UI/SimpleLoader";

const UploadIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M8.37927 3.11147L8.3749 12.7602C8.3749 12.926 8.44074 13.085 8.55795 13.2022C8.67516 13.3194 8.83414 13.3852 8.9999 13.3852C9.16566 13.3852 9.32463 13.3194 9.44184 13.2022C9.55905 13.085 9.6249 12.926 9.6249 12.7602L9.62927 3.1221L11.4493 4.94272C11.5665 5.05989 11.7254 5.12572 11.8911 5.12572C12.0569 5.12572 12.2158 5.05989 12.333 4.94272C12.4502 4.82552 12.516 4.66658 12.516 4.50085C12.516 4.33512 12.4502 4.17618 12.333 4.05897L10.3261 2.0496C10.152 1.87536 9.94527 1.73714 9.7177 1.64284C9.49014 1.54854 9.24622 1.5 8.9999 1.5C8.75357 1.5 8.50965 1.54854 8.28209 1.64284C8.05452 1.73714 7.84777 1.87536 7.67365 2.0496L5.66677 4.0571C5.5496 4.1743 5.48378 4.33325 5.48378 4.49897C5.48378 4.6647 5.5496 4.82365 5.66677 4.94085C5.78398 5.05802 5.94292 5.12384 6.10865 5.12384C6.27437 5.12384 6.43332 5.05802 6.55052 4.94085L8.37927 3.11147Z"
      fill="url(#upload_paint0)"
    />
    <path
      d="M15.25 12.1248V14.6248C15.25 14.7905 15.1842 14.9495 15.0669 15.0667C14.9497 15.1839 14.7908 15.2498 14.625 15.2498H3.375C3.20924 15.2498 3.05027 15.1839 2.93306 15.0667C2.81585 14.9495 2.75 14.7905 2.75 14.6248V12.1248C2.75 11.959 2.68415 11.8 2.56694 11.6828C2.44973 11.5656 2.29076 11.4998 2.125 11.4998C1.95924 11.4998 1.80027 11.5656 1.68306 11.6828C1.56585 11.8 1.5 11.959 1.5 12.1248V14.6248C1.5 15.122 1.69754 15.599 2.04917 15.9506C2.40081 16.3022 2.87772 16.4998 3.375 16.4998H14.625C15.1223 16.4998 15.5992 16.3022 15.9508 15.9506C16.3025 15.599 16.5 15.122 16.5 14.6248V12.1248C16.5 11.959 16.4342 11.8 16.3169 11.6828C16.1997 11.5656 16.0408 11.4998 15.875 11.4998C15.7092 11.4998 15.5503 11.5656 15.4331 11.6828C15.3158 11.8 15.25 11.959 15.25 12.1248Z"
      fill="url(#upload_paint1)"
    />
    <defs>
      <radialGradient
        id="upload_paint0"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(12.3743 16.3126) rotate(-102.833) scale(15.1921 15.1923)"
      >
        <stop stopColor="#929298" />
        <stop offset="1" stopColor="#E5E5E7" />
      </radialGradient>
      <radialGradient
        id="upload_paint1"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(12.3743 16.3126) rotate(-102.833) scale(15.1921 15.1923)"
      >
        <stop stopColor="#929298" />
        <stop offset="1" stopColor="#E5E5E7" />
      </radialGradient>
    </defs>
  </svg>
);

const SellExcessIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M16.2572 8.27275L15.1833 6.0273C15.0471 5.74287 14.7195 5.60347 14.4214 5.70411L8.99787 7.51447L3.56684 5.70474C3.2687 5.60534 2.94117 5.7435 2.80491 6.02855L1.77234 8.19961C1.47419 8.69471 1.41794 9.2892 1.61795 9.83055C1.81171 10.3557 2.22049 10.7626 2.74366 10.9527L2.73991 12.3998C2.73991 13.7482 3.5981 14.9409 4.87694 15.3673L7.60527 16.2775C8.05155 16.4256 8.52033 16.5 8.98912 16.5C9.4579 16.5 9.92669 16.4256 10.373 16.2768L13.1038 15.3667C14.3814 14.9403 15.2402 13.7501 15.2408 12.4048L15.2446 10.9533C15.7734 10.7682 16.1871 10.3625 16.3815 9.83556C16.5791 9.2992 16.5234 8.71033 16.2572 8.27275ZM2.87117 8.7916L3.69498 7.06438L8.11093 8.53592L7.09835 10.5713C6.94709 10.8251 6.64269 10.9364 6.36455 10.8439L3.18869 9.7843C3.00243 9.72241 2.85742 9.58176 2.78929 9.39797C2.72178 9.21481 2.74116 9.01289 2.87117 8.7916ZM5.27259 14.182C4.50504 13.9257 3.98937 13.21 3.99 12.4017L3.9925 11.3702L5.97015 12.0297C6.81146 12.3085 7.7159 11.9735 8.19468 11.1721L8.36782 10.8251L8.36532 15.1879C8.24219 15.1629 8.12093 15.131 8.00155 15.0916L5.27322 14.182H5.27259ZM12.7081 14.1808L9.97731 15.091C9.85856 15.1304 9.7373 15.1629 9.61479 15.1879L9.61729 10.8151L9.81668 11.2152C10.1648 11.7953 10.7742 12.1279 11.418 12.1279C11.6168 12.1279 11.8199 12.096 12.0181 12.0297L13.9932 11.3715L13.9907 12.4036C13.9907 13.2112 13.4751 13.9251 12.7081 14.1808ZM15.2083 9.40172C15.1427 9.57988 15.0014 9.71678 14.8214 9.77742L11.6224 10.8433C11.3487 10.9351 11.038 10.8208 10.9124 10.6151L9.87856 8.53842L14.2939 7.06501L15.1577 8.86536C15.2552 9.02852 15.2746 9.22356 15.2083 9.40172ZM4.75881 5.18464C4.51441 4.94021 4.51441 4.54513 4.75881 4.30071L7.19461 1.86523C7.68152 1.37826 8.47533 1.37826 8.96224 1.86523L9.95981 2.86293C10.4305 2.62225 11.0461 2.69414 11.4305 3.07859L12.84 4.48825C13.0844 4.73267 13.0844 5.12775 12.84 5.37217C12.5956 5.6166 12.2006 5.6166 11.9562 5.37217L10.5467 3.96252L8.57721 5.93228C8.45533 6.05418 8.29532 6.11545 8.1353 6.11545C7.97529 6.11545 7.81528 6.05418 7.6934 5.93228C7.449 5.68786 7.449 5.29278 7.6934 5.04836L9.03537 3.70622L8.07905 2.74978L5.64325 5.18526C5.52136 5.30716 5.36135 5.36842 5.20134 5.36842C5.04133 5.36842 4.88132 5.30716 4.75943 5.18526L4.75881 5.18464Z"
      fill="url(#sell_paint0)"
    />
    <defs>
      <radialGradient
        id="sell_paint0"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(-3.37427 -14.8128 14.8128 -3.37438 12.3743 16.3128)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#929298" />
        <stop offset="1" stopColor="#E5E5E7" />
      </radialGradient>
    </defs>
  </svg>
);

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


export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [hasExternalResults, setHasExternalResults] = useState(false);
  const [isLoadingExternal, setIsLoadingExternal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPart, setSelectedPart] = useState<any | null>(null);
  const [partDataLoading, setPartDataLoading] = useState<
    string | null | number
  >(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadDocumentType, setDownloadDocumentType] = useState<"datasheet" | "pcn" | null>(null);
  const [downloadDocumentUrl, setDownloadDocumentUrl] = useState<string | null>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
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
            setIsSearching(false);
          } else {
            setSearchResult([]);
            setIsSearching(false);
            // Auto-try external results when local is empty
            if (value.length >= 3) {
              handleExternalSearch(value);
            }
          }
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
    if (newValue.length > 0) {
      setIsDropdownVisible(true);
    }
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
        // #region agent log
        const _gp = res.data?.data?.globalPart; fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:164',message:'Full part response structure',data:{documentKeys:_gp?.document?Object.keys(_gp.document):null,documentData:_gp?.document,pcnDataKeys:_gp?.pcnData?Object.keys(_gp.pcnData):null,pcnDtoKeys:_gp?.pcnData?.pcnDto?Object.keys(_gp.pcnData.pcnDto):null,pcnDto:_gp?.pcnData?.pcnDto,topLevelKeys:_gp?Object.keys(_gp):null},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'G1,G2,G3'})}).catch(()=>{});
        // #endregion
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
    const partData = selectedPart?.data?.globalPart;
    const partInfo = selectedPart?.data?.part;
    const hasData = !!partData;
    const healthScore = partInfo?.chip1HealthScore ?? 0;

    // Info field component for consistent styling
    const InfoField = ({ label, value }: { label: string; value: string | undefined | null }) => {
      const displayValue = value ? String(value) : "N/A";
      
      return (
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-[12px] text-[#cececf] leading-[1.4] truncate whitespace-nowrap">{label}</p>
          <p 
            className="text-[14px] text-[#e5e5e7] font-medium leading-[1.4] truncate whitespace-nowrap min-w-0"
          >
            {displayValue}
          </p>
        </div>
      );
    };

    return (
      <div className="flex flex-col lg:flex-row gap-4 items-stretch w-full">
        {/* Part Health */}
        <div className="flex flex-col items-center gap-4 shrink-0 w-full lg:w-auto">
          <p className="text-[16px] font-medium text-[#fcfdfc] leading-[1.4] w-full text-center lg:text-left">
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
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#494b59] to-transparent self-stretch" />

        {/* General Information */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <p className="text-[16px] font-medium text-[#fcfdfc] leading-[1.4]">
            General Information
          </p>

          <div className="flex items-start gap-6 self-stretch flex-nowrap w-full">
            {/* Column 1 */}
            <div className="flex flex-col gap-2 flex-1 basis-0 min-w-0">
              <InfoField label="Manufacturer" value={partData?.manufacturer} />
              <InfoField label="Category" value={partData?.category} />
              <InfoField label="Packaging" value={partData?.packaging || "Tape and Reel"} />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2 flex-1 basis-0 min-w-0">
              <InfoField label="Lifecycle" value={partData?.lifecycleRisk?.lifecycle} />
              <InfoField label="Introduced" value={partData?.introductionDate} />
              <InfoField label="Cage Code" value={partData?.mfrCageCode} />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-2 flex-1 basis-0 min-w-0">
              <InfoField label="Lead-Free Status" value={partData?.environmentData?.leadFree || "Compliant"} />
              <InfoField label="RoHS Status" value={partData?.environmentData?.rohsStatus || "Compliant"} />
              <InfoField label="REACH Status" value={partData?.environmentData?.reachStatus || "Unaffected"} />
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-2 flex-1 basis-0 min-w-0">
              <InfoField label="ECCN" value={partData?.eccn} />
              <InfoField label="HTSUSA" value={partData?.htsusa || partData?.environmentData?.htsus} />
              <InfoField label="UNSPSC" value={partData?.unspsc} />
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#494b59] to-transparent self-stretch" />

        {/* Alternates */}
        <div className="flex flex-col gap-4 w-full lg:w-[312px] shrink-0">
          <p className="text-[16px] font-medium text-[#fcfdfc] leading-[1.4]">
            Alternates
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
            ) : null}
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

  const downloadFilesAsZip = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:372',message:'downloadFilesAsZip called',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,D,E'})}).catch(()=>{});
    // #endregion
    const partData = selectedPart?.data?.globalPart;
    const mpn = partData?.mpn || "part";
    const pcnUrl = partData?.pcnData?.pcnDto?.lastPcnSource;
    const datasheetUrl = partData?.document?.latestDatasheet;

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:377',message:'URLs extracted',data:{pcnUrl,pcnUrlType:typeof pcnUrl,datasheetUrl,datasheetUrlType:typeof datasheetUrl,mpn},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C,E'})}).catch(()=>{});
    // #endregion

    // Collect URLs that exist
    const urlsToDownload: Array<{ url: string; filename: string }> = [];
    
    if (datasheetUrl) {
      // Extract filename from URL or use default
      const datasheetFilename = datasheetUrl.split('/').pop() || `datasheet.pdf`;
      urlsToDownload.push({ url: datasheetUrl, filename: datasheetFilename });
    }
    
    if (pcnUrl) {
      const pcnFilename = pcnUrl.split('/').pop() || `pcn.pdf`;
      urlsToDownload.push({ url: pcnUrl, filename: pcnFilename });
    }

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:393',message:'URLs to download prepared',data:{urlsToDownloadCount:urlsToDownload.length,urlsToDownload:urlsToDownload.map(u=>({url:u.url,filename:u.filename}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

    if (urlsToDownload.length === 0) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:395',message:'No URLs to download - early return',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.error("No documents available to download");
      return;
    }

    setIsDownloadingZip(true);

    try {
      const zip = new JSZip();

      // Download all files in parallel
      const downloadPromises = urlsToDownload.map(async ({ url, filename }) => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:406',message:'Starting download for file',data:{originalUrl:url,filename,isAbsolute:url.startsWith('http'),isRelative:url.startsWith('/')},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A,B,C'})}).catch(()=>{});
        // #endregion
        try {
          // Convert crm.chip1.com URLs to use proxy path
          let proxyUrl = url;
          if (url.startsWith('https://crm.chip1.com/')) {
            proxyUrl = '/' + url.replace('https://crm.chip1.com/', '');
          } else if (url.startsWith('http://crm.chip1.com/')) {
            proxyUrl = '/' + url.replace('http://crm.chip1.com/', '');
          }
          
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:412',message:'Using proxy URL',data:{originalUrl:url,proxyUrl,filename},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A,B,C'})}).catch(()=>{});
          // #endregion
          
          // Use axios with blob response type to handle redirects and cookies
          const response = await axios.get(proxyUrl, {
            responseType: 'blob',
            maxRedirects: 5,
            withCredentials: true, // Include cookies for authentication
          });
          
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:420',message:'Axios response received',data:{filename,status:response.status,statusType:response.data?.type,blobSize:response.data?.size,contentType:response.headers['content-type']},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A,C'})}).catch(()=>{});
          // #endregion
          
          const blob = response.data;
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:424',message:'Blob created successfully',data:{filename,blobSize:blob.size,blobType:blob.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'F'})}).catch(()=>{});
          // #endregion
          return { filename, blob };
        } catch (error) {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:427',message:'Download error caught',data:{filename,error:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:'unknown',isAxiosError:axios.isAxiosError(error),axiosStatus:axios.isAxiosError(error)?error.response?.status:undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A,C'})}).catch(()=>{});
          // #endregion
          console.error(`Error downloading ${filename}:`, error);
          return null;
        }
      });

      const downloadedFiles = await Promise.all(downloadPromises);
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:421',message:'All downloads completed',data:{totalFiles:downloadedFiles.length,successfulFiles:downloadedFiles.filter(f=>f!==null).length,failedFiles:downloadedFiles.filter(f=>f===null).length,fileNames:downloadedFiles.filter(f=>f!==null).map(f=>f?.filename)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      // Add successfully downloaded files to zip
      downloadedFiles.forEach((file) => {
        if (file) {
          zip.file(file.filename, file.blob);
        }
      });

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:428',message:'Generating zip blob',data:{filesInZip:Object.keys(zip.files).length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:431',message:'Zip blob generated',data:{zipBlobSize:zipBlob.size},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      // Create download link
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      
      // Create proper filename: sanitize MPN and add timestamp
      const sanitizedMpn = mpn.replace(/[^a-zA-Z0-9-_]/g, "_");
      const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      link.download = `${sanitizedMpn}_documents_${timestamp}.zip`;
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:441',message:'Download link created and clicking',data:{downloadFilename:link.download,linkHref:link.href.substring(0,50)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsDownloadModalOpen(false);
      setDownloadDocumentType(null);
      setDownloadDocumentUrl(null);
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/61ba81bd-24c6-451f-bbbb-7e7480f7082f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:449',message:'Error in zip creation',data:{error:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.error("Error creating zip file:", error);
      alert("Failed to download documents. Please try again.");
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const renderDownloadModal = () => {
    if (!isDownloadModalOpen || !downloadDocumentType || !downloadDocumentUrl) return null;

    const partData = selectedPart?.data?.globalPart;
    const mpn = partData?.mpn || "N/A";
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
                  <p className="text-[14px] text-[#b6b6b7] leading-[20px]">Get all documents (PCN & Datasheet)</p>
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
                onClick={downloadFilesAsZip}
                disabled={isDownloadingZip}
                className="w-full h-12 px-4 bg-transparent border border-[#99C221] rounded-2xl text-[14px] font-medium text-[#99C221] hover:bg-[#99C221]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDownloadingZip ? (
                  <>
                    <SimpleLoader size="xsmall" containerClassName="p-0" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  "Download Now"
                )}
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
    const partData = selectedPart?.data?.globalPart;
    const prices = selectedPart?.data?.prices;
    
    const countries = partData?.countryOfOrigin?.map((c: { country: string }) => c.country).join(", ") || "N/A";
    const leadTime = partData?.pricingData?.minLeadTime || "N/A";
    const lifecycle = partData?.lifecycleRisk?.lifecycle || "N/A";
    const lifecycleRisk = partData?.lifecycleRisk?.lifecycleRisk || "Unknown";
    const pcnSource = partData?.pcnData?.pcnDto?.lastPcnSource;
    const eolYears = partData?.lifecycleRisk?.estimatedYearsToEol;
    const datasheet = partData?.document?.latestDatasheet;
    const franchiseStock = prices?.find((p: { origin: { value: string } }) => p.origin?.value === "Franchise")?.quantityInStock;

    const downloadIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M17.5 11.25V16.25C17.5 16.4158 17.4342 16.5747 17.3169 16.6919C17.1997 16.8092 17.0408 16.875 16.875 16.875H3.125C2.95924 16.875 2.80027 16.8092 2.68306 16.6919C2.56585 16.5747 2.5 16.4158 2.5 16.25V11.25C2.5 11.0842 2.56585 10.9253 2.68306 10.8081C2.80027 10.6908 2.95924 10.625 3.125 10.625C3.29076 10.625 3.44973 10.6908 3.56694 10.8081C3.68415 10.9253 3.75 11.0842 3.75 11.25V15.625H16.25V11.25C16.25 11.0842 16.3158 10.9253 16.4331 10.8081C16.5503 10.6908 16.7092 10.625 16.875 10.625C17.0408 10.625 17.1997 10.6908 17.3169 10.8081C17.4342 10.9253 17.5 11.0842 17.5 11.25ZM9.55781 11.6922C9.61586 11.7503 9.68479 11.7964 9.76066 11.8279C9.83654 11.8593 9.91787 11.8755 10 11.8755C10.0821 11.8755 10.1635 11.8593 10.2393 11.8279C10.3152 11.7964 10.3841 11.7503 10.4422 11.6922L13.5672 8.56719C13.6253 8.50912 13.6713 8.44018 13.7027 8.36431C13.7342 8.28844 13.7503 8.20712 13.7503 8.125C13.7503 8.04288 13.7342 7.96156 13.7027 7.88569C13.6713 7.80982 13.6253 7.74088 13.5672 7.68281C13.5091 7.62474 13.4402 7.57868 13.3643 7.54725C13.2884 7.51583 13.2071 7.49965 13.125 7.49965C13.0429 7.49965 12.9616 7.51583 12.8857 7.54725C12.8098 7.57868 12.7409 7.62474 12.6828 7.68281L10.625 9.74141V2.5C10.625 2.33424 10.5592 2.17527 10.4419 2.05806C10.3247 1.94085 10.1658 1.875 10 1.875C9.83424 1.875 9.67527 1.94085 9.55806 2.05806C9.44085 2.17527 9.375 2.33424 9.375 2.5V9.74141L7.31719 7.68281C7.19991 7.56554 7.04085 7.49965 6.875 7.49965C6.70915 7.49965 6.55009 7.56554 6.43281 7.68281C6.31554 7.80009 6.24965 7.95915 6.24965 8.125C6.24965 8.29085 6.31554 8.44991 6.43281 8.56719L9.55781 11.6922Z" fill="#5D97EE"/>
      </svg>
    );

    return (
      <div className="bg-[#1F222B] border border-solid border-[#494B59] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[700px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#323543] border-b border-[#494B59]">
              <th className="px-3 py-3 text-left text-[14px] text-[#f7f7f7] font-normal">Mfr Part #</th>
              <th className="px-3 py-3 text-left text-[14px] text-[#f7f7f7] font-normal">Lead Time</th>
              <th className="px-3 py-3 text-left text-[14px] text-[#f7f7f7] font-normal">Lifecycle / Risk</th>
              <th className="px-3 py-3 text-left text-[14px] text-[#f7f7f7] font-normal">Country of origin</th>
              <th className="px-3 py-3 text-left text-[14px] text-[#f7f7f7] font-normal">Latest PCN / End of Life</th>
              <th className="px-3 py-3 text-left text-[14px] text-[#f7f7f7] font-normal">Data Sheet</th>
              <th className="px-3 py-3 text-left text-[14px] text-[#f7f7f7] font-normal">Availability</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            <tr className="border-b border-[#494B59]">
              <td className="px-3 py-4 align-top">
                <p className="text-[14px] text-[#f7f7f7] break-words">{partData?.mpn || "N/A"}</p>
              </td>
              <td className="px-3 py-4 align-top">
                <p className="text-[14px] text-[#f7f7f7]">{leadTime}</p>
              </td>
              <td className="px-3 py-4 align-top">
                <div className="flex items-center gap-1">
                  <p className="text-[14px] text-[#f7f7f7]">{lifecycleRisk} Risk</p>
                  {lifecycleRisk === "High" && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <path d="M8 5V9M8 11V11.5M2 14H14L8 3L2 14Z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <p className="text-[14px] text-[#b6b6b7] mt-1">{lifecycle}</p>
              </td>
              <td className="px-3 py-4 align-top">
                <p className="text-[14px] text-[#f7f7f7] break-words">{countries}</p>
              </td>
              <td className="px-3 py-4 align-top">
                {pcnSource ? (
                  <>
                    <div className="flex items-center gap-1">
                      <a 
                        href={pcnSource} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-[#5d97ee] underline cursor-pointer"
                      >
                        PCN Document
                      </a>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDocumentClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, "pcn", pcnSource); }}
                        className="shrink-0 p-0.5 rounded hover:bg-white/10 transition-colors"
                        title="Download all documents"
                      >
                        {downloadIcon}
                      </button>
                    </div>
                    {eolYears && (
                      <p className="text-[12px] text-[#f7f7f7] mt-1">{eolYears} years to end of life</p>
                    )}
                  </>
                ) : (
                  <p className="text-[14px] text-[#f7f7f7]">N/A</p>
                )}
              </td>
              <td className="px-3 py-4 align-top">
                {datasheet ? (
                  <div className="flex items-center gap-1">
                    <a 
                      href={datasheet} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#5d97ee] underline cursor-pointer"
                    >
                      Data Sheet
                    </a>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDocumentClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, "datasheet", datasheet); }}
                      className="shrink-0 p-0.5 rounded hover:bg-white/10 transition-colors"
                      title="Download all documents"
                    >
                      {downloadIcon}
                    </button>
                  </div>
                ) : (
                  <p className="text-[14px] text-[#f7f7f7]">N/A</p>
                )}
              </td>
              <td className="px-3 py-4 align-top">
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="text-[12px] text-[#b6b6b7]">Franchise</p>
                    <p className="text-[14px] text-[#f7f7f7] break-words">
                      {franchiseStock ? `In Stock: ${franchiseStock.toLocaleString()}+` : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="text-[12px] text-[#b6b6b7]">Open Market</p>
                    <p className="text-[14px] text-[#f7f7f7]">Available</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      <div className="flex flex-col items-center gap-8 md:gap-14 z-10">
        {/* Title Section */}
        <div className="flex flex-col items-center gap-4 text-center max-w-[898px]">
          <h1
            className="md:hidden text-[32px] font-normal leading-[1.1] text-[#efeff0]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="block">Powering your</span>
            <span className="block">components needs</span>
          </h1>
          <h1
            className="hidden md:block text-[60px] font-semibold leading-[1.1] capitalize"
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
            className="text-sm md:text-xl text-[#b6b6b7] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Which parts are you searching for today?
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col items-center gap-4 md:gap-6 px-4 md:px-0">
          {/* Search Input Container - positioned relative for dropdown */}
          <div className="relative">
            {/* Search Input */}
            <div className="relative flex items-center">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                {isSearching ? (
                  <SimpleLoader size="xsmall" containerClassName="p-0" />
                ) : (
                  <>
                    <Search size={16} className="text-[#8e8e8f] md:hidden" />
                    <Search size={24} className="text-[#8e8e8f] hidden md:block" />
                  </>
                )}
              </div>
              <input
                value={searchValue}
                type="text"
                placeholder="Search"
                className="w-[268px] h-[32px] pl-10 pr-4 py-2 rounded-full text-sm
                         md:w-[495px] md:h-12 md:pl-14 md:pr-12 md:text-base
                         bg-[#17181a] backdrop-blur-sm
                         border border-[rgba(77,77,78,0.34)]
                         text-white placeholder-[#8e8e8f]
                         outline-none focus:border-[rgba(184,212,52,0.4)] transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                onChange={(e) => handleSearchUpdate(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchValue.length > 0 && !hasExternalResults) {
                    handleExternalSearch(searchValue);
                  }
                }}
                onFocus={() => {
                  if (searchValue.length > 0 || searchResult.length > 0) {
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

            {/* Search Results Dropdown - show when user has typed and dropdown is open (so category choices always visible) */}
            {isDropdownVisible && searchValue.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#17181a]/95 backdrop-blur-md rounded-2xl border border-[rgba(77,77,78,0.34)] shadow-2xl z-50">
                {searchResult.length > 0 && !hasExternalResults && (
                  <p className="text-sm text-[#8e8e8f] mb-2">
                    {isLoadingExternal ? "Loading extended results..." : "Press Enter to show extended results"}
                  </p>
                )}

                {/* Select a category to search within - always shown so user can browse Hardware/Semiconductors even with no part results */}
                <div className="mb-4">
                  <p className="text-sm text-[#cececf] mb-3 font-medium">Select a category to search within</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setIsDropdownVisible(false);
                        navigate("/by-category?type=hardware");
                      }}
                      className="px-4 py-2 rounded-full bg-[#171819] border border-[#292a2a] text-sm text-[#b6b6b7] hover:border-[rgba(184,212,52,0.4)] hover:text-[#B8D434] hover:bg-[#1a1b1c] transition-all duration-200"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Hardware
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownVisible(false);
                        navigate("/by-category?type=semiconductors");
                      }}
                      className="px-4 py-2 rounded-full bg-[#171819] border border-[#292a2a] text-sm text-[#b6b6b7] hover:border-[rgba(184,212,52,0.4)] hover:text-[#B8D434] hover:bg-[#1a1b1c] transition-all duration-200"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Semiconductors
                    </button>
                  </div>
                </div>

                {searchResult.length > 0 ? (
                  <>
                    <p className="text-sm text-[#8e8e8f] mb-2 font-medium">
                      {searchResult.length} found parts
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
                            <p className="text-sm font-semibold text-[#efeff0] break-words">
                              {result.mpn}
                            </p>
                            <div className="flex items-center flex-wrap">
                              {result.searchDescription && (
                                <p className="text-xs text-[#8e8e8f]">
                                  {result.searchDescription}
                                </p>
                              )}
                              {result.additionalSearchDescription && (
                                <p className="text-xs text-[#8e8e8f]">
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
                            <p className="text-sm font-semibold text-[#efeff0] break-words">
                              {result.mpn}
                            </p>
                            <div className="flex items-center flex-wrap">
                              {result.manufacturer && (
                                <p className="text-xs text-[#8e8e8f]">
                                  {result.manufacturer}
                                </p>
                              )}
                              {result.description && (
                                <p className="text-xs text-[#8e8e8f]">
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
                  </>
                ) : (
                  <p className="text-sm text-[#8e8e8f]">
                    No parts found for this query. Browse by category above or try different keywords.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <ActionButton icon={<UploadIcon />} label="Upload a BOM" onClick={() => navigate("/upload-bom")} />
            <ActionButton icon={<SellExcessIcon />} label="Sell excess" onClick={() => navigate("/sell-excess")} />
          </div>
        </div>

        {/* Category Cards OR Selected Part Details */}
        {selectedPart && (
          <div className="flex flex-col gap-4 w-full max-w-[1400px] px-4 lg:px-0">
            {/* Part Info Section */}
            <div className="bg-[#1F222B] border border-solid border-[#494B59] rounded-lg p-4 lg:p-6 overflow-x-auto">
              {renderPart()}
            </div>
            
            {/* Part Details Table */}
            {renderPartTable()}
            
            {/* Request for Quote Section */}
            {renderRFQSection()}
          </div>
        )}
      </div>

      {/* Download Modal */}
      {renderDownloadModal()}
    </section>
  );
};

