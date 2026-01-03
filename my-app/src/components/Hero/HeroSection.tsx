import React, { useState } from "react";
import { Close, Search, Upload, Box } from "@carbon/icons-react";
import { CircularProgressbar } from "react-circular-progressbar";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";

import { CategoryCard } from "./CategoryCard";
import { ActionButton } from "./ActionButton";
import { SimpleLoader } from "../UI/SimpleLoader";
import { Switch } from "../UI/Switch";
import { images } from "../../images";

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
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState<"LOCAL" | "EXTERNAL">("LOCAL");
  const [selectedPart, setSelectedPart] = useState<unknown | null>(null);
  const [partDataLoading, setPartDataLoading] = useState<
    string | null | number
  >(null);

  const clearSearch = () => {
    setSearchValue("");
    setSearchResult([]);
    setIsSearching(false);
    setSelectedPart(null);
  };

  const getRandomImage = () => {
    if (images.length === 0) return "";
    return images[Math.floor(Math.random() * images.length)];
  };

  const handleSearch = (value: string) => {
    if (value.length === 0) return;

    setIsSearching(true);

    if (searchType === "LOCAL") {
      axios
        .get(
          `/api/transaction/public/searches/global/parts?query=${value}&size=3&scope=LOCAL`
        )
        .then((res) => {
          if (res.data?.data?.length > 0) {
            setSearchResult(
              res.data?.data.map((item: SearchResult) => ({
                ...item,
                imagePath: getRandomImage(),
                type: "LOCAL",
              }))
            );
          }

          setIsSearching(false);
        });
    } else {
      axios
        .get(
          `/api/transaction/public/searches/global/parts?query=${value}&size=3&scope=EXTERNAL`
        )
        .then((res) => {
          if (res.data?.data?.length > 0) {
            setSearchResult(
              res.data?.data.map((item: SearchResult) => ({
                ...item,
                imagePath: getRandomImage(),
                type: "EXTERNAL",
              }))
            );
          }

          setIsSearching(false);
        });
    }
  };

  const handleSearchUpdate = (newValue: string) => {
    setSearchValue(newValue);
    handleSearch(newValue);
  };

  const getOnePartData = (part: SearchResult) => {
    setSelectedPart(null);
    setPartDataLoading(part.id);
    let url = `/api/part/public/parts/full-details?id=${part.id}`;

    if (part.globalPartId) {
      url = `${url}&globalPartId=${part.globalPartId}`;
    }

    axios.get(url).then((res) => {
      setSelectedPart(res.data);
      setPartDataLoading(null);
    });
  };

  const renderPart = () => {
    // @ts-expect-error - TODO: fix this
    const partData = selectedPart?.data?.globalPart;

    return (
      <div className="flex gap-4 w-full">
        {/* Part Health */}
        <div className="flex flex-col items-center bg-[#2A2D37] rounded-lg p-5 w-[220px] flex-shrink-0">
          <p className="text-white text-lg font-bold mb-4">Part Health</p>

          <div className="w-32 h-32 mb-3">
            <CircularProgressbar
              value={partData?.overallRiskPercentage?.replace("%", "")}
              text={partData?.overallRiskPercentage?.replace("%", "")}
              styles={{
                path: {
                  stroke: "#A4D233",
                  strokeLinecap: "round",
                },
                trail: {
                  stroke: "#3F4451",
                },
                text: {
                  fill: "#FFFFFF",
                  fontSize: "24px",
                  fontWeight: "bold",
                },
              }}
            />
          </div>

          <p className="text-xs text-gray-400 mb-2">Chip1 Health Score</p>

          <div className="flex justify-between w-full text-xs text-gray-400 mb-3 px-2">
            <span>High Risk</span>
            <span>Low Risk</span>
          </div>

          <button className="text-blue-400 text-sm hover:underline">
            See Full Analysis
          </button>
        </div>

        {/* General Information */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-xl font-bold mb-4">
            General Information
          </p>

          <div className="grid grid-cols-4 gap-x-4 gap-y-4">
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">Manufacturer</p>
              <p
                className="text-white text-sm font-semibold truncate"
                title={partData?.manufacturer}
              >
                {partData?.manufacturer || "N/A"}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">Lifecycle</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.lifecycleRisk?.lifecycle || "N/A"}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">Lead-Free Status</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.environmentData?.leadFree || "N/A"}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">ECCN</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.eccn || "N/A"}
              </p>
            </div>

            <div className="min-w-0 col-span-2">
              <p className="text-gray-400 text-xs mb-1">Category</p>
              <p
                className="text-white text-sm font-semibold truncate"
                title={partData?.category}
              >
                {partData?.category || "N/A"}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">Introduced</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.introductionDate || "N/A"}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">RoHS Status</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.environmentData?.rohsStatus || "N/A"}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">HTSUSA</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.environmentData?.htsus || "N/A"}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">Packaging</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.packaging || "N/A"}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">Cage Code</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.mfrCageCode || "N/A"}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">REACH Status</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.environmentData?.reachStatus || "N/A"}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-gray-400 text-xs mb-1">Schedule B</p>
              <p className="text-white text-sm font-semibold truncate">
                {partData?.scheduleB || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        <div className="bg-[#2A2D37] rounded-lg p-5 w-[200px] shrink-0">
          <p className="text-white text-lg font-bold mb-4">Alternatives</p>

          <div className="flex flex-col gap-3">
            {partData?.alternateParts && partData.alternateParts.length > 0 ? (
              partData.alternateParts
                .slice(0, 2)
                .map((alt: unknown, index: number) => (
                  <div
                    key={index}
                    className="border-b border-gray-700 pb-3 last:border-0"
                  >
                    <p className="text-white font-semibold text-sm mb-1 break-all">
                      {/* @ts-expect-error - TODO: fix this */}
                      {alt.mpn || "N/A"}
                    </p>
                    <p className="text-gray-400 text-xs break-all">
                      {/* @ts-expect-error - TODO: fix this */}
                      {alt.manufacturer || "N/A"} •{" "}
                      {/* @ts-expect-error - TODO: fix this */}
                      {alt.compatibility || "Pin to Pin Replacement"}
                    </p>
                  </div>
                ))
            ) : (
              <>
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-white font-semibold text-sm mb-1 break-all">
                    C2012X7R1E334K
                  </p>
                  <p className="text-gray-400 text-xs break-all">
                    TDK • Pin to Pin Drop in Replacement
                  </p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1 break-all">
                    MCAST21GSB7334KTNA01
                  </p>
                  <p className="text-gray-400 text-xs break-all">
                    Taiyo Yuden • Pin to Pin Compatible
                  </p>
                </div>
              </>
            )}
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
          {/* Search Input Container */}
          <div
            className={`transition-all duration-300 ${
              searchResult?.length > 0
                ? "p-4 bg-[#17181a]/80 backdrop-blur-sm rounded-2xl border border-[rgba(77,77,78,0.34)]"
                : ""
            }`}
          >
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

            {/* Search Results */}
            {searchResult?.length > 0 && (
              <div className="flex flex-col mt-3">
                <p className="text-sm text-[#8e8e8f] mb-2">
                  {searchResult.length} results found
                </p>
                <ul className="flex flex-col gap-2 w-[495px]">
                  {searchResult.map((result: SearchResult) => (
                    <div
                      key={result.id}
                      className="flex items-center gap-3 rounded-xl border border-[rgba(77,77,78,0.34)] 
                               bg-[#171819] p-3 cursor-pointer hover:border-[rgba(184,212,52,0.4)] transition-colors"
                      onClick={() => getOnePartData(result)}
                    >
                      {result.type === "LOCAL" && (
                        <>
                          <img
                            src={result.imagePath}
                            alt={result.mpn}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
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
                          {result?.images?.length && result.images.length > 0 ? (
                            <img
                              src={result.images[0]}
                              alt={result.mpn}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <img
                              src={result.imagePath}
                              alt={result.mpn}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          )}
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
            <ActionButton icon={<Upload size={18} />} label="Upload a BOM" />
            <ActionButton icon={<Box size={18} />} label="Sell excess" />
          </div>

          {/* Search Type Toggle */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-[#8e8e8f]">LOCAL</p>
            <Switch
              checked={searchType === "EXTERNAL"}
              onChange={(checked: boolean) =>
                setSearchType(checked ? "EXTERNAL" : "LOCAL")
              }
            />
            <p className="text-sm text-[#8e8e8f]">EXTERNAL</p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="flex items-center gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              subtitle={category.subtitle}
            />
          ))}
        </div>
      </div>

      {/* No Result Warning */}
      {!searchType && (
        <div className="mt-4 flex flex-col items-center justify-center w-[500px]">
          <p className="text-sm text-red-500 text-center">
            No result found in internal search. Please enter full part number
            (you can use external system)
          </p>
        </div>
      )}

      {/* Selected Part Details */}
      {/* @ts-expect-error - TODO: fix this */}
      {selectedPart?.data?.globalPart && (
        <div className="mt-8 flex items-center w-[1000px] bg-[#1F222B] border border-solid border-[#494B59] rounded-3xl p-6">
          {renderPart()}
        </div>
      )}
    </section>
  );
};

