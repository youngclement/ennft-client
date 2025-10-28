'use client';

import { ProportionalRewardInfo } from '@/components/features/ProportionalRewardInfo';
import { ReputationBadge } from '@/components/features/ReputationBadge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/lib/hooks/use-toast';
import { useAnswer } from '@/lib/hooks/useAnswer';
import { useGetAnswersByQuestionId } from '@/lib/hooks/useGetAnswersByQuestionId';
import { MergedQuestion } from '@/lib/hooks/useGetQuestions';
import { useReputation } from '@/lib/hooks/useReputation';
import { useEffect, useRef, useState } from 'react';
import { Address, formatEther } from 'viem';
import { Award, CircleDollarSign, Shield, Clock } from 'lucide-react';
import { AnswerEditor } from './AnswerEditor';
import AnswersList from './AnswersList';
import QuestionDetail from './QuestionDetail';
import dynamic from 'next/dynamic';
import { ProgressBar } from '../ui/progress';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { QuestionMetadata } from './QuestionMetadata';

// Helper function to shorten Ethereum addresses
function shortenEthAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const AutoSelectTimer = dynamic(
  () =>
    import('@/components/features/AutoSelectTimer').then(
      (mod) => mod.AutoSelectTimer
    ),
  { ssr: false }
);

interface QuestionDetailWrapperProps {
  question: MergedQuestion;
}

export default function QuestionDetailWrapper({
  question,
}: QuestionDetailWrapperProps) {
  const { toast } = useToast();
  const { submitAnswer } = useAnswer();
  const [isSubmittingCase, setIsSubmittingCase] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const { reputation, getTrustLevel, getDiscountRate } = useReputation();

  // Sử dụng hook để lấy danh sách answers
  const {
    answers,
    totalAnswers,
    totalPages,
    currentPage,
    isLoading,
    error,
    changePage,
  } = useGetAnswersByQuestionId(BigInt(question.id));

  // Add scroll event listener for question card
  useEffect(() => {
    const questionCard = questionCardRef.current;

    if (questionCard) {
      const handleScroll = () => {
        setIsScrolled(questionCard.scrollTop > 100);
      };

      questionCard.addEventListener('scroll', handleScroll);
      return () => questionCard.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSubmitAnswer = async (content: string) => {
    try {
      await submitAnswer({
        questionId: BigInt(question.id),
        answerText: content,
        parentAnswerId: BigInt(0),
      });

      toast({
        title: 'Answer Submitted Successfully',
        description: 'Your answer has been posted to the blockchain.',
        variant: 'default',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Unable to submit your answer. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  const handleArbitrationSubmit = async (description: string) => {
    try {
      setIsSubmittingCase(true);
      console.log('Submitting arbitration case:', description);

      toast({
        title: 'Arbitration Case Submitted',
        description: 'Your arbitration case is being processed.',
        variant: 'default',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Unable to submit arbitration case. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setIsSubmittingCase(false);
    }
  };

  // Calculate next reputation tier
  const nextTier = reputation >= 1000 ? null : reputation >= 500 ? 1000 : 500;
  const progress = nextTier ? (reputation / nextTier) * 100 : 100;
  const discountPercent = (1 - getDiscountRate()) * 100;

  // Format timestamps for display
  const formattedTimestamp = question.createdAt
    ? formatDistanceToNow(new Date(Number(question.createdAt) * 1000), { addSuffix: true })
    : 'Unknown date';

  return (
    <div className="max-w-6xl mx-auto my-2 space-y-8">
      {/* Main content layout with question and sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        {/* Question detail card with max height and scroll */}
        <Card className="p-6 bg-card relative">
          {/* Sticky header that appears when scrolled */}
          <div
            className={`sticky top-0 z-10 bg-card pb-3 transition-all duration-300 ${isScrolled
              ? 'opacity-100 border-b shadow-sm'
              : 'opacity-0 -translate-y-2'
              }`}
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold line-clamp-1">{question.questionText}</h3>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <QuestionMetadata

                    author={{
                      address: question.asker as Address,
                      reputation: 750,
                      avatar: 'https://i.pravatar.cc/150?u=asker',
                    }}
                    createdAt={new Date(Number(question.createdAt) * 1000)}
                  />

                </div>

              </div>
            </div>
          </div>

          <div ref={questionCardRef} className="absolute top-6 max-h-[500px] overflow-y-auto pr-2">
            <QuestionDetail question={question} answersCount={totalAnswers} />
          </div>
        </Card>

        {/* Right sidebar with info cards */}
        <div className="space-y-4">
          <Card className="p-4 bg-primary/5 border border-primary/20">
            <h3 className="font-semibold text-sm mb-2 text-primary">Auto-Select Deadline</h3>
            <AutoSelectTimer
              deadline={new Date(Number(question.deadline) * 1000).toISOString()}
              onDeadlineReached={() => console.log('Deadline reached')}
            />
          </Card>

          <Card className="p-4 bg-card border">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Reputation</h3>
              </div>
              <ReputationBadge points={reputation} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current Level: {getTrustLevel()}</span>
                <span>{discountPercent > 0 ? `${discountPercent}% Fee Discount` : 'No Discount'}</span>
              </div>

              {nextTier && (
                <>
                  <ProgressBar value={progress} />
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>{reputation} RP</span>
                    <span>{nextTier} RP needed for next level</span>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="p-4 bg-card border">
            <div className="flex items-center gap-2 mb-3">
              <CircleDollarSign className="h-4 w-4 text-green-600" />
              <h3 className="font-semibold text-sm">Reward</h3>
            </div>
            <div className="text-xl font-bold text-green-600">
              {formatEther(question.rewardAmount)} ETH
            </div>
            <div className="mt-2 space-y-2">
              <p className="text-xs text-muted-foreground">
                Will be distributed among top answers based on votes
              </p>
              {answers.length > 0 && (
                <div className="flex justify-between text-xs">
                  <span>Answers competing:</span>
                  <span className="font-medium">{answers.length}</span>
                </div>
              )}
              {question.deadline && (
                <div className="flex justify-between text-xs">
                  <span>Auto-selection on:</span>
                  <span className="font-medium">
                    {new Date(Number(question.deadline) * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Reward distribution info */}
      {!question.isClosed && answers.length > 0 && (
        <Card className="p-6 bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Current Reward Distribution</h3>
          </div>
          <ProportionalRewardInfo
            bountyAmount={Number(formatEther(question.rewardAmount))}
            answers={answers}
          />
        </Card>
      )}

      <Separator className="my-6" />

      {/* Answer editor for non-closed questions */}
      {!question.isClosed && (
        <Card className="p-6 border bg-card">
          <h3 className="font-semibold mb-3">Your Answer</h3>
          <AnswerEditor
            questionId={question.id + ''}
            onSubmit={handleSubmitAnswer}
          />
        </Card>
      )}

      {/* Answers list section */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          {totalAnswers} {totalAnswers === 1 ? 'Answer' : 'Answers'}
        </h2>
        <AnswersList
          answers={answers}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={changePage}
          isLoading={isLoading}
          error={error}
          bestAnswer={question.chosenAnswerId}
          questionAsker={question.asker}
          questionId={BigInt(question.id)}
          questionIsClosed={question.isClosed}
        />
      </div>
    </div>
  );
}