'use client';

import { useState, useEffect, useCallback } from 'react';
import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { getAnswerById } from '@/service/answer.service';

export interface ContractReply {
  id: bigint;
  responder: string;
  answerDetailId: string; // ID để fetch dữ liệu từ backend
  answerText?: string; // Thêm answerText từ backend
  upvotes: bigint;
  rewardAmount: bigint;
  createdAt: bigint;
  questionId: bigint;
  parentAnswerId: bigint;
}

export function useGetRepliesByAnswerId(
  questionId?: bigint,
  answerId?: bigint,
  initialPageIndex = 1,
  initialPageSize = 10,
  pollInterval = 5000000 // Thời gian polling mặc định: 5 giây
) {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [replies, setReplies] = useState<ContractReply[]>([]);
  const [totalReplies, setTotalReplies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    data: contractData,
    error: contractError,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'getRepliesByAnswerId',
    args:
      questionId && answerId
        ? [questionId, answerId, pageIndex, pageSize]
        : undefined,
    query: { enabled: !!(questionId && answerId) }, // Chỉ chạy khi cả questionId và answerId được cung cấp
  });

  // Fetch answerText từ backend
  const fetchReplyTexts = useCallback(
    async (contractReplies: ContractReply[]) => {
      try {
        const updatedReplies = await Promise.all(
          contractReplies.map(async (reply) => {
            try {
              const response = await getAnswerById(reply.answerDetailId);
              return { ...reply, answerText: response.data.result.answerText };
            } catch (error) {
              console.error(
                `Failed to fetch answerText for answerDetailId: ${reply.answerDetailId}`,
                error
              );
              return reply; // Trả về reply như cũ nếu lỗi
            }
          })
        );

        setReplies(updatedReplies);
      } catch (error) {
        console.error('Error fetching reply texts:', error);
      }
    },
    []
  );

  // Xử lý dữ liệu từ contract
  const processReplies = useCallback((data: any) => {
    if (!data) return { processedReplies: [], total: 0, pages: 0 };

    const [rawReplies, totalReplies, totalPages] = data as [
      ContractReply[],
      bigint,
      bigint
    ];

    const processedReplies: ContractReply[] = rawReplies.map((reply) => ({
      ...reply,
      upvotes: BigInt(Number(reply.upvotes)), // Chuyển đổi sang BigInt
      rewardAmount: BigInt(Number(reply.rewardAmount)),
      createdAt: BigInt(Number(reply.createdAt)),
      questionId: BigInt(Number(reply.questionId)),
      parentAnswerId: BigInt(Number(reply.parentAnswerId)),
    }));

    return {
      processedReplies,
      total: Number(totalReplies),
      pages: Number(totalPages),
    };
  }, []);

  // Fetch dữ liệu từ contract và backend
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setIsLoading(true);
        if (!questionId || !answerId) {
          setIsLoading(false);
          return;
        }

        const { data } = await refetch();
        if (data) {
          const { processedReplies, total, pages } = processReplies(data);
          setTotalReplies(total);
          setTotalPages(pages);
          await fetchReplyTexts(processedReplies); // Fetch answerText từ backend
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    fetchReplies();
    const intervalId = setInterval(fetchReplies, pollInterval);
    return () => clearInterval(intervalId);
  }, [
    questionId,
    answerId,
    pageIndex,
    pageSize,
    pollInterval,
    refetch,
    processReplies,
    fetchReplyTexts,
  ]);

  // Xử lý lỗi từ contract
  useEffect(() => {
    if (contractError) {
      setError(contractError);
      setIsLoading(false);
    }
  }, [contractError]);

  // Hàm thay đổi trang
  const changePage = useCallback(
    (newPageIndex: number) => {
      if (newPageIndex > 0 && newPageIndex <= totalPages) {
        setPageIndex(newPageIndex);
      }
    },
    [totalPages]
  );

  // Hàm thay đổi kích thước trang
  const changePageSize = useCallback((newPageSize: number) => {
    if (newPageSize > 0) {
      setPageSize(newPageSize);
      setPageIndex(1); // Reset về trang 1 khi thay đổi pageSize
    }
  }, []);

  return {
    replies,
    totalReplies,
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
