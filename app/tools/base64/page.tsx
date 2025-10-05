"use client";

import { useState, useEffect } from "react";
import { encodeToBase64, decodeFromBase64, formatFileSize } from "@/lib/converters/base64";
import { useI18n, useTranslation } from "@/components/i18n/I18nProvider";
import { GlassCard, GlassButton, GlassTextarea } from '@/components/ui/glass';
import ShareButton from '@/components/tools/ShareButton';
import { getUrlParam } from '@/lib/utils/urlParams';
import ToolGuideModal from '@/components/tools/ToolGuideModal';

type ConversionMode = "encode" | "decode";

type Base64Text = {
  title: string;
  subtitle: string;
  modes: Record<ConversionMode, string>;
  labels: {
    inputEncode: string;
    inputDecode: string;
    outputEncode: string;
    outputDecode: string;
    size: string;
  };
  placeholders: Record<ConversionMode, string>;
  errors: {
    generic: string;
  };
};

const TEXT: Record<string, Base64Text> = {
  ko: {
    title: "Base64 Encoder/Decoder",
    subtitle: "문자열 ↔ Base64 인코딩/디코딩",
    modes: {
      encode: "인코딩 (Text → Base64)",
      decode: "디코딩 (Base64 → Text)",
    },
    labels: {
      inputEncode: "원본 텍스트",
      inputDecode: "Base64 문자열",
      outputEncode: "Base64 결과",
      outputDecode: "디코딩 결과",
      size: "크기",
    },
    placeholders: {
      encode: "인코딩할 텍스트를 입력하세요...",
      decode: "디코딩할 Base64 문자열을 입력하세요...",
    },
    errors: {
      generic: "변환 중 오류가 발생했습니다",
    },
  },
  en: {
    title: "Base64 Encoder/Decoder",
    subtitle: "Convert plain text to and from Base64 instantly.",
    modes: {
      encode: "Encoding (Text → Base64)",
      decode: "Decoding (Base64 → Text)",
    },
    labels: {
      inputEncode: "Original Text",
      inputDecode: "Base64 String",
      outputEncode: "Base64 Result",
      outputDecode: "Decoded Result",
      size: "Size",
    },
    placeholders: {
      encode: "Type text to encode...",
      decode: "Paste a Base64 encoded string...",
    },
    errors: {
      generic: "An error occurred while converting.",
    },
  },
};

export default function Base64EncoderDecoder() {
  const { locale } = useI18n();
  const text = TEXT[locale] ?? TEXT.ko;
  const tButtons = useTranslation("common.buttons");
  const tMessages = useTranslation("common.messages");

  const [mode, setMode] = useState<ConversionMode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  // URL 파라미터에서 초기값 로드
  useEffect(() => {
    const urlMode = getUrlParam('mode') as ConversionMode | null;
    const urlInput = getUrlParam('input');

    if (urlMode && (urlMode === 'encode' || urlMode === 'decode')) {
      setMode(urlMode);
    }

    if (urlInput) {
      setInput(urlInput);
      handleConvert(urlInput, urlMode || mode);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConvert = (value: string, conversionMode: ConversionMode) => {
    setInput(value);
    setError("");
    setCopyMessage("");

    if (!value.trim()) {
      setOutput("");
      return;
    }

    try {
      const converted =
        conversionMode === "encode" ? encodeToBase64(value) : decodeFromBase64(value);
      setOutput(converted);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(text.errors.generic);
      }
      setOutput("");
    }
  };

  const handleModeChange = (newMode: ConversionMode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
    setCopyMessage("");
  };

  const handleSwap = () => {
    if (!output) return;

    const newMode: ConversionMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput(output);
    handleConvert(output, newMode);
  };

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyMessage(tMessages("copySuccess"));
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setCopyMessage(tMessages("copyError"));
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopyMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-900 dark:text-white mb-4">{text.title}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">{text.subtitle}</p>
            </div>
            <ToolGuideModal toolId="base64" />
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <GlassButton
            onClick={() => handleModeChange("encode")}
            variant={mode === "encode" ? "primary" : "secondary"}
            className="flex-1 px-6 py-3"
          >
            {text.modes.encode}
          </GlassButton>
          <GlassButton
            onClick={() => handleModeChange("decode")}
            variant={mode === "decode" ? "primary" : "secondary"}
            className="flex-1 px-6 py-3"
          >
            {text.modes.decode}
          </GlassButton>
        </div>

        <GlassCard className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-gray-900 dark:text-white font-semibold">
              {mode === "encode" ? text.labels.inputEncode : text.labels.inputDecode}
            </label>
            <GlassButton
              onClick={handleClear}
              variant="secondary"
              className="text-sm px-3 py-1"
            >
              {tButtons("clear")}
            </GlassButton>
          </div>
          <GlassTextarea
            value={input}
            onChange={(e) => handleConvert(e.target.value, mode)}
            placeholder={mode === "encode" ? text.placeholders.encode : text.placeholders.decode}
            rows={8}
            className="font-mono"
          />
          {input && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {text.labels.size}: {formatFileSize(new Blob([input]).size)}
            </p>
          )}
        </GlassCard>

        {error && (
          <GlassCard hover={false} className="mb-6 p-4 bg-red-500/10 border-red-500/30">
            <p className="text-red-400">⚠️ {error}</p>
          </GlassCard>
        )}

        {copyMessage && (
          <GlassCard hover={false} className="mb-6 p-4 bg-green-500/10 border-green-500/30">
            <p className="text-green-400">✓ {copyMessage}</p>
          </GlassCard>
        )}

        {output && !error && (
          <GlassCard className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-gray-900 dark:text-white font-semibold">
                {mode === "encode" ? text.labels.outputEncode : text.labels.outputDecode}
              </label>
              <div className="flex gap-2">
                <GlassButton
                  onClick={handleSwap}
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {tButtons("swap")}
                </GlassButton>
                <GlassButton
                  onClick={() => copyToClipboard(output)}
                  variant="primary"
                  className="px-4 py-2 text-sm"
                >
                  {tButtons("copy")}
                </GlassButton>
                <ShareButton
                  data={{ mode, input }}
                  label={tButtons("share")}
                  className="px-4 py-2 text-sm"
                />
              </div>
            </div>
            <GlassTextarea
              value={output}
              readOnly
              rows={8}
              className="font-mono"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {text.labels.size}: {formatFileSize(new Blob([output]).size)}
            </p>
          </GlassCard>
        )}
      </main>
    </div>
  );
}
