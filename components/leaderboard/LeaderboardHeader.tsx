'use client';

import { Trophy, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MatrixText from '@/components/kokonutui/matrix-text';
import { useEffect, useState } from 'react';

export function LeaderboardHeader() {
  const [key, setKey] = useState(0);

  // Effect to periodically trigger animation
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 10000); // Repeat every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div className="h-16 flex items-center">
            <MatrixText
              key={key}
              text="Leaderboard"
              className="!min-h-0 !h-16 py-2 text-3xl font-extrabold text-foreground grayscale"
              letterAnimationDuration={300}
              letterInterval={50}
              initialDelay={1000}
            />
          </div>
        </div>
        <p className="text-muted-foreground max-w-md">
          Recognizing our top contributors and their remarkable achievements in
          helping our community grow
        </p>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9 w-full md:w-[220px]"
          />
        </div>
        <Button variant="outline">This Week</Button>
      </div>
    </div>
  );
}
