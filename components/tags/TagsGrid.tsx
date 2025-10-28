"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export function TagsGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tags.map((tag) => (
        <Link key={tag.name} href={`/questions/tagged/${tag.name}`}>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <Badge className="mb-2">{tag.name}</Badge>
            <p className="text-sm text-muted-foreground mb-3">
              {tag.description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span>{tag.questionsCount} questions</span>
              <span>{tag.todayCount} asked today</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

const tags = [
  {
    name: 'react',
    description: 'A JavaScript library for building user interfaces',
    questionsCount: 234,
    todayCount: 5,
  },
  {
    name: 'next.js',
    description: 'The React Framework for Production',
    questionsCount: 189,
    todayCount: 3,
  },
  {
    name: 'typescript',
    description: 'A typed superset of JavaScript',
    questionsCount: 156,
    todayCount: 4,
  },
  {
    name: 'javascript',
    description: 'A programming language for the web',
    questionsCount: 142,
    todayCount: 6,
  },
  {
    name: 'tailwindcss',
    description: 'A utility-first CSS framework',
    questionsCount: 98,
    todayCount: 2,
  },
  {
    name: 'supabase',
    description: 'An open source Firebase alternative',
    questionsCount: 87,
    todayCount: 1,
  },
]