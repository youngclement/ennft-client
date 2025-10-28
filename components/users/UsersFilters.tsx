"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Award, Code, Zap } from 'lucide-react'

export function UsersFilters() {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Filter By</h3>
      <div className="space-y-2">
        {filters.map((filter) => (
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
        <h3 className="font-medium mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}

const filters = [
  { label: 'Most Reputation', icon: Award },
  { label: 'Top Contributors', icon: Star },
  { label: 'Recent Activity', icon: Zap },
  { label: 'Most Solutions', icon: Code },
]

const tags = [
  'react',
  'typescript',
  'blockchain',
  'solidity',
  'next.js',
  'postgresql'
]