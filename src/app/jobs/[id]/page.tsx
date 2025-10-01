"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";
import { mockJobs, mockCandidatesWithJobMatch } from "@/lib/mockData";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Search,
  Star,
  Eye,
  Download,
  FileText,
  Target,
  CheckCircle2
} from "lucide-react";

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [searchQuery, setSearchQuery] = useState("");
  const [filterByExperience, setFilterByExperience] = useState("");
  const [filterByLocation, setFilterByLocation] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const job = mockJobs.find(j => j.id === jobId);

  // Smart candidate matching based on job requirements
  const getMatchScore = useMemo(() => {
    if (!job) return () => 0;

    return (candidate: { skills: string[]; experience: number; role: string }) => {
      let score = 0;
      const jobSkills = job.skills.map(s => s.toLowerCase());
      const candidateSkills = candidate.skills.map((s: string) => s.toLowerCase());

      // Skill matching (60% of score)
      const skillMatches = jobSkills.filter(skill =>
        candidateSkills.some(candidateSkill => candidateSkill.includes(skill))
      );
      score += (skillMatches.length / jobSkills.length) * 60;

      // Experience matching (25% of score)
      const experienceMatch = job.experience.includes("Senior") && candidate.experience >= 6 ? 25 :
                            job.experience.includes("Mid") && candidate.experience >= 3 && candidate.experience <= 8 ? 25 :
                            job.experience.includes("Entry") && candidate.experience <= 3 ? 25 : 0;
      score += experienceMatch;

      // Role matching (15% of score)
      if (candidate.role.toLowerCase().includes(job.role.toLowerCase().split(" ")[0])) {
        score += 15;
      }

      return Math.min(100, Math.round(score));
    };
  }, [job]);

  const candidatesWithMatch = useMemo(() =>
    mockCandidatesWithJobMatch.map(candidate => ({
      ...candidate,
      matchScore: getMatchScore(candidate)
    })).sort((a, b) => b.matchScore - a.matchScore),
    [getMatchScore]
  );

  // Filter candidates based on search and filters
  const filteredCandidates = useMemo(() => {
    return candidatesWithMatch.filter(candidate => {
      const matchesSearch = searchQuery === "" ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        candidate.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesExperience = filterByExperience === "" ||
        (filterByExperience === "entry" && candidate.experience <= 2) ||
        (filterByExperience === "mid" && candidate.experience >= 3 && candidate.experience <= 5) ||
        (filterByExperience === "senior" && candidate.experience >= 6);

      const matchesLocation = filterByLocation === "" ||
        candidate.location.toLowerCase().includes(filterByLocation.toLowerCase());

      return matchesSearch && matchesExperience && matchesLocation;
    });
  }, [candidatesWithMatch, searchQuery, filterByExperience, filterByLocation]);

  if (!job) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Job Not Found</h1>
            <p className="text-gray-600 mt-2">The job you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/jobs" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              ← Back to Jobs
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const toggleCandidate = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleBulkDownload = () => {
    alert(`Downloading ${selectedCandidates.length} selected resumes...`);
  };

  const handleSingleDownload = (candidateName: string) => {
    alert(`Downloading resume for ${candidateName}...`);
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

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/jobs" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600 mt-2">{job.company} • {job.department}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{job.applicants} applicants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {job.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
              <p className="text-gray-600 mb-6">{job.description}</p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Responsibilities</h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-600">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Candidate Matching Sidebar */}
          <div className="space-y-6">
            {/* Download Actions */}
            {selectedCandidates.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Selected ({selectedCandidates.length})
                </h4>
                <button
                  onClick={handleBulkDownload}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Selected
                </button>
              </div>
            )}

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3">Search Candidates</h4>

              <div className="space-y-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, role, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <select
                  value={filterByExperience}
                  onChange={(e) => setFilterByExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">All Experience Levels</option>
                  <option value="entry">Entry (0-2 years)</option>
                  <option value="mid">Mid (3-5 years)</option>
                  <option value="senior">Senior (6+ years)</option>
                </select>

                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={filterByLocation}
                  onChange={(e) => setFilterByLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3">Candidate Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Matches:</span>
                  <span className="font-medium">{filteredCandidates.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">High Match (80%+):</span>
                  <span className="font-medium text-green-600">
                    {filteredCandidates.filter(c => c.matchScore >= 80).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Good Match (60%+):</span>
                  <span className="font-medium text-yellow-600">
                    {filteredCandidates.filter(c => c.matchScore >= 60 && c.matchScore < 80).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matched Candidates */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Matched Candidates ({filteredCandidates.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedCandidates.includes(candidate.id)
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
                  <div className="text-right">
                    {selectedCandidates.includes(candidate.id) && (
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mb-1" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(candidate.matchScore)}`}>
                      {candidate.matchScore}% match
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {candidate.experience} years experience
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(candidate.rating)}
                    <span className="text-sm text-gray-600 ml-1">{candidate.rating}</span>
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

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Previewing resume for ${candidate.name}`);
                    }}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSingleDownload(candidate.name);
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

          {filteredCandidates.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}