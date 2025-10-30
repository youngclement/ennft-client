"use client";

import { useState, useMemo } from "react";
import { QuestionsHeader } from "@/components/questions/QuestionsHeader";
import { QuestionFilters } from "@/components/questions/QuestionFilters";
import QuestionsList from "@/components/questions/QuestionsList";
import { QuestionsSort } from "@/components/questions/QuestionsSort";
import { questions } from "@/lib/data/mock-questions";
import { Card } from "@/components/ui/card";

export default function QuestionsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("Recent");
  const [selectedSort, setSelectedSort] = useState<string>("newest");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
  };

  // Mock data processing - convert to expected format
  const mockQuestionsData = useMemo(() => {
    let filteredQuestions = questions.map(q => ({
      id: BigInt(q.id),
      asker: q.asker,
      questionDetailId: q.id,
      rewardAmount: BigInt(q.rewardAmount),
      createdAt: BigInt(q.createdAt),
      deadline: BigInt(new Date(q.deadline).getTime()),
      isClosed: q.isClosed,
      chosenAnswerId: BigInt(q.chosenAnswerId),
      questionText: q.questionText,
      questionContent: q.questionContent,
      category: q.category,
    }));

    // Apply filters
    if (selectedFilter === "Recent") {
      // Show all questions
    } else if (selectedFilter === "Most Voted") {
      // Mock filter - show questions with higher rewards
      filteredQuestions = filteredQuestions.filter(q => q.rewardAmount > BigInt(70));
    } else if (selectedFilter === "Highest Bounty") {
      filteredQuestions = filteredQuestions.filter(q => q.rewardAmount > BigInt(70));
    } else if (selectedFilter === "Unanswered") {
      filteredQuestions = filteredQuestions.filter(q => !q.isClosed);
    } else {
      // Filter by category/tag
      filteredQuestions = filteredQuestions.filter(q =>
        q.category.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    // Apply sorting
    filteredQuestions.sort((a, b) => {
      if (selectedSort === 'newest') {
        return Number(b.createdAt) - Number(a.createdAt);
      } else if (selectedSort === 'bounty') {
        return Number(b.rewardAmount) - Number(a.rewardAmount);
      } else if (selectedSort === 'oldest') {
        return Number(a.createdAt) - Number(b.createdAt);
      }
      return 0;
    });

    return filteredQuestions;
  }, [selectedFilter, selectedSort]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <QuestionsHeader />
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-8">
        <QuestionFilters onFilterChange={handleFilterChange} />
        <div className="space-y-4">
          <QuestionsList
            filter={selectedFilter}
            sortOption={selectedSort}
            onSortChange={handleSortChange}
            mockData={mockQuestionsData}
            useMockOnly={true}
          />
        </div>
      </div>
    </div>
  );
}
