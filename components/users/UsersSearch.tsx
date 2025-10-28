"use client"

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function UsersSearch() {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search users..."
        className="pl-9"
      />
    </div>
  )
}