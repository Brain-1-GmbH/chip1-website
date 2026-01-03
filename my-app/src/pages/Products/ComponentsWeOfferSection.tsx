import React, { useState } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import component images
import imgMicrocontrollers from "../../assets/Picture-1.png";
import imgDSPs from "../../assets/Picture-2.png";
import imgASICs from "../../assets/Picture-3.png";
import imgFPGAs from "../../assets/Picture-4.png";
import imgAmplifiers from "../../assets/Picture-5.png";
import imgInterfaceICs from "../../assets/Picture-6.png";
import imgMemoryICs from "../../assets/Picture-7.png";
import imgVoltageRegulators from "../../assets/Picture-8.png";

interface ComponentItem {
  id: string;
  name: string;
  image: string;
}

interface CategoryData {
  id: string;
  title: string;
  components: ComponentItem[];
}

const categoriesData: CategoryData[] = [
  {
    id: "ics",
    title: "Integrated circuits (ICs)",
    components: [
      { id: "micro", name: "Microcontrollers", image: imgMicrocontrollers },
      { id: "dsp", name: "DSPs", image: imgDSPs },
      { id: "asic", name: "ASICs", image: imgASICs },
      { id: "fpga", name: "FPGAs", image: imgFPGAs },
      { id: "amp", name: "Amplifiers", image: imgAmplifiers },
      { id: "interface", name: "Interface ICs", image: imgInterfaceICs },
      { id: "memory", name: "Memory ICs", image: imgMemoryICs },
      { id: "voltage", name: "Voltage Regulators", image: imgVoltageRegulators },
    ],
  },
  {
    id: "memory",
    title: "Memory",
    components: [
      { id: "dram", name: "DRAM", image: imgMemoryICs },
      { id: "sram", name: "SRAM", image: imgMicrocontrollers },
      { id: "flash", name: "Flash Memory", image: imgDSPs },
      { id: "eeprom", name: "EEPROM", image: imgASICs },
    ],
  },
  {
    id: "processors",
    title: "Processors",
    components: [
      { id: "cpu", name: "CPUs", image: imgMicrocontrollers },
      { id: "gpu", name: "GPUs", image: imgFPGAs },
      { id: "mpu", name: "MPUs", image: imgDSPs },
      { id: "soc", name: "System on Chip", image: imgASICs },
    ],
  },
  {
    id: "discrete",
    title: "Discrete Semiconductors",
    components: [
      { id: "diodes", name: "Diodes", image: imgAmplifiers },
      { id: "transistors", name: "Transistors", image: imgInterfaceICs },
      { id: "thyristors", name: "Thyristors", image: imgVoltageRegulators },
      { id: "mosfets", name: "MOSFETs", image: imgFPGAs },
    ],
  },
  {
    id: "passive",
    title: "Passive Components",
    components: [
      { id: "resistors", name: "Resistors", image: imgVoltageRegulators },
      { id: "capacitors", name: "Capacitors", image: imgMemoryICs },
      { id: "inductors", name: "Inductors", image: imgInterfaceICs },
      { id: "filters", name: "Filters", image: imgAmplifiers },
    ],
  },
  {
    id: "electromechanical",
    title: "Electromechanical Components",
    components: [
      { id: "relays", name: "Relays", image: imgMicrocontrollers },
      { id: "switches", name: "Switches", image: imgDSPs },
      { id: "connectors", name: "Connectors", image: imgASICs },
      { id: "motors", name: "Motors", image: imgFPGAs },
    ],
  },
  {
    id: "sensors",
    title: "Sensors and Modules",
    components: [
      { id: "temp", name: "Temperature Sensors", image: imgAmplifiers },
      { id: "pressure", name: "Pressure Sensors", image: imgInterfaceICs },
      { id: "motion", name: "Motion Sensors", image: imgMemoryICs },
      { id: "proximity", name: "Proximity Sensors", image: imgVoltageRegulators },
    ],
  },
  {
    id: "power",
    title: "Power Components",
    components: [
      { id: "regulators", name: "Voltage Regulators", image: imgVoltageRegulators },
      { id: "converters", name: "DC-DC Converters", image: imgMicrocontrollers },
      { id: "inverters", name: "Inverters", image: imgDSPs },
      { id: "batteries", name: "Battery Management", image: imgASICs },
    ],
  },
  {
    id: "opto",
    title: "Optoelectronics",
    components: [
      { id: "leds", name: "LEDs", image: imgFPGAs },
      { id: "displays", name: "Displays", image: imgAmplifiers },
      { id: "photodiodes", name: "Photodiodes", image: imgInterfaceICs },
      { id: "lasers", name: "Laser Diodes", image: imgMemoryICs },
    ],
  },
  {
    id: "rf",
    title: "RF and Microwave Components",
    components: [
      { id: "rfamps", name: "RF Amplifiers", image: imgAmplifiers },
      { id: "mixers", name: "Mixers", image: imgVoltageRegulators },
      { id: "oscillators", name: "Oscillators", image: imgMicrocontrollers },
      { id: "antennas", name: "Antennas", image: imgDSPs },
    ],
  },
];

interface CategoryTabProps {
  category: CategoryData;
  isActive: boolean;
  onClick: () => void;
}

const CategoryTab: React.FC<CategoryTabProps> = ({ category, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full py-4 text-left transition-all duration-300 group ${
        isActive ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <span
        className={`text-2xl leading-[1.4] transition-colors duration-300 ${
          isActive
            ? "font-semibold text-[#e5e5e7]"
            : "font-normal text-[#545556] group-hover:text-[#858586]"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {category.title}
      </span>
      <ChevronRight
        size={24}
        className={`transition-colors duration-300 ${
          isActive ? "text-[#e5e5e7]" : "text-[#545556] group-hover:text-[#858586]"
        }`}
      />
    </button>
  );
};

interface ComponentCardProps {
  component: ComponentItem;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  return (
    <div className="flex items-center gap-4 p-4 border border-[#1c1d22] hover:border-[#323335] transition-colors">
      {/* Image */}
      <div className="w-[154px] h-[144px] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
        <img
          src={component.image}
          alt={component.name}
          className="w-[152px] h-[115px] object-contain mix-blend-luminosity"
        />
      </div>

      {/* Name */}
      <h4
        className="text-2xl font-medium text-[#e5e5e7] leading-[1.4]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {component.name}
      </h4>
    </div>
  );
};

export const ComponentsWeOfferSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = categoriesData[activeIndex];

  return (
    <section className="bg-[#0e0e0f] px-20 py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Title */}
        <h2
          className="text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-20"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Components We Offer
        </h2>

        {/* Content */}
        <div className="flex gap-12 items-start">
          {/* Left - Category Tabs */}
          <div className="flex flex-col gap-2 w-[576px] flex-shrink-0">
            {categoriesData.map((category, index) => (
              <CategoryTab
                key={category.id}
                category={category}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Right - Component Cards */}
          <div className="flex-1 flex flex-col relative">
            {/* Decorative dots */}
            <div className="absolute -left-4 top-0 bottom-0 flex flex-col justify-between py-4 pointer-events-none">
              {activeCategory.components.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#1c1d22]" />
              ))}
            </div>
            <div className="absolute -right-4 top-0 bottom-0 flex flex-col justify-between py-4 pointer-events-none">
              {activeCategory.components.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#1c1d22]" />
              ))}
            </div>

            {/* Component list */}
            <div className="flex flex-col">
              {activeCategory.components.map((component) => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

