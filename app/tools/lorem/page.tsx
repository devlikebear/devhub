'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton } from '@/components/ui/glass';
import {
  generateLorem,
  type GenerateUnit,
  type WrapType,
  type LoremResult,
} from '@/lib/converters/lorem';

interface LoremDictionary {
  title: string;
  subtitle: string;
  labels: {
    count: string;
    unit: string;
    options: string;
    startWithLorem: string;
    wrap: string;
    result: string;
    plainText: string;
    htmlCode: string;
    statistics: string;
    copy: string;
    copyHtml: string;
    generate: string;
  };
  units: {
    words: string;
    sentences: string;
    paragraphs: string;
  };
  wraps: {
    none: string;
    p: string;
    div: string;
    ul: string;
    ol: string;
    h1: string;
    h2: string;
    h3: string;
  };
  stats: {
    characters: string;
    words: string;
    sentences: string;
    paragraphs: string;
  };
  messages: {
    copied: string;
    copiedHtml: string;
  };
}

export default function LoremGenerator() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools as Record<string, unknown>).loremPage as LoremDictionary;

  const [count, setCount] = useState(5);
  const [unit, setUnit] = useState<GenerateUnit>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [wrap, setWrap] = useState<WrapType>('none');
  const [result, setResult] = useState<LoremResult | null>(null);
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, unit, startWithLorem, wrap]);

  const handleGenerate = () => {
    const generated = generateLorem({
      count,
      unit,
      startWithLorem,
      wrap,
    });
    setResult(generated);
  };

  const handleCopy = async (textToCopy: string, isHtml: boolean) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyMessage(isHtml ? text.messages.copiedHtml : text.messages.copied);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (error) {
      console.error('복사 실패:', error);
    }
  };

  const maxCount = unit === 'words' ? 500 : unit === 'sentences' ? 50 : 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {text.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 설정 패널 */}
          <div className="space-y-6">
            {/* 개수 설정 */}
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">{text.labels.count}</h3>

              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max={maxCount}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">1</span>
                  <span className="text-2xl font-bold text-blue-400">{count}</span>
                  <span className="text-gray-400">{maxCount}</span>
                </div>
              </div>
            </GlassCard>

            {/* 단위 선택 */}
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">{text.labels.unit}</h3>

              <div className="grid grid-cols-3 gap-3">
                {(['words', 'sentences', 'paragraphs'] as GenerateUnit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`p-3 rounded-lg border transition-all ${
                      unit === u
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {text.units[u]}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* 옵션 */}
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">{text.labels.options}</h3>

              <div className="space-y-4">
                {/* Lorem ipsum 시작 */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={startWithLorem}
                    onChange={(e) => setStartWithLorem(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">{text.labels.startWithLorem}</span>
                </label>
              </div>
            </GlassCard>

            {/* HTML Wrapper */}
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">{text.labels.wrap}</h3>

              <div className="grid grid-cols-4 gap-2">
                {(['none', 'p', 'div', 'ul', 'ol', 'h1', 'h2', 'h3'] as WrapType[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWrap(w)}
                    className={`p-2 rounded-lg border text-sm transition-all ${
                      wrap === w
                        ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {w === 'none' ? text.wraps.none : `<${w}>`}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* 통계 */}
            {result && (
              <GlassCard>
                <h3 className="text-xl font-semibold mb-4">{text.labels.statistics}</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">{text.stats.characters}</p>
                    <p className="text-2xl font-bold text-blue-400">{result.stats.characters.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">{text.stats.words}</p>
                    <p className="text-2xl font-bold text-green-400">{result.stats.words.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">{text.stats.sentences}</p>
                    <p className="text-2xl font-bold text-purple-400">{result.stats.sentences.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">{text.stats.paragraphs}</p>
                    <p className="text-2xl font-bold text-pink-400">{result.stats.paragraphs.toLocaleString()}</p>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          {/* 결과 패널 */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Plain Text */}
                <GlassCard>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{text.labels.plainText}</h3>
                    <GlassButton onClick={() => handleCopy(result.text, false)}>
                      {text.labels.copy}
                    </GlassButton>
                  </div>

                  <div className="p-4 bg-gray-900/50 rounded-lg max-h-96 overflow-y-auto">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{result.text}</p>
                  </div>
                </GlassCard>

                {/* HTML Code */}
                {result.html && (
                  <GlassCard>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">{text.labels.htmlCode}</h3>
                      <GlassButton onClick={() => handleCopy(result.html!, true)}>
                        {text.labels.copyHtml}
                      </GlassButton>
                    </div>

                    <div className="p-4 bg-gray-900/50 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                        {result.html}
                      </pre>
                    </div>
                  </GlassCard>
                )}
              </>
            )}

            {/* 복사 메시지 */}
            {copyMessage && (
              <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
                {copyMessage}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
