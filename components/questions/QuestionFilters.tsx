'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, TrendingUp, Award, MessageSquare } from 'lucide-react';

interface QuestionFiltersProps {
  onFilterChange: (filter: string) => void;
}

export function QuestionFilters({ onFilterChange }: QuestionFiltersProps) {
  return (
    <Card className="p-3 rounded-lg shadow-md bg-background/10">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-base text-foreground/80 mb-3">
            Filter By
          </h3>
          <div className="space-y-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                className="flex items-center gap-3 w-full py-2 px-3 rounded-lg transition-all duration-200 hover:bg-accent hover:text-primary active:scale-95"
                onClick={() => onFilterChange(filter.name)}
              >
                <filter.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{filter.name}</span>
                <Badge
                  variant="secondary"
                  className="ml-auto px-2 py-1 text-xs bg-secondary/50"
                >
                  {filter.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-base text-foreground/80 mb-3">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag.name}
                variant="secondary"
                className="cursor-pointer px-3 py-1 text-xs font-medium bg-secondary/60 hover:bg-secondary/80 transition-all duration-200"
                onClick={() => onFilterChange(tag.name)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

const filters = [
  { name: 'Recent', icon: Clock, count: 124 },
  { name: 'Most Voted', icon: TrendingUp, count: 89 },
  { name: 'Highest Bounty', icon: Award, count: 56 },
  { name: 'Unanswered', icon: MessageSquare, count: 23 },
];

const popularTags = [
  { name: 'react' },
  { name: 'next.js' },
  { name: 'typescript' },
  { name: 'javascript' },
  { name: 'tailwindcss' },
];
