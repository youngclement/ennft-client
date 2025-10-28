"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tag, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function TrendingTags() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Trending Tags</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag.name} href={`/questions/tagged/${tag.name}`}>
            <Badge 
              variant="secondary"
              className="px-2.5 py-1 hover:bg-secondary/80 cursor-pointer"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag.name}
              <span className="ml-1.5 text-xs text-muted-foreground">
                ×{tag.count}
              </span>
            </Badge>
          </Link>
        ))}
      </div>
    </Card>
  )
}

const tags = [
  { name: 'react', count: 234 },
  { name: 'next.js', count: 189 },
  { name: 'typescript', count: 156 },
  { name: 'javascript', count: 142 },
  { name: 'tailwindcss', count: 98 },
  { name: 'supabase', count: 87 },
  { name: 'node.js', count: 76 },
  { name: 'prisma', count: 65 },
]