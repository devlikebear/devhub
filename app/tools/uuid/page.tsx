'use client';

import { useState } from 'react';
import {
  generateMultipleUUIDs,
  formatUUIDCase,
  formatUUIDHyphens,
} from '@/lib/converters/uuid';
import { useI18n } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton } from '@/components/ui/glass';

type UuidDictionary = {
  title: string;
  subtitle: string;
  countLabel: string;
  countOptions: {
    one: string;
    five: string;
    ten: string;
    twentyFive: string;
    fifty: string;
    hundred: string;
  };
  uppercaseLabel: string;
  hyphensLabel: string;
  buttons: {
    generate: string;
    clear: string;
    copyAll: string;
    copy: string;
  };
  messages: {
    copied: string;
    copyFailed: string;
    allCopied: string;
  };
  resultTitle: string;
  guide: {
    title: string;
    items: string[];
    examples: {
      title: string;
      lowercase: string;
      uppercase: string;
      noHyphens: string;
    };
  };
};

export default function UUIDGenerator() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools?.uuid ?? {}) as UuidDictionary;

  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [withHyphens, setWithHyphens] = useState(true);
  const [copyMessage, setCopyMessage] = useState('');

  const handleGenerate = () => {
    const newUuids = generateMultipleUUIDs(count);
    const formatted = newUuids.map(uuid =>
      formatUUIDCase(formatUUIDHyphens(uuid, withHyphens), uppercase)
    );
    setUuids(formatted);
    setCopyMessage('');
  };

  const copyToClipboard = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopyMessage(text.messages.copied.replace('{{text}}', uuid));
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage(text.messages.copyFailed);
    }
  };

  const copyAllToClipboard = async () => {
    try {
      const allText = uuids.join('\n');
      await navigator.clipboard.writeText(allText);
      setCopyMessage(text.messages.allCopied.replace('{{count}}', String(uuids.length)));
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage(text.messages.copyFailed);
    }
  };

  const handleClear = () => {
    setUuids([]);
    setCopyMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {text.title}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {text.subtitle}
          </p>
        </div>

        {/* Controls */}
        <GlassCard className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Count */}
            <div>
              <label className="block text-white font-semibold mb-2">{text.countLabel}</label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value={1}>{text.countOptions.one}</option>
                <option value={5}>{text.countOptions.five}</option>
                <option value={10}>{text.countOptions.ten}</option>
                <option value={25}>{text.countOptions.twentyFive}</option>
                <option value={50}>{text.countOptions.fifty}</option>
                <option value={100}>{text.countOptions.hundred}</option>
              </select>
            </div>

            {/* Options */}
            <div>
              <label className="block text-white font-semibold mb-2">Options</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="w-4 h-4 rounded bg-gray-900 border-gray-600"
                  />
                  <span>{text.uppercaseLabel}</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={withHyphens}
                    onChange={(e) => setWithHyphens(e.target.checked)}
                    className="w-4 h-4 rounded bg-gray-900 border-gray-600"
                  />
                  <span>{text.hyphensLabel}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <GlassButton
              onClick={handleGenerate}
              variant="primary"
              className="px-6 py-3"
            >
              {text.buttons.generate}
            </GlassButton>
            {uuids.length > 0 && (
              <>
                <GlassButton
                  onClick={copyAllToClipboard}
                  variant="primary"
                  className="px-6 py-3 bg-gradient-to-r from-green-500/90 to-emerald-500/90 hover:from-green-600/90 hover:to-emerald-600/90"
                >
                  {text.buttons.copyAll}
                </GlassButton>
                <GlassButton
                  onClick={handleClear}
                  variant="secondary"
                  className="px-6 py-3"
                >
                  {text.buttons.clear}
                </GlassButton>
              </>
            )}
          </div>
        </GlassCard>

        {/* Copy Message */}
        {copyMessage && (
          <GlassCard hover={false} className="mb-6 p-4 bg-green-500/10 border-green-500/30">
            <p className="text-green-400">✓ {copyMessage}</p>
          </GlassCard>
        )}

        {/* Results */}
        {uuids.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">
                {text.resultTitle.replace('{{count}}', String(uuids.length))}
              </h2>
            </div>

            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <GlassCard
                  key={index}
                  className="flex items-center justify-between p-4 group"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="text-gray-500 font-mono text-sm w-12">
                      {index + 1}.
                    </span>
                    <code className="text-white font-mono text-sm md:text-base break-all">
                      {uuid}
                    </code>
                  </div>
                  <GlassButton
                    onClick={() => copyToClipboard(uuid)}
                    variant="secondary"
                    className="ml-4 px-4 py-2 text-sm opacity-0 group-hover:opacity-100"
                  >
                    {text.buttons.copy}
                  </GlassButton>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Guide Section */}
        <GlassCard hover={false} className="mt-12 p-6 bg-white/5">
          <h3 className="text-xl font-semibold text-white mb-4">{text.guide.title}</h3>
          <div className="space-y-2 text-gray-300">
            {text.guide.items.map((item, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">{text.guide.examples.title}:</p>
            <div className="space-y-1 text-sm font-mono">
              <p className="text-gray-300">
                <span className="text-blue-400">{text.guide.examples.lowercase}</span>{' '}
                550e8400-e29b-41d4-a716-446655440000
              </p>
              <p className="text-gray-300">
                <span className="text-green-400">{text.guide.examples.uppercase}</span>{' '}
                550E8400-E29B-41D4-A716-446655440000
              </p>
              <p className="text-gray-300">
                <span className="text-yellow-400">{text.guide.examples.noHyphens}</span>{' '}
                550e8400e29b41d4a716446655440000
              </p>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
