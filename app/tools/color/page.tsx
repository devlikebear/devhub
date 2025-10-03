'use client';

import { useState } from 'react';
import {
  parseColor,
  getComplementary,
  getAnalogous,
  getTriadic,
  getShades,
  type ColorFormats,
} from '@/lib/converters/color';

export default function ColorTool() {
  const [input, setInput] = useState('#3b82f6');
  const [color, setColor] = useState<ColorFormats | null>(null);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  // 색상 파싱
  const handleColorChange = (value: string) => {
    setInput(value);
    setError('');
    setCopyMessage('');

    if (!value.trim()) {
      setColor(null);
      return;
    }

    const parsed = parseColor(value);
    if (parsed) {
      setColor(parsed);
    } else {
      setError('유효하지 않은 색상 형식입니다');
      setColor(null);
    }
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
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Color Tool
          </h1>
          <p className="text-xl text-gray-300">
            HEX ↔ RGB ↔ HSL 변환 및 팔레트 생성
          </p>
        </div>

        {/* Color Picker & Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Input Section */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <label className="block text-white font-semibold mb-4">색상 입력</label>

            {/* Color Picker */}
            <div className="mb-4">
              <input
                type="color"
                value={color?.hex || '#3b82f6'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-20 rounded-lg cursor-pointer"
              />
            </div>

            {/* Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#3b82f6 또는 rgb(59, 130, 246)"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />

            <p className="text-sm text-gray-400 mt-2">
              HEX, RGB, HSL 형식 지원
            </p>
          </div>

          {/* Preview */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <label className="block text-white font-semibold mb-4">미리보기</label>
            <div
              className="w-full h-32 rounded-lg border border-gray-600"
              style={{ backgroundColor: color?.hex || '#3b82f6' }}
            ></div>
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

        {/* Color Formats */}
        {color && !error && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">색상 형식</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* HEX */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">HEX</p>
                  <button
                    onClick={() => copyToClipboard(color.hex, 'HEX')}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                  >
                    복사
                  </button>
                </div>
                <p className="text-white font-mono text-lg">{color.hex}</p>
              </div>

              {/* RGB */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">RGB</p>
                  <button
                    onClick={() => copyToClipboard(color.rgbString, 'RGB')}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                  >
                    복사
                  </button>
                </div>
                <p className="text-white font-mono text-sm">{color.rgbString}</p>
                <p className="text-gray-400 text-xs mt-1">
                  R:{color.rgb.r} G:{color.rgb.g} B:{color.rgb.b}
                </p>
              </div>

              {/* HSL */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">HSL</p>
                  <button
                    onClick={() => copyToClipboard(color.hslString, 'HSL')}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                  >
                    복사
                  </button>
                </div>
                <p className="text-white font-mono text-sm">{color.hslString}</p>
                <p className="text-gray-400 text-xs mt-1">
                  H:{color.hsl.h}° S:{color.hsl.s}% L:{color.hsl.l}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Color Palettes */}
        {color && !error && (
          <div className="space-y-8">
            {/* Complementary */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">보색 (Complementary)</h3>
              <div className="flex gap-4">
                <ColorSwatch color={color.hex} label="원본" onCopy={copyToClipboard} />
                <ColorSwatch color={getComplementary(color.hex)} label="보색" onCopy={copyToClipboard} />
              </div>
            </div>

            {/* Analogous */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">유사색 (Analogous)</h3>
              <div className="flex flex-wrap gap-4">
                {getAnalogous(color.hex).map((c, i) => (
                  <ColorSwatch key={i} color={c} label={i === 2 ? '원본' : `유사색 ${i + 1}`} onCopy={copyToClipboard} />
                ))}
              </div>
            </div>

            {/* Triadic */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">3색 조화 (Triadic)</h3>
              <div className="flex flex-wrap gap-4">
                {getTriadic(color.hex).map((c, i) => (
                  <ColorSwatch key={i} color={c} label={i === 0 ? '원본' : `조화 ${i + 1}`} onCopy={copyToClipboard} />
                ))}
              </div>
            </div>

            {/* Shades */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">명도 변화 (Shades)</h3>
              <div className="flex flex-wrap gap-4">
                {getShades(color.hex).map((c, i) => (
                  <ColorSwatch key={i} color={c} label={`${90 - i * 20}%`} onCopy={copyToClipboard} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Guide Section */}
        <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">사용 가이드</h3>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>HEX</strong>: #RRGGBB 형식 (예: #3b82f6, #f00)</p>
            <p>• <strong>RGB</strong>: rgb(R, G, B) 형식 (예: rgb(59, 130, 246))</p>
            <p>• <strong>HSL</strong>: hsl(H, S%, L%) 형식 (예: hsl(217, 91%, 60%))</p>
            <p>• <strong>보색</strong>: 색상환에서 정반대편 색상</p>
            <p>• <strong>유사색</strong>: 색상환에서 인접한 색상들</p>
            <p>• <strong>3색 조화</strong>: 색상환을 3등분한 위치의 색상들</p>
            <p>• <strong>명도 변화</strong>: 같은 색상의 밝기 변화</p>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ColorSwatchProps {
  color: string;
  label: string;
  onCopy: (text: string, label: string) => void;
}

function ColorSwatch({ color, label, onCopy }: ColorSwatchProps) {
  return (
    <div
      className="group relative w-24 h-24 rounded-lg border border-gray-600 cursor-pointer transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
      onClick={() => onCopy(color, label)}
    >
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xs font-semibold mb-1">{label}</p>
          <p className="text-white text-xs font-mono">{color}</p>
        </div>
      </div>
    </div>
  );
}
