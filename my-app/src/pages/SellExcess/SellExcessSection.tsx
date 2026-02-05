import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Document, Close, Checkmark } from "@carbon/icons-react";
import { DatePicker } from "../../components/UI/DatePicker";
import { CustomDropdown } from "../../components/UI/CustomDropdown";
import companyBg from "../../assets/Picture-1.png";

interface ExcessFormData {
  projectName: string;
  projectType: string;
  sellBy: string;
  inventoryLocation: string;
  inventoryOwner: string;
  sellingTypes: {
    lineSales: boolean;
    lotSales: boolean;
    consignmentSales: boolean;
  };
}

interface SignInFormData {
  email: string;
  companyName: string;
  contactName: string;
}

export const SellExcessSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state for step 2
  const [formData, setFormData] = useState<ExcessFormData>({
    projectName: "",
    projectType: "Excess (Sales)",
    sellBy: "",
    inventoryLocation: "",
    inventoryOwner: "",
    sellingTypes: {
      lineSales: false,
      lotSales: false,
      consignmentSales: false,
    },
  });

  // Form state for step 3
  const [signInData, setSignInData] = useState<SignInFormData>({
    email: "",
    companyName: "",
    contactName: "",
  });

  // Check if step 2 form is valid
  const isStep2Valid = 
    formData.projectName.trim() !== "" &&
    formData.projectType !== "" &&
    formData.sellBy.trim() !== "" &&
    formData.inventoryLocation.trim() !== "" &&
    formData.inventoryOwner !== "" &&
    (formData.sellingTypes.lineSales || formData.sellingTypes.lotSales || formData.sellingTypes.consignmentSales);

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
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleInputChange = (field: keyof ExcessFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSellingTypeChange = (type: keyof ExcessFormData['sellingTypes']) => {
    setFormData(prev => ({
      ...prev,
      sellingTypes: {
        ...prev.sellingTypes,
        [type]: !prev.sellingTypes[type],
      },
    }));
  };

  // Step 1: Upload Inventory (same as Upload BoM)
  const renderStep1 = () => (
    <>
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Stepper */}
        <div className="flex items-center gap-2">
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
          className="text-[32px] font-medium text-[#efeff0] leading-[1.4]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Upload Excess
        </h1>

        {/* Description */}
        <p className="text-sm text-[#b6b6b7] leading-[1.5]" style={{ fontFamily: "Inter, sans-serif" }}>
          You may skip this step. Once the project is created, additional parts can be added at any time.
        </p>
      </div>

      {/* File Drop Zone / Selected File */}
      <div className="h-[304px]">
        {selectedFile ? (
          /* Selected File Chip */
          <div className="flex items-center gap-2 px-3 py-2 bg-[#111215] border border-[#212225] rounded-lg w-[280px]">
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
        ) : (
          /* Drop Zone */
          <div
            className={`flex flex-col items-center justify-center gap-2 h-full border border-dashed rounded-2xl transition-colors ${
              isDragOver
                ? "border-[#99c221] bg-[#99c221]/5"
                : "border-[#323335] hover:border-[#4a4a4c]"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-sm text-[#e5e5e7]" style={{ fontFamily: "Inter, sans-serif" }}>
              Drop a file here
            </p>
            <p className="text-sm text-[#8e8e8f]" style={{ fontFamily: "Inter, sans-serif" }}>
              or
            </p>
            <button
              onClick={handleChooseFile}
              className="h-10 px-4 rounded-3xl text-sm font-medium text-[#99c221] hover:bg-[#99c221]/10 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Choose file
            </button>
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

      {/* Bottom Actions */}
      <div className="flex items-center justify-between mt-auto pb-10">
        {/* Download Template Button - Disabled */}
        <button 
          disabled
          className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-[#99c221]/40 rounded-3xl cursor-not-allowed"
        >
          <Download size={20} />
          <span style={{ fontFamily: "Inter, sans-serif" }}>Inventory Template</span>
        </button>

        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!selectedFile}
          className={`flex items-center justify-center w-[200px] h-12 rounded-3xl text-base font-semibold transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
            selectedFile
              ? "bg-[#99c221] hover:bg-[#a8d32f] border-t border-[#ceea6c] text-[#05080d]"
              : "bg-[#99c221]/40 text-[#05080d]/60 cursor-not-allowed"
          }`}
        >
          <span style={{ fontFamily: "Inter, sans-serif" }}>Continue</span>
        </button>
      </div>
    </>
  );

  // Step 2: Create a Project (Sell Excess specific)
  const renderStep2 = () => (
    <>
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Stepper */}
        <div className="flex items-center gap-2">
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
          className="text-[32px] font-medium text-[#efeff0] leading-[1.4]"
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
            placeholder="Enter name"
            className="h-10 px-3 bg-[#1c1d22] border border-[#323335] rounded text-sm text-[#f7f7f7] placeholder:text-[#8e8e8f] outline-none focus:border-[#99c221] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* Project Type & Sell by */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
              Project Type
            </label>
            <CustomDropdown
              value={formData.projectType}
              onChange={(value) => handleInputChange("projectType", value)}
              options={[{ value: "Excess (Sales)", label: "Excess (Sales)" }]}
              placeholder="Select"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
              Sell by
            </label>
            <DatePicker
              value={formData.sellBy}
              onChange={(date) => handleInputChange("sellBy", date)}
              placeholder="Select"
            />
          </div>
        </div>

        {/* Inventory Location & Inventory Owner */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
              Inventory Location
            </label>
            <input
              type="text"
              value={formData.inventoryLocation}
              onChange={(e) => handleInputChange("inventoryLocation", e.target.value)}
              placeholder="Enter location"
              className="h-10 px-3 bg-[#1c1d22] border border-[#323335] rounded text-sm text-[#f7f7f7] placeholder:text-[#8e8e8f] outline-none focus:border-[#99c221] transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
              Inventory Owner
            </label>
            <CustomDropdown
              value={formData.inventoryOwner}
              onChange={(value) => handleInputChange("inventoryOwner", value)}
              options={[
                { value: "Company", label: "Company" },
                { value: "Individual", label: "Individual" },
                { value: "Third Party", label: "Third Party" },
              ]}
              placeholder="Select"
            />
          </div>
        </div>

        {/* Selling Type */}
        <div className="flex flex-col gap-3">
          <label className="text-sm text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
            Selling Type
          </label>
          <div className="flex gap-10 flex-wrap">
            {/* Line Sales */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSellingTypeChange("lineSales")}
                className={`w-6 h-6 flex-shrink-0 rounded flex items-center justify-center transition-colors ${
                  formData.sellingTypes.lineSales 
                    ? "bg-[#99c221]" 
                    : "border border-[#99c221]"
                }`}
              >
                {formData.sellingTypes.lineSales && <Checkmark size={14} className="text-[#0e0e0f]" />}
              </button>
              <span className="text-base text-[#e5e5e7]" style={{ fontFamily: "Inter, sans-serif" }}>
                Line Sales
              </span>
            </div>

            {/* Lot Sales */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSellingTypeChange("lotSales")}
                className={`w-6 h-6 flex-shrink-0 rounded flex items-center justify-center transition-colors ${
                  formData.sellingTypes.lotSales 
                    ? "bg-[#99c221]" 
                    : "border border-[#99c221]"
                }`}
              >
                {formData.sellingTypes.lotSales && <Checkmark size={14} className="text-[#0e0e0f]" />}
              </button>
              <span className="text-base text-[#e5e5e7]" style={{ fontFamily: "Inter, sans-serif" }}>
                Lot Sales
              </span>
            </div>

            {/* Consignment Sales */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSellingTypeChange("consignmentSales")}
                className={`w-6 h-6 flex-shrink-0 rounded flex items-center justify-center transition-colors ${
                  formData.sellingTypes.consignmentSales 
                    ? "bg-[#99c221]" 
                    : "border border-[#99c221]"
                }`}
              >
                {formData.sellingTypes.consignmentSales && <Checkmark size={14} className="text-[#0e0e0f]" />}
              </button>
              <span className="text-base text-[#e5e5e7]" style={{ fontFamily: "Inter, sans-serif" }}>
                Consignment Sales
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-end mt-auto pb-10">
        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!isStep2Valid}
          className={`flex items-center justify-center w-[200px] h-12 rounded-3xl text-base font-semibold transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
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

  // Step 3: Sign In (same as Upload BoM)
  const renderStep3 = () => (
    <>
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Stepper */}
        <div className="flex items-center gap-2">
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
          className="text-[32px] font-medium text-[#efeff0] leading-[1.4]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Sign In
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
            placeholder="Enter your email"
            className="h-10 px-3 bg-[#1c1d22] border border-[#323335] rounded text-sm text-[#f7f7f7] placeholder:text-[#8e8e8f] outline-none focus:border-[#99c221] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
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
            className="h-10 px-3 bg-[#1c1d22] border border-[#323335] rounded text-sm text-[#f7f7f7] placeholder:text-[#8e8e8f] outline-none focus:border-[#99c221] transition-colors"
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
            className="h-10 px-3 bg-[#1c1d22] border border-[#323335] rounded text-sm text-[#f7f7f7] placeholder:text-[#8e8e8f] outline-none focus:border-[#99c221] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between mt-auto pb-10">
        {/* Sign Up Link */}
        <div className="flex items-center gap-4">
          <span className="text-base text-[#cececf]" style={{ fontFamily: "Inter, sans-serif" }}>
            Already a MyChip1 member?
          </span>
          <button 
            onClick={handleSignUp}
            className="text-base font-medium text-[#99c221] hover:underline"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Sign Up
          </button>
        </div>

        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={!isStep3Valid}
          className={`flex items-center justify-center w-[200px] h-12 rounded-3xl text-base font-semibold transition-colors shadow-[0px_4px_4px_0px_rgba(17,18,21,0.35)] ${
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
    <section className="pt-[90px] px-20 pb-0">
      <div className="max-w-[1440px] mx-auto flex items-start min-h-[720px]">
        {/* Left Column - Info & Image */}
        <div className="w-[58%] flex flex-col gap-6 justify-center pr-10 py-10">
          <p className="text-base text-[#cececf] leading-[1.5]" style={{ fontFamily: "Inter, sans-serif" }}>
            Submit this Excess list to gain complimentary access to MyChip1, our intelligent supply chain platform delivering real-time availability, competitive pricing analysis, automated BOM health checks, lifecycle alerts, and comprehensive technical documentation
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
        <div className="w-[42%] bg-[#0e0e0f] pt-10 px-10 h-full flex flex-col">
          <div className="flex flex-col gap-10 h-full">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>
      </div>
    </section>
  );
};
