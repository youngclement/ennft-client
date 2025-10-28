import { QuestionForm } from '@/components/questions/QuestionForm'

export const metadata = {
  title: 'Ask a Question - DevForum',
  description: 'Ask your programming questions and get help from the community',
}

export default function AskQuestionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Ask a Question</h1>
        <p className="text-muted-foreground mb-8">
          Get help from the community by asking a clear, detailed question
        </p>
        
        <QuestionForm />
      </div>
    </div>
  )
}