'use client';

import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProgressBar } from '../ui/progress';

interface AutoSelectTimerProps {
  deadline: string;
  onDeadlineReached?: () => void;
}

export function AutoSelectTimer({
  deadline,
  onDeadlineReached,
}: AutoSelectTimerProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const deadlineTime = new Date(deadline).getTime();
    if (isNaN(deadlineTime)) {
      setTimeLeft('Invalid deadline');
      return;
    }

    const startTime = Date.now();
    const totalDuration = deadlineTime - startTime;

    if (totalDuration <= 0) {
      setTimeLeft('Time expired');
      setProgress(100);
      onDeadlineReached?.();
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const distance = deadlineTime - now;

      if (distance <= 0) {
        setTimeLeft('Time expired');
        setProgress(100);
        onDeadlineReached?.();
        return;
      }

      // Format thời gian linh hoạt
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }

      const elapsedTime = totalDuration - distance;
      setProgress(Math.min(100, (elapsedTime / totalDuration) * 100));
    };

    updateTimer(); // Chạy ngay lần đầu
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [deadline, onDeadlineReached]);

  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Auto-select deadline</span>
      </div>
      <div className="flex items-center gap-4">
        <ProgressBar value={progress} />
        <span className="text-sm font-medium whitespace-nowrap">
          {timeLeft}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Best answer will be auto-selected when timer expires
      </p>
    </Card>
  );
}
