'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxBackground({
  children,
  className = '',
}: ParallaxBackgroundProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = {
    damping: 20,
    mass: 0.5,
    stiffness: 40,
  };

  const rawBackgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']); // Reduced from 25%
  const backgroundY = useSpring(rawBackgroundY, springConfig);

  const rawOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.5]); // Reduced opacity range
  const opacity = useSpring(rawOpacity, springConfig);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.02, 1.05] // Reduced scale range
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/3 to-transparent" />
        <div className="absolute inset-0 bg-grid-primary/5" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
