"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { Send, Download, MapPin, Star, User, CheckCircle2, FileText, Target, Eye } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: number;
  skills: string[];
  location: string;
  rating: number;
  resumeRating: number; // Rating out of 10
  accuracy: number; // Success rate percentage
  selected: boolean;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    experience: 7,
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    location: "San Francisco, CA",
    rating: 4.8,
    resumeRating: 8.5,
    accuracy: 85,
    selected: false,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Senior Full Stack Developer",
    experience: 8,
    skills: ["React", "Python", "Django", "Docker", "Kubernetes"],
    location: "Seattle, WA",
    rating: 4.9,
    resumeRating: 9.2,
    accuracy: 90,
    selected: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Full Stack Engineer",
    experience: 6,
    skills: ["Vue.js", "Node.js", "GraphQL", "MongoDB", "Redis"],
    location: "Austin, TX",
    rating: 4.7,
    resumeRating: 8.0,
    accuracy: 75,
    selected: false,
  },
  {
    id: "4",
    name: "David Kim",
    role: "Software Engineer",
    experience: 9,
    skills: ["React", "Java", "Spring Boot", "Microservices", "Azure"],
    location: "New York, NY",
    rating: 4.6,
    resumeRating: 7.8,
    accuracy: 80,
    selected: false,
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Full Stack Developer",
    experience: 7,
    skills: ["Angular", "C#", ".NET Core", "SQL Server", "DevOps"],
    location: "Chicago, IL",
    rating: 4.8,
    resumeRating: 8.7,
    accuracy: 88,
    selected: false,
  },
];

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: "user" | "ai"; content: string }>>([]);
  const [selectedResumePreview, setSelectedResumePreview] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setMessages((prev) => [...prev, { type: "user", content: query }]);

    // Simulate AI search
    setTimeout(() => {
      const searchResults = mockCandidates.map((candidate) => ({
        ...candidate,
        selected: false,
      }));

      setCandidates(searchResults);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: `Found ${searchResults.length} candidates matching your criteria. Here are the top full-stack developers with 7+ years of experience:`,
        },
      ]);
      setQuery("");
      setIsSearching(false);
    }, 2000);
  };

  const toggleCandidate = (id: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? { ...candidate, selected: !candidate.selected }
          : candidate
      )
    );
  };

  const selectedCandidates = candidates.filter((c) => c.selected);

  const handleBulkDownload = () => {
    alert(`Downloading ${selectedCandidates.length} selected resumes...`);
  };

  const handleDownloadAll = () => {
    alert(`Downloading all ${candidates.length} candidate resumes...`);
  };

  const handleSingleDownload = (candidateId: string, candidateName: string) => {
    alert(`Downloading resume for ${candidateName}...`);
  };

  const handlePreviewResume = (candidateId: string) => {
    setSelectedResumePreview(candidateId);
  };

  const mockResumeContent = {
    "1": `SARAH JOHNSON
Full Stack Developer | 7 Years Experience
📧 sarah.johnson@email.com | 📱 (555) 123-4567 | 📍 San Francisco, CA

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 7+ years of expertise in React, Node.js, and TypeScript.
Proven track record of delivering scalable web applications and leading development teams.

TECHNICAL SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express.js, PostgreSQL, REST APIs
• Cloud: AWS (EC2, S3, Lambda), Docker, CI/CD
• Tools: Git, Webpack, Jest, Cypress

EXPERIENCE
Senior Full Stack Developer | TechCorp Inc. | 2020 - Present
• Led development of customer portal serving 50K+ users
• Implemented microservices architecture reducing load time by 40%
• Mentored 3 junior developers and established coding standards

Full Stack Developer | StartupXYZ | 2017 - 2020
• Built MVP from scratch using React and Node.js
• Integrated payment systems and user authentication
• Collaborated with design team to implement responsive UI

EDUCATION
Bachelor of Science in Computer Science | UC Berkeley | 2017`,

    "2": `MICHAEL CHEN
Senior Full Stack Developer | 8 Years Experience
📧 michael.chen@email.com | 📱 (555) 234-5678 | 📍 Seattle, WA

PROFESSIONAL SUMMARY
Senior Full Stack Developer with 8+ years of experience in React, Python, and cloud technologies.
Expert in Django framework and containerization with Docker and Kubernetes.

TECHNICAL SKILLS
• Frontend: React, JavaScript, TypeScript, Redux, Material-UI
• Backend: Python, Django, Flask, Node.js, PostgreSQL, MongoDB
• DevOps: Docker, Kubernetes, AWS, CI/CD, Jenkins
• Testing: Jest, Pytest, Selenium

EXPERIENCE
Lead Full Stack Developer | CloudTech Solutions | 2019 - Present
• Architected and developed cloud-native applications serving 100K+ users
• Implemented Kubernetes orchestration reducing deployment time by 60%
• Led team of 5 developers across multiple projects

Senior Developer | WebDev Agency | 2016 - 2019
• Developed enterprise web applications using Django and React
• Optimized database queries improving performance by 50%
• Implemented automated testing reducing bugs by 70%

EDUCATION
Master of Science in Software Engineering | University of Washington | 2016`
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Candidate Search</h1>
          <p className="text-gray-600 mt-2">
            Use natural language to find the perfect candidates for your roles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 h-96 flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-12">
                    <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Ask me to find candidates</p>
                    <p className="text-sm">
                      Try: &quot;Show me top 5 full-stack developers with 7+ years experience&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.type === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isSearching && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span>Searching candidates...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Ask for candidates (e.g., 'Find Python developers with 5+ years experience')"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSearching}
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isSearching || !query.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Download Options
            </h3>

            {/* Bulk Download Options */}
            {candidates.length > 0 && (
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleDownloadAll}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download All ({candidates.length} resumes)
                </button>

                {selectedCandidates.length > 0 && (
                  <button
                    onClick={handleBulkDownload}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Selected ({selectedCandidates.length} resumes)
                  </button>
                )}
              </div>
            )}

            {/* Selected Candidates List */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Selected Candidates ({selectedCandidates.length})
              </h4>

              {selectedCandidates.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{candidate.name}</p>
                        <p className="text-gray-600">{candidate.role}</p>
                      </div>
                      <button
                        onClick={() => handleSingleDownload(candidate.id, candidate.name)}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Select candidates from the results to see them here
                </p>
              )}
            </div>

            {/* Example Queries */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Example Queries</h4>
              <div className="space-y-2">
                {[
                  "Frontend developers with React experience",
                  "Senior Python developers in San Francisco",
                  "DevOps engineers with AWS certification",
                  "Full-stack developers with startup experience",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setQuery(example)}
                    className="w-full text-left text-xs text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded"
                  >
                    &quot;{example}&quot;
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {candidates.length > 0 && (
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Search Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    candidate.selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleCandidate(candidate.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                      <p className="text-sm text-gray-600">{candidate.role}</p>
                    </div>
                    {candidate.selected && (
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      {candidate.experience} years experience
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(candidate.rating)}
                      <span className="text-sm text-gray-600 ml-1">
                        {candidate.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      Resume: {candidate.resumeRating}/10
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Target className="h-4 w-4" />
                      Accuracy: {candidate.accuracy}%
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviewResume(candidate.id);
                      }}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSingleDownload(candidate.id, candidate.name);
                      }}
                      className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resume Preview Modal */}
        {selectedResumePreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Resume Preview - {candidates.find(c => c.id === selectedResumePreview)?.name}
                </h3>
                <button
                  onClick={() => setSelectedResumePreview(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                    {mockResumeContent[selectedResumePreview as keyof typeof mockResumeContent] ||
                     "Resume content not available for this candidate."}
                  </pre>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  Resume Rating: {candidates.find(c => c.id === selectedResumePreview)?.resumeRating}/10
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      alert(`Downloading resume for ${candidates.find(c => c.id === selectedResumePreview)?.name}...`);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setSelectedResumePreview(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}