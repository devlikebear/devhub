"use client";

import { useState } from "react";
import { encodeToBase64, decodeFromBase64, formatFileSize } from "@/lib/converters/base64";
import { useI18n, useTranslation } from "@/components/i18n/I18nProvider";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{text.title}</h1>
          <p className="text-xl text-gray-300">{text.subtitle}</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleModeChange("encode")}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
              mode === "encode"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {text.modes.encode}
          </button>
          <button
            onClick={() => handleModeChange("decode")}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
              mode === "decode"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {text.modes.decode}
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-white font-semibold">
              {mode === "encode" ? text.labels.inputEncode : text.labels.inputDecode}
            </label>
            <button
              onClick={handleClear}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {tButtons("clear")}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => handleConvert(e.target.value, mode)}
            placeholder={mode === "encode" ? text.placeholders.encode : text.placeholders.decode}
            rows={8}
            className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono"
          />
          {input && (
            <p className="text-sm text-gray-400 mt-2">
              {text.labels.size}: {formatFileSize(new Blob([input]).size)}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
            <p className="text-red-400">⚠️ {error}</p>
          </div>
        )}

        {copyMessage && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <p className="text-green-400">✓ {copyMessage}</p>
          </div>
        )}

        {output && !error && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-semibold">
                {mode === "encode" ? text.labels.outputEncode : text.labels.outputDecode}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleSwap}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {tButtons("swap")}
                </button>
                <button
                  onClick={() => copyToClipboard(output)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {tButtons("copy")}
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
              {text.labels.size}: {formatFileSize(new Blob([output]).size)}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
