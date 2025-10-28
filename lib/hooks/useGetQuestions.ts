'use client';

import { getQuestionById } from '@/service/question.service';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';

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

export function useGetQuestions(initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [mergedQuestions, setMergedQuestions] = useState<MergedQuestion[]>([]);
  const [isFetchingOffChain, setIsFetchingOffChain] = useState(false);

  const {
    data: contractData,
    error,
    isLoading: isLoadingContract,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    abi: contractABI,
    functionName: 'getQuestions',
    args: [page, pageSize],
    query: {
      enabled: true,
      staleTime: 10000 * 60 * 5,
    },
  });

  useEffect(() => {
    const fetchOffChainData = async () => {
      if (!contractData || !Array.isArray(contractData)) return;

      setIsFetchingOffChain(true);
      const questionsList: ContractQuestion[] =
        contractData[0] as ContractQuestion[];

      const fetchedQuestions = await Promise.all(
        questionsList.map(async (q) => {
          try {
            const response = await getQuestionById(q.questionDetailId);
            const offChainData = response.data.result;
            return {
              ...q,
              questionText: offChainData.questionText,
              questionContent: offChainData.questionContent,
              category: offChainData.category,
            };
          } catch (error) {
            console.error(
              `Failed to fetch off-chain data for question ${q.id}`,
              error
            );
            return {
              ...q,
              questionText: 'Error fetching data',
              questionContent: 'Error fetching data',
              category: 'Unknown',
            };
          }
        })
      );

      setMergedQuestions(fetchedQuestions);
      setIsFetchingOffChain(false);
    };

    if (contractData) {
      fetchOffChainData();
    }
  }, [contractData]);

  const pagination = {
    currentPage: page,
    pageSize,
    totalQuestions: (contractData?.[1] as bigint) ?? 0,
    totalPages: (contractData?.[2] as bigint) ?? 0,
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    refetch();
  };

  return {
    questions: mergedQuestions,
    error,
    isLoading: isLoadingContract || isFetchingOffChain,
    pagination,
    changePage,
    changePageSize,
    refetch,
  };
}
