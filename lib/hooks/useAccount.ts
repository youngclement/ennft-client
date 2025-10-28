'use client';

import { useState } from 'react';

export function useAccount() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    try {
      setIsConnecting(true);
      // TODO: Implement actual wallet connection
      setAddress('0x1234...5678');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
  };

  return {
    address,
    isConnecting,
    connect,
    disconnect,
  };
}
