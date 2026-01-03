import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "@carbon/icons-react";

const navItems = [
  { label: "Company", href: "/company" },
  { label: "Services", href: "/services" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/quality" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact Us", href: "#", hasDropdown: true },
];

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-10 py-5">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1 flex-shrink-0">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 4.5L14 14M14 14L23.5 4.5M14 14L4.5 23.5M14 14L23.5 23.5"
            stroke="#B8D434"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="4.5" cy="4.5" r="2" fill="#B8D434" />
          <circle cx="23.5" cy="4.5" r="2" fill="#B8D434" />
          <circle cx="4.5" cy="23.5" r="2" fill="#B8D434" />
          <circle cx="23.5" cy="23.5" r="2" fill="#B8D434" />
          <circle cx="14" cy="14" r="2.5" fill="#B8D434" />
        </svg>
        <span className="text-white text-xl font-semibold tracking-tight">
          Chip<span className="text-white">1</span>
        </span>
      </Link>

      {/* Navigation - Centered */}
      <nav className="flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
        {navItems.map((item) =>
          item.href.startsWith("/") ? (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#B8D434] transition-colors"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown size={14} />}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#B8D434] transition-colors"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown size={14} />}
            </a>
          )
        )}
      </nav>

      {/* Right spacer for balance */}
      <div className="flex-shrink-0 w-[130px]" />
    </header>
  );
};

