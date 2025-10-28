'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReputationBadge } from '@/components/features/ReputationBadge';
import { formatAddress } from '@/lib/utils/questions';
import { formatDistanceToNow } from 'date-fns';
import { User, Clock } from 'lucide-react';
import CustomAvatar from '../users/CustomAvatar';
import { Address } from 'viem';

interface Author {
  address: Address;
  reputation: number;
  avatar?: string;
}

interface QuestionMetadataProps {
  author: Author;
  createdAt: Date;
}

export function QuestionMetadata({ author, createdAt }: QuestionMetadataProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-10 w-10 border-2 border-primary/10">
        {author.avatar ? (
          // <AvatarImage
          //   src={author.avatar}
          //   alt={formatAddress(author.address)}
          // />
          <CustomAvatar address={author.address} size={10} />
        ) : (
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{formatAddress(author.address)}</span>
          <ReputationBadge points={author.reputation} />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatDistanceToNow(createdAt)} ago</span>
          {/* ProportionalRewardInfo */}
        </div>
      </div>
    </div>
  );
}
