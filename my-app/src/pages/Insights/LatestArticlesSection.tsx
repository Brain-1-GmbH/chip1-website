import React from "react";

// Import article images
import img1 from "../../assets/efd049b79e26ba1429ad41ab5c5cc7291d7400a6.png";
import img2 from "../../assets/9a41f7f102d0c8c55f2f46042ff605095d286cb5.png";
import img3 from "../../assets/36e5e6a82f42541d06978c44dd226ba9eced4ae9.png";
import img4 from "../../assets/a3517dbafb2338b9abfdf9ced57560d6d63f1554.png";
import img5 from "../../assets/efa5ef267e0273c46f1e7268abea426abdf49c2e.png";
import featuredImg from "../../assets/efd049b79e26ba1429ad41ab5c5cc7291d7400a6 copy.png";

interface ArticleItem {
  id: number;
  image: string;
  title: string;
  isNew?: boolean;
}

const articles: ArticleItem[] = [
  {
    id: 1,
    image: img1,
    title: "Managing copper volatility in electronics supply chains",
    isNew: true,
  },
  {
    id: 2,
    image: img2,
    title: "Managing copper volatility in electronics supply chains",
    isNew: true,
  },
  {
    id: 3,
    image: img3,
    title: "Managing copper volatility in electronics supply chains",
  },
  {
    id: 4,
    image: img4,
    title: "Managing copper volatility in electronics supply chains",
  },
  {
    id: 5,
    image: img5,
    title: "Managing copper volatility in electronics supply chains",
  },
];

export const LatestArticlesSection: React.FC = () => {
  return (
    <section className="bg-[#0e0e0f] px-20 pt-[104px] pb-0">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-16"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Latest Articles
        </h2>

        {/* Content Container */}
        <div className="flex gap-10 items-start">
          {/* Left Side - Article List */}
          <div className="flex flex-col w-[567px] flex-shrink-0">
            {articles.map((article) => (
              <a
                key={article.id}
                href="#"
                className="flex gap-6 items-center py-6 border-b border-[#1c1d22] hover:bg-[#111215]/50 transition-colors first:bg-[#111215]"
              >
                {/* Thumbnail */}
                <div className="w-[140px] h-[80px] rounded overflow-hidden flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-grow">
                  {article.isNew && (
                    <span className="text-base text-[#99c221] font-medium">
                      NEW
                    </span>
                  )}
                  <p className="text-xl text-[#efeff0] font-medium leading-[1.5] line-clamp-2">
                    {article.title}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Right Side - Featured Article */}
          <div className="flex flex-col gap-6 flex-grow rounded-2xl shadow-[-4px_4px_28px_0px_rgba(0,0,0,0.25)]">
            {/* Featured Image */}
            <div className="h-[400px] rounded-2xl overflow-hidden">
              <img
                src={featuredImg}
                alt="Featured article"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Featured Content */}
            <div className="flex flex-col gap-4">
              <h3
                className="text-[40px] font-semibold text-[#efeff0] leading-[1.3]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Managing copper volatility in electronics supply chains
              </h3>
              <p className="text-xl text-[#cececf] leading-[1.5] line-clamp-3">
                Procurement teams have witnessed the drastic market swing in
                recent years. From 2020 to 2022, widespread shortages disrupted
                production plans. By 2023, the challenge had moved to excess
                inventory. Find out how and why the dynamics are more nuanced,
                entering 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

