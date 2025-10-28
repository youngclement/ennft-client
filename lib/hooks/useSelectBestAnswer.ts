'use client';

import { useState, useCallback } from 'react';
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { useToast } from './use-toast';
import { network } from '@/configs/WalletConfig';

export function useSelectBestAnswer() {
  const { toast } = useToast();
  const { address: account } = useAccount();
  const [isSelecting, setIsSelecting] = useState(false);
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >();

  // Hook ghi contract
  const { writeContract, isPending, error: writeError } = useWriteContract();

  // Hook chờ transaction
  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const selectBestAnswer = useCallback(
    async (questionId: bigint, answerId: bigint) => {
      try {
        setIsSelecting(true);

        writeContract(
          {
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
            abi: contractABI,
            functionName: 'selectBestAnswer',
            args: [questionId, answerId],
            account: account,
            chain: network,
          },
          {
            onSuccess: (hash) => {
              setTransactionHash(hash);

              toast({
                title: 'Selecting Best Answer',
                description: 'Transaction is being processed...',
                variant: 'default',
              });
            },
            onError: (error) => {
              // Xử lý lỗi khi gửi transaction
              toast({
                title: 'Selection Failed',
                description: error.message || 'Unable to select best answer',
                variant: 'destructive',
              });

              setIsSelecting(false);
            },
          }
        );
      } catch (err) {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred',
          variant: 'destructive',
        });

        setIsSelecting(false);
      }
    },
    [writeContract, toast]
  );

  return {
    selectBestAnswer,
    isSelecting: isSelecting || isPending || isConfirming,
    isSuccess,
    error: writeError || confirmError,
    transactionHash,
  };
}
