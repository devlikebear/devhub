'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  evaluateRegex,
  sanitizeFlags,
  type RegexFlag,
  type RegexMatchDetail,
  type RegexTestResult,
} from '@/lib/testers/regex';
import { useI18n } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton, GlassInput, GlassTextarea } from '@/components/ui/glass';

type RegexDictionary = {
  title: string;
  subtitle: string;
  patternLabel: string;
  patternPlaceholder: string;
  patternHint: string;
  flagsLabel: string;
  currentFlags: string;
  testStringLabel: string;
  testStringPlaceholder: string;
  buttons: {
    reset: string;
    copyInput: string;
    clear: string;
    copyMatch: string;
  };
  flags: {
    g: { label: string; description: string };
    i: { label: string; description: string };
    m: { label: string; description: string };
    s: { label: string; description: string };
    u: { label: string; description: string };
    y: { label: string; description: string };
  };
  matchResults: {
    title: string;
    highlightTitle: string;
    emptyString: string;
    emptyInput: string;
    noMatches: string;
    matchNumber: string;
    startPosition: string;
    endPosition: string;
    length: string;
    captureGroupCount: string;
    captureGroups: string;
    namedGroups: string;
  };
  copySuccess: string;
  copyFailed: string;
  regexError: string;
  guide: {
    title: string;
    items: string[];
  };
};

interface HighlightSegment {
  text: string;
  isMatch: boolean;
}

