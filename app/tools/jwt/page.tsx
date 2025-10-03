'use client';

import { useMemo, useState } from 'react';
import { decodeJwt } from '@/lib/decoders/jwt';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldkh1YiBVc2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
  'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function JwtDecoderPage() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [copyMessage, setCopyMessage] = useState('');

  const result = useMemo(() => decodeJwt(token, { prettify: true }), [token]);

  const handleCopy = async (value: string, label: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label}을(를) 복사했습니다`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('클립보드 복사에 실패했습니다');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">JWT Decoder</h1>
          <p className="text-xl text-gray-300">
            서명 검증 없이 JWT 헤더 · 페이로드 · 메타데이터를 빠르게 확인하세요
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">JWT 토큰</h2>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => setToken(SAMPLE_JWT)}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
                >
                  샘플 불러오기
                </button>
                <button
                  onClick={() => setToken('')}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
                >
                  지우기
                </button>
              </div>
            </div>
            <textarea
              value={token}
              onChange={(event) => setToken(event.target.value)}
              rows={6}
              placeholder="header.payload.signature 형식의 JWT 토큰을 붙여넣으세요"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />
            <div className="flex flex-wrap gap-2 mt-4 text-sm">
              <button
                onClick={() => handleCopy(token, 'JWT 토큰')}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                JWT 복사
              </button>
            </div>
          </div>

          <aside className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-sm text-gray-300 space-y-4">
            <MetadataItem label="알고리즘" value={result.metadata.algorithm ?? '-'} />
            <MetadataItem label="타입" value={result.metadata.type ?? '-'} />
            <MetadataItem label="Content-Type" value={result.metadata.contentType ?? '-'} />
            <MetadataItem label="Key ID" value={result.metadata.kid ?? '-'} />
            <MetadataItem label="발급(iat)" value={result.metadata.issuedAt ?? '-'} />
            <MetadataItem label="유효 시작(nbf)" value={result.metadata.notBefore ?? '-'} />
            <MetadataItem
              label="만료(exp)"
              value={result.metadata.expiresAt ?? '-'}
              highlight={result.metadata.isExpired}
            />
            {!result.metadata.hasSignature && (
              <div className="p-3 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded">
                ⚠️ 서명 세그먼트가 비어 있습니다. 이 토큰은 검증되지 않았을 수 있습니다.
              </div>
            )}
            {result.warnings.length > 0 && (
              <div className="p-3 bg-yellow-900/20 border border-yellow-700 text-yellow-200 rounded space-y-1">
                {result.warnings.map((warning) => (
                  <p key={warning}>⚠️ {warning}</p>
                ))}
              </div>
            )}
            <div className="text-xs text-gray-500">
              • 이 도구는 클라이언트에서 실행되며 <strong className="text-gray-300">서명 검증을 수행하지 않습니다.</strong>
              <br />• 민감한 토큰을 사용할 때는 브라우저 환경에 주의하세요.
            </div>
          </aside>
        </section>

        {result.errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm space-y-2">
            {result.errors.map((error) => (
              <p key={error}>⚠️ {error}</p>
            ))}
          </div>
        )}

        {copyMessage && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400 text-sm">
            ✓ {copyMessage}
          </div>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DecodedSection
            title="Header"
            value={result.headerJson ?? ''}
            raw={result.headerRaw}
            onCopyJson={() => handleCopy(result.headerJson ?? '', 'Header JSON')}
            onCopyRaw={() => handleCopy(result.headerRaw, 'Header 원본')}
          />
          <DecodedSection
            title="Payload"
            value={result.payloadJson ?? ''}
            raw={result.payloadRaw}
            onCopyJson={() => handleCopy(result.payloadJson ?? '', 'Payload JSON')}
            onCopyRaw={() => handleCopy(result.payloadRaw, 'Payload 원본')}
          />
        </section>

        <section className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Signature</h2>
            <button
              onClick={() => handleCopy(result.signature, 'Signature')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              disabled={!result.signature}
            >
              서명 복사
            </button>
          </div>
          <p className="font-mono text-sm text-gray-300 break-all bg-gray-900/70 px-4 py-3 rounded-lg border border-gray-700">
            {result.signature || '서명값이 없습니다.'}
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
  onCopyJson,
  onCopyRaw,
}: {
  title: string;
  value: string;
  raw: string;
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
            원본 복사
          </button>
          <button
            onClick={onCopyJson}
            disabled={!hasValue}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              hasValue ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600/30 text-blue-100 cursor-not-allowed'
            }`}
          >
            JSON 복사
          </button>
        </div>
      </div>
      <pre className="min-h-[180px] whitespace-pre-wrap break-words text-sm font-mono leading-relaxed bg-gray-900/70 px-4 py-4 rounded-lg border border-gray-700 text-gray-200">
        {hasValue ? value : '유효한 JSON 데이터를 확인할 수 없습니다.'}
      </pre>
    </div>
  );
}
