'use client';

import Link from 'next/link';
import { useI18n } from '@/components/i18n/I18nProvider';
import { useTools } from '@/components/tools/ToolsProvider';
import { useState, useEffect, useMemo } from 'react';
import { GlassCard, GlassInput } from '@/components/ui/glass';

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
  const { favorites, recentTools } = useTools();
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

  // Get favorite and recent tools data
  const favoriteTools = useMemo(() => {
    return toolsPage.items.filter((tool) => favorites.includes(tool.id) && tool.status === 'available');
  }, [favorites, toolsPage.items]);

  const recentToolsData = useMemo(() => {
    return recentTools
      .map((id) => toolsPage.items.find((tool) => tool.id === id && tool.status === 'available'))
      .filter((tool): tool is ToolItem => tool !== undefined);
  }, [recentTools, toolsPage.items]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {toolsPage.heroTitle}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {toolsPage.heroSubtitle}
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <GlassInput
                id="tool-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={toolsPage.search.placeholder}
                className="text-lg py-4"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Results Count */}
            {searchQuery && filteredTools.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                {toolsPage.search.resultsCount.replace('{{count}}', String(filteredTools.length))}
              </p>
            )}
          </div>
        </div>

        {/* No Results */}
        {searchQuery && filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{toolsPage.search.noResults}</h2>
            <p className="text-gray-600 dark:text-gray-400">{toolsPage.search.noResultsHint}</p>
          </div>
        )}

        {/* Recent Tools */}
        {!searchQuery && recentToolsData.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              ⏱️ 최근 사용한 도구
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentToolsData.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  comingSoonLabel={toolsPage.badges.comingSoon}
                  searchQuery=""
                  showFavorite={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Favorite Tools */}
        {!searchQuery && favoriteTools.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              ⭐ 즐겨찾기
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  comingSoonLabel={toolsPage.badges.comingSoon}
                  searchQuery=""
                  showFavorite={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Tool Categories */}
        {filteredTools.length > 0 && categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
                    showFavorite={true}
                  />
                ))}
            </div>
          </section>
        ))}

        {!searchQuery && (
          <div className="mt-16 text-center">
            <GlassCard hover={false} className="inline-block px-6 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/30">
              <p className="text-blue-300">{toolsPage.comingSoonNotice}</p>
            </GlassCard>
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
  showFavorite = false,
}: {
  tool: ToolItem;
  comingSoonLabel: string;
  searchQuery: string;
  showFavorite?: boolean;
}) {
  const { toggleFavorite, isFavorite: checkIsFavorite } = useTools();
  const isFav = checkIsFavorite(tool.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool.id);
  };
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
    <GlassCard className="relative p-6 group">
      {tool.status === 'comingSoon' && (
        <div className="absolute top-4 right-4 px-2 py-1 backdrop-blur-md bg-white/10 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 text-xs rounded">
          {comingSoonLabel}
        </div>
      )}

      {showFavorite && tool.status === 'available' && (
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 text-2xl hover:scale-125 transition-transform duration-200"
          aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {isFav ? '⭐' : '☆'}
        </button>
      )}

      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300">
        {highlightText(tool.name, searchQuery)}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm">{highlightText(tool.description, searchQuery)}</p>
    </GlassCard>
  );

  if (tool.status === 'available') {
    return <Link href={`/tools/${tool.id}`}>{card}</Link>;
  }

  return card;
}
