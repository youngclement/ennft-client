"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <div className="container mx-auto px-4">
      <Card className="bg-primary/5 border-primary/20">
        <div className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
              <Mail className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Stay Updated</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest updates on new features, community highlights, and developer resources.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}