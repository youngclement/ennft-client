'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CircleDollarSign } from 'lucide-react';
import { Pacifico } from 'next/font/google';
import Link from 'next/link';
import { FloatingPaths } from '../kokonutui/hero-bg';
import { ShimmerButton } from '../magicui/shimmer-button';
import { TypewriterEffect } from '../ui/typewriter-effect';
import { Button } from '../ui/button';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

export function HeroSection() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden pt-[10px] h-[calc(100vh-64px)]">
      {/* Background FloatingPaths full width */}
      <div className="absolute inset-0 w-screen h-full z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full opacity-50 blur-[1px]"
          initial={{ y: -20 }}
          animate={{ y: 20 }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: 'easeInOut',
            repeatType: 'reverse',
          }}
        >
          {/* Container full width cho FloatingPaths */}
          <div className="w-screen absolute h-full left-0 right-0">
            <FloatingPaths position={1} />
            {/* <FloatingPaths position={-1} /> */}
          </div>
        </motion.div>
      </div>

      {/* Nội dung chính trong container giới hạn */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center rounded-full px-6 py-2 border border-border mb-8 bg-secondary/50 backdrop-blur-sm">
              <CircleDollarSign className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-foreground">
                Earn tokens by helping others
              </span>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-black tracking-tight mb-6 text-foreground">
              <TypewriterEffect
                className="font-extrabold"
                words={[
                  { text: 'Where' },
                  { text: 'Knowledge', className: 'text-primary' },
                  { text: 'Meets' },
                  { text: 'Rewards', className: 'text-primary' },
                ]}
              />
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-[1.3rem] mb-8 leading-relaxed">
              Ask questions with token bounties, provide valuable answers, and
              earn rewards. Join InquireA's blockchain-powered Q&A community
              today.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-11"
          >
            <Link href="/questions" passHref>
              <ShimmerButton className="px-8 py-3 font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                Explore Questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
