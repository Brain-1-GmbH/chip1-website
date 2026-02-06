import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "@carbon/icons-react";
import logoImg from "../../assets/24180caded4b7abaf5ca507476795b2d150a3994.png";

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
  const location = useLocation();

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 backdrop-blur-md bg-[#0E0E0F]/95 border-b border-[#292a2a]/50"
      style={{ 
        backgroundColor: 'rgba(14, 14, 15, 0.95)',
        width: '100%'
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1 flex-shrink-0 z-10">
        <img
          src={logoImg}
          alt="Chip1 Logo"
          className="h-10 w-auto"
        />
      </Link>

      {/* Navigation - Centered */}
      <nav className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {navItems.map((item) => {
          const isActive = item.href.startsWith("/") && location.pathname === item.href;
          
          return item.href.startsWith("/") ? (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-200 relative ${
                isActive 
                  ? "text-[#B8D434]" 
                  : "text-[#b6b6b7] hover:text-[#B8D434]"
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B8D434] rounded-full" />
              )}
              {item.hasDropdown && (
                <ChevronDown 
                  size={14} 
                  className={`transition-transform ${isActive ? 'text-[#B8D434]' : ''}`}
                />
              )}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1.5 text-[#b6b6b7] text-sm font-medium hover:text-[#B8D434] transition-colors duration-200"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown size={14} />}
            </a>
          );
        })}
      </nav>

      {/* Right spacer for balance */}
      <div className="flex-shrink-0 w-[130px]" />
    </header>
  );
};
