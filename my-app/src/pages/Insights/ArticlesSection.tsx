import React from "react";
import { ArrowUpRight } from "@carbon/icons-react";

// Import article images
import img1 from "../../assets/image 195.png";
import img2 from "../../assets/image 195-2.png";
import img3 from "../../assets/image 195-3.png";
import img4 from "../../assets/image 195-4.png";
import img5 from "../../assets/image 195-5.png";
import img6 from "../../assets/image 195-6.png";

interface ArticleCard {
  id: number;
  image: string;
  title: string;
  description: string;
}

const articlesData: ArticleCard[] = [
  {
    id: 1,
    image: img1,
    title: "2025 Lead - Time Picture: Who's Tight, Who's Easing, and What to Stock (Now)",
    description:
      "Procurement teams have witnessed the drastic market swing in recent years. From 2020 to 2022, widespread shortages disrupted production plans. By 2023, the challenge had moved to excess inventory. Find out how and why the dynamics are more nuanced, entering 2025.",
  },
  {
    id: 2,
    image: img2,
    title: "GPUHammer: New Memory Attack Threatens Enterprise GPU Security",
    description:
      "GPUHammer targets NVIDIA RTX A6000 GPUs with ECC disabled, silently corrupting AI workloads. Learn the risks and how to prevent this emerging threat.",
  },
  {
    id: 3,
    image: img3,
    title: "Managing Copper Volatility in Electronics Supply Chains",
    description:
      "Copper tariffs are driving up costs, and electronics manufacturers can use proven hedging strategies to stabilize profits, manage supply risks, and stay competitive.",
  },
  {
    id: 4,
    image: img4,
    title: "Navigating the LPDDR4X Supply Crisis: A Strategic Guide for Procurement and Operations Leaders",
    description:
      "As LPDDR4X production winds down ahead of Q2 2026, rising costs and lead times are disrupting supply chains in automotive, industrial, and IoT sectors. This guide outlines key strategies for procurement and operations leaders to secure continuity and mitigate risks.",
  },
  {
    id: 5,
    image: img5,
    title: "Instant Business Impact: Possible Shifts in Electronics Supply Chain",
    description:
      "Proposed U.S. tax reforms may cause price swings, sourcing shifts, and increased capital needs in critical mineral supply chains.",
  },
  {
    id: 6,
    image: img6,
    title: "Hidden BOM Risks: Raw Material Volatility Reshapes Procurement",
    description:
      "Material volatility and policy changes continue to disrupt semiconductor supply chains, affecting costs and sourcing strategies.",
  },
];

export const ArticlesSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-20 py-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-16"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Articles
        </h2>

        {/* Articles Grid */}
        <div className="flex flex-col gap-6 items-center">
          {/* Row 1 */}
          <div className="flex gap-6 w-full">
            {articlesData.slice(0, 2).map((article) => (
              <ArticleCardComponent key={article.id} article={article} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-6 w-full">
            {articlesData.slice(2, 4).map((article) => (
              <ArticleCardComponent key={article.id} article={article} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="flex gap-6 w-full">
            {articlesData.slice(4, 6).map((article) => (
              <ArticleCardComponent key={article.id} article={article} />
            ))}
          </div>

          {/* View More Button */}
          <button className="mt-6 bg-[#99c221] text-[#05080d] text-base font-semibold px-6 py-3 rounded-3xl w-[200px] h-12 flex items-center justify-center hover:bg-[#aad435] transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] border-t border-[#ceea6c]">
            View more
          </button>
        </div>
      </div>
    </section>
  );
};

const ArticleCardComponent: React.FC<{ article: ArticleCard }> = ({
  article,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4 p-6 rounded-2xl border border-[#1c1d22] h-[468px] shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.15)]">
      {/* Image */}
      <div className="h-[216px] rounded-lg overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 h-[146px]">
        <h3
          className="text-2xl font-semibold text-[#efeff0] leading-[1.4] line-clamp-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {article.title}
        </h3>
        <p className="text-xl text-[#cececf] leading-[1.5] line-clamp-3">
          {article.description}
        </p>
      </div>

      {/* Read More Button */}
      <button className="flex items-center gap-2 text-[#99c221] text-sm font-medium px-3 py-2 rounded-3xl self-end hover:bg-[#99c221]/10 transition-colors">
        Read More
        <ArrowUpRight size={20} />
      </button>
    </div>
  );
};

