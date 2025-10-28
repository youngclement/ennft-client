"use client"

import { Button } from '@/components/ui/button'
import { CircleDollarSign, MessageSquare, Share2, Flag } from 'lucide-react'

interface AnswerActionsProps {
  hasComments: boolean
  onToggleComments: () => void
  rewardAmount: number
}

export function AnswerActions({ hasComments, onToggleComments, rewardAmount }: AnswerActionsProps) {
  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onToggleComments}
          className="text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          {hasComments ? 'Hide Comments' : 'Add Comment'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Flag className="h-4 w-4 mr-1" />
          Report
        </Button>
      </div>
      
      {rewardAmount > 0 && (
        <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
          <CircleDollarSign className="h-4 w-4" />
          <span>Earned {rewardAmount} tokens</span>
        </div>
      )}
    </div>
  )
}