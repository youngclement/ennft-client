'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

const queryClient = new QueryClient();

type Props = React.ReactNode;

export default function ContextProvider({ children }: { children: Props }) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}