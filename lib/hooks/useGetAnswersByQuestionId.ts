'use client';

import { useState, useEffect, useCallback } from 'react';
import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { getAnswerById } from '@/service/answer.service';

// Cập nhật interface ContractAnswer để thêm questionId và parentAnswerId
export interface ContractAnswer {
  id: bigint;
  responder: string;
  answerDetailId: string; // ID để fetch dữ liệu từ backend
  answerText?: string; // Thêm answerText từ backend
  upvotes: bigint;
  rewardAmount: bigint;
  createdAt: bigint;
  questionId: bigint; // Thêm trường này
  parentAnswerId: bigint; // Thêm trường này
}

export function useGetAnswersByQuestionId(
  questionId?: bigint,
  initialPageIndex = 1,
  initialPageSize = 10,
  pollInterval = 5000000
) {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [answers, setAnswers] = useState<ContractAnswer[]>([]);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Lấy danh sách answers từ smart contract
  const {
    data: contractData,
    error: contractError,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'getAnswersByQuestionId',
    args: questionId ? [questionId, pageIndex, pageSize] : undefined,
    query: { enabled: !!questionId },
  });

  // Fetch answerText từ backend
  const fetchAnswerTexts = useCallback(
    async (contractAnswers: ContractAnswer[]) => {
      try {
        const updatedAnswers = await Promise.all(
          contractAnswers.map(async (answer) => {
            try {
              const response = await getAnswerById(answer.answerDetailId);
              return { ...answer, answerText: response.data.result.answerText };
            } catch (error) {
              console.error(
                `Failed to fetch answerText for answerDetailId: ${answer.answerDetailId}`,
                error
              );
              return answer; // Trả về answer như cũ nếu lỗi
            }
          })
        );

        setAnswers(updatedAnswers);
      } catch (error) {
        console.error('Error fetching answer texts:', error);
      }
    },
    []
  );

  // Xử lý dữ liệu từ contract
  const processAnswers = useCallback((data: any) => {
    if (!data) return { processedAnswers: [], total: 0, pages: 0 };

    const [rawAnswers, totalAnswers, totalPages] = data as [
      ContractAnswer[],
      bigint,
      bigint
    ];

    const processedAnswers: ContractAnswer[] = rawAnswers.map((answer) => ({
      ...answer,
      upvotes: BigInt(Number(answer.upvotes)), // Convert to BigInt
      // questionId và parentAnswerId đã có trong rawAnswers từ contract
    }));

    return {
      processedAnswers,
      total: Number(totalAnswers),
      pages: Number(totalPages),
    };
  }, []);

  // Fetch dữ liệu từ contract và backend
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setIsLoading(true);
        if (!questionId) {
          setIsLoading(false);
          return;
        }

        const { data } = await refetch();
        if (data) {
          const { processedAnswers, total, pages } = processAnswers(data);
          setTotalAnswers(total);
          setTotalPages(pages);
          await fetchAnswerTexts(processedAnswers); // Fetch answerText từ backend
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    fetchAnswers();
    const intervalId = setInterval(fetchAnswers, pollInterval);
    return () => clearInterval(intervalId);
  }, [
    questionId,
    pageIndex,
    pageSize,
    pollInterval,
    refetch,
    processAnswers,
    fetchAnswerTexts,
  ]);

  useEffect(() => {
    if (contractError) {
      setError(contractError);
      setIsLoading(false);
    }
  }, [contractError]);

  const changePage = useCallback(
    (newPageIndex: number) => {
      if (newPageIndex > 0 && newPageIndex <= totalPages) {
        setPageIndex(newPageIndex);
      }
    },
    [totalPages]
  );

  const changePageSize = useCallback((newPageSize: number) => {
    if (newPageSize > 0) {
      setPageSize(newPageSize);
      setPageIndex(1);
    }
  }, []);

  return {
    answers,
    totalAnswers,
    totalPages,
    currentPage: pageIndex,
    pageSize,
    isLoading,
    error,
    changePage,
    changePageSize,
    refetch,
  };
}
