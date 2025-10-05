"use client";

import { useMemo, useState } from "react";
import {
  parseColor,
  getComplementary,
  getAnalogous,
  getTriadic,
  getShades,
  type ColorFormats,
} from "@/lib/converters/color";
import { useI18n, useTranslation } from "@/components/i18n/I18nProvider";
import ToolGuideModal from "@/components/tools/ToolGuideModal";

type PaletteSwatch = { color: string; label: string };

type ColorToolDictionary = {
  title: string;
  subtitle: string;
  inputLabel: string;
  placeholder: string;
  hint: string;
  previewLabel: string;
  errorInvalid: string;
  formatSectionTitle: string;
  formatLabels: {
    hex: string;
    rgb: string;
    hsl: string;
  };
  complementaryTitle: string;
  analogousTitle: string;
  triadicTitle: string;
  shadesTitle: string;
  originalLabel: string;
  complementaryLabel: string;
  analogousLabel: string[];
  triadicLabel: string[];
  shadeLabel: string[];
};

export default function ColorTool() {
  const { dictionary } = useI18n();
  const tMessages = useTranslation("common.messages");
  const text = (dictionary.tools?.color ?? dictionary.toolsPage) as ColorToolDictionary;

  const [input, setInput] = useState("#3b82f6");
  const [color, setColor] = useState<ColorFormats | null>(parseColor("#3b82f6"));
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const handleColorChange = (value: string) => {
    setInput(value);
    setError("");
    setCopyMessage("");

    if (!value.trim()) {
      setColor(null);
      return;
    }

    const parsed = parseColor(value);
    if (parsed) {
      setColor(parsed);
    } else {
      setError(text.errorInvalid);
      setColor(null);
    }
  };

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} • ${tMessages("copySuccess")}`);
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setCopyMessage(tMessages("copyError"));
    }
  };

  const currentHex = color?.hex ?? "#3b82f6";
  const complementary = useMemo(() => getComplementary(currentHex), [currentHex]);
  const analogous = useMemo(() => getAnalogous(currentHex), [currentHex]);
  const triadic = useMemo(() => getTriadic(currentHex), [currentHex]);
  const shades = useMemo(() => getShades(currentHex), [currentHex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">{text.title}</h1>
            <ToolGuideModal toolId="color" />
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white/80 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
            <label className="block text-gray-900 dark:text-white font-semibold mb-4">{text.inputLabel}</label>
            <div className="mb-4">
              <input
                type="color"
                value={currentHex}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-20 rounded-lg cursor-pointer"
              />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder={text.placeholder}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text.hint}</p>
          </div>

          <div className="p-6 bg-white/80 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
            <label className="block text-gray-900 dark:text-white font-semibold mb-4">{text.previewLabel}</label>
            <div
              className="w-full h-32 rounded-lg border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: currentHex }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border-red-500/30 rounded-lg">
            <p className="text-red-400">⚠️ {error}</p>
          </div>
        )}

        {copyMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border-green-500/30 rounded-lg">
            <p className="text-green-400">✓ {copyMessage}</p>
          </div>
        )}

        {color && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{text.formatSectionTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormatCard
                label={text.formatLabels.hex}
                value={color.hex}
                onCopy={() => copyToClipboard(color.hex, text.formatLabels.hex)}
                extra={null}
              />
              <FormatCard
                label={text.formatLabels.rgb}
                value={color.rgbString}
                onCopy={() => copyToClipboard(color.rgbString, text.formatLabels.rgb)}
                extra={`R:${color.rgb.r} G:${color.rgb.g} B:${color.rgb.b}`}
              />
              <FormatCard
                label={text.formatLabels.hsl}
                value={color.hslString}
                onCopy={() => copyToClipboard(color.hslString, text.formatLabels.hsl)}
                extra={`H:${color.hsl.h}° S:${color.hsl.s}% L:${color.hsl.l}%`}
              />
            </div>
          </div>
        )}

        {color && (
          <div className="space-y-8">
            <PaletteSection
              title={text.complementaryTitle}
              swatches={[
                { color: currentHex, label: text.originalLabel },
                { color: complementary, label: text.complementaryLabel },
              ]}
              onCopy={copyToClipboard}
            />

            <PaletteSection
              title={text.analogousTitle}
              swatches={analogous.map((shade, index) => ({
                color: shade,
                label: text.analogousLabel[index] ?? text.analogousLabel[text.analogousLabel.length - 1],
              }))}
              onCopy={copyToClipboard}
            />

            <PaletteSection
              title={text.triadicTitle}
              swatches={triadic.map((shade, index) => ({
                color: shade,
                label: text.triadicLabel[index] ?? text.triadicLabel[text.triadicLabel.length - 1],
              }))}
              onCopy={copyToClipboard}
            />

            <PaletteSection
              title={text.shadesTitle}
              swatches={shades.map((shade, index) => ({
                color: shade,
                label: text.shadeLabel[index] ?? `${text.shadesTitle} ${index + 1}`,
              }))}
              onCopy={copyToClipboard}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function FormatCard({
  label,
  value,
  onCopy,
  extra,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  extra: string | null;
}) {
  const tButtons = useTranslation('common.buttons');

  return (
    <div className="p-4 bg-white/80 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <button
          onClick={onCopy}
          className="px-3 py-1 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded text-xs transition-colors"
        >
          {tButtons('copy')}
        </button>
      </div>
      <p className="text-gray-900 dark:text-white font-mono text-sm break-all">{value}</p>
      {extra && <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{extra}</p>}
    </div>
  );
}

function PaletteSection({
  title,
  swatches,
  onCopy,
}: {
  title: string;
  swatches: PaletteSwatch[];
  onCopy: (color: string, label: string) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {swatches.map((swatch) => (
          <ColorSwatch key={`${title}-${swatch.color}`} color={swatch.color} label={swatch.label} onCopy={onCopy} />
        ))}
      </div>
    </div>
  );
}

function ColorSwatch({
  color,
  label,
  onCopy,
}: {
  color: string;
  label: string;
  onCopy: (value: string, label: string) => void;
}) {
  const tButtons = useTranslation('common.buttons');

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 rounded-lg border border-gray-300 dark:border-gray-600 mb-2"
        style={{ backgroundColor: color }}
      ></div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{label}</p>
      <button
        onClick={() => onCopy(color, label)}
        className="px-3 py-1 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded text-xs transition-colors"
      >
        {tButtons('copy')}
      </button>
    </div>
  );
}
