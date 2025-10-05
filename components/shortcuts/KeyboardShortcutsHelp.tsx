'use client';

import { useState } from 'react';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

type ShortcutCategory = {
  title: string;
  shortcuts: {
    keys: string;
    description: string;
  }[];
};

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  // Open help with ?
  useKeyboardShortcut(
    { key: '?', shift: true },
    () => setIsOpen(true),
    { enabled: !isOpen }
  );

  // Close with Escape
  useKeyboardShortcut(
    { key: 'Escape' },
    () => setIsOpen(false),
    { enabled: isOpen }
  );

  const shortcuts: ShortcutCategory[] = [
    {
      title: '전역 단축키',
      shortcuts: [
        {
          keys: '⌘K / Ctrl+K',
          description: '도구 검색 열기',
        },
        {
          keys: '?',
          description: '단축키 도움말 (현재 화면)',
        },
        {
          keys: 'Esc',
          description: '모달 닫기',
        },
      ],
    },
    {
      title: 'JSON 포맷터',
      shortcuts: [
        {
          keys: '⌘S / Ctrl+S',
          description: 'JSON 포맷팅',
        },
        {
          keys: '⌘M / Ctrl+M',
          description: 'JSON 압축',
        },
        {
          keys: '⌘L / Ctrl+L',
          description: '전체 지우기',
        },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ⌨️ 키보드 단축키
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  생산성을 높이는 빠른 단축키 모음
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="닫기"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-6">
              {shortcuts.map((category, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {category.title}
                  </h3>
                  <div className="space-y-2">
                    {category.shortcuts.map((shortcut, shortcutIndex) => (
                      <div
                        key={shortcutIndex}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {shortcut.description}
                        </span>
                        <kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                          {shortcut.keys}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                더 많은 단축키가 곧 추가될 예정입니다
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                  Esc
                </kbd>{' '}
                로 닫기
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
