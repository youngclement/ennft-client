'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VideoPlayer } from '@/components/elearning/VideoPlayer';
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Play,
    FileText,
    BookOpen,
    Download,
    Share2
} from 'lucide-react';
import Link from 'next/link';
import { mockCourses, Course, Lesson } from '@/lib/data/mock-courses';

export default function LessonPlayerPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const lessonId = params.lessonId as string;

    const { course, currentLesson, nextLesson, prevLesson, completedLessons } = useMemo(() => {
        const course = mockCourses.find(c => c.id === courseId);
        if (!course) return { course: null, currentLesson: null, nextLesson: null, prevLesson: null, completedLessons: [] };

        // Flatten all lessons with section info
        const allLessons: (Lesson & { sectionId: string; sectionTitle: string })[] = [];
        course.sections.forEach(section => {
            section.lessons.forEach(lesson => {
                allLessons.push({
                    ...lesson,
                    sectionId: section.id,
                    sectionTitle: section.title
                });
            });
        });

        const currentIndex = allLessons.findIndex(l => l.id === lessonId);
        const currentLesson = allLessons[currentIndex];
        const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
        const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

        // Mock completed lessons
        const completedLessons: string[] = allLessons.slice(0, currentIndex).map(l => l.id);

        return { course, currentLesson, nextLesson, prevLesson, completedLessons };
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
                            <h1 className="font-semibold truncate max-w-md">{course.title}</h1>
                            <p className="text-sm text-muted-foreground">{currentLesson.title}</p>
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
                                console.log('Progress:', progress);
                            }}
                            onComplete={() => {
                                // Handle lesson completion
                                console.log('Lesson completed');
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
                                            <Link href={`/elearning/learn/${courseId}/${prevLesson.id}`}>
                                                <ChevronLeft className="h-4 w-4 mr-2" />
                                                Previous
                                            </Link>
                                        </Button>
                                    )}

                                    {nextLesson && (
                                        <Button size="sm" asChild>
                                            <Link href={`/elearning/learn/${courseId}/${nextLesson.id}`}>
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
                                <span>{completedLessons.length}/{course.sections.reduce((acc, s) => acc + s.lessons.length, 0)} complete</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{
                                        width: `${(completedLessons.length / course.sections.reduce((acc, s) => acc + s.lessons.length, 0)) * 100}%`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Curriculum */}
                    <div className="flex-1 overflow-y-auto">
                        {course.sections.map((section) => (
                            <div key={section.id} className="border-b border-border last:border-b-0">
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
                                                className={`flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors ${isCurrent ? 'bg-accent border-r-2 border-primary' : ''
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
                                                        <span className={`text-sm ${isCurrent ? 'font-medium' : ''}`}>
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
        </div>
    );
}
