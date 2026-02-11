import React, { useState, useRef, useEffect } from "react";
import worldwideMapSvg from "../../assets/WorldwideMap.svg?raw";

type LocationType = "office" | "warehouse-lab" | "operational";

const LEGEND = [
  { type: "office" as const, label: "Office", color: "#99c221" },
  { type: "warehouse-lab" as const, label: "Warehouse & Lab", color: "#99c221" },
  { type: "operational" as const, label: "Operational regions", color: "#99c221" },
];

const IconLocation = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.0007 9.99935C10.459 9.99935 10.8513 9.83615 11.1777 9.50977C11.5041 9.18338 11.6673 8.79102 11.6673 8.33268C11.6673 7.87435 11.5041 7.48199 11.1777 7.1556C10.8513 6.82921 10.459 6.66602 10.0007 6.66602C9.54232 6.66602 9.14996 6.82921 8.82357 7.1556C8.49718 7.48199 8.33398 7.87435 8.33398 8.33268C8.33398 8.79102 8.49718 9.18338 8.82357 9.50977C9.14996 9.83615 9.54232 9.99935 10.0007 9.99935ZM10.0007 16.1243C11.6951 14.5688 12.952 13.1556 13.7715 11.8848C14.5909 10.6139 15.0007 9.48546 15.0007 8.49935C15.0007 6.98546 14.518 5.74588 13.5527 4.7806C12.5875 3.81532 11.4034 3.33268 10.0007 3.33268C8.59787 3.33268 7.41385 3.81532 6.44857 4.7806C5.48329 5.74588 5.00065 6.98546 5.00065 8.49935C5.00065 9.48546 5.41037 10.6139 6.22982 11.8848C7.04926 13.1556 8.30621 14.5688 10.0007 16.1243ZM10.0007 18.3327C7.76454 16.4299 6.0944 14.6625 4.99023 13.0306C3.88607 11.3987 3.33398 9.88824 3.33398 8.49935C3.33398 6.41602 4.00412 4.75629 5.3444 3.52018C6.68468 2.28407 8.23676 1.66602 10.0007 1.66602C11.7645 1.66602 13.3166 2.28407 14.6569 3.52018C15.9972 4.75629 16.6673 6.41602 16.6673 8.49935C16.6673 9.88824 16.1152 11.3987 15.0111 13.0306C13.9069 14.6625 12.2368 16.4299 10.0007 18.3327Z" fill="#99C221" />
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17.3727 12.3795L13.6922 10.7303L13.682 10.7256C13.491 10.6439 13.2825 10.6111 13.0756 10.6302C12.8687 10.6493 12.6698 10.7197 12.4969 10.835C12.4765 10.8484 12.457 10.8631 12.4383 10.8787L10.5367 12.4998C9.33204 11.9147 8.08829 10.6803 7.50313 9.49125L9.12657 7.56078C9.14219 7.54125 9.15704 7.52172 9.1711 7.50062C9.28394 7.3282 9.35239 7.13056 9.37039 6.92529C9.38838 6.72002 9.35534 6.51348 9.27423 6.32406V6.31469L7.62032 2.62797C7.51309 2.38052 7.3287 2.17438 7.09468 2.04034C6.86067 1.9063 6.58958 1.85153 6.32188 1.88422C5.26326 2.02352 4.29155 2.54341 3.58824 3.34679C2.88492 4.15017 2.49809 5.1821 2.50001 6.24984C2.50001 12.453 7.54688 17.4998 13.75 17.4998C14.8177 17.5018 15.8497 17.1149 16.6531 16.4116C17.4564 15.7083 17.9763 14.7366 18.1156 13.678C18.1484 13.4104 18.0937 13.1393 17.9598 12.9053C17.8259 12.6713 17.62 12.4869 17.3727 12.3795ZM13.75 16.2498C11.0987 16.2469 8.55687 15.1924 6.68214 13.3177C4.8074 11.443 3.7529 8.90112 3.75001 6.24984C3.74707 5.48694 4.02192 4.74906 4.52324 4.17399C5.02456 3.59892 5.71806 3.22599 6.47423 3.12484C6.47392 3.12796 6.47392 3.1311 6.47423 3.13422L8.11485 6.80609L6.50001 8.7389C6.48362 8.75776 6.46873 8.77788 6.45548 8.79906C6.33791 8.97947 6.26894 9.18718 6.25525 9.40208C6.24157 9.61697 6.28362 9.83176 6.37735 10.0256C7.08516 11.4733 8.54376 12.9209 10.007 13.628C10.2023 13.7208 10.4184 13.7614 10.634 13.7458C10.8497 13.7302 11.0576 13.6589 11.2375 13.5389C11.2576 13.5254 11.2769 13.5108 11.2953 13.4952L13.1945 11.8748L16.8664 13.5194C16.8664 13.5194 16.8727 13.5194 16.875 13.5194C16.7751 14.2766 16.4027 14.9715 15.8275 15.4741C15.2524 15.9766 14.5138 16.2524 13.75 16.2498Z" fill="#99C221" />
  </svg>
);

