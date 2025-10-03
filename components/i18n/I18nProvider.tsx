'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getDictionary, isLocale, type Dictionary, type Locale } from '@/lib/i18n/dictionaries';

type TranslateFn = (key: string, fallback?: string) => string;

type I18nContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  t: TranslateFn;
  setLocale: (nextLocale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getValue<T = unknown>(obj: Record<string, unknown>, key: string): T | undefined {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj) as T | undefined;
}

function readLocaleFromCookie(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  return isLocale(value) ? value : null;
}

function writeLocaleCookie(locale: Locale) {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${maxAge}`;
}

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);
  const [currentDictionary, setCurrentDictionary] = useState<Dictionary>(dictionary);

  const changeLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === currentLocale) return;
      setCurrentLocale(nextLocale);
      setCurrentDictionary(getDictionary(nextLocale));
      writeLocaleCookie(nextLocale);
    },
    [currentLocale]
  );

  useEffect(() => {
    const cookieLocale = readLocaleFromCookie();
    if (cookieLocale && cookieLocale !== currentLocale) {
      setCurrentLocale(cookieLocale);
      setCurrentDictionary(getDictionary(cookieLocale));
    }
  }, [currentLocale]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLocale;
    }
  }, [currentLocale]);

  const contextValue = useMemo<I18nContextValue>(() => {
    const translate: TranslateFn = (key, fallback) => {
      const value = getValue(currentDictionary, key);
      if (value === undefined || value === null) {
        return fallback ?? key;
      }
      if (typeof value === 'string') {
        return value;
      }
      return fallback ?? key;
    };

    return {
      locale: currentLocale,
      dictionary: currentDictionary,
      t: translate,
      setLocale: changeLocale,
    };
  }, [changeLocale, currentDictionary, currentLocale]);

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

type TranslateOptions = {
  replacements?: Record<string, string | number>;
  fallback?: string;
};

export function useTranslation(prefix?: string) {
  const { t } = useI18n();

  return (key: string, options?: TranslateOptions) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = t(fullKey, options?.fallback);

    if (!options?.replacements) {
      return value;
    }

    return Object.entries(options.replacements).reduce((acc, [token, replacement]) => {
      return acc.replace(new RegExp(`{{\s*${token}\s*}}`, 'g'), String(replacement));
    }, value);
  };
}
