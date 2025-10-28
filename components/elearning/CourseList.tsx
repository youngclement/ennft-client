'use client';

import { useState, useMemo, useEffect } from 'react';
import { CourseCard } from './CourseCard';
import { CourseFilters } from './CourseFilters';
import { mockCourses, Course } from '@/lib/data/mock-courses';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

interface CourseListProps {
    initialCourses?: Course[];
    selectedCategory?: string;
}

export function CourseList({ initialCourses = mockCourses, selectedCategory }: CourseListProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filters, setFilters] = useState({
        search: '',
        category: selectedCategory || 'All Categories',
        level: 'All Levels',
        sort: 'newest',
    });

    const filteredAndSortedCourses = useMemo(() => {
        let filtered = initialCourses.filter((course) => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    course.title.toLowerCase().includes(searchLower) ||
                    course.subtitle.toLowerCase().includes(searchLower) ||
                    course.description.toLowerCase().includes(searchLower) ||
                    course.instructor.name.toLowerCase().includes(searchLower) ||
                    course.tags.some(tag => tag.toLowerCase().includes(searchLower));

                if (!matchesSearch) return false;
            }

            // Category filter
            if (filters.category !== 'All Categories' && course.category !== filters.category) {
                return false;
            }

            // Level filter
            if (filters.level !== 'All Levels' && course.level !== filters.level.toLowerCase()) {
                return false;
            }

            return true;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (filters.sort) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                    return b.students - a.students;
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [initialCourses, filters]);

    // Update filters when selectedCategory changes
    useEffect(() => {
        if (selectedCategory) {
            setFilters(prev => ({
                ...prev,
                category: selectedCategory
            }));
        }
    }, [selectedCategory]);

    const featuredCourses = filteredAndSortedCourses.filter(course => course.featured);
    const regularCourses = filteredAndSortedCourses.filter(course => !course.featured);

    return (
        <div>
            <CourseFilters onFiltersChange={setFilters} />

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">
                        {filteredAndSortedCourses.length} Course{filteredAndSortedCourses.length !== 1 ? 's' : ''} Found
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Featured Courses */}
            {featuredCourses.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-xl font-semibold mb-6">Featured Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} variant="featured" />
                        ))}
                    </div>
                </div>
            )}

            {/* Regular Courses */}
            {regularCourses.length > 0 && (
                <div>
                    {featuredCourses.length > 0 && (
                        <h3 className="text-xl font-semibold mb-6">All Courses</h3>
                    )}
                    <div
                        className={
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                : 'space-y-4'
                        }
                    >
                        {regularCourses.map((course) => (
                            <CourseCard key={course.id} course={course} variant={viewMode === 'list' ? 'default' : 'default'} />
                        ))}
                    </div>
                </div>
            )}

            {/* No Results */}
            {filteredAndSortedCourses.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                        <p>Try adjusting your filters or search terms</p>
                    </div>
                    <Button
                        onClick={() => setFilters({
                            search: '',
                            category: 'All Categories',
                            level: 'All Levels',
                            sort: 'newest',
                        })}
                        variant="outline"
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
}