export type MapMarker = {
  id: string;
  type: LocationType;
  x: number;
  y: number;
  year?: string;
  country?: string;
  city?: string;
  image?: string;
  address?: string;
  phone?: string;
};

const body3Style: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "150%",
  color: "var(--Main-Gray-Scale-200, #CECECF)",
};

/** Map marker positions (x, y) in 1280×800 coordinate space */
const MAP_MARKERS: MapMarker[] = [
  { id: "m-1770813593350-u1i0ta", type: "office", x: 960, y: 397, year: "2025", country: "Singapore", city: "Singapore", image: "/offices/office-singapore.png", address: "21 Woodlands Close #04-30, Primz Bizhub, Singapore 737854", phone: "+49 6102 8169 0" },
  { id: "m-1770813606417-ehuagt", type: "office", x: 1025, y: 353, year: "2024", country: "South Korea", city: "Seoul", image: "", address: "123 Teheran-ro, Gangnam-gu", phone: "+49 6102 8169 0" },
  { id: "m-1770813613900-e6g65t", type: "office", x: 1022, y: 291, year: "2007", country: "China", city: "Shanghai", image: "/offices/office-china.png", address: "No.111 West Tianmu Road, Jing'an District, Shanghai 200000", phone: "+49 6102 8169 0" },
  { id: "m-1770813646634-j10159", type: "office", x: 643, y: 232, year: "2001", country: "Germany", city: "Frankfurt", image: "/offices/office-germany.png", address: "Dornhofstraße 65, 63263 Neu-Isenburg, Germany", phone: "+49 6102 8169 0" },
  { id: "m-1770813656617-t5fvfr", type: "office", x: 689, y: 229, year: "2025", country: "Italy", city: "Udine", image: "/offices/office-italy.png", address: "Via Molin Nuovo 37, 33100 Udine UD, Italy", phone: "+49 6102 8169 0" },
  { id: "m-1770813679234-vn10ds", type: "office", x: 589, y: 189, year: "2025", country: "United Kingdom", city: "York", image: "/offices/office-uk.png", address: "8 Bramleys, The Menagerie, York YO19 6ET, United Kingdom", phone: "+49 6102 8169 0" },
  { id: "m-1770813697101-r7n9ld", type: "office", x: 636, y: 209, year: "2024", country: "Netherlands", city: "Amsterdam", image: "/offices/office-netherlands.png", address: "Joan Muyskenweg 30, 1114 AN Amsterdam, Netherlands", phone: "+49 6102 8169 0" },
  { id: "m-1770813698967-fw9tlg", type: "office", x: 616, y: 204, year: "2023", country: "Romania", city: "Sibiu", image: "/offices/office-romania.png", address: "Strada Nicolaus Olahus 5, Sibiu, 550370, Romania", phone: "+49 6102 8169 0" },
  { id: "m-1770813739116-qfc3c1", type: "office", x: 235, y: 330, year: "2023", country: "Mexico", city: "Guadalajara", image: "/offices/office-mexico.png", address: "Av. México 304, Floor 5, Office 5, Juan Manuel, Guadalajara, Jalisco 44680, Mexico", phone: "+49 6102 8169 0" },
  { id: "m-1770813750467-zgjuzv", type: "office", x: 184, y: 284, year: "2007", country: "USA", city: "Irvine", image: "/offices/office-usa.png", address: "16411 Scientific Way, Irvine, California 92618, USA", phone: "+49 6102 8169 0" },
  { id: "m-1770813795520-7i235y", type: "office", x: 340, y: 244, year: "2009", country: "Philippines", city: "Manila", image: "/offices/office-philippines.png", address: "Unit 902B, Tektite West Tower, Ortigas Center, Pasig City, Philippines 1605", phone: "+49 6102 8169 0" },
  { id: "m-wh-frankfurt", type: "warehouse-lab", x: 643, y: 232, year: "2001", country: "Germany", city: "Frankfurt", image: "/warehouses/wh-frankfurt.png", address: "Dornhofstraße 65, 63263 Neu-Isenburg, Germany", phone: "+49 6102 8169 0" },
  { id: "m-wh-shenzhen", type: "warehouse-lab", x: 1010, y: 340, year: "2020", country: "China", city: "Shenzhen", image: "/warehouses/wh-shenzhen.png", address: "Tower A, Xiandaicheng Building, No.1058 Huaqiang North Road, Futian District, Shenzhen 518000, China", phone: "+49 6102 8169 0" },
  { id: "m-wh-hongkong", type: "warehouse-lab", x: 1025, y: 355, year: "2019", country: "China", city: "Hong Kong", image: "/warehouses/wh-hongkong.png", address: "Room A2, A3, 5/F, Wing Tai Centre, 12 Hing Yip Street, Kowloon, Hong Kong", phone: "+49 6102 8169 0" },
  { id: "m-wh-arlington", type: "warehouse-lab", x: 270, y: 300, year: "2007", country: "USA", city: "Arlington", image: "/warehouses/wh-arlington.png", address: "2202 E Randol Mill Rd, Arlington, Texas 76011, USA", phone: "+49 6102 8169 0" },
  { id: "m-wh-boston", type: "warehouse-lab", x: 305, y: 255, year: "2025", country: "USA", city: "Boston", image: "/warehouses/wh-boston.png", address: "177 Huntington Ave 17th floor, Boston, Massachusetts 2115, USA", phone: "+49 6102 8169 0" },
  { id: "m-1770813942685-rycn1a", type: "operational", x: 395, y: 440 },
  { id: "m-1770813948785-sbx92b", type: "operational", x: 340, y: 398 },
  { id: "m-1770813956502-pg0sq2", type: "operational", x: 202, y: 167 },
  { id: "m-1770813964635-m5gimv", type: "operational", x: 793, y: 324 },
  { id: "m-1770813975268-3t1pc9", type: "operational", x: 881, y: 327 },
  { id: "m-1770813982102-pj22yf", type: "operational", x: 1071, y: 493 },
  { id: "m-1770813984768-24s644", type: "operational", x: 1211, y: 570 },
];

