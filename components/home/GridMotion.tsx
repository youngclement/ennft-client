"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GridMotionProps = {
    items: Array<string | JSX.Element>;
    className?: string;
    containerClassName?: string;
    itemClassName?: string;
};

export default function GridMotion({
    items,
    className,
    containerClassName,
    itemClassName,
}: GridMotionProps) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
                setHeight(containerRef.current.offsetHeight);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isImage = (item: string | JSX.Element): item is string => {
        return typeof item === "string" && (item.includes(".jpg") || item.includes(".png") || item.includes("unsplash"));
    };

    const renderItem = (item: string | JSX.Element, index: number) => {
        if (isImage(item)) {
            return (
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <Image
                        src={item}
                        alt={`Grid image ${index}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            );
        } else if (typeof item === "string") {
            return <div className="flex items-center justify-center">{item}</div>;
        } else {
            return item;
        }
    };

    return (
        <div
            className={cn("relative w-full h-[600px] overflow-hidden", className)}
            ref={containerRef}
        >
            <div className={cn("grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", containerClassName)}>
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className={cn(
                            "aspect-square bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden",
                            itemClassName
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                delay: index * 0.05
                            }
                        }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {renderItem(item, index)}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}