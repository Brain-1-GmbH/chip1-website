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
        className={`w-full h-10 px-3 pr-10 bg-[#1c1d22] border border-[#323335] rounded text-sm outline-none focus:border-[#99c221] transition-colors appearance-none cursor-pointer text-left flex items-center justify-between ${
          value ? "text-[#f7f7f7]" : "text-[#8e8e8f]"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          size={20}
          className={`text-[#8e8e8f] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1c1d22] border border-[#323335] rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-[#323335] transition-colors ${
                value === option.value
                  ? "bg-[#323335] text-[#99c221]"
                  : "text-[#f7f7f7]"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

