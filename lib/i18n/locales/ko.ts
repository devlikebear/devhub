export const ko = {
  common: {
    language: {
      label: '언어',
      english: '영어',
      korean: '한국어',
    },
    buttons: {
      viewTools: '도구 둘러보기',
      viewGithub: 'GitHub에서 보기',
      learnMore: '자세히 보기',
    },
  },
  navbar: {
    home: '홈',
    about: '소개',
    tools: '도구',
    contact: '문의',
  },
  footer: {
    title: 'DevHub',
    description: '개발자를 위한 포트폴리오 & 블로그 플랫폼',
    quickLinksTitle: '바로가기',
    connectTitle: 'Connect',
    rights: '© {{year}} DevHub. Next.js & Cloudflare Pages로 제작되었습니다.',
    links: [
      { href: '/', label: '홈' },
      { href: '/about', label: '소개' },
      { href: '/tools', label: '도구' },
      { href: '/contact', label: '문의' },
    ],
  },
  home: {
    heroTitle: 'DevHub',
    heroSubtitle: '개발자 생산성을 위한 온라인 유틸리티 도구 모음',
    heroCtas: {
      tools: '도구 둘러보기',
      github: 'GitHub에서 보기',
    },
    features: [
      {
        title: '🛠️ 실용적 도구',
        description: '타임스탬프, Base64, JSON 등 10+ 개발 유틸리티',
      },
      {
        title: '🔒 프라이버시 우선',
        description: '모든 변환은 브라우저에서 처리되어 서버 전송 없음',
      },
      {
        title: '⚡ 빠르고 무료',
        description: '광고 없이 즉시 사용 가능한 온라인 도구',
      },
    ],
  },
  about: {
    heroTitle: 'DevHub에 대하여',
    heroSubtitle: '개발자 생산성을 높이는 무료 온라인 유틸리티 도구 모음',
    mission: {
      title: '🎯 우리의 미션',
      paragraphs: [
        'DevHub는 개발자들이 일상적으로 필요로 하는 다양한 변환, 포맷팅, 검증 도구를 한 곳에서 빠르고 쉽게 사용할 수 있도록 만들어졌습니다.',
        '모든 도구는 브라우저에서 직접 실행되어 데이터가 서버로 전송되지 않으며, 완전히 무료로 광고 없이 제공됩니다.',
      ],
    },
    featuresTitle: '✨ 주요 특징',
    features: [
      {
        title: '🔒 프라이버시 우선',
        description: '모든 변환 작업은 클라이언트에서 처리되어 데이터가 서버로 전송되지 않습니다.',
      },
      {
        title: '⚡ 빠른 성능',
        description: 'Next.js와 Cloudflare Pages를 통해 전 세계 어디서나 빠른 로딩 속도를 제공합니다.',
      },
      {
        title: '🆓 완전 무료',
        description: '광고 없이 모든 도구를 무료로 사용할 수 있으며, 오픈소스로 공개되어 있습니다.',
      },
      {
        title: '📱 반응형 디자인',
        description: '모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 사용 경험을 제공합니다.',
      },
    ],
    techStack: {
      title: '🛠️ 기술 스택',
      columns: [
        {
          title: 'Frontend',
          items: ['Next.js 15', 'TypeScript', 'Tailwind CSS 4'],
        },
        {
          title: 'Infrastructure',
          items: ['Cloudflare Pages', 'Edge Network CDN', 'Auto SSL'],
        },
        {
          title: 'Development',
          items: ['Git & GitHub', 'ESLint', 'npm'],
        },
      ],
    },
    openSource: {
      title: '🤝 오픈소스',
      description: 'DevHub는 오픈소스 프로젝트입니다. GitHub에서 소스 코드를 확인하고 기여할 수 있습니다.',
      button: 'GitHub에서 보기',
    },
  },
  contact: {
    heroTitle: '문의하기',
    heroSubtitle: 'DevHub에 대한 의견이나 제안이 있으신가요? 언제든지 연락주세요!',
    methods: [
      {
        icon: '📧',
        title: '이메일',
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
    ],
    issues: {
      title: '🐛 버그 리포트 & 기능 제안',
      description:
        '버그를 발견하셨거나 새로운 유틸리티 도구를 제안하고 싶으신가요? GitHub Issues를 통해 알려주세요!',
      button: 'GitHub Issues 열기',
    },
    faqTitle: '자주 묻는 질문',
    faq: [
      {
        question: '모든 도구가 무료인가요?',
        answer: '네, DevHub의 모든 유틸리티 도구는 완전히 무료이며 광고도 없습니다.',
      },
      {
        question: '데이터가 서버로 전송되나요?',
        answer: '아니요. 모든 변환 작업은 브라우저에서 처리되며, 데이터가 서버로 전송되지 않습니다.',
      },
      {
        question: '새로운 도구를 제안할 수 있나요?',
        answer: '물론입니다! GitHub Issues를 통해 새로운 유틸리티 도구를 제안해주세요.',
      },
      {
        question: '오픈소스인가요?',
        answer: '네, DevHub는 오픈소스 프로젝트입니다. GitHub에서 소스 코드를 확인하고 기여할 수 있습니다.',
      },
    ],
  },
  toolsPage: {
    heroTitle: '개발자 유틸리티 도구',
    heroSubtitle: '생산성 향상을 위한 다양한 온라인 도구를 무료로 이용하세요',
    categories: {
      converter: '변환 도구',
      formatter: '포맷팅',
      generator: '생성기',
      tester: '테스터',
    },
    comingSoonNotice: '💡 더 많은 도구가 곧 추가될 예정입니다!',
    badges: {
      comingSoon: '준비중',
    },
    items: [
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
    ],
  },
};

export type KoreanDictionary = typeof ko;
