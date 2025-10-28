"use client"

import { Card } from '@/components/ui/card'
import { Trophy, Shield, Loader2, Award, BarChart3, Activity } from 'lucide-react'
import { useState, useEffect } from 'react'
import CustomAvatar from '../users/CustomAvatar'
import { useGetUsers } from '@/lib/hooks/useGetUsers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export function TopContributors() {
  const { users, isLoading, error } = useGetUsers(4); // Fetch top 4 users

  // Sort users by reputation (highest first) if users array exists
  const sortedUsers = users
    ? [...users].sort((a, b) => Number(b.reputation) - Number(a.reputation)).slice(0, 4)
    : [];

  // Badge colors and styles for top 3 positions
  const badgeStyles = [
    'bg-gradient-to-br from-yellow-400 to-yellow-600 ring-1 ring-yellow-300', // Gold
    'bg-gradient-to-br from-gray-300 to-gray-500 ring-1 ring-gray-200',       // Silver
    'bg-gradient-to-br from-amber-600 to-amber-800 ring-1 ring-amber-500',    // Bronze
  ];

  return (
    <Card className="p-6 overflow-hidden relative border-border/60 hover:border-border transition-all duration-300 bg-gradient-to-b from-background to-background/80">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-full -z-10" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 p-1.5 rounded-full">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-bold text-base text-foreground/90">Top Contributors</h2>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
          <Link href="/leaderboard">View All</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4 py-2">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-10 w-14 rounded-md" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8 text-muted-foreground">
          <div className="flex justify-center mb-2">
            <Activity className="h-5 w-5 text-destructive/70" />
          </div>
          Unable to load contributors data
        </div>
      ) : (
        <div className="space-y-4">
          {sortedUsers.map((user, index) => (
            <Link
              href={`/users/${user.userAddress}`}
              key={user.userAddress}
              className="flex items-center gap-4 p-2.5 hover:bg-accent/30 rounded-lg transition-all duration-200 group"
            >
              <div className="relative">
                <div className="rounded-full p-0.5 bg-gradient-to-r from-background via-muted/30 to-background">
                  <CustomAvatar address={user.userAddress} size={48} />
                </div>
                {index < 3 && (
                  <div className={cn(
                    "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-primary-foreground font-bold shadow-md transition-transform group-hover:scale-110",
                    badgeStyles[index]
                  )}>
                    {index + 1}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {user.userAddress.slice(0, 6)}...{user.userAddress.slice(-4)}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Shield className="h-3.5 w-3.5 text-primary/80" />
                  <span className="font-medium text-sm">{Number(user.reputation).toLocaleString()}</span> reputation
                </div>
              </div>

              <div className="text-right px-3 py-1.5 rounded-md bg-gradient-to-r from-accent/30 to-accent/50 shadow-sm">
                <div className="font-bold text-foreground/90">{Number(user.answerCount)}</div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  <span>answers</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Card footer - visual separator */}
          <div className="pt-3 mt-2 border-t border-border/40">
            <div className="flex justify-center items-center text-xs text-muted-foreground">
              <Award className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
              <span>Based on reputation and activity</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}