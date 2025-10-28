"use client"

import { Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ReputationBadgeProps {
  points: number
  className?: string
}

export function ReputationBadge({ points, className }: ReputationBadgeProps) {
  const getReputationTier = (points: number) => {
    if (points >= 1000) return 'Expert'
    if (points >= 500) return 'Advanced'
    if (points >= 100) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary" className={className}>
            <Shield className="h-3 w-3 mr-1" />
            {getReputationTier(points)}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{points} reputation points</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}