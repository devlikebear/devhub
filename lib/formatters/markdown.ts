export function markdownToHtml(markdown: string): string {
  const normalized = markdown.replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");

  let html = "";
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  let blockquoteBuffer: string[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = "";

  const closeLists = () => {
    if (inUl) {
      html += "</ul>";
      inUl = false;
    }
    if (inOl) {
      html += "</ol>";
      inOl = false;
    }
  };

  const closeBlockquote = () => {
    if (!inBlockquote) return;
    const content = blockquoteBuffer.join("<br/>");
    html += `<blockquote>${content}</blockquote>`;
    inBlockquote = false;
    blockquoteBuffer = [];
  };

  const flushParagraph = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    html += `<p>${applyInlineStyles(escapeHtml(trimmed))}</p>`;
  };

  for (const rawLine of lines) {
    const line = rawLine;

    if (inCodeBlock) {
      if (line.trim().startsWith("```") || line.trim().startsWith("~~~")) {
        const escaped = escapeHtml(codeBuffer.join("\n"));
        const classAttr = codeLanguage
          ? ` class="language-${escapeAttribute(codeLanguage)}"`
          : "";
        html += `<pre><code${classAttr}>${escaped}</code></pre>`;
        inCodeBlock = false;
        codeBuffer = [];
        codeLanguage = "";
        continue;
      }

      codeBuffer.push(line);
      continue;
    }

    const codeFence = line.trim().match(/^(?:```|~~~)(.*)$/);
    if (codeFence) {
      closeLists();
      closeBlockquote();
      inCodeBlock = true;
      codeLanguage = codeFence[1].trim();
      codeBuffer = [];
      continue;
    }

    if (!line.trim()) {
      closeLists();
      closeBlockquote();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeLists();
      closeBlockquote();
      const level = headingMatch[1].length;
      const content = applyInlineStyles(escapeHtml(headingMatch[2].trim()));
      html += `<h${level}>${content}</h${level}>`;
      continue;
    }

    const hrMatch = line.trim().match(/^([-*_])\1{2,}$/);
    if (hrMatch) {
      closeLists();
      closeBlockquote();
      html += "<hr/>";
      continue;
    }

    const blockquoteMatch = line.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      closeLists();
      const content = applyInlineStyles(escapeHtml(blockquoteMatch[1]));
      inBlockquote = true;
      blockquoteBuffer.push(content);
      continue;
    }

    const unorderedMatch = line.match(/^\s*[-*+]\s+(.*)$/);
    if (unorderedMatch) {
      closeBlockquote();
      if (!inUl) {
        closeLists();
        html += "<ul>";
        inUl = true;
      }
      const itemContent = applyInlineStyles(escapeHtml(unorderedMatch[1].trim()));
      html += `<li>${itemContent}</li>`;
      continue;
    }

    const orderedMatch = line.match(/^\s*([0-9]+)\.\s+(.*)$/);
    if (orderedMatch) {
      closeBlockquote();
      if (!inOl) {
        closeLists();
        html += "<ol>";
        inOl = true;
      }
      const itemContent = applyInlineStyles(escapeHtml(orderedMatch[2].trim()));
      html += `<li>${itemContent}</li>`;
      continue;
    }

    closeLists();
    closeBlockquote();
    flushParagraph(line);
  }

  if (inCodeBlock) {
    const escaped = escapeHtml(codeBuffer.join("\n"));
    const classAttr = codeLanguage
      ? ` class="language-${escapeAttribute(codeLanguage)}"`
      : "";
    html += `<pre><code${classAttr}>${escaped}</code></pre>`;
  }

  closeLists();
  closeBlockquote();

  return html || "";
}

function applyInlineStyles(text: string): string {
  let transformed = text;

  transformed = transformed.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);

  transformed = transformed.replace(/\*\*([^*]+)\*\*/g, (_, bold) => `<strong>${bold}</strong>`);
  transformed = transformed.replace(/\*([^*]+)\*/g, (_, italic) => `<em>${italic}</em>`);
  transformed = transformed.replace(/~~([^~]+)~~/g, (_, strike) => `<del>${strike}</del>`);

  transformed = transformed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
    const safeUrl = sanitizeUrl(url);
    return `<img src="${safeUrl}" alt="${escapeAttribute(alt)}" loading="lazy"/>`;
  });

  transformed = transformed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safeUrl = sanitizeUrl(url);
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  return transformed;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function sanitizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "#";
  }

  const lower = trimmed.toLowerCase();
  if (lower.startsWith("javascript:")) {
    return "#";
  }

  if (lower.startsWith("data:")) {
    return "#";
  }

  return escapeAttribute(trimmed);
}
