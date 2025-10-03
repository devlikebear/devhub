'use client';

import { useState } from 'react';
import {
  validateJSON,
  formatJSON,
  minifyJSON,
  analyzeJSON,
  type JSONValidationResult,
} from '@/lib/converters/json';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [validation, setValidation] = useState<JSONValidationResult>({ isValid: true });
  const [analysis, setAnalysis] = useState<{ keys: number; depth: number; type: string } | null>(null);
  const [copyMessage, setCopyMessage] = useState('');
  const [indent, setIndent] = useState(2);

  // JSON 검증 및 분석
  const handleInputChange = (value: string) => {
    setInput(value);
    setCopyMessage('');

    if (!value.trim()) {
      setValidation({ isValid: true });
      setOutput('');
      setAnalysis(null);
      return;
    }

    const validationResult = validateJSON(value);
    setValidation(validationResult);

    if (validationResult.isValid) {
      try {
        const analysisResult = analyzeJSON(value);
        setAnalysis(analysisResult);
      } catch {
        setAnalysis(null);
      }
    } else {
      setOutput('');
      setAnalysis(null);
    }
  };

  // 포맷팅
  const handleFormat = () => {
    if (!validation.isValid) return;

    try {
      const formatted = formatJSON(input, indent);
      setOutput(formatted);
    } catch (err) {
      if (err instanceof Error) {
        setValidation({ isValid: false, error: err.message });
      }
    }
  };

  // 압축
  const handleMinify = () => {
    if (!validation.isValid) return;

    try {
      const minified = minifyJSON(input);
      setOutput(minified);
    } catch (err) {
      if (err instanceof Error) {
        setValidation({ isValid: false, error: err.message });
      }
    }
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
    setValidation({ isValid: true });
    setAnalysis(null);
    setCopyMessage('');
  };

  // 샘플 JSON 로드
  const loadSample = () => {
    const sample = `{
  "name": "DevHub",
  "version": "1.0.0",
  "tools": [
    {
      "id": "timestamp",
      "name": "Timestamp Converter",
      "category": "converter"
    },
    {
      "id": "base64",
      "name": "Base64 Encoder/Decoder",
      "category": "converter"
    }
  ],
  "features": {
    "privacy": true,
    "free": true,
    "responsive": true
  }
}`;
    handleInputChange(sample);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            JSON Formatter
          </h1>
          <p className="text-xl text-gray-300">
            JSON 포맷팅, 검증, 압축
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={handleFormat}
            disabled={!validation.isValid || !input.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            포맷팅
          </button>
          <button
            onClick={handleMinify}
            disabled={!validation.isValid || !input.trim()}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            압축
          </button>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">들여쓰기:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>Tab</option>
            </select>
          </div>
          <button
            onClick={loadSample}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            샘플 JSON
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            초기화
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-semibold">입력</label>
              {analysis && (
                <div className="text-sm text-gray-400">
                  타입: {analysis.type} | 키: {analysis.keys} | 깊이: {analysis.depth}
                </div>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder='{"key": "value"}'
              rows={20}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono text-sm"
            />

            {/* Validation Error */}
            {!validation.isValid && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-red-400 font-semibold mb-1">⚠️ JSON 오류</p>
                <p className="text-red-300 text-sm">{validation.error}</p>
                {validation.errorLine && validation.errorColumn && (
                  <p className="text-red-300 text-sm mt-1">
                    위치: 줄 {validation.errorLine}, 열 {validation.errorColumn}
                  </p>
                )}
              </div>
            )}

            {/* Valid Badge */}
            {validation.isValid && input.trim() && (
              <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                <p className="text-green-400 text-sm">✓ 유효한 JSON입니다</p>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-semibold">결과</label>
              {output && (
                <button
                  onClick={() => copyToClipboard(output)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  복사
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="포맷팅 또는 압축 버튼을 클릭하세요"
              rows={20}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 resize-none font-mono text-sm"
            />

            {/* Copy Message */}
            {copyMessage && (
              <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                <p className="text-green-400 text-sm">✓ {copyMessage}</p>
              </div>
            )}
          </div>
        </div>

        {/* Guide Section */}
        <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">사용 가이드</h3>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>포맷팅</strong>: JSON을 읽기 쉽게 들여쓰기와 줄바꿈 추가</p>
            <p>• <strong>압축</strong>: 불필요한 공백을 제거하여 최소 크기로 압축</p>
            <p>• <strong>실시간 검증</strong>: 입력 즉시 JSON 유효성 검사</p>
            <p>• <strong>에러 위치</strong>: 오류 발생 시 정확한 줄과 열 번호 표시</p>
            <p>• <strong>분석 정보</strong>: 타입, 키 개수, 깊이 등 JSON 구조 분석</p>
            <p>• <strong>프라이버시</strong>: 모든 처리는 브라우저에서 진행, 서버 전송 없음</p>
          </div>

          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">키보드 단축키:</p>
            <div className="space-y-1 text-sm text-gray-300">
              <p>• Ctrl/Cmd + Enter: 포맷팅</p>
              <p>• Ctrl/Cmd + M: 압축</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
