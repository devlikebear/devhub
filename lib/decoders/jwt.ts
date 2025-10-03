export interface JwtDecodeOptions {
  prettify?: boolean;
}

export interface JwtDecodeResult {
  headerRaw: string;
  payloadRaw: string;
  signature: string;
  headerObject: Record<string, unknown> | null;
  payloadObject: Record<string, unknown> | null;
  headerJson?: string;
  payloadJson?: string;
  segments: string[];
  errors: string[];
  warnings: string[];
  metadata: JwtMetadata;
}

export interface JwtMetadata {
  hasSignature: boolean;
  algorithm?: string;
  type?: string;
  contentType?: string;
  kid?: string;
  issuedAt?: string;
  notBefore?: string;
  expiresAt?: string;
  isExpired?: boolean;
}

const BASE64URL_RE = /^[A-Za-z0-9_\-]+=*$/;

export function decodeJwt(token: string, options: JwtDecodeOptions = {}): JwtDecodeResult {
  const trimmed = token.trim();
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!trimmed) {
    return emptyResult(errors.concat('JWT 토큰을 입력해주세요.'));
  }

  const segments = trimmed.split('.');
  if (segments.length !== 3) {
    errors.push('JWT 토큰은 header.payload.signature 형식의 3개 세그먼트로 구성되어야 합니다.');
    return emptyResult(errors, segments);
  }

  const [headerSeg, payloadSeg, signatureSeg] = segments;

  if (!signatureSeg) {
    warnings.push('서명 세그먼트가 비어 있습니다. 이 토큰은 서명되지 않았을 수 있습니다.');
  }

  if (!BASE64URL_RE.test(headerSeg) || !BASE64URL_RE.test(payloadSeg)) {
    warnings.push('header 또는 payload 세그먼트에 base64url 형식이 아닌 문자가 포함되어 있습니다.');
  }

  const headerBase64 = normalizeBase64Url(headerSeg);
  const payloadBase64 = normalizeBase64Url(payloadSeg);

  const headerResult = safeDecodeJson(headerBase64);
  const payloadResult = safeDecodeJson(payloadBase64);

  errors.push(...headerResult.errors.map((e) => `Header: ${e}`));
  errors.push(...payloadResult.errors.map((e) => `Payload: ${e}`));

  const metadata = extractMetadata(headerResult.value, payloadResult.value, signatureSeg);

  const prettify = options.prettify ?? true;
  const headerJson = headerResult.value
    ? JSON.stringify(headerResult.value, null, prettify ? 2 : undefined)
    : undefined;
  const payloadJson = payloadResult.value
    ? JSON.stringify(payloadResult.value, null, prettify ? 2 : undefined)
    : undefined;

  return {
    headerRaw: headerResult.raw,
    payloadRaw: payloadResult.raw,
    signature: signatureSeg,
    headerObject: headerResult.value,
    payloadObject: payloadResult.value,
    headerJson,
    payloadJson,
    segments,
    errors,
    warnings,
    metadata,
  };
}

function emptyResult(errors: string[], segments: string[] = []): JwtDecodeResult {
  return {
    headerRaw: '',
    payloadRaw: '',
    signature: segments[2] ?? '',
    headerObject: null,
    payloadObject: null,
    headerJson: undefined,
    payloadJson: undefined,
    segments,
    errors,
    warnings: [],
    metadata: {
      hasSignature: segments.length === 3 ? Boolean(segments[2]) : false,
    },
  };
}

interface DecodeJsonResult {
  value: Record<string, unknown> | null;
  raw: string;
  errors: string[];
}

function safeDecodeJson(base64: string): DecodeJsonResult {
  const errors: string[] = [];
  let raw = '';
  let decoded = null;

  try {
    raw = decodeBase64(base64);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'base64url 디코딩에 실패했습니다';
    errors.push(message);
    return { value: null, raw: '', errors };
  }

  try {
    decoded = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'JSON 파싱에 실패했습니다';
    errors.push(message);
  }

  return { value: decoded, raw, errors };
}

function decodeBase64(value: string): string {
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return window.atob(value);
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'base64').toString('utf8');
  }

  throw new Error('base64 디코딩을 지원하지 않는 환경입니다');
}

function normalizeBase64Url(segment: string): string {
  let output = segment.replace(/-/g, '+').replace(/_/g, '/');
  while (output.length % 4 !== 0) {
    output += '=';
  }
  return output;
}

function extractMetadata(
  header: Record<string, unknown> | null,
  payload: Record<string, unknown> | null,
  signature: string
): JwtMetadata {
  const metadata: JwtMetadata = {
    hasSignature: Boolean(signature),
  };

  if (header) {
    if (typeof header.alg === 'string') metadata.algorithm = header.alg;
    if (typeof header.typ === 'string') metadata.type = header.typ;
    if (typeof header.cty === 'string') metadata.contentType = header.cty;
    if (typeof header.kid === 'string') metadata.kid = header.kid;
  }

  if (payload) {
    const now = Date.now() / 1000;
    if (typeof payload.iat === 'number') metadata.issuedAt = toDateTime(payload.iat);
    if (typeof payload.nbf === 'number') metadata.notBefore = toDateTime(payload.nbf);
    if (typeof payload.exp === 'number') {
      metadata.expiresAt = toDateTime(payload.exp);
      metadata.isExpired = payload.exp < now;
    }
  }

  return metadata;
}

function toDateTime(epoch: number): string {
  const ms = epoch * 1000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    return `${epoch} (유효하지 않은 시간)`;
  }
  return `${date.toISOString()} (UTC)`;
}
