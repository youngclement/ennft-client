'use client';

import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { User } from '../types/SmartContractType';

export function useGetUsers(initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [users, setUsers] = useState<User[]>([]);

  const {
    data: contractData,
    error,
    isLoading: isLoadingContract,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    abi: contractABI,
    functionName: 'getUsers',
    args: [page, pageSize],
    query: {
      enabled: true,
      staleTime: 10000 * 60 * 5,
    },
  });

  useEffect(() => {
    if (!contractData || !Array.isArray(contractData)) return;

    const usersList: User[] = contractData[0] as User[];
    setUsers(usersList);
  }, [contractData]);

  const pagination = {
    currentPage: page,
    pageSize,
    totalUsers: (contractData?.[1] as bigint) ?? 0,
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
    users,
    error,
    isLoading: isLoadingContract,
    pagination,
    changePage,
    changePageSize,
    refetch,
  };
}
