'use client';

import { motion } from 'framer-motion';
import { CircleDollarSign } from 'lucide-react';
import { SparklesText } from '../magicui/sparkles-text';
import { Button } from '../ui/button';

export function AboutHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-primary/10 -z-10" />

      <div className="container mx-auto px-6 py-32 md:py-40 lg:py-48 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon + Badge */}
          <Button
            className="inline-flex items-center justify-center py-2 px-4 rounded-full mb-8 transition-transform transform hover:scale-105 "
            variant="outline"
          >
            <CircleDollarSign className="h-7 w-7 text-primary mr-2 animate-pulse" />
            <span className="font-medium text-primary/90 text-lg">
              Empowering Developers
            </span>
          </Button>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            <SparklesText
              text="Building the Future of Developer Q&A"
              sparklesCount={10}
            />
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Join a community where knowledge sharing is rewarded, and quality
            answers are incentivized through blockchain technology.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
