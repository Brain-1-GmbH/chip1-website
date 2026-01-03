import React, { useRef } from "react";
import { ArrowUpRight } from "@carbon/icons-react";

// Placeholder images - replace with actual assets
import companyBg from "../../assets/Picture-1.png";
import productImg from "../../assets/Picture-2.png";
import servicesImg from "../../assets/Picture-3.png";
import qualityImg from "../../assets/Picture-4.png";
import capabilitiesImg from "../../assets/Picture-5.png";
import insight1Img from "../../assets/Picture-6.png";
import insight2Img from "../../assets/Picture-7.png";
import insight3Img from "../../assets/Picture-8.png";
import insight4Img from "../../assets/Picture-9.png";

// Certificate images
import cert1 from "../../assets/Picture-10.png";
import cert2 from "../../assets/Picture-11.png";
import cert3 from "../../assets/Picture-12.png";
import cert4 from "../../assets/Picture-13.png";
import cert5 from "../../assets/Picture-14.png";
import cert6 from "../../assets/Picture-15.png";
import cert7 from "../../assets/Picture-16.png";

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
    image: insight1Img,
  },
];

const PrimaryButton: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <button
    className={`bg-[#99c221] border-t border-[#ceea6c] flex items-center justify-center gap-2 px-4 py-3 rounded-3xl 
               shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] text-[#05080d] font-semibold text-sm
               hover:bg-[#a8d130] transition-colors ${className}`}
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

  return (
    <section className="flex flex-col items-center gap-[72px] px-4 py-20 bg-[#0e0e0f]">
      <div className="max-w-[1280px] w-full flex flex-col gap-[72px]">
        {/* Stats Row */}
        <div className="flex items-start justify-between px-10 relative">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 text-center w-[307px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <p className="text-[60px] font-normal text-[#e5e5e7] leading-[1.3]">
                {stat.value}
              </p>
              <p className="text-2xl text-[#cececf] leading-[1.4]">{stat.label}</p>
            </div>
          ))}
          {/* Gradient overlay on left */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0e0e0f] to-transparent pointer-events-none" />
        </div>

        {/* Company Card */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <img
            src={companyBg}
            alt="Company"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,9,0.8)] to-[rgba(8,8,9,0.54)]" />
          <div className="relative h-full flex items-end p-10">
            <div className="flex items-end justify-between w-full gap-10">
              <div className="flex flex-col gap-6 flex-1">
                <h2
                  className="text-2xl font-semibold text-[#efeff0] leading-[1.4]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Company
                </h2>
                <p className="text-base text-[#cececf] leading-[1.5] max-w-[800px]">
                  For over 20 years, Chip 1 has been a trusted partner in the electronics
                  industry. With $100M+ in stock and a worldwide network, we deliver
                  factory-original and hard-to-find components fast — keeping your
                  production lines running without interruption.
                </p>
              </div>
              <PrimaryButton className="h-12 w-[145px]">Explore</PrimaryButton>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex flex-col gap-6">
          {/* Row 1 */}
          <div className="flex gap-6">
            {featureCards.slice(0, 2).map((card, index) => (
              <div
                key={index}
                className="flex-1 bg-[#0e0e0f] border border-[#0e0e0f] rounded-2xl p-6 h-[378px] flex gap-4"
              >
                <div className="w-[336px] h-[330px] rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col gap-6">
                    <h3
                      className="text-2xl font-semibold text-[#efeff0] leading-[1.4]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-base text-[#cececf] leading-[1.5]">
                      {card.description}
                    </p>
                  </div>
                  <PrimaryButton className="h-10 w-[152px]">Explore</PrimaryButton>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-6">
            {featureCards.slice(2, 4).map((card, index) => (
              <div
                key={index}
                className="flex-1 bg-[#0e0e0f] border border-[#0e0e0f] rounded-2xl p-6 h-[378px] flex gap-4"
              >
                <div className="w-[336px] h-[330px] rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col gap-6">
                    <h3
                      className="text-2xl font-semibold text-[#efeff0] leading-[1.4]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-base text-[#cececf] leading-[1.5]">
                      {card.description}
                    </p>
                  </div>
                  <PrimaryButton className="h-10 w-[152px]">Explore</PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-[#0e0e0f] border border-[#212225] rounded-3xl p-6 flex flex-col items-center gap-10 overflow-hidden">
          <h2
            className="text-[32px] font-semibold text-[#efeff0] leading-[1.4]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Certificates
          </h2>
          <div className="flex items-center justify-between w-full px-4">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-[#0e0e0f] flex flex-col items-center justify-center p-2 rounded-lg w-[156px]"
              >
                <div className="w-[107px] h-[107px] flex items-center justify-center">
                  <img
                    src={cert}
                    alt={`Certificate ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Section */}
        <div className="border border-[#212225] rounded-3xl p-6 flex flex-col gap-[72px] overflow-hidden relative">
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <h2
              className="text-[32px] font-bold text-[#efeff0] leading-[1.4] uppercase"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Insights
            </h2>
            <PrimaryButton className="h-12 w-[120px]">Explore</PrimaryButton>
          </div>

          {/* Scrollable Cards Container */}
          <div className="relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-[#0e0e0f] to-transparent z-10 pointer-events-none" />

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-[#0e0e0f] to-transparent z-10 pointer-events-none" />

            {/* Scrollable container */}
            <div
              ref={insightsContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-[#0b0b0b] border-t border-[#2a2c36] rounded-2xl p-6 
                           flex flex-col gap-4 w-[552px] flex-shrink-0
                           shadow-[-4px_4px_28px_0px_rgba(0,0,0,0.25)]"
                >
                  {/* Image */}
                  <div className="h-[216px] rounded-lg overflow-hidden">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    <h3
                      className="text-2xl font-semibold text-[#efeff0] leading-[1.4]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {insight.title}
                    </h3>
                    <p className="text-xl text-[#cececf] leading-[1.5] line-clamp-4">
                      {insight.description}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <ReadMoreButton />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

