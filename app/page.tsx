'use client';

import { useTranslation, useI18n } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton } from '@/components/ui/glass';

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
          <a href="/tools">
            <GlassButton variant="primary" className="px-8 py-4 w-full sm:w-auto">
              {tButtons('viewTools')}
            </GlassButton>
          </a>
          <a
            href="https://github.com/devlikebear/devhub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlassButton variant="secondary" className="px-8 py-4 w-full sm:w-auto">
              {tButtons('viewGithub')}
            </GlassButton>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          {features.map((feature, index) => (
            <GlassCard
              key={feature.title}
              className="p-6 hover:bg-gradient-to-br hover:from-blue-500/5 hover:to-purple-500/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
}
