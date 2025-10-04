import { describe, expect, it } from 'vitest';
import {
  analyzeJSON,
  formatJSON,
  minifyJSON,
  validateJSON,
} from './json';

describe('json converters', () => {
  const valid = '{"foo": 1, "bar": {"baz": [1, 2]}}';

  it('validates well-formed JSON', () => {
    expect(validateJSON(valid)).toEqual({ isValid: true });
  });

  it('reports errors for invalid JSON', () => {
    const invalid = '{\n  "foo":\n}';
    const result = validateJSON(invalid);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Unexpected token');
    if (result.errorLine !== undefined) {
      expect(result.errorLine).toBeGreaterThan(0);
    }
    if (result.errorColumn !== undefined) {
      expect(result.errorColumn).toBeGreaterThan(0);
    }
  });

  it('fails validation for empty strings', () => {
    expect(validateJSON('')).toEqual({
      isValid: false,
      error: 'JSON 문자열이 비어있습니다',
    });
  });

  it('pretty prints JSON', () => {
    const formatted = formatJSON(valid, 2);

    expect(formatted).toBe('{' + '\n' + '  "foo": 1,' + '\n' + '  "bar": {' + '\n' + '    "baz": [' + '\n' + '      1,' + '\n' + '      2' + '\n' + '    ]' + '\n' + '  }' + '\n' + '}');
  });

  it('minifies JSON', () => {
    const minified = minifyJSON(valid);
    expect(minified).toBe('{"foo":1,"bar":{"baz":[1,2]}}');
  });

  it('analyzes JSON structure', () => {
    const analysis = analyzeJSON(valid);
    expect(analysis.type).toBe('object');
    expect(analysis.keys).toBe(5);
    expect(analysis.depth).toBe(4);
  });
});
