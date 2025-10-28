'use client';

import { Card } from '@/components/ui/card';
import { useReputation } from '@/lib/hooks/useReputation';
import { CircleDollarSign, Shield, TrendingUp } from 'lucide-react';

export function ReputationDisplay() {
  const { reputation, getDiscountRate, getTrustLevel } = useReputation();
  const discountPercent = (1 - getDiscountRate()) * 100;
  const nextTier = reputation >= 1000 ? null : reputation >= 500 ? 1000 : 500;
  const progress = nextTier ? (reputation / nextTier) * 100 : 100;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">{getTrustLevel()}</h3>
          <p className="text-sm text-muted-foreground">
            {reputation} reputation points
          </p>
        </div>
      </div>

      {nextTier && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next tier</span>
            <span>{nextTier - reputation} points needed</span>
          </div>
          {/* <Progress value={progress} className="h-2" /> */}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Trust Score</span>
          </div>
          <p className="text-2xl font-bold">
            {Math.min(100, Math.floor(reputation / 10))}%
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Fee Discount</span>
          </div>
          <p className="text-2xl font-bold">{discountPercent}%</p>
        </div>
      </div>
    </Card>
  );
}
