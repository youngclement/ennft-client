'use client';

import { Info } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

interface MinimumFeeInfoProps {
  minimumFee: number;
  userReputation: number;
}

export function MinimumFeeInfo({
  minimumFee,
  userReputation,
}: MinimumFeeInfoProps) {
  const getDiscountedFee = () => {
    if (userReputation >= 1000) return minimumFee * 0.5;
    if (userReputation >= 500) return minimumFee * 0.75;
    return minimumFee;
  };

  return (
    <Alert>
      <Info className="h-4 w-4" />
      <div className="ml-2">
        <p className="font-medium">Minimum Question Fee: 0.01 tokens</p>
        {userReputation >= 500 && (
          <p className="text-sm text-muted-foreground mt-1">
            You receive a {userReputation >= 1000 ? '50%' : '25%'} discount
            based on your reputation!
          </p>
        )}
      </div>
    </Alert>
  );
}
