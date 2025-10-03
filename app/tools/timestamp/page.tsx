"use client";

import { useState } from "react";
import {
  epochToDate,
  dateToEpoch,
  getCurrentTimestamp,
  isValidTimestamp,
  type TimestampResult,
} from "@/lib/converters/timestamp";
import { useI18n, useTranslation } from "@/components/i18n/I18nProvider";

type TimestampDictionary = {
  title: string;
  subtitle: string;
  epochLabel: string;
  epochPlaceholder: string;
  epochHint: string;
  dateLabel: string;
  datePlaceholder: string;
  dateHint: string;
  nowButton: string;
  resultTitle: string;
  rows: {
    epochMs: string;
    epochSec: string;
    iso: string;
    local: string;
    utc: string;
  };
  copyLabels: {
    epoch: string;
    epochSec: string;
    iso: string;
    local: string;
    utc: string;
  };
  errors: {
    invalidTimestamp: string;
    invalidDate: string;
    generic: string;
  };
};

export default function TimestampConverter() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools?.timestamp ?? {}) as TimestampDictionary;
  const tButtons = useTranslation("common.buttons");
  const tMessages = useTranslation("common.messages");

  const [epochInput, setEpochInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [result, setResult] = useState<TimestampResult | null>(null);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const handleEpochToDate = (value: string) => {
    setEpochInput(value);
    setError("");
    setCopyMessage("");

    if (!value.trim()) {
      setResult(null);
      return;
    }

    const timestamp = Number(value);
    if (!isValidTimestamp(timestamp)) {
      setError(text.errors.invalidTimestamp);
      setResult(null);
      return;
    }

    try {
      const converted = epochToDate(timestamp);
      setResult(converted);
    } catch {
      setError(text.errors.generic);
      setResult(null);
    }
  };

  const handleDateToEpoch = (value: string) => {
    setDateInput(value);
    setError("");
    setCopyMessage("");

    if (!value.trim()) {
      setResult(null);
      return;
    }

    try {
      const epochMs = dateToEpoch(value, true);
      const converted = epochToDate(epochMs, true);
      setResult(converted);
      setEpochInput(epochMs.toString());
    } catch {
      setError(text.errors.invalidDate);
      setResult(null);
    }
  };

  const handleSetNow = () => {
    const now = getCurrentTimestamp(true);
    setEpochInput(now.toString());
    handleEpochToDate(now.toString());
  };

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} • ${tMessages('copySuccess')}`);
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setCopyMessage(tMessages('copyError'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{text.title}</h1>
          <p className="text-xl text-gray-300">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <label className="block text-white font-semibold mb-2">{text.epochLabel}</label>
            <input
              type="text"
              value={epochInput}
              onChange={(e) => handleEpochToDate(e.target.value)}
              placeholder={text.epochPlaceholder}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <p className="text-sm text-gray-400 mt-2">{text.epochHint}</p>
            <button
              onClick={handleSetNow}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {text.nowButton}
            </button>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <label className="block text-white font-semibold mb-2">{text.dateLabel}</label>
            <input
              type="text"
              value={dateInput}
              onChange={(e) => handleDateToEpoch(e.target.value)}
              placeholder={text.datePlaceholder}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <p className="text-sm text-gray-400 mt-2">{text.dateHint}</p>
          </div>
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

        {result && !error && (
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">{text.resultTitle}</h2>

            <div className="space-y-4">
              <ResultRow
                label={text.rows.epochMs}
                value={result.epoch.toString()}
                onCopy={() => copyToClipboard(result.epoch.toString(), text.copyLabels.epoch)}
                tButtons={tButtons}
              />

              <ResultRow
                label={text.rows.epochSec}
                value={Math.floor(result.epoch / 1000).toString()}
                onCopy={() =>
                  copyToClipboard(Math.floor(result.epoch / 1000).toString(), text.copyLabels.epochSec)
                }
                tButtons={tButtons}
              />

              <ResultRow
                label={text.rows.iso}
                value={result.iso}
                onCopy={() => copyToClipboard(result.iso, text.copyLabels.iso)}
                tButtons={tButtons}
              />

              <ResultRow
                label={text.rows.local}
                value={result.local}
                onCopy={() => copyToClipboard(result.local, text.copyLabels.local)}
                tButtons={tButtons}
              />

              <ResultRow
                label={text.rows.utc}
                value={result.utc}
                onCopy={() => copyToClipboard(result.utc, text.copyLabels.utc)}
                tButtons={tButtons}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ResultRow({
  label,
  value,
  onCopy,
  tButtons,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  tButtons: ReturnType<typeof useTranslation>;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-white font-mono break-all">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
      >
        {tButtons('copy')}
      </button>
    </div>
  );
}
