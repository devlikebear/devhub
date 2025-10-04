import { describe, expect, it } from 'vitest';
import { markdownToHtml } from './markdown';

describe('markdown formatter', () => {
  it('renders headings, paragraphs and lists', () => {
    const input = '# Title\n\nSome *italic* and **bold** text.\n\n- Item 1\n- Item 2\n';
    const html = markdownToHtml(input);

    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<p>Some <em>italic</em> and <strong>bold</strong> text.</p>');
    expect(html).toContain('<ul><li>Item 1</li><li>Item 2</li></ul>');
  });

  it('renders fenced code blocks with language class', () => {
    const input = '```ts\nconst foo = 1;\n```';
    const html = markdownToHtml(input);

    expect(html).toContain('<pre><code class="language-ts">const foo = 1;</code></pre>');
  });

  it('sanitizes unsafe links and images', () => {
    const input = '[click](javascript:alert(1)) ![alt](javascript:alert(1))';
    const html = markdownToHtml(input);

    expect(html).toContain('<a href="#" target="_blank" rel="noopener noreferrer">click</a>');
    expect(html).toContain('<img src="#" alt="alt" loading="lazy"/>');
  });
});
