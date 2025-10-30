// components/leaderboard-table.tsx
'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Trophy,
  Medal,
  Award,
  Zap,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { ReputationBadge } from '@/components/features/ReputationBadge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProgressBar } from '../ui/progress';
import { Button } from '@/components/ui/button';
import { mockLeaderboard } from '@/lib/data/mock-leaderboard';

export function LeaderboardTable() {
  const leaderboardData = mockLeaderboard;

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <Card className="p-8 border-0 shadow-2xl bg-card/90 backdrop-blur-md rounded-2xl">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-destructive/10">
            <span className="text-destructive text-2xl">!</span>
          </div>
          <p className="text-center text-destructive font-medium">
            No leaderboard data available.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-muted/50 backdrop-blur-md rounded-2xl overflow-hidden">
      <div className="p-5 pb-4 bg-gradient-to-r from-primary/5 via-accent/5 to-transparent border-b border-border/50">
        <div className="flex items-center">
          <div className="relative mr-4">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-sm opacity-60"></div>
            <Trophy className="h-7 w-7 text-primary relative drop-shadow-md" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight leading-tight flex items-center">
              Top Contributors
              <span className="ml-2 text-xs font-normal px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                Leaderboard
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5 opacity-90">
              Recognizing our community's leading innovators and problem solvers
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-border">
              <TableHead className="w-16 text-foreground font-bold">
                Rank
              </TableHead>
              <TableHead className="text-foreground font-bold">User</TableHead>
              <TableHead className="text-foreground font-bold">
                Contributions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow
                key={entry.user.id}
                className={cn(
                  'group transition-all duration-300 hover:bg-primary/5',
                  entry.rank <= 3
                    ? 'bg-gradient-to-r from-primary/10 to-transparent'
                    : ''
                )}
              >
                <TableCell className="font-medium w-16 py-3">
                  <div className="flex justify-center items-center gap-2">
                    {entry.rank <= 3 ? (
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.2,
                        }}
                        transition={{ duration: 0.5 }}
                        className="drop-shadow-lg"
                      >
                        <RankIcon rank={entry.rank} />
                      </motion.div>
                    ) : (
                      <span className="text-muted-foreground font-semibold text-base">
                        {entry.rank}
                      </span>
                    )}
                    {entry.change !== 0 && (
                      <span className={cn(
                        'text-xs font-bold px-1.5 py-0.5 rounded-full',
                        entry.change > 0
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      )}>
                        {entry.change > 0 ? '↑' : '↓'}{Math.abs(entry.change)}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Avatar
                        className={cn(
                          'h-10 w-10 ring-2 ring-offset-1 transition-all duration-300 group-hover:ring-offset-2 shadow-md',
                          entry.rank === 1
                            ? 'ring-primary/70 group-hover:ring-primary'
                            : entry.rank === 2
                              ? 'ring-secondary/70 group-hover:ring-secondary'
                              : entry.rank === 3
                                ? 'ring-accent/70 group-hover:ring-accent'
                                : 'ring-muted-foreground/30 group-hover:ring-muted-foreground/50'
                        )}
                      >
                        <AvatarImage
                          src={entry.user.avatar}
                          alt={entry.user.displayName}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-muted to-muted/70 text-muted-foreground font-bold">
                          {entry.user.displayName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>

                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2 text-base">
                        {entry.user.displayName}
                        <span className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                          entry.user.isOnline
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        )}>
                          <span className={cn(
                            'w-1.5 h-1.5 rounded-full mr-1',
                            entry.user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                          )} />
                          {entry.user.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <span>@{entry.user.username}</span>
                        {entry.user.country && <span>• {entry.user.country}</span>}
                        <span>• Level {entry.user.level}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">
                        Reputation
                      </span>
                      <span className="font-bold text-primary">
                        {entry.user.reputation.toLocaleString()}
                      </span>
                    </div>
                    <ProgressBar
                      value={(entry.user.reputation / 600) * 100}
                    />
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {entry.user.stats.answersGiven} answers
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {entry.user.stats.questionsSolved} solved
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        {entry.user.stats.challengesCompleted} challenges
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {entry.user.badges.length} badges
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Showing top {leaderboardData.length} contributors
          </p>
        </div>
      </div>
    </Card>
  );
}

function RankIcon({ rank }: { rank: number }) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-slate-300" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-700" />;
    default:
      return null;
  }
}

function ActivityIcons({
  answers,
  solutions,
}: {
  answers: number;
  solutions: number;
}) {
  return (
    <>
      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
        <MessageCircle className="h-4 w-4 text-primary" />
        <span>{answers}</span>
      </span>
      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
        <Zap className="h-4 w-4 text-accent" />
        <span>{solutions}</span>
      </span>
    </>
  );
}

function getContributionLevel(reputation: number): string {
  if (reputation >= 15000) return 'Expert';
  if (reputation >= 10000) return 'Advanced';
  if (reputation >= 5000) return 'Intermediate';
  return 'Beginner';
}

function getProgressValue(reputation: number): number {
  if (reputation >= 15000) return 100;
  if (reputation >= 10000) return 75;
  if (reputation >= 5000) return 50;
  return 25;
}

function getLevelColor(reputation: number): string {
  if (reputation >= 15000) return 'bg-accent/20 text-accent';
  if (reputation >= 10000) return 'bg-primary/20 text-primary';
  if (reputation >= 5000) return 'bg-secondary/20 text-secondary';
  return 'bg-muted text-muted-foreground';
}

function getLevelProgressColor(reputation: number): string {
  if (reputation >= 15000) return 'bg-accent';
  if (reputation >= 10000) return 'bg-primary';
  if (reputation >= 5000) return 'bg-secondary';
  return 'bg-muted-foreground';
}
