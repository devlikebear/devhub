"use client";

import { useEffect, useMemo, useState } from "react";
import {
  decodeUrl,
  decodeUrlComponent,
  encodeUrl,
  encodeUrlComponent,
  formatReservedCharacters,
  isSafeUrl,
} from "@/lib/converters/url";
import { useI18n, useTranslation } from "@/components/i18n/I18nProvider";

type Mode = "encode" | "decode";
type Target = "full" | "component";

type UrlDictionary = {
  title: string;
  subtitle: string;
  mode: Record<Mode, string>;
  target: Record<Target, string>;
  infoLabels: {
    mode: string;
    target: string;
  };
  placeholder: Record<Mode, string>;
  reservedTitle: string;
  reservedDescription: string;
  encodeHint: string;
  safetyWarning: string;
  resultTitle: string;
  errors: {
    generic: string;
  };
};

export default function UrlToolPage() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools?.url ?? {}) as UrlDictionary;
  const tButtons = useTranslation("common.buttons");
  const tMessages = useTranslation("common.messages");

  const [mode, setMode] = useState<Mode>("encode");
  const [target, setTarget] = useState<Target>("full");
  const [input, setInput] = useState(
    "https://devhub.marvin-42.com/tools?query=hello world&lang=ko-KR"
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    handleConvert(
      "https://devhub.marvin-42.com/tools?query=hello world&lang=ko-KR",
      "encode",
      "full"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConvert = (value: string, nextMode = mode, nextTarget = target) => {
    setInput(value);
    setError("");
    setCopyMessage("");

    if (!value.trim()) {
      setOutput("");
      return;
    }

    try {
      if (nextMode === "encode") {
        const result =
          nextTarget === "component" ? encodeUrlComponent(value) : encodeUrl(value);
        setOutput(result.encoded);
      } else {
        const result =
          nextTarget === "component" ? decodeUrlComponent(value) : decodeUrl(value);
        setOutput(result.decoded);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : text.errors.generic;
      setError(message);
      setOutput("");
    }
  };

  const handleModeChange = (next: Mode) => {
    setMode(next);
    handleConvert(input, next, target);
  };

  const handleTargetChange = (next: Target) => {
    setTarget(next);
    handleConvert(input, mode, next);
  };

  const handleSwap = () => {
    if (!output) return;
    const nextMode = mode === "encode" ? "decode" : "encode";
    setMode(nextMode);
    setInput(output);
    handleConvert(output, nextMode, target);
  };

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} • ${tMessages('copySuccess')}`);
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setCopyMessage(tMessages('copyError'));
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  const reservedCharacters = useMemo(() => {
    if (mode === "encode" && target === "component" && input) {
      return formatReservedCharacters(input);
    }
    return "";
  }, [mode, target, input]);

  const urlSafetyNotice = useMemo(() => {
    if (mode === "decode" && target === "full" && output) {
      return isSafeUrl(output) ? "" : text.safetyWarning;
    }
    return "";
  }, [mode, target, output, text.safetyWarning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-5xl mx-auto px-6 py-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">{text.title}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">{text.subtitle}</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex flex-wrap gap-3 mb-6">
              <ToggleButton
                label={text.mode.encode}
                active={mode === "encode"}
                onClick={() => handleModeChange("encode")}
              />
              <ToggleButton
                label={text.mode.decode}
                active={mode === "decode"}
                onClick={() => handleModeChange("decode")}
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <ToggleButton
                label={text.target.full}
                active={target === "full"}
                onClick={() => handleTargetChange("full")}
              />
              <ToggleButton
                label={text.target.component}
                active={target === "component"}
                onClick={() => handleTargetChange("component")}
              />
            </div>

            <textarea
              value={input}
              onChange={(event) => handleConvert(event.target.value)}
              rows={8}
              placeholder={text.placeholder[mode]}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono"
            />

            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              <button
                onClick={() => setInput("")}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                {tButtons('clear')}
              </button>
              {output && (
                <button
                  onClick={handleSwap}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors"
                >
                  {tButtons('swap')}
                </button>
              )}
            </div>
          </div>

          <aside className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4 text-sm text-gray-300">
            <InfoRow label={text.infoLabels.mode} value={text.mode[mode]} />
            <InfoRow label={text.infoLabels.target} value={text.target[target]} />
            {mode === "encode" && (
              <pre className="text-xs text-gray-400 whitespace-pre-wrap leading-normal">
                {text.encodeHint}
              </pre>
            )}
            {reservedCharacters && (
              <div className="p-3 bg-gray-900/60 rounded border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">{text.reservedTitle}</p>
                <p className="text-white text-xs font-mono leading-relaxed">{reservedCharacters}</p>
                <p className="text-xs text-gray-500 mt-2">{text.reservedDescription}</p>
              </div>
            )}
            {urlSafetyNotice && (
              <div className="p-3 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded text-xs">
                {urlSafetyNotice}
              </div>
            )}
          </aside>
        </section>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border-red-500/30 rounded-lg text-red-400">
            ⚠️ {error}
          </div>
        )}

        {copyMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border-green-500/30 rounded-lg text-green-400">
            ✓ {copyMessage}
          </div>
        )}

        {output && !error && (
          <section className="mb-10 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">{text.resultTitle}</h2>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => handleCopy(output, text.resultTitle)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/90 to-purple-500/90 hover:from-blue-600/90 hover:to-purple-600/90 text-white rounded-lg transition-colors"
                >
                  {tButtons('copy')}
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 resize-none font-mono"
            />
          </section>
        )}
      </main>
    </div>
  );
}

function ToggleButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
        active ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
