"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

const topics = [
  { name: 'Web3', count: 1234, color: 'from-blue-500 to-purple-500' },
  { name: 'AI/ML', count: 987, color: 'from-green-500 to-emerald-500' },
  { name: 'Cloud', count: 876, color: 'from-orange-500 to-red-500' },
  { name: 'Mobile', count: 765, color: 'from-pink-500 to-rose-500' },
]

export function TrendingTopics() {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Trending Topics</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className={`relative overflow-hidden group cursor-pointer`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{topic.count} questions</Badge>
                  <span className="text-sm text-muted-foreground">View all →</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}