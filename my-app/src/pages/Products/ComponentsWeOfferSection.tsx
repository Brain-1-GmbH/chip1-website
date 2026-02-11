import React, { useState } from "react";
import { ChevronRight } from "@carbon/icons-react";

// Import component images
// First category - Integrated circuits (ICs) - 8 images
import imgMicrocontrollers from "../../assets/image 153.png";
import imgDSPs from "../../assets/image 153-1.png";
import imgASICs from "../../assets/image 153-2.png";
import imgFPGAs from "../../assets/image 153-3.png";
import imgAmplifiers from "../../assets/image 153-4.png";
import imgInterfaceICs from "../../assets/image 153-5.png";
import imgMemoryICs from "../../assets/image 153-6.png";
import imgVoltageRegulators from "../../assets/image 153-7.png";

// Second category - Memory - 5 images
import imgDRAM from "../../assets/dram.png";
import imgSRAM from "../../assets/sram.png";
import imgFlash from "../../assets/falsh.png";
import imgEEPROM from "../../assets/eerom.png";
import imgSSD from "../../assets/ssd.png";

// Third category - Processors - 3 images
import imgCPU from "../../assets/image 153 copy.png";
import imgGPU from "../../assets/image 153-1 copy.png";
import imgMPU from "../../assets/image 153-2 copy.png";

// Fourth category - Discrete Semiconductors - 5 images
import imgDiodes from "../../assets/image 153 copy 2.png";
import imgTransistors from "../../assets/image 153-1 copy 2.png";
import imgThyristors from "../../assets/image 153-2 copy 2.png";
import imgMOSFETs from "../../assets/image 153-3 copy.png";
import imgDiscreteExtra from "../../assets/image 153-4 copy.png";

// Fifth category - Passive Components - 4 images
import imgResistors from "../../assets/image 153 copy 3.png";
import imgCapacitors from "../../assets/image 153-1 copy 3.png";
import imgInductors from "../../assets/image 153-2 copy 3.png";
import imgFilters from "../../assets/image 153-3 copy 2.png";

// Sixth category - Electromechanical Components - 6 images
import imgRelays from "../../assets/image 153 copy 4.png";
import imgSwitches from "../../assets/image 153-1 copy 4.png";
import imgConnectors from "../../assets/image 153-2 copy 4.png";
import imgMotors from "../../assets/image 153-3 copy 3.png";
import imgElectroExtra1 from "../../assets/image 153-4 copy 2.png";
import imgElectroExtra2 from "../../assets/image 153-5 copy.png";

// Seventh category - Sensors and Modules - 5 images
import imgTempSensors from "../../assets/image 153 copy 5.png";
import imgPressureSensors from "../../assets/image 153-1 copy 5.png";
import imgMotionSensors from "../../assets/image 153-2 copy 5.png";
import imgProximitySensors from "../../assets/image 153-3 copy 4.png";
import imgSensorsExtra from "../../assets/image 153-4 copy 3.png";

// Eighth category - Power Components - 5 images
import imgRegulators from "../../assets/image 153 copy 6.png";
import imgConverters from "../../assets/image 153-1 copy 6.png";
import imgInverters from "../../assets/image 153-2 copy 6.png";
import imgBatteries from "../../assets/image 153-3 copy 5.png";
import imgPowerExtra from "../../assets/image 153-4 copy 4.png";

// Ninth category - Optoelectronics - 5 images
import imgLEDs from "../../assets/image 153 copy 7.png";
import imgDisplays from "../../assets/image 153-1 copy 7.png";
import imgPhotodiodes from "../../assets/image 153-2 copy 7.png";
import imgLasers from "../../assets/image 153-3 copy 6.png";
import imgOptoExtra from "../../assets/image 153-4 copy 5.png";

