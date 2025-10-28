'use client';

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi';
import { contractABI as abi } from '../contracts/contractABI';
import { network } from '@/configs/WalletConfig';
import { createQuestion } from '@/service/question.service';
import { CreateQuestionData } from '@/service/dto/question/question.create';

// Định nghĩa kiểu dữ liệu đầu vào
export interface AskQuestionArgs {
  questionText: string;
  questionContent: string;
  category: string;
  deadlinePeriod: number; // Giả sử là 0, 1, 2 tương ứng với OneWeek, TwoWeeks, OneMonth
  rewardAmount: bigint;
}

export function useAskQuestion() {
  const { address: account } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const askQuestion = async ({
    questionText,
    questionContent,
    category,
    deadlinePeriod,
    rewardAmount,
  }: AskQuestionArgs) => {
    try {
      const offChainData: CreateQuestionData = {
        questionText,
        questionContent,
        category,
      };
      const apiResponse = await createQuestion(offChainData);

      if (apiResponse.data.code !== 1000 || !apiResponse.data.result) {
        throw new Error('Failed to save question off-chain');
      }

      const questionDetailId = apiResponse.data.result.id;

      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: abi,
        functionName: 'askQuestion',
        args: [questionDetailId, deadlinePeriod],
        value: rewardAmount,
        chain: network,
        account,
      });
    } catch (err) {
      console.error('Error asking question:', err);
      throw err;
    }
  };

  // Chờ xác nhận transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    askQuestion,
    isPending,
    hash,
    isConfirming,
    isConfirmed,
    error,
  };
}
