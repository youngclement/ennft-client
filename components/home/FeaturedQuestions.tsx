"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CircleDollarSign, MessageSquare, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { useGetQuestions } from '@/lib/hooks/useGetQuestions'
import { useState, useEffect } from 'react'
import { formatEther } from 'viem'
import { useReadContract } from 'wagmi'
import { contractABI } from '@/lib/contracts/contractABI'

export function FeaturedQuestions() {
  const { questions: allQuestions, isLoading } = useGetQuestions();
  const [featuredQuestions, setFeaturedQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (allQuestions.length > 0) {
      // Sort by reward amount and take top 5
      const sorted = [...allQuestions]
        .sort((a, b) => Number(b.rewardAmount) - Number(a.rewardAmount))
        .slice(0, 5);

      // Process questions and fetch their answer counts
      const processQuestions = async () => {
        const processedQuestions = await Promise.all(sorted.map(async (question) => {
          // Get answer count for this question directly from contract
          let answerCount = 0;
          try {
            const result = await fetch(`/api/questions/${question.id}/answerCount`);
            if (result.ok) {
              const data = await result.json();
              answerCount = data.count || 0;
            }
          } catch (error) {
            console.error(`Failed to fetch answer count for question ${question.id}`, error);
          }

          return {
            id: question.id.toString(),
            title: question.questionText,
            bounty: Number(formatEther(question.rewardAmount)).toFixed(2),
            answers: answerCount,
            tags: question.category?.split(',').map((tag: string) => tag.trim()) || ['general'],
            author: question.asker.slice(0, 6) + '...' + question.asker.slice(-4),
            createdAt: new Date(Number(question.createdAt) * 1000),
          };
        }));

        setFeaturedQuestions(processedQuestions);
      };

      processQuestions();
    }
  }, [allQuestions]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Questions</h2>
        <Button variant="ghost" asChild>
          <Link href="/questions">View All</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-6">
                <div className="h-12 w-12 bg-muted rounded-md animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            </Card>
          ))
        ) : featuredQuestions.length > 0 ? (
          featuredQuestions.map((question) => (
            <Card key={question.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <div className="text-center">
                    <CircleDollarSign className="h-5 w-5 mx-auto text-primary" />
                    <span className="text-sm font-medium">{question.bounty}</span>
                  </div>
                  <div className="text-center">
                    <MessageSquare className="h-5 w-5 mx-auto" />
                    <span className="text-sm">{question.answers}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <Link
                    href={`/questions/${question.id}`}
                    className="text-xl font-semibold hover:text-primary transition-colors"
                  >
                    {question.title}
                  </Link>

                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Asked by {question.author}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDistanceToNow(question.createdAt)} ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No questions available at the moment</p>
          </div>
        )}
      </div>
    </div>
  )
}