'use client';

import { useI18n, useTranslation } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton } from '@/components/ui/glass';

export default function AboutPage() {
  const tButtons = useTranslation('common.buttons');
  const { dictionary } = useI18n();
  const about = dictionary.about;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{about.heroTitle}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{about.heroSubtitle}</p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">{about.mission.title}</h2>
          <GlassCard className="p-8">
            {about.mission.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-gray-300 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </GlassCard>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">{about.featuresTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.features.map((feature) => (
              <GlassCard key={feature.title} className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">{about.techStack.title}</h2>
          <GlassCard className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {about.techStack.columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-white font-semibold mb-3">{column.title}</h3>
                  <ul className="text-gray-400 text-sm space-y-2">
                    {column.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">{about.openSource.title}</h2>
          <GlassCard className="p-8 text-center">
            <p className="text-gray-300 mb-6">{about.openSource.description}</p>
            <a
              href="https://github.com/devlikebear/devhub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton variant="primary" className="inline-flex items-center px-6 py-3">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              {tButtons('viewGithub')}
              </GlassButton>
            </a>
          </GlassCard>
        </section>
      </main>
    </div>
  );
}
