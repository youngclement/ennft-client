"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoPlayer } from "@/components/elearning/VideoPlayer";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Play,
  FileText,
  BookOpen,
  Download,
  Share2,
  Target,
  Upload,
  Clock,
  Cpu,
  AlertCircle,
  CheckCircle2,
  X,
  TargetIcon,
} from "lucide-react";
import Link from "next/link";
import { mockCourses, Course, Lesson } from "@/lib/data/mock-courses";
import { useMintCertificate } from "@/lib/hooks/useMintCertificate";
import { MintCertificateData } from "@/service/dto/certificate/certificate.mint";
import { useWallet } from "@solana/wallet-adapter-react";

export default function LessonPlayerPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  // Challenge modal state
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [testMode, setTestMode] = useState<"error" | "success">("success");
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const [certificateMinted, setCertificateMinted] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [showMintSuccess, setShowMintSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use the existing mint certificate hook
  const mintCertificateMutation = useMintCertificate();
  const { publicKey } = useWallet();

  // Load challenge completion status from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageKey = `challenge_completed_${courseId}_${lessonId}`;
      const completed = localStorage.getItem(storageKey) === "true";
      setIsChallengeCompleted(completed);
      if (completed) {
        setChallengeProgress(100);
      }

      // Check if certificate was already minted
      const certificateKey = `certificate_${courseId}_${lessonId}`;
      const savedCertificate = localStorage.getItem(certificateKey);
      if (savedCertificate) {
        try {
          const certData = JSON.parse(savedCertificate);
          setCertificateMinted(true);
          setCertificateData(certData);
        } catch (error) {
          console.error("Error parsing saved certificate data:", error);
        }
      }
    }
  }, [courseId, lessonId]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".so")) {
      setUploadedFile(file);
      setTestResults(null);
    }
  };

  // API call for testing program
  const handleUploadProgram = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);

    try {
      // Determine which API endpoint to use based on test mode
      const endpoint =
        testMode === "success"
          ? "/api/challenges/test-success"
          : "/api/challenges/test-error";

      // Create FormData to send the file
      const formData = new FormData();
      formData.append("program", uploadedFile);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to test program");
      }

      const result = await response.json();
      setTestResults(result);

      // Handle successful challenge completion
      if (result.success) {
        setChallengeProgress(100);
        setIsChallengeCompleted(true);

        // Save completion status to localStorage
        const storageKey = `challenge_completed_${courseId}_${lessonId}`;
        localStorage.setItem(storageKey, "true");

        // Also save completion timestamp
        const timestampKey = `challenge_completed_timestamp_${courseId}_${lessonId}`;
        localStorage.setItem(timestampKey, new Date().toISOString());
      }
    } catch (error) {
      console.error("Error testing program:", error);
      // Fallback to error response if API fails
      setTestResults({
        success: false,
        results: [
          {
            success: false,
            instruction: "API Error",
            compute_units_consumed: 0,
            execution_time: 0,
            program_logs: ["Failed to connect to testing service"],
            message: "Unable to test program. Please try again.",
          },
        ],
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle NFT Certificate Minting
  const handleMintCertificate = async () => {
    if (!isChallengeCompleted) return;

    // Check if wallet is connected
    if (!publicKey) {
      console.error("Wallet not connected");
      alert("Please connect your Solana wallet before minting the certificate");
      return;
    }

    try {
      const result = await mintCertificateMutation.mutateAsync({
        name: "Kien",
        email: "kien@example.com",
        courseName: course?.title || "Unknown Course",
        completionDate: new Date().toISOString(),
        recipientWallet: publicKey?.toBase58() || "",
        certificateType: "blockchain",
      });

      // Save certificate info to localStorage
      const certificateKey = `certificate_${courseId}_${lessonId}`;
      const certData = {
        ...result,
        mintedAt: new Date().toISOString(),
        courseId,
        lessonId,
        courseName: course?.title || "Unknown Course",
      };
      localStorage.setItem(certificateKey, JSON.stringify(certData));

      // Set certificate states
      setCertificateMinted(true);
      setCertificateData(certData);

      // Trigger confetti animation
      setIsVisible(true);

      // Show success message
      setShowMintSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowMintSuccess(false);
      }, 5000);

      console.log("Certificate minted successfully:", result);
    } catch (error) {
      console.error("Error minting certificate:", error);

      // Show user-friendly error message
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to mint certificate. Please try again.";

      alert(`Minting failed: ${errorMessage}`);
    }
  };

  // Get dynamic challenge content based on course
  const getChallengeData = (course: Course | null) => {
    if (!course) return null;

    // Map course IDs to specific challenge configurations
    const challengeConfigs = {
      "1": { // Complete Blockchain Development Bootcamp
        title: "Anchor Vault Challenge",
        subtitle: "Build a secure vault smart contract",
        objective: "Implement a Solana vault program using Anchor framework that allows users to securely deposit and withdraw SOL tokens.",
        tasks: [
          "Create an Anchor program with proper account structures",
          "Implement deposit instruction to transfer SOL to vault PDA",
          "Implement withdrawal instruction with proper authorization",
          "Add comprehensive error handling and validation"
        ],
        acceptanceCriteria: [
          "Program compiles without errors",
          "Deposit instruction successfully transfers SOL to vault",
          "Withdrawal only works for vault owner",
          "Proper error messages for invalid operations"
        ],
        example: `Input: Deposit 1 SOL
Expected output: Transaction successful, vault balance = 1 SOL

Input: Withdraw 0.5 SOL (by owner)
Expected output: Transaction successful, vault balance = 0.5 SOL

Input: Withdraw 1 SOL (by non-owner)
Expected output: Error - Unauthorized withdrawal attempt`,
        tips: [
          "Use Program Derived Addresses (PDAs) for vault accounts",
          "Implement proper account validation in instruction handlers",
          "Test with both success and failure scenarios",
          "Follow Anchor's best practices for account management"
        ],
        challenges: [
          {
            title: "Challenge 1: Deposit Functionality",
            description: "Implement deposit functionality allowing users to securely store SOL in their personal vault."
          },
          {
            title: "Challenge 2: Withdrawal System",
            description: "Create a withdrawal mechanism that allows vault owners to retrieve their deposited SOL."
          }
        ]
      },
      "2": { // React & Next.js Masterclass
        title: "React dApp Challenge",
        subtitle: "Build a React frontend for Solana interaction",
        objective: "Create a modern React application that connects to Solana wallets and displays blockchain data using Next.js and wallet adapters.",
        tasks: [
          "Set up Next.js project with TypeScript and Tailwind CSS",
          "Integrate @solana/wallet-adapter-react for wallet connections",
          "Create wallet connection UI components",
          "Implement transaction history display with real-time updates"
        ],
        acceptanceCriteria: [
          "Application successfully connects to Phantom wallet",
          "Wallet address and balance display correctly",
          "Transaction history updates in real-time",
          "Responsive design works on mobile and desktop"
        ],
        example: `Input: Connect Phantom wallet
Expected output: Wallet address displayed, balance shown

Input: Send transaction
Expected output: Transaction appears in history with status updates`,
        tips: [
          "Use the wallet adapter hooks for connection state management",
          "Implement proper error boundaries for wallet operations",
          "Use React Query for caching blockchain data",
          "Test with multiple wallet types (Phantom, Solflare)"
        ],
        challenges: [
          {
            title: "Challenge 1: Wallet Connection",
            description: "Implement wallet connection functionality using @solana/wallet-adapter-react."
          },
          {
            title: "Challenge 2: Transaction Display",
            description: "Create a component to display and track Solana transactions in real-time."
          }
        ]
      },
      "3": { // DeFi Protocol Development
        title: "DeFi Liquidity Pool",
        subtitle: "Create an automated market maker pool",
        objective: "Build an Automated Market Maker (AMM) liquidity pool smart contract that implements the constant product formula for token swaps.",
        tasks: [
          "Implement constant product formula (x * y = k)",
          "Create liquidity provision mechanism",
          "Build swap function with proper fee calculation",
          "Add liquidity removal functionality"
        ],
        acceptanceCriteria: [
          "Constant product invariant maintained after swaps",
          "Liquidity providers receive correct LP tokens",
          "Swap fees distributed to liquidity providers",
          "Slippage protection implemented"
        ],
        example: `Input: Add liquidity (100 TokenA, 100 TokenB)
Expected output: 100 LP tokens minted, pool reserves updated

Input: Swap 10 TokenA for TokenB
Expected output: ~9.09 TokenB received, 0.3% fee collected`,
        tips: [
          "Calculate output amount using constant product formula",
          "Implement minimum output amount for slippage protection",
          "Use fixed-point arithmetic for precision",
          "Test with various input amounts and pool ratios"
        ],
        challenges: [
          {
            title: "Challenge 1: Pool Creation",
            description: "Implement a liquidity pool that accepts two tokens and maintains the constant product formula."
          },
          {
            title: "Challenge 2: Swap Mechanism",
            description: "Build the swap functionality that allows users to exchange tokens through the pool."
          }
        ]
      },
      "4": { // Anchor Framework Deep Dive
        title: "Advanced Anchor Vault",
        subtitle: "Master Anchor with complex PDAs",
        objective: "Create an advanced vault system using multiple Program Derived Addresses and cross-program invocations with SPL tokens.",
        tasks: [
          "Create multiple PDA accounts for different vault purposes",
          "Implement SPL token transfers using cross-program calls",
          "Add access control using PDAs as authorities",
          "Create complex instruction handlers with multiple accounts"
        ],
        acceptanceCriteria: [
          "All PDA derivations work correctly",
          "Cross-program token transfers successful",
          "Proper authority checks implemented",
          "Complex multi-account instructions execute correctly"
        ],
        example: `Input: Create vault with SPL token support
Expected output: Vault PDA created, token account initialized

Input: Deposit SPL tokens to vault
Expected output: Tokens transferred to vault, balance updated`,
        tips: [
          "Use anchor_lang::prelude::* for PDA utilities",
          "Implement proper constraint checks on accounts",
          "Test PDA derivation with different seeds",
          "Handle token program errors appropriately"
        ],
        challenges: [
          {
            title: "Challenge 1: PDA-Based Vault",
            description: "Create a vault system using Program Derived Addresses for secure account management."
          },
          {
            title: "Challenge 2: Cross-Program Calls",
            description: "Implement cross-program invocations to interact with SPL token programs."
          }
        ]
      },
      "5": { // Solana NFT Creation & Marketplace
        title: "NFT Minting Contract",
        subtitle: "Build an NFT creation and trading system",
        objective: "Develop a complete NFT marketplace with minting, listing, and trading functionality using Metaplex standards.",
        tasks: [
          "Implement NFT minting with Metaplex Token Metadata",
          "Create listing mechanism for NFT sales",
          "Build purchase functionality with SOL payments",
          "Add royalty distribution system"
        ],
        acceptanceCriteria: [
          "NFTs mint with correct metadata and images",
          "Marketplace listings display properly",
          "Purchases transfer ownership correctly",
          "Royalties paid to original creators"
        ],
        example: `Input: Mint NFT with metadata
Expected output: NFT created with proper metadata

Input: List NFT for 1 SOL
Expected output: NFT listed on marketplace

Input: Purchase NFT
Expected output: Ownership transferred, payment received`,
        tips: [
          "Use Metaplex JS SDK for metadata handling",
          "Implement proper NFT ownership verification",
          "Add marketplace fees and royalty calculations",
          "Test with different NFT types and prices"
        ],
        challenges: [
          {
            title: "Challenge 1: NFT Creation",
            description: "Implement NFT minting functionality using Metaplex standards."
          },
          {
            title: "Challenge 2: Marketplace Logic",
            description: "Create buying and selling mechanisms for NFT trading."
          }
        ]
      },
      "6": { // Rust Programming for Blockchain
        title: "Rust Smart Contract",
        subtitle: "Write efficient Rust code for Solana",
        objective: "Write optimized Rust code for Solana programs focusing on memory management, error handling, and performance.",
        tasks: [
          "Implement proper ownership and borrowing patterns",
          "Create comprehensive error types and handling",
          "Optimize for minimal compute unit usage",
          "Add input validation and security checks"
        ],
        acceptanceCriteria: [
          "Program compiles without warnings",
          "All ownership rules followed correctly",
          "Error messages are descriptive and helpful",
          "Compute unit usage stays within limits"
        ],
        example: `Input: Process transaction with invalid data
Expected output: Custom error type returned with descriptive message

Input: Memory-intensive operation
Expected output: Efficient memory usage, no leaks`,
        tips: [
          "Use Result<T, E> for all fallible operations",
          "Implement Copy/Clone traits appropriately",
          "Minimize heap allocations in hot paths",
          "Use meaningful variable names and documentation"
        ],
        challenges: [
          {
            title: "Challenge 1: Memory Management",
            description: "Implement proper ownership and borrowing patterns in a Solana program."
          },
          {
            title: "Challenge 2: Error Handling",
            description: "Create robust error handling and custom error types for program validation."
          }
        ]
      },
      "7": { // DeFi Yield Farming on Solana
        title: "Yield Farming Protocol",
        subtitle: "Build automated yield farming",
        objective: "Create a yield farming protocol that distributes rewards to users based on their staking participation and duration.",
        tasks: [
          "Implement staking mechanism with lock periods",
          "Create reward calculation based on staking time",
          "Build automated reward distribution",
          "Add emergency withdrawal functionality"
        ],
        acceptanceCriteria: [
          "Staking deposits work correctly",
          "Rewards calculate accurately over time",
          "Automated distribution functions properly",
          "Emergency withdrawals available when needed"
        ],
        example: `Input: Stake 100 tokens for 30 days
Expected output: Staking position created

Input: Check rewards after 15 days
Expected output: 50 reward tokens earned

Input: Unstake after 30 days
Expected output: Principal + 100 rewards returned`,
        tips: [
          "Use timestamp-based reward calculations",
          "Implement compound interest formulas",
          "Add minimum staking periods",
          "Test with different staking durations"
        ],
        challenges: [
          {
            title: "Challenge 1: Staking Mechanism",
            description: "Implement a staking system that rewards users with yield tokens."
          },
          {
            title: "Challenge 2: Reward Distribution",
            description: "Create an automated reward distribution system based on staking duration."
          }
        ]
      },
      "8": { // Web3 Frontend with Solana
        title: "Web3 Dashboard",
        subtitle: "Create a comprehensive Web3 interface",
        objective: "Build a comprehensive Web3 dashboard that displays real-time blockchain data and enables multi-signature transactions.",
        tasks: [
          "Connect to multiple RPC endpoints for data",
          "Implement real-time data subscriptions",
          "Create multi-signature transaction flow",
          "Build responsive dashboard with multiple views"
        ],
        acceptanceCriteria: [
          "Real-time data updates without manual refresh",
          "Multi-signature transactions work correctly",
          "Dashboard loads quickly and responsively",
          "Error states handled gracefully"
        ],
        example: `Input: Load dashboard
Expected output: Real-time balance and transaction data displayed

Input: Create multi-sig transaction
Expected output: Transaction requires multiple approvals`,
        tips: [
          "Use WebSocket connections for real-time updates",
          "Implement optimistic UI updates",
          "Cache data appropriately to reduce API calls",
          "Test with slow network conditions"
        ],
        challenges: [
          {
            title: "Challenge 1: Real-time Data",
            description: "Display real-time blockchain data and account balances."
          },
          {
            title: "Challenge 2: Multi-sig Transactions",
            description: "Implement multi-signature transaction approval system."
          }
        ]
      },
      "9": { // Solana Security Best Practices
        title: "Secure Vault with Audits",
        subtitle: "Build a thoroughly audited smart contract",
        objective: "Develop a secure vault system with comprehensive access controls, reentrancy protection, and security best practices.",
        tasks: [
          "Implement multi-level access control system",
          "Add reentrancy protection mechanisms",
          "Create comprehensive input validation",
          "Add emergency pause functionality"
        ],
        acceptanceCriteria: [
          "All common vulnerabilities addressed",
          "Access controls prevent unauthorized actions",
          "Reentrancy attacks blocked",
          "Emergency functions work when needed"
        ],
        example: `Input: Attempt reentrancy attack
Expected output: Attack blocked, error returned

Input: Emergency pause activated
Expected output: All functions disabled except owner actions`,
        tips: [
          "Use Checks-Effects-Interactions pattern",
          "Implement proper access modifiers",
          "Add input sanitization for all user data",
          "Test with known attack vectors"
        ],
        challenges: [
          {
            title: "Challenge 1: Access Control",
            description: "Implement comprehensive access control and permission systems."
          },
          {
            title: "Challenge 2: Reentrancy Protection",
            description: "Add protection against reentrancy attacks and other common vulnerabilities."
          }
        ]
      }
    };

    return challengeConfigs[course.id as keyof typeof challengeConfigs] || challengeConfigs["1"];
  };

  const { course, currentLesson, nextLesson, prevLesson, completedLessons, challengeData } =
    useMemo(() => {
      const course = mockCourses.find((c) => c.id === courseId);
      if (!course)
        return {
          course: null,
          currentLesson: null,
          nextLesson: null,
          prevLesson: null,
          completedLessons: [],
          challengeData: null,
        };

      // Flatten all lessons with section info
      const allLessons: (Lesson & {
        sectionId: string;
        sectionTitle: string;
      })[] = [];
      course.sections.forEach((section) => {
        section.lessons.forEach((lesson) => {
          allLessons.push({
            ...lesson,
            sectionId: section.id,
            sectionTitle: section.title,
          });
        });
      });

      const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
      const currentLesson = allLessons[currentIndex];
      const nextLesson =
        currentIndex < allLessons.length - 1
          ? allLessons[currentIndex + 1]
          : null;
      const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

      // Mock completed lessons
      const completedLessons: string[] = allLessons
        .slice(0, currentIndex)
        .map((l) => l.id);

      const challengeData = getChallengeData(course);

      return {
        course,
        currentLesson,
        nextLesson,
        prevLesson,
        completedLessons,
        challengeData,
      };
    }, [courseId, lessonId]);

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The lesson you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href={`/elearning/${courseId}`}>Back to Course</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "quiz":
        return <FileText className="h-4 w-4" />;
      case "assignment":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/elearning/${courseId}`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold truncate max-w-md">
                {course.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentLesson.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Resources
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="aspect-video bg-black">
            <VideoPlayer
              videoUrl={currentLesson.videoUrl}
              title={currentLesson.title}
              onProgress={(progress) => {
                // Handle progress tracking
                console.log("Progress:", progress);
              }}
              onComplete={() => {
                // Handle lesson completion
                console.log("Lesson completed");
              }}
            />
          </div>

          {/* Lesson Info and Navigation */}
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getLessonIcon(currentLesson.type)}
                  <Badge variant="outline" className="capitalize">
                    {currentLesson.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {currentLesson.duration} min
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {prevLesson && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/elearning/learn/${courseId}/${prevLesson.id}`}
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Link>
                    </Button>
                  )}

                  {nextLesson && (
                    <Button size="sm" asChild>
                      <Link
                        href={`/elearning/learn/${courseId}/${nextLesson.id}`}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {currentLesson.description}
                </p>
              </div>

              {/* Additional Resources */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Lesson Materials</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download slides and additional resources for this lesson.
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Practice Exercise</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Test your understanding with interactive exercises.
                    </p>
                    <Button variant="outline" size="sm">
                      Start Exercise
                    </Button>
                  </Card>
                </div>
              </div>

              {/* Challenge (markdown-style, minimal) */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TargetIcon className="h-5 w-5" />
                  Challenge
                </h3>

                <Card className="p-6">
                  <div className="md:flex md:items-start md:gap-6">
                    {/* Left: challenge content */}
                    <div className="prose max-w-none md:flex-1">
                      <div className="flex items-start gap-3">
                        <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-primary shrink-0">
                          <Target className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="mb-1">Challenge — Hands-on Practice</h4>
                          <p className="text-sm text-muted-foreground">Put your knowledge to the test with a concise hands-on task that reinforces the lesson concepts.</p>
                        </div>
                      </div>

                      <section className="mt-4">
                        <h5 className="mb-1">🎯 Objective</h5>
                        <p className="text-sm">{challengeData?.objective || "Implement a working solution that applies the lesson's key techniques to a practical problem. Focus on correctness, clarity, and handling basic edge cases."}</p>
                      </section>

                      <section className="mt-4">
                        <h5 className="mb-2">🛠 Tasks</h5>
                        <ol className="list-decimal ml-6 space-y-1 text-sm">
                          {challengeData?.tasks?.map((task: string, index: number) => (
                            <li key={index}>{task}</li>
                          )) || (
                              <>
                                <li>Read the challenge description and confirm expected behavior.</li>
                                <li>Implement the core logic in code (follow the required language/runtime).</li>
                                <li>Handle edge cases (empty input, invalid values).</li>
                                <li>Provide sample input/output and at least one simple test.</li>
                              </>
                            )}
                        </ol>
                      </section>

                      <section className="mt-4">
                        <h5 className="mb-2">✅ Acceptance criteria</h5>
                        <ul className="list-disc ml-6 space-y-1 text-sm">
                          {challengeData?.acceptanceCriteria?.map((criteria: string, index: number) => (
                            <li key={index}>{criteria}</li>
                          )) || (
                              <>
                                <li>Code produces correct output for sample cases.</li>
                                <li>Basic edge-cases are handled without runtime errors.</li>
                                <li>Solution is readable and commented where necessary.</li>
                              </>
                            )}
                        </ul>
                      </section>

                      <section className="mt-4">
                        <h5 className="mb-2">🔎 Example</h5>
                        <pre className="bg-muted/50 p-3 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                          {challengeData?.example || `Input:
[1, -2, 3, null, 5]

Expected output:
9

Explanation: sum of positive numbers only (1 + 3 + 5 = 9)`}
                        </pre>
                      </section>

                      <section className="mt-4">
                        <h5 className="mb-2">💡 Tips</h5>
                        <ul className="list-disc ml-6 space-y-1 text-sm">
                          {challengeData?.tips?.map((tip: string, index: number) => (
                            <li key={index}>{tip}</li>
                          )) || (
                              <>
                                <li>Start with a small, working example and expand.</li>
                                <li>Write one test per important case (happy path, empty, invalid input).</li>
                                <li>Keep functions small and well-named for readability.</li>
                              </>
                            )}
                        </ul>
                      </section>
                    </div>

                    {/* Right: compact stats & action */}
                    <aside className="mt-6 md:mt-0 md:w-64">
                      <div className="rounded-lg border border-border p-4 bg-background/60">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Estimated</div>
                          <div className="text-sm font-medium">15–30 min</div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="text-sm text-muted-foreground">Difficulty</div>
                          <div className="text-sm font-medium">Intermediate</div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-muted-foreground mb-2">Checklist</div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-50 text-green-600">
                                ✓
                              </span>
                              <span>Implement core logic</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-50 text-green-600">✓</span>
                              <span>Handle edge cases</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-50 text-green-600">✓</span>
                              <span>Provide sample tests</span>
                            </li>
                          </ul>
                        </div>

                        <div className="mt-4">
                          {isChallengeCompleted ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              <span className="text-sm font-medium text-green-600">Completed</span>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">Not completed yet</div>
                          )}
                        </div>

                        <div className="mt-4">
                          <Button
                            className={`w-full ${isChallengeCompleted ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            onClick={() => setIsChallengeOpen(true)}
                          >
                            {isChallengeCompleted ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                View Results
                              </>
                            ) : (
                              <>
                                <Target className="h-4 w-4 mr-2" />
                                Take Challenge
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </aside>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-background border-l border-border flex flex-col">
          {/* Course Progress */}
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold mb-3">Course Content</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your progress</span>
                <span>
                  {isChallengeCompleted ? (
                    <span className="text-green-600 font-semibold">
                      100% complete
                    </span>
                  ) : (
                    <span>
                      {completedLessons.length}/
                      {course.sections.reduce(
                        (acc, s) => acc + s.lessons.length,
                        0
                      )}{" "}
                      complete
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${isChallengeCompleted ? "bg-green-500" : "bg-primary"
                    }`}
                  style={{
                    width: isChallengeCompleted
                      ? "100%"
                      : `${(completedLessons.length /
                        course.sections.reduce(
                          (acc, s) => acc + s.lessons.length,
                          0
                        )) *
                      100
                      }%`,
                  }}
                />
              </div>
              {isChallengeCompleted && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950/20 p-2 rounded-lg">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">Challenge Completed!</span>
                </div>
              )}
            </div>
          </div>

          {/* Curriculum */}
          <div className="flex-1 overflow-y-auto">
            {course.sections.map((section) => (
              <div
                key={section.id}
                className="border-b border-border last:border-b-0"
              >
                <div className="p-4 bg-muted/50">
                  <h4 className="font-medium text-sm">{section.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {section.lessons.length} lessons
                  </p>
                </div>

                <div className="space-y-1">
                  {section.lessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isCurrent = lesson.id === lessonId;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/elearning/learn/${courseId}/${lesson.id}`}
                        className={`flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors ${isCurrent ? "bg-accent border-r-2 border-primary" : ""
                          }`}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                          )}

                          <div className="flex items-center gap-2 flex-1">
                            {getLessonIcon(lesson.type)}
                            <span
                              className={`text-sm ${isCurrent ? "font-medium" : ""
                                }`}
                            >
                              {lesson.title}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs text-muted-foreground">
                          {lesson.duration}m
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge Modal */}
      <Dialog open={isChallengeOpen} onOpenChange={setIsChallengeOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Target className="h-5 w-5" />
              Challenge: {challengeData?.title || "Challenge"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Challenge Description */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-muted-foreground mb-2">
                  {challengeData?.subtitle || "Complete the programming challenge"}
                </h4>
              </div>

              {challengeData?.challenges.map((challenge, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                </div>
              )) || (
                  <>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Challenge 1: Taking deposits
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your program should allow a user to deposit SOL into their own
                        vault.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">
                        Challenge 2: Allowing withdrawal
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The vault owner should be able to withdraw SOL from their
                        vault.
                      </p>
                    </div>
                  </>
                )}
            </div>

            {/* Upload Section */}
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center space-y-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-semibold mb-2">Upload your program</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your compiled Solana program (.so file) to test it
                    against the challenges.
                  </p>

                  <input
                    type="file"
                    accept=".so"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="program-upload"
                  />
                  <label htmlFor="program-upload">
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      asChild
                    >
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose .so file
                      </span>
                    </Button>
                  </label>

                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>


            {/* Upload Program Button */}
            {uploadedFile && (
              <div className="flex justify-center">
                <Button
                  onClick={handleUploadProgram}
                  disabled={isUploading}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Testing Program...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Program
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Test Results */}
            {testResults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Test Results</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {testResults.results.filter((r: any) => r.success).length}
                      /{testResults.results.length} Tests Passed
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {testResults.results.map((result: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium capitalize">
                              Challenge {index + 1}: {result.instruction}
                            </h4>
                            <Badge
                              variant={
                                result.success ? "default" : "destructive"
                              }
                              className={
                                result.success ? "bg-green-500" : "bg-red-500"
                              }
                            >
                              {result.success ? "COMPLETE" : "INCOMPLETE"}
                            </Badge>
                          </div>
                          {result.success ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Compute Units:
                            </span>
                            <span className="font-mono">
                              {result.compute_units_consumed.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Execution Time:
                            </span>
                            <span className="font-mono">
                              {result.execution_time}ms
                            </span>
                          </div>
                        </div>

                        {!result.success && result.message && (
                          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                  Error
                                </p>
                                <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                                  {result.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {result.program_logs &&
                          result.program_logs.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">
                                Program Logs:
                              </p>
                              <div className="bg-muted rounded-lg p-3 max-h-32 overflow-y-auto">
                                <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                                  {result.program_logs.join("\n")}
                                </pre>
                              </div>
                            </div>
                          )}
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Overall Result */}
                <div className="pt-4 border-t border-border">
                  {testResults.success ? (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center">
                          <div className="relative">
                            <CheckCircle2 className="h-16 w-16 text-green-500 animate-pulse" />
                            <div className="absolute inset-0 h-16 w-16 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">
                            🎉 Challenge Completed!
                          </h3>
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            Congratulations! You've successfully completed all
                            challenges.
                          </p>
                          <p className="text-sm text-green-600/80 dark:text-green-400/80">
                            Your Solana program passed all tests with flying
                            colors!
                          </p>
                        </div>

                        {/* NFT Certificate Section */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 my-4">
                          <div className="text-center space-y-3">
                            <div className="flex items-center justify-center gap-2">
                              <div className="text-2xl">🏆</div>
                              <h4 className="font-semibold text-purple-700 dark:text-purple-300">
                                Claim Your NFT Certificate
                              </h4>
                            </div>
                            <p className="text-sm text-purple-600 dark:text-purple-400">
                              Mint an NFT certificate to commemorate your
                              achievement on the Solana blockchain
                            </p>
                            <Button
                              onClick={handleMintCertificate}
                              disabled={mintCertificateMutation.isPending}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                            >
                              {mintCertificateMutation.isPending ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Minting Certificate...
                                </>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Mint NFT Certificate
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                              // Reset for next attempt
                              setUploadedFile(null);
                              setTestResults(null);
                            }}
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Try Another Challenge
                          </Button>
                          <Button
                            variant="outline"
                            className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950/20"
                            onClick={() => setIsChallengeOpen(false)}
                          >
                            Continue Learning
                          </Button>
                        </div>

                        <div className="text-xs text-green-600/60 dark:text-green-400/60 pt-2">
                          🏆 Achievement unlocked: Solana Smart Contract
                          Developer
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2 text-red-600">
                        <X className="h-8 w-8" />
                        <span className="text-lg font-semibold">
                          Challenge Incomplete
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          Some tests failed. Review the errors above and try
                          again.
                        </p>
                        <p className="text-sm text-muted-foreground/80">
                          Don't give up! Each attempt brings you closer to
                          mastery.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setUploadedFile(null);
                          setTestResults(null);
                        }}
                        className="mt-4"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Message Modal */}
      <Dialog open={showMintSuccess} onOpenChange={setShowMintSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                🎉
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-green-600">
                Certificate Minted Successfully! 🎊
              </h3>
              <p className="text-muted-foreground">
                Your NFT certificate has been successfully minted and saved to
                your wallet!
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full">
              <div className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Achievement Unlocked!</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                You've completed the challenge and earned your blockchain
                certificate.
              </p>
            </div>

            <Button
              onClick={() => setShowMintSuccess(false)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white w-full"
            >
              Awesome! 🚀
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isVisible && <Fireworks autorun={{ speed: 3, duration: 3000 }} />}
    </div>
  );
}
