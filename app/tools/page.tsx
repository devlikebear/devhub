'use client';

import Link from 'next/link';
import { useI18n } from '@/components/i18n/I18nProvider';

type ToolCategory = 'converter' | 'formatter' | 'generator' | 'tester';

type ToolStatus = 'available' | 'comingSoon';

type ToolItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  status: ToolStatus;
};

type ToolsDictionary = {
  heroTitle: string;
  heroSubtitle: string;
  categories: Record<ToolCategory, string>;
  comingSoonNotice: string;
  badges: {
    comingSoon: string;
  };
  items: ToolItem[];
};

export default function ToolsPage() {
  const { dictionary } = useI18n();
  const toolsPage = dictionary.toolsPage as ToolsDictionary;

  const categories = Array.from(
    new Set<ToolCategory>(toolsPage.items.map((tool) => tool.category))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {toolsPage.heroTitle}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {toolsPage.heroSubtitle}
          </p>
        </div>

        {categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {toolsPage.categories[category]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsPage.items
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} comingSoonLabel={toolsPage.badges.comingSoon} />
                ))}
            </div>
          </section>
        ))}

        <div className="mt-16 text-center">
          <div className="inline-block bg-blue-600/20 border border-blue-600/50 rounded-lg px-6 py-4">
            <p className="text-blue-400">{toolsPage.comingSoonNotice}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ToolCard({
  tool,
  comingSoonLabel,
}: {
  tool: ToolItem;
  comingSoonLabel: string;
}) {
  const card = (
    <div className="relative p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all group">
      {tool.status === 'comingSoon' && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
          {comingSoonLabel}
        </div>
      )}

      <div className="text-4xl mb-4">{tool.icon}</div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {tool.name}
      </h3>

      <p className="text-gray-400 text-sm">{tool.description}</p>
    </div>
  );

  if (tool.status === 'available') {
    return <Link href={`/tools/${tool.id}`}>{card}</Link>;
  }

  return card;
}
