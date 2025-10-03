'use client';

import { useTranslation, useI18n } from '@/components/i18n/I18nProvider';

export default function Home() {
  const tHome = useTranslation('home');
  const tButtons = useTranslation('common.buttons');
  const { dictionary } = useI18n();
  const features = dictionary.home.features;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight">
          {tHome('heroTitle')}
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          {tHome('heroSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="/tools"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            {tButtons('viewTools')}
          </a>
          <a
            href="https://github.com/devlikebear/devhub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            {tButtons('viewGithub')}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
