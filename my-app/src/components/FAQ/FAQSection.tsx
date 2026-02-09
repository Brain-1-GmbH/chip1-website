import React, { useState, useRef, useEffect } from "react";

// Background image for FAQ section
import faqBg from "../../assets/Picture-17.png";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What types of electronic components does Chip 1 specialize in?",
    answer:
      "Chip 1 offers a broad range of components, including integrated circuits, memory, processors, discretes, passives, sensors, power modules, and more. We source both current and obsolete parts from authorized and open-market channels.",
  },
  {
    question: "Where is Chip 1 located?",
    answer:
      "Chip 1 is headquartered in the United States with global operations spanning Europe and Asia. Our strategically located warehouses ensure fast delivery to customers worldwide.",
  },
  {
    question: "How do you ensure part authenticity?",
    answer:
      "We maintain strict quality control processes including visual inspection, electrical testing, X-ray analysis, and decapsulation when necessary. Our facilities are AS6081 certified and we follow IDEA-STD-1010 inspection standards.",
  },
  {
    question: "Do you support small quantity orders?",
    answer:
      "Yes, we support orders of all sizes. Whether you need a single component for prototyping or millions of parts for mass production, we can accommodate your requirements with competitive pricing.",
  },
  {
    question: "Does Chip 1 offer excess inventory solutions?",
    answer:
      "Absolutely. We help companies monetize their excess inventory through our global network. We offer fair market valuations and quick turnaround on purchases, helping you recover value from surplus stock.",
  },
  {
    question: "How fast can Chip 1 deliver components?",
    answer:
      "For in-stock items, we offer same-day shipping. Our global warehouse network enables delivery within 24-48 hours to most locations worldwide. For urgent needs, we provide expedited shipping options.",
  },
  {
    question: "Do you provide alternatives for obsolete parts?",
    answer:
      "Yes, our engineering team specializes in identifying form, fit, and function alternatives for obsolete components. We can help you find suitable replacements to keep your production running.",
  },
  {
    question: "What industries does Chip 1 serve?",
    answer:
      "We serve a wide range of industries including aerospace, defense, medical devices, automotive, industrial automation, telecommunications, and consumer electronics.",
  },
  {
    question: "How can I request a quote?",
    answer:
      "You can request a quote through our website by uploading your BOM, using our search tool, or contacting our sales team directly. We typically respond to RFQs within 24 hours.",
  },
  {
    question: "Does Chip 1 handle ITAR-regulated components?",
    answer:
      "Yes, Chip 1 is ITAR registered and equipped to handle controlled items. We maintain strict compliance with all applicable export regulations and can support defense and aerospace programs.",
  },
];

interface FAQItemComponentProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const PlusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26" fill="none">
    <path
      d="M12.9941 1V25M25 12.994L1 12.994"
      stroke="#B6B6B7"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MinusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 24" fill="none">
    <path
      d="M25 11.9922L1 11.9922"
      stroke="#B6B6B7"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const FAQItemComponent: React.FC<FAQItemComponentProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Set height to the actual content height
        const contentHeight = contentRef.current.scrollHeight;
        setHeight(contentHeight);
      } else {
        // Collapse smoothly
        setHeight(0);
      }
    }
  }, [isOpen]);

  return (
    <div className="border-b border-[#323335]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 text-left group"
      >
        <span
          className="text-base md:text-2xl font-medium text-[#efeff0] leading-[1.4] pr-4 group-hover:text-[#99c221] transition-colors"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {item.question}
        </span>
        <span className="flex-shrink-0 text-[#efeff0] group-hover:text-[#99c221] transition-colors">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: `${height}px`,
          opacity: isOpen ? 1 : 0,
          transitionProperty: "max-height, opacity",
        }}
      >
        <div ref={contentRef} className="pb-8">
          <p className="text-sm md:text-xl text-[#cececf] leading-[1.5] max-w-[900px]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    // Preserve scroll position
    const scrollY = window.scrollY;
    setOpenIndex(openIndex === index ? null : index);
    
    // Restore scroll position after state update
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  return (
    <section className="relative bg-[#0e0e0f] overflow-hidden">
      {/* Mobile: container 375px, padding 24px 16px, flex column, align end, gap 40px, gradient bg */}
      <div
        className="relative w-full max-w-[375px] md:max-w-[1280px] mx-auto
                   flex flex-col items-end
                   py-6 px-4 md:py-10 md:px-6"
        style={{
          gap: "var(--gap-padding-2-xl, 40px)",
          background: "linear-gradient(180deg, #0E0E0F 0.01%, rgba(14, 14, 15, 0) 20.01%, rgba(14, 14, 15, 0) 80%, #0E0E0F 100%)",
        }}
      >
        {/* Background Image with Overlay - desktop / when image is used */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <img
            src={faqBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
            style={{ objectPosition: "-602.101px -837px" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #0E0E0F 0%, rgba(14, 14, 15, 0) 20%, rgba(14, 14, 15, 0) 80%, #0E0E0F 100%)",
            }}
          />
        </div>

        {/* Content - full width on mobile for alignment */}
        <div className="relative w-full flex flex-col items-end gap-10">
          {/* Title */}
          <h2
            className="text-2xl md:text-[32px] font-bold text-[#efeff0] leading-[1.4] uppercase w-full md:mb-10"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            FAQ
          </h2>

          {/* FAQ Items */}
          <div className="flex flex-col w-full">
            {faqData.map((item, index) => (
              <FAQItemComponent
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

