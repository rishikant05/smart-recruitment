"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { Sparkles, Share2, Copy, Link } from "lucide-react";

const jobRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Data Scientist",
  "UI/UX Designer",
  "Product Manager",
  "QA Engineer",
  "System Administrator",
];

const experienceLevels = [
  "Entry Level (0-2 years)",
  "Mid Level (3-5 years)",
  "Senior Level (6-10 years)",
  "Lead Level (10+ years)",
];

export default function JobDescriptionPage() {
  const [formData, setFormData] = useState({
    jobRole: "",
    experience: "",
    skills: "",
    company: "TechCorp Solutions",
    location: "",
    isRemote: "hybrid", // "remote", "onsite", "hybrid"
  });
  const [generatedJD, setGeneratedJD] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerate = async () => {
    if (!formData.jobRole || !formData.experience || !formData.location) {
      alert("Please fill in required fields");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const getWorkArrangementText = () => {
        switch (formData.isRemote) {
          case "remote":
            return "This is a fully remote position with the option to work from anywhere.";
          case "onsite":
            return `This is an on-site position located in ${formData.location}.`;
          case "hybrid":
            return `This is a hybrid position based in ${formData.location} with flexible remote work options.`;
          default:
            return `This position is located in ${formData.location}.`;
        }
      };

      const getLocationInfo = () => {
        if (formData.isRemote === "remote") {
          return "• Location: Remote (Global)";
        }
        return `• Location: ${formData.location}${formData.isRemote === "hybrid" ? " (Hybrid)" : " (On-site)"}`;
      };

      const mockJD = `## ${formData.jobRole} - ${formData.company}

### About the Role
We are seeking a talented ${formData.jobRole} to join our dynamic team at ${formData.company}. This is an exciting opportunity for someone with ${formData.experience.toLowerCase()} to make a significant impact on our technology stack and product development.

${getWorkArrangementText()}

### Key Responsibilities
• Design and develop high-quality software solutions
• Collaborate with cross-functional teams to deliver exceptional products
• Participate in code reviews and maintain coding standards
• Contribute to architectural decisions and technical strategy
• Mentor junior developers and share knowledge across the team

### Required Qualifications
• ${formData.experience} in software development
• Strong problem-solving and analytical skills
• Experience with modern development practices and tools
• Excellent communication and teamwork abilities
${formData.skills ? `• Proficiency in: ${formData.skills}` : ""}
${getLocationInfo()}

### What We Offer
• Competitive salary and equity package
${formData.isRemote === "remote" ? "• Fully remote work with flexible hours" :
  formData.isRemote === "hybrid" ? "• Hybrid work model with flexible remote days" :
  "• Professional office environment"}
• Professional development opportunities
• Health and wellness benefits
• Collaborative and innovative work environment

### How to Apply
Please submit your resume and a brief cover letter explaining why you're interested in this role.

---
*This job description was generated using AI and may require customization for your specific needs.*`;

      setGeneratedJD(mockJD);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedJD);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      alert("Failed to copy to clipboard");
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const shareOptions = [
    {
      name: "Copy Link",
      icon: Link,
      action: () => {
        const shareableLink = `${window.location.origin}/job-description/shared?id=${Date.now()}`;
        navigator.clipboard.writeText(shareableLink);
        alert("Shareable link copied to clipboard!");
        setShowShareModal(false);
      }
    },
    {
      name: "Email",
      icon: Share2,
      action: () => {
        const subject = encodeURIComponent(`Job Opening: ${formData.jobRole} at ${formData.company}`);
        const body = encodeURIComponent(`Hi,\n\nI wanted to share this job opportunity with you:\n\n${generatedJD}\n\nBest regards`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
        setShowShareModal(false);
      }
    },
    {
      name: "LinkedIn",
      icon: Share2,
      action: () => {
        const text = encodeURIComponent(`We're hiring! ${formData.jobRole} position at ${formData.company}`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}&summary=${text}`);
        setShowShareModal(false);
      }
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Job Description Generator</h1>
          <p className="text-gray-600 mt-2">
            Create professional job descriptions powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Requirements</h2>
            <p className="text-gray-600 text-sm mb-6">
              Provide details about the position you want to hire for
            </p>

            <div className="space-y-6">
              {/* Job Role */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Job Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.jobRole}
                  onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a role</option>
                  {jobRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Experience Required <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Key Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Key Skills (Optional)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., React, Node.js, Python, AWS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Work Arrangement */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Work Arrangement <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.isRemote}
                  onChange={(e) => setFormData({ ...formData, isRemote: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Job Location */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {formData.isRemote === "remote" ? "Base Location (Optional)" : "Job Location"}
                  {formData.isRemote !== "remote" && <span className="text-red-500"> *</span>}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={formData.isRemote === "remote" ? "e.g., UTC-5 timezone preferred" : "e.g., San Francisco, CA"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.isRemote === "remote" && (
                  <p className="text-xs text-gray-500 mt-1">
                    For remote positions, you can specify timezone preferences or leave blank for global
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !formData.jobRole || !formData.experience || (formData.isRemote !== "remote" && !formData.location)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                {isGenerating ? "Generating..." : "Generate Job Description"}
              </button>
            </div>
          </div>

          {/* Right Panel - Generated Content */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Generated Job Description</h2>
            <p className="text-gray-600 text-sm mb-6">
              {generatedJD ? "Review and customize your generated job description" : "Fill in the requirements and click generate to create your job description"}
            </p>

            {isGenerating ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600">Generating your job description...</p>
                </div>
              </div>
            ) : generatedJD ? (
              <div className="prose prose-sm max-w-none">
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line font-mono text-sm">
                  {generatedJD}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handleCopyToClipboard}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copySuccess ? "Copied!" : "Copy to Clipboard"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={() => alert("PDF download functionality would be implemented here")}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Download as PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Fill in the requirements and click generate to create your job description
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Share Job Description</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <option.icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{option.name}</span>
                  </button>
                ))}
              </div>

              {/* Quick Copy Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Job Description Text
                </label>
                <div className="relative">
                  <textarea
                    value={generatedJD}
                    readOnly
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm resize-none"
                  />
                  <button
                    onClick={handleCopyToClipboard}
                    className="absolute top-2 right-2 px-2 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-sm text-green-600 mt-2">✓ Copied to clipboard!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}