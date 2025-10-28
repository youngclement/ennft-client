"use client"

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ReputationBadge } from '@/components/reputation/ReputationBadge';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function CommunityHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Number of cards per slide
  const cardsPerSlide = 3;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(highlights.length / (isMobile ? 1 : cardsPerSlide)));
  }, [isMobile]);

  const previous = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + Math.ceil(highlights.length / (isMobile ? 1 : cardsPerSlide))) % Math.ceil(highlights.length / (isMobile ? 1 : cardsPerSlide))
    );
  }, [isMobile]);

  useEffect(() => {
    if (!isPaused) {
      const id = setInterval(next, 6000);
      return () => clearInterval(id);
    }
    return undefined;
  }, [next, isPaused]);

  // Get the current batch of cards to display
  const getVisibleHighlights = () => {
    if (isMobile) {
      // For mobile, show only one card
      return [highlights[currentIndex]];
    }

    // For desktop, get 3 cards in the current group
    const startIndex = currentIndex * cardsPerSlide;
    return highlights.slice(startIndex, startIndex + cardsPerSlide);
  };

  const visibleHighlights = getVisibleHighlights();
  const totalGroups = Math.ceil(highlights.length / (isMobile ? 1 : cardsPerSlide));

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      transition: {
        duration: 0.5,
      }
    }),
  };

  return (
    <div className="relative py-16">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      <div className="relative container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Community Highlights</h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm">
          Celebrating outstanding contributions from our community members
        </p>

        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={previous}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 shadow-md hover:bg-background"
            aria-label="Previous highlights"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 shadow-md hover:bg-background"
            aria-label="Next highlights"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="min-h-[150px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex gap-6 justify-center"
              >
                {visibleHighlights.map((highlight) => (
                  <Card
                    key={highlight.id}
                    className="w-[380px] h-[160px] p-4 text-left border-primary/10 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-9 w-9 border border-primary/10">
                        <AvatarImage src={highlight.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">{highlight.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-sm truncate max-w-[180px]">{highlight.name}</div>
                        <ReputationBadge reputation={highlight.reputation} className="scale-[75%] origin-left" />
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-3 text-xs italic line-clamp-3">"{highlight.contribution}"</p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {highlight.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="hover:bg-primary/10 transition-colors cursor-pointer px-2 py-0.5 text-[10px]"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {highlight.tags.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">+{highlight.tags.length - 2}</span>
                      )}
                    </div>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom navigation dots & counter */}
          <div className="flex justify-center gap-2 mt-8">
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} / {totalGroups}
            </span>

            <div className="flex gap-1.5 ml-2">
              {Array.from({ length: totalGroups }).map((_, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-2 h-2 p-0 rounded-full",
                    currentIndex === idx
                      ? "bg-primary"
                      : "bg-primary/20 hover:bg-primary/40"
                  )}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const highlights = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    reputation: 1250,
    contribution: "Provided comprehensive guide on smart contract security best practices",
    tags: ["blockchain", "security", "solidity"],
  },
  {
    id: 2,
    name: "Alex Kumar",
    avatar: "https://i.pravatar.cc/150?u=alex",
    reputation: 980,
    contribution: "Created detailed tutorial series on Next.js 13 features",
    tags: ["next.js", "react", "typescript"],
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?u=maria",
    reputation: 875,
    contribution: "Helped optimize database queries for high-traffic applications",
    tags: ["postgresql", "optimization", "database"],
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://i.pravatar.cc/150?u=james",
    reputation: 1120,
    contribution: "Developed open-source AI libraries for image recognition",
    tags: ["machine-learning", "python", "computer-vision"],
  },
  {
    id: 5,
    name: "Priya Patel",
    avatar: "https://i.pravatar.cc/150?u=priya",
    reputation: 940,
    contribution: "Authored definitive guide to state management in modern React",
    tags: ["react", "redux", "state-management"],
  },
  {
    id: 6,
    name: "David Johnson",
    avatar: "https://i.pravatar.cc/150?u=david",
    reputation: 1050,
    contribution: "Created an accessible UI component library used by thousands",
    tags: ["accessibility", "ui", "component-library"],
  },
  {
    id: 7,
    name: "Lisa Wang",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    reputation: 930,
    contribution: "Optimized CI/CD pipelines reducing build times by 70%",
    tags: ["devops", "ci-cd", "github-actions"],
  },
  {
    id: 8,
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?u=michael",
    reputation: 1080,
    contribution: "Built tools for visualizing complex data structures in real-time",
    tags: ["data-viz", "algorithms", "javascript"],
  },
  {
    id: 9,
    name: "Sophie Taylor",
    avatar: "https://i.pravatar.cc/150?u=sophie",
    reputation: 890,
    contribution: "Developed a series on advanced GraphQL patterns and best practices",
    tags: ["graphql", "api", "tutorials"],
  },
  {
    id: 10,
    name: "Ryan Martinez",
    avatar: "https://i.pravatar.cc/150?u=ryan",
    reputation: 965,
    contribution: "Created serverless architecture blueprints for common use cases",
    tags: ["serverless", "aws", "architecture"],
  }
]