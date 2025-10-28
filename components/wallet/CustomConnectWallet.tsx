'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  Copy,
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
  const { publicKey, connected } = useWallet();

  useEffect(() => {
    // Ensure wallet adapter follows the app theme
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

  if (!connected || !publicKey) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <WalletMultiButton
                style={{
                  background: 'linear-gradient(to right, hsl(var(--primary) / 0.9), hsl(var(--primary) / 0.7))',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.5rem 1rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  transition: 'all 0.3s ease',
                }}
                className="relative overflow-hidden group hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-1/2 -skew-x-12 transform animate-shimmer"></div>
                <PlugZap className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12 inline" />
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
              </WalletMultiButton>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="font-medium">
            <p>Connect your Solana wallet to use all features</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-r-none border-r-0 flex items-center gap-2 bg-background/50 hover:bg-background/80 transition-colors shadow-sm"
            >
              <div className="flex items-center">
                <div className="relative mr-1.5 w-4 h-4 overflow-hidden rounded-full shadow-sm flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                </div>
                <span className="font-medium text-sm">
                  Solana Devnet
                </span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="font-medium">
            <p>Current network: Solana Devnet</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center">
        <WalletMultiButton
          style={{
            background: 'hsl(var(--background) / 0.5)',
            border: '1px solid hsl(var(--border))',
            borderLeft: 'none',
            borderRadius: '0 0.375rem 0.375rem 0',
            fontSize: '0.875rem',
            padding: '0.5rem 0.75rem',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            transition: 'all 0.2s ease',
          }}
          className="flex items-center gap-2 pr-3 bg-background/50 hover:bg-muted/80 transition-all group shadow-sm border-l-0"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5 ring-1 ring-primary/20 shadow-inner">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-xs">
                {publicKey.toBase58().substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <Badge
                  variant="outline"
                  className="px-1.5 py-0 text-xs font-normal bg-muted/50 shadow-inner"
                >
                  {formatAddress(publicKey.toBase58())}
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
                      copyToClipboard(publicKey.toBase58());
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
                  Connected
                </span>
              </div>
            </div>
          </div>
        </WalletMultiButton>
      </div>
    </div>
  );
}
