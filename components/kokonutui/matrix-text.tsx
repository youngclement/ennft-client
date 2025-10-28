"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterState {
    char: string;
    isMatrix: boolean;
    isSpace: boolean;
    colorVariant: number;
}

interface MatrixTextProps {
    text?: string;
    className?: string;
    initialDelay?: number;
    letterAnimationDuration?: number;
    letterInterval?: number;
}

const MatrixText = ({
    text = "HelloWorld!",
    className,
    initialDelay = 200,
    letterAnimationDuration = 700,
    letterInterval = 150,
}: MatrixTextProps) => {
    const [letters, setLetters] = useState<LetterState[]>(() =>
        text.split("").map((char) => ({
            char,
            isMatrix: false,
            isSpace: char === " ",
            colorVariant: Math.floor(Math.random() * 5) // Now 5 color variants
        }))
    );
    const [isAnimating, setIsAnimating] = useState(false);

    // Generate more advanced random characters - crypto-style
    const getRandomChar = useCallback(() => {
        const options = [
            // Binary style characters
            () => Math.random() > 0.5 ? "1" : "0",

            // Crypto address style characters
            () => {
                const hexChars = "0123456789abcdef";
                return hexChars[Math.floor(Math.random() * hexChars.length)];
            },

            // 0x prefix style (for certain positions)
            () => Math.random() > 0.8 ? "0x" : "0",

            // Special tech symbols
            () => {
                const specialChars = "∞§¥€£←→↑↓";
                return specialChars[Math.floor(Math.random() * specialChars.length)];
            }
        ];

        const selectedOption = Math.floor(Math.random() * options.length);
        return options[selectedOption]();
    }, []);

    const animateLetter = useCallback(
        (index: number) => {
            if (index >= text.length) return;

            const animationFrames = Math.floor(Math.random() * 2) + 3;
            let frameCount = 0;

            const runFrame = () => {
                requestAnimationFrame(() => {
                    setLetters((prev) => {
                        const newLetters = [...prev];
                        if (!newLetters[index].isSpace) {
                            newLetters[index] = {
                                ...newLetters[index],
                                char: getRandomChar(),
                                isMatrix: true,
                                colorVariant: Math.floor(Math.random() * 5) // Now 5 variants
                            };
                        }
                        return newLetters;
                    });

                    frameCount++;

                    if (frameCount < animationFrames) {
                        setTimeout(runFrame, letterAnimationDuration / animationFrames);
                    } else {
                        setTimeout(() => {
                            setLetters((prev) => {
                                const newLetters = [...prev];
                                newLetters[index] = {
                                    ...newLetters[index],
                                    char: text[index],
                                    isMatrix: false,
                                };
                                return newLetters;
                            });
                        }, letterAnimationDuration / 2);
                    }
                });
            };

            runFrame();
        },
        [getRandomChar, text, letterAnimationDuration]
    );

    const startAnimation = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        let currentIndex = 0;

        const animate = () => {
            if (currentIndex >= text.length) {
                setIsAnimating(false);
                return;
            }

            animateLetter(currentIndex);
            currentIndex++;
            setTimeout(animate, letterInterval);
        };

        animate();
    }, [animateLetter, text, isAnimating, letterInterval]);

    useEffect(() => {
        const timer = setTimeout(startAnimation, initialDelay);
        return () => clearTimeout(timer);
    }, [startAnimation, initialDelay]);

    const motionVariants = useMemo(
        () => ({
            initial: {
                opacity: 0.8,
            },
            matrix0: {
                color: "#39ff14", // Ultra bright green (neon green)
                textShadow: "0 0 7px #39ff14, 0 0 12px #39ff14, 0 0 21px #39ff14",
            },
            matrix1: {
                color: "#00ffff", // Bright cyan
                textShadow: "0 0 7px #00ffff, 0 0 12px #00ffff, 0 0 21px #00ffff",
            },
            matrix2: {
                color: "#fffc00", // Bright yellow (Snapchat yellow)
                textShadow: "0 0 7px #fffc00, 0 0 12px #fffc00, 0 0 21px #fffc00",
            },
            matrix3: {
                color: "#fe00fe", // Bright magenta
                textShadow: "0 0 7px #fe00fe, 0 0 12px #fe00fe, 0 0 21px #fe00fe",
            },
            matrix4: {
                color: "#0ff0fc", // Electric blue
                textShadow: "0 0 7px #0ff0fc, 0 0 12px #0ff0fc, 0 0 21px #0ff0fc",
            },
            normal: {
                color: "currentColor",
                textShadow: "0 0 3px currentColor",
                opacity: 1
            },
        }),
        []
    );

    return (
        <div
            className={cn(
                "flex items-center justify-center text-black dark:text-white",
                className
            )}
            aria-label="Matrix text animation"
        >
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-wrap items-center justify-center">
                    {letters.map((letter, index) => (
                        <motion.div
                            key={`${index}-${letter.char}-${letter.isMatrix}`}
                            className="font-mono text-5xl font-bold w-[1.15ch] text-center overflow-hidden" // Larger text (text-5xl)
                            initial="initial"
                            animate={letter.isMatrix ? `matrix${letter.colorVariant}` : "normal"}
                            variants={motionVariants}
                            transition={{
                                duration: 0.25,
                                ease: "easeInOut",
                            }}
                            style={{
                                display: "inline-block",
                                fontVariantNumeric: "tabular-nums",
                                fontWeight: letter.isMatrix ? 700 : 600,
                            }}
                        >
                            {letter.isSpace ? "\u00A0" : letter.char}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatrixText;