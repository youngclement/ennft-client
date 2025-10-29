"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Info,
  MessageSquare,
  PlusCircle,
  GraduationCap,
  BookOpen,
  Target,
  Award,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomConnectButton } from "../wallet/CustomConnectWallet";
import Logo from "../common/Logo";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  // Lắng nghe sự kiện scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Set trạng thái khi scrollY > 0
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />

            <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
              SolanaLearn
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            {/* <Button
              variant={pathname === '/questions' ? 'secondary' : 'ghost'}
              size="sm"
              className=" dark:text-gray-200"
              asChild
            >
              <Link href="/questions">
                <MessageSquare className="h-4 w-4 mr-2" />
                Questions
              </Link>
            </Button> */}

            <Button
              variant={pathname === "/elearning" ? "secondary" : "ghost"}
              size="sm"
              className=" dark:text-gray-200"
              asChild
            >
              <Link href="/elearning">
                <GraduationCap className="h-4 w-4 mr-2" />
                eLearning
              </Link>
            </Button>

            <Button
              variant={
                pathname === "/elearning/dashboard" ? "secondary" : "ghost"
              }
              size="sm"
              className=" dark:text-gray-200"
              asChild
            >
              <Link href="/elearning/dashboard">
                <BookOpen className="h-4 w-4 mr-2" />
                My Learning
              </Link>
            </Button>

            <Button
              variant={pathname === "/elearning/nfts" ? "secondary" : "ghost"}
              size="sm"
              className=" dark:text-gray-200"
              asChild
            >
              <Link href="/elearning/nfts">
                <Award className="h-4 w-4 mr-2" />
                NFTs
              </Link>
            </Button>

            <Button
              variant={
                pathname === "/elearning/challenges" ? "secondary" : "ghost"
              }
              size="sm"
              className=" dark:text-gray-200"
              asChild
            >
              <Link href="/elearning/challenges">
                <Target className="h-4 w-4 mr-2" />
                Challenges
              </Link>
            </Button>

            {/* <Button
              variant={pathname === '/about' ? 'secondary' : 'ghost'}
              size="sm"
              className=" dark:text-gray-200"
              asChild
            >
              <Link href="/about">
                <Info className="h-4 w-4 mr-2" />
                About
              </Link>
            </Button> */}
          </nav>
        </div>

        {/* Công cụ và nút hành động */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild size="sm">
            <Link href="/questions/ask">
              <PlusCircle className="h-4 w-4 mr-2" />
              Ask Question
            </Link>
          </Button>

          {/* <CustomConnectButton /> */}
        </div>
      </div>
    </header>
  );
}
