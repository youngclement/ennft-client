"use client"

import { Users } from 'lucide-react'

export function UsersHeader() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Community Members</h1>
      </div>
      <p className="text-muted-foreground">
        Browse and connect with developers in our community
      </p>
    </div>
  )
}