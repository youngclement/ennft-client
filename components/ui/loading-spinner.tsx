'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

interface LoadingEffectProps {
  className?: string;
  showProgressBar?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  className,
  showProgressBar = true,
  showText = true,
  size = 'md',
  message = 'Loading',
  fullScreen = false,
}: LoadingEffectProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [progress, setProgress] = useState(0);

  // Size mapping
  const sizeMap = {
    sm: { logo: 40, container: 'w-16 h-16' },
    md: { logo: 64, container: 'w-24 h-24' },
    lg: { logo: 80, container: 'w-32 h-32' },
  };

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10;
        return next > 100 ? 100 : next;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  // Animation variants for logo
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Animation variants for paths in logo
  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
          delay: i * 0.2,
          ease: [0.33, 1, 0.68, 1],
        },
        opacity: {
          duration: 0.4,
          delay: i * 0.2,
        },
      },
    }),
  };

  // Pulse animation for the container
  const pulseVariants = {
    initial: {
      boxShadow: `0 0 0 0 ${
        isDark ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0)'
      }`,
    },
    animate: {
      boxShadow: [
        `0 0 0 0 ${isDark ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0)'}`,
        `0 0 0 10px ${
          isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
        }`,
        `0 0 0 20px ${isDark ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0)'}`,
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeOut',
      },
    },
  };

  // Text animation for dots
  const dotsVariants = {
    animate: {
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Determine the container classes based on fullScreen prop
  const containerClasses = fullScreen
    ? 'fixed inset-0 w-full h-full flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm'
    : 'w-full h-full flex items-center justify-center';

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Main container with pulse effect */}
        <motion.div
          className={cn(
            'relative flex items-center justify-center rounded-full',
            sizeMap[size].container
          )}
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          {/* Rotating ring */}
          <motion.div
            className={cn(
              'absolute inset-0 rounded-full border-2',
              isDark ? 'border-white/20' : 'border-black/10'
            )}
            style={{ borderTopColor: isDark ? 'white' : 'black' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Logo with path animation */}
          <motion.svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 360 360"
            width={sizeMap[size].logo}
            height={sizeMap[size].logo}
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="relative z-10"
          >
            <g>
              <motion.path
                custom={0}
                variants={pathVariants}
                initial="initial"
                animate="animate"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="none"
                stroke={isDark ? '#FFFFFF' : '#121212'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M107.05 214.51L107.05 136.11L160.94 136.11L160.94 108.37L79.3 108.37L79.3 242.25L160.94 242.25L160.94 214.51Z"
              />
              <motion.path
                custom={1}
                variants={pathVariants}
                initial="initial"
                animate="animate"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="none"
                stroke={isDark ? '#FFFFFF' : '#121212'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M282.33 80.62L160.94 80.63L160.94 108.37L254.59 108.37L254.59 214.51L192.15 214.51L160.94 242.25L160.94 279.38L202.7 242.25L282.33 242.25Z"
              />
              <motion.path
                custom={2}
                variants={pathVariants}
                initial="initial"
                animate="animate"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="none"
                stroke={isDark ? '#FFFFFF' : '#121212'}
                strokeWidth="6"
                strokeLinecap="round"
                d="M138.4 160.83c-7.66 0-13.87 6.21-13.87 13.87s6.21 13.87 13.87 13.87c7.66 0 13.87-6.21 13.87-13.87 S146.06 160.83 138.4 160.83z"
              />
              <motion.path
                custom={3}
                variants={pathVariants}
                initial="initial"
                animate="animate"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="none"
                stroke={isDark ? '#FFFFFF' : '#121212'}
                strokeWidth="6"
                strokeLinecap="round"
                d="M180.82 160.83c-7.66 0-13.87 6.21-13.87 13.87s6.21 13.87 13.87 13.87c7.66 0 13.87-6.21 13.87-13.87 S188.48 160.83 180.82 160.83z"
              />
              <motion.path
                custom={4}
                variants={pathVariants}
                initial="initial"
                animate="animate"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="none"
                stroke={isDark ? '#FFFFFF' : '#121212'}
                strokeWidth="6"
                strokeLinecap="round"
                d="M223.24 188.57c7.66 0 13.87-6.21 13.87-13.87s-6.21-13.87-13.87-13.87c-7.66 0-13.87 6.21-13.87 13.87 S215.58 188.57 223.24 188.57z"
              />
            </g>
          </motion.svg>
        </motion.div>

        {/* Progress bar */}
        {showProgressBar && (
          <div className="w-48 relative">
            <div
              className={cn(
                'h-1 rounded-full overflow-hidden bg-opacity-20',
                isDark ? 'bg-white/10' : 'bg-black/10'
              )}
            >
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  isDark ? 'bg-white' : 'bg-black'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeInOut' }}
              />
            </div>
            <motion.div
              className={cn(
                'absolute -bottom-6 text-xs font-medium',
                isDark ? 'text-white/70' : 'text-black/70'
              )}
              style={{ left: `${progress}%` }}
              animate={{ x: '-50%' }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        )}

        {/* Text animation */}
        {showText && (
          <div className="flex items-center">
            {/* <motion.p
              className={cn(
                'text-base font-medium',
                isDark ? 'text-white' : 'text-black'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {message}
            </motion.p> */}
            <div className="flex ml-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  variants={dotsVariants}
                  animate="animate"
                  custom={i}
                  className={cn(
                    'w-1 h-1 mx-0.5 rounded-full',
                    isDark ? 'bg-white' : 'bg-black'
                  )}
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
