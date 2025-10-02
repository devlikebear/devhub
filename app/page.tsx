export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight">
          DevHub
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          개발자를 위한 공간
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#projects"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            연락하기
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">⚡ 빠른 성능</h3>
            <p className="text-gray-400">Next.js와 Cloudflare Pages로 최적화된 로딩 속도</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">🎨 모던 디자인</h3>
            <p className="text-gray-400">Tailwind CSS 기반의 깔끔한 UI/UX</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">🚀 쉬운 배포</h3>
            <p className="text-gray-400">Cloudflare Pages로 간편한 무료 호스팅</p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full py-6 text-center text-gray-500 text-sm">
        <p>© 2025 DevHub. Built with Next.js & Cloudflare Pages</p>
      </footer>
    </div>
  );
}