const HIGHLIGHT_CLASS = "region-highlighted";
const HOVER_CLASS = "region-hovered";

/** Path indices per type - which map regions to highlight when that type is selected */
export type RegionHighlightConfig = Record<LocationType, number[]>;

/** Region highlights per legend type (path indices) */
const REGION_HIGHLIGHT_CONFIG: RegionHighlightConfig = {
  office: [71, 74, 83, 96, 123, 124, 131, 142, 143, 174],
  "warehouse-lab": [83, 124, 142],
  operational: [45, 88, 102, 109, 123, 151, 152],
};

/** All region path indices to highlight (offices + warehouse-labs + operational) - applied once, never turned off */
const ALL_REGION_INDICES = Array.from(
  new Set([
    ...REGION_HIGHLIGHT_CONFIG.office,
    ...REGION_HIGHLIGHT_CONFIG["warehouse-lab"],
    ...REGION_HIGHLIGHT_CONFIG.operational,
  ])
);

const MOBILE_BREAKPOINT = 768;

/** Resolve which path indices contain each marker (point-in-polygon). Run once when SVG is ready. */
function buildMarkerRegionMap(
  container: HTMLElement
): Map<string, number[]> {
  const svg = container.querySelector("svg");
  const paths = container.querySelectorAll<SVGPathElement>("svg path");
  if (!svg || paths.length === 0) return new Map();
  const pt = svg.createSVGPoint();
  const map = new Map<string, number[]>();
  for (const marker of MAP_MARKERS) {
    pt.x = marker.x;
    pt.y = marker.y;
    const indices: number[] = [];
    const candidateIndices = REGION_HIGHLIGHT_CONFIG[marker.type] ?? [];
    for (const i of candidateIndices) {
      const path = paths[i];
      if (path && typeof path.isPointInFill === "function") {
        try {
          if (path.isPointInFill(pt)) indices.push(i);
        } catch {
          // ignore
        }
      }
    }
    if (indices.length > 0) map.set(marker.id, indices);
  }
  return map;
}

