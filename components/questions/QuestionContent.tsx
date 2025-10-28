'use client';

import { AnswerContent } from './AnswerContent';

interface QuestionContentProps {
  content: string;
  className?: string;
}

export function QuestionContent({ content, className }: QuestionContentProps) {
  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <AnswerContent content={content} />
    </div>
  );
}
