import { RecruitmentMetrics, JobPost, Candidate } from "@/types";

export const mockMetrics: RecruitmentMetrics = {
  totalCandidates: 1247,
  activeJobPosts: 23,
  resumesDownloaded: 89,
  aiSearchesToday: 156,
  candidateGrowth: 12,
  jobPostGrowth: 3,
  resumeGrowth: 18,
  searchGrowth: 25,
};

export const mockRecentActivity = [
  {
    id: 1,
    type: "resume_upload",
    title: "New resume uploaded",
    description: "Sarah Johnson - Full Stack Developer",
    time: "2 minutes ago",
    status: "info",
  },
  {
    id: 2,
    type: "ai_search",
    title: "AI search completed",
    description: "Found 15 Python developers with 5+ years experience",
    time: "5 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "job_created",
    title: "Job description created",
    description: "Senior React Developer position",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    type: "bulk_download",
    title: "Bulk resume download",
    description: "12 candidate resumes downloaded",
    time: "2 hours ago",
    status: "success",
  },
];

export const mockRecruitmentPipeline = [
  {
    role: "Full Stack Developer",
    current: 8,
    total: 10,
    percentage: 80,
  },
  {
    role: "Python Developer",
    current: 5,
    total: 8,
    percentage: 62.5,
  },
  {
    role: "UI/UX Designer",
    current: 3,
    total: 5,
    percentage: 60,
  },
  {
    role: "DevOps Engineer",
    current: 2,
    total: 6,
    percentage: 33.3,
  },
];

