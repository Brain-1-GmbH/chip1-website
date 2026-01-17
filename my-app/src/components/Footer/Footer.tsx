import React from "react";
import {
  LogoFacebook,
  LogoInstagram,
  LogoTwitter,
  LogoLinkedin,
  LogoYoutube,
} from "@carbon/icons-react";
import logoImg from "../../assets/alpha_logo.png";

const quickLinks = [
  { label: "Company", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Careers", href: "#" },
];

const socialLinks = [
  { label: "Facebook", icon: LogoFacebook, href: "#" },
  { label: "Instagram", icon: LogoInstagram, href: "#" },
  { label: "X", icon: LogoTwitter, href: "#" },
  { label: "Linkedin", icon: LogoLinkedin, href: "#" },
  { label: "Youtube", icon: LogoYoutube, href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Services", href: "#" },
  { label: "Imprint", href: "#" },
  { label: "Whistleblowing", href: "#" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e0e0f] px-20 pt-12 pb-20">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          {/* Left - Logo and Description */}
          <div className="flex flex-col gap-6 w-[420px]">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src={logoImg}
                alt="Chip1 Logo"
                className="h-12 w-auto"
              />
            </a>

            {/* Description */}
            <p className="text-base text-[#e5e5e7] leading-[1.5]">
              Global, hybrid distributor and supply-chain partner for electronic
              components with deep inventory, certified quality, and a digital
              sourcing platform
            </p>
          </div>

          {/* Right - Links */}
          <div className="flex items-start justify-between w-[397px]">
            {/* Quick Links */}
            <div className="flex flex-col gap-4 w-[139px]">
              <h3
                className="text-2xl font-semibold text-[#e5e5e7] leading-[1.4]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Quick Links
              </h3>
              <nav className="flex flex-col">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-2 py-2.5 text-base font-medium text-[#e5e5e7] hover:text-[#99c221] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col gap-4 w-[138px]">
              <h3
                className="text-2xl font-semibold text-[#e5e5e7] leading-[1.4]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Follow Us
              </h3>
              <nav className="flex flex-col">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2.5 px-2 py-2.5 text-base font-medium text-[#e5e5e7] hover:text-[#99c221] transition-colors"
                  >
                    <link.icon size={24} />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#323335]" />

        {/* Bottom Section */}
        <div className="flex items-start justify-between">
          {/* Copyright */}
          <p className="text-base text-[#e5e5e7] leading-[1.5]">
            © 2025 Chip 1 Exchange. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base text-[#e5e5e7] underline hover:text-[#99c221] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

