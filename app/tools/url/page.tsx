'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  decodeUrl,
  decodeUrlComponent,
  encodeUrl,
  encodeUrlComponent,
  formatReservedCharacters,
  isSafeUrl,
} from '@/lib/converters/url';

type Mode = 'encode' | 'decode';
type Target = 'full' | 'component';

export default function UrlToolPage() {
  const [mode, setMode] = useState<Mode>('encode');
  const [target, setTarget] = useState<Target>('full');
  const [input, setInput] = useState('https://devhub.dev/tools?query=hello world&lang=ko-KR');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    handleConvert('https://devhub.dev/tools?query=hello world&lang=ko-KR', 'encode', 'full');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConvert = (value: string, nextMode = mode, nextTarget = target) => {
    setInput(value);
    setError('');
    setCopyMessage('');

    if (!value.trim()) {
      setOutput('');
      return;
    }

    try {
      if (nextMode === 'encode') {
        const result = nextTarget === 'component' ? encodeUrlComponent(value) : encodeUrl(value);
        setOutput(result.encoded);
      } else {
        const result = nextTarget === 'component' ? decodeUrlComponent(value) : decodeUrl(value);
        setOutput(result.decoded);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '변환 중 오류가 발생했습니다';
      setError(message);
      setOutput('');
    }
  };

  const handleModeChange = (next: Mode) => {
    setMode(next);
    handleConvert(input, next, target);
  };

  const handleTargetChange = (next: Target) => {
    setTarget(next);
    handleConvert(input, mode, next);
  };

  const handleSwap = () => {
    if (!output) return;
    if (mode === 'encode') {
      setMode('decode');
      setInput(output);
      handleConvert(output, 'decode', target);
    } else {
      setMode('encode');
      setInput(output);
      handleConvert(output, 'encode', target);
    }
  };

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label}을(를) 복사했습니다`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('클립보드 복사에 실패했습니다');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const reservedCharacters = useMemo(() => {
    if (mode === 'encode' && target === 'component' && input) {
      return formatReservedCharacters(input);
    }
    return '';
  }, [mode, target, input]);

  const urlSafetyNotice = useMemo(() => {
    if (mode === 'decode' && target === 'full' && output) {
      return isSafeUrl(output) ? '' : '⚠️ 디코딩 결과에 안전하지 않은 프로토콜이 포함되어 있을 수 있습니다.';
    }
    return '';
  }, [mode, target, output]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-5xl mx-auto px-6 py-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">URL Encoder / Decoder</h1>
          <p className="text-xl text-gray-300">
            URL 전체 또는 특정 파라미터를 안전하게 인코딩/디코딩하세요
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex flex-wrap gap-3 mb-6">
              <ToggleButton
                label="인코딩"
                active={mode === 'encode'}
                onClick={() => handleModeChange('encode')}
              />
              <ToggleButton
                label="디코딩"
                active={mode === 'decode'}
                onClick={() => handleModeChange('decode')}
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <ToggleButton
                label="전체 URL"
                active={target === 'full'}
                onClick={() => handleTargetChange('full')}
              />
              <ToggleButton
                label="쿼리 파라미터"
                active={target === 'component'}
                onClick={() => handleTargetChange('component')}
              />
            </div>

            <textarea
              value={input}
              onChange={(event) => handleConvert(event.target.value)}
              rows={8}
              placeholder={mode === 'encode' ? '인코딩할 URL 또는 파라미터를 입력하세요' : '디코딩할 문자열을 입력하세요'}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono"
            />

            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              <button
                onClick={() => setInput('')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                지우기
              </button>
              {output && (
                <button
                  onClick={handleSwap}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  입력 ↔ 출력 교체
                </button>
              )}
            </div>
          </div>

          <aside className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4 text-sm text-gray-300">
            <InfoRow label="모드" value={mode === 'encode' ? '인코딩' : '디코딩'} />
            <InfoRow label="대상" value={target === 'component' ? '쿼리 파라미터' : '전체 URL'} />
            {mode === 'encode' && (
              <p className="text-xs text-gray-400">
                • 전체 URL 모드에서는 `encodeURI`를 사용하여 경로 구분자(`/`, `:` 등)를 유지합니다.
                <br />• 쿼리 파라미터 모드에서는 `encodeURIComponent`를 사용해 모든 예약 문자를 퍼센트 인코딩합니다.
              </p>
            )}
            {reservedCharacters && (
              <div className="p-3 bg-gray-900/60 rounded border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">예약 문자</p>
                <p className="text-white text-xs font-mono leading-relaxed">{reservedCharacters}</p>
              </div>
            )}
            {urlSafetyNotice && (
              <div className="p-3 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded text-xs">
                {urlSafetyNotice}
              </div>
            )}
          </aside>
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

        {output && !error && (
          <section className="mb-10 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">결과</h2>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => handleCopy(output, '결과')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  결과 복사
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 resize-none font-mono"
            />
          </section>
        )}

        <section className="p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• 브라우저에서만 실행되므로 입력한 데이터가 서버로 전송되지 않습니다.</li>
            <li>• 전체 URL 모드는 주소 전체를 안전하게 인코딩/디코딩할 때 사용하세요.</li>
            <li>• 쿼리 파라미터 모드는 `?key=value` 중 value 부분과 같이 개별 값에 적합합니다.</li>
            <li>• 디코딩 결과에 악성 스킴이 포함된 경우 경고가 표시됩니다.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function ToggleButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
        active ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
