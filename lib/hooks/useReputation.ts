"use client"

import { useState, useEffect } from 'react'
import { useAccount } from '@/lib/hooks/useAccount'

export function useReputation() {
  const { address } = useAccount()
  const [reputation, setReputation] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (address) {
      // TODO: Fetch reputation from blockchain
      // This is a mock implementation
      setReputation(750)
      setIsLoading(false)
    }
  }, [address])

  const getDiscountRate = () => {
    if (reputation >= 1000) return 0.5 // 50% discount
    if (reputation >= 500) return 0.75 // 25% discount
    return 1 // no discount
  }

  const getTrustLevel = () => {
    if (reputation >= 1000) return 'Expert'
    if (reputation >= 500) return 'Advanced'
    if (reputation >= 100) return 'Intermediate'
    return 'Beginner'
  }

  return {
    reputation,
    isLoading,
    getDiscountRate,
    getTrustLevel,
  }
}