'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ContractAnswer } from '@/lib/hooks/useGetAnswersByQuestionId';
import { useAnswer } from '@/lib/hooks/useAnswer'; // Import hook useAnswer
import {
  useGetRepliesByAnswerId,
  ContractReply,
} from '@/lib/hooks/useGetRepliesByAnswerId'; // Import hook useGetRepliesByAnswerId
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, ChevronsUp, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { AnswerContent } from './AnswerContent';

interface AnswerCardProps {
  answer: ContractAnswer;
  hasVoted: boolean;
  onUpvote: () => void;
  canSelectBestAnswer?: boolean;
  onSelectBestAnswer?: () => void;
  isSelecting?: boolean;
  isBestAnswer?: boolean;
}

export function AnswerCard({
  answer,
  hasVoted,
  onUpvote,
  canSelectBestAnswer = false,
  onSelectBestAnswer,
  isSelecting = false,
  isBestAnswer = false,
}: AnswerCardProps) {
  const [isReplying, setIsReplying] = useState(false); // Trạng thái hiển thị form reply
  const [replyText, setReplyText] = useState(''); // Nội dung reply
  const [validationError, setValidationError] = useState(''); // Trạng thái lỗi validation

  // Sử dụng hook useAnswer để gửi reply
  const {
    submitAnswer,
    isPending: isReplyPending,
    isConfirming: isReplyConfirming,
    isConfirmed: isReplyConfirmed,
    error: replyError,
  } = useAnswer();

  // Sử dụng hook useGetRepliesByAnswerId để lấy replies của Answer này
  const {
    replies,
    totalReplies,
    isLoading: isRepliesLoading,
    error: repliesError,
    refetch: refetchReplies,
  } = useGetRepliesByAnswerId(answer.questionId, answer.id);

  // Xử lý gửi reply
  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
    if (replyText.trim().length < 10) {
      setValidationError("Reply must be at least 10 characters long");
      return;
    }

    try {
      await submitAnswer({
        questionId: answer.questionId,
        answerText: replyText,
        parentAnswerId: answer.id, // Answer hiện tại là parent của reply
      });
      setReplyText('');
      setIsReplying(false);
      setValidationError("");
      refetchReplies(); // Làm mới danh sách replies sau khi gửi thành công
    } catch (err) {
      console.error('Failed to submit reply:', err);
    }
  };

  // Tự động làm mới replies khi reply được xác nhận
  useEffect(() => {
    if (isReplyConfirmed) {
      refetchReplies();
    }
  }, [isReplyConfirmed, refetchReplies]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card
        className={cn(
          'p-6 transition-all duration-500 relative overflow-hidden group border',
          isBestAnswer
            ? 'border-2 border-emerald-500/70 bg-transparent shadow-2xl'
            : 'hover:shadow-lg border-transparent hover:border-gray-200',
          'transform-gpu hover:scale-[1.01] transition-transform duration-300'
        )}
      >
        {/* Best Answer Badge */}
        <AnimatePresence>
          {isBestAnswer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-0 right-0 z-10"
            >
              <motion.div
                initial={{ rotate: -45, x: 50, y: -50 }}
                animate={{ rotate: 0, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-b-[60px] border-emerald-500/90 shadow-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-6">
          {/* Upvote Section */}
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant={hasVoted ? 'default' : 'outline'}
              size="sm"
              onClick={onUpvote}
              className={cn(
                'rounded-full h-12 w-12 p-0 transition-all duration-300',
                isBestAnswer
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md'
                  : 'hover:shadow-md',
                hasVoted && 'bg-opacity-90'
              )}
              disabled={hasVoted}
            >
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronsUp className="h-5 w-5" />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <Button variant="link">Upvote</Button>
                </TooltipContent>
              </Tooltip>
            </Button>
            <motion.span
              className={cn('font-medium text-lg', isBestAnswer && 'font-bold')}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              {answer.upvotes.toString()}
            </motion.span>
          </motion.div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <motion.div
                className={cn(
                  'text-sm',
                  isBestAnswer ? '' : 'text-muted-foreground'
                )}
              >
                By <span className="font-bold">{answer.responder}</span>
                <span className="mx-2">•</span>
                {formatDistanceToNow(
                  new Date(Number(answer.createdAt) * 1000)
                )}{' '}
                ago
              </motion.div>
            </div>
            <motion.div
              className={cn(isBestAnswer ? '' : '')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <AnswerContent content={answer.answerText} />
            </motion.div>
            <div className="flex items-center justify-between text-sm pt-4">
              <motion.span
                className={cn(
                  'text-muted-foreground font-medium',
                  isBestAnswer && ''
                )}
                whileHover={{ scale: 1.02 }}
              >
                Reward: {formatEther(answer.rewardAmount)} tokens
              </motion.span>
              {canSelectBestAnswer && (
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant={isBestAnswer ? 'default' : 'outline'}
                    size="sm"
                    onClick={onSelectBestAnswer}
                    disabled={isSelecting}
                    className={cn(
                      'flex items-center gap-2 transition-all duration-300',
                      isBestAnswer
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md'
                        : 'hover:bg-yellow-50 hover:border-yellow-200'
                    )}
                  >
                    <Award
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isBestAnswer ? 'text-white' : ''
                      )}
                    />
                    {isSelecting ? (
                      <motion.span
                        animate={{ opacity: [0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        Selecting...
                      </motion.span>
                    ) : (
                      'Select Best Answer'
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium">Replies ({totalReplies})</h4>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                disabled={isReplyPending || isReplyConfirming}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Reply
              </Button>
            </div>
          </div>

          {/* Form để thêm reply */}
          {isReplying && (
            <div className="mb-4">
              <textarea
                className="w-full p-2 border rounded-md"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                rows={3}
                disabled={isReplyPending || isReplyConfirming}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsReplying(false)}
                  disabled={isReplyPending || isReplyConfirming}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitReply}
                  disabled={isReplyPending || isReplyConfirming}
                >
                  {isReplyPending || isReplyConfirming
                    ? 'Submitting...'
                    : 'Post Reply'}
                </Button>
              </div>
              {validationError && (
                <p className="text-red-500 text-sm mt-2">{validationError}</p>
              )}
              {replyError && (
                <p className="text-red-500 text-sm mt-2">
                  {replyError.message}
                </p>
              )}
            </div>
          )}

          {/* Hiển thị replies */}
          {isRepliesLoading ? (
            <p>Loading replies...</p>
          ) : replies.length > 0 ? (
            <div className="mt-4 space-y-4">
              {replies.map((reply) => (
                <motion.div
                  key={reply.id.toString()}
                  className="pl-6 border-l-2 border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{reply.answerText}</p>
                  <div className="text-sm text-muted-foreground mt-1">
                    By {reply.responder} •{' '}
                    {formatDistanceToNow(
                      new Date(Number(reply.createdAt) * 1000)
                    )}{' '}
                    ago
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-4">
              No replies yet.
            </p>
          )}
          {repliesError && (
            <p className="text-red-500 text-sm mt-2">{repliesError.message}</p>
          )}
        </div>

        {/* Ambient Gradient Animation */}
        {isBestAnswer && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-emerald-100/10 via-transparent to-emerald-200/20 pointer-events-none"
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        )}
      </Card>
    </motion.div>
  );
}
