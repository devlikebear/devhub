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
      clear: '초기화',
      copy: '복사',
      swap: '입력 ↔ 출력 교체',
    },
    messages: {
      copySuccess: '복사되었습니다!',
      copyError: '복사 실패',
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
  tools: {
    base64: {
      title: 'Base64 Encoder/Decoder',
      subtitle: '문자열 ↔ Base64 인코딩/디코딩',
      modes: {
        encode: '인코딩 (Text → Base64)',
        decode: '디코딩 (Base64 → Text)',
      },
      labels: {
        inputEncode: '원본 텍스트',
        inputDecode: 'Base64 문자열',
        outputEncode: 'Base64 결과',
        outputDecode: '디코딩 결과',
        size: '크기',
      },
      placeholders: {
        encode: '인코딩할 텍스트를 입력하세요...',
        decode: '디코딩할 Base64 문자열을 입력하세요...',
      },
      error: '변환 중 오류가 발생했습니다',
    },
    color: {
      title: 'Color Tool',
      subtitle: 'HEX ↔ RGB ↔ HSL 변환 및 팔레트 생성',
      inputLabel: '색상 입력',
      placeholder: '#3b82f6 또는 rgb(59, 130, 246)',
      hint: 'HEX, RGB, HSL 형식 지원',
      previewLabel: '미리보기',
      errorInvalid: '유효하지 않은 색상 형식입니다',
      formatSectionTitle: '색상 형식',
      formatLabels: {
        hex: 'HEX',
        rgb: 'RGB',
        hsl: 'HSL',
      },
      complementaryTitle: '보색 (Complementary)',
      analogousTitle: '유사색 (Analogous)',
      triadicTitle: '3색 조화 (Triadic)',
      shadesTitle: '명도 단계 (Shades)',
      originalLabel: '원본',
      complementaryLabel: '보색',
      analogousLabel: ['유사색 1', '유사색 2', '원본'],
      triadicLabel: ['원본', '조화 2', '조화 3'],
      shadeLabel: ['명도 1', '명도 2', '명도 3', '명도 4', '명도 5'],
    },
    timestamp: {
      title: 'Timestamp Converter',
      subtitle: 'Epoch 타임스탬프 ↔ 날짜/시간 변환',
      epochLabel: 'Epoch Timestamp',
      epochPlaceholder: '1609459200000',
      epochHint: '초 또는 밀리초 단위 (자동 감지)',
      dateLabel: '날짜/시간',
      datePlaceholder: '2021-01-01T00:00:00Z',
      dateHint: 'ISO 8601 또는 파싱 가능한 형식',
      nowButton: '현재 시간',
      resultTitle: '변환 결과',
      rows: {
        epochMs: 'Epoch (밀리초)',
        epochSec: 'Epoch (초)',
        iso: 'ISO 8601',
        local: '로컬 시간 (한국)',
        utc: 'UTC',
      },
      copyLabels: {
        epoch: 'Epoch',
        epochSec: 'Epoch (초)',
        iso: 'ISO 8601',
        local: '로컬 시간',
        utc: 'UTC',
      },
      errors: {
        invalidTimestamp: '유효하지 않은 타임스탬프입니다',
        invalidDate: '유효하지 않은 날짜 형식입니다',
        generic: '변환 중 오류가 발생했습니다',
      },
    },
    url: {
      title: 'URL Encoder / Decoder',
      subtitle: 'URL 전체 또는 특정 파라미터를 안전하게 인코딩/디코딩하세요',
      mode: {
        encode: '인코딩',
        decode: '디코딩',
      },
      target: {
        full: '전체 URL',
        component: '쿼리 파라미터',
      },
      infoLabels: {
        mode: '모드',
        target: '대상',
      },
      placeholder: {
        encode: '인코딩할 URL 또는 파라미터를 입력하세요',
        decode: '디코딩할 문자열을 입력하세요',
      },
      reservedTitle: '예약 문자',
      reservedDescription:
        '쿼리 파라미터 모드에서는 모든 예약 문자가 퍼센트 인코딩됩니다.',
      encodeHint:
        '• 전체 URL 모드에서는 encodeURI를 사용하여 경로 구분자(`/`, `:` 등)를 유지합니다.\n• 쿼리 파라미터 모드에서는 encodeURIComponent를 사용해 모든 예약 문자를 퍼센트 인코딩합니다.',
      safetyWarning: '⚠️ 디코딩 결과에 안전하지 않은 프로토콜이 포함되어 있을 수 있습니다.',
      resultTitle: '결과',
      errors: {
        generic: '변환 중 오류가 발생했습니다',
      },
    },
    json: {
      title: 'JSON Formatter',
      subtitle: 'JSON 포맷팅, 검증, 압축',
      buttons: {
        format: '포맷팅',
        minify: '압축',
        sample: '샘플 JSON',
        clear: '초기화',
      },
      indentLabel: '들여쓰기',
      indentOptions: {
        two: '2 spaces',
        four: '4 spaces',
        tab: 'Tab',
      },
      input: {
        label: '입력',
        placeholder: '{"key": "value"}',
        errorTitle: '⚠️ JSON 오류',
        validMessage: '✓ 유효한 JSON입니다',
        analysis: {
          summary: '타입: {{type}} | 키: {{keys}} | 깊이: {{depth}}',
        },
        lineColumn: '위치: 줄 {{line}}, 열 {{column}}',
      },
      output: {
        label: '결과',
        placeholder: '포맷팅 또는 압축 버튼을 클릭하세요',
      },
      guide: {
        title: '사용 가이드',
        items: [
          '• 포맷팅: JSON을 읽기 쉽게 들여쓰기와 줄바꿈 추가',
          '• 압축: 불필요한 공백을 제거하여 최소 크기로 압축',
          '• 실시간 검증: 입력 즉시 JSON 유효성 검사',
          '• 에러 위치: 오류 발생 시 정확한 줄과 열 번호 표시',
          '• 분석 정보: 타입, 키 개수, 깊이 등 JSON 구조 분석',
          '• 프라이버시: 모든 처리는 브라우저에서 진행, 서버 전송 없음',
        ],
        keyboardTitle: '키보드 단축키',
        shortcuts: {
          format: '• Ctrl/Cmd + Enter: 포맷팅',
          minify: '• Ctrl/Cmd + M: 압축',
        },
      },
      errors: {
        generic: 'JSON 처리 중 오류가 발생했습니다',
      },
      sample: `{
  "name": "DevHub",
  "version": "1.0.0",
  "tools": [
    { "id": "timestamp", "name": "타임스탬프 변환기", "category": "변환" },
    { "id": "base64", "name": "Base64 인코더/디코더", "category": "변환" }
  ],
  "features": {
    "privacy": true,
    "free": true,
    "responsive": true
  }
}`,
    },
    markdown: {
      title: 'Markdown Preview',
      subtitle: '입력과 동시에 HTML 결과를 확인하며 마크다운 문서를 작성하세요',
      inputTitle: '마크다운 입력',
      previewTitle: '라이브 미리보기',
      buttons: {
        loadSample: '샘플 불러오기',
        clear: '지우기',
        copyMarkdown: '마크다운 복사',
        copyHtml: 'HTML 복사',
      },
      placeholder: '# 여기에 마크다운을 입력하세요',
      emptyPreview: '미리볼 내용이 없습니다. 왼쪽 영역에 마크다운을 입력해보세요.',
      copySuccess: '{{type}}을(를) 복사했습니다',
      copyError: '클립보드 복사에 실패했습니다',
      guide: {
        title: '사용 가이드',
        items: [
          '• 입력한 텍스트는 브라우저에서만 처리되며 서버로 전송되지 않습니다.',
          '• 기본적인 제목, 리스트, 코드 블록, 링크, 이미지, 인용구 등을 지원합니다.',
          '• HTML 복사를 통해 블로그나 문서 편집기에 바로 붙여넣을 수 있습니다.',
          '• 이미지 URL은 안전하지 않은 프로토콜이 포함되면 자동으로 차단됩니다.',
        ],
      },
      sample: `# DevHub Markdown Preview

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

DevHub에서 빠르게 마크다운 초안을 작성해보세요!`,
    },
  },
};

export type KoreanDictionary = typeof ko;
