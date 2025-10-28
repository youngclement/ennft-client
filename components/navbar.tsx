'use client';

import {
  CircleDollarSign,
  MessageSquare,
  PlusCircle,
  Tag,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <CircleDollarSign className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">InquireA</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/questions"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Questions</span>
            </Link>
            <Link
              href="/tags"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="default" size="sm" asChild>
            <Link href="/questions/ask">
              <PlusCircle className="h-4 w-4 mr-2" />
              Ask Question
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
