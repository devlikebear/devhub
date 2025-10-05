'use client';

import { useMemo, useState } from 'react';
import { markdownToHtml } from '@/lib/formatters/markdown';
import { useI18n } from '@/components/i18n/I18nProvider';
import ToolGuideModal from "@/components/tools/ToolGuideModal";

type MarkdownDictionary = {
  title: string;
  subtitle: string;
  inputTitle: string;
  previewTitle: string;
  buttons: {
    loadSample: string;
    clear: string;
    copyMarkdown: string;
    copyHtml: string;
  };
  placeholder: string;
  emptyPreview: string;
  copySuccess: string;
  copyError: string;
  guide: {
    title: string;
    items: string[];
  };
  sample: string;
};

export default function MarkdownPreviewPage() {
  const { dictionary } = useI18n();
  const tMarkdown = (dictionary.tools?.markdown ?? {}) as MarkdownDictionary;

  const [input, setInput] = useState(tMarkdown.sample || '');
  const [copyMessage, setCopyMessage] = useState('');

  const html = useMemo(() => {
    if (!input.trim()) {
      return `<p class="text-gray-400">${tMarkdown.emptyPreview || 'Nothing to preview.'}</p>`;
    }
    return markdownToHtml(input);
  }, [input, tMarkdown.emptyPreview]);

  const handleCopy = async (value: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(tMarkdown.copySuccess.replace('{{type}}', type));
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage(tMarkdown.copyError);
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              {tMarkdown.title}
            </h1>
            <ToolGuideModal toolId="markdown" />
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {tMarkdown.subtitle}
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-white/80 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tMarkdown.inputTitle}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setInput(tMarkdown.sample)}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm transition-colors"
                >
                  {tMarkdown.buttons.loadSample}
                </button>
                <button
                  onClick={() => setInput('')}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm transition-colors"
                >
                  {tMarkdown.buttons.clear}
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={tMarkdown.placeholder}
              className="flex-1 w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:outline-none resize-none font-mono"
              rows={16}
            />
            <div className="flex flex-wrap gap-2 mt-4 text-sm">
              <button
                onClick={() => handleCopy(input, tMarkdown.buttons.copyMarkdown)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-900 dark:text-white rounded-lg transition-colors"
              >
                {tMarkdown.buttons.copyMarkdown}
              </button>
              <button
                onClick={() => handleCopy(html, 'HTML')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/90 to-purple-500/90 hover:from-blue-600/90 hover:to-purple-600/90 text-gray-900 dark:text-white rounded-lg transition-colors"
              >
                {tMarkdown.buttons.copyHtml}
              </button>
            </div>
          </div>

          <div className="p-6 bg-white/80 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tMarkdown.previewTitle}
              </h2>
            </div>
            <div
              className="markdown-preview bg-gray-900/60 rounded-lg border border-gray-800 px-5 py-6 overflow-auto max-h-[650px]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </section>

        {copyMessage && (
          <div className="mb-8 p-4 bg-green-500/10 border-green-500/30 rounded-lg text-green-400 text-sm">
            ✓ {copyMessage}
          </div>
        )}

        <section className="p-6 bg-gray-800/30 rounded-lg border border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {tMarkdown.guide.title}
          </h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            {tMarkdown.guide.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
