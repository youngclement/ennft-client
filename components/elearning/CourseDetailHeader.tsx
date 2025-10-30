'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Star,
    Clock,
    Users,
    BookOpen,
    Award,
    Share2,
    Heart,
    ShoppingCart,
    Play,
    CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/lib/data/mock-courses';

interface CourseDetailHeaderProps {
    course: Course;
    isEnrolled?: boolean;
    onEnroll?: () => void;
}

export function CourseDetailHeader({ course, isEnrolled = false, onEnroll }: CourseDetailHeaderProps) {
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const discountPercentage = course.originalPrice
        ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
        : 0;

    return (
        <div className="relative">
            {/* Background Image */}
            <div className="absolute inset-0 h-96 overflow-hidden rounded-lg">
                <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Info */}
                    <div className="lg:col-span-2 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge className="bg-primary text-primary-foreground">
                                {course.category}
                            </Badge>
                            <Badge variant="outline" className="border-white/20 text-white">
                                {course.level}
                            </Badge>
                            {course.featured && (
                                <Badge className="bg-yellow-500 text-black">
                                    Featured
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {course.title}
                        </h1>

                        <p className="text-lg text-white/90 mb-6 max-w-2xl">
                            {course.subtitle}
                        </p>

                        {/* Instructor */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10">
                                <Image
                                    src={course.instructor.avatar}
                                    alt={course.instructor.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-white">
                                    Created by {course.instructor.name}
                                </p>
                                <p className="text-sm text-white/70">
                                    {course.instructor.students.toLocaleString()} students • {course.instructor.rating} instructor rating
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{course.rating}</span>
                                <span>({course.reviews.toLocaleString()} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <span>{course.students.toLocaleString()} students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>{formatDuration(course.duration)} total</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                <span>{course.sections.length} sections</span>
                            </div>
                        </div>
                    </div>

                    {/* Purchase/Enroll Card */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 shadow-xl bg-background/95 backdrop-blur-sm">
                            <div className="aspect-video relative mb-4 rounded-lg overflow-hidden bg-muted">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <Button size="lg" className="rounded-full">
                                        <Play className="h-6 w-6 mr-2" />
                                        Preview
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-primary">
                                            {formatPrice(course.price)}
                                        </span>
                                        {course.originalPrice && (
                                            <span className="text-muted-foreground line-through">
                                                {formatPrice(course.originalPrice)}
                                            </span>
                                        )}
                                    </div>
                                    {discountPercentage > 0 && (
                                        <Badge className="bg-green-500 text-white">
                                            {discountPercentage}% off
                                        </Badge>
                                    )}
                                </div>

                                {isEnrolled ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCircle className="h-5 w-5" />
                                            <span className="font-medium">Enrolled</span>
                                        </div>
                                        <Button className="w-full" size="lg" asChild>
                                            <Link href={`/elearning/learn/${course.id}/${course.sections[0]?.lessons[0]?.id || '1'}`}>
                                                Continue Learning
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Button className="w-full" size="lg" onClick={onEnroll}>
                                            <ShoppingCart className="h-5 w-5 mr-2" />
                                            Enroll Now
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            Add to Wishlist
                                            <Heart className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                )}

                                <div className="text-center text-sm text-muted-foreground">
                                    30-day money-back guarantee
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <h4 className="font-semibold">This course includes:</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>{formatDuration(course.duration)} on-demand video</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>Full lifetime access</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>Certificate of completion</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>Mobile and TV access</span>
                                        </li>
                                    </ul>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Share
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Heart className="h-4 w-4 mr-2" />
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
