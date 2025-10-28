'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ChevronLeft,
    Play,
    Code,
    FileText,
    CheckCircle,
    X,
    AlertCircle,
    Trophy,
    Clock,
    Target
} from 'lucide-react';
import Link from 'next/link';
import { mockChallenges } from '@/lib/data/mock-courses';

export default function ChallengePage() {
    const params = useParams();
    const challengeId = params.id as string;
    const [code, setCode] = useState('// Write your smart contract code here\n\n');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);

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

    const handleSubmit = () => {
        setIsSubmitted(true);
        setProgress(100);
        // Simulate submission
        setTimeout(() => {
            alert('Challenge submitted successfully! This is a demo - in a real app, your code would be tested and graded.');
        }, 1000);
    };

    const getDifficultyColor = (difficulty: number) => {
        if (difficulty <= 2) return 'bg-green-500';
        if (difficulty <= 3) return 'bg-yellow-500';
        if (difficulty <= 4) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/elearning/challenges/${challengeId}`}>
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Back to Challenge
                                </Link>
                            </Button>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Target className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">{challenge.title}</h1>
                                    <p className="text-sm text-muted-foreground">Challenge Interface</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{challenge.estimatedTime} min</span>
                            </div>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: challenge.difficulty }).map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                                ))}
                            </div>

                            <Badge variant="outline">{challenge.category}</Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-background border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Your Progress</span>
                        <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <ProgressBar value={progress} className="h-2" />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Code Editor */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Code className="h-5 w-5" />
                                    Code Editor
                                </h2>
                                <Badge variant="outline">Solidity</Badge>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-muted rounded-lg p-4">
                                    <h3 className="font-semibold mb-2">Task:</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Implement a {challenge.title.toLowerCase()} smart contract with the following requirements:
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                                        {challenge.learningObjectives.slice(0, 3).map((objective, index) => (
                                            <li key={index}>{objective}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border rounded-lg overflow-hidden">
                                    <div className="bg-muted px-4 py-2 border-b">
                                        <span className="text-sm font-medium">Vault.sol</span>
                                    </div>
                                    <Textarea
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="min-h-[400px] font-mono text-sm border-0 resize-none"
                                        placeholder="Write your smart contract code here..."
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <FileText className="h-4 w-4" />
                                        <span>Characters: {code.length}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => setCode('// Write your smart contract code here\n\n')}>
                                            Reset
                                        </Button>
                                        <Button onClick={handleSubmit} disabled={isSubmitted}>
                                            {isSubmitted ? (
                                                <>
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Submitted
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Submit Challenge
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Challenge Info */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Challenge Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Title:</span>
                                    <span className="font-medium">{challenge.title}</span>
                                </div>
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
                                    <span className="text-muted-foreground">Time Limit:</span>
                                    <span>{challenge.estimatedTime} min</span>
                                </div>
                            </div>
                        </Card>

                        {/* Requirements */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Requirements</h3>
                            <div className="space-y-3">
                                {challenge.prerequisites.map((prereq, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm">{prereq}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Progress Stats */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Your Stats</h3>
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary mb-1">{progress}%</div>
                                    <div className="text-xs text-muted-foreground">Progress</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-lg font-semibold text-green-600">
                                            {isSubmitted ? '1' : '0'}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Submissions</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-semibold text-blue-600">0</div>
                                        <div className="text-xs text-muted-foreground">Tests Passed</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Help */}
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Need Help?</h3>
                            <div className="space-y-3">
                                <Button variant="outline" className="w-full justify-start" asChild>
                                    <Link href={`${challenge.documentationUrl}`}>
                                        <FileText className="h-4 w-4 mr-2" />
                                        Read Documentation
                                    </Link>
                                </Button>

                                <Button variant="outline" className="w-full justify-start">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Get Hints
                                </Button>

                                <Button variant="outline" className="w-full justify-start">
                                    <Trophy className="h-4 w-4 mr-2" />
                                    View Solutions
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
