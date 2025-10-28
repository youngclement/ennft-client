'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  delay?: number;
  spring?: boolean;
}

export function ParallaxSection({
  children,
  offset = 25, // Reduced from 50
  className = '',
  delay = 0,
  spring = true,
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const springConfig = {
    damping: 20, // Increased damping for less bouncy effect
    mass: 0.5, // Increased mass for more stability
    stiffness: 40, // Reduced stiffness for smoother motion
  };

  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = spring ? useSpring(rawY, springConfig) : rawY;

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8] // Reduced opacity range
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.99, 1, 1, 0.99] // Reduced scale range
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ y, scale }}
        initial={{ opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6, // Reduced duration
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
