import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, getDictionary, isLocale, locales } from './dictionaries';
import { getCurrentLocale } from './locale';

describe('i18n helpers', () => {
  it('exposes supported locales including default', () => {
    expect(locales).toEqual(['ko', 'en']);
    expect(DEFAULT_LOCALE).toBe('ko');
    expect(getCurrentLocale()).toBe(DEFAULT_LOCALE);
  });

  it('retrieves dictionaries for each locale', () => {
    const korean = getDictionary('ko');
    const english = getDictionary('en');

    expect(korean.common.language.korean).toBe('한국어');
    expect(english.common.language.english).toBe('English');
  });

  it('validates locale strings', () => {
    expect(isLocale('ko')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('jp')).toBe(false);
    expect(isLocale(null)).toBe(false);
  });
});
