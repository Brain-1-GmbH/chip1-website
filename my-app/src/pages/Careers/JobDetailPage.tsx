import React, { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Add } from "@carbon/icons-react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import applicationBg from "../../assets/Applications-600f6e86-735c-43cb-95f0-8443f5521907.png";

// Mock job data - in real app this would come from API
const jobData: Record<string, {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  descriptionSecond?: string;
  tags: string[];
  department: string;
  mission: string[];
  skills: string[];
  benefits: string[];
}> = {
  "1": {
    id: "1",
    title: "Key Account Manager (m/w/d) / Vertriebsmitarbeiter Außendienst",
    type: "Permanent employee, Full-time",
    location: "Neu-Isenburg",
    description: "We are Chip 1 Exchange GmbH & Co. KG from Neu-Isenburg. We know that there's a lot of difference between good ideas and progressive action. Since our founding in 2001, we have continuously developed our entrepreneurial vision and are now experts in the global distribution of electronic components. Microchips, transistors, LEDs, and much more – our worldwide customers rely on the reliable supply of our first-class technology.",
    descriptionSecond: "Our continuity and the commitment of our more than 300 outstanding employees are crucial to our success.",
    tags: ["7+ years", "Market knowledge", "High degree", "Interpersonal skills", "Fluent German"],
    department: "sales",
    mission: [
      "Are you a passionate salesperson who enjoys being on the move and always striving to identify customer needs before they are even expressed? Then this is the right position for you!",
      "You will be responsible for expanding our regional presence. Through your customer-focused and proactive approach, you will build long-term customer loyalty and successfully expand our solutions and service portfolio.",
      "You create meaningful activity reports in the responsible sales area",
      "You prepare and present customer-specific presentations",
      "You are responsible for keeping an eye on your sales, margin and growth targets",
      "Your work will always be carried out in close cooperation with the Inside Sales Team",
    ],
    skills: [
      "Several years of professional experience in field sales",
      "Profound market knowledge of the semiconductor industry and experience in customer management systems (CRM)",
      "High degree of self-organization, strong analytical skills, strongly solution-oriented",
      "Excellent presentation and interpersonal skills",
      "Fluent written and spoken German and English",
    ],
    benefits: [
      "Team: flat hierarchies, short information and decision-making channels, regular team-building events",
      "Working environment: varied customer network and a challenging job with great scope for creativity",
      "Personal development: thorough training and tailor-made training concepts",
      "Further highlights: company pension plan, discounted membership at EGYM Wellpass as well as in-house fitness studio, company health management, employee discounts and much more.",
    ],
  },
};

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = id ? jobData[id] : null;
  const fileInputRefs = {
    cv: useRef<HTMLInputElement>(null),
    reference: useRef<HTMLInputElement>(null),
    other: useRef<HTMLInputElement>(null),
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    availableFrom: "",
    expectedSalary: "",
    message: "",
    coverLetter: "",
  });

  const [files, setFiles] = useState({
    cv: null as File | null,
    reference: null as File | null,
    other: null as File | null,
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

  const handleFileSelect = (
    type: "cv" | "reference" | "other",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application submitted:", { formData, files });
    // Handle form submission
  };

  if (!job) {
    return (
      <div className="bg-[#0e0e0f] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-[#efeff0] mb-4">Job not found</h1>
          <Link to="/careers" className="text-[#99c221] hover:text-[#B8D434]">
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      <Header />

      {/* Job Description Section */}
      <section className="bg-[#0e0e0f] pt-20 md:pt-24 pb-10 md:pb-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[60px]">
          {/* Back Link */}
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-[#99c221] hover:text-[#B8D434] transition-colors mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>

          {/* Job Title */}
          <h1
            className="text-[20px] md:text-[32px] font-semibold text-[#efeff0] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {job.title}
          </h1>

          {/* Job Details */}
          <div className="flex flex-row gap-2 items-center mb-8">
            <p
              className="text-[14px] md:text-[20px]"
              style={{
                color: "#CECECF",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
              }}
            >
              {job.type}
            </p>
            <p
              className="text-[14px] md:text-[20px]"
              style={{
                color: "#CECECF",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              {job.location}
            </p>
          </div>

          {/* Content Sections */}
          <div className="flex flex-col gap-8 md:gap-12 max-w-[900px]">
            {/* Dedicated to Progress */}
            <div>
              <h2
                className="text-[16px] md:text-xl md:text-2xl font-semibold mb-4 uppercase"
                style={{ 
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#8E8E8F"
                }}
              >
                Dedicated to Progress – Welcome to Chip 1
              </h2>
              <p className="text-[14px] md:text-base md:text-lg text-white leading-[1.5]">
                {job.description.replace(/\n\n/g, ' ').trim()}
              </p>
              {job.descriptionSecond && (
                <p className="text-[14px] md:text-base md:text-lg text-white leading-[1.5]">
                  {job.descriptionSecond}
                </p>
              )}
            </div>

            {/* Your Mission */}
            <div>
              <h2
                className="text-[16px] md:text-xl md:text-2xl font-semibold mb-4 uppercase"
                style={{ 
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#8E8E8F"
                }}
              >
                Your mission
              </h2>
              <ul className="flex flex-col gap-2">
                {job.mission.map((item, index) => (
                  <li
                    key={index}
                    className="text-[14px] md:text-base md:text-lg text-white leading-[1.5] flex items-start gap-2"
                  >
                    {index > 0 && <span className="text-white mt-1">•</span>}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Your Skill Package */}
            <div>
              <h2
                className="text-[16px] md:text-xl md:text-2xl font-semibold mb-4 uppercase"
                style={{ 
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#8E8E8F"
                }}
              >
                Your skill package
              </h2>
              <ul className="flex flex-col gap-2">
                {job.skills.map((item, index) => (
                  <li
                    key={index}
                    className="text-[14px] md:text-base md:text-lg text-white leading-[1.5] flex items-start gap-2"
                  >
                    <span className="text-white mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Us */}
            <div>
              <h2
                className="text-[16px] md:text-xl md:text-2xl font-semibold mb-4 uppercase"
                style={{ 
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#8E8E8F"
                }}
              >
                Why us?
              </h2>
              <ul className="flex flex-col gap-2">
                {job.benefits.map((item, index) => (
                  <li
                    key={index}
                    className="text-[14px] md:text-base md:text-lg text-white leading-[1.5] flex items-start gap-2"
                  >
                    <span className="text-white mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* See for Yourself */}
            <div>
              <h2
                className="text-[16px] md:text-xl md:text-2xl font-semibold mb-4 uppercase"
                style={{ 
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#8E8E8F"
                }}
              >
                See for yourself!
              </h2>
              <p className="text-[14px] md:text-base md:text-lg text-white leading-[1.5] mb-4">
                We eagerly await your application and look forward to a lively discussion with you. If you have any questions, don't hesitate to contact us.
              </p>
              <p className="text-[14px] md:text-base md:text-lg text-white leading-[1.5] mt-4">
                We look forward to hearing from you!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="bg-[#0e0e0f] py-10 md:py-16 relative">
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <img
            src={applicationBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
          />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0e0e0f] via-transparent to-[#0e0e0f]" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-[60px] relative">
          <h2
            className="text-[24px] md:text-[32px] md:text-5xl font-semibold text-[#efeff0] text-center mb-6 md:mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            YOUR APPLICATION
          </h2>

          <p className="text-[14px] md:text-base md:text-lg text-center mb-8 md:mb-12 max-w-[800px] mx-auto" style={{ color: "#858586" }}>
            We appreciate your interest in Chip 1 Exchange GmbH & Co. KG. Please fill in the following short form. Should you have any difficulties in uploading your files, please contact us by mail at{" "}
            <a href="mailto:decareer@chip1.com" className="text-[#99c221] hover:text-[#B8D434]">
              decareer@chip1.com
            </a>
            .
          </p>

          <form onSubmit={handleSubmit} className="max-w-[900px] mx-auto">
            {/* Form Fields - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              {/* First Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf]">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] outline-none focus:border-[#99c221] transition-colors"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf]">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] outline-none focus:border-[#99c221] transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
                  onFocus={handleEmailFocus}
                  placeholder="Enter your email"
                  className={`h-12 px-4 bg-[#1c1d22] border rounded-lg text-base text-white placeholder-[#323335] outline-none transition-colors ${
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

              {/* Phone Number */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf]">
                  Phone Number <span className="text-white/40">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] outline-none focus:border-[#99c221] transition-colors"
                />
              </div>

              {/* Available From */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf]">
                  Available from <span className="text-white/40">(optional)</span>
                </label>
                <input
                  type="text"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleInputChange}
                  placeholder="Enter when available"
                  className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] outline-none focus:border-[#99c221] transition-colors"
                />
              </div>

              {/* Expected Salary */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#cececf]">
                  Expected Salary <span className="text-white/40">(optional)</span>
                </label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  placeholder="Enter your expected salary"
                  className="h-12 px-4 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] outline-none focus:border-[#99c221] transition-colors"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm text-[#cececf]">
                If you are applying spontaneously, please let us know which area you are interested in.
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message"
                rows={4}
                className="px-4 py-2 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] resize-none outline-none focus:border-[#99c221] transition-colors"
              />
            </div>

            {/* Cover Letter */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm text-[#cececf]">
                Cover letter <span className="text-white/40">(optional)</span>
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Enter cover letter"
                rows={4}
                className="px-4 py-2 bg-[#1c1d22] border border-[#323335] rounded-lg text-base text-white placeholder-[#323335] resize-none outline-none focus:border-[#99c221] transition-colors"
              />
            </div>

            {/* File Uploads */}
            <div className="flex flex-col gap-6 mb-8">
              {/* CV */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#cececf]">Your CV</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRefs.cv.current?.click()}
                    className="flex items-center gap-2 text-[#99c221] hover:text-[#B8D434] font-medium transition-colors bg-transparent border-none p-0"
                  >
                    <Add size={20} />
                    <span>Upload document</span>
                  </button>
                  {files.cv && (
                    <span className="text-sm text-[#cececf]">{files.cv.name}</span>
                  )}
                  <input
                    ref={fileInputRefs.cv}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileSelect("cv", e)}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </div>

              {/* Employment Reference and Other - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Employment Reference */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[#cececf]">
                    Employment reference <span className="text-white/40">(optional)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.reference.current?.click()}
                      className="flex items-center gap-2 text-[#99c221] hover:text-[#B8D434] font-medium transition-colors bg-transparent border-none p-0"
                    >
                      <Add size={20} />
                      <span>Upload document</span>
                    </button>
                    {files.reference && (
                      <span className="text-sm text-[#cececf]">{files.reference.name}</span>
                    )}
                    <input
                      ref={fileInputRefs.reference}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileSelect("reference", e)}
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </div>

                {/* Other */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[#cececf]">
                    Other <span className="text-white/40">(optional)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.other.current?.click()}
                      className="flex items-center gap-2 text-[#99c221] hover:text-[#B8D434] font-medium transition-colors bg-transparent border-none p-0"
                    >
                      <Add size={20} />
                      <span>Upload document</span>
                    </button>
                    {files.other && (
                      <span className="text-sm text-[#cececf]">{files.other.name}</span>
                    )}
                    <input
                      ref={fileInputRefs.other}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileSelect("other", e)}
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#99c221] hover:bg-[#a8d32f] text-[#05080d] font-semibold px-8 py-3 rounded-3xl text-base transition-colors shadow-md"
              >
                Send Application
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};