// Tenth category - RF and Microwave Components - 5 images
import imgRFAmps from "../../assets/image 153 copy 8.png";
import imgMixers from "../../assets/image 153-1 copy 8.png";
import imgOscillators from "../../assets/image 153-2 copy 8.png";
import imgAntennas from "../../assets/image 153-3 copy 7.png";
import imgRFExtra from "../../assets/image 153-4 copy 6.png";

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
      { id: "dram", name: "DRAM", image: imgDRAM },
      { id: "sram", name: "SRAM", image: imgSRAM },
      { id: "flash", name: "Flash Memory", image: imgFlash },
      { id: "eeprom", name: "EEPROM", image: imgEEPROM },
      { id: "ssd", name: "SSD", image: imgSSD },
    ],
  },
  {
    id: "processors",
    title: "Processors",
    components: [
      { id: "cpu", name: "CPUs", image: imgCPU },
      { id: "gpu", name: "GPUs", image: imgGPU },
      { id: "mpu", name: "MPUs", image: imgMPU },
      { id: "soc", name: "System on Chip", image: imgASICs },
    ],
  },
  {
    id: "discrete",
    title: "Discrete Semiconductors",
    components: [
      { id: "diodes", name: "Diodes", image: imgDiodes },
      { id: "transistors", name: "Transistors", image: imgTransistors },
      { id: "thyristors", name: "Thyristors", image: imgThyristors },
      { id: "mosfets", name: "MOSFETs", image: imgMOSFETs },
      { id: "discrete-extra", name: "IGBTs", image: imgDiscreteExtra },
    ],
  },
  {
    id: "passive",
    title: "Passive Components",
    components: [
      { id: "resistors", name: "Resistors", image: imgResistors },
      { id: "capacitors", name: "Capacitors", image: imgCapacitors },
      { id: "inductors", name: "Inductors", image: imgInductors },
      { id: "filters", name: "Filters", image: imgFilters },
    ],
  },
  {
    id: "electromechanical",
    title: "Electromechanical Components",
    components: [
      { id: "relays", name: "Relays", image: imgRelays },
      { id: "switches", name: "Switches", image: imgSwitches },
      { id: "connectors", name: "Connectors", image: imgConnectors },
      { id: "motors", name: "Motors", image: imgMotors },
      { id: "fuses", name: "Fuses", image: imgElectroExtra1 },
      { id: "circuit-breakers", name: "Circuit Breakers", image: imgElectroExtra2 },
    ],
  },
  {
    id: "sensors",
    title: "Sensors and Modules",
    components: [
      { id: "temp", name: "Temperature Sensors", image: imgTempSensors },
      { id: "pressure", name: "Pressure Sensors", image: imgPressureSensors },
      { id: "motion", name: "Motion Sensors", image: imgMotionSensors },
      { id: "proximity", name: "Proximity Sensors", image: imgProximitySensors },
      { id: "sensors-extra", name: "IoT Modules", image: imgSensorsExtra },
    ],
  },
  {
    id: "power",
    title: "Power Components",
    components: [
      { id: "regulators", name: "Voltage Regulators", image: imgRegulators },
      { id: "converters", name: "DC-DC Converters", image: imgConverters },
      { id: "inverters", name: "Inverters", image: imgInverters },
      { id: "batteries", name: "Battery Management", image: imgBatteries },
      { id: "power-extra", name: "Transformers", image: imgPowerExtra },
    ],
  },
  {
    id: "opto",
    title: "Optoelectronics",
    components: [
      { id: "leds", name: "LEDs", image: imgLEDs },
      { id: "displays", name: "Displays", image: imgDisplays },
      { id: "photodiodes", name: "Photodiodes", image: imgPhotodiodes },
      { id: "lasers", name: "Laser Diodes", image: imgLasers },
      { id: "opto-extra", name: "Optocouplers", image: imgOptoExtra },
    ],
  },
  {
    id: "rf",
    title: "RF and Microwave Components",
    components: [
      { id: "rfamps", name: "RF Amplifiers", image: imgRFAmps },
      { id: "mixers", name: "Mixers", image: imgMixers },
      { id: "oscillators", name: "Oscillators", image: imgOscillators },
      { id: "antennas", name: "Antennas", image: imgAntennas },
      { id: "rf-extra", name: "RF Modules", image: imgRFExtra },
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
    <div className="relative flex items-center gap-4 p-4 border border-[#1c1d22] hover:border-[#323335] transition-colors">
      {/* Corner circles */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-[#1C1D22]" aria-hidden />
      {/* Image */}
      <div className="w-[154px] h-[144px] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
        <img
          src={component.image}
          alt={component.name}
          className="w-[152px] h-[115px] object-contain grayscale"
        />
      </div>

      {/* Name */}
      <h4
        className="text-2xl font-medium text-[#e5e5e7] leading-[1.4] truncate"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {component.name}
      </h4>
    </div>
  );
};

export const ComponentsWeOfferSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(categoriesData[0]?.id || null);

  const handleTabClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleMobileCategoryClick = (categoryId: string) => {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <section className="bg-[#0e0e0f] px-4 py-10 md:px-[80px] md:py-24 md:pb-32 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
        {/* Title */}
        <h2
          className="text-[32px] md:text-5xl font-semibold text-[#efeff0] leading-[1.3] mb-8 md:mb-20"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Components We Offer
        </h2>

        {/* Mobile - Accordion */}
        <div className="md:hidden flex flex-col gap-2">
          {categoriesData.map((category) => {
            const isOpen = openCategoryId === category.id;
            return (
              <div key={category.id}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-4 text-left"
                  onClick={() => handleMobileCategoryClick(category.id)}
                >
                  <span
                    className={`text-2xl leading-[1.4] transition-colors duration-300 ${
                      isOpen
                        ? "font-semibold text-[#e5e5e7]"
                        : "font-normal text-[#545556]"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {category.title}
                  </span>
                  <ChevronRight
                    size={24}
                    className={`transition-transform duration-300 ease-in-out ${
                      isOpen
                        ? "-rotate-90 text-[#e5e5e7]"
                        : "rotate-90 text-[#545556]"
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col pt-2">
                    {category.components.map((component) => (
                      <ComponentCard key={component.id} component={component} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Content */}
        <div className="hidden md:flex gap-12 items-start">
          {/* Left - Category Tabs */}
          <div className="flex flex-col gap-2 w-[576px] flex-shrink-0">
            {categoriesData.map((category, index) => (
              <CategoryTab
                key={category.id}
                category={category}
                isActive={index === activeIndex}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </div>

          {/* Right - Component Cards */}
          <div className="flex-1 flex flex-col relative">
            {categoriesData.map((category, categoryIndex) => {
              const isActive = categoryIndex === activeIndex;
              if (!isActive) return null;
              
              return (
                <div
                  key={category.id}
                  className="flex flex-col transition-opacity duration-500 ease-in-out opacity-100"
                >
                  {/* Component list */}
                  <div
                    className={`flex flex-col transition-all duration-[400ms] ease-in-out ${
                      isAnimating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                    }`}
                  >
                    {category.components.map((component) => (
                      <ComponentCard key={component.id} component={component} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

