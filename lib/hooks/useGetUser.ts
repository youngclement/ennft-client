'use client';

import { useAccount, useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { User } from '@/lib/types/SmartContractType';
import { Address } from 'viem';

// Định nghĩa kiểu dữ liệu trả về từ hàm getUser trong contract
type UserData = {
  userAddress: Address;
  reputation: bigint;
  answerCount: bigint;
  questionCount: bigint;
  bestSolutionCount: bigint;
};

// Hàm kiểm tra dữ liệu trả về từ contract có hợp lệ không
function isValidUserData(data: unknown): data is UserData {
  return (
    data !== null &&
    typeof data === 'object' &&
    'reputation' in data &&
    'answerCount' in data &&
    'questionCount' in data &&
    'bestSolutionCount' in data &&
    (typeof (data as any).reputation === 'bigint' ||
      typeof (data as any).reputation === 'number') &&
    (typeof (data as any).answerCount === 'bigint' ||
      typeof (data as any).answerCount === 'number') &&
    (typeof (data as any).questionCount === 'bigint' ||
      typeof (data as any).questionCount === 'number') &&
    (typeof (data as any).bestSolutionCount === 'bigint' ||
      typeof (data as any).bestSolutionCount === 'number')
  );
}

export function useGetUser() {
  const { address: userAddress } = useAccount();

  const {
    data: contractData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'getUser',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress, // Chỉ gọi khi có userAddress
      staleTime: 1000 * 60 * 5, // Cache trong 5 phút
    },
  });

  const user: User | undefined = (() => {
    if (!contractData) return undefined;

    if (!isValidUserData(contractData)) {
      console.error('Invalid user data', contractData);
      return undefined;
    }

    return {
      userAddress: contractData.userAddress,
      reputation: BigInt(contractData.reputation),
      answerCount: BigInt(contractData.answerCount),
      questionCount: BigInt(contractData.questionCount),
      bestSolutionCount: BigInt(contractData.bestSolutionCount),
    };
  })();

  return {
    user, // Đối tượng User chứa toàn bộ thông tin
    error, // Lỗi nếu có
    isLoading, // Trạng thái đang tải
    userAddress, // Địa chỉ từ useAccount
    refetch, // Hàm để làm mới dữ liệu
  };
}
