"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ReputationBadge } from '@/components/features/ReputationBadge'
import { Clock, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Author {
  name: string
  avatar?: string
  reputation: number
}

interface AnswerMetadataProps {
  author: Author
  createdAt: number
}

export function AnswerMetadata({ author, createdAt }: AnswerMetadataProps) {
  if (!author) return null

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          {author.avatar ? (
            <AvatarImage src={author.avatar} alt={author.name} />
          ) : (
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          )}
          <AvatarFallback>{author.name?.[0] || '?'}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{author.name}</div>
          <ReputationBadge points={author.reputation} />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{formatDistanceToNow(new Date(createdAt))} ago</span>
      </div>
    </div>
  )
}