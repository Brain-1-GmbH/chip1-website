import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(104,104,106,0.34)] 
                 bg-gradient-to-br from-[rgba(54,54,54,0.16)] to-[rgba(77,77,78,0.08)]
                 backdrop-blur-sm hover:border-[rgba(104,104,106,0.6)] transition-colors"
    >
      <span className="size-[18px] text-[#b6b6b7]">{icon}</span>
      <span className="text-sm text-[#b6b6b7] font-normal">{label}</span>
    </button>
  );
};

