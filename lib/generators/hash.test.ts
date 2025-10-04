import { describe, expect, it } from 'vitest';
import { generateHash } from './hash';

describe('hash generator', () => {
  it('computes md5 hashes with metadata', async () => {
    const result = await generateHash('hello', 'md5');

    expect(result).toEqual({
      algorithm: 'md5',
      hex: '5d41402abc4b2a76b9719d911017c592',
      base64: 'XUFAKrxLKna5cZ2REBfFkg==',
      byteLength: 16,
    });
  });

  it('computes sha1 hashes', async () => {
    const result = await generateHash('hello', 'sha1');

    expect(result.algorithm).toBe('sha1');
    expect(result.hex).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
    expect(result.base64).toBe('qvTGHdzF6KLavt4PO0gs2a6pQ00=');
    expect(result.byteLength).toBe(20);
  });

  it('computes sha256 hashes', async () => {
    const result = await generateHash('hello', 'sha256');

    expect(result.hex).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
    expect(result.base64).toBe('LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ=');
    expect(result.byteLength).toBe(32);
  });
});
