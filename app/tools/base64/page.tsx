'use client';

import { useState } from 'react';
import {
  encodeToBase64,
  decodeFromBase64,
  formatFileSize,
} from '@/lib/converters/base64';

type ConversionMode = 'encode' | 'decode';

export default function Base64EncoderDecoder() {
  const [mode, setMode] = useState<ConversionMode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  // 변환 처리
  const handleConvert = (value: string, conversionMode: ConversionMode) => {
    setInput(value);
    setError('');
    setCopyMessage('');

    if (!value.trim()) {
      setOutput('');
      return;
    }

    try {
      if (conversionMode === 'encode') {
        const encoded = encodeToBase64(value);
        setOutput(encoded);
      } else {
        const decoded = decodeFromBase64(value);
        setOutput(decoded);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('변환 중 오류가 발생했습니다');
      }
      setOutput('');
    }
  };

  // 모드 변경
  const handleModeChange = (newMode: ConversionMode) => {
    setMode(newMode);
    setInput('');
    setOutput('');
    setError('');
    setCopyMessage('');
  };

  // 입력/출력 교체
  const handleSwap = () => {
    if (!output) return;

    const newMode: ConversionMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput(output);
    handleConvert(output, newMode);
  };

  // 클립보드 복사
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage('복사되었습니다!');
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('복사 실패');
    }
  };

  // 초기화
  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopyMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Base64 Encoder/Decoder
          </h1>
          <p className="text-xl text-gray-300">
            문자열 ↔ Base64 인코딩/디코딩
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleModeChange('encode')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
              mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            인코딩 (Text → Base64)
          </button>
          <button
            onClick={() => handleModeChange('decode')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            디코딩 (Base64 → Text)
          </button>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-white font-semibold">
              {mode === 'encode' ? '원본 텍스트' : 'Base64 문자열'}
            </label>
            <button
              onClick={handleClear}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              초기화
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => handleConvert(e.target.value, mode)}
            placeholder={
              mode === 'encode'
                ? '인코딩할 텍스트를 입력하세요...'
                : '디코딩할 Base64 문자열을 입력하세요...'
            }
            rows={8}
            className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono"
          />
          {input && (
            <p className="text-sm text-gray-400 mt-2">
              크기: {formatFileSize(new Blob([input]).size)}
            </p>
          )}
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

        {/* Output Section */}
        {output && !error && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-semibold">
                {mode === 'encode' ? 'Base64 결과' : '디코딩 결과'}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleSwap}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  ↔ 교체
                </button>
                <button
                  onClick={() => copyToClipboard(output)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  복사
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={8}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 resize-none font-mono"
            />
            <p className="text-sm text-gray-400 mt-2">
              크기: {formatFileSize(new Blob([output]).size)}
            </p>
          </div>
        )}

        {/* Guide Section */}
        <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">사용 가이드</h3>
          <div className="space-y-2 text-gray-300">
            <p>
              • <strong>Base64</strong>: 바이너리 데이터를 ASCII 텍스트로 인코딩하는 방식
            </p>
            <p>
              • <strong>사용 사례</strong>: 이메일 첨부파일, 데이터 URL, API 토큰 등
            </p>
            <p>
              • <strong>UTF-8 지원</strong>: 한글, 이모지 등 모든 유니코드 문자 지원
            </p>
            <p>
              • <strong>프라이버시</strong>: 모든 변환은 브라우저에서 처리되며 서버로 전송되지 않습니다
            </p>
            <p>
              • <strong>교체 기능</strong>: 결과를 클릭하여 반대 방향으로 즉시 변환 가능
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">예시:</p>
            <div className="space-y-1 text-sm font-mono">
              <p className="text-gray-300">
                <span className="text-blue-400">입력:</span> Hello, World!
              </p>
              <p className="text-gray-300">
                <span className="text-green-400">Base64:</span> SGVsbG8sIFdvcmxkIQ==
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
