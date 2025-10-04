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
import { GlassCard, GlassButton, GlassInput } from '@/components/ui/glass';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-900 dark:text-white mb-4">{text.title}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GlassCard className="p-6">
            <GlassInput
              label={text.epochLabel}
              type="text"
              value={epochInput}
              onChange={(e) => handleEpochToDate(e.target.value)}
              placeholder={text.epochPlaceholder}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text.epochHint}</p>
            <GlassButton
              onClick={handleSetNow}
              variant="primary"
              className="mt-3 px-4 py-2 text-sm"
            >
              {text.nowButton}
            </GlassButton>
          </GlassCard>

          <GlassCard className="p-6">
            <GlassInput
              label={text.dateLabel}
              type="text"
              value={dateInput}
              onChange={(e) => handleDateToEpoch(e.target.value)}
              placeholder={text.datePlaceholder}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text.dateHint}</p>
          </GlassCard>
        </div>

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

        {result && !error && (
          <GlassCard className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{text.resultTitle}</h2>

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
          </GlassCard>
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
    <div className="flex items-center justify-between p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-gray-900 dark:text-white font-mono break-all">{value}</p>
      </div>
      <GlassButton
        onClick={onCopy}
        variant="secondary"
        className="px-4 py-2 text-sm"
      >
        {tButtons('copy')}
      </GlassButton>
    </div>
  );
}
