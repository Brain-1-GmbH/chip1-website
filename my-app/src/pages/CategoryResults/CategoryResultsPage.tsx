import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Search } from "@carbon/icons-react";
import { fetchPartsList, buildPartsFilter } from "../../services/categoryApi";
import type { PartsListFilter } from "../../types/category";
import { CATEGORY_L1_KEYS } from "../../types/category";

// Type for location state passed from ByCategoryPage
interface LocationState {
  categoryL1Key?: string;
  categoryL2Key?: string;
  categoryL3Key?: string;
}

// A part is a generic record from the API
type RawPart = Record<string, unknown>;

// Column definition for the dynamic table
interface ColumnDef {
  key: string;
  label: string;
}

// Extract display string from API value (may be string, number, or nested object)
const toDisplayString = (v: unknown): string => {
  if (v == null) return "—";
  if (typeof v === "string") return v || "—";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    return v.map(toDisplayString).filter((s) => s !== "—").join(", ") || "—";
  }
  if (typeof v === "object" && v !== null) {
    const obj = v as Record<string, unknown>;
    for (const key of ["name", "value", "label", "title", "displayName", "description"]) {
      if (key in obj && obj[key] != null) {
        const result = toDisplayString(obj[key]);
        if (result !== "—") return result;
      }
    }
    for (const val of Object.values(obj)) {
      if (typeof val === "string" && val) return val;
      if (typeof val === "number") return String(val);
    }
    return "—";
  }
  return String(v);
};

// Keys to skip in the dynamic table (IDs, metadata, technical/internal fields)
const HIDDEN_KEYS = new Set([
  // IDs and references
  "id", "crmId", "crmPartId", "partId", "internalId", "externalId",
  "objectId", "uid", "uuid", "guid", "sku", "slug",
  // Timestamps and audit
  "createdAt", "updatedAt", "createdBy", "updatedBy",
  "created", "updated", "modified", "modifiedAt", "modifiedBy",
  "lastModified", "lastUpdated", "timestamp",
  // Media / links
  "imageUrl", "thumbnailUrl", "images", "image", "links", "url",
  "href", "icon", "logo", "thumbnail", "photos", "attachments",
  // Technical / internal
  "dataBits", "parametric", "rawData", "metadata", "meta",
  "filters", "hasMore", "totalCount", "sort", "sortOrder",
  "version", "revision", "hash", "checksum", "etag",
  "tags", "flags", "status", "active", "deleted", "archived",
  "type", "kind", "class", "className", "objectType",
  // API pagination artifacts
  "page", "size", "number", "first", "last", "empty",
  "totalElements", "totalPages", "pageable", "numberOfElements",
]);

