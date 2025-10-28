'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/lib/hooks/use-toast';
import {
  ContractAnswer,
  useGetAnswersByQuestionId,
} from '@/lib/hooks/useGetAnswersByQuestionId';
import { useSelectBestAnswer } from '@/lib/hooks/useSelectBestAnswer';
import { useVoteForAnswer } from '@/lib/hooks/useVoteForAnswer';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, ChevronsUp, Crown, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import { AnswerContent } from './AnswerContent';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { CommentThread } from './CommentThread';
import { AnswerCard } from './AnswerCard';

const mockComments = [
  {
    id: BigInt(1),
    content: 'This is a top level comment',
    author: '0x123...',
    createdAt: BigInt(Math.floor(Date.now() / 1000)),
    parentId: null,
    replies: [
      {
        id: BigInt(2),
        content: 'This is a nested reply',
        author: '0x456...',
        createdAt: BigInt(Math.floor(Date.now() / 1000)),
        parentId: BigInt(1),
        replies: [],
      },
    ],
  },
  {
    id: BigInt(3),
    content: 'Another top level comment',
    author: '0x789...',
    createdAt: BigInt(Math.floor(Date.now() / 1000)),
    parentId: null,
    replies: [],
  },
];

interface AnswersListProps {
  answers: ContractAnswer[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  error?: Error | null;
  questionAsker: string;
  questionId: bigint;
  questionIsClosed: boolean;
  bestAnswer: bigint;
  onUpvote?: (answerId: bigint) => void;
  onAccept?: (answerId: bigint) => void;
}

export default function AnswersList({
  answers,
  totalPages,
  currentPage,
  onPageChange,
  isLoading,
  error,
  onUpvote,
  bestAnswer,
  questionAsker,
  questionId,
  questionIsClosed,
}: AnswersListProps) {
  const [votedAnswers, setVotedAnswers] = useState<Set<bigint>>(new Set());
  const {
    voteForAnswer,
    isPending,
    hash,
    isConfirming,
    isConfirmed,
    error: voteError,
  } = useVoteForAnswer();
  const { selectBestAnswer, isSelecting, isSuccess } = useSelectBestAnswer();
  const { address } = useAccount();
  const { toast } = useToast();

  const handleUpvote = async (answerId: bigint) => {
    if (!votedAnswers.has(answerId)) {
      setVotedAnswers(new Set([...Array.from(votedAnswers), answerId]));
      try {
        await voteForAnswer({ questionId, answerId });
      } catch (err) {
        console.error('Error voting for answer:', err);
        toast({
          title: 'Vote Failed',
          description: 'There was an issue voting for this answer.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleSelectBestAnswer = async (answerId: bigint) => {
    try {
      await selectBestAnswer(questionId, answerId);

      toast({
        title: 'Best Answer Selected',
        description: 'The best answer has been chosen successfully.',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Selection Failed',
        description: 'Unable to select the best answer. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Tách best answer ra khỏi danh sách
  const bestAnswerObj = bestAnswer
    ? answers.find((answer) => answer.id === bestAnswer)
    : null;

  const otherAnswers = bestAnswer
    ? answers.filter((answer) => answer.id !== bestAnswer)
    : answers;

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">Loading answers...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">
          Error loading answers: {error.message}
        </p>
      </Card>
    );
  }

  if (answers.length === 0) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No Answers Yet</h3>
        <p className="text-muted-foreground">
          Be the first to help by providing an answer to this question.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <span>
            {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
          </span>
          <div className="h-px flex-1 bg-border ml-4" />
        </h2>
      </div>

      {/* Best Answer Section */}
      {bestAnswerObj && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Crown className="h-6 w-6 " />
            Best Answer
          </h3>
          <AnswerCard
            key={bestAnswerObj.id.toString()}
            answer={bestAnswerObj}
            hasVoted={votedAnswers.has(bestAnswerObj.id)}
            onUpvote={() => handleUpvote(bestAnswerObj.id)}
            canSelectBestAnswer={false} // Không cho chọn lại best answer
            isBestAnswer={true} // Prop mới để styling
          />
        </div>
      )}

      {/* Other Answers Section */}
      <div className="space-y-6">
        {otherAnswers.map((answer) => (
          <AnswerCard
            key={answer.id.toString()}
            answer={answer}
            hasVoted={votedAnswers.has(answer.id)}
            onUpvote={() => handleUpvote(answer.id)}
            canSelectBestAnswer={
              address?.toLowerCase() === questionAsker?.toLowerCase() &&
              !questionIsClosed
            }
            onSelectBestAnswer={() => handleSelectBestAnswer(answer.id)}
            isSelecting={isSelecting}
            // comments={mockComments} // Add this line
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
