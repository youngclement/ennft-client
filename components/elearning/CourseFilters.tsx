'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { courseCategories, courseLevels, sortOptions } from '@/lib/data/mock-courses';

interface CourseFiltersProps {
    onFiltersChange: (filters: {
        search: string;
        category: string;
        level: string;
        sort: string;
    }) => void;
}

export function CourseFilters({ onFiltersChange }: CourseFiltersProps) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [level, setLevel] = useState('All Levels');
    const [sort, setSort] = useState('newest');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleFilterChange = () => {
        onFiltersChange({
            search,
            category,
            level,
            sort,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('All Categories');
        setLevel('All Levels');
        setSort('newest');
        onFiltersChange({
            search: '',
            category: 'All Categories',
            level: 'All Levels',
            sort: 'newest',
        });
    };

    const hasActiveFilters = search || category !== 'All Categories' || level !== 'All Levels';

    return (
        <div className="bg-background border border-border rounded-lg p-4 mb-6">
            {/* Search and Sort Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            handleFilterChange();
                        }}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2">
                    <Select value={sort} onValueChange={(value) => {
                        setSort(value);
                        handleFilterChange();
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className="flex items-center gap-2"
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                        {hasActiveFilters && (
                            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {(search ? 1 : 0) + (category !== 'All Categories' ? 1 : 0) + (level !== 'All Levels' ? 1 : 0)}
                            </Badge>
                        )}
                    </Button>
                </div>
            </div>

            {/* Expandable Filters */}
            {isFiltersOpen && (
                <div className="border-t border-border pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Category</label>
                            <Select value={category} onValueChange={(value) => {
                                setCategory(value);
                                handleFilterChange();
                            }}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {courseCategories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Level</label>
                            <Select value={level} onValueChange={(value) => {
                                setLevel(value);
                                handleFilterChange();
                            }}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {courseLevels.map((lvl) => (
                                        <SelectItem key={lvl} value={lvl}>
                                            {lvl}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="text-sm font-medium mb-2 block">Price Range</label>
                            <div className="flex gap-2">
                                <Select defaultValue="all">
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Price" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Prices</SelectItem>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="under-50">Under $50</SelectItem>
                                        <SelectItem value="50-100">$50 - $100</SelectItem>
                                        <SelectItem value="over-100">Over $100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Active filters:</span>
                            {search && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    Search: {search}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => {
                                            setSearch('');
                                            handleFilterChange();
                                        }}
                                    />
                                </Badge>
                            )}
                            {category !== 'All Categories' && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    {category}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => {
                                            setCategory('All Categories');
                                            handleFilterChange();
                                        }}
                                    />
                                </Badge>
                            )}
                            {level !== 'All Levels' && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    {level}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => {
                                            setLevel('All Levels');
                                            handleFilterChange();
                                        }}
                                    />
                                </Badge>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Clear all
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
