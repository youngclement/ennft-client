'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    ChevronDown,
    ChevronRight,
    Play,
    FileText,
    CheckCircle,
    Clock,
    BookOpen
} from 'lucide-react';
import { Course } from '@/lib/data/mock-courses';

interface CourseCurriculumProps {
    course: Course;
    isEnrolled?: boolean;
    completedLessons?: string[];
}

export function CourseCurriculum({
    course,
    isEnrolled = false,
    completedLessons = []
}: CourseCurriculumProps) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['1']));

    const toggleSection = (sectionId: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        } else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
    };

    const formatDuration = (minutes: number) => {
        return `${minutes}m`;
    };

    const getLessonIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <Play className="h-4 w-4" />;
            case 'quiz':
                return <FileText className="h-4 w-4" />;
            case 'assignment':
                return <BookOpen className="h-4 w-4" />;
            default:
                return <Play className="h-4 w-4" />;
        }
    };

    const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);
    const completedCount = completedLessons.length;
    const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Course Content</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{course.sections.length} sections</span>
                        <span>{totalLessons} lessons</span>
                        <span>{course.duration}min total</span>
                    </div>
                </div>

                {isEnrolled && (
                    <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">
                            {completedCount} of {totalLessons} completed
                        </div>
                        <div className="w-32 bg-muted rounded-full h-2">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {progressPercentage}% complete
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                {course.sections.map((section) => (
                    <Collapsible
                        key={section.id}
                        open={expandedSections.has(section.id)}
                        onOpenChange={() => toggleSection(section.id)}
                    >
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                className="w-full justify-between p-4 h-auto hover:bg-accent/50"
                            >
                                <div className="flex items-center gap-3">
                                    {expandedSections.has(section.id) ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                    <div className="text-left">
                                        <h4 className="font-medium">{section.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {section.lessons.length} lessons • {section.lessons.reduce((acc, lesson) => acc + lesson.duration, 0)}min
                                        </p>
                                    </div>
                                </div>
                            </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="space-y-1">
                            {section.lessons.map((lesson) => {
                                const isCompleted = completedLessons.includes(lesson.id);
                                const isAvailable = isEnrolled || lesson.order === 1; // First lesson is always available for preview

                                return (
                                    <div
                                        key={lesson.id}
                                        className={`flex items-center gap-3 p-3 ml-7 rounded-lg transition-colors ${isAvailable
                                                ? 'hover:bg-accent/50 cursor-pointer'
                                                : 'opacity-50 cursor-not-allowed'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 flex-1">
                                            {isCompleted ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                                            )}

                                            <div className="flex items-center gap-2">
                                                {getLessonIcon(lesson.type)}
                                                <span className="font-medium">{lesson.title}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{formatDuration(lesson.duration)}</span>
                                            </div>

                                            {!isAvailable && (
                                                <Badge variant="outline" className="text-xs">
                                                    Preview
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>

            {!isEnrolled && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                        Enroll now to access all lessons and track your progress
                    </p>
                    <Button>Enroll in Course</Button>
                </div>
            )}
        </Card>
    );
}
