import { describe, expect, it } from 'vitest';
import { evaluateRegex, sanitizeFlags } from './regex';

describe('regex tester utilities', () => {
  it('sanitizes flags keeping order and uniqueness', () => {
    expect(sanitizeFlags('imgm')).toBe('gim');
    expect(sanitizeFlags('xyz')).toBe('y');
    expect(sanitizeFlags('')).toBe('');
  });

  it('matches input with capturing groups', () => {
    const result = evaluateRegex('(foo)', 'g', 'foo foo bar');

    expect(result.matched).toBe(true);
    expect(result.matches).toHaveLength(2);
    expect(result.matches[0]).toMatchObject({ match: 'foo', index: 0, captures: ['foo'] });
    expect(result.matches[1]).toMatchObject({ match: 'foo', index: 4 });
  });

  it('returns named capture group metadata', () => {
    const result = evaluateRegex('(?<word>foo)', '', 'foo');

    expect(result.groupNames).toEqual(['word']);
    expect(result.matches[0].groups.word).toBe('foo');
  });

  it('throws on invalid patterns', () => {
    expect(() => evaluateRegex('(', '', 'input')).toThrow();
  });

  it('returns empty result when input is empty', () => {
    const result = evaluateRegex('foo', 'g', '');

    expect(result.matched).toBe(false);
    expect(result.matches).toEqual([]);
  });
});
