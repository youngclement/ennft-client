"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  CheckCircle,
  Calendar,
  Star,
  BarChart3,
  Target,
  Trophy,
  Flame,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { mockCourses, mockStudentProgress } from "@/lib/data/mock-courses";

type MyLearningItem = {
  id: string;
  progress: number;
  status: "in-progress" | "completed";
  lastAccessed?: string;
};

export default function LearningDashboardPage() {
  const [mintingCourseId, setMintingCourseId] = useState<string | null>(null);
  const [mintedCourseIds, setMintedCourseIds] = useState<Set<string>>(
    new Set()
  );
  const [myLearning, setMyLearning] = useState<MyLearningItem[]>([]);

  // Load My Learning from localStorage
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? window.localStorage.getItem("myLearning")
          : null;
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const arr = Array.isArray(parsed) ? parsed : [];
      const normalized: MyLearningItem[] = arr.map((item: any) => ({
        id: String(item?.id ?? ""),
        progress: Number(item?.progress ?? 0),
        status: item?.status === "completed" ? "completed" : "in-progress",
        lastAccessed:
          typeof item?.lastAccessed === "string"
            ? item.lastAccessed
            : undefined,
      }));
      setMyLearning(normalized);
    } catch (_) {
      setMyLearning([]);
    }
  }, []);

  // Derived enrolled courses from My Learning
  const enrolledCourses = myLearning
    .map((item) => {
      const course = mockCourses.find((c) => String(c.id) === String(item.id));
      if (!course) return null as any;
      return {
        ...course,
        progress: item.progress ?? 0,
        status: item.status ?? "in-progress",
        lastAccessed: item.lastAccessed ?? new Date().toISOString(),
        nextLesson:
          course.sections[0]?.lessons[0]?.title || "Continue Learning",
      };
    })
    .filter(Boolean);

  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(
    (c) => c.status === "completed"
  ).length;
  const totalProgress =
    totalCourses > 0
      ? enrolledCourses.reduce(
          (acc, course) => acc + (course.progress || 0),
          0
        ) / totalCourses
      : 0;
  const totalStudyTime = enrolledCourses.reduce(
    (acc, course) =>
      acc + ((course.duration || 0) * (course.progress || 0)) / 100,
    0
  );

  const recentActivity = [
    {
      type: "lesson_completed",
      courseTitle: "Complete Blockchain Development Bootcamp",
      lessonTitle: "Smart Contract Security",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      type: "course_enrolled",
      courseTitle: "React & Next.js Masterclass",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      type: "certificate_earned",
      courseTitle: "DeFi Protocol Development",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      icon: Award,
      color: "text-yellow-600",
    },
  ];

  const achievements = [
    {
      title: "First Course Completed",
      description: "Completed your first course",
      icon: Trophy,
      earned: true,
      progress: 100,
    },
    {
      title: "Week Streak",
      description: "Learned for 7 consecutive days",
      icon: Flame,
      earned: true,
      progress: 100,
    },
    {
      title: "Speed Learner",
      description: "Completed 5 lessons in one day",
      icon: TrendingUp,
      earned: false,
      progress: 60,
    },
    {
      title: "Top Student",
      description: "Ranked in top 10% of students",
      icon: Star,
      earned: false,
      progress: 0,
    },
  ];

  const weeklyGoal = 10; // hours
  const weeklyProgress = 6.5; // hours studied this week

  async function handleMint(courseId: string) {
    try {
      setMintingCourseId(courseId);
      const res = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Mint failed");
      alert(`Minted NFT! Asset: ${data.assetAddress}`);
      // Refresh minted status after successful mint
      try {
        const r = await fetch("/api/nft/minted");
        const j = await r.json();
        const ids = new Set<string>(
          (j?.minted ?? []).map((m: any) => String(m.courseId))
        );
        setMintedCourseIds(ids);
      } catch (_) {
        /* ignore */
      }
    } catch (err: any) {
      alert(err?.message || "Mint failed");
    } finally {
      setMintingCourseId(null);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/nft/minted");
        const data = await res.json();
        if (!cancelled) {
          const ids = new Set<string>(
            (data?.minted ?? []).map((m: any) => String(m.courseId))
          );
          setMintedCourseIds(ids);
        }
      } catch (_) {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress and continue your learning journey
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalCourses}</p>
              <p className="text-sm text-muted-foreground">Enrolled Courses</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedCourses}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{Math.round(totalProgress)}%</p>
              <p className="text-sm text-muted-foreground">Avg. Progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {Math.round(totalStudyTime)}h
              </p>
              <p className="text-sm text-muted-foreground">Total Study Time</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              {/* Weekly Goal Progress */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Weekly Goal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {weeklyProgress}h of {weeklyGoal}h this week
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {Math.round((weeklyProgress / weeklyGoal) * 100)}% Complete
                  </Badge>
                </div>
                <ProgressBar
                  value={(weeklyProgress / weeklyGoal) * 100}
                  className="h-3"
                />
              </Card>

              {/* Enrolled Courses */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Continue Learning</h3>
                {enrolledCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex">
                      <div className="w-32 h-24 relative flex-shrink-0">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold line-clamp-1 mb-1">
                              {course.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              by {course.instructor.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                course.status === "completed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {course.status === "completed"
                                ? "Completed"
                                : `${course.progress}%`}
                            </Badge>
                            {mintedCourseIds.has(String(course.id)) && (
                              <Badge variant="outline">NFT Minted</Badge>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <ProgressBar
                            value={course.progress}
                            className="h-2"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Next: {course.nextLesson}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button size="sm" asChild>
                              <Link
                                href={`/elearning/learn/${course.id}/${
                                  course.sections[0]?.lessons[0]?.id || "1"
                                }`}
                              >
                                {course.status === "completed"
                                  ? "Review"
                                  : "Continue"}
                              </Link>
                            </Button>
                            {/* Complete in 10s moved to lesson page */}
                            {course.status === "completed" &&
                              !mintedCourseIds.has(String(course.id)) && (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => handleMint(String(course.id))}
                                  disabled={
                                    mintingCourseId === String(course.id)
                                  }
                                >
                                  {mintingCourseId === String(course.id)
                                    ? "Minting..."
                                    : "Mint NFT"}
                                </Button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" asChild>
                  <Link href="/elearning">Browse More Courses</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
                    >
                      <div className={`p-2 bg-muted rounded-full`}>
                        <activity.icon
                          className={`h-4 w-4 ${activity.color}`}
                        />
                      </div>

                      <div className="flex-1">
                        <p className="font-medium">
                          {activity.type === "lesson_completed" &&
                            `Completed "${activity.lessonTitle}"`}
                          {activity.type === "course_enrolled" &&
                            `Enrolled in "${activity.courseTitle}"`}
                          {activity.type === "certificate_earned" &&
                            `Earned certificate for "${activity.courseTitle}"`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className={`p-6 ${
                      achievement.earned
                        ? "border-primary/20 bg-primary/5"
                        : "opacity-75"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          achievement.earned ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <achievement.icon
                          className={`h-6 w-6 ${
                            achievement.earned
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>

                        {!achievement.earned && achievement.progress > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <ProgressBar
                              value={achievement.progress}
                              className="h-1"
                            />
                          </div>
                        )}

                        {achievement.earned && (
                          <Badge className="text-xs">Earned</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Streak */}
          <Card className="p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-4">
                <Flame className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-1">7</h3>
              <p className="text-sm text-muted-foreground">Day Streak</p>
              <p className="text-xs text-muted-foreground mt-2">
                Keep it up! Learn something new today.
              </p>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">This Month</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Hours Studied</span>
                </div>
                <span className="font-semibold">24.5h</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Lessons Completed</span>
                </div>
                <span className="font-semibold">12</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Certificates</span>
                </div>
                <span className="font-semibold">2</span>
              </div>
            </div>
          </Card>

          {/* Recommended Courses */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
            <div className="space-y-4">
              {mockCourses
                .filter(
                  (course) => !enrolledCourses.some((ec) => ec.id === course.id)
                )
                .slice(0, 2)
                .map((course) => (
                  <div key={course.id} className="flex gap-3">
                    <div className="w-16 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={64}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {course.instructor.name}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                        asChild
                      >
                        <Link href={`/elearning/${course.id}`}>
                          View Course
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
