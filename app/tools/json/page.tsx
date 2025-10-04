"use client";

import { useMemo, useState } from "react";
import {
  validateJSON,
  formatJSON,
  minifyJSON,
  analyzeJSON,
  type JSONValidationResult,
} from "@/lib/converters/json";
import { useI18n, useTranslation } from "@/components/i18n/I18nProvider";

type AnalysisInfo = {
  keys: number;
  depth: number;
  type: string;
};

type JsonDictionary = {
  title: string;
  subtitle: string;
  buttons: {
    format: string;
    minify: string;
    sample: string;
    clear: string;
  };
  indentLabel: string;
  indentOptions: {
    two: string;
    four: string;
    tab: string;
  };
  input: {
    label: string;
    placeholder: string;
    errorTitle: string;
    validMessage: string;
    analysis: {
      summary: string;
    };
  };
  output: {
    label: string;
    placeholder: string;
  };
  guide: {
    title: string;
    items: string[];
    keyboardTitle: string;
    shortcuts: {
      format: string;
      minify: string;
    };
  };
  errors: {
    generic: string;
  };
  sample: string;
};

export default function JSONFormatter() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools?.json ?? {}) as JsonDictionary;
  const tButtons = useTranslation("common.buttons");
  const tMessages = useTranslation("common.messages");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [validation, setValidation] = useState<JSONValidationResult>({ isValid: true });
  const [analysis, setAnalysis] = useState<AnalysisInfo | null>(null);
  const [copyMessage, setCopyMessage] = useState("");
  const [indent, setIndent] = useState<number>(2);

  const handleInputChange = (value: string) => {
    setInput(value);
    setCopyMessage("");

    if (!value.trim()) {
      setValidation({ isValid: true });
      setOutput("");
      setAnalysis(null);
      return;
    }

    const validationResult = validateJSON(value);
    setValidation(validationResult);

    if (validationResult.isValid) {
      try {
        const analysisResult = analyzeJSON(value);
        setAnalysis(analysisResult as AnalysisInfo);
      } catch {
        setAnalysis(null);
      }
    } else {
      setOutput("");
      setAnalysis(null);
    }
  };

  const handleFormat = () => {
    if (!validation.isValid || !input.trim()) return;
    try {
      const formatted = formatJSON(input, indent);
      setOutput(formatted);
    } catch (err) {
      if (err instanceof Error) {
        setValidation({ isValid: false, error: err.message });
      } else {
        setValidation({ isValid: false, error: text.errors.generic });
      }
    }
  };

  const handleMinify = () => {
    if (!validation.isValid || !input.trim()) return;
    try {
      const minified = minifyJSON(input);
      setOutput(minified);
    } catch (err) {
      if (err instanceof Error) {
        setValidation({ isValid: false, error: err.message });
      } else {
        setValidation({ isValid: false, error: text.errors.generic });
      }
    }
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
    setValidation({ isValid: true });
    setAnalysis(null);
    setCopyMessage("");
  };

  const loadSample = () => {
    handleInputChange(text.sample || '{}');
  };

  const analysisSummary = useMemo(() => {
    if (!analysis) return "";
    return text.input.analysis.summary
      .replace("{{type}}", analysis.type)
      .replace("{{keys}}", analysis.keys.toString())
      .replace("{{depth}}", analysis.depth.toString());
  }, [analysis, text.input.analysis.summary]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">{text.title}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">{text.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={handleFormat}
            disabled={!validation.isValid || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500/90 to-purple-500/90 hover:from-blue-600/90 hover:to-purple-600/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            {text.buttons.format}
          </button>
          <button
            onClick={handleMinify}
            disabled={!validation.isValid || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-green-500/90 to-emerald-500/90 hover:from-green-600/90 hover:to-emerald-600/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            {text.buttons.minify}
          </button>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">{text.indentLabel}:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value={2}>{text.indentOptions.two}</option>
              <option value={4}>{text.indentOptions.four}</option>
              <option value={8}>{text.indentOptions.tab}</option>
            </select>
          </div>
          <button
            onClick={loadSample}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold transition-colors"
          >
            {text.buttons.sample}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold transition-colors"
          >
            {text.buttons.clear}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-semibold">{text.input.label}</label>
              {analysis && (
                <div className="text-sm text-gray-400">{analysisSummary}</div>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={text.input.placeholder}
              rows={20}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none font-mono text-sm"
            />

            {!validation.isValid && (
              <div className="mt-4 p-4 bg-red-500/10 border-red-500/30 rounded-lg">
                <p className="text-red-400 font-semibold mb-1">{text.input.errorTitle}</p>
                <p className="text-red-300 text-sm">{validation.error}</p>
                {validation.errorLine && validation.errorColumn && (
                  <p className="text-red-300 text-sm mt-1">
                    {`Line ${validation.errorLine}, Column ${validation.errorColumn}`}
                  </p>
                )}
              </div>
            )}

            {validation.isValid && input.trim() && (
              <div className="mt-4 p-3 bg-green-500/10 border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">{text.input.validMessage}</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-semibold">{text.output.label}</label>
              {output && (
                <button
                  onClick={() => copyToClipboard(output)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/90 to-purple-500/90 hover:from-blue-600/90 hover:to-purple-600/90 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {tButtons('copy')}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder={text.output.placeholder}
              rows={20}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 resize-none font-mono text-sm"
            />

            {copyMessage && (
              <div className="mt-4 p-3 bg-green-500/10 border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">✓ {copyMessage}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">{text.guide.title}</h3>
          <div className="space-y-2 text-gray-300">
            {text.guide.items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">{text.guide.keyboardTitle}</p>
            <div className="space-y-1 text-sm text-gray-300">
              <p>{text.guide.shortcuts.format}</p>
              <p>{text.guide.shortcuts.minify}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
