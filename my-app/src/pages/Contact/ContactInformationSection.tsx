import React from "react";

export const ContactInformationSection: React.FC = () => {
  const contactInfo = [
    {
      region: "EUROPE",
      phone: "+PD-6102 8169 0",
    },
    {
      region: "USA",
      phone: "+1 469 998 2227",
    },
    {
      region: "ASIA",
      phone: "+632 7001 7567",
    },
  ];

  return (
    <section className="bg-[#0e0e0f] py-10 md:py-16 mb-6 md:mb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px]">
        <h2
          className="text-[32px] md:text-5xl font-semibold text-[#efeff0] text-left mb-12 md:mb-16 uppercase"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <p
                className="text-[#99c221] text-[40px] font-semibold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {info.region}
              </p>
              <p className="text-[#cececf] text-base md:text-lg">{info.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
