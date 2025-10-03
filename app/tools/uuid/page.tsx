'use client';

import { useState } from 'react';
import {
  generateMultipleUUIDs,
  formatUUIDCase,
  formatUUIDHyphens,
} from '@/lib/converters/uuid';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [withHyphens, setWithHyphens] = useState(true);
  const [copyMessage, setCopyMessage] = useState('');

  // UUID 생성
  const handleGenerate = () => {
    const newUuids = generateMultipleUUIDs(count);
    const formatted = newUuids.map(uuid =>
      formatUUIDCase(formatUUIDHyphens(uuid, withHyphens), uppercase)
    );
    setUuids(formatted);
    setCopyMessage('');
  };

  // 클립보드 복사 (개별)
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`복사됨: ${text}`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('복사 실패');
    }
  };

  // 클립보드 복사 (전체)
  const copyAllToClipboard = async () => {
    try {
      const text = uuids.join('\n');
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${uuids.length}개 UUID 복사됨!`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('복사 실패');
    }
  };

  // 초기화
  const handleClear = () => {
    setUuids([]);
    setCopyMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            UUID Generator
          </h1>
          <p className="text-xl text-gray-300">
            UUID v4 생성기
          </p>
        </div>

        {/* Controls */}
        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Count */}
            <div>
              <label className="block text-white font-semibold mb-2">생성 개수</label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value={1}>1개</option>
                <option value={5}>5개</option>
                <option value={10}>10개</option>
                <option value={25}>25개</option>
                <option value={50}>50개</option>
                <option value={100}>100개</option>
              </select>
            </div>

            {/* Options */}
            <div>
              <label className="block text-white font-semibold mb-2">옵션</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="w-4 h-4 rounded bg-gray-900 border-gray-600"
                  />
                  <span>대문자</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={withHyphens}
                    onChange={(e) => setWithHyphens(e.target.checked)}
                    className="w-4 h-4 rounded bg-gray-900 border-gray-600"
                  />
                  <span>하이픈 포함</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGenerate}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              생성
            </button>
            {uuids.length > 0 && (
              <>
                <button
                  onClick={copyAllToClipboard}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  전체 복사
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  초기화
                </button>
              </>
            )}
          </div>
        </div>

        {/* Copy Message */}
        {copyMessage && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <p className="text-green-400">✓ {copyMessage}</p>
          </div>
        )}

        {/* Results */}
        {uuids.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">
                생성된 UUID ({uuids.length}개)
              </h2>
            </div>

            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="text-gray-500 font-mono text-sm w-12">
                      {index + 1}.
                    </span>
                    <code className="text-white font-mono text-sm md:text-base break-all">
                      {uuid}
                    </code>
                  </div>
                  <button
                    onClick={() => copyToClipboard(uuid)}
                    className="ml-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-colors opacity-0 group-hover:opacity-100"
                  >
                    복사
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guide Section */}
        <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">사용 가이드</h3>
          <div className="space-y-2 text-gray-300">
            <p>
              • <strong>UUID</strong>: Universally Unique Identifier, 범용 고유 식별자
            </p>
            <p>
              • <strong>UUID v4</strong>: 난수 기반 UUID (충돌 확률 극히 낮음)
            </p>
            <p>
              • <strong>형식</strong>: 8-4-4-4-12 (총 36자, 하이픈 포함)
            </p>
            <p>
              • <strong>사용 사례</strong>: 데이터베이스 키, 세션 ID, 파일명, 추적 ID
            </p>
            <p>
              • <strong>보안</strong>: Web Crypto API 사용으로 안전한 난수 생성
            </p>
            <p>
              • <strong>프라이버시</strong>: 모든 생성은 브라우저에서 처리, 서버 전송 없음
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">예시:</p>
            <div className="space-y-1 text-sm font-mono">
              <p className="text-gray-300">
                <span className="text-blue-400">소문자 + 하이픈:</span>{' '}
                550e8400-e29b-41d4-a716-446655440000
              </p>
              <p className="text-gray-300">
                <span className="text-green-400">대문자 + 하이픈:</span>{' '}
                550E8400-E29B-41D4-A716-446655440000
              </p>
              <p className="text-gray-300">
                <span className="text-yellow-400">소문자 하이픈 제거:</span>{' '}
                550e8400e29b41d4a716446655440000
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
