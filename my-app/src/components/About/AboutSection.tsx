import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "@carbon/icons-react";

// Placeholder images - replace with actual assets
import companyBg from "../../assets/Picture-1.png";
import productImg from "../../assets/Picture-2.png";
import servicesImg from "../../assets/Picture-3.png";
import qualityImg from "../../assets/Picture-4.png";
import capabilitiesImg from "../../assets/Picture-5.png";
// Insights images from Insights page
import insight1Img from "../../assets/efd049b79e26ba1429ad41ab5c5cc7291d7400a6.png";
import insight2Img from "../../assets/9a41f7f102d0c8c55f2f46042ff605095d286cb5.png";
import insight3Img from "../../assets/36e5e6a82f42541d06978c44dd226ba9eced4ae9.png";
import insight4Img from "../../assets/a3517dbafb2338b9abfdf9ced57560d6d63f1554.png";
import insight5Img from "../../assets/efa5ef267e0273c46f1e7268abea426abdf49c2e.png";

// Certificate images
import cert1 from "../../assets/Ellipse 31.svg";
import cert2 from "../../assets/image 265.png";
import cert3 from "../../assets/image 266.png";
import cert4 from "../../assets/image 269.png";
import cert5 from "../../assets/Union-2.svg";
import cert6 from "../../assets/Union.svg";
import cert7 from "../../assets/32121507.png";

const stats = [
  { value: "$100M+", label: "in-stock inventory" },
  { value: "20+ years", label: "of proven expertise" },
  { value: "1M+ orders", label: "shipped to 50+ countries" },
];

const featureCards = [
  {
    title: "Products",
    description:
      "From semiconductors to passive components, we stock a wide range of factory-original and hard-to-find parts",
    image: productImg,
  },
  {
    title: "Services",
    description:
      "We provide shortage sourcing, cost optimization, and inventory solutions tailored to your supply chain needs",
    image: servicesImg,
  },
  {
    title: "Quality",
    description:
      "Our global warehouses and in-house test labs ensure availability, authenticity, and quality at every step",
    image: qualityImg,
  },
  {
    title: "Capabilities",
    description:
      "With $100M+ in stock and advanced sourcing tools, we deliver fast, reliable access to critical components worldwide",
    image: capabilitiesImg,
  },
];

const certificates = [cert1, cert2, cert3, cert4, cert5, cert6, cert7];

const insights = [
  {
    title: "Comprehensive Part Data",
    description:
      "Get instant access to parametric specifications, datasheets, lifecycle status, and PCNs (Product Change Notices) for millions of components. No more scouring multiple sources – MyChip1 aggregates all the technical info you need in one place.",
    image: insight1Img,
  },
  {
    title: "Real-time Market Visibility",
    description:
      "MyChip1 provides a live window into the global market. You can search part availability across both Chip 1's stock and the open market, including franchised sources and verified supply partners.",
    image: insight2Img,
  },
  {
    title: "Up-to-the-Minute Pricing",
    description:
      "Making informed buying decisions is easier with accurate pricing data. MyChip1 displays real-time pricing insights, including current prices, recent transaction prices, and pricing trends for the components you're interested in.",
    image: insight3Img,
  },
  {
    title: "Supply Chain Risk Alerts",
    description:
      "The platform's intelligence goes beyond just finding parts. MyChip1 can alert you to potential supply chain risks – for example, if a component in your BOM is going End-of-Life or if there are signs of an impending shortage.",
    image: insight4Img,
  },
  {
    title: "Streamlined RFQs and Ordering",
    description:
      "Registered users of MyChip1 can seamlessly request quotes (RFQs) through the platform. Simply upload your BOM or enter the parts you need, and the system will guide you through a quick RFQ process.",
    image: insight5Img,
  },
];

const PrimaryButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => (
  <button
    className={`bg-[#99c221] border-t border-[#ceea6c] flex items-center justify-center gap-2 px-4 py-3 rounded-3xl 
               shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] text-[#05080d] font-semibold text-sm cursor-pointer
               hover:bg-[#a8d130] transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const ReadMoreButton: React.FC = () => (
  <button className="flex items-center gap-2 px-2 py-1 text-[#99c221] text-sm font-medium hover:text-[#a8d130] transition-colors">
    Read More
    <ArrowUpRight size={18} />
  </button>
);

export const AboutSection: React.FC = () => {
  const insightsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const featureRoutes: Record<string, string> = {
    Products: "/products",
    Services: "/services",
    Quality: "/quality",
    Capabilities: "/capabilities",
    Company: "/company",
  };

  return (
    <section className="flex flex-col items-center w-full bg-[#0e0e0f] md:px-[80px] md:py-10 md:py-20">
      <div className="max-w-[1280px] w-full flex flex-col md:gap-[72px]">

        {/* Second container (mobile): padding 16px, flex wrap, gap 24px — stats + all cards */}
        <div
          className="flex flex-wrap justify-center items-start content-start gap-6 self-stretch py-4 px-4 md:py-0 md:px-0 md:gap-[72px] md:flex-col"
          style={{
            padding: "var(--gap-padding-m, 16px)",
            gap: "var(--gap-padding-l, 24px)",
          }}
        >
          {/* Stats - mobile layout */}
          <div className="flex flex-col items-center gap-4 w-full md:hidden">
            <div className="flex items-start justify-between w-full gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1 text-center flex-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <p className="text-3xl font-normal text-[#949496] leading-[1.3]">{stat.value}</p>
                  <p className="text-[14px] text-[#A9A9AA] leading-[1.4]">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center w-full">
              <div
                className="flex flex-col items-center gap-1 text-center"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <p className="text-3xl font-normal text-[#949496] leading-[1.3]">{stats[2].value}</p>
                <p className="text-[14px] text-[#A9A9AA] leading-[1.4]">{stats[2].label}</p>
              </div>
            </div>
          </div>

          {/* Stats - desktop layout */}
          <div className="hidden md:flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 w-full md:justify-between md:px-10 md:relative mb-4 md:mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 sm:gap-2 text-center w-full sm:w-auto md:w-[307px]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <p className="text-4xl sm:text-5xl md:text-[60px] font-normal text-[#e5e5e7] leading-[1.3]">
                  {stat.value}
                </p>
                <p className="text-base sm:text-xl md:text-2xl text-[#cececf] leading-[1.4]">{stat.label}</p>
              </div>
            ))}
            <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0e0e0f] to-transparent pointer-events-none" />
          </div>

          {/* Company Card - full width, stacked on mobile */}
          <div className="md:hidden w-full mt-4">
            <div className="flex-1 bg-[#0e0e0f] border border-[#323335] rounded-2xl overflow-hidden flex flex-col items-center text-center">
              <div className="w-full h-[200px] rounded-2xl overflow-hidden">
                <img
                  src={companyBg}
                  alt="Company"
                  className="w-full h-full object-cover opacity-70 rounded-2xl"
                  style={{ objectPosition: "left center" }}
                />
              </div>
              <div className="p-4 flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-3 items-center">
                  <h2
                    className="text-[20px] font-semibold text-[#efeff0] leading-[1.4]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Company
                  </h2>
                  <p className="text-[14px] text-[#cececf] leading-[1.5]">
                    For over 20 years, Chip 1 has been a trusted partner in the electronics
                    industry. With $100M+ in stock and a worldwide network, we deliver
                    factory-original and hard-to-find components fast — keeping your
                    production lines running without interruption.
                  </p>
                </div>
                <PrimaryButton
                  className="h-12 w-[110px] mx-auto"
                  onClick={() => navigate(featureRoutes.Company)}
                >
                  Explore
                </PrimaryButton>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative min-h-[280px] md:h-[400px] rounded-2xl overflow-hidden w-full mt-3 md:mt-6">
          <img
            src={companyBg}
            alt="Company"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,9,0.8)] to-[rgba(8,8,9,0.54)]" />
          <div className="relative h-full flex items-end p-4 sm:p-6 md:p-10 min-h-[280px] md:min-h-0">
            <div className="flex flex-col items-center text-center gap-4 sm:gap-6 w-full md:flex-row md:items-end md:text-left md:gap-10">
              <div className="flex flex-col gap-3 sm:gap-6 flex-1">
                <h2
                  className="text-[20px] md:text-2xl font-semibold text-[#efeff0] leading-[1.4]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Company
                </h2>
                <p className="text-[14px] md:text-base text-[#cececf] leading-[1.5] max-w-[800px]">
                  For over 20 years, Chip 1 has been a trusted partner in the electronics
                  industry. With $100M+ in stock and a worldwide network, we deliver
                  factory-original and hard-to-find components fast — keeping your
                  production lines running without interruption.
                </p>
              </div>
              <PrimaryButton
                className="h-12 w-[110px] mx-auto md:mx-0 md:w-[145px] flex-shrink-0"
                onClick={() => navigate(featureRoutes.Company)}
              >
                Explore
              </PrimaryButton>
            </div>
          </div>
          </div>

          {/* Feature Cards - single column on mobile, 2x2 on desktop */}
          <div className="flex flex-col gap-4 md:gap-6 w-full mt-4 md:mt-6">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {featureCards.slice(0, 2).map((card, index) => (
              <div
                key={index}
                className="flex-1 rounded-2xl p-[1px] bg-gradient-to-r from-[#333333] to-[#0E0E0F]"
              >
                <div className="bg-[#0e0e0f] rounded-2xl p-4 min-h-0 md:h-[378px] flex flex-col items-center text-center gap-4 md:flex-row md:items-stretch md:text-left md:p-6">
                  <div className="w-full md:w-[336px] h-[200px] sm:h-[260px] md:h-[330px] rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-h-0 w-full items-center md:items-start">
                    <div className="flex flex-col gap-3 sm:gap-6 items-center md:items-start">
                      <h3
                        className="text-[20px] md:text-2xl font-semibold text-[#efeff0] leading-[1.4]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-[14px] md:text-base text-[#cececf] leading-[1.5]">
                        {card.description}
                      </p>
                    </div>
                    <PrimaryButton
                      className="h-12 w-[110px] mx-auto md:mx-0 md:w-[152px] mt-2 md:mt-0"
                      onClick={() => navigate(featureRoutes[card.title] ?? "/")}
                    >
                      Explore
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {featureCards.slice(2, 4).map((card, index) => (
              <div
                key={index}
                className="flex-1 rounded-2xl p-[1px] bg-gradient-to-r from-[#333333] to-[#0E0E0F]"
              >
                <div className="bg-[#0e0e0f] rounded-2xl p-4 min-h-0 md:h-[378px] flex flex-col items-center text-center gap-4 md:flex-row md:items-stretch md:text-left md:p-6">
                  <div className="w-full md:w-[336px] h-[200px] sm:h-[260px] md:h-[330px] rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-h-0 w-full items-center md:items-start">
                    <div className="flex flex-col gap-3 sm:gap-6 items-center md:items-start">
                      <h3
                        className="text-[20px] md:text-2xl font-semibold text-[#efeff0] leading-[1.4]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-[14px] md:text-base text-[#cececf] leading-[1.5]">
                        {card.description}
                      </p>
                    </div>
                    <PrimaryButton
                      className="h-12 w-[110px] mx-auto md:mx-0 md:w-[152px] mt-2 md:mt-0"
                      onClick={() => navigate(featureRoutes[card.title] ?? "/")}
                    >
                      Explore
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* Certificates Section - horizontal scroll on mobile */}
          <div className="bg-[rgba(19,21,26,0.05)] md:bg-[#0e0e0f] border border-[#212225] rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col items-center gap-6 md:gap-10 overflow-hidden w-full">
          <h2
            className="text-2xl md:text-[32px] font-semibold text-[#efeff0] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Certificates
          </h2>
          <div className="flex flex-wrap justify-center items-start content-start gap-2 w-full px-4 md:px-4 md:gap-0 md:justify-between md:content-start">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="rounded-lg p-[1px] bg-transparent hover:bg-gradient-to-r hover:from-[#333333] hover:to-[#0E0E0F] transition-colors"
              >
                <div className="bg-[#0e0e0f] flex flex-col items-center justify-center p-2 rounded-lg w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[156px] md:h-auto flex-shrink-0">
                  <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[107px] md:h-[107px] flex items-center justify-center">
                    <img
                      src={cert}
                      alt={`Certificate ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* Insights Section - narrower cards on mobile */}
          <div className="border border-[#212225] rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col gap-8 md:gap-[72px] overflow-hidden relative w-full">
          {/* Header */}
          <div className="flex items-center justify-between w-full gap-4">
            <h2
              className="text-2xl md:text-[32px] font-bold text-[#efeff0] leading-[1.4] uppercase"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Insights
            </h2>
            <PrimaryButton className="hidden md:flex h-12 w-[120px] flex-shrink-0">Explore</PrimaryButton>
          </div>

          {/* Scrollable Cards Container */}
          <div className="relative -mx-4 md:mx-0">
            {/* Left fade gradient - hide on very small screens to maximize card width */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-[80px] md:w-[120px] bg-gradient-to-r from-[#0e0e0f] to-transparent z-10 pointer-events-none" />

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-[80px] md:w-[120px] bg-gradient-to-l from-[#0e0e0f] to-transparent z-10 pointer-events-none" />

            {/* Scrollable container - card width fits mobile viewport */}
            <div
              ref={insightsContainerRef}
              className="flex gap-4 md:gap-6 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-[#0E0E0F] border-t border-[#2A2C36] rounded-2xl p-4 md:p-6 
                           flex flex-col items-start gap-4 w-[311px] sm:w-[311px] md:w-[552px] flex-shrink-0
                           shadow-[-4px_4px_28px_0px_rgba(0,0,0,0.25)]"
                >
                  {/* Image */}
                  <div className="h-[160px] sm:h-[196px] md:h-[216px] rounded-lg overflow-hidden">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 md:gap-4">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-semibold text-[#efeff0] leading-[1.4]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {insight.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-xl text-[#cececf] leading-[1.5] line-clamp-4">
                      {insight.description}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <ReadMoreButton />
                </div>
              ))}
            </div>
          </div>
          <div className="flex md:hidden justify-center w-full">
            <PrimaryButton className="h-12 w-[110px]">Explore</PrimaryButton>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

