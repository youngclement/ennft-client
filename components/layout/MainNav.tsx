"use client";

import dynamic from "next/dynamic";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  PlusCircle,
  GraduationCap,
  BookOpen,
  Target,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { truncateAddress } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from "../common/Logo";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const { connected, publicKey, sendTransaction, disconnect } = useWallet();
  const { connection } = useConnection();

  // Lắng nghe sự kiện scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Set trạng thái khi scrollY > 0
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addressLabel = publicKey ? truncateAddress(publicKey.toBase58()) : "";

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
          {connected ? (
            <>
              <Button asChild size="sm">
                <Link href="/questions/ask">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Ask Question
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel className="font-mono text-xs">
                    {addressLabel}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => disconnect()}
                    className="text-red-600 focus:bg-red-100 dark:text-red-500 dark:focus:bg-red-900"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </div>
    </header>
  );
}

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

function ConnectWalletButton() {
  return (
    <WalletMultiButtonDynamic
      className="!bg-primary"
      // className={buttonVariants({ size: "sm" })}
    />
  );
}
