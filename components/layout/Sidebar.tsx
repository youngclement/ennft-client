"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import {
  Home,
  MessageSquare,
  Tags,
  Trophy,
  Users,
  Settings,
  CircleDollarSign,
  Shield,
  Wallet,
  ChevronRight,
  ExternalLink,
  LucideIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: string | number;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Questions",
    icon: MessageSquare,
    href: "/questions",
    badge: 5,
  },
  {
    title: "Tags",
    icon: Tags,
    href: "/tags",
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
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [walletConnected, setWalletConnected] = useState(false)
  const [isHovering, setIsHovering] = useState<string | null>(null)

  const handleConnectWallet = () => {
    // Implement wallet connection logic here
    setWalletConnected(!walletConnected)
  }

  return (
    <div className="hidden lg:block w-[280px] shrink-0 border-r bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="sticky top-[65px] h-[calc(100vh-65px)]">
        <ScrollArea className="h-full py-8 px-4">
          <div className="space-y-8">
            {/* Wallet Connection Card */}
            <Card className="overflow-hidden border-none shadow-xl backdrop-blur-sm bg-gradient-to-br from-primary/5 via-secondary/10 to-background rounded-2xl">
              {walletConnected ? (
                <div className="p-5 space-y-4">
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
                        <span className="text-sm">Balance</span>
                      </div>
                      <span className="font-medium">250 tokens</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Reputation</span>
                      </div>
                      <span className="font-medium">1,234 pts</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between items-center text-xs mt-1 border-dashed"
                    onClick={handleConnectWallet}
                  >
                    <span className="font-mono">0x71...3a4f</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-8 pb-6 px-5 space-y-5">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Wallet className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-lg">Connect Wallet</h3>
                        <p className="text-xs text-muted-foreground mt-1">Access exclusive blockchain features</p>
                      </div>
                    </div>

                    <Button
                      className="w-full py-6 bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 transition-all
                      hover:shadow-lg hover:shadow-primary/20 duration-300"
                      onClick={handleConnectWallet}
                    >
                      Connect Now
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Navigation Menu */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Navigation</h3>
                <div className="h-px flex-1 bg-border/50 ml-2"></div>
              </div>
              <nav className="space-y-1.5">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href

                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 pl-3 pr-3 py-6 relative overflow-hidden group rounded-xl",
                        isActive ? "bg-secondary/80 shadow-sm" : "",
                        isHovering === item.href && !isActive ? "bg-secondary/40" : ""
                      )}
                      asChild
                      onMouseEnter={() => setIsHovering(item.href)}
                      onMouseLeave={() => setIsHovering(null)}
                    >
                      <Link href={item.href}>
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-indicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        <div className={cn(
                          "w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300",
                          isActive ? "bg-primary/20" : "bg-transparent group-hover:bg-primary/10"
                        )}>
                          <item.icon className={cn(
                            "h-4 w-4 shrink-0 transition-all duration-200",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )} />
                        </div>
                        <span className={cn(
                          "flex-1 font-medium text-sm",
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}>
                          {item.title}
                        </span>
                        {item.badge && (
                          <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {item.badge}
                          </div>
                        )}
                      </Link>
                    </Button>
                  )
                })}
              </nav>
            </div>

            {/* Profile Summary */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Your Profile</h3>
                <div className="h-px flex-1 bg-border/50 ml-2"></div>
              </div>

              <Card className="p-4 border border-border/40 bg-black/5 hover:bg-black/10 transition-colors duration-200 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ring-2 ring-background">
                    <span className="font-bold text-sm text-primary">JD</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate">John Doe</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary/80"></div>
                      <p className="text-xs text-muted-foreground">Pro Member</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}