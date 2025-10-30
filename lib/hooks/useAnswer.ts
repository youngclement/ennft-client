import { useToast } from './use-toast';
import { createAnswer } from '@/service/answer.service';
import { network } from '@/configs/WalletConfig';
import { useEffect } from 'react';

// Conditionally import wagmi hooks only when needed
let useAccount: any = null;
let useWaitForTransactionReceipt: any = null;
let useWriteContract: any = null;
try {
  const wagmi = require('wagmi');
  useAccount = wagmi.useAccount;
  useWaitForTransactionReceipt = wagmi.useWaitForTransactionReceipt;
  useWriteContract = wagmi.useWriteContract;
} catch (error) {
  // wagmi not available, will provide mock implementations
}

const contractABI = require('../contracts/contractABI').contractABI;

// Cập nhật interface với parentAnswerId
interface SubmitAnswerArgs {
  questionId: bigint;
  answerText: string;
  parentAnswerId: bigint; // Thêm trường này
}

export function useAnswer() {
  const { toast } = useToast();

  // Provide mock implementations if wagmi is not available
  const accountData = useAccount ? useAccount() : { address: null };
  const { address: account } = accountData;

  const writeContractData = useWriteContract ? useWriteContract() : {
    data: null,
    error: null,
    isPending: false,
    writeContract: () => {},
    isError: false,
  };

  const {
    data: hash,
    error,
    isPending,
    writeContract,
    isError,
  } = writeContractData;

  const receiptData = useWaitForTransactionReceipt ? useWaitForTransactionReceipt({ hash }) : {
    isLoading: false,
    isSuccess: false
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = receiptData;

  const submitAnswer = async ({
    questionId,
    answerText,
    parentAnswerId,
  }: SubmitAnswerArgs) => {
    try {
      if (!answerText || !answerText.trim()) {
        throw new Error('Answer text cannot be empty');
      }

      if (answerText.length > 100000) {
        throw new Error('Answer text is too long');
      }

      // **1. Xử lý dữ liệu trước khi gửi transaction**
      const response = await createAnswer({ answerText });

      if (!response.data?.code || !response.data?.result?.id) {
        throw new Error('Failed to submit answer');
      }

      const answerDetailId = response.data.result.id;

      // **2. Gửi transaction lên smart contract**
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI,
        functionName: 'submitAnswer',
        args: [questionId, answerDetailId, parentAnswerId], // Thêm parentAnswerId vào args
        account: account,
        chain: network,
      });

      // **Hiển thị toast khi cần ký giao dịch**
      toast({
        title: 'Waiting for signature...',
        description: 'Please confirm the transaction in your wallet.',
        variant: 'default',
        className: 'toast-pending',
      });
    } catch (err) {
      console.error('Error submitting answer:', err);

      toast({
        title: 'Submission Failed',
        description:
          err instanceof Error ? err.message : 'An unexpected error occurred.',
        variant: 'destructive',
        className: 'toast-error',
      });

      throw err;
    }
  };

  // **Effect xử lý trạng thái giao dịch**
  useEffect(() => {
    if (isPending) {
      toast({
        title: 'Waiting for signature...',
        description: 'Please confirm the transaction in your wallet.',
        variant: 'default',
        className: 'toast-pending',
      });
    }
  }, [isPending, toast]);

  useEffect(() => {
    if (isConfirming) {
      toast({
        title: 'Submitting Answer...',
        description: 'Your transaction is being processed on-chain.',
        variant: 'default',
        className: 'toast-confirming',
      });
    }
  }, [isConfirming, toast]);

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: 'Answer Submitted!',
        description: 'Your answer has been recorded on-chain.',
        variant: 'default',
        className: 'toast-success',
      });
    }
  }, [isConfirmed, toast]);

  return {
    submitAnswer,
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    hash,
    error,
  };
}
