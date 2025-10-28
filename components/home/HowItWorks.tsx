"use client"

import { Card } from '@/components/ui/card'
import { CircleDollarSign, MessageSquare, Award, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeroHighlight } from '@/components/ui/hero-highlight'
import HeroVideoDialog from '../magicui/hero-video-dialog'

export function HowItWorks() {
  return (
    <HeroHighlight containerClassName="py-24 bg-white  transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            How It Works
          </h2>
          <p className="text-black dark:text-white text-lg md:text-xl max-w-2xl mx-auto">
            Discover how our platform simplifies getting help and earning rewards
          </p>
        </motion.div>

        <div className="relative">
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/jVqmKt-LfpA?si=poDnBRDnrRt9owu_"
            thumbnailSrc="https://i.ibb.co/tPwzYWBx/image.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/jVqmKt-LfpA?si=poDnBRDnrRt9owu_"
            thumbnailSrc="https://i.ibb.co/tPwzYWBx/image.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
    </HeroHighlight>
  )
}

