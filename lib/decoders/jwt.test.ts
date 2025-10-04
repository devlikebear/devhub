import { describe, expect, it, vi } from 'vitest';
import { decodeJwt } from './jwt';

describe('jwt decoder', () => {
  const toBase64Url = (value: Record<string, unknown>) => {
    const json = JSON.stringify(value);
    return Buffer.from(json, 'utf8')
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  it('decodes a valid token and extracts metadata', () => {
    const header = { alg: 'HS256', typ: 'JWT', kid: 'kid-1' };
    const payload = { sub: 'user', iat: 1700000000, nbf: 1700000000, exp: 1700003600 };
    const token = `${toBase64Url(header)}.${toBase64Url(payload)}.signature`;

    const spy = vi.spyOn(Date, 'now').mockReturnValue(1700007200000);
    const result = decodeJwt(token, { prettify: false });
    spy.mockRestore();

    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([]);
    expect(result.headerObject).toEqual(header);
    expect(result.payloadObject).toEqual(payload);
    expect(result.headerJson).toBe(JSON.stringify(header));
    expect(result.payloadJson).toBe(JSON.stringify(payload));
    expect(result.metadata).toMatchObject({
      hasSignature: true,
      algorithm: 'HS256',
      type: 'JWT',
      kid: 'kid-1',
      issuedAt: '2023-11-14T22:13:20.000Z (UTC)',
      notBefore: '2023-11-14T22:13:20.000Z (UTC)',
      expiresAt: '2023-11-14T23:13:20.000Z (UTC)',
      isExpired: true,
    });
  });

  it('returns structured error when token is malformed', () => {
    const result = decodeJwt('invalid-token');

    expect(result.errors[0]).toContain('JWT 토큰은 header.payload.signature 형식');
    expect(result.headerObject).toBeNull();
    expect(result.payloadObject).toBeNull();
  });

  it('reports decoding issues for invalid segments', () => {
    const token = 'invalid$$$.' + 'payload.'.repeat(1);
    const result = decodeJwt(token);

    expect(result.errors.some((error) => error.includes('Header'))).toBe(true);
    expect(result.segments.length).toBe(3);
  });
});
