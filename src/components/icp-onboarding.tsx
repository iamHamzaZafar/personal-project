"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  X, 
  CheckCircle2, 
  Linkedin, 
  Building2, 
  Target, 
  Sparkles, 
  Link2, 
  FileCheck,
  Rocket,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

// Sample data
const industries = [
  "Technology",
  "SaaS",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Education",
  "Manufacturing",
  "Real Estate",
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "India",
  "Singapore",
];

const companySizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5000+",
];

const companyTypes = [
  "Private Company",
  "Public Company",
  "Startup",
  "Non-profit",
  "Government",
  "Agency",
];

interface ICPFormData {
  // Step 1
  companyName: string;
  industry: string;
  country: string;
  
  // Step 2
  targetJobTitles: string[];
  targetLocations: string[];
  targetIndustry: string;
  companySize: string;
  companyType: string;
  excludeKeywords: string[];
  aiPrecision: number; // 0-100, higher = more precision, lower leads
  
  // Step 3
  detectEngagement: boolean;
  detectTriggerEvents: boolean;
  linkedinProfiles: string[];
  
  // Step 4
  linkedinConnected: boolean;
}

export function ICPOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ICPFormData>({
    companyName: "",
    industry: "",
    country: "",
    targetJobTitles: [],
    targetLocations: [],
    targetIndustry: "",
    companySize: "",
    companyType: "",
    excludeKeywords: [],
    aiPrecision: 50,
    detectEngagement: false,
    detectTriggerEvents: false,
    linkedinProfiles: [],
    linkedinConnected: false,
  });

  const [tempInput, setTempInput] = useState({
    excludeKeyword: "",
    linkedinProfile: "",
    targetLocation: "",
    targetJobTitle: "",
  });

  const totalSteps = 6;

  const updateFormData = (field: keyof ICPFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addExcludeKeyword = () => {
    if (tempInput.excludeKeyword.trim()) {
      updateFormData("excludeKeywords", [
        ...formData.excludeKeywords,
        tempInput.excludeKeyword.trim(),
      ]);
      setTempInput((prev) => ({ ...prev, excludeKeyword: "" }));
    }
  };

  const removeExcludeKeyword = (index: number) => {
    updateFormData(
      "excludeKeywords",
      formData.excludeKeywords.filter((_, i) => i !== index)
    );
  };

  const addLinkedInProfile = () => {
    if (tempInput.linkedinProfile.trim()) {
      updateFormData("linkedinProfiles", [
        ...formData.linkedinProfiles,
        tempInput.linkedinProfile.trim(),
      ]);
      setTempInput((prev) => ({ ...prev, linkedinProfile: "" }));
    }
  };

  const removeLinkedInProfile = (index: number) => {
    updateFormData(
      "linkedinProfiles",
      formData.linkedinProfiles.filter((_, i) => i !== index)
    );
  };

  const addTargetJobTitle = () => {
    if (tempInput.targetJobTitle.trim()) {
      updateFormData("targetJobTitles", [
        ...formData.targetJobTitles,
        tempInput.targetJobTitle.trim(),
      ]);
      setTempInput((prev) => ({ ...prev, targetJobTitle: "" }));
    }
  };

  const removeTargetJobTitle = (index: number) => {
    updateFormData(
      "targetJobTitles",
      formData.targetJobTitles.filter((_, i) => i !== index)
    );
  };

  const addTargetLocation = () => {
    if (tempInput.targetLocation.trim()) {
      updateFormData("targetLocations", [
        ...formData.targetLocations,
        tempInput.targetLocation.trim(),
      ]);
      setTempInput((prev) => ({ ...prev, targetLocation: "" }));
    }
  };

  const removeTargetLocation = (index: number) => {
    updateFormData(
      "targetLocations",
      formData.targetLocations.filter((_, i) => i !== index)
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Submit to API
    console.log("Submitting ICP:", formData);
    handleNext(); // Move to success step
  };

  const handleLinkedInConnect = () => {
    // TODO: Implement LinkedIn OAuth
    updateFormData("linkedinConnected", true);
  };

  const renderStepIndicator = () => {
    const stepConfig = [
      { label: "Company Info", icon: Building2 },
      { label: "Target Criteria", icon: Target },
      { label: "AI Detection", icon: Sparkles },
      { label: "LinkedIn", icon: Linkedin },
      { label: "Review", icon: FileCheck },
      { label: "Success", icon: Rocket },
    ];

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between relative px-4">
          {/* Background line */}
          <div className="absolute top-6 left-[8%] right-[8%] h-1 bg-muted rounded-full -z-0" />
          
          {/* Progress line */}
          <div 
            className="absolute top-6 left-[8%] h-1 bg-gradient-to-r from-green-500 via-primary to-primary rounded-full transition-all duration-500 -z-0"
            style={{ 
              width: `${((currentStep - 1) / (totalSteps - 1)) * 84}%` 
            }}
          />
          
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            const Icon = stepConfig[index].icon;

            return (
              <div key={stepNum} className="flex flex-col items-center flex-1 relative z-10">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 relative border-2",
                      isActive
                        ? "bg-gradient-to-br from-primary to-primary/80 text-white scale-110 shadow-lg shadow-primary/50 border-primary"
                        : isCompleted
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md border-green-500"
                        : "bg-card text-muted-foreground border-border"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive && "text-white"
                      )} />
                    )}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <div
                      className={cn(
                        "text-xs font-semibold transition-colors",
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {stepConfig[index].label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Company Information
        </h2>
        <p className="text-muted-foreground text-lg">
          Tell us about your company to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="companyName" className="text-sm font-semibold">
            Company Name
          </Label>
          <Input
            id="companyName"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={(e) => updateFormData("companyName", e.target.value)}
            className="h-11 border-2 focus:border-primary transition-all"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="industry" className="text-sm font-semibold">
            Industry
          </Label>
          <select
            id="industry"
            className="flex h-11 w-full rounded-md border-2 border-input bg-background px-4 py-2 text-base text-foreground shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
            value={formData.industry}
            onChange={(e) => updateFormData("industry", e.target.value)}
          >
            <option value="">Select industry</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="country" className="text-sm font-semibold">
            Country
          </Label>
          <select
            id="country"
            className="flex h-11 w-full rounded-md border-2 border-input bg-background px-4 py-2 text-base text-foreground shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
            value={formData.country}
            onChange={(e) => updateFormData("country", e.target.value)}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Target Criteria
        </h2>
        <p className="text-muted-foreground text-lg">
          Define your ideal customer profile
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Target Job Titles</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., CEO, CTO, VP Engineering"
              value={tempInput.targetJobTitle}
              onChange={(e) =>
                setTempInput((prev) => ({
                  ...prev,
                  targetJobTitle: e.target.value,
                }))
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTargetJobTitle();
                }
              }}
              className="h-11 border-2 focus:border-primary transition-all"
            />
            <Button 
              type="button" 
              onClick={addTargetJobTitle}
              className="gradient-purple hover:opacity-90 text-white px-6"
            >
              Add
            </Button>
          </div>
          {formData.targetJobTitles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.targetJobTitles.map((title, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-lg text-sm font-medium border border-primary/20 shadow-sm hover:shadow transition-all"
                >
                  {title}
                  <button
                    type="button"
                    onClick={() => removeTargetJobTitle(index)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Target Locations</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add location"
              value={tempInput.targetLocation}
              onChange={(e) =>
                setTempInput((prev) => ({
                  ...prev,
                  targetLocation: e.target.value,
                }))
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTargetLocation();
                }
              }}
              className="h-11 border-2 focus:border-primary transition-all"
            />
            <Button 
              type="button" 
              onClick={addTargetLocation}
              className="gradient-purple hover:opacity-90 text-white px-6"
            >
              Add
            </Button>
          </div>
          {formData.targetLocations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.targetLocations.map((loc, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-lg text-sm font-medium border border-primary/20 shadow-sm hover:shadow transition-all"
                >
                  {loc}
                  <button
                    type="button"
                    onClick={() => removeTargetLocation(index)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="targetIndustry" className="text-sm font-semibold">
            Target Industry
          </Label>
          <select
            id="targetIndustry"
            className="flex h-11 w-full rounded-md border-2 border-input bg-background px-4 py-2 text-base text-foreground shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
            value={formData.targetIndustry}
            onChange={(e) => updateFormData("targetIndustry", e.target.value)}
          >
            <option value="">Select target industry</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="companySize" className="text-sm font-semibold">
            Company Size
          </Label>
          <select
            id="companySize"
            className="flex h-11 w-full rounded-md border-2 border-input bg-background px-4 py-2 text-base text-foreground shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
            value={formData.companySize}
            onChange={(e) => updateFormData("companySize", e.target.value)}
          >
            <option value="">Select company size</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size} employees
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="companyType" className="text-sm font-semibold">
            Company Type
          </Label>
          <select
            id="companyType"
            className="flex h-11 w-full rounded-md border-2 border-input bg-background px-4 py-2 text-base text-foreground shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
            value={formData.companyType}
            onChange={(e) => updateFormData("companyType", e.target.value)}
          >
            <option value="">Select company type</option>
            {companyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3 md:col-span-2">
          <Label className="text-sm font-semibold">
            Companies and Keywords to Exclude
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter keyword or company name"
              value={tempInput.excludeKeyword}
              onChange={(e) =>
                setTempInput((prev) => ({
                  ...prev,
                  excludeKeyword: e.target.value,
                }))
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addExcludeKeyword();
                }
              }}
              className="h-11 border-2 focus:border-primary transition-all"
            />
            <Button 
              type="button" 
              onClick={addExcludeKeyword}
              className="gradient-purple hover:opacity-90 text-white px-6"
            >
              Add
            </Button>
          </div>
          {formData.excludeKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.excludeKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-destructive/10 to-destructive/5 text-destructive dark:bg-destructive/20 dark:text-destructive rounded-lg text-sm font-medium border border-destructive/20 shadow-sm hover:shadow transition-all"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeExcludeKeyword(index)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 md:col-span-2 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <Label htmlFor="aiPrecision" className="text-sm font-semibold">
            AI Agent Precision: <span className="text-primary font-bold">{formData.aiPrecision}%</span>
          </Label>
          <div className="space-y-3">
            <input
              type="range"
              id="aiPrecision"
              min="0"
              max="100"
              value={formData.aiPrecision}
              onChange={(e) =>
                updateFormData("aiPrecision", parseInt(e.target.value))
              }
              className="w-full h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>More Leads (Less Precision)</span>
              <span>Fewer Leads (More Precision)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          AI Detection Settings
        </h2>
        <p className="text-muted-foreground text-lg">
          Configure what our AI will detect for you
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all bg-card">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="detectEngagement"
                checked={formData.detectEngagement}
                onCheckedChange={(checked) =>
                  updateFormData("detectEngagement", checked)
                }
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="detectEngagement"
                  className="text-base font-semibold cursor-pointer"
                >
                  Engagement & Interests
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Track user engagement patterns and interests
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all bg-card">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="detectTriggerEvents"
                checked={formData.detectTriggerEvents}
                onCheckedChange={(checked) =>
                  updateFormData("detectTriggerEvents", checked)
                }
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="detectTriggerEvents"
                  className="text-base font-semibold cursor-pointer"
                >
                  Change & Trigger Events
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitor job changes and company updates
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">LinkedIn Profiles to Monitor</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter LinkedIn profile URL"
              value={tempInput.linkedinProfile}
              onChange={(e) =>
                setTempInput((prev) => ({
                  ...prev,
                  linkedinProfile: e.target.value,
                }))
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLinkedInProfile();
                }
              }}
              className="h-11 border-2 focus:border-primary transition-all"
            />
            <Button 
              type="button" 
              onClick={addLinkedInProfile}
              className="gradient-purple hover:opacity-90 text-white px-6"
            >
              Add
            </Button>
          </div>
          {formData.linkedinProfiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.linkedinProfiles.map((profile, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-500/20 shadow-sm hover:shadow transition-all"
                >
                  {profile}
                  <button
                    type="button"
                    onClick={() => removeLinkedInProfile(index)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
          <Linkedin className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Connect LinkedIn
        </h2>
        <p className="text-muted-foreground text-lg">
          Connect your LinkedIn account for enhanced lead generation (optional)
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        {formData.linkedinConnected ? (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-xl font-bold">LinkedIn Connected</p>
            <p className="text-muted-foreground max-w-md">
              Your LinkedIn account is successfully connected and ready to use
            </p>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Linkedin className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">Connect Your LinkedIn</h3>
              <p className="text-muted-foreground max-w-md">
                Connect your LinkedIn account for enhanced lead generation capabilities
              </p>
            </div>
            <Button
              onClick={handleLinkedInConnect}
              className="gradient-purple hover:opacity-90 text-white px-8 py-6 text-base"
              size="lg"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Connect LinkedIn Account
            </Button>
            <p className="text-sm text-muted-foreground">
              You can skip this step and continue
            </p>
          </>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
          <FileCheck className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Review & Submit
        </h2>
        <p className="text-muted-foreground text-lg">
          Review your ICP settings before submitting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Company Name:</span>
              <span className="font-semibold text-sm">{formData.companyName || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Industry:</span>
              <span className="font-semibold text-sm">{formData.industry || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Country:</span>
              <span className="font-semibold text-sm">{formData.country || "N/A"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Target Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Job Titles:</span>
              <span className="font-semibold text-sm text-right max-w-[60%]">
                {formData.targetJobTitles.length > 0
                  ? formData.targetJobTitles.join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Locations:</span>
              <span className="font-semibold text-sm text-right max-w-[60%]">
                {formData.targetLocations.length > 0
                  ? formData.targetLocations.join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Industry:</span>
              <span className="font-semibold text-sm">{formData.targetIndustry || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Company Size:</span>
              <span className="font-semibold text-sm">{formData.companySize || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Company Type:</span>
              <span className="font-semibold text-sm">{formData.companyType || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">AI Precision:</span>
              <span className="font-semibold text-sm text-primary">{formData.aiPrecision}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-all md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Detection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">
                Engagement & Interests:
              </span>
              <span className={cn(
                "font-semibold text-sm px-3 py-1 rounded-full",
                formData.detectEngagement 
                  ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                  : "bg-muted text-muted-foreground"
              )}>
                {formData.detectEngagement ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">
                Trigger Events:
              </span>
              <span className={cn(
                "font-semibold text-sm px-3 py-1 rounded-full",
                formData.detectTriggerEvents 
                  ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                  : "bg-muted text-muted-foreground"
              )}>
                {formData.detectTriggerEvents ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">
                LinkedIn Profiles:
              </span>
              <span className="font-semibold text-sm">
                {formData.linkedinProfiles.length} profile(s)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-3xl flex items-center justify-center animate-bounce-in shadow-xl">
            <CheckCircle2 className="w-14 h-14 text-green-600 dark:text-green-400 animate-scale-in" />
          </div>
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-3xl border-4 border-green-500/30 animate-ping" />
          <div className="absolute inset-0 rounded-3xl border-4 border-green-500/20 animate-ping" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent animate-fade-in-up">
            Successfully Submitted!
          </h2>
          <p className="text-muted-foreground text-center max-w-lg text-lg animate-fade-in-up-delay">
            Your ICP has been created successfully. Our AI will now start
            generating leads based on your criteria.
          </p>
        </div>
        <Button
          onClick={() => {
            // Reset form or redirect
            window.location.href = "/dashboard";
          }}
          className="gradient-purple hover:opacity-90 text-white px-8 py-6 text-base shadow-lg shadow-primary/50 animate-fade-in-up-delay-2"
          size="lg"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-purple-light relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-5xl border-2 border-border/50 shadow-2xl bg-card/95 backdrop-blur-xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Create Your ICP
            </CardTitle>
            <CardDescription className="text-center text-base mt-2">
              Set up your Ideal Customer Profile in just a few steps
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-10">
            {/* Step Indicator at Top */}
            {renderStepIndicator()}

            {/* Step Content */}
            <div className="min-h-[500px] relative">
              <div
                key={currentStep}
                className="transition-all duration-300 ease-in-out animate-fade-in"
              >
                {renderCurrentStep()}
              </div>
            </div>

            {/* Navigation Buttons */}
            {currentStep < 6 && (
              <div className="flex justify-between pt-8 mt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="transition-all px-6 h-11"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                {currentStep === 4 ? (
                  <Button
                    onClick={handleNext}
                    className="gradient-purple hover:opacity-90 text-white transition-all px-8 h-11 shadow-lg shadow-primary/50"
                    size="lg"
                  >
                    Skip & Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : currentStep === 5 ? (
                  <Button
                    onClick={handleSubmit}
                    className="gradient-purple hover:opacity-90 text-white transition-all px-8 h-11 shadow-lg shadow-primary/50"
                    size="lg"
                  >
                    Submit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="gradient-purple hover:opacity-90 text-white transition-all px-8 h-11 shadow-lg shadow-primary/50"
                    size="lg"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
