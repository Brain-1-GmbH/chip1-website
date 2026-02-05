import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "@carbon/icons-react";

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled = false,
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
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex w-[252px] px-2 py-2 justify-between items-center rounded-lg border outline-none transition-colors appearance-none cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{
          fontFamily: "Inter, sans-serif",
          borderColor: "#212225",
          backgroundColor: "#1C1D22",
          boxShadow: "-2px 4px 12px 0 rgba(17, 18, 21, 0.80)",
        }}
      >
        <span 
          className="text-sm text-left flex-1"
          style={{
            color: value ? "#f7f7f7" : "#8e8e8f",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "150%",
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={20}
          className={`text-[#8e8e8f] transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 rounded-lg z-50 max-h-[200px] overflow-y-auto"
          style={{
            width: "252px",
            backgroundColor: "#1C1D22",
            border: "1px solid #212225",
            boxShadow: "-2px 4px 12px 0 rgba(17, 18, 21, 0.80)",
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
                fontFamily: "Inter, sans-serif",
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



