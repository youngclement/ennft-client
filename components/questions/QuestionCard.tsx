'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import CustomAvatar from '../users/CustomAvatar';
import { QuestionContent } from './QuestionContent';
import { QuestionStats } from './QuestionStats';
import { useState, useEffect } from 'react';

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    content: string;
    bounty: number;
    answers: number;
    votes: number;
    tags: string[];
    author: string;
    createdAt: Date;
  };
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [answerCount, setAnswerCount] = useState<number>(question.answers || 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch answer count when component mounts
  useEffect(() => {
    const fetchAnswerCount = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/questions/${question.id}/answerCount`);
        if (response.ok) {
          const data = await response.json();
          setAnswerCount(data.count || 0);
        }
      } catch (error) {
        console.error(`Failed to fetch answer count for question ${question.id}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswerCount();
  }, [question.id]);

  return (
    <Card className="group p-6 transition-all duration-300 bg-background hover:bg-accent/50 shadow-sm hover:shadow-md rounded-lg border border-border">
      <div className="flex gap-6">
        <QuestionStats
          votes={question.votes}
          answers={answerCount}
          bounty={question.bounty}
          questionId={question.id}
        />

        <Link
          href={`/questions/${question.id}`}
          className="cursor-pointer block w-full"
        >
          <div className="space-y-4">
            <div>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-xl font-semibold text-foreground/90 hover:text-primary transition-colors duration-200 overflow-hidden text-ellipsis whitespace-nowrap">
                    {question.title}
                  </span>
                </TooltipTrigger>
                <TooltipContent align="start">
                  <Button
                    variant="ghost"
                    className="py-2 px-4 bg-background border border-neutral-300 dark:border-neutral-700 shadow-md"
                  >
                    {question.title}
                  </Button>
                </TooltipContent>
              </Tooltip>

              <QuestionContent
                content={question.content}
                className="line-clamp-3 font-medium text-muted-foreground text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {question.tags?.map((tag) => (
                <Link key={tag} href={`/questions/tagged/${tag}`}>
                  <Badge
                    variant="secondary"
                    className="bg-secondary/50 hover:bg-secondary/70 transition-colors duration-200 px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground w-full">
              <div className="flex items-center gap-2 flex-1">
                <div className="h-8 w-8">
                  <CustomAvatar address={question.author} size={32} />
                </div>
                <Link
                  href={`/users/${question.author}`}
                  className="hover:text-foreground font-medium transition-colors duration-200"
                >
                  {question.author.substring(0, 6)}...
                  {question.author.slice(-4)}
                </Link>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Clock className="h-4 w-4" />
                <span>
                  {question.createdAt &&
                    formatDistanceToNow(question.createdAt)}{' '}
                  ago
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Card>
  );
}