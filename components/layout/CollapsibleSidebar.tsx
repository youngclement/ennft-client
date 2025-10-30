"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useGetUser } from '@/lib/hooks/useGetUser';
import { cn } from "@/lib/utils";
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
  User,
  ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ProgressBar } from "../ui/progress";
import CustomAvatar from "../users/CustomAvatar";

const sidebarItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Questions",
    icon: MessageSquare,
    href: "/questions",
  },
  {
    title: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
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
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarCollapsed");
      return savedState ? JSON.parse(savedState) : true;
    }
    return true;
  });

  const { publicKey, connected } = useWallet();

  // Generate random avatar based on wallet address
  const randomAvatar = useMemo(() => {
    if (!publicKey) return "";
    const seed = publicKey.toBase58().slice(-8);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
  }, [publicKey]);

  // Get first letter of address for avatar
  const addressFirstLetter = publicKey
    ? publicKey.toBase58().substring(2, 4).toUpperCase()
    : '?';

  return (
    <div
      className={cn(
        "relative border-r transition-all duration-300 ease-in-out bg-background shadow-sm",
        isCollapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      <div className="sticky top-[65px] h-[calc(100vh-65px)]">
        <ScrollArea className="h-full py-4 px-2">
          <div className="space-y-6">
            {!isCollapsed ? (
              <Card className=" bg-gradient-to-br from-background to-muted/50 shadow-sm border-primary/10">
                {/* <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <h3 className="font-semibold text-sm">Connected Wallet</h3>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                      Active
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CircleDollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm">SOL Balance</span>
                      </div>
                      <span className="font-medium">2.5 SOL</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Reputation</span>
                      </div>
                      <span className="font-medium">580 pts</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between items-center text-xs mt-1 border-dashed"
                  >
                    <span className="font-mono">
                      {publicKey ? `${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-4)}` : 'Not connected'}
                    </span>
                    <ExternalLinkIcon className="h-3 w-3 opacity-60" />
                  </Button>
                </div> */}
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
                        {/* <CustomAvatar address={address} size={10} /> */}
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex flex-col gap-2 p-3 w-48"
                  >
                    <p className="text-xs text-muted-foreground truncate font-mono">
                      {publicKey
                        ? `${publicKey.toBase58().slice(0, 10)}...${publicKey.toBase58().slice(-6)}`
                        : 'Not connected'}
                    </p>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-xs">Balance:</span>
                      <span className="text-xs font-medium">2.5 SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Reputation:</span>
                      <span className="text-xs font-medium">580 pts</span>
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
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-center p-2 h-10",
                            isActive && "bg-secondary shadow-sm"
                          )}
                          asChild
                        >
                          <Link href={item.href}>
                            <item.icon
                              className={cn(
                                "h-5 w-5",
                                isActive && "text-primary"
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
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-10",
                      isActive && "bg-secondary shadow-sm"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={cn(
                          "h-4 w-4 mr-3",
                          isActive && "text-primary"
                        )}
                      />
                      <span className={cn(isActive && "font-medium")}>
                        {item.title}
                      </span>
                    </Link>
                  </Button>
                );
              })}
            </nav>

            {/* Profile Section */}
            <div className="mt-6 space-y-3">
              {!isCollapsed ? (
                <>
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Your Profile</h3>
                    <div className="h-px flex-1 bg-border/50 ml-2"></div>
                  </div>

                  <Card className="p-4 border border-border/40 bg-black/5 hover:bg-black/10 transition-colors duration-200 rounded-xl cursor-pointer">
                    <Link href={`/users/${publicKey?.toBase58()}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ring-2 ring-background overflow-hidden">
                          {randomAvatar ? (
                            <img src={randomAvatar} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-bold text-sm text-primary">{addressFirstLetter}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold truncate">
                            {publicKey ? `${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-4)}` : 'Not Connected'}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            <p className="text-xs text-muted-foreground">
                              {connected ? 'Connected' : 'Disconnected'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </>
              ) : (
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/users/${publicKey?.toBase58()}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-full h-12 rounded-md mb-2"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ring-2 ring-background overflow-hidden">
                            {randomAvatar ? (
                              <img src={randomAvatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-bold text-xs text-primary">{addressFirstLetter}</span>
                            )}
                          </div>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>View Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-8 w-8 bg-background border-muted-foreground/20 hover:bg-muted transition-all"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
