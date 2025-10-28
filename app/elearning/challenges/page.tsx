'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Search,
    Filter,
    Clock,
    Star,
    Target,
    BookOpen,
    ChevronRight,
    GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { mockChallenges, challengeCategories, challengeStatuses } from '@/lib/data/mock-courses';

export default function ChallengesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedStatus, setSelectedStatus] = useState('All Statuses');
    const [selectedLevel, setSelectedLevel] = useState('All Levels');

    const filteredChallenges = useMemo(() => {
        return mockChallenges.filter(challenge => {
            const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === 'All Categories' || challenge.category === selectedCategory;
            const matchesLevel = selectedLevel === 'All Levels' || challenge.level === selectedLevel;

            // For now, we'll treat all challenges as "Not Started" since we don't have user progress data
            const matchesStatus = selectedStatus === 'All Statuses';

            return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
        });
    }, [searchQuery, selectedCategory, selectedStatus, selectedLevel]);

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
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <Target className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Coding Challenges</h1>
                        <p className="text-muted-foreground">
                            Test your skills with hands-on coding challenges and build real-world projects
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Target className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{mockChallenges.length}</p>
                            <p className="text-sm text-muted-foreground">Total Challenges</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                            <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">1</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">6</p>
                            <p className="text-sm text-muted-foreground">In Progress</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500/10 rounded-lg">
                            <Star className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">4.8</p>
                            <p className="text-sm text-muted-foreground">Avg. Rating</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search challenges..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {challengeCategories.map(category => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Levels">All Levels</SelectItem>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {challengeStatuses.map(status => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {filteredChallenges.map((challenge) => (
                    <Link key={challenge.id} href={`/elearning/challenges/${challenge.id}`}>
                        <Card className="overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer border-2 hover:border-primary/20 h-full flex flex-col">
                            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <Target className="h-12 w-12 text-primary" />
                                    </div>
                                </div>

                                {/* Difficulty Badge */}
                                <div className="absolute top-4 right-4">
                                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                                </div>

                                {/* Level Badge */}
                                <div className="absolute top-4 left-4">
                                    <Badge className={`${getLevelColor(challenge.level)} text-white border-0`}>
                                        {challenge.level}
                                    </Badge>
                                </div>

                                {/* Click Indicator */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-6 h-6 bg-primary/90 rounded-full flex items-center justify-center">
                                        <ChevronRight className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <Badge className="text-xs border-border">
                                        {challenge.category}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {challenge.estimatedTime}m
                                    </div>
                                </div>

                                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                                    {challenge.title}
                                </h3>

                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {challenge.subtitle}
                                </p>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{challenge.completionRate}%</span>
                                        <span className="text-xs text-muted-foreground">completed</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-white text-black border border-gray-300 hover:bg-gray-50 text-sm px-3 py-2" asChild>
                                        <Link href={challenge.documentationUrl}>
                                            <BookOpen className="h-4 w-4 mr-2" />
                                            Docs
                                        </Link>
                                    </Button>

                                    <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white border border-green-500 text-sm px-3 py-2">
                                        <ChevronRight className="h-4 w-4 mr-2" />
                                        Start Challenge
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {filteredChallenges.length === 0 && (
                <div className="text-center py-12">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No challenges found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your filters or search query
                    </p>
                </div>
            )}
        </div>
    );
}
