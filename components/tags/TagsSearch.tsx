"use client"

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function TagsSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search tags..."
        className="pl-9"
      />
    </div>
  )
}