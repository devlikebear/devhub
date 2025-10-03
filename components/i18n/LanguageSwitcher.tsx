'use client';

import { useI18n, useTranslation } from '@/components/i18n/I18nProvider';
import type { Locale } from '@/lib/i18n/dictionaries';

const LOCALES: Locale[] = ['ko', 'en'];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const t = useTranslation('common.language');

  const handleChange = (nextLocale: Locale) => {
    setLocale(nextLocale);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{t('label')}</span>
      {LOCALES.map((candidate) => (
        <button
          key={candidate}
          type="button"
          onClick={() => handleChange(candidate)}
          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors border border-transparent ${
            locale === candidate
              ? 'bg-blue-600 text-white border-blue-500'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {candidate === 'ko' ? t('korean') : t('english')}
        </button>
      ))}
    </div>
  );
}
