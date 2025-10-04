import { describe, expect, it } from 'vitest';
import {
  decodeFromBase64,
  encodeToBase64,
  formatFileSize,
  isValidBase64,
} from './base64';

describe('base64 converters', () => {
  it('encodes and decodes round-trip', () => {
    const original = '안녕하세요 DevHub!';
    const encoded = encodeToBase64(original);

    expect(encoded).toBe('7JWI64WV7ZWY7IS47JqUIERldkh1YiE=');
    expect(decodeFromBase64(encoded)).toBe(original);
  });

  it('returns empty string when encoding empty input', () => {
    expect(encodeToBase64('')).toBe('');
  });

  it('rejects invalid base64 strings', () => {
    expect(() => decodeFromBase64('invalid@@')).toThrow('유효하지 않은 Base64 문자열입니다');
  });

  it('detects valid and invalid base64 inputs', () => {
    expect(isValidBase64('Zm9vYmFy'))
      .toBe(true);
    expect(isValidBase64('not?base64'))
      .toBe(false);
  });

  it('formats file sizes with appropriate units', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(1048576)).toBe('1 MB');
  });
});
