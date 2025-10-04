import { describe, expect, it } from 'vitest';
import {
  decodeUrl,
  decodeUrlComponent,
  encodeUrl,
  encodeUrlComponent,
  formatReservedCharacters,
  isSafeUrl,
} from './url';

describe('url converters', () => {
  it('encodes and decodes full URLs', () => {
    const value = 'https://devhub.example.com/경로?query=테스트&value=1';
    const encoded = encodeUrl(value);

    expect(encoded).toEqual({ original: value, encoded: encodeURI(value) });
    expect(decodeUrl(encoded.encoded)).toEqual({ original: encoded.encoded, decoded: value });
  });

  it('encodes and decodes URL components with reserved characters', () => {
    const component = 'email+alias@example.com';
    const encoded = encodeUrlComponent(component);

    expect(encoded.encoded).toBe('email%2Balias%40example.com');
    expect(decodeUrlComponent(encoded.encoded)).toEqual({ original: encoded.encoded, decoded: component });
  });

  it('detects unsafe URL schemes', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('data:text/plain;base64,AAAA')).toBe(false);
    expect(isSafeUrl(' https://safe.example.com ')).toBe(true);
  });

  it('formats reserved characters and removes duplicates', () => {
    expect(formatReservedCharacters('A B C')).toBe('  → %20');
    expect(formatReservedCharacters('ABC')).toBe('');
  });
});
