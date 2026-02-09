import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "@carbon/icons-react";

interface CareersDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  width?: number; // Width in pixels (154 or 123)
}

export const CareersDropdown: React.FC<CareersDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select",
  width = 154,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef} style={{ width: `${width}px` }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center border outline-none transition-colors appearance-none cursor-pointer hover:border-[#99c221]/60"
        style={{
          display: "flex",
          padding: "16px 24px",
          alignItems: "center",
          gap: "16px",
          borderRadius: "400px",
          border: "1px solid rgba(77, 77, 78, 0.34)",
          backdropFilter: "blur(4px)",
          backgroundColor: "#111215",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          height: "48px",
          boxSizing: "border-box",
        }}
      >
        <span 
          className="text-sm text-left flex-1"
          style={{
            color: value ? "#f7f7f7" : "#8e8e8f",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "1",
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#8e8e8f] transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 rounded-lg z-50 max-h-[200px] overflow-y-auto w-full px-2 py-1.5"
          style={{
            backgroundColor: "#1C1D22",
            border: "1px solid #212225",
            boxShadow: "-2px 4px 12px 0 rgba(17, 18, 21, 0.80)",
            minWidth: `${width}px`,
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full flex h-10 px-2 py-2 justify-center items-center rounded transition-colors ${
                value === option.value
                  ? "bg-[#323335]"
                  : "bg-transparent hover:bg-[#212225]"
              }`}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "150%",
                color: value === option.value ? "#99C221" : "#f7f7f7",
                borderRadius: "4px",
                gap: "8px",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
