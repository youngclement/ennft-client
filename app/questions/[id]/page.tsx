"use client";

import QuestionDetailWrapper from '@/components/questions/QuestionDetailWrapper';
import { questions, mockAnswers } from '@/lib/data/mock-questions';
import { useMemo } from 'react';

export default function QuestionPage({ params }: { params: { id: string } }) {
  const questionId = params.id;

  // Find mock question data
  const mockQuestion = useMemo(() => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return null;

    return {
      id: BigInt(question.id),
      asker: question.asker,
      questionDetailId: question.id,
      rewardAmount: BigInt(question.rewardAmount),
      createdAt: BigInt(question.createdAt),
      deadline: BigInt(new Date(question.deadline).getTime()),
      isClosed: question.isClosed,
      chosenAnswerId: BigInt(question.chosenAnswerId),
      questionText: question.questionText,
      questionContent: question.questionContent,
      category: question.category,
    };
  }, [questionId]);

  // Get mock answers for this question
  const mockQuestionAnswers = useMemo(() => {
    return mockAnswers[questionId] || [];
  }, [questionId]);

  if (!mockQuestion) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Question Not Found</h1>
        <p className="text-muted-foreground">
          The question you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <QuestionDetailWrapper
      question={mockQuestion}
      mockAnswers={mockQuestionAnswers}
      useMockOnly={true}
    />
  );
}
