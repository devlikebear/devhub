'use client';

import { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton } from '@/components/ui/glass';
import {
  generateQRCode,
  downloadQRCode,
  downloadSVG,
  type ErrorCorrectionLevel,
  type QRCodeOptions,
  errorCorrectionLevels,
} from '@/lib/converters/qrcode';
import ToolGuideModal from '@/components/tools/ToolGuideModal';

interface QRDictionary {
  title: string;
  subtitle: string;
  labels: {
    input: string;
    result: string;
    size: string;
    errorCorrection: string;
    margin: string;
    foreground: string;
    background: string;
  };
  buttons: {
    generate: string;
    downloadPNG: string;
    downloadSVG: string;
    clear: string;
    sample: string;
  };
  errorLevels: {
    L: string;
    M: string;
    Q: string;
    H: string;
  };
  placeholders: {
    input: string;
  };
  messages: {
    empty: string;
    generated: string;
    error: string;
  };
}

export default function QRGenerator() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools as Record<string, unknown>).qrPage as QRDictionary;

  const [input, setInput] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // QR Code options
  const [size, setSize] = useState(256);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('M');
  const [margin, setMargin] = useState(4);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // QR 코드 생성
  const handleGenerate = async () => {
    if (!input.trim()) {
      setError(text.messages.empty);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const options: QRCodeOptions = {
        errorCorrectionLevel: errorCorrection,
        margin,
        width: size,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
      };

      const result = await generateQRCode(input, options);
      setQrDataUrl(result.dataUrl);
      setQrSvg(result.svgString || null);
      setError(null);
    } catch (err) {
      setError(`${text.messages.error}: ${err}`);
      setQrDataUrl(null);
      setQrSvg(null);
    } finally {
      setIsGenerating(false);
    }
  };

  // 입력 변경 시 자동 생성
  useEffect(() => {
    if (input.trim()) {
      handleGenerate();
    } else {
      setQrDataUrl(null);
      setQrSvg(null);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, size, errorCorrection, margin, foregroundColor, backgroundColor]);

  // 샘플 로드
  const loadSample = () => {
    setInput('https://github.com/devlikebear/devhub');
  };

  // 초기화
  const handleClear = () => {
    setInput('');
    setQrDataUrl(null);
    setQrSvg(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {text.title}
          </h1>
          <p className="text-xl text-gray-300">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <div className="space-y-6">
            <GlassCard>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-semibold">
                  {text.labels.input}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={text.placeholders.input}
                  className="w-full h-32 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Size */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    {text.labels.size}
                  </label>
                  <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    min="128"
                    max="1024"
                    step="64"
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Error Correction */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    {text.labels.errorCorrection}
                  </label>
                  <select
                    value={errorCorrection}
                    onChange={(e) =>
                      setErrorCorrection(e.target.value as ErrorCorrectionLevel)
                    }
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {(Object.keys(errorCorrectionLevels) as ErrorCorrectionLevel[]).map(
                      (level) => (
                        <option key={level} value={level}>
                          {text.errorLevels[level]} (
                          {errorCorrectionLevels[level].recovery})
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Margin */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    {text.labels.margin}
                  </label>
                  <input
                    type="number"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    min="0"
                    max="10"
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Foreground Color */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    {text.labels.foreground}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-12 h-10 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="col-span-2">
                  <label className="block text-gray-300 mb-2 text-sm">
                    {text.labels.background}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 bg-gray-900/50 border border-gray-700 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <GlassButton onClick={loadSample} variant="secondary">
                  {text.buttons.sample}
                </GlassButton>
                <GlassButton onClick={handleClear} variant="secondary">
                  {text.buttons.clear}
                </GlassButton>
              </div>
            </GlassCard>
          </div>

          {/* QR Code Result */}
          <div className="space-y-6">
            <GlassCard>
              <label className="block text-gray-300 mb-4 font-semibold">
                {text.labels.result}
              </label>

              {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 mb-4">
                  {error}
                </div>
              )}

              {!input.trim() && !error && (
                <div className="flex items-center justify-center h-64 bg-gray-900/30 rounded-lg border-2 border-dashed border-gray-700">
                  <p className="text-gray-500">{text.messages.empty}</p>
                </div>
              )}

              {isGenerating && (
                <div className="flex items-center justify-center h-64 bg-gray-900/30 rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              )}

              {qrDataUrl && !isGenerating && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-6 bg-white rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrDataUrl} alt="QR Code" className="max-w-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <GlassButton
                      onClick={() => qrDataUrl && downloadQRCode(qrDataUrl)}
                      disabled={!qrDataUrl}
                    >
                      {text.buttons.downloadPNG}
                    </GlassButton>
                    <GlassButton
                      onClick={() => qrSvg && downloadSVG(qrSvg)}
                      disabled={!qrSvg}
                      variant="secondary"
                    >
                      {text.buttons.downloadSVG}
                    </GlassButton>
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </GlassCard>
          </div>
        </div>

        {/* Tool Guide */}
        <ToolGuideModal toolId="qr" />
      </main>
    </div>
  );
}
