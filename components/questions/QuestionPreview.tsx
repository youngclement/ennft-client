"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CircleDollarSign } from 'lucide-react'
import { AnswerContent } from './AnswerContent'

interface QuestionPreviewProps {
  title: string
  content: string
  tags: string[]
  bounty: number
}

export function QuestionPreview({ title, content, tags, bounty }: QuestionPreviewProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start gap-6 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <AnswerContent content={content} />
        </div>

        <div className="text-center">
          <div className="bg-primary/10 rounded-full p-3">
            <CircleDollarSign className="h-6 w-6 text-primary" />
          </div>
          <span className="block mt-1 font-semibold">{bounty}</span>
          <span className="text-xs text-muted-foreground">tokens</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  )
}