export default function ContactPage() {
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hello@devhub.dev',
      link: 'mailto:hello@devhub.dev',
    },
    {
      icon: '💼',
      title: 'GitHub',
      value: '@devlikebear',
      link: 'https://github.com/devlikebear',
    },
    {
      icon: '💬',
      title: 'Twitter',
      value: '@devhub',
      link: 'https://twitter.com/devhub',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            문의하기
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            DevHub에 대한 의견이나 제안이 있으신가요?
            <br />
            언제든지 연락주세요!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-600 transition-all group text-center"
            >
              <div className="text-4xl mb-4">{method.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {method.title}
              </h3>
              <p className="text-gray-400 group-hover:text-blue-400 transition-colors">
                {method.value}
              </p>
            </a>
          ))}
        </div>

        {/* GitHub Issues Section */}
        <section className="mb-16">
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              🐛 버그 리포트 & 기능 제안
            </h2>
            <p className="text-gray-300 mb-6">
              버그를 발견하셨거나 새로운 유틸리티 도구를 제안하고 싶으신가요?
              GitHub Issues를 통해 알려주세요!
            </p>
            <a
              href="https://github.com/devlikebear/devhub/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub Issues 열기
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Q. 모든 도구가 무료인가요?
              </h3>
              <p className="text-gray-400">
                A. 네, DevHub의 모든 유틸리티 도구는 완전히 무료이며 광고도 없습니다.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Q. 데이터가 서버로 전송되나요?
              </h3>
              <p className="text-gray-400">
                A. 아니요. 모든 변환 작업은 브라우저에서 처리되며, 데이터가 서버로 전송되지 않습니다.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Q. 새로운 도구를 제안할 수 있나요?
              </h3>
              <p className="text-gray-400">
                A. 물론입니다! GitHub Issues를 통해 새로운 유틸리티 도구를 제안해주세요.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Q. 오픈소스인가요?
              </h3>
              <p className="text-gray-400">
                A. 네, DevHub는 오픈소스 프로젝트입니다. GitHub에서 소스 코드를 확인하고 기여할 수 있습니다.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
