export interface Question {
  id: string
  asker: string
  questionText: string
  rewardAmount: number
  createdAt: number
  isClosed: boolean
  chosenAnswerId: number
  deadline: string
}

export interface Answer {
  id: string
  responder: string
  answerText: string
  upvotes: number
  rewardAmount: number
  author: string
}

export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function calculateTimeLeft(deadline: string): string {
  const now = new Date().getTime()
  const deadlineTime = new Date(deadline).getTime()
  const distance = deadlineTime - now

  if (distance < 0) return 'Expired'

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

  return `${days}d ${hours}h ${minutes}m`
}