"use client"

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Heart, Lightbulb, Scale, Gem } from 'lucide-react'

export function CommunityValues() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const values = [
  {
    title: "Community First",
    description: "We believe in the power of community and collective knowledge sharing. Every decision we make is guided by what's best for our developer community.",
    icon: Heart
  },
  {
    title: "Innovation",
    description: "We're constantly pushing the boundaries of what's possible in developer Q&A platforms through blockchain technology and AI.",
    icon: Lightbulb
  },
  {
    title: "Fairness",
    description: "Our token-based reward system ensures fair compensation for valuable contributions and maintains high answer quality.",
    icon: Scale
  },
  {
    title: "Quality",
    description: "We maintain high standards for both questions and answers, ensuring our platform remains a valuable resource for developers.",
    icon: Gem
  }
]