"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AnimatePresence, motion } from "framer-motion";

type LoadingContextType = {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
};

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    useEffect(() => {
        setIsLoading(true);

        // Random loading time between 800ms and 2000ms for a natural feel
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 800 + Math.random() * 1200);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        className="fixed inset-0 bg-background z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LoadingSpinner />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </LoadingContext.Provider>
    );
}