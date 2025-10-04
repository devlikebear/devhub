import { describe, expect, it, vi } from 'vitest';
import {
  dateToEpoch,
  epochToDate,
  getCurrentTimestamp,
  isValidTimestamp,
} from './timestamp';

describe('timestamp converters', () => {
  it('converts epoch seconds into detailed result', () => {
    const result = epochToDate(1609459200, false);

    expect(result.epoch).toBe(1609459200000);
    expect(result.iso).toBe('2021-01-01T00:00:00.000Z');
    expect(result.utc).toBe('Fri, 01 Jan 2021 00:00:00 GMT');
    expect(result.date.getTime()).toBe(1609459200000);
    expect(typeof result.local).toBe('string');
    expect(result.local.length).toBeGreaterThan(0);
  });

  it('converts epoch milliseconds without explicit flag', () => {
    const value = 1609459200000;
    const result = epochToDate(value);

    expect(result.epoch).toBe(value);
    expect(result.date.getTime()).toBe(value);
  });

  it('converts iso date string to epoch in seconds', () => {
    expect(dateToEpoch('2021-01-01T00:00:00Z', false)).toBe(1609459200);
  });

  it('throws on invalid date strings', () => {
    expect(() => dateToEpoch('not-a-date')).toThrow('Invalid date format');
  });

  it('reads current timestamp using mocked Date.now', () => {
    const spy = vi.spyOn(Date, 'now').mockReturnValue(5000);
    expect(getCurrentTimestamp(true)).toBe(5000);
    expect(getCurrentTimestamp(false)).toBe(5);
    spy.mockRestore();
  });

  it('validates timestamp boundaries', () => {
    expect(isValidTimestamp(0)).toBe(true);
    expect(isValidTimestamp(4102444800001)).toBe(false);
    expect(isValidTimestamp(Number.NaN)).toBe(false);
    expect(isValidTimestamp(Infinity)).toBe(false);
    expect(isValidTimestamp(4102444800)).toBe(true);
  });
});
