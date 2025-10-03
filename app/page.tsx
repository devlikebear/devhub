export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight">
          DevHub
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          개발자 생산성을 위한 온라인 유틸리티 도구 모음
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="/tools"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            도구 둘러보기
          </a>
          <a
            href="https://github.com/devlikebear/devhub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            GitHub에서 보기
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">🛠️ 실용적 도구</h3>
            <p className="text-gray-400">타임스탬프, Base64, JSON 등 10+ 개발 유틸리티</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">🔒 프라이버시 우선</h3>
            <p className="text-gray-400">모든 변환은 브라우저에서 처리, 서버 전송 없음</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-3">⚡ 빠르고 무료</h3>
            <p className="text-gray-400">광고 없이 즉시 사용 가능한 온라인 도구</p>
          </div>
        </div>
      </main>
    </div>
  );
}
