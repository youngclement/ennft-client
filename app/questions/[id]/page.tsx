'use client';

import QuestionDetailWrapper from '@/components/questions/QuestionDetailWrapper';
import { useGetQuestionById } from '@/lib/hooks/useGetQuestionById';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function QuestionPage({ params }: { params: { id: string } }) {
  const questionId = BigInt(params.id);

  const { question, error, isLoading } = useGetQuestionById(questionId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span>Loading question...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Error Loading Question</h1>
        <p className="text-muted-foreground">
          {error.message || 'An unexpected error occurred'}
        </p>
      </div>
    );
  }

  if (!question) {
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
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionDetailWrapper question={question} />
    </Suspense>
  );
}
