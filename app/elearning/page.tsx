'use client';

import { useState } from 'react';
import { CourseHeader } from '@/components/elearning/CourseHeader';
import { CourseList } from '@/components/elearning/CourseList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courseCategories } from '@/lib/data/mock-courses';
import { TrendingUp, Clock, Star, Users } from 'lucide-react';

export default function ELearningPage() {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const quickStats = [
        { icon: TrendingUp, label: 'Active Learners', value: '12.5K+' },
        { icon: Clock, label: 'Hours Learned', value: '89K+' },
        { icon: Star, label: 'Avg. Rating', value: '4.8' },
        { icon: Users, label: 'Total Students', value: '45K+' },
    ];

    return (
        <div className="min-h-screen bg-background">
            <CourseHeader />

            {/* Quick Stats */}
            <div className="bg-muted/30 border-y border-border">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {quickStats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Category Filter */}
            <div className="bg-background border-b border-border">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Explore Courses</h2>
                            <p className="text-muted-foreground">
                                Discover courses that match your interests and skill level
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {['All Categories', 'Blockchain', 'Web Development', 'AI & Machine Learning'].map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                    className="text-xs"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course List */}
            <div className="container mx-auto px-4 py-8" id="courses">
                <CourseList selectedCategory={selectedCategory} />
            </div>
        </div>
    );
}
