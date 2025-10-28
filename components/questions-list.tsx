"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CircleDollarSign, MessageSquare, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

// This would come from your API
const questions = [
  {
    id: '1',
    title: 'How to implement authentication in Next.js 13 with Supabase?',
    content: 'I\'m trying to implement authentication in my Next.js 13 application using Supabase...',
    bounty: 50,
    answers: 3,
    votes: 12,
    tags: ['next.js', 'supabase', 'authentication'],
    author: 'johndoe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '2',
    title: 'Best practices for handling state in React components',
    content: 'What are the current best practices for managing state in React components?...',
    bounty: 30,
    answers: 5,
    votes: 8,
    tags: ['react', 'javascript', 'state-management'],
    author: 'janedoe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

export default function QuestionsList() {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id} className="p-6">
          <div className="flex gap-6">
            {/* Stats */}
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <div className="text-center">
                <ThumbsUp className="h-5 w-5 mx-auto" />
                <span className="text-sm">{question.votes}</span>
              </div>
              <div className="text-center">
                <MessageSquare className="h-5 w-5 mx-auto" />
                <span className="text-sm">{question.answers}</span>
              </div>
              <div className="text-center">
                <CircleDollarSign className="h-5 w-5 mx-auto" />
                <span className="text-sm">{question.bounty}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div>
                <Link 
                  href={`/questions/${question.id}`}
                  className="text-xl font-semibold hover:text-primary"
                >
                  {question.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {question.content.substring(0, 200)}...
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Asked by {question.author}</span>
                <span>{formatDistanceToNow(question.createdAt)} ago</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}