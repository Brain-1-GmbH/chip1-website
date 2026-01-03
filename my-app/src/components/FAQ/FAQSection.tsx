import React, { useState } from "react";
import { Add, Subtract } from "@carbon/icons-react";

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

const FAQItemComponent: React.FC<FAQItemComponentProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-[#323335]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 text-left group"
      >
        <span
          className="text-2xl font-medium text-[#efeff0] leading-[1.4] pr-4 group-hover:text-[#99c221] transition-colors"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {item.question}
        </span>
        <span className="flex-shrink-0 text-[#efeff0] group-hover:text-[#99c221] transition-colors">
          {isOpen ? <Subtract size={24} /> : <Add size={24} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-xl text-[#cececf] leading-[1.5] max-w-[900px]">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative px-20 py-10 bg-[#0e0e0f] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={faqBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgb(14, 14, 15) 0%, rgba(14, 14, 15, 0) 20%, rgba(14, 14, 15, 0) 80%, rgb(14, 14, 15) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1280px] mx-auto px-6">
        {/* Title */}
        <h2
          className="text-[32px] font-bold text-[#efeff0] leading-[1.4] uppercase mb-10"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          FAQ
        </h2>

        {/* FAQ Items */}
        <div className="flex flex-col">
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
    </section>
  );
};