export const mockJobs: JobPost[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Developer",
    role: "Full Stack Developer",
    experience: "Senior Level (6-10 years)",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    department: "Engineering",
    description: "We are seeking a talented Senior Full Stack Developer to join our dynamic team. This is an exciting opportunity for someone with senior level experience to make a significant impact on our technology stack and product development.",
    requirements: [
      "6+ years of experience in full-stack development",
      "Strong proficiency in React and Node.js",
      "Experience with TypeScript and modern development practices",
      "Knowledge of cloud platforms, preferably AWS",
      "Experience with PostgreSQL or similar databases"
    ],
    responsibilities: [
      "Design and develop high-quality software solutions",
      "Collaborate with cross-functional teams to deliver exceptional products",
      "Participate in code reviews and maintain coding standards",
      "Contribute to architectural decisions and technical strategy",
      "Mentor junior developers and share knowledge across the team"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Flexible working arrangements and remote options",
      "Professional development opportunities",
      "Health and wellness benefits",
      "Collaborative and innovative work environment"
    ],
    salary: "$120,000 - $160,000",
    status: "active",
    applicants: 47,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "job-2",
    title: "Python Developer",
    role: "Backend Developer",
    experience: "Mid Level (3-5 years)",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Redis"],
    company: "DataFlow Inc",
    location: "Remote",
    department: "Backend Engineering",
    description: "Join our backend team to build scalable data processing systems and APIs. We're looking for a skilled Python developer to help us handle millions of data points daily.",
    requirements: [
      "3-5 years of Python development experience",
      "Strong knowledge of Django framework",
      "Experience with database design and optimization",
      "Familiarity with containerization (Docker)",
      "Understanding of caching mechanisms (Redis, Memcached)"
    ],
    responsibilities: [
      "Develop and maintain high-performance backend services",
      "Design and optimize database schemas",
      "Implement caching strategies for improved performance",
      "Write comprehensive tests and documentation",
      "Collaborate with frontend and data science teams"
    ],
    benefits: [
      "Remote-first culture",
      "Learning and development budget",
      "Flexible working hours",
      "Health and dental insurance",
      "Annual company retreats"
    ],
    salary: "$80,000 - $110,000",
    status: "active",
    applicants: 23,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "job-3",
    title: "UI/UX Designer",
    role: "UI/UX Designer",
    experience: "Mid Level (3-5 years)",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"],
    company: "Design Studio Pro",
    location: "New York, NY",
    department: "Design",
    description: "We're looking for a creative UI/UX Designer to join our design team and help create intuitive, beautiful user experiences for our digital products.",
    requirements: [
      "3-5 years of UI/UX design experience",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio demonstrating design thinking",
      "Experience with user research and testing",
      "Knowledge of design systems and component libraries"
    ],
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Conduct user research and usability testing",
      "Develop and maintain design systems",
      "Collaborate with developers to ensure design implementation",
      "Present design concepts to stakeholders"
    ],
    benefits: [
      "Creative and collaborative work environment",
      "Latest design tools and equipment",
      "Conference and workshop attendance",
      "Flexible PTO policy",
      "Health and vision insurance"
    ],
    salary: "$70,000 - $95,000",
    status: "active",
    applicants: 31,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-19")
  },
  {
    id: "job-4",
    title: "DevOps Engineer",
    role: "DevOps Engineer",
    experience: "Senior Level (6-10 years)",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    company: "CloudTech Solutions",
    location: "Austin, TX",
    department: "Infrastructure",
    description: "Join our infrastructure team to build and maintain scalable cloud solutions. We need an experienced DevOps engineer to help us scale our platform to millions of users.",
    requirements: [
      "6+ years of DevOps/Infrastructure experience",
      "Expert knowledge of AWS services",
      "Strong experience with Kubernetes and Docker",
      "Infrastructure as Code experience (Terraform, CloudFormation)",
      "CI/CD pipeline design and implementation"
    ],
    responsibilities: [
      "Design and maintain scalable cloud infrastructure",
      "Implement and optimize CI/CD pipelines",
      "Monitor system performance and reliability",
      "Automate deployment and scaling processes",
      "Ensure security and compliance best practices"
    ],
    benefits: [
      "Competitive salary with stock options",
      "Remote work flexibility",
      "Professional development budget",
      "Health, dental, and vision insurance",
      "Retirement savings plan with matching"
    ],
    salary: "$130,000 - $170,000",
    status: "active",
    applicants: 18,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-22")
  },
  {
    id: "job-5",
    title: "Frontend React Developer",
    role: "Frontend Developer",
    experience: "Entry Level (0-2 years)",
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Git"],
    company: "StartupXYZ",
    location: "Remote",
    department: "Frontend Engineering",
    description: "Perfect opportunity for a junior developer to grow with our startup. We're building the next generation of productivity tools and need passionate developers to join our journey.",
    requirements: [
      "0-2 years of professional development experience",
      "Strong foundation in React and JavaScript",
      "Good understanding of HTML5 and CSS3",
      "Familiarity with Git version control",
      "Passion for learning and growth"
    ],
    responsibilities: [
      "Develop responsive user interfaces using React",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable code",
      "Participate in code reviews and team meetings",
      "Learn from senior developers and contribute to team knowledge"
    ],
    benefits: [
      "Mentorship from senior developers",
      "Learning and development opportunities",
      "Flexible remote work",
      "Startup equity participation",
      "Health insurance"
    ],
    salary: "$60,000 - $80,000",
    status: "active",
    applicants: 52,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25")
  }
];

export const mockCandidatesWithJobMatch: Candidate[] = [
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
    role: "Backend Developer",
    experience: 4,
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
    location: "Remote",
    rating: 4.6,
    resumeRating: 7.8,
    accuracy: 80,
    selected: false,
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Frontend Developer",
    experience: 3,
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Git"],
    location: "New York, NY",
    rating: 4.8,
    resumeRating: 8.7,
    accuracy: 88,
    selected: false,
  },
  {
    id: "6",
    name: "James Wilson",
    role: "DevOps Engineer",
    experience: 7,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins"],
    location: "Austin, TX",
    rating: 4.9,
    resumeRating: 9.0,
    accuracy: 92,
    selected: false,
  },
  {
    id: "7",
    name: "Maria Garcia",
    role: "UI/UX Designer",
    experience: 4,
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    location: "Los Angeles, CA",
    rating: 4.7,
    resumeRating: 8.3,
    accuracy: 83,
    selected: false,
  },
  {
    id: "8",
    name: "Alex Thompson",
    role: "Python Developer",
    experience: 5,
    skills: ["Python", "Django", "Flask", "PostgreSQL", "Docker"],
    location: "Remote",
    rating: 4.8,
    resumeRating: 8.6,
    accuracy: 87,
    selected: false,
  }
];