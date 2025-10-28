"use client";

import { useState } from 'react';
import { QuestionsHeader } from '@/components/questions/QuestionsHeader';
import { QuestionFilters } from '@/components/questions/QuestionFilters';
import QuestionsList from '@/components/questions/QuestionsList';
import { QuestionsSort } from '@/components/questions/QuestionsSort';
import { useGetQuestions } from '@/lib/hooks/useGetQuestions';
import { Card } from '@/components/ui/card';

export default function QuestionsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Recent');
  const { isLoading } = useGetQuestions();

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <QuestionsHeader />
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-8">
        <QuestionFilters onFilterChange={handleFilterChange} />
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeleton similar to FeaturedQuestions
            Array(5).fill(0).map((_, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-6">
                  <div className="h-12 w-12 bg-muted rounded-md animate-pulse"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="flex gap-2 mt-2">
                      <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 bg-muted rounded w-1/2 animate-pulse mt-2"></div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <QuestionsList filter={selectedFilter} />
          )}
        </div>
      </div>
    </div>
  );
}