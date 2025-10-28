'use client';

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi';
import { contractABI as abi } from '../contracts/contractABI';
import { network } from '@/configs/WalletConfig';

export interface VoteArgs {
  questionId: bigint;
  answerId: bigint;
}

export function useVoteForAnswer() {
  // Gửi giao dịch vote
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { address: account } = useAccount();

  const voteForAnswer = async ({ questionId, answerId }: VoteArgs) => {
    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: abi,
        functionName: 'voteForAnswer',
        args: [questionId, answerId],
        account: account,
        chain: network,
      });
    } catch (err) {
      console.error('Error voting for answer:', err);
      throw err;
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    voteForAnswer,
    isPending,
    hash,
    isConfirming,
    isConfirmed,
    error,
  };
}