export default function RegexTesterPage() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools?.regex ?? {}) as RegexDictionary;

  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState<string>('g');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<RegexTestResult | null>(null);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const FLAG_INFOS: Array<{ flag: RegexFlag; label: string; description: string }> = [
    { flag: 'g', label: text.flags?.g?.label || 'g', description: text.flags?.g?.description || '' },
    { flag: 'i', label: text.flags?.i?.label || 'i', description: text.flags?.i?.description || '' },
    { flag: 'm', label: text.flags?.m?.label || 'm', description: text.flags?.m?.description || '' },
    { flag: 's', label: text.flags?.s?.label || 's', description: text.flags?.s?.description || '' },
    { flag: 'u', label: text.flags?.u?.label || 'u', description: text.flags?.u?.description || '' },
    { flag: 'y', label: text.flags?.y?.label || 'y', description: text.flags?.y?.description || '' },
  ];

  useEffect(() => {
    if (!pattern) {
      setResult(null);
      setError('');
      return;
    }

    try {
      const evaluation = evaluateRegex(pattern, flags, input);
      setResult(evaluation);
      setError('');
    } catch (err) {
      const message = err instanceof Error ? err.message : text.regexError;
      setResult(null);
      setError(message);
    }
  }, [pattern, flags, input, text.regexError]);

  const highlighted = useMemo(() => {
    if (!input) {
      return [];
    }

    if (!result || result.matches.length === 0) {
      return [{ text: input, isMatch: false }];
    }

    const segments: HighlightSegment[] = [];
    let cursor = 0;

    for (const match of result.matches) {
      const safeStart = Math.max(match.index, cursor);

      if (safeStart > cursor) {
        segments.push({ text: input.slice(cursor, safeStart), isMatch: false });
      }

      const matchText = input.slice(safeStart, match.endIndex);
      segments.push({ text: matchText, isMatch: true });

      cursor = Math.max(cursor, match.endIndex);
    }

    if (cursor < input.length) {
      segments.push({ text: input.slice(cursor), isMatch: false });
    }

    return segments.length > 0 ? segments : [{ text: input, isMatch: false }];
  }, [input, result]);

  const toggleFlag = (flag: RegexFlag) => {
    setFlags((prev) => {
      const hasFlag = prev.includes(flag);
      const next = hasFlag ? prev.replaceAll(flag, '') : prev + flag;
      const sanitized = sanitizeFlags(next);
      return sanitized || 'g';
    });
  };

  const handleCopy = async (value: string, label?: string) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(text.copySuccess.replace('{{label}}', label ?? ''));
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage(text.copyFailed);
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const resetAll = () => {
    setPattern('');
    setInput('');
    setFlags('g');
    setResult(null);
    setError('');
    setCopyMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-5xl mx-auto px-6 py-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{text.title}</h1>
          <p className="text-xl text-gray-300">{text.subtitle}</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-white font-semibold" htmlFor="regex-pattern">
                {text.patternLabel}
              </label>
              <button
                onClick={resetAll}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {text.buttons.reset}
              </button>
            </div>
            <input
              id="regex-pattern"
              type="text"
              value={pattern}
              onChange={(event) => setPattern(event.target.value)}
              placeholder={text.patternPlaceholder}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />
            <p className="text-sm text-gray-400 mt-2">{text.patternHint}</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-3">{text.flagsLabel}</h2>
            <div className="space-y-2">
              {FLAG_INFOS.map((info) => {
                const active = flags.includes(info.flag);
                return (
                  <label
                    key={info.flag}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      active ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={active}
                      onChange={() => toggleFlag(info.flag)}
                    />
                    <div>
                      <p className="text-white font-medium">{info.label}</p>
                      <p className="text-sm text-gray-400">{info.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
            <p className="text-sm text-gray-400 mt-4">
              {text.currentFlags} <span className="font-mono text-blue-300">/{flags}/</span>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-white font-semibold" htmlFor="regex-input">
              {text.testStringLabel}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(input, text.testStringLabel)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-sm transition-colors"
              >
                {text.buttons.copyInput}
              </button>
              <button
                onClick={() => setInput('')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
              >
                {text.buttons.clear}
              </button>
            </div>
          </div>
          <textarea
            id="regex-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={text.testStringPlaceholder}
            rows={8}
            className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono"
          />
        </section>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border-red-500/30 rounded-lg text-red-400">
            ⚠️ {error}
          </div>
        )}

        {copyMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border-green-500/30 rounded-lg text-green-400">
            ✓ {copyMessage}
          </div>
        )}

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">{text.matchResults.title}</h2>

          {input && highlighted.length > 0 && (
            <div className="mb-6 p-4 bg-gray-800/40 rounded-lg border border-gray-700">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">{text.matchResults.highlightTitle}</h3>
              <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
                {highlighted.map((segment, index) => (
                  <span
                    key={`${segment.text}-${index}`}
                    className={segment.isMatch ? 'bg-blue-600/40 text-white rounded-sm px-1' : ''}
                  >
                    {segment.text || (segment.isMatch ? '∅' : '')}
                  </span>
                ))}
              </pre>
            </div>
          )}

          {!input && (
            <p className="text-gray-400 text-sm">{text.matchResults.emptyInput}</p>
          )}

          {result && result.matches.length > 0 && (
            <div className="space-y-4">
              {result.matches.map((match, index) => (
                <MatchCard
                  key={`${match.index}-${match.match}-${index}`}
                  match={match}
                  order={index + 1}
                  text={text}
                  onCopy={() => handleCopy(match.match, text.matchResults.matchNumber.replace('{{number}}', String(index + 1)))}
                />
              ))}
            </div>
          )}

          {result && result.matches.length === 0 && input && !error && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 text-sm">
              {text.matchResults.noMatches}
            </div>
          )}
        </section>

        <section className="p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">{text.guide.title}</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            {text.guide.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function MatchCard({
  match,
  order,
  text,
  onCopy,
}: {
  match: RegexMatchDetail;
  order: number;
  text: RegexDictionary;
  onCopy: () => void;
}) {
  const hasCaptures = match.captures.some((capture) => capture !== undefined);
  const namedGroups = Object.entries(match.groups).filter(([, value]) => value !== undefined);

  return (
    <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <p className="text-sm text-gray-400">{text.matchResults.matchNumber.replace('{{number}}', String(order))}</p>
          <p className="text-lg font-semibold text-white font-mono break-all">
            {match.match || text.matchResults.emptyString}
          </p>
        </div>
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-sm transition-colors"
        >
          {text.buttons.copyMatch}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
        <div>
          <p><span className="text-gray-400">{text.matchResults.startPosition}</span> {match.index}</p>
          <p><span className="text-gray-400">{text.matchResults.endPosition}</span> {match.endIndex}</p>
        </div>
        <div>
          <p><span className="text-gray-400">{text.matchResults.length}</span> {match.endIndex - match.index}</p>
          <p><span className="text-gray-400">{text.matchResults.captureGroupCount}</span> {match.captures.length}</p>
        </div>
      </div>

      {hasCaptures && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">{text.matchResults.captureGroups}</h3>
          <div className="space-y-1">
            {match.captures.map((capture, index) => (
              <p key={index} className="text-sm text-gray-400">
                #{index + 1}: <span className="text-white font-mono">{capture ?? '—'}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {namedGroups.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">{text.matchResults.namedGroups}</h3>
          <div className="space-y-1">
            {namedGroups.map(([name, value]) => (
              <p key={name} className="text-sm text-gray-400">
                {name}: <span className="text-white font-mono">{value}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
