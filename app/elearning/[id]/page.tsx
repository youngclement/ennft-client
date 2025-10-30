'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseDetailHeader } from '@/components/elearning/CourseDetailHeader';
import { CourseCurriculum } from '@/components/elearning/CourseCurriculum';
import { CourseReviews } from '@/components/elearning/CourseReviews';
import { mockCourses, mockReviews } from '@/lib/data/mock-courses';
import { ChevronRight, Home, Clock, Users, Star, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.id as string;

    const course = useMemo(() => {
        return mockCourses.find(c => c.id === courseId);
    }, [courseId]);

    const courseReviews = useMemo(() => {
        return mockReviews.filter(r => r.courseId === courseId);
    }, [courseId]);

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
                    <p className="text-muted-foreground">
                        The course you're looking for doesn't exist or has been removed.
                    </p>
                </Card>
            </div>
        );
    }

    // Mock enrollment status - in real app this would come from user data
    const [isEnrolled, setIsEnrolled] = useState(false);
    const completedLessons: string[] = [];

    const handleEnroll = () => {
        setIsEnrolled(true);
        // In a real app, you would also make an API call here to enroll the user
        // Example: await enrollUserInCourse(courseId);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="bg-muted/30 border-b border-border">
                <div className="container mx-auto px-4 py-3">
                    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Link href="/" className="flex items-center hover:text-foreground transition-colors">
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/elearning" className="hover:text-foreground transition-colors">
                            eLearning
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">{course.title}</span>
                    </nav>
                </div>
            </div>

            <CourseDetailHeader course={course} isEnrolled={isEnrolled} onEnroll={handleEnroll} />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                <TabsTrigger value="qa">Q&A</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">About This Course</h3>
                                    <div className="prose prose-gray dark:prose-invert max-w-none">
                                        <p className="text-muted-foreground leading-relaxed mb-6">
                                            {course.description}
                                        </p>
                                    </div>

                                    {/* Course Level Badge */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <Badge variant={course.level === 'beginner' ? 'secondary' : course.level === 'intermediate' ? 'default' : 'destructive'} className="capitalize">
                                            {course.level} Level
                                        </Badge>
                                        <Badge variant="outline">{course.category}</Badge>
                                        {course.featured && (
                                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                                ⭐ Featured Course
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Course Stats */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-primary">{course.students.toLocaleString()}</div>
                                            <div className="text-sm text-muted-foreground">Students</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-primary">{course.rating}</div>
                                            <div className="text-sm text-muted-foreground">Rating</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-primary">{Math.floor(course.duration / 60)}h</div>
                                            <div className="text-sm text-muted-foreground">Duration</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-primary">{course.sections.length}</div>
                                            <div className="text-sm text-muted-foreground">Sections</div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6">
                                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <BookOpen className="h-5 w-5 text-primary" />
                                            What you'll learn
                                        </h4>
                                        <ul className="space-y-3">
                                            {course.whatYouWillLearn.map((item, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>

                                    <Card className="p-6">
                                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Star className="h-5 w-5 text-primary" />
                                            Course Highlights
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                    <Clock className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{Math.floor(course.duration / 60)}h {course.duration % 60}m</div>
                                                    <div className="text-sm text-muted-foreground">Total duration</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                    <Users className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{course.students.toLocaleString()}</div>
                                                    <div className="text-sm text-muted-foreground">Students enrolled</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                    <Star className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{course.rating} ({course.reviews.toLocaleString()} reviews)</div>
                                                    <div className="text-sm text-muted-foreground">Course rating</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Prerequisites and Requirements */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6">
                                        <h4 className="text-lg font-semibold mb-4">Requirements</h4>
                                        <div className="space-y-3">
                                            {course.requirements.map((requirement, index) => (
                                                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                                    <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-sm">{requirement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    <Card className="p-6">
                                        <h4 className="text-lg font-semibold mb-4">Course Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {course.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-border">
                                            <h5 className="text-sm font-semibold mb-2">Last Updated</h5>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(course.updatedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </Card>
                                </div>

                                {/* Instructor Section with more details */}
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">About the Instructor</h3>
                                    <div className="flex items-start gap-6">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex-shrink-0">
                                            <img
                                                src={course.instructor.avatar}
                                                alt={course.instructor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-semibold mb-2">{course.instructor.name}</h4>
                                            <p className="text-muted-foreground mb-4 leading-relaxed">{course.instructor.bio}</p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                    <div className="text-lg font-bold text-primary">{course.instructor.rating}</div>
                                                    <div className="text-xs text-muted-foreground">Rating</div>
                                                </div>
                                                <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                    <div className="text-lg font-bold text-primary">{course.instructor.students.toLocaleString()}</div>
                                                    <div className="text-xs text-muted-foreground">Students</div>
                                                </div>
                                                <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                    <div className="text-lg font-bold text-primary">{course.instructor.courses}</div>
                                                    <div className="text-xs text-muted-foreground">Courses</div>
                                                </div>
                                                <div className="text-center p-3 bg-muted/30 rounded-lg">
                                                    <div className="text-lg font-bold text-primary">4.9</div>
                                                    <div className="text-xs text-muted-foreground">Avg Rating</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>📧 Available for questions</span>
                                                <span>💬 Quick response time</span>
                                                <span>🏆 Top instructor</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Course Benefits */}
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Why Take This Course?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Certificate of Completion</h4>
                                                <p className="text-sm text-muted-foreground">Earn a blockchain-verified certificate</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-blue-600 dark:text-blue-400 text-lg">∞</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Lifetime Access</h4>
                                                <p className="text-sm text-muted-foreground">Learn at your own pace</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-600 dark:text-purple-400 text-lg">💻</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Mobile Friendly</h4>
                                                <p className="text-sm text-muted-foreground">Learn on any device</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-orange-600 dark:text-orange-400 text-lg">🎯</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Hands-on Projects</h4>
                                                <p className="text-sm text-muted-foreground">Build real-world applications</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="curriculum">
                                <CourseCurriculum
                                    course={course}
                                    isEnrolled={isEnrolled}
                                    completedLessons={completedLessons}
                                />
                            </TabsContent>

                            <TabsContent value="reviews">
                                <CourseReviews
                                    reviews={courseReviews}
                                    rating={course.rating}
                                    totalReviews={course.reviews}
                                />
                            </TabsContent>

                            <TabsContent value="qa" className="space-y-4">
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Questions & Answers</h3>
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground mb-4">
                                            No questions have been asked yet.
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Be the first to ask a question about this course.
                                        </p>
                                    </div>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6">
                            <h4 className="font-semibold mb-4">Course Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {course.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h4 className="font-semibold mb-4">Course Details</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Level:</span>
                                    <span className="capitalize">{course.level}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Duration:</span>
                                    <span>{course.duration} minutes</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Language:</span>
                                    <span>English</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last updated:</span>
                                    <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h4 className="font-semibold mb-4">Related Courses</h4>
                            <div className="space-y-3">
                                {mockCourses
                                    .filter(c => c.id !== course.id && c.category === course.category)
                                    .slice(0, 3)
                                    .map((relatedCourse) => (
                                        <div key={relatedCourse.id} className="flex gap-3">
                                            <div className="w-16 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                                                <img
                                                    src={relatedCourse.thumbnail}
                                                    alt={relatedCourse.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h5 className="font-medium text-sm line-clamp-2">
                                                    {relatedCourse.title}
                                                </h5>
                                                <p className="text-xs text-muted-foreground">
                                                    {relatedCourse.instructor.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Related Courses */}
                <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="text-2xl font-bold mb-6">You might also like</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockCourses
                            .filter(c => c.id !== course.id && c.category === course.category)
                            .slice(0, 3)
                            .map((relatedCourse) => (
                                <Card key={relatedCourse.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <Link href={`/elearning/${relatedCourse.id}`} className="block">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={relatedCourse.thumbnail}
                                                alt={relatedCourse.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                                    {relatedCourse.level}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <h4 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                {relatedCourse.title}
                                            </h4>

                                            <p className="text-sm text-muted-foreground mb-2">
                                                {relatedCourse.instructor.name}
                                            </p>

                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-medium text-sm">{relatedCourse.rating}</span>
                                                </div>
                                                <span className="text-muted-foreground">•</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {relatedCourse.students.toLocaleString()} students
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-lg font-bold text-primary">
                                                        ${relatedCourse.price}
                                                    </span>
                                                    {relatedCourse.originalPrice && (
                                                        <span className="text-muted-foreground line-through text-sm">
                                                            ${relatedCourse.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Card>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
