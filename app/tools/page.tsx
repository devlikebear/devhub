'use client';

import Link from 'next/link';
import { useI18n } from '@/components/i18n/I18nProvider';
import { useState, useEffect, useMemo } from 'react';

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
  search: {
    placeholder: string;
    noResults: string;
    noResultsHint: string;
    resultsCount: string;
  };
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
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard shortcut: Focus search on "/" key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('tool-search')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) {
      return toolsPage.items;
    }

    const query = searchQuery.toLowerCase();
    return toolsPage.items.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.id.toLowerCase().includes(query)
    );
  }, [searchQuery, toolsPage.items]);

  const categories = Array.from(
    new Set<ToolCategory>(filteredTools.map((tool) => tool.category))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {toolsPage.heroTitle}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {toolsPage.heroSubtitle}
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                id="tool-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={toolsPage.search.placeholder}
                className="w-full px-5 py-4 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none placeholder-gray-500 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Results Count */}
            {searchQuery && filteredTools.length > 0 && (
              <p className="text-sm text-gray-400 mt-3">
                {toolsPage.search.resultsCount.replace('{{count}}', String(filteredTools.length))}
              </p>
            )}
          </div>
        </div>

        {/* No Results */}
        {searchQuery && filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">{toolsPage.search.noResults}</h2>
            <p className="text-gray-400">{toolsPage.search.noResultsHint}</p>
          </div>
        )}

        {/* Tool Categories */}
        {filteredTools.length > 0 && categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {toolsPage.categories[category]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    comingSoonLabel={toolsPage.badges.comingSoon}
                    searchQuery={searchQuery}
                  />
                ))}
            </div>
          </section>
        ))}

        {!searchQuery && (
          <div className="mt-16 text-center">
            <div className="inline-block bg-blue-600/20 border border-blue-600/50 rounded-lg px-6 py-4">
              <p className="text-blue-400">{toolsPage.comingSoonNotice}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ToolCard({
  tool,
  comingSoonLabel,
  searchQuery,
}: {
  tool: ToolItem;
  comingSoonLabel: string;
  searchQuery: string;
}) {
  // Highlight search term in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="bg-blue-600/30 text-blue-300 rounded px-1">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const card = (
    <div className="relative p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all group">
      {tool.status === 'comingSoon' && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
          {comingSoonLabel}
        </div>
      )}

      <div className="text-4xl mb-4">{tool.icon}</div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {highlightText(tool.name, searchQuery)}
      </h3>

      <p className="text-gray-400 text-sm">{highlightText(tool.description, searchQuery)}</p>
    </div>
  );

  if (tool.status === 'available') {
    return <Link href={`/tools/${tool.id}`}>{card}</Link>;
  }

  return card;
}
