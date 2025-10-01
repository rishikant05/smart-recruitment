export interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: number;
  skills: string[];
  location: string;
  rating: number;
  resumeUrl?: string;
  resumeRating: number;
  accuracy: number;
  selected: boolean;
}

export interface JobPost {
  id: string;
  title: string;
  role: string;
  experience: string;
  skills: string[];
  company: string;
  location: string;
  department: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary: string;
  status: "active" | "paused" | "closed";
  applicants: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecruitmentMetrics {
  totalCandidates: number;
  activeJobPosts: number;
  resumesDownloaded: number;
  aiSearchesToday: number;
  candidateGrowth: number;
  jobPostGrowth: number;
  resumeGrowth: number;
  searchGrowth: number;
}