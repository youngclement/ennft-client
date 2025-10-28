import { LeaderboardHeader } from '@/components/leaderboard/LeaderboardHeader'
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable'
import { LeaderboardStats } from '@/components/leaderboard/LeaderboardStats'
import { LeaderboardFilters } from '@/components/leaderboard/LeaderboardFilters'

export const metadata = {
  title: 'Leaderboard - DevForum',
  description: 'Top contributors and their achievements',
}

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <LeaderboardHeader />
      <LeaderboardStats />
      
      <div className="grid lg:grid-cols-[240px,1fr] gap-8">
        <LeaderboardFilters />
        <LeaderboardTable />
      </div>
    </div>
  )
}