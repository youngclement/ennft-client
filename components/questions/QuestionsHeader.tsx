"use client"

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export function QuestionsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">All Questions</h1>
        <p className="text-muted-foreground mt-1">
          Browse through questions from the community
        </p>
      </div>
      
      <Button asChild>
        <Link href="/questions/ask">
          <PlusCircle className="h-4 w-4 mr-2" />
          Ask Question
        </Link>
      </Button>
    </div>
  )
}