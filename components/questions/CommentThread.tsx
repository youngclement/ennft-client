import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface Comment {
  id: bigint;
  content: string;
  author: string;
  createdAt: bigint;
  parentId: bigint | null;
  replies: Comment[];
}

interface CommentThreadProps {
  comment: Comment;
  level?: number;
  onReply: (parentId: bigint) => void;
}

export function CommentThread({
  comment,
  level = 0,
  onReply,
}: CommentThreadProps) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${level === 0 ? 'ml-0' : 'ml-8'}`}
    >
      <div
        className={`
        border-l-2 pl-4
        ${level === 0 ? 'border-gray-300' : 'border-gray-200'}
      `}
      >
        {/* Comment content */}
        <div className="mb-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{comment.author}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {formatDistanceToNow(Number(comment.createdAt) * 1000)} ago
            </span>
          </div>
          <p className="mt-1 text-sm">{comment.content}</p>

          {/* Reply button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReply(comment.id)}
            className="text-xs mt-2"
          >
            Reply
          </Button>
        </div>

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-4 mt-4">
            {comment.replies.map((reply) => (
              <CommentThread
                key={reply.id.toString()}
                comment={reply}
                level={1} // Always set nested replies to level 1
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
