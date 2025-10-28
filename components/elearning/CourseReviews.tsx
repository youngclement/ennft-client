'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Review } from '@/lib/data/mock-courses';
import { ProgressBar } from '../ui/progress';

interface CourseReviewsProps {
    reviews: Review[];
    rating: number;
    totalReviews: number;
}

export function CourseReviews({ reviews, rating, totalReviews }: CourseReviewsProps) {
    // Calculate rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
        const count = reviews.filter(review => review.rating === rating).length;
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        return { rating, count, percentage };
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Student Reviews</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Rating Overview */}
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary">{rating}</div>
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-5 w-5 ${star <= Math.floor(rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-muted-foreground'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {totalReviews} reviews
                                </div>
                            </div>
                        </div>

                        {/* Rating Distribution */}
                        <div className="space-y-2">
                            {ratingDistribution.map(({ rating: rate, count, percentage }) => (
                                <div key={rate} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-12">
                                        <span className="text-sm">{rate}</span>
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    </div>
                                    <ProgressBar value={Math.max(1, Math.min(100, percentage))} />
                                    <span className="text-sm text-muted-foreground w-8">
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Review Summary */}
                    <div className="space-y-4">
                        <h4 className="font-medium">Review Summary</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">95%</div>
                                <div className="text-sm text-muted-foreground">Would recommend</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">4.2</div>
                                <div className="text-sm text-muted-foreground">Avg. rating</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Course Quality</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-20 bg-muted rounded-full h-1">
                                        <div className="bg-green-500 h-1 rounded-full w-[85%]" />
                                    </div>
                                    <span>4.5</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Instructor</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-20 bg-muted rounded-full h-1">
                                        <div className="bg-green-500 h-1 rounded-full w-[90%]" />
                                    </div>
                                    <span>4.6</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Content</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-20 bg-muted rounded-full h-1">
                                        <div className="bg-green-500 h-1 rounded-full w-[88%]" />
                                    </div>
                                    <span>4.4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <Card key={review.id} className="p-6">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={review.studentAvatar} alt={review.studentName} />
                                <AvatarFallback>
                                    {review.studentName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-medium">{review.studentName}</h4>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-4 w-4 ${star <= review.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-muted-foreground'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(review.createdAt)}
                                        </span>
                                        <Button variant="ghost" size="sm">
                                            <Flag className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-3">{review.comment}</p>

                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                                        <ThumbsUp className="h-4 w-4 mr-2" />
                                        Helpful ({review.helpful})
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {reviews.length > 5 && (
                <div className="text-center">
                    <Button className="border border-border bg-transparent hover:bg-accent">Load More Reviews</Button>
                </div>
            )}
        </div>
    );
}
