'use client';

import { MinimumFeeInfo } from '@/components/features/MinimumFeeInfo';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/lib/hooks/use-toast';
import { useAskQuestion } from '@/lib/hooks/useAskQuestion';
import {
  questionSchema,
  type QuestionFormValues,
} from '@/lib/validations/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QuestionFormFields } from './QuestionFormFields';
import { QuestionGuidelines } from './QuestionGuidelines';
import { QuestionPreview } from './QuestionPreview';
import { useAccount } from 'wagmi';
import { z } from 'zod';

const updatedQuestionSchema = questionSchema.extend({
  deadlinePeriod: z.enum(['0', '1', '2']).default('0'),
});

type UpdatedQuestionFormValues = z.infer<typeof updatedQuestionSchema>;

export function QuestionForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { isConnected } = useAccount();

  const {
    askQuestion,
    isPending,
    isConfirming,
    isConfirmed,
    error: contractError,
  } = useAskQuestion();

  const form = useForm<UpdatedQuestionFormValues>({
    resolver: zodResolver(updatedQuestionSchema),
    defaultValues: {
      title: '',
      content: '',
      bounty: 0.01,
      tags: [],
      deadlinePeriod: '0',
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: 'Question Successfully Posted!',
        description:
          'Your question has been recorded. Waiting for final confirmation...',
        variant: 'default',
        className: 'toast-success',
      });
      reset();
    }
  }, [isConfirmed, reset, router, toast]);

  // Display error toast whenever submitError or contractError changes
  useEffect(() => {
    if (submitError || contractError) {
      toast({
        title: 'Error Submitting Question',
        description: submitError || contractError?.message || 'An error occurred',
        variant: 'destructive',
        duration: 5000,
        className: 'top-right-toast',
      });
    }
  }, [submitError, contractError, toast]);

  const onSubmit = async (data: UpdatedQuestionFormValues) => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to submit a question.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitError(null);
      const category = data.tags.join(', ');
      const rewardAmount = ethers.parseEther(data.bounty.toString());
      const deadlinePeriod = parseInt(data.deadlinePeriod);

      toast({
        title: 'Processing Question',
        description: 'Your question is being submitted...',
        duration: 5000,
      });

      await askQuestion({
        questionText: data.title,
        questionContent: data.content,
        category,
        deadlinePeriod,
        rewardAmount,
      });

      toast({
        title: 'Transaction Pending',
        description: 'Waiting for blockchain confirmation...',
        duration: 10000,
      });
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.message || contractError?.message || 'Failed to submit question';
      toast({
        title: 'Error Submitting Question',
        description: `Something went wrong: ${errorMessage}`,
        variant: 'destructive',
      });
      setSubmitError(errorMessage);
    }
  };

  const formData = form.watch();

  if (showPreview) {
    return (
      <div className="space-y-4">
        <QuestionPreview
          title={formData.title}
          content={formData.content}
          tags={formData.tags}
          bounty={formData.bounty}
        />
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            Edit Question
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending || isConfirming}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              'Submit Question'
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[1fr] gap-8">
      <div className="space-y-6">
        <MinimumFeeInfo minimumFee={1} userReputation={1} />

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <QuestionFormFields />
              <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isPending || isConfirming}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : isConfirming ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    'Submit Question'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
      <div className="space-y-6">
        <QuestionGuidelines />
      </div>
    </div>
  );
}
