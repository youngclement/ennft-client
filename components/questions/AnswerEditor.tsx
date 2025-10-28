'use client';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Send, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import ContentEditor from '../common/ContentEditor';

interface AnswerEditorProps {
  questionId: string;
  onSubmit: (content: string) => Promise<void>;
  minimumLength?: number;
}

export function AnswerEditor({
  questionId,
  onSubmit,
  minimumLength = 50,
}: AnswerEditorProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const plainTextContent = content.replace(/<[^>]*>/g, '').trim();
    setCharCount(plainTextContent.length);
  }, [content]);

  const handleSubmit = async () => {
    if (charCount < minimumLength) {
      setError(`Answer must be at least ${minimumLength} characters long`);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(content);
      setContent('');
    } catch (err) {
      setError('Failed to submit answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCounterColor = () => {
    if (charCount === 0) return 'text-muted-foreground';
    if (charCount < minimumLength * 0.5) return 'text-red-500';
    if (charCount < minimumLength) return 'text-yellow-500';
    return 'text-green-500';
  };

  const percentComplete = Math.min(
    100,
    Math.floor((charCount / minimumLength) * 100)
  );

  return (
    <>
      {error && (
        <Alert
          variant="destructive"
          className="mb-4 bg-destructive/10 border-destructive/20"
        >
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="ml-2 text-sm font-medium">{error}</span>
        </Alert>
      )}

      <div className="space-y-4">
        <ContentEditor
          initialValue={content}
          onChange={(newContent) => setContent(newContent)}
          label="Your Answer"
          description={`Question #${questionId}`}
          minHeight={300}
          minimumLength={minimumLength}
          percentComplete={percentComplete}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-3">
          <div>
            <span className={`text-xs ${getCounterColor()}`}>
              {charCount} / {minimumLength} characters minimum
            </span>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || charCount < minimumLength}
            className="w-full sm:w-auto transition-all duration-200"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post Answer
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