// Pretty-print a camelCase or snake_case key to a column header
const formatColumnLabel = (key: string): string => {
  return key
    // camelCase -> spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // snake_case -> spaces
    .replace(/_/g, " ")
    // capitalize first letter of each word
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

// Check if a key name looks like an ID or technical field by pattern
const looksLikeIdOrTechnical = (key: string): boolean => {
  const lower = key.toLowerCase();
  // Ends with "id", "Id", "_id", "Ref", "ref", "key", "Key", "code"
  if (/(?:_id|id|ref|key|code|hash|token|secret)$/i.test(lower)) return true;
  // Starts with "is_", "has_", "can_"
  if (/^(?:is[_A-Z]|has[_A-Z]|can[_A-Z])/.test(key)) return true;
  return false;
};

// Derive visible columns from the first N parts
const deriveColumns = (parts: RawPart[]): ColumnDef[] => {
  const keySet = new Map<string, number>(); // key -> count of non-null values
  for (const part of parts) {
    for (const [key, val] of Object.entries(part)) {
      if (HIDDEN_KEYS.has(key)) continue;
      if (looksLikeIdOrTechnical(key)) continue;
      keySet.set(key, (keySet.get(key) || 0) + (val != null ? 1 : 0));
    }
  }
  // Filter to keys that have at least one non-null value
  return Array.from(keySet.entries())
    .filter(([, count]) => count > 0)
    .map(([key]) => ({
      key,
      label: formatColumnLabel(key),
    }));
};

export const CategoryResultsPage: React.FC = () => {
  const { type, category, subtype } = useParams<{
    type: string;
    category: string;
    subtype: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Get category keys from location state (passed from ByCategoryPage)
  const locationState = location.state as LocationState | null;

  // Parts data state — store raw API objects for dynamic column rendering
  const [parts, setParts] = useState<RawPart[]>([]);
  const [totalParts, setTotalParts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10;

  // Dynamic filter state — built from API response `filters` field
  const [filterSelections, setFilterSelections] = useState<Record<string, string[]>>({});

  // Build filter from location state or URL params
  const getPartsFilter = useCallback((): PartsListFilter => {
    // Use location state if available (more accurate)
    if (locationState?.categoryL1Key) {
      return buildPartsFilter(
        locationState.categoryL1Key,
        locationState.categoryL2Key,
        locationState.categoryL3Key
      );
    }
    // Fallback: derive from URL params
    const categoryL1Key = type === "semiconductors"
      ? CATEGORY_L1_KEYS.SEMICONDUCTOR
      : CATEGORY_L1_KEYS.HARDWARE;
    return { categoryL1Key };
  }, [locationState, type]);

  // Fetch parts from API
  const loadParts = useCallback(async (page: number = 0) => {
    setLoading(true);
    setError(null);
    try {
      const filter = getPartsFilter();
      const response = await fetchPartsList(filter, page, pageSize);
      setParts(response.data.content as RawPart[]);
      setTotalParts(response.data.totalElements);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
    } catch (err) {
      console.error("Failed to fetch parts:", err);
      setError("Failed to load parts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [getPartsFilter, pageSize]);

  // Load parts on mount and when filter changes
  useEffect(() => {
    loadParts(0);
  }, [loadParts]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      loadParts(newPage);
    }
  };

  const handleFilterToggle = (filterKey: string, value: string) => {
    setFilterSelections((prev) => {
      const current = prev[filterKey] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterKey]: updated };
    });
  };

  const clearFilters = () => {
    setFilterSelections({});
  };

  const appliedFiltersCount = Object.values(filterSelections).reduce(
    (sum, arr) => sum + arr.length, 0
  );

  // Derive table columns dynamically from the loaded parts
  const columns = useMemo(() => deriveColumns(parts), [parts]);
  const colCount = columns.length + 1; // +1 for checkbox column

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
        <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
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
        <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
          <div className="flex gap-6">
            {/* Left Sidebar - Dynamic Filters built from column data */}
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

              {/* Dynamic filter groups — derive unique values from visible columns */}
              {columns.slice(0, 6).map((col) => {
                // Collect unique display values for this column
                const uniqueVals = Array.from(
                  new Set(parts.map((p) => toDisplayString(p[col.key])))
                ).filter((v) => v !== "—").slice(0, 10);
                if (uniqueVals.length < 2) return null; // Skip columns with <2 unique values
                const selected = filterSelections[col.key] || [];
                return (
                  <div key={col.key} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className="text-sm font-medium text-[#fcfdfc]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {col.label} ({uniqueVals.length})
                      </h3>
                      {selected.length > 0 && (
                        <span className="text-xs text-[#8e8e8f]">
                          {selected.length} selected{" "}
                          <button
                            onClick={() =>
                              setFilterSelections((prev) => ({ ...prev, [col.key]: [] }))
                            }
                            className="text-[#99c221] hover:text-[#b6db40] transition-colors"
                          >
                            X
                          </button>
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uniqueVals.map((val) => (
                        <label
                          key={val}
                          className={`flex items-center gap-2 cursor-pointer p-1.5 rounded transition-colors ${
                            selected.includes(val)
                              ? "bg-[#252833] border border-[rgba(184,212,52,0.2)]"
                              : "hover:bg-[#252833]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected.includes(val)}
                            onChange={() => handleFilterToggle(col.key, val)}
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
                          <span className="text-sm text-[#b6b6b7] truncate" title={val}>
                            {val}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Action Buttons */}
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
                  {loading ? "Loading..." : `${totalParts.toLocaleString()} parts`}
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

              {/* Dynamic Table — horizontal scroll when columns exceed viewport */}
              <div
                className="overflow-x-auto"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#494B59 transparent",
                }}
              >
                <table className="w-full" style={{ minWidth: `${Math.max(columns.length * 180 + 60, 600)}px` }}>
                  <thead className="bg-[#0F0F0F] border-b border-[#1C1D22]">
                    <tr>
                      <th
                        className="px-4 py-3 text-left w-10 sticky left-0 z-10 bg-[#0F0F0F]"
                      >
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
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          className="px-4 py-3 text-left text-sm font-semibold text-[#fcfdfc] whitespace-nowrap"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minWidth: "150px" }}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1D22]">
                    {/* Loading State */}
                    {loading && (
                      <tr>
                        <td colSpan={colCount} className="px-4 py-12">
                          <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-8 h-8 border-3 border-[#99c221] border-t-transparent rounded-full animate-spin" />
                              <p
                                className="text-[#8e8e8f] text-sm"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                Loading parts...
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                      <tr>
                        <td colSpan={colCount} className="px-4 py-12">
                          <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                              <p
                                className="text-red-400 text-sm"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                {error}
                              </p>
                              <button
                                onClick={() => loadParts(currentPage)}
                                className="px-4 py-2 text-sm text-[#0F0F0F] font-medium rounded-full"
                                style={{
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                  background: "#99C221",
                                }}
                              >
                                Retry
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Empty State */}
                    {!loading && !error && parts.length === 0 && (
                      <tr>
                        <td colSpan={colCount} className="px-4 py-12">
                          <div className="flex items-center justify-center">
                            <p
                              className="text-[#8e8e8f] text-sm"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              No parts found for this category
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Parts rows — dynamic columns */}
                    {!loading && !error && parts.map((part, rowIdx) => (
                      <tr
                        key={String(part.id ?? rowIdx)}
                        className="hover:bg-[#252833] transition-colors cursor-pointer"
                        onClick={() =>
                          navigate("/product", {
                            state: { part, context: { type, category, subtype } },
                          })
                        }
                      >
                        <td
                          className="px-4 py-4 w-10 sticky left-0 z-10 bg-[#0F0F0F]"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            className="px-4 py-4 text-sm text-[#fcfdfc] max-w-[220px] truncate"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            title={toDisplayString(part[col.key])}
                          >
                            {toDisplayString(part[col.key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!loading && !error && totalPages > 0 && (
                <div className="p-4 border-t border-[#1C1D22] flex items-center justify-between bg-[#0F0F0F]">
                  {/* Showing X-Y of Z */}
                  <p
                    className="text-sm text-[#8e8e8f]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Showing {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, totalParts)} of {totalParts.toLocaleString()} parts
                  </p>

                  {/* Page numbers and navigation */}
                  <div className="flex items-center gap-1">
                    {/* Previous button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className={`px-3 py-1.5 text-sm rounded transition-colors ${
                        currentPage === 0
                          ? "text-[#545556] cursor-not-allowed"
                          : "text-[#b6b6b7] hover:text-[#fcfdfc] hover:bg-[#252833]"
                      }`}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      ‹
                    </button>

                    {/* Page numbers */}
                    {(() => {
                      const pages: (number | string)[] = [];
                      const maxVisible = 7;
                      
                      if (totalPages <= maxVisible) {
                        // Show all pages
                        for (let i = 0; i < totalPages; i++) pages.push(i);
                      } else {
                        // Always show first page
                        pages.push(0);
                        
                        if (currentPage > 2) {
                          pages.push("...");
                        }
                        
                        // Pages around current
                        const start = Math.max(1, currentPage - 1);
                        const end = Math.min(totalPages - 2, currentPage + 1);
                        for (let i = start; i <= end; i++) {
                          if (!pages.includes(i)) pages.push(i);
                        }
                        
                        if (currentPage < totalPages - 3) {
                          pages.push("...");
                        }
                        
                        // Always show last page
                        if (!pages.includes(totalPages - 1)) {
                          pages.push(totalPages - 1);
                        }
                      }

                      return pages.map((page, idx) =>
                        typeof page === "string" ? (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-2 py-1 text-sm text-[#545556]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            …
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`min-w-[32px] px-2 py-1.5 text-sm rounded transition-colors ${
                              page === currentPage
                                ? "bg-[#99c221] text-[#0F0F0F] font-medium"
                                : "text-[#b6b6b7] hover:text-[#fcfdfc] hover:bg-[#252833]"
                            }`}
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {page + 1}
                          </button>
                        )
                      );
                    })()}

                    {/* Next button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages - 1}
                      className={`px-3 py-1.5 text-sm rounded transition-colors ${
                        currentPage >= totalPages - 1
                          ? "text-[#545556] cursor-not-allowed"
                          : "text-[#b6b6b7] hover:text-[#fcfdfc] hover:bg-[#252833]"
                      }`}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
