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
      share: '공유',
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
    description: '개발자 생산성을 위한 온라인 유틸리티 도구 모음',
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
        value: 'devlikebear@gmail.com',
        link: 'mailto:devlikebear@gmail.com',
      },
      {
        icon: '💼',
        title: 'GitHub',
        value: '@devlikebear',
        link: 'https://github.com/devlikebear',
      },
      {
        icon: '💬',
        title: 'X',
        value: '@slartimark42',
        link: 'https://x.com/slartimark42',
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
    search: {
      placeholder: '도구 검색... (/ 키를 눌러 포커스)',
      noResults: '검색 결과가 없습니다',
      noResultsHint: '다른 검색어를 시도해보세요',
      resultsCount: '{{count}}개의 도구를 찾았습니다',
    },
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
      {
        id: 'diff',
        name: 'Diff Checker',
        description: '텍스트 비교 및 차이점 시각화',
        icon: '🔍',
        category: 'tester',
        status: 'available',
      },
      {
        id: 'qr',
        name: 'QR Code Generator',
        description: 'QR 코드 생성 및 다운로드',
        icon: '📱',
        category: 'generator',
        status: 'available',
      },
      {
        id: 'cron',
        name: 'Cron Expression Helper',
        description: 'Cron 표현식 생성 및 해석',
        icon: '⏰',
        category: 'generator',
        status: 'available',
      },
      {
        id: 'image',
        name: 'Image Converter',
        description: '이미지 포맷 변환 (PNG/JPG/WebP)',
        icon: '🖼️',
        category: 'converter',
        status: 'available',
      },
      {
        id: 'lorem',
        name: 'Lorem Ipsum Generator',
        description: '더미 텍스트 생성',
        icon: '📝',
        category: 'generator',
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
    uuid: {
      title: 'UUID Generator',
      subtitle: 'UUID v4 생성기',
      countLabel: '생성 개수',
      countOptions: {
        one: '1개',
        five: '5개',
        ten: '10개',
        twentyFive: '25개',
        fifty: '50개',
        hundred: '100개',
      },
      uppercaseLabel: '대문자',
      hyphensLabel: '하이픈 포함',
      buttons: {
        generate: '생성',
        clear: '초기화',
        copyAll: '전체 복사',
        copy: '복사',
      },
      messages: {
        copied: '복사됨: {{text}}',
        copyFailed: '복사 실패',
        allCopied: '{{count}}개 UUID 복사됨!',
      },
      resultTitle: '생성된 UUID ({{count}}개)',
      guide: {
        title: '사용 가이드',
        items: [
          '• <strong>UUID</strong>: Universally Unique Identifier, 범용 고유 식별자',
          '• <strong>버전</strong>: 이 도구는 UUID v4 (난수 기반)를 생성합니다',
          '• <strong>UUID v4</strong>: 난수 기반 UUID (충돌 확률 극히 낮음)',
          '• <strong>용도</strong>: 데이터베이스 기본키, 세션 ID, 파일명 등',
          '• <strong>형식</strong>: 8-4-4-4-12 (총 36자, 하이픈 포함)',
          '• <strong>옵션</strong>: 대소문자 변환, 하이픈 포함/제거 선택 가능',
          '• <strong>보안</strong>: Web Crypto API 사용으로 안전한 난수 생성',
          '• <strong>프라이버시</strong>: 모든 생성은 브라우저에서 처리, 서버 전송 없음',
        ],
        examples: {
          title: '예시',
          lowercase: '소문자 + 하이픈:',
          uppercase: '대문자 + 하이픈:',
          noHyphens: '소문자 하이픈 제거:',
        },
      },
    },
    hash: {
      title: 'Hash Generator',
      subtitle: '문자열을 다양한 해시 알고리즘으로 변환하고 결과를 비교하세요',
      inputLabel: '입력 문자열',
      placeholder: '해시를 생성할 문자열을 입력하세요',
      hint: '해시는 입력값에 민감합니다. 공백이나 줄바꿈도 결과에 영향을 줍니다.',
      algorithmLabel: '알고리즘 선택',
      algorithms: {
        md5: {
          label: 'MD5',
          description: '32자 16진수 해시, 주로 체크섬 용도로 사용',
        },
        sha1: {
          label: 'SHA-1',
          description: '160비트 해시, Git 객체 등 레거시 시스템 사용',
        },
        sha256: {
          label: 'SHA-256',
          description: '256비트 해시, 현재 권장되는 보안 해시',
        },
      },
      resultTitle: '결과',
      generating: '해시 생성 중...',
      emptyMessage: '입력값을 작성하면 선택한 알고리즘으로 해시를 자동 생성합니다.',
      copySuccess: '{{label}} 복사 완료!',
      copyFailed: '클립보드 복사에 실패했습니다',
      error: '해시 생성 중 오류가 발생했습니다',
      buttons: {
        copy: '복사',
        share: '공유',
      },
      guide: {
        title: '사용 가이드',
        items: [
          '• 해시는 단방향 함수로, 결과값에서 원래 문자열을 복구할 수 없습니다.',
          '• MD5와 SHA-1은 보안 목적으로는 권장되지 않으며, 파일 무결성 검증 용도로만 사용하세요.',
          '• SHA-256은 현대적인 암호화 응용 프로그램에 적합한 강력한 해시 알고리즘입니다.',
          '• 해시 결과는 입력값이 한 글자만 달라도 완전히 다른 값이 됩니다 (Avalanche Effect).',
          '• 모든 처리는 브라우저 내에서 수행되며, 서버로 전송되지 않습니다.',
          '• 결과는 Hex와 Base64 두 가지 형식으로 제공합니다.',
        ],
      },
    },
    jwt: {
      title: 'JWT Decoder',
      subtitle: '서명 검증 없이 JWT 헤더 · 페이로드 · 메타데이터를 빠르게 확인하세요',
      tokenLabel: 'JWT 토큰',
      loadSample: '샘플 불러오기',
      clear: '지우기',
      placeholder: 'header.payload.signature 형식의 JWT 토큰을 붙여넣으세요',
      copyToken: 'JWT 복사',
      warningNoSignature: '⚠️ 서명 세그먼트가 비어 있습니다. 이 토큰은 검증되지 않았을 수 있습니다.',
      notice: '• 이 도구는 클라이언트에서 실행되며 <strong className="text-gray-300">서명 검증을 수행하지 않습니다.</strong><br />• 민감한 토큰을 사용할 때는 브라우저 환경에 주의하세요.',
      emptyValue: '유효한 JSON 데이터를 확인할 수 없습니다.',
      noSignature: '서명값이 없습니다.',
      metadata: {
        algorithm: '알고리즘',
        type: '타입',
        contentType: 'Content-Type',
        keyId: 'Key ID',
        issuedAt: '발급(iat)',
        notBefore: '유효 시작(nbf)',
        expiresAt: '만료(exp)',
      },
      sections: {
        header: 'Header',
        payload: 'Payload',
        signature: 'Signature',
      },
      buttons: {
        copyRaw: '원본 복사',
        copyJson: 'JSON 복사',
        copySignature: '서명 복사',
        share: '공유',
      },
      copySuccess: '{{label}}을(를) 복사했습니다',
      copyFailed: '클립보드 복사에 실패했습니다',
      claims: {
        iss: 'iss (발급자)',
        sub: 'sub (주체)',
        aud: 'aud (수신자)',
        exp: 'exp (만료 시간)',
        nbf: 'nbf (유효 시작)',
        iat: 'iat (발급 시간)',
        jti: 'jti (토큰 ID)',
      },
    },
    regex: {
      title: 'Regex Tester',
      subtitle: '정규표현식 패턴을 실시간으로 검증하고 매칭 결과를 확인하세요',
      patternLabel: '정규표현식 패턴',
      patternPlaceholder: '예: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      patternHint: '슬래시(/) 없이 패턴만 입력하세요. 오류가 발생하면 메시지가 표시됩니다.',
      flagsLabel: '플래그',
      currentFlags: '현재 플래그:',
      testStringLabel: '테스트할 문자열',
      testStringPlaceholder: '한 줄 또는 여러 줄의 텍스트를 자유롭게 입력해보세요\n예: hello@example.com\nHELLO@EXAMPLE.COM',
      buttons: {
        reset: '초기화',
        copyInput: '입력 복사',
        clear: '지우기',
        copyMatch: '매치 복사',
      },
      flags: {
        g: { label: 'g', description: 'Global – 모든 매치를 탐색' },
        i: { label: 'i', description: 'Ignore Case – 대소문자 무시' },
        m: { label: 'm', description: 'Multiline – ^/$가 각 줄에 대응' },
        s: { label: 's', description: 'DotAll – . 이 줄바꿈도 매칭' },
        u: { label: 'u', description: 'Unicode – 유니코드 확장 매칭' },
        y: { label: 'y', description: 'Sticky – lastIndex 위치에서만 매칭' },
      },
      matchResults: {
        title: '매칭 결과',
        highlightTitle: '하이라이트',
        emptyString: '∅ (빈 문자열)',
        emptyInput: '테스트 문자열을 입력하면 매칭 결과가 실시간으로 표시됩니다.',
        noMatches: '매치 결과가 없습니다. 패턴 또는 플래그를 조정해보세요.',
        matchNumber: '매치 #{{number}}',
        startPosition: '시작 위치:',
        endPosition: '종료 위치:',
        length: '길이:',
        captureGroupCount: '캡쳐 그룹 수:',
        captureGroups: '캡쳐 그룹',
        namedGroups: '명명된 그룹',
      },
      copySuccess: '{{label}}을 복사했습니다',
      copyFailed: '클립보드 복사에 실패했습니다',
      regexError: '정규표현식을 해석할 수 없습니다',
      guide: {
        title: '사용 가이드',
        items: [
          '• 패턴과 플래그는 입력과 동시에 평가되어 결과가 즉시 반영됩니다.',
          '• g 플래그를 끄면 첫 번째 매치만 반환됩니다. 모든 매치를 확인하려면 g 플래그를 유지하세요.',
          '• 명명된 캡쳐 그룹은 매치 카드에 별도로 표시됩니다.',
          '• 0 길이 매치가 반복될 경우 자동으로 다음 위치로 이동해 무한 루프를 방지합니다.',
        ],
      },
    },
    diffPage: {
      title: 'Diff Checker',
      subtitle: '두 텍스트의 차이점을 시각적으로 비교합니다',
      labels: {
        original: '원본 텍스트',
        modified: '수정된 텍스트',
        result: 'Diff 결과',
      },
      buttons: {
        sample: '샘플 로드',
        clear: '전체 지우기',
        copy: '결과 복사',
      },
      options: {
        mode: '비교 모드',
        modeOptions: {
          line: '라인별',
          word: '단어별',
        },
        ignoreCase: '대소문자 무시',
        ignoreWhitespace: '공백 무시',
      },
      stats: {
        title: '통계',
        added: '추가',
        removed: '삭제',
        unchanged: '변경없음',
      },
      messages: {
        copied: '복사됨!',
        empty: '비교할 텍스트를 입력하세요',
      },
    },
    qrPage: {
      title: 'QR Code Generator',
      subtitle: '텍스트나 URL을 QR 코드로 변환하세요',
      labels: {
        input: '변환할 텍스트 또는 URL',
        result: 'QR 코드 결과',
        size: '크기 (px)',
        errorCorrection: '에러 정정 레벨',
        margin: '여백',
        foreground: '전경색',
        background: '배경색',
      },
      buttons: {
        generate: 'QR 생성',
        downloadPNG: 'PNG 다운로드',
        downloadSVG: 'SVG 다운로드',
        clear: '초기화',
        sample: '샘플 로드',
      },
      errorLevels: {
        L: 'Low',
        M: 'Medium',
        Q: 'Quartile',
        H: 'High',
      },
      placeholders: {
        input: 'https://example.com 또는 변환할 텍스트를 입력하세요',
      },
      messages: {
        empty: '변환할 텍스트를 입력하세요',
        generated: 'QR 코드가 생성되었습니다',
        error: 'QR 코드 생성 중 오류가 발생했습니다',
      },
    },
    cronPage: {
      title: 'Cron Expression Helper',
      subtitle: 'Cron 표현식을 생성하고 다음 실행 시간을 확인하세요',
      labels: {
        expression: 'Cron 표현식',
        description: '표현식 해석',
        nextRuns: '다음 실행 시간 (10개)',
        templates: '일반적인 패턴',
        fields: 'Cron 필드',
        specialChars: '특수 문자',
      },
      buttons: {
        parse: '해석',
        clear: '초기화',
        copy: '복사',
      },
      placeholders: {
        expression: '예: 0 9 * * MON-FRI',
      },
      messages: {
        empty: 'Cron 표현식을 입력하세요',
        invalid: '유효하지 않은 표현식입니다',
        valid: '유효한 표현식입니다',
      },
      templates: {
        everyMinute: '매 분마다',
        everyHour: '매 시간 정각',
        everyDay: '매일 자정',
        everyWeek: '매주 일요일 자정',
        everyMonth: '매월 1일 자정',
        everyYear: '매년 1월 1일 자정',
        weekdays9am: '평일 오전 9시',
        weekdays6pm: '평일 오후 6시',
        every15min: '15분마다',
        every30min: '30분마다',
        everyMorning: '매일 오전 8시',
        everyEvening: '매일 오후 8시',
      },
      fieldNames: {
        minute: '분 (Minute)',
        hour: '시 (Hour)',
        dayOfMonth: '일 (Day of Month)',
        month: '월 (Month)',
        dayOfWeek: '요일 (Day of Week)',
      },
      specialChars: {
        asterisk: {
          symbol: '*',
          description: '모든 값',
          example: '* * * * * = 매 분마다',
        },
        comma: {
          symbol: ',',
          description: '값 목록',
          example: '0,30 * * * * = 매 시간 0분, 30분',
        },
        hyphen: {
          symbol: '-',
          description: '범위',
          example: '0 9-17 * * * = 9시부터 17시까지 매 시간',
        },
        slash: {
          symbol: '/',
          description: '간격',
          example: '*/15 * * * * = 15분마다',
        },
      },
    },
    imagePage: {
      title: 'Image Converter',
      subtitle: '이미지 포맷을 변환하고 크기를 조정하세요',
      labels: {
        upload: '이미지 업로드',
        format: '변환 포맷',
        quality: '품질 설정',
        resize: '크기 조정',
        width: '너비',
        height: '높이',
        original: '원본 이미지',
        converted: '변환된 이미지',
        download: '다운로드',
        reset: '초기화',
      },
      formats: {
        png: 'PNG',
        jpeg: 'JPEG',
        webp: 'WebP',
      },
      info: {
        dragDrop: '이미지를 드래그하거나 클릭하여 업로드',
        acceptedFormats: '지원 형식: PNG, JPEG, WebP, GIF',
        originalSize: '원본 크기',
        newSize: '변환 크기',
        originalFileSize: '원본 파일 크기',
        newFileSize: '변환 파일 크기',
        compressionRatio: '압축률',
      },
      errors: {
        uploadFailed: '이미지 파일만 업로드할 수 있습니다',
        conversionFailed: '변환 실패',
      },
    },
    loremPage: {
      title: 'Lorem Ipsum Generator',
      subtitle: '더미 텍스트를 생성하여 레이아웃을 테스트하세요',
      labels: {
        count: '생성 개수',
        unit: '생성 단위',
        options: '옵션',
        startWithLorem: '"Lorem ipsum dolor sit amet..." 으로 시작',
        wrap: 'HTML 태그',
        result: '생성 결과',
        plainText: '일반 텍스트',
        htmlCode: 'HTML 코드',
        statistics: '통계',
        copy: '복사',
        copyHtml: 'HTML 복사',
        generate: '생성',
      },
      units: {
        words: '단어',
        sentences: '문장',
        paragraphs: '단락',
      },
      wraps: {
        none: '없음',
        p: '<p>',
        div: '<div>',
        ul: '<ul>',
        ol: '<ol>',
        h1: '<h1>',
        h2: '<h2>',
        h3: '<h3>',
      },
      stats: {
        characters: '문자 수',
        words: '단어 수',
        sentences: '문장 수',
        paragraphs: '단락 수',
      },
      messages: {
        copied: '텍스트가 복사되었습니다!',
        copiedHtml: 'HTML 코드가 복사되었습니다!',
      },
    },
  },
};

export type KoreanDictionary = typeof ko;
