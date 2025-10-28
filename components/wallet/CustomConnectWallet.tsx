'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  Copy,
  NetworkIcon,
  OctagonAlert,
  PlugZap,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function CustomConnectButton() {
  const { theme, resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Ensure RainbowKit follows the app theme
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme, resolvedTheme]);

  function formatAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            className="relative z-10"
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={openConnectModal}
                          variant="default"
                          className="relative overflow-hidden group bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 transition-all duration-300 shadow-md hover:shadow-lg"
                          size="sm"
                          onMouseEnter={() => setHovering(true)}
                          onMouseLeave={() => setHovering(false)}
                        >
                          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-1/2 -skew-x-12 transform animate-shimmer"></div>
                          <PlugZap className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                          <span className="font-medium">Connect Wallet</span>
                          <AnimatePresence>
                            {hovering && (
                              <motion.div
                                className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <Sparkles className="absolute top-1 right-2 h-3 w-3 text-white/40 animate-pulse" />
                                <Sparkles className="absolute bottom-1 left-2 h-2 w-2 text-white/30 animate-pulse" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="font-medium">
                        <p>Connect your wallet to use all features</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <OctagonAlert className="h-4 w-4 animate-pulse" />
                    <span className="font-medium">Wrong Network</span>
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </Button>
                );
              }

              return (
                <div className="flex items-center">
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={openChainModal}
                          variant="outline"
                          size="sm"
                          className="rounded-r-none border-r-0 flex items-center gap-2 bg-background/50 hover:bg-background/80 transition-colors shadow-sm"
                        >
                          <div className="flex items-center">
                            {chain.iconUrl && (
                              <div className="relative mr-1.5 w-4 h-4 overflow-hidden rounded-full shadow-sm flex-shrink-0">
                                <img
                                  src={chain.iconUrl}
                                  alt={chain.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            {!chain.iconUrl && (
                              <NetworkIcon className="h-4 w-4 mr-1.5 text-primary" />
                            )}
                            <span className="font-medium text-sm">
                              {chain.name}
                            </span>
                          </div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="font-medium">
                        <p>Change network</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    onClick={openAccountModal}
                    variant="outline"
                    size="sm"
                    className="rounded-l-none flex items-center gap-2 pr-3 bg-background/50 hover:bg-muted/80 transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5 ring-1 ring-primary/20 shadow-inner">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-xs">
                          {account.address.substring(2, 3).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className="px-1.5 py-0 text-xs font-normal bg-muted/50 shadow-inner"
                          >
                            {formatAddress(account.address)}
                          </Badge>
                          <AnimatePresence mode="wait">
                            <motion.button
                              key={copied ? 'check' : 'copy'}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(account.address);
                              }}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {copied ? (
                                <Check className="h-3.5 w-3.5 text-green-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </motion.button>
                          </AnimatePresence>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wallet className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium">
                            {account.displayBalance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
