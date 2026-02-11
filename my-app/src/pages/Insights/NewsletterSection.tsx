import React, { useState } from "react";
import { Checkmark, ChevronDown } from "@carbon/icons-react";

// Import background image
import bgImage from "../../assets/The_Chipline_Web-7e01a815-cda3-4b18-9b49-b5e55a7cbb67.png";

const benefits = [
  "Monitor key component prices",
  "Identify lifecycle risks early",
  "Access vetted alternatives",
  "Quality control insights",
  "Supply disruptions analysis",
];

export const NewsletterSection: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    country: "",
    message: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (name === "email" && emailError) {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setEmailError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", formData);
  };

  return (
    <section className="bg-[#0e0e0f] py-10 md:py-16 mb-6 md:mb-[120px] relative">
      {/* Background Image - Full Width */}
      <div className="absolute inset-0 w-full">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover opacity-[0.15]"
        />
      </div>
      <div
        className="absolute inset-0 w-full"
        style={{
          background:
            "linear-gradient(rgb(14, 14, 15) 0%, rgba(14, 14, 15, 0) 20%, rgba(14, 14, 15, 0) 80%, rgb(14, 14, 15) 100%)",
        }}
      />
      
      {/* Content Container */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-[80px] relative">
        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center px-0 md:px-6 py-0">
          {/* Left Side - Title and Benefits */}
          <div className="flex-1 flex flex-col gap-4 md:py-14">
            <h2
              className="text-[24px] md:text-[40px] font-semibold text-[#efeff0] leading-[1.3]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              "The Chipline": monthly updates for supply chain leaders
            </h2>

            <p
              className="text-[14px] md:text-2xl text-[#cececf] leading-[1.4]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              What you'll get in under 3 minutes:
            </p>

            {/* Benefits List */}
            <div className="flex flex-col gap-2 w-full md:w-[534px]">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Checkmark size={24} className="text-[#99c221]" />
                  </div>
                  <p className="text-[14px] md:text-base text-[#cececf] leading-[1.5]">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 flex flex-col gap-6 md:gap-12 items-center w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-none md:max-w-[595px]"
            >
              {/* Company Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf] leading-[1.5]">
                  Company Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
                  onFocus={handleEmailFocus}
                  placeholder="Enter company email"
                  className={`h-12 px-4 py-2 bg-[#1c1d22] border rounded-lg text-base text-white placeholder-[#323335] focus:outline-none transition-colors ${
                    emailError && !isEmailFocused
                      ? "border-[#A21212]"
                      : "border-[#323335] focus:border-[#99c221]"
                  }`}
                  style={{
                    borderRadius: emailError && !isEmailFocused ? "4px" : undefined,
                  }}
                />
                {emailError && !isEmailFocused && (
                  <p className="text-sm text-[#A21212] mt-1">{emailError}</p>
                )}
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf] leading-[1.5]">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className="h-12 px-4 py-2 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] focus:outline-none focus:border-[#99c221] transition-colors"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf] leading-[1.5]">
                  Your Country
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Select your country"
                    className="w-full h-12 px-4 py-2 pr-10 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] focus:outline-none focus:border-[#99c221] transition-colors"
                  />
                  <ChevronDown
                    size={24}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#858586]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf] leading-[1.5]">
                  Message{" "}
                  <span className="text-white/40">(optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write message"
                  rows={4}
                  className="px-4 py-2 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] focus:outline-none focus:border-[#99c221] transition-colors resize-none h-32"
                />
              </div>
            </form>

            {/* Subscribe Button */}
            <button
              type="submit"
              className="bg-[#99c221] text-[#05080d] text-base font-semibold px-4 py-3 rounded-3xl w-full md:w-[200px] h-12 flex items-center justify-center hover:bg-[#aad435] transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] border-t border-[#ceea6c]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

