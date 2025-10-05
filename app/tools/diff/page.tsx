"use client";

import { useState, useMemo } from "react";
import {
  calculateDiff,
  formatDiffStats,
  type DiffMode,
  type DiffOptions,
  type DiffResult,
} from "@/lib/converters/diff";
import { useI18n } from "@/components/i18n/I18nProvider";
import { GlassCard, GlassButton, GlassTextarea } from "@/components/ui/glass";
import ToolGuideModal from "@/components/tools/ToolGuideModal";

type DiffDictionary = {
  title: string;
  subtitle: string;
  labels: {
    original: string;
    modified: string;
    result: string;
  };
  buttons: {
    sample: string;
    clear: string;
    copy: string;
  };
  options: {
    mode: string;
    modeOptions: {
      line: string;
      word: string;
    };
    ignoreCase: string;
    ignoreWhitespace: string;
  };
  stats: {
    title: string;
    added: string;
    removed: string;
    unchanged: string;
  };
  messages: {
    copied: string;
    empty: string;
  };
};

export default function DiffChecker() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools as Record<string, unknown>).diffPage as DiffDictionary;

  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [mode, setMode] = useState<DiffMode>("line");
  const [options, setOptions] = useState<DiffOptions>({
    ignoreCase: false,
    ignoreWhitespace: false,
  });
  const [copyMessage, setCopyMessage] = useState("");

  // Diff 계산
  const diffResult: DiffResult | null = useMemo(() => {
    if (!original.trim() && !modified.trim()) return null;
    return calculateDiff(original, modified, mode, options);
  }, [original, modified, mode, options]);

  // 샘플 데이터 로드
  const loadSample = () => {
    setOriginal(`const greeting = "Hello World";
function sayHello() {
  console.log(greeting);
}
sayHello();`);
    setModified(`const greeting = "Hello, DevHub!";
function sayHello(name) {
  console.log(\`\${greeting} \${name}\`);
}
sayHello("Developer");`);
    setCopyMessage("");
  };

  // 전체 지우기
  const handleClear = () => {
    setOriginal("");
    setModified("");
    setCopyMessage("");
  };

  // 결과 복사
  const handleCopy = () => {
    if (!diffResult) return;

    const diffText = diffResult.changes
      .map((change) => {
        const prefix = change.added ? "+ " : change.removed ? "- " : "  ";
        return prefix + change.value;
      })
      .join("");

    navigator.clipboard.writeText(diffText).then(() => {
      setCopyMessage(text.messages.copied);
      setTimeout(() => setCopyMessage(""), 2000);
    });
  };

  // Diff 라인 렌더링
  const renderDiffLine = (
    value: string,
    type: "added" | "removed" | "unchanged",
    index: number
  ) => {
    const bgColor =
      type === "added"
        ? "bg-green-500/10 dark:bg-green-500/20"
        : type === "removed"
        ? "bg-red-500/10 dark:bg-red-500/20"
        : "bg-transparent";

    const borderColor =
      type === "added"
        ? "border-l-4 border-green-500"
        : type === "removed"
        ? "border-l-4 border-red-500"
        : "";

    const prefix =
      type === "added" ? "+ " : type === "removed" ? "- " : "  ";

    return (
      <div
        key={index}
        className={`px-4 py-1 font-mono text-sm ${bgColor} ${borderColor}`}
      >
        <span className="text-gray-500 dark:text-gray-400 mr-4">
          {String(index + 1).padStart(3, "0")}
        </span>
        <span className="text-gray-800 dark:text-gray-200">
          {prefix}
          {value}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {text.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {text.subtitle}
              </p>
            </div>
            <ToolGuideModal toolId="diff" />
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <GlassButton onClick={loadSample}>{text.buttons.sample}</GlassButton>
          <GlassButton onClick={handleClear}>{text.buttons.clear}</GlassButton>
          {diffResult && (
            <GlassButton onClick={handleCopy}>
              {text.buttons.copy}
              {copyMessage && (
                <span className="ml-2 text-green-400">{copyMessage}</span>
              )}
            </GlassButton>
          )}
        </div>

        {/* 옵션 */}
        <GlassCard className="p-6 mb-6">
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {text.options.mode}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("line")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    mode === "line"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {text.options.modeOptions.line}
                </button>
                <button
                  onClick={() => setMode("word")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    mode === "word"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {text.options.modeOptions.word}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.ignoreCase}
                  onChange={(e) =>
                    setOptions({ ...options, ignoreCase: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {text.options.ignoreCase}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.ignoreWhitespace}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      ignoreWhitespace: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {text.options.ignoreWhitespace}
                </span>
              </label>
            </div>
          </div>
        </GlassCard>

        {/* 입력 영역 (Side-by-side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GlassCard className="p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {text.labels.original}
            </label>
            <GlassTextarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              rows={15}
              className="font-mono text-sm"
              placeholder={text.labels.original}
            />
          </GlassCard>

          <GlassCard className="p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {text.labels.modified}
            </label>
            <GlassTextarea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              rows={15}
              className="font-mono text-sm"
              placeholder={text.labels.modified}
            />
          </GlassCard>
        </div>

        {/* Diff 결과 */}
        {diffResult && (
          <GlassCard className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {text.labels.result}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatDiffStats(diffResult.stats)}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-hidden">
              {diffResult.changes.map((change, index) => {
                const type = change.added
                  ? "added"
                  : change.removed
                  ? "removed"
                  : "unchanged";
                const lines = change.value.split("\n").filter((l) => l.trim());

                return lines.map((line, lineIndex) =>
                  renderDiffLine(line, type, index * 100 + lineIndex)
                );
              })}
            </div>
          </GlassCard>
        )}

        {!diffResult && (original.trim() || modified.trim()) && (
          <GlassCard className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {text.messages.empty}
            </p>
          </GlassCard>
        )}
      </main>
    </div>
  );
}