export const WorldwideMap: React.FC = () => {
  const [activeTypes, setActiveTypes] = useState<Set<LocationType>>(new Set());
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRegionMapRef = useRef<Map<string, number[]>>(new Map());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const fn = () => setIsMobile(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  // Base highlights: always on, never removed. Re-run when hover/selection changes so they persist if DOM updates.
  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;
    const paths = container.querySelectorAll<SVGPathElement>("svg path");
    if (paths.length === 0) return;
    markerRegionMapRef.current = buildMarkerRegionMap(container);
    ALL_REGION_INDICES.forEach((i) => paths[i]?.classList.add(HIGHLIGHT_CLASS));
  }, [activeTypes, hoveredMarkerId]);

  // Apply hover highlight only to the region(s) containing the hovered marker.
  // Only touch paths in ALL_REGION_INDICES to avoid affecting other SVG elements.
  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;
    const paths = container.querySelectorAll<SVGPathElement>("svg path");
    // Clear hover from region paths only (not the entire SVG)
    ALL_REGION_INDICES.forEach((i) => paths[i]?.classList.remove(HOVER_CLASS));
    if (hoveredMarkerId) {
      const indices = markerRegionMapRef.current.get(hoveredMarkerId);
      if (indices?.length) {
        // Only add to paths that contain this marker and are in our region set
        indices.forEach((i) => {
          if (ALL_REGION_INDICES.includes(i)) paths[i]?.classList.add(HOVER_CLASS);
        });
      }
    }
  }, [hoveredMarkerId, activeTypes]);

  const toggleType = (type: LocationType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 overflow-visible">
      {/* Extra padding so office cards and lines aren't clipped at edges */}
      <div className="overflow-visible py-16 px-8 sm:py-24 sm:px-16 -my-16 -mx-8 sm:-my-24 sm:-mx-16">
        <div
          ref={mapRef}
          className="relative rounded-2xl overflow-visible w-full aspect-[1280/800] max-w-[1280px] mx-auto"
        >
          {/* Map SVG layer - clipped to rounded corners only */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div
              className="worldwide-map-inner w-full h-full"
              dangerouslySetInnerHTML={{ __html: worldwideMapSvg }}
            />
          </div>
          {/* Map markers - can overflow, no clipping */}
        {MAP_MARKERS.map(({ id, type, x, y, year, country, city, image, address, phone }) => {
          const isActive = activeTypes.has(type);
          const left = (x / 1280) * 100;
          const top = (y / 800) * 100;
          const hasCardData = (year || country || city) && (type === "office" || type === "warehouse-lab");
          const isHovered = hasCardData && id === hoveredMarkerId;
          const isHoverable = isActive && (type === "office" || type === "warehouse-lab" || type === "operational");
          return (
            <div
              key={id}
              className={`absolute map-marker ${isHoverable ? "cursor-pointer" : ""}`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: isHoverable ? "auto" : undefined,
              }}
              onMouseEnter={isHoverable ? () => setHoveredMarkerId(id) : undefined}
              onMouseLeave={isHoverable ? () => setHoveredMarkerId(null) : undefined}
            >
              {(type === "office" || type === "warehouse-lab") && isHovered && !isMobile && (year || country || city) && (
                <div
                  className="office-label-block office-card-animate absolute left-1/2 pointer-events-none flex flex-col items-start gap-1 whitespace-nowrap"
                  style={{
                    bottom: "calc(50% + 205px)",
                    transform: "translate(95px, 0)",
                  }}
                >
                  {year && (
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: "150%",
                        color: "#CECECF",
                      }}
                    >
                      {year}
                    </span>
                  )}
                  {(country || city) && (
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 20,
                        fontWeight: 500,
                        lineHeight: "150%",
                        color: "#EFEFF0",
                      }}
                    >
                      {[country, city].filter(Boolean).join(", ")}
                    </span>
                  )}
                </div>
              )}
              {(type === "office" || type === "warehouse-lab") && isHovered && !isMobile && (
                <svg
                  className="office-line office-card-animate absolute bottom-1/2 left-1/2 pointer-events-none"
                  viewBox="0 0 337 200"
                  preserveAspectRatio="xMidYMax meet"
                  fill="none"
                  style={{
                    width: "334px",
                    height: "197px",
                    minWidth: "334px",
                    minHeight: "197px",
                    transform: "translate(-50%, 0) translate(165px, 0)",
                    animationDelay: "80ms",
                  }}
                >
                  <path
                    d="M84.666 0.5V0H84.3329L84.2046 0.307442L84.666 0.5ZM-0.000651121 197C-0.000651121 198.473 1.19326 199.667 2.66602 199.667C4.13877 199.667 5.33268 198.473 5.33268 197C5.33268 195.527 4.13877 194.333 2.66602 194.333C1.19326 194.333 -0.000651121 195.527 -0.000651121 197ZM336.666 0.5V0H84.666V0.5V1H336.666V0.5ZM84.666 0.5L84.2046 0.307442L2.20458 196.807L2.66602 197L3.12745 197.193L85.1274 0.692558L84.666 0.5Z"
                    fill="#CEEA6C"
                  />
                </svg>
              )}
              {(type === "office" || type === "warehouse-lab") && isHovered && !isMobile && (
                <div
                  className="office-details-block office-card-animate absolute left-1/2 pointer-events-none flex flex-col items-start gap-2"
                  style={{ top: "calc(50% - 181px)", transform: "translate(95px, 0)", minWidth: 240, animationDelay: "160ms" }}
                >
                  <div
                    className="rounded overflow-hidden flex-shrink-0"
                    style={{ width: 240, height: 144 }}
                  >
                    {image ? (
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#2A2A2B]" />
                    )}
                  </div>
                  {address && (
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-0.5">
                        <IconLocation />
                      </span>
                      <span style={body3Style} className="whitespace-normal">
                        {address}
                      </span>
                    </div>
                  )}
                  {phone && (
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-0.5">
                        <IconPhone />
                      </span>
                      <span style={body3Style} className="whitespace-normal">
                        {phone}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {type === "office" && (
                <div
                  className={`legend-office map-marker-office ${isActive ? "legend-office--active" : "legend-office--inactive"}`}
                />
              )}
              {type === "warehouse-lab" && (
                <div className="legend-warehouse map-marker-warehouse">
                  <svg width="12" height="10" viewBox="-8 -8 31 31" fill="none" preserveAspectRatio="xMidYMid meet">
                    {isActive ? (
                      <>
                        <path
                          d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z"
                          fill="#CEEA6C"
                          opacity="0.05"
                          transform="translate(7.5, 6.5) scale(2) translate(-7.5, -6.5)"
                        />
                        <path
                          d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z"
                          fill="#CEEA6C"
                          opacity="0.1"
                          transform="translate(7.5, 6.5) scale(1.6) translate(-7.5, -6.5)"
                        />
                        <path
                          d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z"
                          fill="#99C221"
                          opacity="1"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z"
                          fill="#8E8E8F"
                          opacity="0.05"
                          transform="translate(7.5, 6.5) scale(2) translate(-7.5, -6.5)"
                        />
                        <path
                          d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z"
                          fill="#8E8E8F"
                          opacity="0.1"
                          transform="translate(7.5, 6.5) scale(1.6) translate(-7.5, -6.5)"
                        />
                        <path
                          d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z"
                          fill="#8E8E8F"
                          opacity="0.5"
                        />
                      </>
                    )}
                  </svg>
                </div>
              )}
              {type === "operational" && (
                <div className={`legend-operational map-marker-operational ${isActive ? "legend-operational--active" : "legend-operational--inactive"}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="legend-operational-ring">
                    <circle cx="10" cy="10" r="9.5" stroke={isActive ? "#99C221" : "#8E8E8F"} strokeWidth="1" fill="none" strokeDasharray="10.7 4.2 10.7 4.2 10.7 4.2 10.7 4.2" strokeDashoffset="4.95" />
                  </svg>
                  <div
                    className="legend-operational-dot"
                    style={{
                      background: isActive ? "#99C221" : "#8E8E8F",
                      boxShadow: isActive ? "0 0 7px 0 #F1F9CE, 0 0 32px 0 #E3F4A2" : "0 0 7px 0 rgba(206, 206, 207, 0.70), 0 0 32px 0 rgba(206, 206, 207, 0.70)",
                      opacity: isActive ? 1 : 0.5,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Legend */}
        <div
          className="absolute bottom-6 left-6 flex flex-col gap-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <button
            type="button"
            onClick={() => toggleType("office")}
            className={`flex items-center gap-3 transition-all duration-200 cursor-pointer text-left min-h-[20px] ${
              activeTypes.has("office") ? "opacity-100" : "opacity-50"
            } hover:opacity-100`}
          >
            <div className="legend-icon-slot">
              <div className={`legend-office ${activeTypes.has("office") ? "legend-office--active" : "legend-office--inactive"}`} />
            </div>
            <span className="text-[#cececf]" style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 400 }}>{LEGEND[0].label}</span>
          </button>
          <button
            type="button"
            onClick={() => toggleType("warehouse-lab")}
            className={`flex items-center gap-3 transition-all duration-200 cursor-pointer text-left min-h-[20px] ${
              activeTypes.has("warehouse-lab") ? "opacity-100" : "opacity-50"
            } hover:opacity-100`}
          >
            <div className="legend-icon-slot">
              <div className="legend-warehouse">
                <svg width="12" height="10" viewBox="-8 -8 31 31" fill="none" preserveAspectRatio="xMidYMid meet">
                  {activeTypes.has("warehouse-lab") ? (
                    <>
                      <path d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z" fill="#CEEA6C" opacity="0.05" transform="translate(7.5, 6.5) scale(2) translate(-7.5, -6.5)" />
                      <path d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z" fill="#CEEA6C" opacity="0.1" transform="translate(7.5, 6.5) scale(1.6) translate(-7.5, -6.5)" />
                      <path d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z" fill="#99C221" opacity="1" />
                    </>
                  ) : (
                    <>
                      <path d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z" fill="#8E8E8F" opacity="0.05" transform="translate(7.5, 6.5) scale(2) translate(-7.5, -6.5)" />
                      <path d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z" fill="#8E8E8F" opacity="0.1" transform="translate(7.5, 6.5) scale(1.6) translate(-7.5, -6.5)" />
                      <path d="M5.46717 1C6.23697 -0.333332 8.16147 -0.333334 8.93127 0.999999L14.1274 10C14.8972 11.3333 13.935 13 12.3954 13H2.00307C0.463467 13 -0.498785 11.3333 0.271015 10L5.46717 1Z" fill="#8E8E8F" opacity="0.5" />
                    </>
                  )}
                </svg>
              </div>
            </div>
            <span className="text-[#cececf]" style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 400 }}>{LEGEND[1].label}</span>
          </button>
          <button
            type="button"
            onClick={() => toggleType("operational")}
            className={`flex items-center gap-3 transition-all duration-200 cursor-pointer text-left min-h-[20px] ${
              activeTypes.has("operational") ? "opacity-100" : "opacity-50"
            } hover:opacity-100`}
          >
            <div className="legend-icon-slot">
              <div className={`legend-operational ${activeTypes.has("operational") ? "legend-operational--active" : "legend-operational--inactive"}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="legend-operational-ring">
                  <circle cx="10" cy="10" r="9.5" stroke={activeTypes.has("operational") ? "#99C221" : "#8E8E8F"} strokeWidth="1" fill="none" strokeDasharray="3.5 5" />
                </svg>
                <div
                  className="legend-operational-dot"
                  style={{
                    background: activeTypes.has("operational") ? "#99C221" : "#8E8E8F",
                    boxShadow: activeTypes.has("operational") ? "0 0 7px 0 #F1F9CE, 0 0 32px 0 #E3F4A2" : "0 0 7px 0 rgba(206, 206, 207, 0.70), 0 0 32px 0 rgba(206, 206, 207, 0.70)",
                    opacity: activeTypes.has("operational") ? 1 : 0.5,
                  }}
                />
              </div>
            </div>
            <span className="text-[#cececf]" style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 400 }}>{LEGEND[2].label}</span>
          </button>
        </div>
      </div>
      </div>

      {/* Mobile list - offices and warehouse-labs open downward when type selected */}
      {isMobile && (activeTypes.has("office") || activeTypes.has("warehouse-lab")) && (
        <div className="flex flex-col gap-6 mt-4 md:hidden">
          {activeTypes.has("office") && (
            <div className="flex flex-col gap-4">
              <h3 className="text-[#efeff0] font-medium" style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}>
                {LEGEND[0].label}
              </h3>
              <div className="flex flex-col gap-4">
                {MAP_MARKERS.filter((m) => m.type === "office" && (m.year || m.country || m.city))
                  .map((m) => (
                    <div
                      key={m.id}
                      className="flex flex-col gap-2 p-4 rounded-xl bg-[#1a1a1b] border border-[#2a2a2b]"
                    >
                      {m.year && (
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#CECECF" }}>{m.year}</span>
                      )}
                      {(m.country || m.city) && (
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 500, color: "#EFEFF0" }}>
                          {[m.country, m.city].filter(Boolean).join(", ")}
                        </span>
                      )}
                      <div className="rounded overflow-hidden flex-shrink-0 w-full max-w-[240px] aspect-[240/144]">
                          {m.image ? (
                            <img src={m.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#2A2A2B]" />
                          )}
                        </div>
                      {m.address && (
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5">
                            <IconLocation />
                          </span>
                          <span style={body3Style} className="whitespace-normal">
                            {m.address}
                          </span>
                        </div>
                      )}
                      {m.phone && (
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5">
                            <IconPhone />
                          </span>
                          <span style={body3Style} className="whitespace-normal">
                            {m.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
          {activeTypes.has("warehouse-lab") && (
            <div className="flex flex-col gap-4">
              <h3 className="text-[#efeff0] font-medium" style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}>
                {LEGEND[1].label}
              </h3>
              <div className="flex flex-col gap-4">
                {MAP_MARKERS.filter((m) => m.type === "warehouse-lab")
                  .map((m) => (
                    <div
                      key={m.id}
                      className="flex flex-col gap-2 p-4 rounded-xl bg-[#1a1a1b] border border-[#2a2a2b]"
                    >
                      {m.year && (
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#CECECF" }}>{m.year}</span>
                      )}
                      {(m.country || m.city) && (
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 500, color: "#EFEFF0" }}>
                          {[m.country, m.city].filter(Boolean).join(", ")}
                        </span>
                      )}
                      <div className="rounded overflow-hidden flex-shrink-0 w-full max-w-[240px] aspect-[240/144]">
                          {m.image ? (
                            <img src={m.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#2A2A2B]" />
                          )}
                        </div>
                      {m.address && (
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5">
                            <IconLocation />
                          </span>
                          <span style={body3Style} className="whitespace-normal">
                            {m.address}
                          </span>
                        </div>
                      )}
                      {m.phone && (
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5">
                            <IconPhone />
                          </span>
                          <span style={body3Style} className="whitespace-normal">
                            {m.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes officeCardFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes officeCardLabelIn {
          from { opacity: 0; transform: translate(95px, -10px); }
          to { opacity: 1; transform: translate(95px, 0); }
        }
        @keyframes officeCardDetailsIn {
          from { opacity: 0; transform: translate(95px, 16px); }
          to { opacity: 1; transform: translate(95px, 0); }
        }
        .office-card-animate {
          animation: officeCardFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
        .office-label-block.office-card-animate {
          animation: officeCardLabelIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .office-line.office-card-animate {
          animation: officeCardFadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .office-details-block.office-card-animate {
          animation: officeCardDetailsIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .worldwide-map-inner svg { width: 100%; height: 100%; object-fit: contain; }
        .worldwide-map-inner path {
          transition: fill 0.55s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .worldwide-map-inner path.${HIGHLIGHT_CLASS},
        .worldwide-map-inner path.${HOVER_CLASS} {
          transition: none;
        }
        .worldwide-map-inner path.${HIGHLIGHT_CLASS} {
          fill: #2B2C2C;
          stroke: #3D4B1E;
          stroke-width: 1px;
          paint-order: stroke fill;
        }
        .worldwide-map-inner path.${HOVER_CLASS} {
          fill: rgba(153, 194, 33, 0.12);
          stroke-width: 1px;
          stroke: var(--Main-Primary-Scale-600, #769A16);
          opacity: 0.5;
          paint-order: stroke fill;
          filter: drop-shadow(0 0 16px rgba(227, 244, 162, 0.12)) drop-shadow(0 0 16px rgba(227, 244, 162, 0.12));
        }
        .legend-icon-slot { width: 20px; min-width: 20px; height: 20px; min-height: 20px; display: flex; align-items: center; justify-content: center; }
        .legend-office { width: 10px; height: 10px; aspect-ratio: 1/1; border-radius: 40px; position: relative; transition: background 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-office--active { background: #99C221; box-shadow: 0 0 7px 0 #F1F9CE, 0 0 32px 0 #E3F4A2; }
        .legend-office--active::before { content: ""; position: absolute; inset: -4px; border-radius: 40px; background: #CEEA6C; opacity: 0.1; pointer-events: none; transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-office--active::after { content: ""; position: absolute; inset: -5px; border-radius: 40px; background: #CEEA6C; opacity: 0.05; pointer-events: none; transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-office--inactive { background: #8E8E8F; opacity: 0.5; }
        .legend-office--inactive::before { content: ""; position: absolute; inset: -4px; border-radius: 40px; background: #8E8E8F; opacity: 0.1; pointer-events: none; transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-office--inactive::after { content: ""; position: absolute; inset: -5px; border-radius: 40px; background: #8E8E8F; opacity: 0.05; pointer-events: none; transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-warehouse { transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-warehouse svg { width: 20px; height: 20px; }
        .legend-warehouse path { transition: fill 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-operational { width: 20px; height: 20px; position: relative; display: flex; align-items: center; justify-content: center; }
        .legend-operational-ring { position: absolute; transition: stroke 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-operational-dot { position: absolute; width: 8px; height: 8px; border-radius: 50%; pointer-events: none; transition: background 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .legend-operational--inactive .legend-operational-ring { opacity: 0.5; }
        .map-marker { pointer-events: none; }
        .map-marker-office { width: 14px; height: 14px; }
        .map-marker-warehouse svg { width: 30px; height: 25px; }
        .map-marker-operational { width: 14px; height: 14px; }
        .map-marker-operational .legend-operational-ring { width: 14px; height: 14px; }
        .map-marker-operational .legend-operational-dot { width: 5px; height: 5px; }
      `}</style>
    </div>
  );
};
