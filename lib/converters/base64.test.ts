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

  it('decodes base64 segments even when mixed with plain text', () => {
    const mixedInput = 'randomtext SGVsbG8sIFdvcmxkIQ== trailing';

    expect(decodeFromBase64(mixedInput)).toBe('Hello, World!');
  });

  it('decodes multi-line base64 content embedded in email part', () => {
    const payload = [
      '------=_Part_21914_176397432.1379381048196',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      '7JWI64WV7ZWY7IS47JqUIERldkh1YiEg7J206rKD7J2AIOupgO2LsOudvOyduCBi',
      'YXNlNjQg7YWM7Iqk7Yq47J6F64uI64ukLg==',
      '------=_Part_21914_176397432.1379381048196--',
    ].join('\n');

    expect(decodeFromBase64(payload))
      .toBe('안녕하세요 DevHub! 이것은 멀티라인 base64 테스트입니다.');
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
