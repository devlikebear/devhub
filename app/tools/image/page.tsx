'use client';

import { useState, useRef } from 'react';
import { useI18n } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton } from '@/components/ui/glass';
import {
  convertImage,
  downloadImage,
  formatFileSize,
  type ImageFormat,
  type ImageConversionResult,
} from '@/lib/converters/image';

interface ImageDictionary {
  title: string;
  subtitle: string;
  labels: {
    upload: string;
    format: string;
    quality: string;
    resize: string;
    width: string;
    height: string;
    original: string;
    converted: string;
    download: string;
    reset: string;
  };
  formats: {
    png: string;
    jpeg: string;
    webp: string;
  };
  info: {
    dragDrop: string;
    acceptedFormats: string;
    originalSize: string;
    newSize: string;
    originalFileSize: string;
    newFileSize: string;
    compressionRatio: string;
  };
  errors: {
    uploadFailed: string;
    conversionFailed: string;
  };
}

export default function ImageConverter() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools as Record<string, unknown>).imagePage as ImageDictionary;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [format, setFormat] = useState<ImageFormat>('image/png');
  const [quality, setQuality] = useState(90);
  const [maxWidth, setMaxWidth] = useState<string>('');
  const [maxHeight, setMaxHeight] = useState<string>('');
  const [result, setResult] = useState<ImageConversionResult | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(text.errors.uploadFailed);
      return;
    }

    setSelectedFile(file);
    setResult(null);

    // 자동 변환
    await handleConvert(file);
  };

  const handleConvert = async (file?: File) => {
    const targetFile = file || selectedFile;
    if (!targetFile) return;

    setIsConverting(true);

    const conversionResult = await convertImage(targetFile, {
      format,
      quality: quality / 100,
      maxWidth: maxWidth ? parseInt(maxWidth) : undefined,
      maxHeight: maxHeight ? parseInt(maxHeight) : undefined,
    });

    setResult(conversionResult);
    setIsConverting(false);
  };

  const handleDownload = () => {
    if (!result?.blob || !selectedFile) return;

    const extension = format.split('/')[1];
    const filename = selectedFile.name.replace(/\.[^/.]+$/, '') + '.' + extension;
    downloadImage(result.blob, filename);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setMaxWidth('');
    setMaxHeight('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const compressionRatio = result?.originalFileSize && result?.newFileSize
    ? ((1 - result.newFileSize / result.originalFileSize) * 100).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {text.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 업로드 & 설정 */}
          <div className="space-y-6">
            {/* 파일 업로드 */}
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">{text.labels.upload}</h3>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-gray-300 mb-2">{text.info.dragDrop}</p>
                <p className="text-sm text-gray-400">{text.info.acceptedFormats}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-300">
                    {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                </div>
              )}
            </GlassCard>

            {/* 포맷 선택 */}
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">{text.labels.format}</h3>

              <div className="grid grid-cols-3 gap-3">
                {(['image/png', 'image/jpeg', 'image/webp'] as ImageFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => {
                      setFormat(fmt);
                      if (selectedFile) handleConvert();
                    }}
                    className={`p-3 rounded-lg border transition-all ${
                      format === fmt
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {text.formats[fmt.split('/')[1] as keyof typeof text.formats]}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* 품질 설정 (JPEG/WebP) */}
            {(format === 'image/jpeg' || format === 'image/webp') && (
              <GlassCard>
                <h3 className="text-xl font-semibold mb-4">{text.labels.quality}</h3>

                <div className="space-y-3">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => {
                      setQuality(parseInt(e.target.value));
                      if (selectedFile) handleConvert();
                    }}
                    className="w-full"
                  />
                  <p className="text-center text-gray-300">{quality}%</p>
                </div>
              </GlassCard>
            )}

            {/* 리사이징 */}
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">{text.labels.resize}</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{text.labels.width} (px)</label>
                  <input
                    type="number"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(e.target.value)}
                    onBlur={() => selectedFile && handleConvert()}
                    placeholder="Auto"
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{text.labels.height} (px)</label>
                  <input
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(e.target.value)}
                    onBlur={() => selectedFile && handleConvert()}
                    placeholder="Auto"
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* 미리보기 & 결과 */}
          <div className="space-y-6">
            {/* 원본 이미지 */}
            {selectedFile && (
              <GlassCard>
                <h3 className="text-xl font-semibold mb-4">{text.labels.original}</h3>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Original"
                  className="w-full h-auto rounded-lg"
                />
                {result?.originalSize && (
                  <p className="mt-2 text-sm text-gray-400">
                    {text.info.originalSize}: {result.originalSize.width} × {result.originalSize.height}
                  </p>
                )}
              </GlassCard>
            )}

            {/* 변환된 이미지 */}
            {result?.success && result.dataUrl && (
              <GlassCard>
                <h3 className="text-xl font-semibold mb-4">{text.labels.converted}</h3>
                <img src={result.dataUrl} alt="Converted" className="w-full h-auto rounded-lg" />

                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  {result.newSize && (
                    <p>
                      {text.info.newSize}: {result.newSize.width} × {result.newSize.height}
                    </p>
                  )}
                  {result.newFileSize && (
                    <p>
                      {text.info.newFileSize}: {formatFileSize(result.newFileSize)}
                    </p>
                  )}
                  {compressionRatio && (
                    <p>
                      {text.info.compressionRatio}: {compressionRatio}%
                    </p>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <GlassButton onClick={handleDownload} className="flex-1">
                    {text.labels.download}
                  </GlassButton>
                  <GlassButton onClick={handleReset} variant="secondary" className="flex-1">
                    {text.labels.reset}
                  </GlassButton>
                </div>
              </GlassCard>
            )}

            {result?.error && (
              <GlassCard>
                <p className="text-red-400">{text.errors.conversionFailed}: {result.error}</p>
              </GlassCard>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
