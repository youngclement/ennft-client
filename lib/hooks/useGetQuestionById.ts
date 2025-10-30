"use client";

import { useState, useEffect } from "react";
import { contractABI } from "../contracts/contractABI";
import { getQuestionById as fetchOffChainData } from "@/service/question.service";

// Conditionally import wagmi hook only when needed
let useReadContract: any = null;
try {
  useReadContract = require("wagmi").useReadContract;
} catch (error) {
  // wagmi not available, will use mock data
}

export interface ContractQuestion {
  id: bigint;
  asker: string;
  questionDetailId: string;
  rewardAmount: bigint;
  createdAt: bigint;
  deadline: bigint;
  isClosed: boolean;
  chosenAnswerId: bigint;
}

export interface MergedQuestion extends ContractQuestion {
  questionText: string;
  questionContent: string;
  category: string;
}

// Kiểm tra dữ liệu trả về từ contract có hợp lệ không
function isValidContractData(data: unknown): data is ContractQuestion {
  return (
    data !== null &&
    typeof data === "object" &&
    "asker" in data &&
    "questionDetailId" in data &&
    "rewardAmount" in data &&
    "createdAt" in data &&
    "deadline" in data &&
    "isClosed" in data &&
    "chosenAnswerId" in data
  );
}

export function useGetQuestionById(initialQuestionId?: bigint) {
  const [questionId, setQuestionId] = useState<bigint | undefined>(
    initialQuestionId
  );
  const [mergedQuestion, setMergedQuestion] = useState<MergedQuestion | null>(
    null
  );
  const [isFetchingOffChain, setIsFetchingOffChain] = useState(false);

  // Lấy dữ liệu từ smart contract (only if wagmi is available)
  const wagmiData = useReadContract ? useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: "getQuestionById",
    args: questionId ? [questionId] : undefined,
    query: {
      enabled: !!questionId,
      staleTime: 1000 * 60 * 5,
    },
  }) : { data: null, error: null, isLoading: false, refetch: () => {} };

  const {
    data: contractData,
    error,
    isLoading: isLoadingContract,
    refetch,
  } = wagmiData;

  // Khi có dữ liệu on-chain, gọi API để lấy dữ liệu off-chain
  useEffect(() => {
    const fetchOffChainDataForQuestion = async () => {
      if (!contractData || !isValidContractData(contractData)) {
        console.error("Invalid contract data:", contractData);
        return;
      }

      setIsFetchingOffChain(true);

      try {
        // Chuyển đổi dữ liệu on-chain
        const onChainQuestion: ContractQuestion = {
          id: questionId || BigInt(0),
          asker: contractData.asker,
          questionDetailId: contractData.questionDetailId,
          rewardAmount: BigInt(contractData.rewardAmount),
          createdAt: BigInt(contractData.createdAt),
          deadline: BigInt(contractData.deadline),
          isClosed: contractData.isClosed,
          chosenAnswerId: BigInt(contractData.chosenAnswerId),
        };

        // Gọi API lấy dữ liệu off-chain
        const response = await fetchOffChainData(
          onChainQuestion.questionDetailId
        );
        const offChainData = response.data.result;

        // Kết hợp dữ liệu
        setMergedQuestion({
          ...onChainQuestion,
          questionText: offChainData.questionText,
          questionContent: offChainData.questionContent,
          category: offChainData.category,
        });
      } catch (error) {
        console.error(
          `Failed to fetch off-chain data for question ${questionId}`,
          error
        );
      } finally {
        setIsFetchingOffChain(false);
      }
    };

    if (contractData) {
      fetchOffChainDataForQuestion();
    }
  }, [contractData]);

  // Hàm fetch lại câu hỏi theo ID
  const fetchQuestionById = (id: bigint) => {
    setQuestionId(id);
    refetch();
  };

  return {
    question: mergedQuestion,
    error,
    isLoading: isLoadingContract || isFetchingOffChain,
    questionId,
    fetchQuestionById,
    refetch,
  };
}
