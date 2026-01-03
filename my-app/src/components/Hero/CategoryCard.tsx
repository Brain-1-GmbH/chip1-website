import React from "react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="group bg-[#171819] border border-[#292a2a] flex flex-col gap-1 p-4 rounded-2xl w-[240px] cursor-pointer hover:border-[#B8D434]/40 transition-colors">
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold text-xl text-[#efeff0] leading-[1.5]">
          {title}
        </p>
        <div className="flex items-center justify-center size-[30px]">
          {/* Triple chevron icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            <path
              d="M5 7L10 12L5 17"
              stroke="#B8D434"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 7L15 12L10 17"
              stroke="#B8D434"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 7L20 12L15 17"
              stroke="#B8D434"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <p className="font-normal text-base text-[#cececf] leading-[1.5] truncate">
        {subtitle}
      </p>
    </div>
  );
};

