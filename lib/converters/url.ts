const RESERVED_CHARS = /[^A-Za-z0-9\-_.!~*'()]/g;

export interface UrlEncodeResult {
  original: string;
  encoded: string;
}

export interface UrlDecodeResult {
  original: string;
  decoded: string;
}

export function encodeUrl(value: string): UrlEncodeResult {
  try {
    const encoded = encodeURI(value);
    return { original: value, encoded };
  } catch (error) {
    const message = error instanceof Error ? error.message : '인코딩 중 오류가 발생했습니다';
    throw new Error(message);
  }
}

export function decodeUrl(value: string): UrlDecodeResult {
  try {
    const decoded = decodeURI(value);
    return { original: value, decoded };
  } catch (error) {
    const message = error instanceof Error ? error.message : '디코딩 중 오류가 발생했습니다';
    throw new Error(message);
  }
}

export function encodeUrlComponent(value: string): UrlEncodeResult {
  try {
    const encoded = encodeURIComponent(value)
      .replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
    return { original: value, encoded };
  } catch (error) {
    const message = error instanceof Error ? error.message : '인코딩 중 오류가 발생했습니다';
    throw new Error(message);
  }
}

export function decodeUrlComponent(value: string): UrlDecodeResult {
  try {
    const decoded = decodeURIComponent(value);
    return { original: value, decoded };
  } catch (error) {
    const message = error instanceof Error ? error.message : '디코딩 중 오류가 발생했습니다';
    throw new Error(message);
  }
}

export function isSafeUrl(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return false;
  return !trimmed.startsWith('javascript:') && !trimmed.startsWith('data:');
}

export function formatReservedCharacters(text: string): string {
  const matches = text.match(RESERVED_CHARS);
  if (!matches) return '';
  const unique = Array.from(new Set(matches));
  return unique.map((char) => `${char} → %${char.charCodeAt(0).toString(16).toUpperCase()}`).join(', ');
}
