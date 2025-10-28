"use client"

import { useState } from 'react'
import { Gavel, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert } from '@/components/ui/alert'

interface ArbitrationCaseProps {
  questionId: string
  onSubmit: (description: string) => Promise<void>
}

export function ArbitrationCase({ questionId, onSubmit }: ArbitrationCaseProps) {
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      await onSubmit(description)
      setDescription('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Gavel className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold">Request Arbitration</h3>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <p className="text-sm">
          Arbitration cases are reviewed by DAO members. Please provide detailed information.
        </p>
      </Alert>

      <Textarea
        placeholder="Describe the issue in detail..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[100px]"
      />

      <Button 
        onClick={handleSubmit} 
        disabled={!description || isSubmitting}
        className="w-full"
      >
        Submit Case
      </Button>
    </Card>
  )
}