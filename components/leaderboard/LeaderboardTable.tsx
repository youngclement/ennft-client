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
import { useGetUsers } from '@/lib/hooks/useGetUsers';
import { Button } from '@/components/ui/button';
import CustomAvatar from '../users/CustomAvatar';

export function LeaderboardTable() {
  const { users, error, isLoading, pagination, changePage } = useGetUsers(5);

  // Sort users by reputation (highest first) if users array exists
  const sortedUsers = users
    ? [...users].sort((a, b) => Number(b.reputation) - Number(a.reputation))
    : [];

  if (isLoading) {
    return (
      <Card className="p-8 border-0 shadow-2xl bg-card/90 backdrop-blur-md rounded-2xl">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-center text-muted-foreground font-medium">
            Loading leaderboard data...
          </p>
        </div>
      </Card>
    );
  }

  if (error || !sortedUsers || sortedUsers.length === 0) {
    return (
      <Card className="p-8 border-0 shadow-2xl bg-card/90 backdrop-blur-md rounded-2xl">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-destructive/10">
            <span className="text-destructive text-2xl">!</span>
          </div>
          <p className="text-center text-destructive font-medium">
            Error loading leaderboard or no data available.
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
            {sortedUsers.map((user, index) => (
              <TableRow
                key={user.userAddress}
                className={cn(
                  'group transition-all duration-300 hover:bg-primary/5',
                  index < 3
                    ? 'bg-gradient-to-r from-primary/10 to-transparent'
                    : ''
                )}
              >
                <TableCell className="font-medium w-16 py-3">
                  <div className="flex justify-center">
                    {index < 3 ? (
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.2,
                        }}
                        transition={{ duration: 0.5 }}
                        className="drop-shadow-lg"
                      >
                        <RankIcon rank={index + 1} />
                      </motion.div>
                    ) : (
                      <span className="text-muted-foreground font-semibold text-base">
                        {index + 1}
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
                          index === 0
                            ? 'ring-primary/70 group-hover:ring-primary'
                            : index === 1
                            ? 'ring-secondary/70 group-hover:ring-secondary'
                            : index === 2
                            ? 'ring-accent/70 group-hover:ring-accent'
                            : 'ring-muted-foreground/30 group-hover:ring-muted-foreground/50'
                        )}
                      >
                        {/* <AvatarImage
                          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.userAddress}`}
                          alt="User avatar"
                        /> */}
                        <CustomAvatar address={user.userAddress} size={10} />
                        <AvatarFallback className="bg-gradient-to-br from-muted to-muted/70 text-muted-foreground font-bold">
                          {user.userAddress.slice(2, 4).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>

                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2 text-base">
                        {user.userAddress.slice(0, 6) +
                          '...' +
                          user.userAddress.slice(-4)}
                        <ReputationBadge points={Number(user.reputation)} />
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <ActivityIcons
                          answers={Number(user.answerCount)}
                          solutions={Number(user.bestSolutionCount)}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">
                        Contribution Level
                      </span>
                      <span
                        className={cn(
                          'font-bold px-2 py-0.5 rounded-full text-xs',
                          getLevelColor(Number(user.reputation))
                        )}
                      >
                        {getContributionLevel(Number(user.reputation))}
                      </span>
                    </div>
                    <ProgressBar
                      value={getProgressValue(Number(user.reputation))}
                    />
                    <div className="flex text-xs text-muted-foreground gap-3 font-medium">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {Number(user.answerCount)} answers
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {Number(user.bestSolutionCount)} solutions
                      </span>
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        {Number(user.reputation).toLocaleString()} rep
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8 flex justify-between items-center">
          <Button
            onClick={() => changePage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            variant="outline"
            size="sm"
            className="h-9 px-3 border-border/70 bg-card hover:bg-muted transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center justify-center px-3 py-1.5 rounded-md bg-muted/50 border border-border/50">
            <span className="text-sm font-medium">
              Page {pagination.currentPage} of {Number(pagination.totalPages)}
            </span>
          </div>

          <Button
            onClick={() => changePage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === Number(pagination.totalPages)}
            variant="outline"
            size="sm"
            className="h-9 px-3 border-border/70 bg-card hover:bg-muted transition-all duration-200"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
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
