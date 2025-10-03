/**
 * UUID Generator Utilities
 * UUID v4 생성 및 포맷 변환
 */

/**
 * UUID v4 생성 (Web Crypto API 사용)
 * @returns UUID v4 문자열
 */
export function generateUUID(): string {
  // crypto.randomUUID() 사용 (가장 안전)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback: crypto.getRandomValues 사용
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // UUID v4 형식으로 변환
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

    const hex = Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20, 32),
    ].join('-');
  }

  // Fallback: Math.random 사용 (덜 안전하지만 호환성 높음)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 여러 개의 UUID 생성
 * @param count - 생성할 UUID 개수
 * @returns UUID 배열
 */
export function generateMultipleUUIDs(count: number): string[] {
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    uuids.push(generateUUID());
  }
  return uuids;
}

/**
 * UUID 대소문자 변환
 * @param uuid - 변환할 UUID
 * @param uppercase - true면 대문자, false면 소문자
 */
export function formatUUIDCase(uuid: string, uppercase: boolean): string {
  return uppercase ? uuid.toUpperCase() : uuid.toLowerCase();
}

/**
 * UUID 하이픈 제거/추가
 * @param uuid - 변환할 UUID
 * @param withHyphens - true면 하이픈 포함, false면 제거
 */
export function formatUUIDHyphens(uuid: string, withHyphens: boolean): string {
  if (withHyphens) {
    // 하이픈 없는 UUID에 하이픈 추가
    const clean = uuid.replace(/-/g, '');
    if (clean.length !== 32) {
      return uuid; // 유효하지 않으면 원본 반환
    }
    return [
      clean.substring(0, 8),
      clean.substring(8, 12),
      clean.substring(12, 16),
      clean.substring(16, 20),
      clean.substring(20, 32),
    ].join('-');
  } else {
    // 하이픈 제거
    return uuid.replace(/-/g, '');
  }
}

/**
 * UUID 유효성 검증
 * @param uuid - 검증할 UUID 문자열
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const uuidNoHyphenRegex = /^[0-9a-f]{12}4[0-9a-f]{3}[89ab][0-9a-f]{15}$/i;

  return uuidRegex.test(uuid) || uuidNoHyphenRegex.test(uuid);
}
