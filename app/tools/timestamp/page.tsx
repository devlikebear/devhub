'use client';

import { useState } from 'react';
import {
  epochToDate,
  dateToEpoch,
  getCurrentTimestamp,
  isValidTimestamp,
  type TimestampResult,
} from '@/lib/converters/timestamp';

export default function TimestampConverter() {
  const [epochInput, setEpochInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [result, setResult] = useState<TimestampResult | null>(null);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  // Epoch → Date 변환
  const handleEpochToDate = (value: string) => {
    setEpochInput(value);
    setError('');
    setCopyMessage('');

    if (!value.trim()) {
      setResult(null);
      return;
    }

    const timestamp = Number(value);
    if (!isValidTimestamp(timestamp)) {
      setError('유효하지 않은 타임스탬프입니다');
      setResult(null);
      return;
    }

    try {
      const converted = epochToDate(timestamp);
      setResult(converted);
    } catch {
      setError('변환 중 오류가 발생했습니다');
      setResult(null);
    }
  };

  // Date → Epoch 변환
  const handleDateToEpoch = (value: string) => {
    setDateInput(value);
    setError('');
    setCopyMessage('');

    if (!value.trim()) {
      setResult(null);
      return;
    }

    try {
      const epochMs = dateToEpoch(value, true);
      const converted = epochToDate(epochMs, true);
      setResult(converted);
      setEpochInput(epochMs.toString());
    } catch {
      setError('유효하지 않은 날짜 형식입니다');
      setResult(null);
    }
  };

  // 현재 시간으로 설정
  const handleSetNow = () => {
    const now = getCurrentTimestamp(true);
    setEpochInput(now.toString());
    handleEpochToDate(now.toString());
  };

  // 클립보드 복사
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${label} 복사됨!`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('복사 실패');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Timestamp Converter
          </h1>
          <p className="text-xl text-gray-300">
            Epoch 타임스탬프 ↔ 날짜/시간 변환
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Epoch Input */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <label className="block text-white font-semibold mb-2">
              Epoch Timestamp
            </label>
            <input
              type="text"
              value={epochInput}
              onChange={(e) => handleEpochToDate(e.target.value)}
              placeholder="1609459200000"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <p className="text-sm text-gray-400 mt-2">
              초 또는 밀리초 단위 (자동 감지)
            </p>
            <button
              onClick={handleSetNow}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              현재 시간
            </button>
          </div>

          {/* Date Input */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <label className="block text-white font-semibold mb-2">
              날짜/시간
            </label>
            <input
              type="text"
              value={dateInput}
              onChange={(e) => handleDateToEpoch(e.target.value)}
              placeholder="2021-01-01T00:00:00Z"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <p className="text-sm text-gray-400 mt-2">
              ISO 8601 또는 파싱 가능한 형식
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
            <p className="text-red-400">⚠️ {error}</p>
          </div>
        )}

        {/* Copy Message */}
        {copyMessage && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <p className="text-green-400">✓ {copyMessage}</p>
          </div>
        )}

        {/* Result Section */}
        {result && !error && (
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">변환 결과</h2>

            <div className="space-y-4">
              {/* Epoch (ms) */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Epoch (밀리초)</p>
                  <p className="text-white font-mono">{result.epoch}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(result.epoch.toString(), 'Epoch')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>

              {/* Epoch (s) */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Epoch (초)</p>
                  <p className="text-white font-mono">{Math.floor(result.epoch / 1000)}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(Math.floor(result.epoch / 1000).toString(), 'Epoch (초)')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>

              {/* ISO 8601 */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400 mb-1">ISO 8601</p>
                  <p className="text-white font-mono break-all">{result.iso}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(result.iso, 'ISO 8601')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>

              {/* Local Time */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400 mb-1">로컬 시간 (한국)</p>
                  <p className="text-white font-mono">{result.local}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(result.local, '로컬 시간')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>

              {/* UTC */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400 mb-1">UTC</p>
                  <p className="text-white font-mono">{result.utc}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(result.utc, 'UTC')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                >
                  복사
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Guide Section */}
        <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">사용 가이드</h3>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>Epoch Timestamp</strong>: 1970-01-01 00:00:00 UTC부터 경과한 시간 (초 또는 밀리초)</p>
            <p>• <strong>자동 감지</strong>: 13자리 이상은 밀리초, 그 이하는 초 단위로 자동 판단</p>
            <p>• <strong>지원 형식</strong>: ISO 8601, RFC 2822, YYYY-MM-DD 등 JavaScript Date 파싱 가능한 모든 형식</p>
            <p>• <strong>예시</strong>: 1609459200 (초), 1609459200000 (밀리초), 2021-01-01T00:00:00Z</p>
          </div>
        </div>
      </main>
    </div>
  );
}
