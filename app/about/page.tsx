import { buildPageMetadata } from "@/lib/seo/meta";

export const metadata = buildPageMetadata({
  title: "DevHub 소개",
  description: "DevHub의 미션과 주요 특징, 기술 스택을 확인하세요.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            DevHub에 대하여
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            개발자 생산성을 높이는 무료 온라인 유틸리티 도구 모음
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 우리의 미션</h2>
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-8">
            <p className="text-gray-300 leading-relaxed mb-4">
              DevHub는 개발자들이 일상적으로 필요로 하는 다양한 변환, 포맷팅, 검증 도구를 한곳에서 빠르고 쉽게 사용할 수 있도록 만들어졌습니다.
            </p>
            <p className="text-gray-300 leading-relaxed">
              모든 도구는 브라우저에서 직접 실행되어 데이터가 서버로 전송되지 않으며, 완전히 무료로 광고 없이 제공됩니다.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">✨ 주요 특징</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">🔒 프라이버시 우선</h3>
              <p className="text-gray-400 text-sm">
                모든 변환 작업은 클라이언트 사이드에서 처리되어 데이터가 서버로 전송되지 않습니다.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">⚡ 빠른 성능</h3>
              <p className="text-gray-400 text-sm">
                Next.js와 Cloudflare Pages를 통해 전 세계 어디서나 빠른 로딩 속도를 제공합니다.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">🆓 완전 무료</h3>
              <p className="text-gray-400 text-sm">
                광고 없이 모든 도구를 무료로 사용할 수 있으며, 오픈소스로 공개되어 있습니다.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">📱 반응형 디자인</h3>
              <p className="text-gray-400 text-sm">
                모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 사용 경험을 제공합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">🛠️ 기술 스택</h2>
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-3">Frontend</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Next.js 15</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS 4</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Infrastructure</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Cloudflare Pages</li>
                  <li>• Edge Network CDN</li>
                  <li>• Auto SSL</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Development</h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Git & GitHub</li>
                  <li>• ESLint</li>
                  <li>• npm</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Open Source Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🤝 오픈소스</h2>
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-8 text-center">
            <p className="text-gray-300 mb-6">
              DevHub는 오픈소스 프로젝트입니다. GitHub에서 소스 코드를 확인하고 기여할 수 있습니다.
            </p>
            <a
              href="https://github.com/devlikebear/devhub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub에서 보기
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
