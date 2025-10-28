"use client"

import { Card } from '@/components/ui/card'
import { Shield, AlertTriangle } from 'lucide-react'

interface QuestionInfoCardsProps {
  answersCount: number
  deadline: string
  isClosed: boolean
}

export function QuestionInfoCards({ answersCount, deadline, isClosed }: QuestionInfoCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-yellow-500" />
          <h3 className="font-medium">Security Note</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          All smart contract development advice should prioritize security best practices and undergo thorough auditing.
        </p>
      </Card>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Answer Guidelines</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Provide detailed explanations with code examples and security considerations.
        </p>
      </Card>
    </div>
  )
}