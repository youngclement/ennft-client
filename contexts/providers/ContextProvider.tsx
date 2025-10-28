'use client';

import CustomAvatar from '@/components/users/CustomAvatar';
import walletConfig, { network } from '@/configs/WalletConfig';
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

type Props = React.ReactNode;

export default function ContextProvider({ children }: { children: Props }) {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();
  const [rainbowKitTheme, setRainbowKitTheme] = useState(
    darkTheme({
      accentColor: '#1d1d1d', // Indigo accent
      accentColorForeground: 'white',
      borderRadius: 'medium',
      fontStack: 'system',
      overlayBlur: 'small',
    })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const themeConfig = {
      dark: {
        accentColor: '#1d1d1d', // Indigo accent for dark mode
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
        overlayBlur: 'small',
        mode: 'dark' as const,
      },
      light: {
        accentColor: '#4f46e5', // Slightly darker indigo for light mode
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
        overlayBlur: 'small',
        mode: 'light' as const,
      },
    };




  }, [theme]);

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={network}
          showRecentTransactions={true}
          theme={rainbowKitTheme}
          avatar={CustomAvatar}
          locale="en-US"
          coolMode // Adds confetti animation when connecting
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}