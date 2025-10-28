'use client';

import { Card } from '@/components/ui/card';
import { QuestionBounty } from './QuestionBounty';
import { QuestionContent } from './QuestionContent';
import { QuestionGuidelines } from './QuestionGuidelines';
import { QuestionMetadata } from './QuestionMetadata';
import { QuestionTags } from './QuestionTags';

import { Separator } from '@/components/ui/separator';
import { ContractQuestion, MergedQuestion } from '@/lib/hooks/useGetQuestions';
import { Question } from '@/lib/types/SmartContractType';
import { Address } from 'viem';

interface QuestionDetailProps {
  question: MergedQuestion;
  answersCount: number;
}

export default function QuestionDetail({
  question,
  answersCount,
}: QuestionDetailProps) {
  return (
    <div className="max-w-4xl w-full mx-auto ">
      <Card className="p-8 shadow-lg border-t-4 border-t-primary">
        <div className="space-y-8">
          {/* Question Header */}
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">
                {question.questionText}
              </h1>
              <QuestionMetadata
                author={{
                  address: question.asker as Address,
                  reputation: 750,
                  avatar: 'https://i.pravatar.cc/150?u=asker',
                }}
                createdAt={new Date(Number(question.createdAt) * 1000)}
              />
            </div>
            <QuestionBounty amount={question.rewardAmount} />
          </div>

          <Separator />

          {/* Question Content */}
          <QuestionContent content={question.questionContent} />

          {/* Tags */}
          <QuestionTags
            tags={
              question.category?.split(',') || [
                'solidity',
                'ethereum',
                'smart-contracts',
                'security',
                'gas-optimization',
              ]
            }
          />

          {/* <Separator /> */}

          <QuestionGuidelines />
        </div>
      </Card>
    </div>
  );
}
