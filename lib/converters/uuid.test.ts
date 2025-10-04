import { describe, expect, it, vi } from 'vitest';
import {
  formatUUIDCase,
  formatUUIDHyphens,
  generateMultipleUUIDs,
  generateUUID,
  isValidUUID,
} from './uuid';

describe('uuid utilities', () => {
  it('delegates to crypto.randomUUID when available', () => {
    const spy = vi.spyOn(globalThis.crypto, 'randomUUID');
    const value = generateUUID();

    expect(spy).toHaveBeenCalled();
    expect(isValidUUID(value)).toBe(true);

    spy.mockRestore();
  });

  it('generates multiple uuids', () => {
    const values = generateMultipleUUIDs(3);
    expect(values).toHaveLength(3);
    values.forEach((value) => expect(isValidUUID(value)).toBe(true));
  });

  it('formats uuid case', () => {
    expect(formatUUIDCase('abc-def', true)).toBe('ABC-DEF');
    expect(formatUUIDCase('ABC-DEF', false)).toBe('abc-def');
  });

  it('adds or removes hyphens', () => {
    const compact = '550e8400e29b41d4a716446655440000';
    const hyphenated = '550e8400-e29b-41d4-a716-446655440000';

    expect(formatUUIDHyphens(compact, true)).toBe(hyphenated);
    expect(formatUUIDHyphens(hyphenated, false)).toBe(compact);
  });

  it('validates both hyphenated and compact uuids', () => {
    expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    expect(isValidUUID('550e8400e29b41d4a716446655440000')).toBe(true);
    expect(isValidUUID('invalid-uuid')).toBe(false);
  });
});
