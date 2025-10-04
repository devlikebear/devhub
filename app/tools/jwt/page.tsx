'use client';

import { useMemo, useState } from 'react';
import { decodeJwt } from '@/lib/decoders/jwt';
import { useI18n } from '@/components/i18n/I18nProvider';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldkh1YiBVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
  'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

type JwtDictionary = {
  title: string;
  subtitle: string;
  tokenLabel: string;
  loadSample: string;
  clear: string;
  placeholder: string;
  copyToken: string;
  warningNoSignature: string;
  notice: string;
  emptyValue: string;
  noSignature: string;
  metadata: {
    algorithm: string;
    type: string;
    contentType: string;
    keyId: string;
    issuedAt: string;
    notBefore: string;
    expiresAt: string;
  };
  sections: {
    header: string;
    payload: string;
    signature: string;
  };
  buttons: {
    copyRaw: string;
    copyJson: string;
    copySignature: string;
  };
  copySuccess: string;
  copyFailed: string;
  claims: {
    iss: string;
    sub: string;
    aud: string;
    exp: string;
    nbf: string;
    iat: string;
    jti: string;
  };
};

export default function JwtDecoderPage() {
  const { dictionary } = useI18n();
  const text = (dictionary.tools?.jwt ?? {}) as JwtDictionary;

  const [token, setToken] = useState(SAMPLE_JWT);
  const [copyMessage, setCopyMessage] = useState('');

  const result = useMemo(() => decodeJwt(token, { prettify: true }), [token]);

  const handleCopy = async (value: string, label: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(text.copySuccess.replace('{{label}}', label));
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage(text.copyFailed);
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{text.title}</h1>
          <p className="text-xl text-gray-300">{text.subtitle}</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">{text.tokenLabel}</h2>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => setToken(SAMPLE_JWT)}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
                >
                  {text.loadSample}
                </button>
                <button
                  onClick={() => setToken('')}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
                >
                  {text.clear}
                </button>
              </div>
            </div>
            <textarea
              value={token}
              onChange={(event) => setToken(event.target.value)}
              rows={6}
              placeholder={text.placeholder}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />
            <div className="flex flex-wrap gap-2 mt-4 text-sm">
              <button
                onClick={() => handleCopy(token, text.tokenLabel)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors"
              >
                {text.copyToken}
              </button>
            </div>
          </div>

          <aside className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-sm text-gray-300 space-y-4">
            <MetadataItem label={text.metadata.algorithm} value={result.metadata.algorithm ?? '-'} />
            <MetadataItem label={text.metadata.type} value={result.metadata.type ?? '-'} />
            <MetadataItem label={text.metadata.contentType} value={result.metadata.contentType ?? '-'} />
            <MetadataItem label={text.metadata.keyId} value={result.metadata.kid ?? '-'} />
            <MetadataItem label={text.metadata.issuedAt} value={result.metadata.issuedAt ?? '-'} />
            <MetadataItem label={text.metadata.notBefore} value={result.metadata.notBefore ?? '-'} />
            <MetadataItem
              label={text.metadata.expiresAt}
              value={result.metadata.expiresAt ?? '-'}
              highlight={result.metadata.isExpired}
            />
            {!result.metadata.hasSignature && (
              <div className="p-3 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded">
                {text.warningNoSignature}
              </div>
            )}
            {result.warnings.length > 0 && (
              <div className="p-3 bg-yellow-900/20 border border-yellow-700 text-yellow-200 rounded space-y-1">
                {result.warnings.map((warning) => (
                  <p key={warning}>⚠️ {warning}</p>
                ))}
              </div>
            )}
            <div className="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: text.notice }} />
          </aside>
        </section>

        {result.errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-500/10 border-red-500/30 rounded-lg text-red-400 text-sm space-y-2">
            {result.errors.map((error) => (
              <p key={error}>⚠️ {error}</p>
            ))}
          </div>
        )}

        {copyMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border-green-500/30 rounded-lg text-green-400 text-sm">
            ✓ {copyMessage}
          </div>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DecodedSection
            title={text.sections.header}
            value={result.headerJson ?? ''}
            raw={result.headerRaw}
            emptyValue={text.emptyValue}
            onCopyJson={() => handleCopy(result.headerJson ?? '', `${text.sections.header} JSON`)}
            onCopyRaw={() => handleCopy(result.headerRaw, `${text.sections.header} ${text.buttons.copyRaw}`)}
            buttonLabels={text.buttons}
          />
          <DecodedSection
            title={text.sections.payload}
            value={result.payloadJson ?? ''}
            raw={result.payloadRaw}
            emptyValue={text.emptyValue}
            onCopyJson={() => handleCopy(result.payloadJson ?? '', `${text.sections.payload} JSON`)}
            onCopyRaw={() => handleCopy(result.payloadRaw, `${text.sections.payload} ${text.buttons.copyRaw}`)}
            buttonLabels={text.buttons}
          />
        </section>

        <section className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">{text.sections.signature}</h2>
            <button
              onClick={() => handleCopy(result.signature, text.sections.signature)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-sm transition-colors"
              disabled={!result.signature}
            >
              {text.buttons.copySignature}
            </button>
          </div>
          <p className="font-mono text-sm text-gray-300 break-all bg-gray-900/70 px-4 py-3 rounded-lg border border-gray-700">
            {result.signature || text.noSignature}
          </p>
        </section>
      </main>
    </div>
  );
}

function MetadataItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <span className={`font-medium ${highlight ? 'text-red-400' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function DecodedSection({
  title,
  value,
  raw,
  emptyValue,
  buttonLabels,
  onCopyJson,
  onCopyRaw,
}: {
  title: string;
  value: string;
  raw: string;
  emptyValue: string;
  buttonLabels: { copyRaw: string; copyJson: string };
  onCopyJson: () => void;
  onCopyRaw: () => void;
}) {
  const hasValue = Boolean(value);

  return (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="flex gap-2 text-sm">
          <button
            onClick={onCopyRaw}
            disabled={!raw}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              raw ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
            }`}
          >
            {buttonLabels.copyRaw}
          </button>
          <button
            onClick={onCopyJson}
            disabled={!hasValue}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              hasValue ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600/30 text-blue-100 cursor-not-allowed'
            }`}
          >
            {buttonLabels.copyJson}
          </button>
        </div>
      </div>
      <pre className="min-h-[180px] whitespace-pre-wrap break-words text-sm font-mono leading-relaxed bg-gray-900/70 px-4 py-4 rounded-lg border border-gray-700 text-gray-200">
        {hasValue ? value : emptyValue}
      </pre>
    </div>
  );
}
