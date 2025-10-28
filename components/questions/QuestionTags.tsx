"use client"

import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface QuestionTagsProps {
  tags: string[]
}

export function QuestionTags({ tags }: QuestionTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link key={tag} href={`/questions/tagged/${tag}`}>
          <Badge 
            variant="secondary" 
            className="px-3 py-1 hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  )
}