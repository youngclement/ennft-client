'use client';

import { cn } from '@/lib/utils';
import { ChevronsUp, CircleDollarSign, MessageSquare } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';

interface QuestionStatsProps {
  votes: number;
  answers: number;
  bounty: number;
  questionId?: string; // Add questionId to fetch answers count
}

export function QuestionStats({ votes, answers: initialAnswers, bounty, questionId }: QuestionStatsProps) {
  const [answerCount, setAnswerCount] = useState<number>(initialAnswers);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch answer count when component mounts or when questionId changes
  useEffect(() => {
    if (!questionId) return;

    const fetchAnswerCount = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/questions/${questionId}/answerCount`);
        if (response.ok) {
          const data = await response.json();
          setAnswerCount(data.count || 0);
        }
      } catch (error) {
        console.error(`Failed to fetch answer count for question ${questionId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswerCount();
  }, [questionId]);

  return (
    <div className="flex flex-col items-center gap-4 text-muted-foreground">
      <StatItem icon={ChevronsUp} value={votes + ''} label="votes" />
      <StatItem
        icon={MessageSquare}
        value={isLoading ? '...' : answerCount + ''}
        label="answers"
        className={cn(answerCount > 0 && 'text-primary')}
      />
      <StatItem
        icon={CircleDollarSign}
        value={bounty.toFixed(2)}
        fullValue={bounty.toFixed(20).replace(/\.?0+$/, '')} // Bỏ số 0 dư
        label="bounty"
        className="text-primary"
      />
    </div>
  );
}

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  fullValue?: string;
  label: string;
  className?: string;
}

function StatItem({
  icon: Icon,
  value,
  fullValue,
  label,
  className,
}: StatItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'text-center transition-colors duration-200',
              className
            )}
          >
            <Icon className="h-5 w-5 mx-auto mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="text-sm font-medium">{value}</span>
            <span className="sr-only">{label}</span>
          </div>
        </TooltipTrigger>
        {fullValue && (
          <TooltipContent>
            <span>{fullValue}</span>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}