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
    bio: "Senior Software Engineer at Google with 10+ years of experience in full-stack development and blockchain technology.",
    rating: 4.8,
    students: 15420,
    courses: 12,
  },
  {
    id: "2",
    name: "Mark Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Blockchain Developer and Entrepreneur. Founder of 3 successful DeFi projects.",
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
  {
    id: "4",
    name: "Alex Thompson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Full-Stack Developer and DevOps Engineer. AWS Certified Solutions Architect with expertise in cloud infrastructure.",
    rating: 4.9,
    students: 18750,
    courses: 10,
  },
  {
    id: "5",
    name: "Dr. Maria Garcia",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "AI Research Scientist at OpenAI. PhD in Machine Learning with focus on computer vision and natural language processing.",
    rating: 4.9,
    students: 22100,
    courses: 18,
  },
  {
    id: "6",
    name: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    bio: "Cybersecurity Expert and Ethical Hacker. Former NSA consultant with 15+ years in information security.",
    rating: 4.8,
    students: 16890,
    courses: 14,
  },
  {
    id: "7",
    name: "Sophie Anderson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    bio: "Data Scientist and ML Engineer. Worked at Netflix and Spotify on recommendation systems.",
    rating: 4.8,
    students: 19200,
    courses: 16,
  },
  {
    id: "8",
    name: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Mobile App Developer and Tech Entrepreneur. Founder of 2 successful mobile startups.",
    rating: 4.7,
    students: 14560,
    courses: 9,
  },
  {
    id: "9",
    name: "Rachel Brown",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    bio: "Product Manager and UX Researcher. Former PM at Airbnb and Uber with expertise in user-centered design.",
    rating: 4.6,
    students: 13400,
    courses: 11,
  },
  {
    id: "10",
    name: "Michael Torres",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Game Developer and Unity Expert. Created award-winning games with millions of downloads.",
    rating: 4.7,
    students: 15670,
    courses: 13,
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Blockchain Development Bootcamp",
    subtitle: "Learn to build decentralized applications from scratch",
    description:
      "This comprehensive course covers everything you need to know about blockchain development. From basic concepts to advanced smart contract development, you'll learn to build production-ready dApps.",
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
    category: "Blockchain",
    tags: ["Blockchain", "Smart Contracts", "Solana", "Web3"],
    whatYouWillLearn: [
      "Understand blockchain fundamentals",
      "Write and deploy smart contracts",
      "Build decentralized applications",
      "Work with Solana Web3.js and Anchor",
      "Implement token standards (SPL tokens, NFTs)",
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
        title: "Blockchain Fundamentals",
        order: 1,
        lessons: [
          {
            id: "1",
            title: "What is Blockchain?",
            description:
              "Introduction to blockchain technology and its applications",
            duration: 15,
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            order: 1,
            type: "video",
          },
          {
            id: "2",
            title: "Cryptography Basics",
            description: "Understanding cryptographic principles in blockchain",
            duration: 20,
            videoUrl: "https://www.youtube.com/watch?v=1rWV7jKzNyc",
            order: 2,
            type: "video",
          },
        ],
      },
      {
        id: "2",
        title: "Smart Contract Development",
        order: 2,
        lessons: [
          {
            id: "3",
            title: "Rust Fundamentals",
            description: "Learn the basics of Rust programming for Solana",
            duration: 25,
            videoUrl: "https://www.youtube.com/watch?v=ipwxYa-F1uY",
            order: 1,
            type: "video",
          },
          {
            id: "4",
            title: "Writing Your First Smart Contract",
            description: "Build and deploy your first smart contract",
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
    title: "DeFi Protocol Development",
    subtitle: "Create decentralized finance applications",
    description:
      "Learn to build DeFi protocols from the ground up. Cover liquidity pools, yield farming, staking, and more.",
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
    category: "Blockchain",
    tags: ["DeFi", "Blockchain", "Smart Contracts", "Solana"],
    whatYouWillLearn: [
      "Understand DeFi ecosystem",
      "Build AMM protocols",
      "Implement yield farming",
      "Create staking mechanisms",
      "Security best practices",
    ],
    requirements: [
      "Rust programming",
      "Blockchain fundamentals",
      "Solana development experience",
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
  {
    id: "4",
    title: "Anchor Framework Deep Dive",
    subtitle: "Master Solana's most popular development framework",
    description:
      "Learn to build robust Solana programs using the Anchor framework. From basic PDAs to complex cross-program invocations, this course covers everything you need to become an Anchor expert.",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[1],
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviews: 856,
    students: 4230,
    duration: 360,
    level: "intermediate",
    category: "Blockchain",
    tags: ["Anchor", "Rust", "Solana", "PDAs"],
    whatYouWillLearn: [
      "Master Anchor framework fundamentals",
      "Implement Program Derived Addresses (PDAs)",
      "Handle cross-program invocations (CPIs)",
      "Create secure and efficient programs",
      "Deploy and test Anchor programs",
    ],
    requirements: [
      "Basic Rust programming",
      "Understanding of Solana basics",
      "Familiarity with blockchain concepts",
    ],
    createdAt: "2024-04-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "5",
        title: "Anchor Basics",
        order: 1,
        lessons: [
          {
            id: "7",
            title: "Setting up Anchor Environment",
            description: "Install and configure Anchor for development",
            duration: 20,
            videoUrl: "https://example.com/lesson7.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Solana NFT Creation & Marketplace",
    subtitle: "Build your own NFT marketplace on Solana",
    description:
      "Create, mint, and trade NFTs on Solana. Learn about Metaplex standards, candy machines, and build a complete NFT marketplace with buying, selling, and auction features.",
    thumbnail:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[0],
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 678,
    students: 3450,
    duration: 420,
    level: "advanced",
    category: "NFT",
    tags: ["NFT", "Metaplex", "Marketplace", "Solana"],
    whatYouWillLearn: [
      "Understand NFT standards on Solana",
      "Create and mint NFTs using Metaplex",
      "Build NFT marketplace frontend",
      "Implement buying and selling logic",
      "Add auction functionality",
    ],
    requirements: [
      "Intermediate Solana development",
      "React/Next.js knowledge",
      "Understanding of NFTs",
    ],
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-08-15T00:00:00Z",
    sections: [
      {
        id: "6",
        title: "NFT Fundamentals",
        order: 1,
        lessons: [
          {
            id: "8",
            title: "Solana NFT Standards",
            description: "Understanding Metaplex and NFT standards",
            duration: 25,
            videoUrl: "https://example.com/lesson8.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "Rust Programming for Blockchain",
    subtitle: "Learn Rust specifically for blockchain development",
    description:
      "Master Rust programming with a focus on blockchain applications. Learn memory management, concurrency, and patterns commonly used in smart contract development.",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[2],
    price: 69.99,
    originalPrice: 109.99,
    rating: 4.7,
    reviews: 1247,
    students: 5670,
    duration: 480,
    level: "beginner",
    category: "Programming",
    tags: ["Rust", "Programming", "Blockchain", "Smart Contracts"],
    whatYouWillLearn: [
      "Master Rust syntax and semantics",
      "Understand ownership and borrowing",
      "Work with collections and iterators",
      "Handle errors gracefully",
      "Write efficient and safe code",
    ],
    requirements: [
      "Basic programming knowledge",
      "No prior Rust experience required",
    ],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-10-05T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "7",
        title: "Rust Fundamentals",
        order: 1,
        lessons: [
          {
            id: "9",
            title: "Variables and Data Types",
            description: "Understanding Rust's type system",
            duration: 18,
            videoUrl: "https://example.com/lesson9.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    title: "DeFi Yield Farming on Solana",
    subtitle: "Build automated yield farming strategies",
    description:
      "Learn to create sophisticated yield farming protocols on Solana. Cover liquidity mining, staking mechanisms, reward distribution, and impermanent loss protection.",
    thumbnail:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[1],
    price: 99.99,
    originalPrice: 169.99,
    rating: 4.8,
    reviews: 423,
    students: 1890,
    duration: 360,
    level: "advanced",
    category: "DeFi",
    tags: ["DeFi", "Yield Farming", "Staking", "Solana"],
    whatYouWillLearn: [
      "Design yield farming mechanisms",
      "Implement staking protocols",
      "Handle reward distribution",
      "Manage impermanent loss",
      "Create liquidity mining programs",
    ],
    requirements: [
      "Advanced Solana development",
      "Understanding of DeFi concepts",
      "Strong Rust programming skills",
    ],
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-07-20T00:00:00Z",
    sections: [
      {
        id: "8",
        title: "Yield Farming Basics",
        order: 1,
        lessons: [
          {
            id: "10",
            title: "Understanding Yield Farming",
            description: "Core concepts of DeFi yield farming",
            duration: 30,
            videoUrl: "https://example.com/lesson10.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "8",
    title: "Web3 Frontend with Solana",
    subtitle: "Build dApps with React and Solana",
    description:
      "Create modern web3 frontends that interact with Solana programs. Learn wallet connections, transaction handling, and real-time data updates using React and web3 libraries.",
    thumbnail:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[2],
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 892,
    students: 4120,
    duration: 300,
    level: "intermediate",
    category: "Frontend",
    tags: ["React", "Web3", "Solana", "Frontend"],
    whatYouWillLearn: [
      "Connect wallets to dApps",
      "Handle Solana transactions",
      "Display real-time blockchain data",
      "Implement user authentication",
      "Create responsive web3 interfaces",
    ],
    requirements: [
      "React/Next.js knowledge",
      "Basic understanding of Solana",
      "JavaScript/TypeScript proficiency",
    ],
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-09-25T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "9",
        title: "Web3 Frontend Basics",
        order: 1,
        lessons: [
          {
            id: "11",
            title: "Wallet Integration",
            description: "Connecting wallets to your dApp",
            duration: 22,
            videoUrl: "https://example.com/lesson11.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "9",
    title: "Solana Security Best Practices",
    subtitle: "Write secure and audit-ready smart contracts",
    description:
      "Learn security patterns, common vulnerabilities, and audit techniques for Solana programs. Master formal verification, fuzzing, and secure coding practices.",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[0],
    price: 109.99,
    originalPrice: 189.99,
    rating: 4.9,
    reviews: 345,
    students: 1230,
    duration: 400,
    level: "advanced",
    category: "Security",
    tags: ["Security", "Audit", "Rust", "Solana"],
    whatYouWillLearn: [
      "Identify common vulnerabilities",
      "Implement security patterns",
      "Conduct security audits",
      "Use formal verification",
      "Write secure smart contracts",
    ],
    requirements: [
      "Advanced Solana development",
      "Strong Rust programming skills",
      "Understanding of cryptography",
    ],
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-06-10T00:00:00Z",
    sections: [
      {
        id: "10",
        title: "Security Fundamentals",
        order: 1,
        lessons: [
          {
            id: "12",
            title: "Common Vulnerabilities",
            description: "Understanding security risks in Solana",
            duration: 35,
            videoUrl: "https://example.com/lesson12.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "10",
    title: "AWS Cloud Architecture Masterclass",
    subtitle: "Design and deploy scalable cloud solutions on Amazon Web Services",
    description:
      "Master AWS cloud architecture from fundamentals to advanced patterns. Learn to design, deploy, and manage enterprise-grade cloud solutions using AWS services including EC2, S3, Lambda, RDS, and more.",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[3],
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 2156,
    students: 12890,
    duration: 540,
    level: "intermediate",
    category: "Cloud Computing",
    tags: ["AWS", "Cloud", "DevOps", "Infrastructure", "Scalability"],
    whatYouWillLearn: [
      "Design scalable cloud architectures using AWS services",
      "Implement Infrastructure as Code with CloudFormation and Terraform",
      "Master serverless computing with Lambda and API Gateway",
      "Configure high-availability and disaster recovery solutions",
      "Optimize costs and performance in AWS environments",
      "Implement security best practices for cloud deployments"
    ],
    requirements: [
      "Basic understanding of cloud computing concepts",
      "Some programming experience recommended",
      "No prior AWS experience required"
    ],
    createdAt: "2024-07-15T00:00:00Z",
    updatedAt: "2024-10-20T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "11",
        title: "AWS Fundamentals",
        order: 1,
        lessons: [
          {
            id: "13",
            title: "Introduction to AWS Cloud Computing",
            description: "Understanding cloud computing models and AWS global infrastructure",
            duration: 30,
            videoUrl: "https://example.com/lesson13.mp4",
            order: 1,
            type: "video",
          },
          {
            id: "14",
            title: "AWS Identity and Access Management (IAM)",
            description: "Managing users, groups, roles, and permissions",
            duration: 35,
            videoUrl: "https://example.com/lesson14.mp4",
            order: 2,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "11",
    title: "Machine Learning with Python: From Zero to Hero",
    subtitle: "Complete guide to machine learning algorithms and practical applications",
    description:
      "Learn machine learning from the ground up using Python and popular libraries like scikit-learn, TensorFlow, and PyTorch. Build real-world ML models for classification, regression, clustering, and deep learning.",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[4],
    price: 99.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviews: 3421,
    students: 18750,
    duration: 600,
    level: "intermediate",
    category: "AI & Machine Learning",
    tags: ["Machine Learning", "Python", "TensorFlow", "Data Science", "AI"],
    whatYouWillLearn: [
      "Master Python programming for data science",
      "Implement supervised and unsupervised learning algorithms",
      "Build neural networks with TensorFlow and PyTorch",
      "Process and analyze large datasets",
      "Deploy ML models to production",
      "Understand model evaluation and optimization techniques"
    ],
    requirements: [
      "Basic Python programming knowledge",
      "Understanding of mathematics (algebra, calculus)",
      "No prior ML experience required"
    ],
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-09-15T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "12",
        title: "Python for Data Science",
        order: 1,
        lessons: [
          {
            id: "15",
            title: "Python Fundamentals for ML",
            description: "Essential Python concepts for machine learning",
            duration: 40,
            videoUrl: "https://example.com/lesson15.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "12",
    title: "Ethical Hacking and Penetration Testing",
    subtitle: "Learn cybersecurity through hands-on hacking techniques",
    description:
      "Become a certified ethical hacker by learning penetration testing methodologies, vulnerability assessment, and security tools. Master the skills needed to identify and fix security vulnerabilities in systems and networks.",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[5],
    price: 109.99,
    originalPrice: 189.99,
    rating: 4.8,
    reviews: 1890,
    students: 9870,
    duration: 480,
    level: "advanced",
    category: "Cybersecurity",
    tags: ["Cybersecurity", "Ethical Hacking", "Penetration Testing", "Security"],
    whatYouWillLearn: [
      "Master penetration testing methodologies",
      "Use industry-standard security tools (Metasploit, Nmap, Burp Suite)",
      "Identify and exploit common vulnerabilities",
      "Perform web application security testing",
      "Conduct network security assessments",
      "Write comprehensive security reports"
    ],
    requirements: [
      "Basic networking knowledge",
      "Linux command line familiarity",
      "Understanding of computer systems"
    ],
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-10-10T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "13",
        title: "Introduction to Ethical Hacking",
        order: 1,
        lessons: [
          {
            id: "16",
            title: "Cybersecurity Fundamentals",
            description: "Understanding security concepts and ethical hacking principles",
            duration: 35,
            videoUrl: "https://example.com/lesson16.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "13",
    title: "iOS App Development with SwiftUI",
    subtitle: "Build beautiful and functional iOS apps using Swift and SwiftUI",
    description:
      "Create stunning iOS applications using Apple's latest SwiftUI framework. Learn modern iOS development patterns, UI design principles, and app store deployment from scratch to production.",
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[7],
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 1654,
    students: 11200,
    duration: 420,
    level: "intermediate",
    category: "Mobile Development",
    tags: ["iOS", "Swift", "SwiftUI", "Mobile Apps", "Apple"],
    whatYouWillLearn: [
      "Master Swift programming language",
      "Build user interfaces with SwiftUI",
      "Implement data persistence and networking",
      "Work with device features (camera, GPS, notifications)",
      "Deploy apps to the App Store",
      "Follow iOS design guidelines and best practices"
    ],
    requirements: [
      "Basic programming knowledge",
      "Mac computer for development",
      "No prior iOS experience required"
    ],
    createdAt: "2024-05-15T00:00:00Z",
    updatedAt: "2024-08-25T00:00:00Z",
    featured: false,
    sections: [
      {
        id: "14",
        title: "Swift Fundamentals",
        order: 1,
        lessons: [
          {
            id: "17",
            title: "Introduction to Swift Programming",
            description: "Learn Swift syntax and basic programming concepts",
            duration: 45,
            videoUrl: "https://example.com/lesson17.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "14",
    title: "Advanced React Patterns and Performance",
    subtitle: "Master advanced React concepts for scalable applications",
    description:
      "Take your React skills to the next level with advanced patterns, performance optimization techniques, and modern development practices. Learn hooks, context, render props, and more.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[2],
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 2234,
    students: 14560,
    duration: 360,
    level: "advanced",
    category: "Web Development",
    tags: ["React", "JavaScript", "Performance", "Hooks", "Advanced Patterns"],
    whatYouWillLearn: [
      "Master advanced React hooks and custom hooks",
      "Implement complex state management patterns",
      "Optimize React application performance",
      "Build reusable component libraries",
      "Implement proper error boundaries and testing",
      "Use advanced patterns like render props and HOCs"
    ],
    requirements: [
      "Strong React fundamentals knowledge",
      "JavaScript ES6+ proficiency",
      "Experience with modern web development"
    ],
    createdAt: "2024-04-20T00:00:00Z",
    updatedAt: "2024-09-30T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "15",
        title: "Advanced React Concepts",
        order: 1,
        lessons: [
          {
            id: "18",
            title: "Deep Dive into React Hooks",
            description: "Understanding useEffect, useMemo, useCallback, and custom hooks",
            duration: 50,
            videoUrl: "https://example.com/lesson18.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "15",
    title: "Unity Game Development Fundamentals",
    subtitle: "Create your first video games with Unity and C#",
    description:
      "Learn game development from the ground up using Unity game engine and C#. Build 2D and 3D games, implement physics, create UI systems, and publish your games to multiple platforms.",
    thumbnail:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[9],
    price: 69.99,
    originalPrice: 109.99,
    rating: 4.6,
    reviews: 1789,
    students: 9870,
    duration: 480,
    level: "beginner",
    category: "Game Development",
    tags: ["Unity", "C#", "Game Development", "2D", "3D"],
    whatYouWillLearn: [
      "Navigate the Unity interface and workflow",
      "Write C# scripts for game logic",
      "Create 2D and 3D game environments",
      "Implement physics and collision detection",
      "Design user interfaces for games",
      "Build and deploy games to multiple platforms"
    ],
    requirements: [
      "Basic programming knowledge",
      "Windows or Mac computer",
      "No prior game development experience required"
    ],
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-08-15T00:00:00Z",
    featured: false,
    sections: [
      {
        id: "16",
        title: "Unity Basics",
        order: 1,
        lessons: [
          {
            id: "19",
            title: "Getting Started with Unity",
            description: "Installing Unity and creating your first project",
            duration: 25,
            videoUrl: "https://example.com/lesson19.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "16",
    title: "Product Management for Tech Startups",
    subtitle: "Master product strategy, roadmapping, and user-centered design",
    description:
      "Learn the complete product management lifecycle from idea validation to launch and growth. Master user research, prioritization frameworks, data-driven decision making, and stakeholder management.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[8],
    price: 94.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 1456,
    students: 8760,
    duration: 300,
    level: "intermediate",
    category: "Business",
    tags: ["Product Management", "Strategy", "Startups", "UX", "Agile"],
    whatYouWillLearn: [
      "Conduct user research and validate product ideas",
      "Create product roadmaps and prioritize features",
      "Use data analytics for product decisions",
      "Manage cross-functional teams and stakeholders",
      "Implement agile development methodologies",
      "Measure product success and iterate based on feedback"
    ],
    requirements: [
      "Basic understanding of business concepts",
      "Interest in technology and product development",
      "No prior PM experience required"
    ],
    createdAt: "2024-09-01T00:00:00Z",
    updatedAt: "2024-10-25T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "17",
        title: "Product Strategy Fundamentals",
        order: 1,
        lessons: [
          {
            id: "20",
            title: "Introduction to Product Management",
            description: "Understanding the role and responsibilities of a product manager",
            duration: 30,
            videoUrl: "https://example.com/lesson20.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "17",
    title: "Kubernetes and Container Orchestration",
    subtitle: "Master container orchestration with Kubernetes",
    description:
      "Learn to deploy, manage, and scale containerized applications using Kubernetes. Master pod management, services, deployments, and advanced orchestration patterns for production environments.",
    thumbnail:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[3],
    price: 99.99,
    originalPrice: 169.99,
    rating: 4.8,
    reviews: 1234,
    students: 7230,
    duration: 420,
    level: "advanced",
    category: "DevOps",
    tags: ["Kubernetes", "Docker", "Containers", "Orchestration", "DevOps"],
    whatYouWillLearn: [
      "Master Docker container fundamentals",
      "Deploy and manage Kubernetes clusters",
      "Implement pod scheduling and resource management",
      "Configure services, ingress, and load balancing",
      "Implement security and monitoring solutions",
      "Automate deployment pipelines with Kubernetes"
    ],
    requirements: [
      "Linux command line knowledge",
      "Basic understanding of containers",
      "Experience with cloud platforms recommended"
    ],
    createdAt: "2024-08-15T00:00:00Z",
    updatedAt: "2024-10-05T00:00:00Z",
    featured: false,
    sections: [
      {
        id: "18",
        title: "Container Fundamentals",
        order: 1,
        lessons: [
          {
            id: "21",
            title: "Introduction to Containers and Docker",
            description: "Understanding containerization and Docker basics",
            duration: 35,
            videoUrl: "https://example.com/lesson21.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "18",
    title: "Advanced Data Structures and Algorithms",
    subtitle: "Master complex algorithms and data structures for coding interviews",
    description:
      "Prepare for technical interviews with comprehensive coverage of advanced data structures and algorithms. Learn graph algorithms, dynamic programming, advanced trees, and optimization techniques.",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[0],
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviews: 2876,
    students: 15670,
    duration: 480,
    level: "advanced",
    category: "Programming",
    tags: ["Algorithms", "Data Structures", "Interview Prep", "Problem Solving"],
    whatYouWillLearn: [
      "Master advanced data structures (graphs, trees, heaps)",
      "Implement complex algorithms efficiently",
      "Solve dynamic programming problems",
      "Analyze algorithm time and space complexity",
      "Prepare for technical coding interviews",
      "Optimize code for performance and scalability"
    ],
    requirements: [
      "Strong programming fundamentals",
      "Understanding of basic data structures",
      "Experience with at least one programming language"
    ],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-09-10T00:00:00Z",
    featured: true,
    sections: [
      {
        id: "19",
        title: "Advanced Data Structures",
        order: 1,
        lessons: [
          {
            id: "22",
            title: "Graph Theory and Algorithms",
            description: "Understanding graphs and implementing graph algorithms",
            duration: 45,
            videoUrl: "https://example.com/lesson22.mp4",
            order: 1,
            type: "video",
          },
        ],
      },
    ],
  },
  {
    id: "19",
    title: "Computer Vision with OpenCV and Python",
    subtitle: "Build image processing and computer vision applications",
    description:
      "Learn computer vision fundamentals using OpenCV and Python. Build applications for image processing, object detection, facial recognition, and real-time video analysis.",
    thumbnail:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=225&fit=crop&crop=center",
    instructor: mockInstructors[6],
    price: 84.99,
    originalPrice: 139.99,
    rating: 4.7,
    reviews: 1654,
    students: 9230,
    duration: 360,
    level: "intermediate",
    category: "AI & Machine Learning",
    tags: ["Computer Vision", "OpenCV", "Python", "Image Processing", "AI"],
    whatYouWillLearn: [
      "Process and manipulate digital images",
      "Implement object detection and tracking",
      "Build facial recognition systems",
      "Work with video streams and real-time processing",
      "Apply machine learning to computer vision",
      "Deploy CV models to production applications"
    ],
    requirements: [
      "Python programming knowledge",
      "Basic understanding of image processing",
      "Familiarity with NumPy and matplotlib"
    ],
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2024-09-20T00:00:00Z",
    featured: false,
    sections: [
      {
        id: "20",
        title: "Image Processing Fundamentals",
        order: 1,
        lessons: [
          {
            id: "23",
            title: "Introduction to Computer Vision",
            description: "Understanding digital images and basic operations",
            duration: 40,
            videoUrl: "https://example.com/lesson23.mp4",
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
  "Blockchain",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "AI & Machine Learning",
  "DevOps",
  "Cybersecurity",
  "Cloud Computing",
  "NFT",
  "Programming",
  "DeFi",
  "Frontend",
  "Game Development",
  "Business",
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
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop&crop=center",
    tags: ["Smart Contracts", "Security", "DeFi", "Rust"],
    learningObjectives: [
      "Implement proper access control patterns",
      "Protect against common Solana vulnerabilities",
      "Use Anchor framework effectively",
      "Handle token transfers securely",
    ],
    prerequisites: [
      "Basic Rust knowledge",
      "Understanding of SPL tokens",
      "Familiarity with Anchor or native Solana development",
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
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center",
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
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center",
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
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center",
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
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center",
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
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center",
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
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&crop=center",
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
