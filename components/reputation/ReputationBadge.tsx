"use client"

import { Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ReputationBadgeProps {
  reputation: number
  className?: string
  showTooltip?: boolean
}

export function ReputationBadge({ reputation, className, showTooltip = true }: ReputationBadgeProps) {
  const badge = (
    <Badge variant="secondary" className={className}>
      <Shield className="h-3 w-3 mr-1" />
      {reputation} RP
    </Badge>
  )

  if (!showTooltip) return badge

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">Reputation Points</p>
            <p className="text-muted-foreground">Earned through community contributions</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}