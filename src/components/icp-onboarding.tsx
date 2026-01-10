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
import { X, CheckCircle2, Linkedin } from "lucide-react";

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
    const stepLabels = [
      "Company Info",
      "Target Criteria",
      "AI Detection",
      "LinkedIn",
      "Review",
      "Success",
    ];

    return (
      <div className="flex items-center justify-between mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={stepNum} className="flex items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 relative z-10",
                    isActive
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                      : isCompleted
                      ? "bg-green-500 dark:bg-green-600 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    stepNum
                  )}
                </div>
                {stepNum < totalSteps && (
                  <div
                    className={cn(
                      "h-1 flex-1 mx-2 transition-all duration-500",
                      // Line is filled if this step is completed OR if next step is active
                      isCompleted || (stepNum + 1 === currentStep)
                        ? "bg-primary"
                        : "bg-muted"
                    )}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Company Information</h2>
        <p className="text-muted-foreground">
          Tell us about your company to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChange={(e) => updateFormData("companyName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
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

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Target Criteria</h2>
        <p className="text-muted-foreground">
          Define your ideal customer profile
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Target Job Titles</Label>
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
            />
            <Button type="button" onClick={addTargetJobTitle}>
              Add
            </Button>
          </div>
          {formData.targetJobTitles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.targetJobTitles.map((title, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-sm"
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

        <div className="space-y-2">
          <Label>Target Locations</Label>
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
            />
            <Button type="button" onClick={addTargetLocation}>
              Add
            </Button>
          </div>
          {formData.targetLocations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.targetLocations.map((loc, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-sm"
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

        <div className="space-y-2">
          <Label htmlFor="targetIndustry">Target Industry</Label>
          <select
            id="targetIndustry"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
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

        <div className="space-y-2">
          <Label htmlFor="companySize">Company Size</Label>
          <select
            id="companySize"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
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

        <div className="space-y-2">
          <Label htmlFor="companyType">Company Type</Label>
          <select
            id="companyType"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
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

        <div className="space-y-2 md:col-span-2">
          <Label>Companies and Keywords to Exclude</Label>
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
            />
            <Button type="button" onClick={addExcludeKeyword}>
              Add
            </Button>
          </div>
          {formData.excludeKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.excludeKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive rounded-md text-sm"
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

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="aiPrecision">
            AI Agent Precision: {formData.aiPrecision}%
          </Label>
          <div className="space-y-2">
            <input
              type="range"
              id="aiPrecision"
              min="0"
              max="100"
              value={formData.aiPrecision}
              onChange={(e) =>
                updateFormData("aiPrecision", parseInt(e.target.value))
              }
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>More Leads (Less Precision)</span>
              <span>Fewer Leads (More Precision)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Detection Settings</h2>
        <p className="text-muted-foreground">
          Configure what our AI will detect for you
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="detectEngagement"
              checked={formData.detectEngagement}
              onCheckedChange={(checked) =>
                updateFormData("detectEngagement", checked)
              }
            />
            <Label
              htmlFor="detectEngagement"
              className="text-base font-normal cursor-pointer"
            >
              Engagement & Interests
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="detectTriggerEvents"
              checked={formData.detectTriggerEvents}
              onCheckedChange={(checked) =>
                updateFormData("detectTriggerEvents", checked)
              }
            />
            <Label
              htmlFor="detectTriggerEvents"
              className="text-base font-normal cursor-pointer"
            >
              Change & Trigger Events
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>LinkedIn Profiles to Monitor</Label>
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
            />
            <Button type="button" onClick={addLinkedInProfile}>
              Add
            </Button>
          </div>
          {formData.linkedinProfiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.linkedinProfiles.map((profile, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-md text-sm"
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Connect LinkedIn</h2>
        <p className="text-muted-foreground">
          Connect your LinkedIn account for enhanced lead generation (optional)
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        {formData.linkedinConnected ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg font-semibold">LinkedIn Connected</p>
            <p className="text-muted-foreground">
              Your LinkedIn account is successfully connected
            </p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
              <Linkedin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <Button
              onClick={handleLinkedInConnect}
              className="gradient-purple hover:opacity-90 text-white"
              size="lg"
            >
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">
          Review your ICP settings before submitting
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company Name:</span>
              <span className="font-medium">{formData.companyName || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Industry:</span>
              <span className="font-medium">{formData.industry || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country:</span>
              <span className="font-medium">{formData.country || "N/A"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Job Titles:</span>
              <span className="font-medium">
                {formData.targetJobTitles.length > 0
                  ? formData.targetJobTitles.join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Locations:</span>
              <span className="font-medium">
                {formData.targetLocations.length > 0
                  ? formData.targetLocations.join(", ")
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Industry:</span>
              <span className="font-medium">
                {formData.targetIndustry || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company Size:</span>
              <span className="font-medium">
                {formData.companySize || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company Type:</span>
              <span className="font-medium">
                {formData.companyType || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">AI Precision:</span>
              <span className="font-medium">{formData.aiPrecision}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Detection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Engagement & Interests:
              </span>
              <span className="font-medium">
                {formData.detectEngagement ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Trigger Events:
              </span>
              <span className="font-medium">
                {formData.detectTriggerEvents ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                LinkedIn Profiles:
              </span>
              <span className="font-medium">
                {formData.linkedinProfiles.length} profile(s)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
          <div className="w-20 h-20 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center animate-bounce-in">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 animate-scale-in" />
          </div>
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping" style={{ animationDelay: "0.5s" }} />
        </div>
        <h2 className="text-3xl font-bold animate-fade-in-up">Successfully Submitted!</h2>
        <p className="text-muted-foreground text-center max-w-md animate-fade-in-up-delay">
          Your ICP has been created successfully. Our AI will now start
          generating leads based on your criteria.
        </p>
        <Button
          onClick={() => {
            // Reset form or redirect
            window.location.href = "/dashboard";
          }}
          className="gradient-purple hover:opacity-90 text-white animate-fade-in-up-delay-2"
          size="lg"
        >
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
        <Card className="w-full max-w-5xl border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">
              Create Your ICP
            </CardTitle>
            <CardDescription className="text-center">
              Set up your Ideal Customer Profile in just a few steps
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
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
              <div className="flex justify-between pt-6 mt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="transition-all"
                >
                  Back
                </Button>
                {currentStep === 4 ? (
                  <Button
                    onClick={handleNext}
                    className="gradient-purple hover:opacity-90 text-white transition-all"
                  >
                    Skip & Continue
                  </Button>
                ) : currentStep === 5 ? (
                  <Button
                    onClick={handleSubmit}
                    className="gradient-purple hover:opacity-90 text-white transition-all"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="gradient-purple hover:opacity-90 text-white transition-all"
                  >
                    Next
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
