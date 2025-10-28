import { marked } from 'marked';

export async function markdownToHtml(markdown: string) {
  // Configure marked for security
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // Convert \n to <br>
    // sanitize: true, // Sanitize HTML input
  });

  return marked(markdown);
}
