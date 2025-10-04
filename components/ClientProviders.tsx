'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { Dictionary, Locale } from '@/lib/i18n/dictionaries';

interface ClientProvidersProps {
  children: ReactNode;
  locale: Locale;
  dictionary: Dictionary;
}

export default function ClientProviders({ children, locale, dictionary }: ClientProvidersProps) {
  return (
    <ThemeProvider>
      <I18nProvider locale={locale} dictionary={dictionary}>
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}
