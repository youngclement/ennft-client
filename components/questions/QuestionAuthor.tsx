"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ReputationBadge } from '@/components/features/ReputationBadge'
import { formatAddress } from '@/lib/utils/questions'
import { User, Shield } from 'lucide-react'

interface QuestionAuthorProps {
  address: string
  reputation: number
  avatar?: string
}

export function QuestionAuthor({ address, reputation, avatar }: QuestionAuthorProps) {
  const formattedAddress = formatAddress(address)

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-full">
      <Avatar className="h-8 w-8 border-2 border-primary/10">
        {avatar ? (
          <AvatarImage src={avatar} alt={formattedAddress} />
        ) : (
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="font-medium">{formattedAddress}</span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            <span>{reputation} RP</span>
          </div>
        </div>
        <ReputationBadge points={reputation} />
      </div>
    </div>
  )
}