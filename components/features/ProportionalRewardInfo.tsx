'use client';

import { Card } from '@/components/ui/card';
import { ContractAnswer } from '@/lib/hooks/useGetAnswersByQuestionId';
import { DollarSign, PieChart } from 'lucide-react';

interface RewardDistributionProps {
  bountyAmount: number;
  answers: ContractAnswer[];
}

export function ProportionalRewardInfo({
  bountyAmount,
  answers,
}: RewardDistributionProps) {
  // Chuyển đổi upvotes sang number và tính tổng số vote
  const totalVotes = answers.reduce(
    (sum, answer) => sum + Number(answer.upvotes),
    0
  );

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <PieChart className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Reward Distribution</h3>
      </div>

      <div className="space-y-3">
        {answers.map((answer) => {
          // Chuyển đổi upvotes sang number
          const votes = Number(answer.upvotes);

          const percentage = totalVotes ? (votes / totalVotes) * 100 : 0;

          const reward = Math.round((bountyAmount * percentage) / 100);

          return (
            <div key={answer.id.toString()} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{answer.responder}</span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4" />
                  {reward}
                </span>
              </div>
              {/* <Progress value={percentage} className="h-2" /> */}
              <div className="text-xs text-muted-foreground text-right">
                {percentage.toFixed(1)}% of total votes
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-sm text-muted-foreground pt-2 border-t">
        Rewards are distributed proportionally based on upvotes
      </div>
    </Card>
  );
}
