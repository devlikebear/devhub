'use client';

import { useEffect, useState } from 'react';
import {
  generateHash,
  type HashAlgorithm,
  type HashResult,
  HASH_ALGORITHMS,
} from '@/lib/generators/hash';
import { useI18n } from '@/components/i18n/I18nProvider';

type HashDictionary = {
  title: string;
  subtitle: string;
  inputLabel: string;
  placeholder: string;
  hint: string;
  algorithmLabel: string;
  algorithms: Record<HashAlgorithm, { label: string; description: string }>;
  resultTitle: string;
  generating: string;
  emptyMessage: string;
  copySuccess: string;
  copyFailed: string;
  error: string;
  buttons: { copy: string };
  guide: { title: string; items: string[] };
};

export default function HashGeneratorPage() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools?.hash ?? {}) as HashDictionary;

  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('md5');
  const [result, setResult] = useState<HashResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    let canceled = false;

    async function run() {
      if (!input.trim()) {
        setResult(null);
        setError('');
        return;
      }

      setIsGenerating(true);
      setError('');

      try {
        const hash = await generateHash(input, algorithm);
        if (!canceled) {
          setResult(hash);
        }
      } catch {
        if (!canceled) {
          setResult(null);
          setError(text.error || 'Error generating hash');
        }
      } finally {
        if (!canceled) {
          setIsGenerating(false);
        }
      }
    }

    run();

    return () => {
      canceled = true;
    };
  }, [input, algorithm, text.error]);

  const handleCopy = async (value: string, label: string) => {
    setCopyMessage('');
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyMessage(text.copySuccess?.replace('{{label}}', label) || `${label} copied!`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage(text.copyFailed || 'Failed to copy');
      setTimeout(() => setCopyMessage(''), 2000);
    }
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
            <label className="block text-white font-semibold mb-3" htmlFor="hash-input">
              {text.inputLabel}
            </label>
            <textarea
              id="hash-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={text.placeholder}
              rows={8}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
            />
            <p className="text-sm text-gray-400 mt-2">{text.hint}</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">{text.algorithmLabel}</h2>
            <div className="space-y-3">
              {HASH_ALGORITHMS.map((option) => (
                <label
                  key={option}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    algorithm === option
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="hash-algorithm"
                    value={option}
                    checked={algorithm === option}
                    onChange={() => setAlgorithm(option)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-white font-medium">{text.algorithms?.[option]?.label || option.toUpperCase()}</p>
                    <p className="text-sm text-gray-400">{text.algorithms?.[option]?.description || ''}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </section>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400">
            ⚠️ {error}
          </div>
        )}

        {copyMessage && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400">
            ✓ {copyMessage}
          </div>
        )}

        <section className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">{text.resultTitle}</h2>
            {isGenerating && (
              <span className="text-sm text-gray-400">{text.generating}</span>
            )}
          </div>

          {result ? (
            <div className="space-y-4">
              <ResultRow
                label={`${text.algorithms?.[result.algorithm]?.label || result.algorithm.toUpperCase()} (Hex)`}
                value={result.hex}
                onCopy={() => handleCopy(result.hex, 'Hex')}
                copyLabel={text.buttons?.copy || 'Copy'}
              />
              <ResultRow
                label="Base64"
                value={result.base64}
                onCopy={() => handleCopy(result.base64, 'Base64')}
                copyLabel={text.buttons?.copy || 'Copy'}
              />
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm">Output byte length</p>
                <p className="text-white font-mono text-lg">{result.byteLength} bytes</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">{text.emptyMessage}</p>
          )}
        </section>

        <section className="p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">{text.guide?.title}</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            {text.guide?.items?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function ResultRow({
  label,
  value,
  onCopy,
  copyLabel,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copyLabel: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
      <div className="md:w-3/4">
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-white font-mono break-all text-sm md:text-base">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="self-start md:self-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
      >
        {copyLabel}
      </button>
    </div>
  );
}
