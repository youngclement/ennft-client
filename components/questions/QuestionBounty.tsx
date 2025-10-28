'use client';

import { CircleDollarSign } from 'lucide-react';
import { formatEther } from 'viem';

interface QuestionBountyProps {
  amount: bigint;
}

export function QuestionBounty({ amount }: QuestionBountyProps) {
  return (
    <div className="text-center">
      <div className="bg-primary/10 rounded-full p-4 mb-2">
        <CircleDollarSign className="h-8 w-8 text-primary" />
      </div>
      <div className="font-semibold text-xl">{Number(formatEther(amount))}</div>
      <div className="text-sm text-muted-foreground">tokens</div>
    </div>
  );
}
