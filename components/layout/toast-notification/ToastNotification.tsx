'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface UserInfoProps {
  name: string;
  title: string;
  avatar: string;
  reputation?: number;
}

interface ToastNotificationProps {
  title: string;
  message: string;
  userInfo: UserInfoProps;
  icon: React.ReactNode;
  autoClose?: boolean;
  duration?: number;
}

export function ToastNotification({
  title,
  message,
  userInfo,
  icon,
  autoClose = true,
  duration = 8000,
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-20 right-4 z-50 max-w-sm"
        >
          <div className="rounded-2xl border border-border bg-card p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-inner">
                {icon}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-sm text-foreground">{title}</h4>
                  <button
                    onClick={handleClose}
                    className="ml-2 h-6 w-6 rounded-full hover:bg-muted/80 flex items-center justify-center transition-colors"
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{message}</p>

                <div className="mt-3 flex items-center gap-2 bg-muted/50 p-2 rounded-xl">
                  <Avatar className="h-8 w-8 ring-2 ring-background">
                    <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                    <AvatarFallback>{userInfo.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-foreground">{userInfo.name}</p>
                      {userInfo.reputation && (
                        <Badge variant="secondary" className="text-[10px] h-5 bg-primary/10 text-primary">
                          {userInfo.reputation.toLocaleString()} rep
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{userInfo.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}