'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ChevronLeft,
    Clock,
    Star,
    Target,
    BookOpen,
    CheckCircle,
    Play,
    Code,
    Trophy,
    Users,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { mockChallenges } from '@/lib/data/mock-courses';

export default function ChallengeDetailPage() {
    const params = useParams();
    const challengeId = params.id as string;

    const challenge = useMemo(() => {
        return mockChallenges.find(c => c.id === challengeId);
    }, [challengeId]);

    if (!challenge) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
                    <p className="text-muted-foreground">
                        The challenge you're looking for doesn't exist.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/elearning/challenges">Back to Challenges</Link>
                    </Button>
                </Card>
            </div>
        );
    }

    const getDifficultyColor = (difficulty: number) => {
        if (difficulty <= 2) return 'bg-green-500';
        if (difficulty <= 3) return 'bg-yellow-500';
        if (difficulty <= 4) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-blue-500';
            case 'intermediate': return 'bg-purple-500';
            case 'advanced': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/elearning/challenges">
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Back to Challenges
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Challenge Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Target className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <Badge className={`${getLevelColor(challenge.level)} text-white border-0 mb-2`}>
                                        {challenge.level}
                                    </Badge>
                                    <h1 className="text-3xl font-bold">{challenge.title}</h1>
                                    <p className="text-lg text-muted-foreground">{challenge.subtitle}</p>
                                </div>
                            </div>

                            <p className="text-muted-foreground mb-6 max-w-2xl">
                                {challenge.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{challenge.estimatedTime} minutes</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{challenge.completionRate}% completed</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: challenge.difficulty }).map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                                    ))}
                                    <span className="text-sm ml-2">Difficulty</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {challenge.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Button asChild>
                                    <Link href={challenge.documentationUrl}>
                                        <BookOpen className="h-4 w-4 mr-2" />
                                        Read Documentation
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild>
                                    <Link href={challenge.challengeUrl}>
                                        <Play className="h-4 w-4 mr-2" />
                                        Start Challenge
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Progress Card */}
                        <div className="lg:w-80">
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4">Your Progress</h3>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Progress</span>
                                            <span>0%</span>
                                        </div>
                                        <ProgressBar value={0} className="h-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-green-600">0</div>
                                            <div className="text-xs text-muted-foreground">Completed</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">0</div>
                                            <div className="text-xs text-muted-foreground">Attempts</div>
                                        </div>
                                    </div>

                                    <Button className="w-full" disabled>
                                        <Trophy className="h-4 w-4 mr-2" />
                                        Not Started
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 lg:flex-[2] w-full">
                        <div className="h-[500px] overflow-hidden w-full">
                            <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
                                <TabsList className="w-full flex-shrink-0">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="objectives">Objectives</TabsTrigger>
                                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                                </TabsList>

                                <div className="flex-1 overflow-y-auto w-full">
                                    <TabsContent value="overview" className="space-y-6 h-full">
                                        <Card className="p-6">
                                            <h3 className="text-xl font-semibold mb-4">Challenge Overview</h3>
                                            <div className="prose prose-gray dark:prose-invert max-w-none">
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {challenge.description}
                                                </p>

                                                <h4 className="text-lg font-semibold mt-6 mb-3">What you'll build</h4>
                                                <p className="text-muted-foreground">
                                                    This challenge will guide you through building a {challenge.title.toLowerCase()}.
                                                    You'll implement the core functionality while learning best practices and security considerations.
                                                </p>
                                            </div>
                                        </Card>

                                        <Card className="p-6">
                                            <h3 className="text-xl font-semibold mb-4">Challenge Structure</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-sm font-semibold text-primary">1</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">Read Documentation</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            Start by reading the comprehensive documentation that explains the concepts and requirements.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-sm font-semibold text-primary">2</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">Implement Solution</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            Write the smart contract code following the specifications and best practices outlined.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-sm font-semibold text-primary">3</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">Test & Deploy</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            Test your implementation thoroughly and deploy it to see the results.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </TabsContent>

                                    <TabsContent value="objectives" className="space-y-6 h-full">
                                        <Card className="p-6">
                                            <h3 className="text-xl font-semibold mb-4">Learning Objectives</h3>
                                            <div className="space-y-3">
                                                {challenge.learningObjectives.map((objective, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span>{objective}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                    </TabsContent>

                                    <TabsContent value="requirements" className="space-y-6 h-full">
                                        <Card className="p-6">
                                            <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
                                            <div className="space-y-3">
                                                {challenge.prerequisites.map((prereq, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                        <span>{prereq}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
                        <Card className="p-6">
                            <h4 className="font-semibold mb-4">Challenge Stats</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Category:</span>
                                    <span>{challenge.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Difficulty:</span>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: challenge.difficulty }).map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Est. Time:</span>
                                    <span>{challenge.estimatedTime} min</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Completion Rate:</span>
                                    <span>{challenge.completionRate}%</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h4 className="font-semibold mb-4">Similar Challenges</h4>
                            <div className="space-y-3">
                                {mockChallenges
                                    .filter(c => c.id !== challenge.id && c.category === challenge.category)
                                    .slice(0, 3)
                                    .map((similarChallenge) => (
                                        <div key={similarChallenge.id} className="flex gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Target className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h5 className="font-medium text-sm line-clamp-2 mb-1">
                                                    {similarChallenge.title}
                                                </h5>
                                                <p className="text-xs text-muted-foreground">
                                                    {similarChallenge.category}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
