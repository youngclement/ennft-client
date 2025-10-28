import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Award } from 'lucide-react';

interface QuestionBubbleProps {
    question: string;
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    avatar?: string;
    reputation?: number;
}

export default function QuestionBubble({
    question,
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = 'from-white/[0.08]',
    avatar,
    reputation,
}: QuestionBubbleProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn('absolute', className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        'absolute inset-0 rounded-full flex items-center justify-between px-4',
                        'bg-linear-to-r to-transparent',
                        gradient,
                        'backdrop-blur-md border border-white/[0.15] dark:border-white/[0.1]',
                        'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]'
                    )}
                >
                    {avatar && (
                        <div className="flex-shrink-0 mr-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 dark:border-white/10">
                                <Image
                                    src={avatar}
                                    alt="User avatar"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <p className="text-foreground/90 font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis flex-grow mx-1">
                        {question}
                    </p>

                    {reputation && (
                        <div className="flex-shrink-0 ml-2 bg-background/30 dark:bg-background/20 text-xs font-semibold px-2 py-1 rounded-full text-foreground/80 dark:text-foreground/90 flex items-center">
                            <Award className="w-3 h-3 mr-1 text-amber-500 dark:text-amber-400" />
                            <span>{reputation.toLocaleString()} rep</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}