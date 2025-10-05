/**
 * URL 파라미터 유틸리티
 * 도구 상태를 URL로 인코딩/디코딩하여 공유 가능하게 만듭니다
 */

/**
 * URL에서 파라미터 값을 가져옵니다
 */
export function getUrlParam(key: string): string | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/**
 * URL에 파라미터를 설정합니다 (히스토리 업데이트)
 */
export function setUrlParam(key: string, value: string): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, '', url.toString());
}

/**
 * URL에서 파라미터를 제거합니다
 */
export function removeUrlParam(key: string): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.replaceState({}, '', url.toString());
}

/**
 * 현재 URL의 모든 파라미터를 객체로 반환합니다
 */
export function getAllUrlParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * 공유 가능한 URL을 생성합니다
 */
export function createShareUrl(params: Record<string, string>): string {
  if (typeof window === 'undefined') return '';

  const url = new URL(window.location.href);

  // 기존 파라미터 제거
  url.search = '';

  // 새 파라미터 추가
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

/**
 * Base64로 데이터를 인코딩합니다 (URL-safe)
 */
export function encodeData(data: string): string {
  if (!data) return '';

  try {
    // URL-safe Base64 인코딩
    return btoa(encodeURIComponent(data))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch {
    return '';
  }
}

/**
 * Base64에서 데이터를 디코딩합니다 (URL-safe)
 */
export function decodeData(encoded: string): string {
  if (!encoded) return '';

  try {
    // URL-safe Base64 디코딩
    const base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    return decodeURIComponent(atob(padded));
  } catch {
    return '';
  }
}

/**
 * URL 길이 제한 확인 (2048자)
 */
export function isUrlTooLong(url: string): boolean {
  return url.length > 2048;
}

/**
 * 데이터가 URL로 공유하기에 적합한지 확인
 */
export function isSafeToShare(data: string): {
  safe: boolean;
  reason?: string;
} {
  // 민감한 키워드 체크
  const sensitivePatterns = [
    /password/i,
    /secret/i,
    /api[_-]?key/i,
    /token/i,
    /credential/i,
    /private[_-]?key/i,
  ];

  for (const pattern of sensitivePatterns) {
    if (pattern.test(data)) {
      return {
        safe: false,
        reason: '민감한 정보가 포함되어 있을 수 있습니다.',
      };
    }
  }

  // URL 길이 체크
  const encoded = encodeData(data);
  const testUrl = `${window.location.origin}${window.location.pathname}?data=${encoded}`;

  if (isUrlTooLong(testUrl)) {
    return {
      safe: false,
      reason: '데이터가 너무 커서 URL로 공유할 수 없습니다.',
    };
  }

  return { safe: true };
}
