export interface LeaderboardUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  reputation: number;
  level: number;
  rank: number;
  badges: Badge[];
  stats: UserStats;
  achievements: Achievement[];
  joinedAt: string;
  lastActive: string;
  isOnline: boolean;
  country?: string;
  bio?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earnedAt: string;
}

export interface UserStats {
  questionsAsked: number;
  answersGiven: number;
  questionsSolved: number;
  upvotesReceived: number;
  downvotesReceived: number;
  coursesCompleted: number;
  challengesCompleted: number;
  certificatesEarned: number;
  streakDays: number;
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  contributions: number;
  followers: number;
  following: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  progress?: number;
  maxProgress?: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface LeaderboardEntry {
  user: LeaderboardUser;
  rank: number;
  change: number; // Change from last week (+/-)
  score: number;
}

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: "first-answer",
    name: "First Answer",
    description: "Answered your first question",
    icon: "🎯",
    rarity: "common",
    earnedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "helpful-answer",
    name: "Helpful Answer",
    description: "Received 10 upvotes on an answer",
    icon: "👍",
    rarity: "common",
    earnedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "expert-solver",
    name: "Expert Solver",
    description: "Solved 50 questions",
    icon: "🧠",
    rarity: "rare",
    earnedAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "course-completer",
    name: "Course Master",
    description: "Completed 5 courses",
    icon: "🎓",
    rarity: "rare",
    earnedAt: "2024-04-05T00:00:00Z",
  },
  {
    id: "challenge-winner",
    name: "Challenge Champion",
    description: "Won 10 coding challenges",
    icon: "🏆",
    rarity: "epic",
    earnedAt: "2024-05-15T00:00:00Z",
  },
  {
    id: "community-leader",
    name: "Community Leader",
    description: "Helped 1000+ learners",
    icon: "👑",
    rarity: "legendary",
    earnedAt: "2024-06-01T00:00:00Z",
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "30-day learning streak",
    icon: "🔥",
    rarity: "epic",
    earnedAt: "2024-07-20T00:00:00Z",
  },
  {
    id: "mentor",
    name: "Mentor",
    description: "Mentored 10 new learners",
    icon: "👨‍🏫",
    rarity: "rare",
    earnedAt: "2024-08-10T00:00:00Z",
  },
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: "first-contribution",
    title: "First Contribution",
    description: "Made your first contribution to the community",
    icon: "🌟",
    unlockedAt: "2024-01-10T00:00:00Z",
    rarity: "common",
  },
  {
    id: "question-master",
    title: "Question Master",
    description: "Asked 100 high-quality questions",
    icon: "❓",
    unlockedAt: "2024-03-15T00:00:00Z",
    progress: 87,
    maxProgress: 100,
    rarity: "rare",
  },
  {
    id: "knowledge-sharer",
    title: "Knowledge Sharer",
    description: "Provided 500 helpful answers",
    icon: "📚",
    unlockedAt: "2024-05-20T00:00:00Z",
    rarity: "epic",
  },
  {
    id: "blockchain-expert",
    title: "Blockchain Expert",
    description: "Mastered all blockchain courses",
    icon: "⛓️",
    unlockedAt: "2024-07-01T00:00:00Z",
    rarity: "legendary",
  },
  {
    id: "coding-champion",
    title: "Coding Champion",
    description: "Won 50 coding challenges",
    icon: "💻",
    unlockedAt: "2024-08-15T00:00:00Z",
    progress: 32,
    maxProgress: 50,
    rarity: "epic",
  },
];

