import React, { useState, useEffect, useRef } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const contactDropdownRef = useRef<HTMLDivElement | null>(null);
  const contactButtonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Block scroll on body and html
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isContactDropdownOpen) {
      return;
    }

    // Calculate dropdown position when it opens (fixed positioning uses viewport coordinates)
    if (contactButtonRef.current) {
      const rect = contactButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px = mt-2 equivalent
        left: rect.left,
      });
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contactDropdownRef.current &&
        !contactDropdownRef.current.contains(event.target as Node) &&
        contactButtonRef.current &&
        !contactButtonRef.current.contains(event.target as Node)
      ) {
        setIsContactDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsContactDropdownOpen(false);
      }
    };

    const handleResize = () => {
      if (contactButtonRef.current) {
        const rect = contactButtonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
        });
      }
    };

    const handleScroll = () => {
      if (contactButtonRef.current) {
        const rect = contactButtonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isContactDropdownOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 flex items-start justify-between px-4 pt-4 pb-2 md:items-center md:px-10 md:py-4 backdrop-blur-md bg-[linear-gradient(180deg,#0E0E0F_39.81%,rgba(14,14,15,0)_100%)] md:bg-[#0E0E0F]/95 border-b border-[#292a2a]/50 ${isMobileMenuOpen ? 'z-[302]' : 'z-[200]'}`}
        style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden" }}
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
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
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
                {item.hasDropdown && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform ${isActive ? 'text-[#B8D434]' : ''}`}
                  />
                )}
              </Link>
            ) : (
              <div key={item.label} className="relative">
                <button
                  ref={contactButtonRef}
                  type="button"
                  className="flex items-center gap-1.5 text-[#b6b6b7] text-sm font-medium hover:text-[#B8D434] transition-colors duration-200 cursor-pointer"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  onClick={() => setIsContactDropdownOpen((prev) => !prev)}
                  aria-expanded={isContactDropdownOpen}
                  aria-haspopup="menu"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform ${isContactDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden w-8 h-8 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.781 18.7198C19.8507 18.7895 19.906 18.8722 19.9437 18.9632C19.9814 19.0543 20.0008 19.1519 20.0008 19.2504C20.0008 19.349 19.9814 19.4465 19.9437 19.5376C19.906 19.6286 19.8507 19.7114 19.781 19.781C19.7114 19.8507 19.6286 19.906 19.5376 19.9437C19.4465 19.9814 19.349 20.0008 19.2504 20.0008C19.1519 20.0008 19.0543 19.9814 18.9632 19.9437C18.8722 19.906 18.7895 19.8507 18.7198 19.781L12.5004 13.5607L6.28104 19.781C6.14031 19.9218 5.94944 20.0008 5.75042 20.0008C5.55139 20.0008 5.36052 19.9218 5.21979 19.781C5.07906 19.6403 5 19.4494 5 19.2504C5 19.0514 5.07906 18.8605 5.21979 18.7198L11.4401 12.5004L5.21979 6.28104C5.07906 6.14031 5 5.94944 5 5.75042C5 5.55139 5.07906 5.36052 5.21979 5.21979C5.36052 5.07906 5.55139 5 5.75042 5C5.94944 5 6.14031 5.07906 6.28104 5.21979L12.5004 11.4401L18.7198 5.21979C18.8605 5.07906 19.0514 5 19.2504 5C19.4494 5 19.6403 5.07906 19.781 5.21979C19.9218 5.36052 20.0008 5.55139 20.0008 5.75042C20.0008 5.94944 19.9218 6.14031 19.781 6.28104L13.5607 12.5004L19.781 18.7198Z" fill="#99C221"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12ZM3.75 6.75H20.25C20.4489 6.75 20.6397 6.67098 20.7803 6.53033C20.921 6.38968 21 6.19891 21 6C21 5.80109 20.921 5.61032 20.7803 5.46967C20.6397 5.32902 20.4489 5.25 20.25 5.25H3.75C3.55109 5.25 3.36032 5.32902 3.21967 5.46967C3.07902 5.61032 3 5.80109 3 6C3 6.19891 3.07902 6.38968 3.21967 6.53033C3.36032 6.67098 3.55109 6.75 3.75 6.75ZM20.25 17.25H3.75C3.55109 17.25 3.36032 17.329 3.21967 17.4697C3.07902 17.6103 3 17.8011 3 18C3 18.1989 3.07902 18.3897 3.21967 18.5303C3.36032 18.671 3.55109 18.75 3.75 18.75H20.25C20.4489 18.75 20.6397 18.671 20.7803 18.5303C20.921 18.3897 21 18.1989 21 18C21 17.8011 20.921 17.6103 20.7803 17.4697C20.6397 17.329 20.4489 17.25 20.25 17.25Z" fill="#99C221"/>
            </svg>
          )}
        </button>

        {/* Right spacer for balance */}
        <div className="hidden md:block flex-shrink-0 w-[130px]" />
      </header>

      {/* Contact Us Dropdown - Fixed positioning to escape stacking context */}
      {isContactDropdownOpen && (
        <div
          ref={contactDropdownRef}
          className="fixed w-[160px] bg-[#1c1d22] border border-[#323335] rounded-lg shadow-lg overflow-hidden z-[9999]"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <Link
            to="/contact"
            className="block px-4 py-3 text-sm text-[#b6b6b7] hover:text-[#B8D434] hover:bg-[#252833] transition-colors duration-200"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            onClick={() => setIsContactDropdownOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/careers"
            className="block px-4 py-3 text-sm text-[#b6b6b7] hover:text-[#B8D434] hover:bg-[#252833] transition-colors duration-200 border-t border-[#323335]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            onClick={() => setIsContactDropdownOpen(false)}
          >
            Careers
          </Link>
        </div>
      )}

      {/* Mobile menu overlay - outside header for proper positioning */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[300] bg-[#0E0E0F] overflow-y-auto overflow-x-hidden"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            maxWidth: '100vw',
            height: '100vh',
            backgroundColor: '#0E0E0F'
          }}
        >
          <div className="min-h-full w-full flex flex-col bg-[#0E0E0F]">
            {/* Header with logo */}
            <div className="w-full px-4 pt-4 pb-2 flex justify-start items-start flex-shrink-0">
              <Link to="/" className="flex items-center gap-1" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={logoImg} alt="Chip1 Logo" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Navigation menu - scrollable */}
            <nav className="flex-1 w-full px-6 py-8 flex flex-col gap-6">
              {[...navItems, { label: "Careers", href: "/careers" }].map((item) => {
                const isActive = item.href.startsWith("/") && location.pathname === item.href;
                return item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xl transition-colors duration-200 ${
                      isActive ? "text-[#B8D434]" : "text-[#e5e5e7]"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl text-[#e5e5e7]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
