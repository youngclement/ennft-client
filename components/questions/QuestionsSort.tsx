'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface QuestionsSortProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

export function QuestionsSort({
  sortOption,
  onSortChange,
}: QuestionsSortProps) {
  return (
    <div className="flex justify-end">
      <Select value={sortOption} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="votes">Most Votes</SelectItem>
          <SelectItem value="bounty">Highest Bounty</SelectItem>
          <SelectItem value="answers">Most Answers</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
