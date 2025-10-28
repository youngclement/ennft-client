"use client"

import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Shield, Zap, Award } from 'lucide-react'

export function ParallaxFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const containerTop = container.offsetTop
      const containerHeight = container.offsetHeight
      const windowHeight = window.innerHeight

      // Only animate when the section is in view
      if (scrollPosition + windowHeight > containerTop && 
          scrollPosition < containerTop + containerHeight) {
        cardsRef.current.forEach((card, index) => {
          if (!card) return
          
          const cardTop = card.offsetTop
          const offset = (scrollPosition + windowHeight - cardTop) * 0.2
          const rotation = Math.min(Math.max(-5 + (index * 5), -10), 10)
          
          card.style.transform = `
            translateY(${Math.min(offset, 100)}px) 
            rotate(${rotation}deg)
          `
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Reputation System
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                ref={el => cardsRef.current[index] = el}
                className="p-6 transition-all duration-500 hover:shadow-xl"
                style={{ transform: `rotate(${-5 + (index * 5)}deg)` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "Reputation Points",
    description: "Earn points by helping others and contributing valuable answers to the community.",
    icon: Shield,
  },
  {
    title: "Reduced Fees",
    description: "Higher reputation leads to lower fees when asking questions or using platform features.",
    icon: Zap,
  },
  {
    title: "Trust Level",
    description: "Build trust within the community and unlock exclusive privileges and rewards.",
    icon: Award,
  },
]