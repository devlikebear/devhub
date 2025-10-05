'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useI18n } from '@/components/i18n/I18nProvider';

type ToolItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: string;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { dictionary } = useI18n();

  // Get tools from i18n dictionary
  const tools = useMemo(() => {
    const toolsPage = dictionary.toolsPage as { items: ToolItem[] };
    return toolsPage?.items || [];
  }, [dictionary]);

  // Open/close with Cmd+K or Ctrl+K
  useKeyboardShortcut(
    { key: 'k', ctrl: true },
    () => setIsOpen((prev) => !prev),
    { enabled: true }
  );

  // Close with Escape
  useKeyboardShortcut(
    { key: 'Escape' },
    () => setIsOpen(false),
    { enabled: isOpen }
  );

  // Filter tools based on search
  const filteredTools = useMemo(() => {
    if (!tools.length) return [];

    const searchLower = search.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.status === 'available' &&
        (tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.category.toLowerCase().includes(searchLower))
    );
  }, [tools, search]);

  const handleSelect = useCallback((toolId: string) => {
    router.push(`/tools/${toolId}`);
    setIsOpen(false);
  }, [router]);

  // Navigate with arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredTools.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredTools[selectedIndex]) {
          handleSelect(filteredTools[selectedIndex].id);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredTools, handleSelect]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset search and selection when closed
  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="도구 검색... (Esc로 닫기)"
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
              />
              <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 rounded">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredTools.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                검색 결과가 없습니다
              </div>
            ) : (
              <ul>
                {filteredTools.map((tool, index) => (
                  <li key={tool.id}>
                    <button
                      onClick={() => handleSelect(tool.id)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        index === selectedIndex
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {tool.icon} {tool.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {tool.description}
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                    ↑↓
                  </kbd>{' '}
                  탐색
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                    Enter
                  </kbd>{' '}
                  선택
                </span>
              </div>
              <span>{filteredTools.length}개 도구</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
