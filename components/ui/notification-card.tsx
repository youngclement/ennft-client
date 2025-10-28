'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CircleDollarSign } from 'lucide-react';

interface UserInfoProps {
  name: string;
  title: string;
  avatar: string;
  reputation?: number;
}

interface NotificationCardProps {
  title: string;
  message: string;
  userInfo: UserInfoProps;
  icon?: React.ReactNode;
}

export function NotificationCard({
  title,
  message,
  userInfo,
  icon = <CircleDollarSign className="h-5 w-5 text-primary" />
}: NotificationCardProps) {
  return (
    <div className="relative mx-auto mb-28 w-full max-w-2xl">
      {/* Notification Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="p-6 bg-card border-border shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              {icon}
            </div>
            <h4 className="text-lg font-semibold text-muted-foreground">{title}</h4>
          </div>
          <div className="mt-3">
            <p className="ml-12 text-base font-semibold leading-relaxed text-foreground">{message}</p>
          </div>
        </Card>
      </motion.div>

      {/* User Info Section */}
      <div className="flex justify-center">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 80, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="absolute -bottom-8 w-[80%] rounded-full bg-primary px-4 py-3 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14 border-2 border-background">
              <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
              <AvatarFallback>{userInfo.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold text-primary-foreground">{userInfo.name}</h4>
              <p className="text-xs text-primary-foreground/80">{userInfo.title}</p>
            </div>
            {userInfo.reputation && (
              <Badge variant="outline" className="ml-auto bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                {userInfo.reputation} reputation
              </Badge>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}