'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ChevronLeft,
    BookOpen,
    Target,
    Code,
    AlertTriangle,
    CheckCircle,
    Lightbulb,
    ArrowRight,
    Play
} from 'lucide-react';
import Link from 'next/link';
import { mockChallenges } from '@/lib/data/mock-courses';

export default function ChallengeDocumentationPage() {
    const params = useParams();
    const challengeId = params.id as string;

    const challenge = useMemo(() => {
        return mockChallenges.find(c => c.id === challengeId);
    }, [challengeId]);

    if (!challenge) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Documentation Not Found</h1>
                    <p className="text-muted-foreground">
                        The documentation you're looking for doesn't exist.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/elearning/challenges">Back to Challenges</Link>
                    </Button>
                </Card>
            </div>
        );
    }

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
                                    <BookOpen className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{challenge.title} - Documentation</h1>
                                    <p className="text-muted-foreground">Complete guide to tackle this challenge</p>
                                </div>
                            </div>
                        </div>

                        <Button asChild>
                            <Link href={challenge.challengeUrl}>
                                <Play className="h-4 w-4 mr-2" />
                                Start Challenge
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="requirements">Requirements</TabsTrigger>
                            <TabsTrigger value="implementation">Implementation</TabsTrigger>
                            <TabsTrigger value="testing">Testing</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <Card className="p-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Target className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
                                        <p className="text-muted-foreground text-lg">{challenge.subtitle}</p>
                                        <div className="flex items-center gap-4 mt-4">
                                            <Badge className="border-border">{challenge.category}</Badge>
                                            <Badge className="bg-secondary text-secondary-foreground">{challenge.level}</Badge>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <span>Difficulty:</span>
                                                {Array.from({ length: challenge.difficulty }).map((_, i) => (
                                                    <div key={i} className="w-2 h-2 rounded-full bg-orange-500" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {challenge.description}
                                    </p>

                                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What You'll Learn</h4>
                                                <ul className="space-y-1">
                                                    {challenge.learningObjectives.map((objective, index) => (
                                                        <li key={index} className="text-blue-800 dark:text-blue-200 text-sm">
                                                            • {objective}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Challenge Overview</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <CheckCircle className="h-6 w-6 text-green-600" />
                                        </div>
                                        <h4 className="font-semibold mb-1">Read & Understand</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Go through this documentation thoroughly
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Code className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <h4 className="font-semibold mb-1">Implement</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Write the smart contract code
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Target className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <h4 className="font-semibold mb-1">Test & Submit</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Test your solution and submit
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="requirements" className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
                                <div className="space-y-3 mb-6">
                                    {challenge.prerequisites.map((prereq, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{prereq}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Important Notes</h4>
                                            <ul className="text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
                                                <li>• Make sure you have the required development environment set up</li>
                                                <li>• Test your code thoroughly before submission</li>
                                                <li>• Follow security best practices at all times</li>
                                                <li>• Read the challenge requirements carefully</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="implementation" className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Implementation Guide</h3>
                                <div className="space-y-6">
                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="font-semibold mb-2">Step 1: Set Up Your Development Environment</h4>
                                        <p className="text-muted-foreground mb-3">
                                            Ensure you have all the necessary tools installed and configured for {challenge.category} development.
                                        </p>
                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                                            <pre>{`# Install dependencies
npm install

# Set up your development environment
# Follow the specific setup instructions for ${challenge.category}`}</pre>
                                        </div>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="font-semibold mb-2">Step 2: Understand the Requirements</h4>
                                        <p className="text-muted-foreground mb-3">
                                            Carefully read through all the challenge requirements and specifications.
                                        </p>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li>• Identify the core functionality that needs to be implemented</li>
                                            <li>• Note any security requirements or constraints</li>
                                            <li>• Plan your implementation approach</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="font-semibold mb-2">Step 3: Implement the Solution</h4>
                                        <p className="text-muted-foreground mb-3">
                                            Write your smart contract code following best practices and the specifications.
                                        </p>
                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                            <p className="text-sm text-muted-foreground">
                                                <strong>Tip:</strong> Start with a basic implementation and then add complexity.
                                                Make sure to include proper error handling and security measures.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4">
                                        <h4 className="font-semibold mb-2">Step 4: Test Your Implementation</h4>
                                        <p className="text-muted-foreground mb-3">
                                            Thoroughly test your code before submitting the challenge.
                                        </p>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li>• Write comprehensive unit tests</li>
                                            <li>• Test edge cases and error conditions</li>
                                            <li>• Verify security properties</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="testing" className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Testing Your Solution</h3>
                                <div className="space-y-6">
                                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Testing Checklist</h4>
                                        <ul className="space-y-2 text-green-800 dark:text-green-200 text-sm">
                                            <li>✓ All basic functionality works as expected</li>
                                            <li>✓ Edge cases are handled properly</li>
                                            <li>✓ Security vulnerabilities are addressed</li>
                                            <li>✓ Gas efficiency is optimized</li>
                                            <li>✓ Code follows best practices</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">Common Testing Scenarios</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="border rounded-lg p-4">
                                                <h5 className="font-medium mb-2">Happy Path Testing</h5>
                                                <p className="text-sm text-muted-foreground">
                                                    Test all the expected functionality with valid inputs
                                                </p>
                                            </div>
                                            <div className="border rounded-lg p-4">
                                                <h5 className="font-medium mb-2">Error Handling</h5>
                                                <p className="text-sm text-muted-foreground">
                                                    Test how your contract handles invalid inputs and error conditions
                                                </p>
                                            </div>
                                            <div className="border rounded-lg p-4">
                                                <h5 className="font-medium mb-2">Security Testing</h5>
                                                <p className="text-sm text-muted-foreground">
                                                    Verify that common attack vectors are protected against
                                                </p>
                                            </div>
                                            <div className="border rounded-lg p-4">
                                                <h5 className="font-medium mb-2">Gas Optimization</h5>
                                                <p className="text-sm text-muted-foreground">
                                                    Ensure your implementation is gas-efficient
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Call to Action */}
                    <Card className="p-6 mt-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Ready to Start?</h3>
                            <p className="text-muted-foreground mb-6">
                                You've read the documentation. Now it's time to implement your solution!
                            </p>
                            <Button size="lg" asChild>
                                <Link href={challenge.challengeUrl}>
                                    <Play className="h-5 w-5 mr-2" />
                                    Start {challenge.title} Challenge
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
