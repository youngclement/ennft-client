'use client';

import { markdownToHtml } from '@/lib/utils/markdown';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface AnswerContentProps {
  content: string;
  className?: string;
}

export function AnswerContent({ content, className = '' }: AnswerContentProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const renderContent = async () => {
      const rendered = await markdownToHtml(content);
      console.log('Rendered HTML:', rendered); // Debug
      setHtmlContent(rendered);
    };
    renderContent();
  }, [content]);

  const contentClass = theme === 'dark' ? 'dark:prose-invert' : 'prose';

  return (
    <div
      className={`max-w-none ${contentClass} break-all whitespace-pre-wrap text-[14px] ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
