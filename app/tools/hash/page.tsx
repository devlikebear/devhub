'use client';

import { useEffect, useState } from 'react';
import {
  generateHash,
  type HashAlgorithm,
  type HashResult,
  HASH_ALGORITHMS,
} from '@/lib/generators/hash';

const algorithmLabels: Record<HashAlgorithm, string> = {
  md5: 'MD5',
  sha1: 'SHA-1',
  sha256: 'SHA-256',
};

const algorithmDescriptions: Record<HashAlgorithm, string> = {
  md5: '32자 16진수 해시, 주로 체크섬 용도로 사용',
  sha1: '160비트 해시, Git 객체 등 레거시 시스템 사용',
  sha256: '256비트 해시, 현재 권장되는 보안 해시',
};

export default function HashGeneratorPage() {
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
      } catch (err) {
        if (!canceled) {
          setResult(null);
          setError('해시 생성 중 오류가 발생했습니다');
          console.error(err);
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
  }, [input, algorithm]);

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
      setCopyMessage(`${label} 복사 완료!`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      console.error(err);
      setCopyMessage('클립보드 복사에 실패했습니다');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-5xl mx-auto px-6 py-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Hash Generator</h1>
          <p className="text-xl text-gray-300">
            문자열을 다양한 해시 알고리즘으로 변환하고 결과를 비교하세요
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <label className="block text-white font-semibold mb-3" htmlFor="hash-input">
              입력 문자열
            </label>
            <textarea
              id="hash-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="해시를 생성할 문자열을 입력하세요"
              rows={8}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
            />
            <p className="text-sm text-gray-400 mt-2">
              해시는 입력값에 민감합니다. 공백이나 줄바꿈도 결과에 영향을 줍니다.
            </p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">알고리즘 선택</h2>
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
                    <p className="text-white font-medium">{algorithmLabels[option]}</p>
                    <p className="text-sm text-gray-400">{algorithmDescriptions[option]}</p>
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
            <h2 className="text-2xl font-semibold text-white">결과</h2>
            {isGenerating && (
              <span className="text-sm text-gray-400">해시 생성 중...</span>
            )}
          </div>

          {result ? (
            <div className="space-y-4">
              <ResultRow
                label={`${algorithmLabels[result.algorithm]} (Hex)`}
                value={result.hex}
                onCopy={() => handleCopy(result.hex, 'Hex 값')}
              />
              <ResultRow
                label="Base64"
                value={result.base64}
                onCopy={() => handleCopy(result.base64, 'Base64 값')}
              />
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm">출력 바이트 길이</p>
                <p className="text-white font-mono text-lg">{result.byteLength} bytes</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              입력값을 작성하면 선택한 알고리즘으로 해시를 자동 생성합니다.
            </p>
          )}
        </section>

        <section className="p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• 해시는 단방향 함수로, 결과값에서 원래 문자열을 복구할 수 없습니다.</li>
            <li>
              • MD5와 SHA-1은 충돌 가능성이 존재합니다. 보안용으로는 SHA-256 사용을 권장합니다.
            </li>
            <li>
              • 해시 결과는 입력값이 한 글자만 달라도 완전히 다른 값이 됩니다 (Avalanche Effect).
            </li>
            <li>• 결과는 Hex와 Base64 두 가지 형식으로 제공합니다.</li>
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
}: {
  label: string;
  value: string;
  onCopy: () => void;
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
        복사
      </button>
    </div>
  );
}
