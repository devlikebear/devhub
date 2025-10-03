'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/components/i18n/I18nProvider';

interface ClientProvidersProps {
  children: ReactNode;
  locale: string;
  dictionary: any;
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
