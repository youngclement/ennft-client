import { TagsHeader } from '@/components/tags/TagsHeader'
import { TagsGrid } from '@/components/tags/TagsGrid'
import { TagsSearch } from '@/components/tags/TagsSearch'

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <TagsHeader />
      <TagsSearch />
      <TagsGrid />
    </div>
  )
}