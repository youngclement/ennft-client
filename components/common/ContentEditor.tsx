'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Edit, Code, FileText, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  initialValue: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  minHeight?: number;
  label?: string;
  description?: string;
  minimumLength?: number;
  percentComplete?: number;
};

const ContentEditor = ({
  initialValue,
  onChange,
  placeholder = '',
  minHeight = 600,
  label = 'Content Editor',
  description = 'Rich text editor with visual and HTML views. Use Ctrl+Alt+P to preview.',
  minimumLength,
  percentComplete,
}: Props) => {
  const { theme } = useTheme();
  const [editorKey, setEditorKey] = useState(0);
  const [content, setContent] = useState(initialValue);
  const [showPreview, setShowPreview] = useState(false);
  const [editorView, setEditorView] = useState<'visual' | 'html'>('visual');
  const editorRef = useRef<any>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    setEditorKey((prevKey) => prevKey + 1);
  }, [theme]);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    onChange?.(newContent);
  };

  const handlePreviewClick = () => setShowPreview(true);

  const handleClosePreview = (isOpen: boolean) => {
    setShowPreview(isOpen);
    if (!isOpen && editorRef.current) {
      setTimeout(() => editorRef.current.focus(), 100);
    }
  };

  const setupEditor = (editor: any) => {
    editorRef.current = editor;

    editor.ui.registry.addButton('custompreview', {
      icon: 'preview',
      tooltip: 'Preview (Ctrl+Alt+P)',
      onAction: handlePreviewClick,
    });

    editor.ui.registry.addButton('togglehtml', {
      icon: 'sourcecode',
      tooltip: 'Toggle HTML View (Ctrl+Alt+H)',
      onAction: () =>
        setEditorView((prev) => (prev === 'visual' ? 'html' : 'visual')),
    });

    editor.addShortcut('ctrl+alt+p', 'Preview content', handlePreviewClick);
    editor.addShortcut('ctrl+alt+h', 'Toggle HTML view', () =>
      setEditorView((prev) => (prev === 'visual' ? 'html' : 'visual'))
    );
    editor.addShortcut('ctrl+alt+c', 'Insert Code Sample', () => {
      editor.execCommand('codesample');
    });

    editor.ui.registry.addButton('shortcuts', {
      icon: 'help',
      tooltip: 'Keyboard Shortcuts',
      onAction: () => {
        editor.windowManager.open({
          title: 'Keyboard Shortcuts',
          body: {
            type: 'panel',
            items: [
              {
                type: 'htmlpanel',
                html: `
                  <div style="padding: 16px; line-height: 1.6;">
                    <p><strong>Ctrl+Alt+P</strong> - Preview Content</p>
                    <p><strong>Ctrl+Alt+H</strong> - Toggle HTML View</p>
                    <p><strong>Ctrl+Alt+C</strong> - Insert Code Sample</p>
                  </div>
                `,
              },
            ],
          },
          buttons: [{ type: 'cancel', text: 'Close', primary: true }],
        });
      },
    });
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const characterCount = content.length;
  const calculatedPercentComplete = minimumLength
    ? (wordCount / minimumLength) * 100
    : 0;

  const customContentStyle = isDark
    ? `
      body { 
        font-family: system-ui, sans-serif; 
        font-size: 16px; 
        line-height: 1.6; 
        padding: 16px; 
        background-color: #000000; 
        color: #ffffff;
      }
      code { 
        font-family: monospace; 
        background-color: #111111;
        color: #e0e0e0;
        padding: 2px 4px;
        border-radius: 3px;
      }
      pre { 
        background-color: #111111; 
        color: #e0e0e0;
        padding: 16px;
        border-radius: 6px;
      }
      pre.language-markup { tab-size: 2; }
      table {
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #333333;
        padding: 8px;
      }
      th {
        background-color: #111111;
      }
    `
    : `
      body { font-family: system-ui, sans-serif; font-size: 16px; line-height: 1.6; padding: 16px; }
      code { font-family: monospace; }
      pre.language-markup { tab-size: 2; }
    `;

  return (
    <Card
      className={cn(
        'p-4 shadow-md border',
        isDark ? 'bg-black border-zinc-800' : 'border-border'
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">{label}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={isDark ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {wordCount} words
            </Badge>
            {/* <Badge
              variant={isDark ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {characterCount} characters
            </Badge> */}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs
          value={editorView}
          onValueChange={(v) => setEditorView(v as 'visual' | 'html')}
        >
          <div className="flex items-center justify-between mb-3">
            <TabsList
              className={cn('grid w-[200px] grid-cols-2', isDark && 'bg-black')}
            >
              <TabsTrigger value="visual" className="flex items-center gap-1.5">
                <Edit className="h-4 w-4" />
                <span>Visual</span>
              </TabsTrigger>
              <TabsTrigger value="html" className="flex items-center gap-1.5">
                <Code className="h-4 w-4" />
                <span>HTML</span>
              </TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviewClick}
              className={cn(
                'gap-1.5',
                isDark && 'border-zinc-800 bg-black hover:bg-zinc-900'
              )}
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>

          <TabsContent value="visual" className="p-0 border-none mt-0">
            <div
              className={cn(
                'overflow-hidden',
                isDark && 'border border-zinc-800 rounded-md'
              )}
            >
              <Editor
                key={`visual-${editorKey}`}
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                onInit={(evt, editor) => setupEditor(editor)}
                init={{
                  plugins: [
                    'autolink charmap codesample emoticons image link lists media',
                    'searchreplace table visualblocks wordcount autoresize',
                  ],
                  toolbar: [
                    'undo redo | blocks fontsize',
                    'bold italic underline strikethrough | link image media table codesample',
                    'alignleft aligncenter alignright | numlist bullist indent outdent',
                    'custompreview togglehtml shortcuts | removeformat',
                  ].join(' | '),
                  skin: isDark ? 'oxide-dark' : 'oxide',
                  content_css: isDark ? 'dark' : 'default',
                  min_height: minHeight,
                  placeholder,
                  menubar: false,
                  statusbar: true,
                  resize: false,
                  paste_data_images: true,
                  browser_spellcheck: true,
                  contextmenu: 'link image table',
                  toolbar_sticky: true,
                  autoresize_bottom_margin: 30,
                  content_style: customContentStyle,
                  codesample_languages: [
                    { text: 'HTML/XML', value: 'markup' },
                    { text: 'JavaScript', value: 'javascript' },
                    { text: 'CSS', value: 'css' },
                    { text: 'Python', value: 'python' },
                    { text: 'TypeScript', value: 'typescript' },
                  ],
                }}
                value={content}
                onEditorChange={handleEditorChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="html" className="p-0 border-none mt-0">
            <ScrollArea
              className={cn(
                'h-[600px] w-full rounded-md border',
                isDark ? 'bg-black border-zinc-800' : 'bg-white border-border'
              )}
            >
              <textarea
                className="w-full h-full p-4 font-mono text-sm bg-transparent outline-none resize-none"
                value={content}
                onChange={(e) => handleEditorChange(e.target.value)}
                spellCheck={false}
                placeholder="Enter or edit HTML here..."
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Thanh progress di chuyển sang bên trái */}
        {/* {minimumLength && (
          <div className="flex items-center justify-start gap-2 mt-3">
            <span className="text-xs text-muted-foreground">
              {calculatedPercentComplete.toFixed(0)}% complete
            </span>
            <div className="w-32 bg-muted/30 h-2 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-300 ease-out',
                  calculatedPercentComplete >= 100
                    ? 'bg-green-500'
                    : calculatedPercentComplete > 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                )}
                style={{ width: `${calculatedPercentComplete}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {wordCount}/{minimumLength} words
            </span>
          </div>
        )} */}
      </CardContent>

      <Dialog open={showPreview} onOpenChange={handleClosePreview}>
        <DialogContent
          className={cn(
            'max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-xl transition-all',
            isDark ? 'bg-black border border-zinc-800' : 'bg-white'
          )}
        >
          <DialogHeader>
            <DialogTitle
              className={cn('text-xl font-bold', isDark && 'text-white')}
            >
              Content Preview
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              This is how your content will appear to readers.
            </DialogDescription>
          </DialogHeader>
          <div
            className={cn(
              'mt-4 p-6 prose max-w-none rounded-lg overflow-auto',
              isDark
                ? 'dark:prose-invert border border-zinc-800 bg-black shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)]'
                : 'border border-gray-100 bg-white shadow-inner'
            )}
          >
            {content === '' ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <FileText className="h-12 w-12 mb-2 opacity-20" />
                <p>No content to preview</p>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
          <div className="mt-2 px-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Lightbulb className="h-3.5 w-3.5" />
              <span>Tip: Use Ctrl+Alt+P to open preview anytime</span>
            </div>
            <div>
              {wordCount} words • {characterCount} characters
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ContentEditor;
