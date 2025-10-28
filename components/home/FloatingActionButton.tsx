'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FloatingActionButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
                y: isVisible ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 z-50"
            aria-label="Scroll to top"
        >
            <ArrowUp size={20} />
        </motion.button>
    );
}