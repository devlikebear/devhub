'use client';

import { useMemo, useState } from 'react';
import { markdownToHtml } from '@/lib/formatters/markdown';

const SAMPLE_MARKDOWN = `# DevHub Markdown Preview

실시간으로 작성 중인 마크다운을 확인해보세요.

## 지원되는 문법
- **굵게** 및 *기울임*
- ~~취소선~~
- 중첩 리스트 예시
- [링크](https://devhub.marvin-42.com) 와 ![이미지](https://placehold.co/80x40)

> 인용구는 이렇게 표시됩니다.

\`\`\`
def greet(name):
    return f"Hello, {name}!"

greet('DevHub')
\`\`\`

---

DevHub에서 빠르게 마크다운 초안을 작성해보세요!`;

export default function MarkdownPreviewPage() {
  const [input, setInput] = useState(SAMPLE_MARKDOWN);
  const [copyMessage, setCopyMessage] = useState('');

  const html = useMemo(() => {
    if (!input.trim()) {
      return '<p class="text-gray-400">미리볼 내용이 없습니다. 왼쪽 영역에 마크다운을 입력해보세요.</p>';
    }
    return markdownToHtml(input);
  }, [input]);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label}을(를) 복사했습니다`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('클립보드 복사에 실패했습니다');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Markdown Preview</h1>
          <p className="text-xl text-gray-300">
            입력과 동시에 HTML 결과를 확인하며 마크다운 문서를 작성하세요
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">마크다운 입력</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setInput(SAMPLE_MARKDOWN)}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm transition-colors"
                >
                  샘플 불러오기
                </button>
                <button
                  onClick={() => setInput('')}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm transition-colors"
                >
                  지우기
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="# 여기에 마크다운을 입력하세요"
              className="flex-1 w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none font-mono"
              rows={16}
            />
            <div className="flex flex-wrap gap-2 mt-4 text-sm">
              <button
                onClick={() => handleCopy(input, '마크다운')}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                마크다운 복사
              </button>
              <button
                onClick={() => handleCopy(html, 'HTML')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                HTML 복사
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">라이브 미리보기</h2>
            </div>
            <div
              className="markdown-preview bg-gray-900/60 rounded-lg border border-gray-800 px-5 py-6 overflow-auto max-h-[650px]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </section>

        {copyMessage && (
          <div className="mb-8 p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400 text-sm">
            ✓ {copyMessage}
          </div>
        )}

        <section className="p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">사용 가이드</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• 입력한 텍스트는 브라우저에서만 처리되며 서버로 전송되지 않습니다.</li>
            <li>• 기본적인 제목, 리스트, 코드 블록, 링크, 이미지, 인용구 등을 지원합니다.</li>
            <li>• HTML 복사를 통해 블로그나 문서 편집기에 바로 붙여넣을 수 있습니다.</li>
            <li>• 이미지 URL은 안전하지 않은 프로토콜이 포함되면 자동으로 차단됩니다.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
