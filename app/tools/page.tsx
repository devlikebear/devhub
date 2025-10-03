import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'converter' | 'formatter' | 'generator' | 'tester';
  status: 'available' | 'coming-soon';
}

const tools: Tool[] = [
  {
    id: 'timestamp',
    name: 'Timestamp Converter',
    description: 'Epoch 타임스탬프와 날짜/시간 간 변환',
    icon: '🕐',
    category: 'converter',
    status: 'available',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: '문자열을 Base64로 인코딩/디코딩',
    icon: '🔤',
    category: 'converter',
    status: 'available',
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    description: 'JSON 포맷팅, 검증, 압축',
    icon: '📋',
    category: 'formatter',
    status: 'available',
  },
  {
    id: 'color',
    name: 'Color Tool',
    description: 'HEX ↔ RGB ↔ HSL 변환 및 팔레트 생성',
    icon: '🎨',
    category: 'converter',
    status: 'available',
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    description: 'UUID v4 생성기',
    icon: '🔑',
    category: 'generator',
    status: 'available',
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'MD5, SHA-1, SHA-256 해시 생성',
    icon: '🔐',
    category: 'generator',
    status: 'available',
  },
  {
    id: 'regex',
    name: 'Regex Tester',
    description: '정규표현식 테스트 및 매칭 결과',
    icon: '🔍',
    category: 'tester',
    status: 'available',
  },
  {
    id: 'markdown',
    name: 'Markdown Preview',
    description: '실시간 마크다운 미리보기',
    icon: '📝',
    category: 'formatter',
    status: 'available',
  },
  {
    id: 'url',
    name: 'URL Encoder/Decoder',
    description: 'URL 인코딩/디코딩',
    icon: '🔗',
    category: 'converter',
    status: 'available',
  },
  {
    id: 'jwt',
    name: 'JWT Decoder',
    description: 'JWT 토큰 디코딩 및 검증',
    icon: '🎫',
    category: 'tester',
    status: 'available',
  },
];

const categoryNames = {
  converter: '변환 도구',
  formatter: '포맷팅',
  generator: '생성기',
  tester: '테스터',
};

export default function ToolsPage() {
  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            개발자 유틸리티 도구
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            생산성 향상을 위한 다양한 온라인 도구를 무료로 이용하세요
          </p>
        </div>

        {/* Tools Grid by Category */}
        {categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {categoryNames[category]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools
                .filter(tool => tool.category === category)
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
          </section>
        ))}

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-blue-600/20 border border-blue-600/50 rounded-lg px-6 py-4">
            <p className="text-blue-400">
              💡 더 많은 도구가 곧 추가될 예정입니다!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const card = (
    <div className="relative p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all group">
      {tool.status === 'coming-soon' && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
          준비중
        </div>
      )}

      <div className="text-4xl mb-4">{tool.icon}</div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {tool.name}
      </h3>

      <p className="text-gray-400 text-sm">
        {tool.description}
      </p>
    </div>
  );

  if (tool.status === 'available') {
    return (
      <Link href={`/tools/${tool.id}`}>
        {card}
      </Link>
    );
  }

  return card;
}
