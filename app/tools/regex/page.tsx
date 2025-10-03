'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  evaluateRegex,
  sanitizeFlags,
  type RegexFlag,
  type RegexMatchDetail,
  type RegexTestResult,
} from '@/lib/testers/regex';

const FLAG_INFOS: Array<{
  flag: RegexFlag;
  label: string;
  description: string;
}> = [
  { flag: 'g', label: 'g', description: 'Global – 모든 매치를 탐색' },
  { flag: 'i', label: 'i', description: 'Ignore Case – 대소문자 무시' },
  { flag: 'm', label: 'm', description: 'Multiline – ^/$가 각 줄에 대응' },
  { flag: 's', label: 's', description: 'DotAll – . 이 줄바꿈도 매칭' },
  { flag: 'u', label: 'u', description: 'Unicode – 유니코드 확장 매칭' },
  { flag: 'y', label: 'y', description: 'Sticky – lastIndex 위치에서만 매칭' },
];

interface HighlightSegment {
  text: string;
  isMatch: boolean;
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState<string>('g');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<RegexTestResult | null>(null);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

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
      const message = err instanceof Error ? err.message : '정규표현식을 해석할 수 없습니다';
      setResult(null);
      setError(message);
    }
  }, [pattern, flags, input]);

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
      setCopyMessage(`${label ?? '내용'}을 복사했습니다`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('클립보드 복사에 실패했습니다');
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Regex Tester</h1>
          <p className="text-xl text-gray-300">
            정규표현식 패턴을 실시간으로 검증하고 매칭 결과를 확인하세요
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-white font-semibold" htmlFor="regex-pattern">
                정규표현식 패턴
              </label>
              <button
                onClick={resetAll}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                초기화
              </button>
            </div>
            <input
              id="regex-pattern"
              type="text"
              value={pattern}
              onChange={(event) => setPattern(event.target.value)}
              placeholder="예: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />
            <p className="text-sm text-gray-400 mt-2">
              슬래시(/) 없이 패턴만 입력하세요. 오류가 발생하면 메시지가 표시됩니다.
            </p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-3">플래그</h2>
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
              현재 플래그: <span className="font-mono text-blue-300">/{flags}/</span>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-white font-semibold" htmlFor="regex-input">
              테스트할 문자열
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(input, '입력값')}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              >
                입력 복사
              </button>
              <button
                onClick={() => setInput('')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
              >
                지우기
              </button>
            </div>
          </div>
          <textarea
            id="regex-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={'한 줄 또는 여러 줄의 텍스트를 자유롭게 입력해보세요\n예: hello@example.com\nHELLO@EXAMPLE.COM'}
            rows={8}
            className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono"
          />
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

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">매칭 결과</h2>

          {input && highlighted.length > 0 && (
            <div className="mb-6 p-4 bg-gray-800/40 rounded-lg border border-gray-700">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">하이라이트</h3>
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
            <p className="text-gray-400 text-sm">
              테스트 문자열을 입력하면 매칭 결과가 실시간으로 표시됩니다.
            </p>
          )}

          {result && result.matches.length > 0 && (
            <div className="space-y-4">
              {result.matches.map((match, index) => (
                <MatchCard
                  key={`${match.index}-${match.match}-${index}`}
                  match={match}
                  order={index + 1}
                  onCopy={() => handleCopy(match.match, `매치 #${index + 1}`)}
                />
              ))}
            </div>
          )}

          {result && result.matches.length === 0 && input && !error && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 text-sm">
              매치 결과가 없습니다. 패턴 또는 플래그를 조정해보세요.
            </div>
          )}
        </section>

        <section className="p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• 패턴과 플래그는 입력과 동시에 평가되어 결과가 즉시 반영됩니다.</li>
            <li>• g 플래그를 끄면 첫 번째 매치만 반환됩니다. 모든 매치를 확인하려면 g 플래그를 유지하세요.</li>
            <li>• 명명된 캡쳐 그룹은 매치 카드에 별도로 표시됩니다.</li>
            <li>• 0 길이 매치가 반복될 경우 자동으로 다음 위치로 이동해 무한 루프를 방지합니다.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function MatchCard({
  match,
  order,
  onCopy,
}: {
  match: RegexMatchDetail;
  order: number;
  onCopy: () => void;
}) {
  const hasCaptures = match.captures.some((capture) => capture !== undefined);
  const namedGroups = Object.entries(match.groups).filter(([, value]) => value !== undefined);

  return (
    <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <p className="text-sm text-gray-400">매치 #{order}</p>
          <p className="text-lg font-semibold text-white font-mono break-all">{match.match || '∅ (빈 문자열)'}</p>
        </div>
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
        >
          매치 복사
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
        <div>
          <p><span className="text-gray-400">시작 위치:</span> {match.index}</p>
          <p><span className="text-gray-400">종료 위치:</span> {match.endIndex}</p>
        </div>
        <div>
          <p><span className="text-gray-400">길이:</span> {match.endIndex - match.index}</p>
          <p><span className="text-gray-400">캡쳐 그룹 수:</span> {match.captures.length}</p>
        </div>
      </div>

      {hasCaptures && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">캡쳐 그룹</h3>
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
          <h3 className="text-sm font-semibold text-gray-300 mb-2">명명된 그룹</h3>
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
