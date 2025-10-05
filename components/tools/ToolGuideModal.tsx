'use client';

import { useState } from 'react';
import { toolGuides, type ToolGuide } from '@/lib/constants/tool-guides';

interface ToolGuideModalProps {
  toolId: string;
}

export default function ToolGuideModal({ toolId }: ToolGuideModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'examples' | 'faq'>('guide');

  const guide: ToolGuide | undefined = toolGuides[toolId];

  if (!guide) return null;

  return (
    <>
      {/* 도움말 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20
                   text-blue-400 rounded-lg transition-colors border border-blue-600/20"
        aria-label="사용 가이드 보기"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>사용 가이드</span>
      </button>

      {/* 모달 */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-4xl max-h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    📖 사용 가이드
                  </h2>
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

                {/* Tabs */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setActiveTab('guide')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'guide'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    사용법
                  </button>
                  <button
                    onClick={() => setActiveTab('examples')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'examples'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    예제
                  </button>
                  <button
                    onClick={() => setActiveTab('faq')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'faq'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    FAQ
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    {guide.sections.map((section, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {section.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    ))}

                    {guide.tips.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          💡 유용한 팁
                        </h3>
                        <ul className="space-y-2">
                          {guide.tips.map((tip, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                            >
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'examples' && (
                  <div className="space-y-4">
                    {guide.examples.map((example, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {example.title}
                        </h4>
                        {example.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {example.description}
                          </p>
                        )}
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              입력:
                            </div>
                            <code className="block p-2 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 text-sm font-mono text-gray-800 dark:text-gray-200">
                              {example.input}
                            </code>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              출력:
                            </div>
                            <code className="block p-2 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 text-sm font-mono text-gray-800 dark:text-gray-200">
                              {example.output}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    {guide.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Q. {faq.question}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          A. {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    문제가 있나요? GitHub Issues에 피드백을 남겨주세요
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
                             text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
