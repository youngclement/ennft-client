"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Star, Clock, Award } from 'lucide-react'

export function LeaderboardFilters() {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Time Period</h3>
      <div className="space-y-2">
        {timeFilters.map((filter) => (
          <Button
            key={filter.label}
            variant="ghost"
            className="w-full justify-start"
          >
            <filter.icon className="h-4 w-4 mr-2" />
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categoryFilters.map((filter) => (
            <Button
              key={filter.label}
              variant="ghost"
              className="w-full justify-start"
            >
              <filter.icon className="h-4 w-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}

const timeFilters = [
  { label: 'All Time', icon: Calendar },
  { label: 'This Month', icon: Star },
  { label: 'This Week', icon: Clock },
]

const categoryFilters = [
  { label: 'Overall Score', icon: Award },
  { label: 'Questions Solved', icon: Star },
  { label: 'Best Answers', icon: Award },
]