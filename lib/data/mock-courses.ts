export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl: string;
  order: number;
  completed?: boolean;
  type: "video" | "quiz" | "assignment";
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  instructor: Instructor;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  duration: number; // total minutes
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  tags: string[];
  sections: Section[];
  whatYouWillLearn: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

export interface StudentProgress {
  courseId: string;
  studentId: string;
  completedLessons: string[];
  currentLesson?: string;
  progress: number; // percentage 0-100
  enrolledAt: string;
  lastAccessedAt: string;
}

export interface Review {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  difficulty: number; // 1-5
  estimatedTime: number; // in minutes
  thumbnail: string;
  tags: string[];
  learningObjectives: string[];
  prerequisites: string[];
  documentationUrl: string;
  challengeUrl: string;
  completed: boolean;
  completionRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeProgress {
  challengeId: string;
  userId: string;
  status: "not_started" | "in_progress" | "completed" | "failed";
  progress: number; // 0-100
  startedAt?: string;
  completedAt?: string;
  attempts: number;
  score?: number;
}

// Mock Instructors
export const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Senior Software Engineer at Google with 10+ years of experience in full-stack development and Solana blockchain technology.",
    rating: 4.8,
    students: 15420,
    courses: 12,
  },
  {
    id: "2",
    name: "Mark Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Solana Developer and Entrepreneur. Founder of 3 successful DeFi projects on Solana.",
    rating: 4.9,
    students: 8920,
    courses: 8,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "UX/UI Designer and Frontend Developer specializing in modern web applications.",
    rating: 4.7,
    students: 12300,
    courses: 15,
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Solana Development Bootcamp",
    subtitle: "Master Solana blockchain development from zero to hero",
    description:
      "This comprehensive course covers everything you need to know about Solana development. From basic concepts to advanced program development, you'll learn to build high-performance dApps on Solana.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[0],
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 1247,
    students: 8920,
    duration: 480, // 8 hours
    level: "intermediate",
    category: "Solana",
    tags: ["Solana", "Rust", "Smart Contracts", "Web3", "Blockchain"],
    whatYouWillLearn: [
      "Understand Solana architecture and consensus",
      "Write and deploy Solana programs",
      "Build decentralized applications",
      "Work with Anchor framework",
      "Implement SPL token standards",
      "Master Solana CLI and tooling",
    ],
    requirements: [
      "Basic programming knowledge",
      "Understanding of Rust or JavaScript",
      "No prior blockchain experience required",
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-10-01T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "1",
        title: "Solana Fundamentals",
        order: 1,
        lessons: [
          {
            id: "1",
            title: "What is Solana?",
            description:
              "Introduction to Solana blockchain and its unique features",
            duration: 15,
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            order: 1,
            type: "video",
          },
          {
            id: "2",
            title: "Solana Architecture",
            description:
              "Understanding Solana's architecture and consensus mechanism",
            duration: 20,
            videoUrl: "https://www.youtube.com/watch?v=1rWV7jKzNyc",
            order: 2,
            type: "video",
          },
        ],
      },
      {
        id: "2",
        title: "Program Development",
        order: 2,
        lessons: [
          {
            id: "3",
            title: "Rust for Solana",
            description: "Learn Rust programming for Solana development",
            duration: 25,
            videoUrl: "https://www.youtube.com/watch?v=ipwxYa-F1uY",
            order: 1,
            type: "video",
          },
          {
            id: "4",
            title: "Writing Your First Program",
            description: "Build and deploy your first Solana program",
            duration: 30,
            videoUrl: "https://example.com/lesson4.mp4",
            order: 2,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "React & Next.js Masterclass",
    subtitle: "Build modern web applications with React and Next.js",
    description:
      "Master React and Next.js with this comprehensive course. Learn advanced patterns, server-side rendering, and build production-ready applications.",
    thumbnail:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[2],
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviews: 2156,
    students: 15670,
    duration: 360,
    level: "intermediate",
    category: "Web Development",
    tags: ["React", "Next.js", "JavaScript", "Web Development"],
    whatYouWillLearn: [
      "Master React fundamentals and hooks",
      "Build server-side rendered applications",
      "Implement authentication and authorization",
      "Optimize performance and SEO",
      "Deploy to production platforms",
    ],
    requirements: [
      "JavaScript fundamentals",
      "HTML and CSS knowledge",
      "Basic React knowledge recommended",
    ],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-09-15T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "3",
        title: "React Essentials",
        order: 1,
        lessons: [
          {
            id: "5",
            title: "React Components and Props",
            description: "Understanding React components and data flow",
            duration: 18,
            videoUrl: "https://example.com/lesson5.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Solana DeFi Protocol Development",
    subtitle: "Create decentralized finance applications on Solana",
    description:
      "Learn to build DeFi protocols from the ground up on Solana. Cover liquidity pools, yield farming, staking, and more with high-performance Solana programs.",
    thumbnail:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[1],
    price: 99.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 892,
    students: 5430,
    duration: 420,
    level: "advanced",
    category: "Solana",
    tags: ["DeFi", "Solana", "Rust", "Smart Contracts", "Blockchain"],
    whatYouWillLearn: [
      "Understand DeFi ecosystem",
      "Build AMM protocols",
      "Implement yield farming",
      "Create staking mechanisms",
      "Security best practices",
    ],
    requirements: [
      "Solidity programming",
      "Blockchain fundamentals",
      "Web3 development experience",
    ],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-08-20T00:00:00Z",
    sections: [
      {
        id: "4",
        title: "DeFi Fundamentals",
        order: 1,
        lessons: [
          {
            id: "6",
            title: "Introduction to DeFi",
            description: "Overview of decentralized finance",
            duration: 22,
            videoUrl: "https://example.com/lesson6.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
];

// Mock Student Progress
export const mockStudentProgress: StudentProgress[] = [
  {
    courseId: "1",
    studentId: "student1",
    completedLessons: ["1", "2"],
    currentLesson: "3",
    progress: 25,
    enrolledAt: "2024-10-01T00:00:00Z",
    lastAccessedAt: "2024-10-15T00:00:00Z",
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: "1",
    courseId: "1",
    studentId: "student1",
    studentName: "Alice Johnson",
    studentAvatar: "/imgs/student1.jpg",
    rating: 5,
    comment:
      "Excellent course! Very comprehensive and well-structured. The instructor explains complex concepts clearly.",
    createdAt: "2024-10-10T00:00:00Z",
    helpful: 12,
  },
  {
    id: "2",
    courseId: "1",
    studentId: "student2",
    studentName: "Bob Smith",
    studentAvatar: "/imgs/student2.jpg",
    rating: 4,
    comment:
      "Great content, but some sections could be updated. Overall very good learning experience.",
    createdAt: "2024-10-08T00:00:00Z",
    helpful: 8,
  },
];

// Categories for filtering
export const courseCategories = [
  "All Categories",
  "Solana",
  "Rust Programming",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "AI & Machine Learning",
  "DevOps",
  "Cybersecurity",
];

// Levels for filtering
export const courseLevels = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

// Sort options
export const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    id: "anchor-vault",
    title: "Anchor Vault",
    subtitle: "Build a secure vault smart contract",
    description:
      "Create a vault smart contract that allows users to deposit and withdraw tokens securely. Learn about access control, reentrancy protection, and best practices for DeFi contracts.",
    category: "Anchor",
    level: "beginner",
    difficulty: 2,
    estimatedTime: 45,
    thumbnail: "/graphics/challenge-anchor.svg",
    tags: ["Smart Contracts", "Security", "DeFi", "Solidity"],
    learningObjectives: [
      "Implement proper access control patterns",
      "Protect against reentrancy attacks",
      "Use OpenZeppelin contracts safely",
      "Handle token transfers securely",
    ],
    prerequisites: [
      "Basic Solidity knowledge",
      "Understanding of ERC-20 tokens",
      "Familiarity with Remix or Hardhat",
    ],
    documentationUrl: "/elearning/challenges/anchor-vault/docs",
    challengeUrl: "/elearning/challenges/anchor-vault/challenge",
    completed: false,
    completionRate: 78,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-10-01T00:00:00Z",
  },
  {
    id: "pinocchio-vault",
    title: "Pinocchio Vault",
    subtitle: "Advanced vault with yield farming",
    description:
      "Build an advanced vault that integrates yield farming strategies. Learn about liquidity pools, staking mechanisms, and automated yield optimization.",
    category: "Rust",
    level: "intermediate",
    difficulty: 4,
    estimatedTime: 90,
    thumbnail: "/graphics/challenge-rust.svg",
    tags: ["Rust", "Smart Contracts", "DeFi", "Yield Farming"],
    learningObjectives: [
      "Implement complex vault logic",
      "Integrate with AMM protocols",
      "Create automated strategies",
      "Handle multiple token types",
    ],
    prerequisites: [
      "Intermediate Rust programming",
      "Understanding of DeFi protocols",
      "Experience with Anchor framework",
    ],
    documentationUrl: "/elearning/challenges/pinocchio-vault/docs",
    challengeUrl: "/elearning/challenges/pinocchio-vault/challenge",
    completed: false,
    completionRate: 45,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-09-15T00:00:00Z",
  },
  {
    id: "pinocchio-escrow",
    title: "Pinocchio Escrow",
    subtitle: "Build a decentralized escrow service",
    description:
      "Create an escrow smart contract for secure transactions between parties. Learn about multi-party agreements, dispute resolution, and trustless transactions.",
    category: "Rust",
    level: "intermediate",
    difficulty: 3,
    estimatedTime: 75,
    thumbnail: "/graphics/challenge-rust.svg",
    tags: ["Rust", "Smart Contracts", "Escrow", "Web3"],
    learningObjectives: [
      "Implement multi-party contract logic",
      "Handle fund locking and release",
      "Create dispute resolution mechanisms",
      "Integrate with oracles for external data",
    ],
    prerequisites: [
      "Intermediate Rust programming",
      "Basic understanding of escrow concepts",
      "Experience with Solana development",
    ],
    documentationUrl: "/elearning/challenges/pinocchio-escrow/docs",
    challengeUrl: "/elearning/challenges/pinocchio-escrow/challenge",
    completed: false,
    completionRate: 62,
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-08-20T00:00:00Z",
  },
  {
    id: "pinocchio-amm",
    title: "Pinocchio AMM",
    subtitle: "Create an automated market maker",
    description:
      "Build your own AMM protocol with constant product formula. Learn about liquidity provision, price discovery, and impermanent loss protection.",
    category: "Rust",
    level: "advanced",
    difficulty: 5,
    estimatedTime: 120,
    thumbnail: "/graphics/challenge-rust.svg",
    tags: ["Rust", "DeFi", "AMM", "Mathematics"],
    learningObjectives: [
      "Implement constant product formula",
      "Handle liquidity provision and removal",
      "Calculate accurate price slippage",
      "Optimize gas usage for swaps",
    ],
    prerequisites: [
      "Advanced Rust programming",
      "Strong math background",
      "Deep understanding of DeFi mechanics",
    ],
    documentationUrl: "/elearning/challenges/pinocchio-amm/docs",
    challengeUrl: "/elearning/challenges/pinocchio-amm/challenge",
    completed: false,
    completionRate: 23,
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-07-10T00:00:00Z",
  },
  {
    id: "pinocchio-secp256r1-vault",
    title: "Pinocchio Secp256r1 Vault",
    subtitle: "Advanced vault with secp256r1 signatures",
    description:
      "Build a vault that accepts secp256r1 signatures for authentication. Learn about different elliptic curves and signature verification.",
    category: "Rust",
    level: "intermediate",
    difficulty: 4,
    estimatedTime: 85,
    thumbnail: "/graphics/challenge-rust.svg",
    tags: ["Rust", "Cryptography", "Security", "Signatures"],
    learningObjectives: [
      "Implement secp256r1 signature verification",
      "Handle different elliptic curves",
      "Create secure authentication mechanisms",
      "Optimize cryptographic operations",
    ],
    prerequisites: [
      "Intermediate Rust programming",
      "Basic cryptography knowledge",
      "Understanding of digital signatures",
    ],
    documentationUrl: "/elearning/challenges/pinocchio-secp256r1-vault/docs",
    challengeUrl: "/elearning/challenges/pinocchio-secp256r1-vault/challenge",
    completed: false,
    completionRate: 34,
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-06-15T00:00:00Z",
  },
  {
    id: "pinocchio-flash-loan",
    title: "Pinocchio Flash Loan",
    subtitle: "Implement flash loan functionality",
    description:
      "Create a flash loan protocol that allows borrowing without collateral. Learn about atomic transactions and arbitrage opportunities.",
    category: "Rust",
    level: "intermediate",
    difficulty: 4,
    estimatedTime: 95,
    thumbnail: "/graphics/challenge-rust.svg",
    tags: ["Rust", "DeFi", "Flash Loans", "Arbitrage"],
    learningObjectives: [
      "Implement flash loan logic",
      "Handle atomic transactions",
      "Create arbitrage opportunities",
      "Manage protocol fees",
    ],
    prerequisites: [
      "Intermediate Rust programming",
      "Understanding of DeFi protocols",
      "Basic knowledge of arbitrage",
    ],
    documentationUrl: "/elearning/challenges/pinocchio-flash-loan/docs",
    challengeUrl: "/elearning/challenges/pinocchio-flash-loan/challenge",
    completed: false,
    completionRate: 51,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-05-20T00:00:00Z",
  },
  {
    id: "pinocchio-quantum-vault",
    title: "Pinocchio Quantum Vault",
    subtitle: "Quantum-resistant vault implementation",
    description:
      "Build a vault with quantum-resistant cryptographic algorithms. Learn about post-quantum cryptography and future-proof security.",
    category: "Rust",
    level: "intermediate",
    difficulty: 4,
    estimatedTime: 100,
    thumbnail: "/graphics/challenge-rust.svg",
    tags: ["Rust", "Cryptography", "Quantum", "Security"],
    learningObjectives: [
      "Implement quantum-resistant algorithms",
      "Handle advanced cryptographic operations",
      "Create future-proof security measures",
      "Optimize for performance and security",
    ],
    prerequisites: [
      "Intermediate Rust programming",
      "Advanced cryptography knowledge",
      "Understanding of quantum computing threats",
    ],
    documentationUrl: "/elearning/challenges/pinocchio-quantum-vault/docs",
    challengeUrl: "/elearning/challenges/pinocchio-quantum-vault/challenge",
    completed: false,
    completionRate: 18,
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-04-10T00:00:00Z",
  },
];

// Mock Challenge Progress
export const mockChallengeProgress: ChallengeProgress[] = [
  {
    challengeId: "anchor-vault",
    userId: "user1",
    status: "completed",
    progress: 100,
    startedAt: "2024-10-01T00:00:00Z",
    completedAt: "2024-10-05T00:00:00Z",
    attempts: 2,
    score: 95,
  },
  {
    challengeId: "pinocchio-vault",
    userId: "user1",
    status: "in_progress",
    progress: 65,
    startedAt: "2024-10-10T00:00:00Z",
    attempts: 1,
  },
];

// Challenge Categories
export const challengeCategories = [
  "All Categories",
  "Anchor",
  "Rust",
  "Solidity",
  "JavaScript",
  "Python",
];

// Challenge Status Options
export const challengeStatuses = [
  "All Statuses",
  "Not Started",
  "In Progress",
  "Completed",
  "Failed",
];
