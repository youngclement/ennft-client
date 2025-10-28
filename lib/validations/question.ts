import * as z from 'zod';

export const questionSchema = z.object({
  title: z
    .string()
    .min(15, 'Title must be at least 15 characters long')
    .max(150, 'Title cannot exceed 150 characters'),
  content: z
    .string()
    .min(50, 'Question details must be at least 50 characters long'),
  bounty: z
    .number()
    .min(0.01, 'Minimum bounty is 1 tokens')
    .max(10, 'Maximum bounty is 1000 tokens'),
  tags: z
    .array(z.string())
    .min(1, 'Add at least one tag')
    .max(5, 'Maximum 5 tags allowed'),
});

export type QuestionFormValues = z.infer<typeof questionSchema>;
