'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton } from '@/components/ui/glass';
import {
  parseCronExpression,
  cronTemplates,
  cronFieldDescriptions,
  cronSpecialCharacters,
  type CronParseResult,
} from '@/lib/converters/cron';
import ToolGuideModal from '@/components/tools/ToolGuideModal';

interface CronDictionary {
  title: string;
  subtitle: string;
  labels: {
    expression: string;
    description: string;
    nextRuns: string;
    templates: string;
    fields: string;
    specialChars: string;
  };
  buttons: {
    parse: string;
    clear: string;
    copy: string;
  };
  placeholders: {
    expression: string;
  };
  messages: {
    empty: string;
    invalid: string;
    valid: string;
  };
  templates: Record<string, string>;
  fieldNames: {
    minute: string;
    hour: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
  };
  specialChars: Record<string, { symbol: string; description: string; example: string }>;
}

export default function CronHelper() {
  const { dictionary, locale } = useI18n();
  const text = (dictionary.tools as Record<string, unknown>).cronPage as CronDictionary;

  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<CronParseResult | null>(null);

  // Cron 표현식 파싱
  useEffect(() => {
    if (!expression.trim()) {
      setResult(null);
      return;
    }

    const parsed = parseCronExpression(expression, locale as 'ko' | 'en', 10);
    setResult(parsed);
  }, [expression, locale]);

  // 템플릿 로드
  const loadTemplate = (template: keyof typeof cronTemplates) => {
    setExpression(cronTemplates[template].expression);
  };

  // 초기화
  const handleClear = () => {
    setExpression('');
    setResult(null);
  };

  // 복사
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {text.title}
          </h1>
          <p className="text-xl text-gray-300">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-semibold">
                  {text.labels.expression}
                </label>
                <input
                  type="text"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder={text.placeholders.expression}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <GlassButton onClick={handleClear} variant="secondary">
                  {text.buttons.clear}
                </GlassButton>
                <GlassButton
                  onClick={() => result?.isValid && handleCopy(expression)}
                  disabled={!result?.isValid}
                >
                  {text.buttons.copy}
                </GlassButton>
              </div>
            </GlassCard>

            {/* Result Section */}
            {result && (
              <GlassCard>
                {result.isValid ? (
                  <div className="space-y-4">
                    {/* Description */}
                    <div>
                      <label className="block text-gray-300 mb-2 font-semibold">
                        {text.labels.description}
                      </label>
                      <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400">
                        {result.description}
                      </div>
                    </div>

                    {/* Next Runs */}
                    <div>
                      <label className="block text-gray-300 mb-2 font-semibold">
                        {text.labels.nextRuns}
                      </label>
                      <div className="space-y-2">
                        {result.nextRuns.map((date, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg"
                          >
                            <span className="text-gray-400 text-sm">#{index + 1}</span>
                            <span className="text-white font-mono">
                              {date.toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                              })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
                    <p className="font-semibold mb-1">{text.messages.invalid}</p>
                    {result.error && <p className="text-sm">{result.error}</p>}
                  </div>
                )}
              </GlassCard>
            )}
          </div>

          {/* Templates & Guide Section */}
          <div className="space-y-6">
            {/* Templates */}
            <GlassCard>
              <h3 className="text-gray-300 mb-4 font-semibold">{text.labels.templates}</h3>
              <div className="space-y-2">
                {Object.entries(cronTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => loadTemplate(key as keyof typeof cronTemplates)}
                    className="w-full p-3 bg-gray-900/30 hover:bg-gray-900/50 rounded-lg text-left transition-colors group"
                  >
                    <div className="text-white text-sm font-semibold group-hover:text-blue-400 transition-colors">
                      {text.templates[key as keyof typeof text.templates] || template.description}
                    </div>
                    <div className="text-gray-400 text-xs font-mono mt-1">
                      {template.expression}
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Field Descriptions */}
            <GlassCard>
              <h3 className="text-gray-300 mb-4 font-semibold">{text.labels.fields}</h3>
              <div className="space-y-3">
                {Object.entries(cronFieldDescriptions).map(([key, field]) => (
                  <div key={key} className="border-b border-gray-700 pb-3 last:border-0">
                    <div className="text-white text-sm font-semibold">
                      {text.fieldNames[key as keyof typeof text.fieldNames] || field.name}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      범위: {field.range}
                    </div>
                    <div className="text-gray-500 text-xs mt-1 font-mono">
                      예: {field.examples.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Special Characters */}
            <GlassCard>
              <h3 className="text-gray-300 mb-4 font-semibold">{text.labels.specialChars}</h3>
              <div className="space-y-3">
                {Object.entries(cronSpecialCharacters).map(([key, char]) => (
                  <div key={key} className="border-b border-gray-700 pb-3 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 font-mono font-bold text-lg">
                        {char.symbol}
                      </span>
                      <span className="text-white text-sm">
                        {text.specialChars[key as keyof typeof text.specialChars]?.description ||
                          char.description}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs mt-1 font-mono">
                      {text.specialChars[key as keyof typeof text.specialChars]?.example ||
                        char.example}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Tool Guide */}
        <ToolGuideModal toolId="cron" />
      </main>
    </div>
  );
}
