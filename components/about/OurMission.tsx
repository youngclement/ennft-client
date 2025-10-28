"use client"

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Target, Users, Shield } from 'lucide-react'

export function OurMission() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-muted-foreground">
          To revolutionize how developers help each other by creating a self-sustaining ecosystem of knowledge sharing and rewards.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const pillars = [
  {
    title: "Quality First",
    description: "Ensuring high-quality answers through token incentives and community validation.",
    icon: Target
  },
  {
    title: "Community Driven",
    description: "Building a supportive environment where developers help each other grow.",
    icon: Users
  },
  {
    title: "Fair & Transparent",
    description: "Using blockchain to ensure transparent reward distribution and accountability.",
    icon: Shield
  }
]