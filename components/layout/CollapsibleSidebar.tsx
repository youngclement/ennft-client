'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetUser } from '@/lib/hooks/useGetUser';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Home,
  MessageSquare,
  Settings,
  Shield,
  Tags,
  Trophy,
  Users,
  GraduationCap,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount, useBalance, useChains } from 'wagmi';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ProgressBar } from '../ui/progress';
import CustomAvatar from '../users/CustomAvatar';

const sidebarItems = [
  {
    title: 'Home',
    icon: Home,
    href: '/',
  },
  {
    title: 'Courses',
    icon: GraduationCap,
    href: '/elearning',
  },
  {
    title: 'Challenges',
    icon: Target,
    href: '/elearning/challenges',
  },
  {
    title: 'Questions',
    icon: MessageSquare,
    href: '/questions',
  },
  {
    title: 'Leaderboard',
    icon: Trophy,
    href: '/leaderboard',
  },
  {
    title: 'Users',
    icon: Users,
    href: '/users',
  },
  // {
  //   title: 'Settings',
  //   icon: Settings,
  //   href: '/settings',
  // },
];

export function CollapsibleSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarCollapsed');
      return savedState ? JSON.parse(savedState) : true;
    }
    return true;
  });
  const chains = useChains();
  const { address } = useAccount();
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address,
  });
  const { user, isLoading: isUserLoading } = useGetUser();

  // Format balance to be more readable
  const balance = balanceData
    ? Number(balanceData.formatted).toLocaleString(undefined, {
      maximumFractionDigits: 4,
      minimumFractionDigits: 0,
    })
    : '0';

  const reputation = user?.reputation || BigInt(0);
  const reputationValue = Number(reputation.toString());

  // Calculate next reputation milestone
  const getNextMilestone = (rep) => {
    const milestones = [100, 500, 1000, 2500, 5000, 10000];
    return (
      milestones.find((m) => m > rep) || milestones[milestones.length - 1] * 2
    );
  };

  const nextMilestone = getNextMilestone(reputationValue);
  const progressPercentage = Math.min(
    100,
    (reputationValue / nextMilestone) * 100
  );

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Get first letter of address for avatar
  const addressFirstLetter = address
    ? address.substring(2, 3).toUpperCase()
    : '?';

  return (
    <div
      className={cn(
        'relative border-r transition-all duration-300 ease-in-out bg-background shadow-sm',
        isCollapsed ? 'w-[68px]' : 'w-[260px]'
      )}
    >
      <div className="sticky top-[65px] h-[calc(100vh-65px)]">
        <ScrollArea className="h-full py-4 px-2">
          <div className="space-y-6">
            {!isCollapsed ? (
              <Card className="p-4 bg-gradient-to-br from-background to-muted/50 shadow-sm border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8">
                    <CustomAvatar address={address} size={10} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs text-muted-foreground truncate">
                      {address
                        ? `${address.slice(0, 6)}...${address.slice(-4)}`
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <CircleDollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Balance</span>
                      </div>
                      <span className="font-semibold text-sm">
                        {isBalanceLoading
                          ? 'Loading...'
                          : `${balance} ${chains[0]?.nativeCurrency?.symbol ?? ''
                          }`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Reputation</span>
                      </div>
                      <span className="font-semibold text-sm">
                        {isUserLoading
                          ? 'Loading...'
                          : `${reputationValue.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <ProgressBar value={progressPercentage} />
                      <p className="text-xs text-muted-foreground text-right">
                        Next milestone: {nextMilestone.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full h-12 rounded-md mb-2"
                    >
                      <div className="h-8 w-8">
                        <CustomAvatar address={address} size={10} />
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex flex-col gap-2 p-3 w-48"
                  >
                    <p className="text-xs text-muted-foreground truncate font-mono">
                      {address
                        ? `${address.slice(0, 10)}...${address.slice(-6)}`
                        : 'Not connected'}
                    </p>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-xs">Balance:</span>
                      <span className="text-xs font-medium">
                        {isBalanceLoading
                          ? '...'
                          : `${balance} ${chains[0]?.nativeCurrency?.symbol ?? ''
                          }`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Reputation:</span>
                      <span className="text-xs font-medium">
                        {isUserLoading
                          ? '...'
                          : reputationValue.toLocaleString()}
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <nav className="space-y-1.5">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return isCollapsed ? (
                  <TooltipProvider key={item.href} delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive ? 'secondary' : 'ghost'}
                          className={cn(
                            'w-full justify-center p-2 h-10',
                            isActive && 'bg-secondary shadow-sm'
                          )}
                          asChild
                        >
                          <Link href={item.href}>
                            <item.icon
                              className={cn(
                                'h-5 w-5',
                                isActive && 'text-primary'
                              )}
                            />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Button
                    key={item.href}
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start h-10',
                      isActive && 'bg-secondary shadow-sm'
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={cn(
                          'h-4 w-4 mr-3',
                          isActive && 'text-primary'
                        )}
                      />
                      <span className={cn(isActive && 'font-medium')}>
                        {item.title}
                      </span>
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-8 w-8 bg-background border-muted-foreground/20 hover:bg-muted transition-all"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
