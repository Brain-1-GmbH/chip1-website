import React, { useState } from "react";

// Background image
import contactBg from "../../assets/Picture-18.png";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative px-20 py-24 bg-[#0e0e0f] overflow-hidden rounded-3xl mx-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
        <img
          src={contactBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
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
        <div className="flex items-center gap-10">
          {/* Left Side - Title and Description */}
          <div className="flex-1 flex flex-col gap-4 py-14">
            <h2
              className="text-5xl font-semibold text-[#efeff0] leading-[1.3] uppercase"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Let's connect
            </h2>
            <p className="text-xl text-[#858586] leading-[1.5]">
              Ready to partner with Chip 1 or have questions about our services?
              We're here to help. Getting in touch with us is easy, and we have a
              global team standing by to support you.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-12 w-full max-w-[595px]"
            >
              {/* Form Fields */}
              <div className="flex flex-col gap-4 w-full">
                {/* Name Field */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#cececf] leading-[1.5]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="h-12 px-4 py-2 bg-[#1c1d22] border border-[#323335] rounded-lg
                             text-base text-white placeholder-[#323335]
                             outline-none focus:border-[#99c221] transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#cececf] leading-[1.5]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-12 px-4 py-2 bg-[#1c1d22] border border-[#323335] rounded-lg
                             text-base text-white placeholder-[#323335]
                             outline-none focus:border-[#99c221] transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#cececf] leading-[1.5]">
                    Message{" "}
                    <span className="text-white/40">(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write message"
                    rows={4}
                    className="h-32 px-4 py-2 bg-[#1c1d22] border border-[#323335] rounded-lg
                             text-base text-white placeholder-[#323335] resize-none
                             outline-none focus:border-[#99c221] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#99c221] border-t border-[#ceea6c] flex items-center justify-center gap-2 
                         h-12 w-[200px] rounded-3xl shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)]
                         text-[#05080d] font-semibold text-base
                         hover:bg-[#a8d130] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

