'use client';

import { useState, useEffect } from 'react';
import { Award, MessageCircle, Trophy, Star, CircleDollarSign, Rocket, Heart } from 'lucide-react';
import { ToastNotification } from './ToastNotification';

// Sample notification data
const notificationData = [
  {
    title: "New Answer",
    message: "Your question about smart contracts received a new answer",
    userInfo: {
      name: "Sarah Chen",
      title: "Senior Developer",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      reputation: 3285
    },
    icon: <MessageCircle className="h-4 w-4" />
  },
  {
    title: "Token Reward",
    message: "You received 50 tokens for your helpful answer",
    userInfo: {
      name: "Alex Wong",
      title: "Blockchain Expert",
      avatar: "https://i.pravatar.cc/150?u=alex",
      reputation: 7649
    },
    icon: <CircleDollarSign className="h-4 w-4" />
  },
  {
    title: "Achievement Unlocked",
    message: "Congratulations! You've earned the 'Problem Solver' badge",
    userInfo: {
      name: "Raj Patel",
      title: "Community Manager",
      avatar: "https://i.pravatar.cc/150?u=raj",
      reputation: 12450
    },
    icon: <Trophy className="h-4 w-4" />
  },
  {
    title: "Featured Answer",
    message: "Your answer was selected as the most helpful this week",
    userInfo: {
      name: "Emily Johnson",
      title: "Content Curator",
      avatar: "https://i.pravatar.cc/150?u=emily",
      reputation: 5823
    },
    icon: <Star className="h-4 w-4" />
  },
  {
    title: "Rising Star",
    message: "You're in the top 10% of contributors this month!",
    userInfo: {
      name: "David Kim",
      title: "Full-Stack Developer",
      avatar: "https://i.pravatar.cc/150?u=david",
      reputation: 9341
    },
    icon: <Rocket className="h-4 w-4" />
  },
  {
    title: "Question Liked",
    message: "Your question about token economics received 15 upvotes",
    userInfo: {
      name: "Leila Hassan",
      title: "Crypto Enthusiast",
      avatar: "https://i.pravatar.cc/150?u=leila",
      reputation: 2176
    },
    icon: <Heart className="h-4 w-4" />
  }
];

export function NotificationService() {
  const [currentNotification, setCurrentNotification] = useState<number | null>(null);

  useEffect(() => {
    // Show a random notification after a random delay of at least 30 seconds
    const showRandomNotification = () => {
      const randomDelay = Math.floor(Math.random() * 15000 + 30000); // 30-45 seconds
      // const randomDelay = Math.floor(Math.random() * (3000 - 1500) + 1500); // Development testing only

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * notificationData.length);
        setCurrentNotification(randomIndex);

        // Hide after the notification has been shown
        setTimeout(() => {
          setCurrentNotification(null);
          // Schedule the next notification
          showRandomNotification();
        }, 8000);
      }, randomDelay);
    };

    // Start the cycle
    showRandomNotification();

    // Cleanup on unmount
    return () => {
      setCurrentNotification(null);
    };
  }, []);

  if (currentNotification === null) {
    return null;
  }

  const notification = notificationData[currentNotification];

  return (
    <ToastNotification
      title={notification.title}
      message={notification.message}
      userInfo={notification.userInfo}
      icon={notification.icon}
    />
  );
}