// Mock Leaderboard Users
export const mockLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "1",
    username: "cryptomaster",
    displayName: "Crypto Master",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    reputation: 580,
    level: 25,
    rank: 1,
    country: "United States",
    bio: "Blockchain developer and DeFi enthusiast. Love building decentralized applications and teaching others about Web3.",
    badges: [
      mockBadges[0],
      mockBadges[1],
      mockBadges[2],
      mockBadges[3],
      mockBadges[4],
      mockBadges[5],
    ],
    stats: {
      questionsAsked: 45,
      answersGiven: 234,
      questionsSolved: 156,
      upvotesReceived: 580,
      downvotesReceived: 8,
      coursesCompleted: 12,
      challengesCompleted: 45,
      certificatesEarned: 8,
      streakDays: 67,
      totalPoints: 580,
      weeklyPoints: 45,
      monthlyPoints: 180,
      contributions: 280,
      followers: 125,
      following: 89,
    },
    achievements: [
      mockAchievements[0],
      mockAchievements[1],
      mockAchievements[2],
      mockAchievements[3],
    ],
    joinedAt: "2023-01-15T00:00:00Z",
    lastActive: "2024-10-30T10:30:00Z",
    isOnline: true,
  },
  {
    id: "2",
    username: "reactqueen",
    displayName: "React Queen",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    reputation: 520,
    level: 22,
    rank: 2,
    country: "Canada",
    bio: "Frontend developer specializing in React, Next.js, and modern web technologies. Passionate about creating amazing user experiences.",
    badges: [
      mockBadges[0],
      mockBadges[1],
      mockBadges[2],
      mockBadges[3],
      mockBadges[6],
    ],
    stats: {
      questionsAsked: 38,
      answersGiven: 198,
      questionsSolved: 134,
      upvotesReceived: 520,
      downvotesReceived: 6,
      coursesCompleted: 15,
      challengesCompleted: 32,
      certificatesEarned: 10,
      streakDays: 45,
      totalPoints: 520,
      weeklyPoints: 38,
      monthlyPoints: 145,
      contributions: 236,
      followers: 89,
      following: 67,
    },
    achievements: [
      mockAchievements[0],
      mockAchievements[1],
      mockAchievements[4],
    ],
    joinedAt: "2023-03-20T00:00:00Z",
    lastActive: "2024-10-30T09:15:00Z",
    isOnline: true,
  },
  {
    id: "3",
    username: "datasage",
    displayName: "Data Sage",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    reputation: 480,
    level: 20,
    rank: 3,
    country: "United Kingdom",
    bio: "Data scientist and machine learning engineer. Love turning data into insights and building AI-powered solutions.",
    badges: [
      mockBadges[0],
      mockBadges[1],
      mockBadges[2],
      mockBadges[6],
      mockBadges[7],
    ],
    stats: {
      questionsAsked: 31,
      answersGiven: 171,
      questionsSolved: 127,
      upvotesReceived: 480,
      downvotesReceived: 4,
      coursesCompleted: 9,
      challengesCompleted: 28,
      certificatesEarned: 6,
      streakDays: 38,
      totalPoints: 480,
      weeklyPoints: 32,
      monthlyPoints: 120,
      contributions: 202,
      followers: 76,
      following: 45,
    },
    achievements: [mockAchievements[0], mockAchievements[1]],
    joinedAt: "2023-02-10T00:00:00Z",
    lastActive: "2024-10-29T16:45:00Z",
    isOnline: false,
  },
  {
    id: "4",
    username: "cyberninja",
    displayName: "Cyber Ninja",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    reputation: 420,
    level: 18,
    rank: 4,
    country: "Germany",
    bio: "Cybersecurity expert and ethical hacker. Helping organizations stay secure in an increasingly digital world.",
    badges: [mockBadges[0], mockBadges[1], mockBadges[2], mockBadges[3]],
    stats: {
      questionsAsked: 134,
      answersGiven: 723,
      questionsSolved: 567,
      upvotesReceived: 1980,
      downvotesReceived: 15,
      coursesCompleted: 8,
      challengesCompleted: 22,
      certificatesEarned: 5,
      streakDays: 29,
      totalPoints: 9870,
      weeklyPoints: 280,
      monthlyPoints: 1050,
      contributions: 857,
      followers: 634,
      following: 38,
    },
    achievements: [mockAchievements[0], mockAchievements[1]],
    joinedAt: "2023-04-05T00:00:00Z",
    lastActive: "2024-10-30T08:20:00Z",
    isOnline: true,
  },
  {
    id: "5",
    username: "devops_wizard",
    displayName: "DevOps Wizard",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    reputation: 380,
    level: 16,
    rank: 5,
    country: "Australia",
    bio: "DevOps engineer and cloud architect. Automating deployments and scaling applications since 2018.",
    badges: [mockBadges[0], mockBadges[1], mockBadges[2], mockBadges[7]],
    stats: {
      questionsAsked: 98,
      answersGiven: 645,
      questionsSolved: 489,
      upvotesReceived: 1650,
      downvotesReceived: 11,
      coursesCompleted: 7,
      challengesCompleted: 18,
      certificatesEarned: 4,
      streakDays: 22,
      totalPoints: 8760,
      weeklyPoints: 240,
      monthlyPoints: 890,
      contributions: 743,
      followers: 523,
      following: 31,
    },
    achievements: [mockAchievements[0]],
    joinedAt: "2023-05-12T00:00:00Z",
    lastActive: "2024-10-29T14:30:00Z",
    isOnline: false,
  },
  {
    id: "6",
    username: "mobilemaster",
    displayName: "Mobile Master",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    reputation: 340,
    level: 15,
    rank: 6,
    country: "France",
    bio: "Mobile app developer creating amazing experiences for iOS and Android. Swift, Kotlin, and Flutter enthusiast.",
    badges: [mockBadges[0], mockBadges[1], mockBadges[2]],
    stats: {
      questionsAsked: 87,
      answersGiven: 534,
      questionsSolved: 412,
      upvotesReceived: 1420,
      downvotesReceived: 9,
      coursesCompleted: 6,
      challengesCompleted: 15,
      certificatesEarned: 3,
      streakDays: 19,
      totalPoints: 7650,
      weeklyPoints: 210,
      monthlyPoints: 780,
      contributions: 621,
      followers: 456,
      following: 28,
    },
    achievements: [mockAchievements[0]],
    joinedAt: "2023-06-18T00:00:00Z",
    lastActive: "2024-10-30T07:45:00Z",
    isOnline: true,
  },
  {
    id: "7",
    username: "gamedev_pro",
    displayName: "GameDev Pro",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    reputation: 310,
    level: 14,
    rank: 7,
    country: "Japan",
    bio: "Game developer and Unity expert. Creating immersive gaming experiences since 2015.",
    badges: [mockBadges[0], mockBadges[1], mockBadges[2]],
    stats: {
      questionsAsked: 76,
      answersGiven: 456,
      questionsSolved: 345,
      upvotesReceived: 1230,
      downvotesReceived: 8,
      coursesCompleted: 5,
      challengesCompleted: 12,
      certificatesEarned: 3,
      streakDays: 16,
      totalPoints: 6780,
      weeklyPoints: 190,
      monthlyPoints: 720,
      contributions: 532,
      followers: 389,
      following: 25,
    },
    achievements: [mockAchievements[0]],
    joinedAt: "2023-07-22T00:00:00Z",
    lastActive: "2024-10-29T12:15:00Z",
    isOnline: false,
  },
  {
    id: "8",
    username: "productguru",
    displayName: "Product Guru",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    reputation: 280,
    level: 13,
    rank: 8,
    country: "Singapore",
    bio: "Product manager bridging the gap between business and technology. Building products that users love.",
    badges: [mockBadges[0], mockBadges[1]],
    stats: {
      questionsAsked: 65,
      answersGiven: 389,
      questionsSolved: 298,
      upvotesReceived: 1050,
      downvotesReceived: 7,
      coursesCompleted: 4,
      challengesCompleted: 9,
      certificatesEarned: 2,
      streakDays: 13,
      totalPoints: 5980,
      weeklyPoints: 160,
      monthlyPoints: 650,
      contributions: 454,
      followers: 312,
      following: 22,
    },
    achievements: [mockAchievements[0]],
    joinedAt: "2023-08-14T00:00:00Z",
    lastActive: "2024-10-30T06:30:00Z",
    isOnline: true,
  },
  {
    id: "9",
    username: "algorithm_ace",
    displayName: "Algorithm Ace",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    reputation: 240,
    level: 12,
    rank: 9,
    country: "India",
    bio: "Algorithm specialist and competitive programmer. Love solving complex problems and teaching data structures.",
    badges: [mockBadges[0], mockBadges[1]],
    stats: {
      questionsAsked: 54,
      answersGiven: 312,
      questionsSolved: 245,
      upvotesReceived: 890,
      downvotesReceived: 6,
      coursesCompleted: 4,
      challengesCompleted: 8,
      certificatesEarned: 2,
      streakDays: 11,
      totalPoints: 5340,
      weeklyPoints: 140,
      monthlyPoints: 580,
      contributions: 366,
      followers: 267,
      following: 19,
    },
    achievements: [mockAchievements[0]],
    joinedAt: "2023-09-08T00:00:00Z",
    lastActive: "2024-10-29T10:45:00Z",
    isOnline: false,
  },
  {
    id: "10",
    username: "visionary_ai",
    displayName: "Visionary AI",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    reputation: 200,
    level: 11,
    rank: 10,
    country: "South Korea",
    bio: "AI researcher focusing on computer vision and deep learning. Building the future of artificial intelligence.",
    badges: [mockBadges[0], mockBadges[1]],
    stats: {
      questionsAsked: 43,
      answersGiven: 267,
      questionsSolved: 198,
      upvotesReceived: 750,
      downvotesReceived: 5,
      coursesCompleted: 3,
      challengesCompleted: 7,
      certificatesEarned: 2,
      streakDays: 9,
      totalPoints: 4780,
      weeklyPoints: 120,
      monthlyPoints: 510,
      contributions: 310,
      followers: 223,
      following: 16,
    },
    achievements: [mockAchievements[0]],
    joinedAt: "2023-10-03T00:00:00Z",
    lastActive: "2024-10-30T05:20:00Z",
    isOnline: true,
  },
];

// Generate leaderboard entries with ranking changes
export const mockLeaderboard: LeaderboardEntry[] = mockLeaderboardUsers.map(
  (user, index) => ({
    user,
    rank: index + 1,
    change: Math.floor(Math.random() * 6) - 2, // Random change between -2 and +3
    score: user.reputation,
  })
);

// Leaderboard Statistics
export const leaderboardStats = {
  totalUsers: 250,
  activeUsers: 89,
  totalReputation: 15600,
  totalQuestions: 2340,
  totalAnswers: 3450,
  totalCourses: 19,
  totalChallenges: 87,
  averageReputation: 245,
  topContributor: mockLeaderboardUsers[0],
};

// Time-based filters
export const leaderboardTimeFilters = [
  { value: "all-time", label: "All Time" },
  { value: "monthly", label: "This Month" },
  { value: "weekly", label: "This Week" },
  { value: "daily", label: "Today" },
];

// Category filters
export const leaderboardCategoryFilters = [
  { value: "overall", label: "Overall" },
  { value: "questions", label: "Questions" },
  { value: "answers", label: "Answers" },
  { value: "courses", label: "Courses Completed" },
  { value: "challenges", label: "Challenges Won" },
  { value: "reputation", label: "Reputation" },
];
