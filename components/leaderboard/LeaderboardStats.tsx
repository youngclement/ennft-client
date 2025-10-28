"use client"

import { Card } from '@/components/ui/card'
import { Award, Star, Target, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function LeaderboardStats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <StatCard {...stat} index={index} />
        </motion.div>
      ))}
    </div>
  )
}

function StatCard({ title, value, icon: Icon, index }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-300 ${isHovered ? 'shadow-md translate-y-[-2px]' : ''
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className={`p-3 rounded-xl bg-primary/10 ${isHovered ? 'bg-primary/15' : ''
            }`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            delay: index * 0.1 + 0.2,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <motion.div
            animate={isHovered ? {
              rotate: [0, 15, -15, 10, -10, 0],
              transition: { duration: 0.5 }
            } : {}}
          >
            <Icon className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <motion.p
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <CountAnimation targetValue={value} />
          </motion.p>
        </div>
      </div>
    </Card>
  )
}

// Simple count-up animation component
function CountAnimation({ targetValue }: { targetValue: string }) {
  const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''));
  const suffix = targetValue.replace(/[0-9]/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500; // ms
    const steps = 30;
    const stepValue = numericValue / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      setCount(Math.min(Math.floor(stepValue * currentStep), numericValue));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [numericValue]);

  return <>{count}{suffix}</>;
}

const stats = [
  {
    title: "Total Reputation",
    value: "3K2",
    icon: Award
  },
  {
    title: "Questions Solved",
    value: "88",
    icon: Target
  },
  {
    title: "Active Users",
    value: "160",
    icon: Users
  },
  {
    title: "Expert Users",
    value: "78",
    icon: Star
  }
]