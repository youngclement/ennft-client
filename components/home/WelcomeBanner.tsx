'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const lastClosed = localStorage.getItem('welcomeBannerLastClosed');
    const lastClosedDate = lastClosed ? new Date(lastClosed) : null;
    const today = new Date().toDateString(); // Lấy ngày hiện tại (YYYY-MM-DD)

    if (!lastClosedDate || lastClosedDate.toDateString() !== today) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('welcomeBannerLastClosed', new Date().toISOString());
  };

  if (!isVisible) return null;

  return (
    <Card className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2">👋 Welcome to DevForum</h2>
        <p className="text-muted-foreground">
          Join our community of developers helping each other while earning
          rewards. Get started by exploring questions or sharing your knowledge.
        </p>
      </div>
    </Card>
  );
}
