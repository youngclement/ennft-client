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
  const [testMode, setTestMode] = useState<"error" | "success">("error");
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
  useMemo(() => {
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
    }
  };

  const { course, currentLesson, nextLesson, prevLesson, completedLessons } =
    useMemo(() => {
      const course = mockCourses.find((c) => c.id === courseId);
      if (!course)
        return {
          course: null,
          currentLesson: null,
          nextLesson: null,
          prevLesson: null,
          completedLessons: [],
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

      return {
        course,
        currentLesson,
        nextLesson,
        prevLesson,
        completedLessons,
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

              {/* Challenge */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TargetIcon className="h-5 w-5" />
                  Challenge
                </h3>
                <Card className="p-6">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Put your knowledge to the test with this hands-on
                        challenge designed to reinforce the concepts you've
                        learned in this lesson.
                      </p>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">
                          🎯 Challenge Objective
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Apply the concepts from this lesson to solve a
                          real-world problem. This challenge will test your
                          understanding and help you gain practical experience.
                        </p>

                        <h5 className="font-medium text-foreground mb-2">
                          What you'll accomplish:
                        </h5>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>
                            • Implement the key concepts covered in this lesson
                          </li>
                          <li>
                            • Solve practical problems using the learned
                            techniques
                          </li>
                          <li>
                            • Demonstrate your understanding through hands-on
                            coding
                          </li>
                          <li>• Receive immediate feedback on your solution</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                          💡 Challenge Tips
                        </h5>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-4">
                          <li>
                            • Review the lesson content if you need a refresher
                          </li>
                          <li>
                            • Take your time to understand the problem before
                            coding
                          </li>
                          <li>
                            • Don't hesitate to experiment with different
                            approaches
                          </li>
                          <li>
                            • Use the provided resources and documentation
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-4">
                          <strong>Estimated time:</strong> 15-30 minutes |{" "}
                          <strong>Difficulty:</strong> Intermediate
                        </p>

                        <div className="flex items-center justify-between">
                          {isChallengeCompleted ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              <p className="text-green-600 font-medium">
                                Challenge Completed! 🎉
                              </p>
                            </div>
                          ) : (
                            <p className="text-foreground font-medium">
                              Ready to take the challenge?
                            </p>
                          )}
                          <Button
                            className={`ml-4 ${
                              isChallengeCompleted
                                ? "bg-green-600 hover:bg-green-700"
                                : ""
                            }`}
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
                    </div>
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
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isChallengeCompleted ? "bg-green-500" : "bg-primary"
                  }`}
                  style={{
                    width: isChallengeCompleted
                      ? "100%"
                      : `${
                          (completedLessons.length /
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
                        className={`flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors ${
                          isCurrent ? "bg-accent border-r-2 border-primary" : ""
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
                              className={`text-sm ${
                                isCurrent ? "font-medium" : ""
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
              Challenge: Anchor Vault
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Challenge Description */}
            <div className="space-y-4">
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

            {/* Test Mode Toggle (for development/testing) */}
            {uploadedFile && (
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                      Test Mode
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Choose which scenario to test (for development purposes)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={testMode === "error" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTestMode("error")}
                      className={
                        testMode === "error"
                          ? "bg-red-500 hover:bg-red-600"
                          : ""
                      }
                    >
                      Test Error
                    </Button>
                    <Button
                      variant={testMode === "success" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTestMode("success")}
                      className={
                        testMode === "success"
                          ? "bg-green-500 hover:bg-green-600"
                          : ""
                      }
                    >
                      Test Success
                    </Button>
                  </div>
                </div>
              </div>
            )}

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
