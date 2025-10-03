'use client';

import { useI18n } from '@/components/i18n/I18nProvider';
import { GlassCard, GlassButton } from '@/components/ui/glass';

export default function ContactPage() {
  const { dictionary } = useI18n();
  const contact = dictionary.contact;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{contact.heroTitle}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{contact.heroSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contact.methods.map((method) => (
            <a
              key={method.title}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard className="p-6 text-center hover:border-blue-400/50 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{method.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">{method.value}</p>
              </GlassCard>
            </a>
          ))}
        </div>

        <section className="mb-16">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{contact.issues.title}</h2>
            <p className="text-gray-300 mb-6">{contact.issues.description}</p>
            <a
              href="https://github.com/devlikebear/devhub/issues"
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
              {contact.issues.button}
              </GlassButton>
            </a>
          </GlassCard>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">{contact.faqTitle}</h2>
          <div className="space-y-4">
            {contact.faq.map((item) => (
              <GlassCard key={item.question} className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.question}</h3>
                <p className="text-gray-400">{item.answer}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
