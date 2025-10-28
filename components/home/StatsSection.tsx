"use client"

import { Card } from '@/components/ui/card'
import { CircleDollarSign, Users, CheckCircle2, TrendingUp, Award, MessageSquare } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

export function StatsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Platform Statistics</h2>
        <p className="text-muted-foreground">Growing community of developers helping each other</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.name} stat={stat} inView={inView} delay={index * 100} />
        ))}
      </div>
    </div>
  )
}

interface StatCardProps {
  stat: {
    name: string
    value: string
    icon: React.ElementType
    description: string
    change?: string
  }
  inView: boolean
  delay: number
}

function StatCard({ stat, inView, delay }: StatCardProps) {
  const [count, setCount] = useState(0)
  const Icon = stat.icon
  const target = parseInt(stat.value.replace(/,/g, ''))

  useEffect(() => {
    if (inView) {
      const duration = 2000 // Animation duration in ms
      const steps = 60 // Number of steps
      const stepValue = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += stepValue
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [inView, target])

  return (
    <Card
      className="p-6 transition-all duration-500 hover:shadow-lg"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.5s ease-out ${delay}ms`
      }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {count.toLocaleString()}
            </span>
            {stat.change && (
              <span className="text-sm text-green-500">
                +{stat.change}%
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{stat.name}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{stat.description}</p>
    </Card>
  )
}

const stats = [
  {
    name: 'Active Users',
    value: '160',
    icon: Users,
    description: 'Developers actively participating',
    change: '12'
  },
  {
    name: 'Questions Solved',
    value: '88',
    icon: CheckCircle2,
    description: 'Successfully resolved questions',
    change: '8'
  },
  {
    name: 'Total Rewards',
    value: '215',
    icon: CircleDollarSign,
    description: 'Tokens distributed as rewards',
    change: '15'
  },
  {
    name: 'Expert Users',
    value: '78',
    icon: Award,
    description: 'High reputation members',
    change: '5'
  },
  {
    name: 'Daily Questions',
    value: '23',
    icon: MessageSquare,
    description: 'New questions per day',
    change: '10'
  },
  {
    name: 'Success Rate',
    value: '94',
    icon: TrendingUp,
    description: 'Questions get accepted answers',
    change: '3'
  }
]