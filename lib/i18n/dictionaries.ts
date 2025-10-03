import { en } from './locales/en';
import { ko } from './locales/ko';

export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof ko;

export const DEFAULT_LOCALE: Locale = 'ko';

const dictionaries: Record<Locale, Dictionary> = {
  ko,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isLocale(value: string | undefined | null): value is Locale {
  if (!value) return false;
  return (locales as ReadonlyArray<string>).includes(value);
}
