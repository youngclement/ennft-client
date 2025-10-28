'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Shield } from 'lucide-react';

export function QuestionGuidelines() {
  return (
    <div className="grid gap-6">
      {/* <Alert className="bg-yellow-500/10 border-yellow-500/30 shadow-md rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div>
            <AlertTitle className="text-yellow-700 font-semibold">
              Security Best Practices
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm text-yellow-800">
              <p>When answering this smart contract question, consider:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Security vulnerabilities and mitigation strategies</li>
                <li>Gas optimization techniques</li>
                <li>Code auditing recommendations</li>
                <li>Testing methodologies</li>
              </ul>
            </AlertDescription>
          </div>
        </div>
      </Alert> */}

      <Alert className="bg-primary/10 border-primary/30 shadow-md rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full">
            <CheckCircle2 className="h-6 w-6 text-foreground" />
          </div>
          <div>
            <AlertTitle className="text-primary-700 font-semibold">
              Answer Guidelines
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm text-primary-800 line-clamp-2">
              Provide detailed explanations with code examples and thorough
              security considerations. Include references to trusted resources
              and tools where applicable.
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
}
