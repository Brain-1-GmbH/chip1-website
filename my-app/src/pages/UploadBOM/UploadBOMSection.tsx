import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Document, Close, Checkmark } from "@carbon/icons-react";
import { DatePicker } from "../../components/UI/DatePicker";
import { CustomDropdown } from "../../components/UI/CustomDropdown";
import companyBg from "../../assets/Picture-1.png";

interface ProjectFormData {
  projectName: string;
  projectType: string;
  bomType: string;
  productionStage: string;
  needBy: string;
  trackBomHealth: boolean;
  trackingDuration: string;
}

interface SignInFormData {
  email: string;
  companyName: string;
  contactName: string;
}

export const UploadBOMSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state for step 2
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    projectType: "",
    bomType: "",
    productionStage: "",
    needBy: "",
    trackBomHealth: false,
    trackingDuration: "3 Months",
  });

  // Form state for step 3
  const [signInData, setSignInData] = useState<SignInFormData>({
    email: "",
    companyName: "",
    contactName: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if step 2 form is valid
  const isStep2Valid = 
    formData.projectName.trim() !== "" &&
    formData.projectType !== "" &&
    formData.bomType !== "" &&
    formData.productionStage !== "" &&
    formData.needBy.trim() !== "" &&
    (!formData.trackBomHealth || formData.trackingDuration !== "");

  // Check if step 3 form is valid
  const isStep3Valid = 
    signInData.email.trim() !== "" &&
    signInData.companyName.trim() !== "" &&
    signInData.contactName.trim() !== "";

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Do nothing - button disabled or no action
    }
  };

  const handleSignUp = () => {
    // Do nothing
  };

  const handleSignInInputChange = (field: keyof SignInFormData, value: string) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field === "email" && emailError) {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    if (signInData.email && !validateEmail(signInData.email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setEmailError("");
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleInputChange = (field: keyof ProjectFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Step 1: Upload BoM
  const renderStep1 = () => (
    <>
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Stepper */}
        <div className="flex items-center justify-between w-full md:justify-start md:gap-2">
          <button 
            onClick={handleBack}
            className="p-[5px] hover:bg-[#1a1a1b] rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-[#b6b6b7]" />
          </button>
          <span className="text-sm text-[#b6b6b7]" style={{ fontFamily: "Inter, sans-serif" }}>
            1/3
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-[32px] font-medium text-[#efeff0] leading-[1.4] text-center md:text-left w-full"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Upload your BoM
        </h1>
        {/* Description - desktop */}
        <p
          className="hidden md:block text-sm text-[#b6b6b7] leading-[1.5] text-left mt-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          You may skip this step. Once the project is created, additional parts can be added at any time.
        </p>
      </div>

      {/* Selected File Chip - Desktop: right after description */}
      {selectedFile && (
        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#111215] border border-[#212225] rounded-lg w-full -mt-2">
          <Document size={24} className="text-[#99c221] flex-shrink-0" />
          <span 
            className="text-base text-[#e5e5e7] flex-1 truncate"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {selectedFile.name}
          </span>
          <button
            onClick={() => setSelectedFile(null)}
            className="flex-shrink-0 p-0.5 hover:bg-[#1a1a1b] rounded transition-colors"
          >
            <Close size={16} className="text-[#8e8e8f]" />
          </button>
        </div>
      )}

      {/* File Drop Zone / Selected File */}
      <div className={`${selectedFile ? 'md:hidden' : ''} h-[304px]`}>
        {selectedFile ? (
          <>
            {/* Selected File Chip - Mobile */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#111215] border border-[#212225] rounded-lg w-full">
              <Document size={24} className="text-[#99c221] flex-shrink-0" />
              <span 
                className="text-base text-[#e5e5e7] flex-1 truncate"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {selectedFile.name}
              </span>
              <button
                onClick={() => setSelectedFile(null)}
                className="flex-shrink-0 p-0.5 hover:bg-[#1a1a1b] rounded transition-colors"
              >
                <Close size={16} className="text-[#8e8e8f]" />
              </button>
            </div>
            {/* Description - mobile */}
            <p className="block md:hidden text-sm text-[#b6b6b7] leading-[1.5] text-left mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
              You may skip this step. Once the project is created, additional parts can be added at any time.
            </p>
          </>
        ) : (
          /* Drop Zone */
          <div
            className={`flex flex-col items-center justify-center gap-2 h-full border border-dashed rounded-2xl transition-colors cursor-pointer ${
              isDragOver
                ? "border-[#99c221] bg-[#99c221]/5"
                : "border-[#323335] hover:border-[#4a4a4c]"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleChooseFile}
          >
            <p className="hidden md:block text-sm text-[#e5e5e7]" style={{ fontFamily: "Inter, sans-serif" }}>
              Drop a file here
            </p>
            <p className="hidden md:block text-sm text-[#8e8e8f]" style={{ fontFamily: "Inter, sans-serif" }}>
              or
            </p>
            <span
              className="h-auto px-0 md:h-10 md:px-4 text-sm font-medium text-[#99c221]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Choose file
            </span>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept=".csv,.xlsx,.xls"
        />
      </div>

      {/* Description - mobile (when no file selected) */}
      {!selectedFile && (
        <p className="block md:hidden text-sm text-[#b6b6b7] leading-[1.5] text-left mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
          You may skip this step. Once the project is created, additional parts can be added at any time.
        </p>
      )}

      {/* Bottom Actions - Desktop */}
      <div className="hidden md:flex flex-row items-center justify-between gap-4 mt-auto pb-8">
        {/* Download Template Button */}
        <button 
          disabled
          className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-[#99c221]/40 rounded-3xl cursor-not-allowed"
        >
          <Download size={20} />
          <span style={{ fontFamily: "Inter, sans-serif" }}>BoM Template</span>
        </button>

        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!selectedFile}
          className={`flex items-center justify-center w-full md:w-[200px] h-10 rounded-3xl text-sm font-medium transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
            selectedFile
              ? "bg-[#99c221] hover:bg-[#a8d32f] border-t border-[#ceea6c] text-[#05080d]"
              : "bg-[#99c221]/40 text-[#05080d]/60 cursor-not-allowed"
          }`}
        >
          <span style={{ fontFamily: "Inter, sans-serif" }}>Continue</span>
        </button>
      </div>

      {/* Bottom Actions - Mobile Fixed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0e0e0f] p-4 z-50">
        <div className="flex flex-col gap-4">
          {/* Download Template Button - Mobile */}
          <button 
            disabled
            className="flex items-center justify-center gap-2 h-12 px-4 text-sm font-medium text-[#99c221]/40 rounded-3xl cursor-not-allowed"
          >
            <Download size={20} />
            <span style={{ fontFamily: "Inter, sans-serif" }}>BoM Template</span>
          </button>

          {/* Continue Button */}
          <button 
            onClick={handleContinue}
            disabled={!selectedFile}
            className={`flex items-center justify-center w-full h-12 rounded-3xl text-base font-semibold transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
              selectedFile
                ? "bg-[#99c221] hover:bg-[#a8d32f] text-[#05080d]"
                : "bg-[#99c221]/40 text-[#05080d]/60 cursor-not-allowed"
            }`}
          >
            <span style={{ fontFamily: "Inter, sans-serif" }}>Continue</span>
          </button>
        </div>
      </div>
    </>
  );

  // Step 2: Create a Project
  const renderStep2 = () => (
    <>
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Stepper */}
        <div className="flex items-center justify-between w-full md:justify-start md:gap-2">
          <button 
            onClick={handleBack}
            className="p-[5px] hover:bg-[#1a1a1b] rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-[#b6b6b7]" />
          </button>
          <span className="text-sm text-[#b6b6b7]" style={{ fontFamily: "Inter, sans-serif" }}>
            2/3
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-[32px] font-medium text-[#efeff0] leading-[1.4] text-center md:text-left w-full"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Create a Project
        </h1>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        {/* Project Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
            Project Name
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleInputChange("projectName", e.target.value)}
            placeholder="Enter project name"
            className="h-10 px-3 bg-[#1c1d22] border border-[#323335] rounded text-sm text-[#f7f7f7] placeholder:text-[#323335] outline-none focus:border-[#99c221] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* Project Type */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
              Project Type
            </label>
            <CustomDropdown
              value={formData.projectType}
              onChange={(value) => handleInputChange("projectType", value)}
              options={[
                { value: "BoM (Sourcing/Purchasing)", label: "BoM (Sourcing/Purchasing)" },
                { value: "RFQ", label: "RFQ" },
                { value: "Inventory", label: "Inventory" },
              ]}
              placeholder="Select project type"
            />
          </div>

          {/* BoM Type - Desktop only */}
          <div className="hidden md:flex flex-1 flex-col gap-1">
            <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
              BoM Type
            </label>
            <CustomDropdown
              value={formData.bomType}
              onChange={(value) => handleInputChange("bomType", value)}
              options={[
                { value: "Standard", label: "Standard" },
                { value: "Multi-level", label: "Multi-level" },
                { value: "Configurable", label: "Configurable" },
              ]}
              placeholder="Select BoM type"
            />
          </div>
        </div>

        {/* BoM Type - Mobile only */}
        <div className="md:hidden flex flex-col gap-1">
          <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
            BoM Type
          </label>
          <CustomDropdown
            value={formData.bomType}
            onChange={(value) => handleInputChange("bomType", value)}
            options={[
              { value: "Standard", label: "Standard" },
              { value: "Multi-level", label: "Multi-level" },
              { value: "Configurable", label: "Configurable" },
            ]}
            placeholder="Select BoM type"
          />
        </div>

        {/* Production Stage & Need by */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
              Production Stage
            </label>
            <CustomDropdown
              value={formData.productionStage}
              onChange={(value) => handleInputChange("productionStage", value)}
              options={[
                { value: "Prototype", label: "Prototype" },
                { value: "Pre-production", label: "Pre-production" },
                { value: "Production", label: "Production" },
              ]}
              placeholder="Select stage"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
              Need by
            </label>
            <DatePicker
              value={formData.needBy}
              onChange={(date) => handleInputChange("needBy", date)}
              placeholder="DD.MM.YYYY"
            />
          </div>
        </div>

        {/* Track BOM Health & Tracking Duration */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:flex-1 flex gap-2 items-start">
            {/* Checkbox */}
            <button
              onClick={() => handleInputChange("trackBomHealth", !formData.trackBomHealth)}
              className={`w-[18px] h-[18px] mt-1 flex-shrink-0 rounded flex items-center justify-center transition-colors ${
                formData.trackBomHealth 
                  ? "bg-[#99c221]" 
                  : "border border-[#99c221]"
              }`}
            >
              {formData.trackBomHealth && <Checkmark size={12} className="text-[#0e0e0f]" />}
            </button>
            <div className="flex flex-col gap-0.5">
              <span className="text-base text-[#e5e5e7]" style={{ fontFamily: "Inter, sans-serif" }}>
                Track BOM Health
              </span>
              <span className="text-xs text-[#b6b6b7]" style={{ fontFamily: "Inter, sans-serif" }}>
                Chip 1 will send you monthly updates regarding the Health of your Project and Parts
              </span>
            </div>
          </div>

          {formData.trackBomHealth && (
            <div className="w-full md:flex-1 flex flex-col gap-1">
              <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
                Tracking Duration
              </label>
              <CustomDropdown
                value={formData.trackingDuration}
                onChange={(value) => handleInputChange("trackingDuration", value)}
                options={[
                  { value: "3 Months", label: "3 Months" },
                  { value: "6 Months", label: "6 Months" },
                  { value: "12 Months", label: "12 Months" },
                ]}
                placeholder="Select duration"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions - Mobile Fixed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0e0e0f] p-4 z-50">
        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!isStep2Valid}
          className={`flex items-center justify-center w-full h-12 rounded-3xl text-base font-semibold transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
            isStep2Valid
              ? "bg-[#99c221] hover:bg-[#a8d32f] text-[#05080d]"
              : "bg-[#99c221]/40 text-[#05080d]/60 cursor-not-allowed"
          }`}
        >
          <span style={{ fontFamily: "Inter, sans-serif" }}>Continue</span>
        </button>
      </div>

      {/* Bottom Actions - Desktop */}
      <div className="hidden md:flex items-center justify-end mt-auto pb-8">
        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!isStep2Valid}
          className={`flex items-center justify-center w-full md:w-[200px] h-12 rounded-3xl text-base font-semibold transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
            isStep2Valid
              ? "bg-[#99c221] hover:bg-[#a8d32f] border-t border-[#ceea6c] text-[#05080d]"
              : "bg-[#99c221]/40 text-[#05080d]/60 cursor-not-allowed"
          }`}
        >
          <span style={{ fontFamily: "Inter, sans-serif" }}>Continue</span>
        </button>
      </div>
    </>
  );

  // Step 3: Sign In
  const renderStep3 = () => (
    <>
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Stepper */}
        <div className="flex items-center justify-between w-full md:justify-start md:gap-2">
          <button 
            onClick={handleBack}
            className="p-[5px] hover:bg-[#1a1a1b] rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-[#b6b6b7]" />
          </button>
          <span className="text-sm text-[#b6b6b7]" style={{ fontFamily: "Inter, sans-serif" }}>
            3/3
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-[32px] font-medium text-[#efeff0] leading-[1.4] text-center md:text-left w-full"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Sign Up
        </h1>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
            Email
          </label>
          <input
            type="email"
            value={signInData.email}
            onChange={(e) => handleSignInInputChange("email", e.target.value)}
            onBlur={handleEmailBlur}
            onFocus={handleEmailFocus}
            placeholder="Enter your email"
            className={`h-10 px-3 bg-[#1c1d22] border rounded text-sm text-[#f7f7f7] placeholder:text-[#323335] outline-none transition-colors ${
              emailError && !isEmailFocused
                ? "border-[#A21212]"
                : "border-[#323335] focus:border-[#99c221]"
            }`}
            style={{
              fontFamily: "Inter, sans-serif",
              borderRadius: emailError && !isEmailFocused ? "4px" : undefined,
            }}
          />
          {emailError && !isEmailFocused && (
            <p className="text-sm text-[#A21212] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>{emailError}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
            Company Name
          </label>
          <input
            type="text"
            value={signInData.companyName}
            onChange={(e) => handleSignInInputChange("companyName", e.target.value)}
            placeholder="Enter company name"
            className="h-10 px-3 bg-[#1c1d22] border border-[#323335] rounded text-sm text-[#f7f7f7] placeholder:text-[#323335] outline-none focus:border-[#99c221] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* Contact Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
            Contact Name
          </label>
          <input
            type="text"
            value={signInData.contactName}
            onChange={(e) => handleSignInInputChange("contactName", e.target.value)}
            placeholder="Enter contact name"
            className="h-10 px-3 bg-[#1c1d22] border border-[#323335] rounded text-sm text-[#f7f7f7] placeholder:text-[#323335] outline-none focus:border-[#99c221] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
      </div>

      {/* Bottom Actions - Mobile Fixed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0e0e0f] p-4 z-50">
        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!isStep3Valid}
          className={`flex items-center justify-center w-full h-12 rounded-3xl text-base font-semibold transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
            isStep3Valid
              ? "bg-[#99c221] hover:bg-[#a8d32f] text-[#05080d]"
              : "bg-[#99c221]/40 text-[#05080d]/60 cursor-not-allowed"
          }`}
        >
          <span style={{ fontFamily: "Inter, sans-serif" }}>Continue</span>
        </button>
      </div>

      {/* Bottom Actions - Desktop */}
      <div className="hidden md:flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-auto pb-8">
        {/* Sign Up Link */}
        <div className="flex items-center gap-4 flex-nowrap">
          <span className="text-base text-[#cececf] whitespace-nowrap" style={{ fontFamily: "Inter, sans-serif" }}>
            Already a MyChip1 member?
          </span>
          <button 
            onClick={handleSignUp}
            className="text-base font-medium text-[#99c221] hover:underline whitespace-nowrap"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Sign In
          </button>
        </div>

        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!isStep3Valid}
          className={`flex items-center justify-center w-full md:w-[200px] h-12 rounded-3xl text-base font-semibold transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
            isStep3Valid
              ? "bg-[#99c221] hover:bg-[#a8d32f] border-t border-[#ceea6c] text-[#05080d]"
              : "bg-[#99c221]/40 text-[#05080d]/60 cursor-not-allowed"
          }`}
        >
          <span style={{ fontFamily: "Inter, sans-serif" }}>Continue</span>
        </button>
      </div>
    </>
  );

  return (
    <section className="pt-[64px] md:pt-[90px] px-4 md:px-[80px] pb-0">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start min-h-[calc(100vh-64px)] md:min-h-[720px]">
        {/* Left Column - Info & Video */}
        <div className="hidden md:flex w-[58%] flex-col gap-6 justify-center pr-10 py-10">
          <p className="text-base text-[#cececf] leading-[1.5]" style={{ fontFamily: "Inter, sans-serif" }}>
            Submit this BOM to gain complimentary access to MyChip1, our intelligent supply chain platform delivering real-time availability, competitive pricing analysis, automated BOM health checks, lifecycle alerts, and comprehensive technical documentation
          </p>
          
          <div className="w-full h-[473px] rounded-2xl overflow-hidden bg-[#1a1a1b]">
            <img
              src={companyBg}
              alt="Company building"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-[42%] bg-[#0e0e0f] pt-6 md:pt-10 px-0 md:px-10 h-full flex flex-col">
          <div className={`flex flex-col gap-10 h-full ${currentStep === 2 ? 'pb-24 md:pb-0' : 'pb-24 md:pb-0'}`}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>
      </div>
    </section>
  );
};
