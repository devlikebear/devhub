/**
 * 도구별 사용 가이드 데이터
 */

export type ToolGuideSection = {
  title: string;
  content: string;
};

export type ToolGuide = {
  id: string;
  sections: ToolGuideSection[];
  examples: {
    title: string;
    input: string;
    output: string;
    description?: string;
  }[];
  tips: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const toolGuides: Record<string, ToolGuide> = {
  timestamp: {
    id: 'timestamp',
    sections: [
      {
        title: '사용 방법',
        content:
          'Unix Timestamp (Epoch)와 사람이 읽을 수 있는 날짜/시간 형식 간의 변환을 제공합니다. 양방향 변환이 가능하며, 밀리초 단위까지 지원합니다.',
      },
      {
        title: '입력 형식',
        content:
          'Unix Timestamp는 1970년 1월 1일 00:00:00 UTC부터 경과한 시간을 초 또는 밀리초 단위로 표현합니다. 10자리(초) 또는 13자리(밀리초) 숫자를 입력하세요.',
      },
    ],
    examples: [
      {
        title: 'Timestamp → 날짜',
        input: '1704067200',
        output: '2024-01-01 00:00:00',
        description: '10자리 Unix Timestamp (초 단위)',
      },
      {
        title: 'Timestamp → 날짜 (밀리초)',
        input: '1704067200000',
        output: '2024-01-01 00:00:00.000',
        description: '13자리 Unix Timestamp (밀리초 단위)',
      },
      {
        title: '날짜 → Timestamp',
        input: '2024-01-01',
        output: '1704067200',
        description: 'ISO 날짜 형식',
      },
    ],
    tips: [
      '현재 시각의 Timestamp를 빠르게 얻으려면 "지금" 버튼을 클릭하세요',
      'Timestamp는 UTC 기준이므로 타임존 변환이 필요할 수 있습니다',
      '밀리초 단위가 필요한 경우 13자리 숫자를 사용하세요',
      '복사 버튼으로 결과를 클립보드에 쉽게 복사할 수 있습니다',
    ],
    faqs: [
      {
        question: 'Unix Timestamp가 무엇인가요?',
        answer:
          'Unix Timestamp는 1970년 1월 1일 00:00:00 UTC부터 경과한 시간을 초 단위로 표현한 값입니다. 시스템 간 시간 데이터 교환에 널리 사용됩니다.',
      },
      {
        question: '10자리와 13자리의 차이는 무엇인가요?',
        answer: '10자리는 초 단위, 13자리는 밀리초 단위입니다. JavaScript의 Date.now()는 13자리를 반환합니다.',
      },
      {
        question: '타임존은 어떻게 처리하나요?',
        answer: 'Unix Timestamp는 UTC 기준이므로, 로컬 타임존으로 변환하려면 시차를 고려해야 합니다.',
      },
    ],
  },

  base64: {
    id: 'base64',
    sections: [
      {
        title: '사용 방법',
        content:
          'Base64는 바이너리 데이터를 텍스트 형식으로 인코딩하는 방법입니다. 이메일, JSON, URL 등에서 바이너리 데이터를 안전하게 전송할 때 사용됩니다.',
      },
      {
        title: '인코딩/디코딩',
        content:
          '일반 텍스트를 Base64로 인코딩하거나, Base64 문자열을 원본 텍스트로 디코딩할 수 있습니다. UTF-8 인코딩을 사용하여 한글도 지원합니다.',
      },
    ],
    examples: [
      {
        title: '텍스트 인코딩',
        input: 'Hello, World!',
        output: 'SGVsbG8sIFdvcmxkIQ==',
        description: '일반 텍스트를 Base64로 변환',
      },
      {
        title: '한글 인코딩',
        input: '안녕하세요',
        output: '7JWI64WV7ZWY7IS47JqU',
        description: 'UTF-8 한글 지원',
      },
      {
        title: 'Base64 디코딩',
        input: 'SGVsbG8sIFdvcmxkIQ==',
        output: 'Hello, World!',
        description: 'Base64를 원본 텍스트로 변환',
      },
    ],
    tips: [
      'Base64 문자열은 항상 A-Z, a-z, 0-9, +, /와 패딩 문자 =로만 구성됩니다',
      '인코딩된 데이터는 원본보다 약 33% 더 큽니다',
      'URL에 사용할 때는 +를 -, /를 _로 바꾸는 URL-safe Base64를 고려하세요',
      '패딩 문자 =는 생략 가능하지만 디코딩 시 추가해야 할 수 있습니다',
    ],
    faqs: [
      {
        question: 'Base64는 암호화인가요?',
        answer:
          '아니요, Base64는 인코딩 방식이지 암호화가 아닙니다. 누구나 쉽게 디코딩할 수 있으므로 민감한 데이터 보호에는 적합하지 않습니다.',
      },
      {
        question: '왜 데이터가 커지나요?',
        answer:
          'Base64는 3바이트를 4개의 문자로 변환하므로 원본 데이터보다 약 33% 커집니다.',
      },
      {
        question: '한글이 깨지는데 어떻게 하나요?',
        answer: '이 도구는 UTF-8 인코딩을 사용하여 한글을 올바르게 처리합니다.',
      },
    ],
  },

  json: {
    id: 'json',
    sections: [
      {
        title: '사용 방법',
        content:
          'JSON 데이터를 읽기 쉽게 포맷팅하거나, 압축하거나, 유효성을 검증할 수 있습니다. 개발 중 API 응답이나 설정 파일을 다룰 때 유용합니다.',
      },
      {
        title: '키보드 단축키',
        content:
          '⌘S (Ctrl+S): 포맷팅\n⌘M (Ctrl+M): 압축\n⌘L (Ctrl+L): 전체 지우기',
      },
    ],
    examples: [
      {
        title: 'JSON 포맷팅',
        input: '{"name":"John","age":30,"city":"Seoul"}',
        output: '{\n  "name": "John",\n  "age": 30,\n  "city": "Seoul"\n}',
        description: '압축된 JSON을 읽기 쉽게 변환',
      },
      {
        title: 'JSON 압축',
        input: '{\n  "name": "John",\n  "age": 30\n}',
        output: '{"name":"John","age":30}',
        description: '공백 제거로 크기 축소',
      },
      {
        title: '유효성 검증',
        input: '{name: "John"}',
        output: 'Error: 유효하지 않은 JSON',
        description: '잘못된 형식 감지',
      },
    ],
    tips: [
      '포맷 버튼으로 들여쓰기와 줄바꿈을 추가하여 가독성을 높이세요',
      '압축 버튼으로 모든 공백을 제거하여 전송 크기를 줄이세요',
      '문법 오류가 있으면 자동으로 감지하고 위치를 알려줍니다',
      '분석 정보에서 객체 수, 배열 수, 최대 깊이 등을 확인하세요',
    ],
    faqs: [
      {
        question: 'JSON과 JavaScript 객체의 차이는?',
        answer:
          'JSON은 문자열 키를 반드시 큰따옴표로 감싸야 하고, 함수나 undefined를 포함할 수 없습니다.',
      },
      {
        question: '큰 JSON 파일도 처리 가능한가요?',
        answer:
          '브라우저에서 처리하므로 메모리 제약이 있습니다. 수 MB 이하의 파일을 권장합니다.',
      },
      {
        question: '포맷팅 스타일을 바꿀 수 있나요?',
        answer: '현재는 2칸 들여쓰기를 사용합니다. 향후 설정 옵션을 추가할 예정입니다.',
      },
    ],
  },

  color: {
    id: 'color',
    sections: [
      {
        title: '사용 방법',
        content:
          'HEX, RGB, HSL 색상 코드 간 변환과 색상 팔레트 생성을 제공합니다. 웹 디자인과 개발에 유용한 도구입니다.',
      },
      {
        title: '지원 형식',
        content:
          'HEX: #RRGGBB 또는 #RGB\nRGB: rgb(r, g, b) 또는 r, g, b\nHSL: hsl(h, s%, l%) 또는 h, s%, l%',
      },
    ],
    examples: [
      {
        title: 'HEX → RGB 변환',
        input: '#FF5733',
        output: 'rgb(255, 87, 51)',
        description: '웹에서 가장 많이 쓰이는 형식',
      },
      {
        title: 'RGB → HSL 변환',
        input: 'rgb(255, 87, 51)',
        output: 'hsl(11, 100%, 60%)',
        description: '색상 조정에 유용한 HSL',
      },
      {
        title: '팔레트 생성',
        input: '#3B82F6',
        output: '5가지 조화로운 색상',
        description: '보색, 유사색 등 자동 생성',
      },
    ],
    tips: [
      'HEX 코드는 # 기호를 포함하거나 생략할 수 있습니다',
      'RGB 값은 0-255 범위, HSL의 색조는 0-360도 범위입니다',
      '팔레트 생성으로 디자인에 어울리는 색상 조합을 찾으세요',
      '각 색상을 클릭하면 클립보드에 복사됩니다',
    ],
    faqs: [
      {
        question: 'HSL이 RGB보다 나은 점은?',
        answer:
          'HSL은 색상(Hue), 채도(Saturation), 명도(Lightness)를 독립적으로 조정할 수 있어 디자인 작업에 직관적입니다.',
      },
      {
        question: '투명도는 지원하나요?',
        answer: '현재는 불투명 색상만 지원합니다. RGBA, HSLA는 향후 추가 예정입니다.',
      },
      {
        question: '팔레트는 어떻게 생성되나요?',
        answer: '색상 이론에 기반하여 보색, 삼색 조화, 유사색 등의 조합을 자동으로 계산합니다.',
      },
    ],
  },

  uuid: {
    id: 'uuid',
    sections: [
      {
        title: '사용 방법',
        content:
          'UUID(Universally Unique Identifier) v4를 생성합니다. 데이터베이스 ID, 파일명, 세션 키 등에 사용할 수 있는 고유한 식별자입니다.',
      },
      {
        title: 'UUID v4란?',
        content:
          'UUID v4는 랜덤 방식으로 생성되며, 충돌 확률이 극히 낮아 전역적으로 고유한 값을 보장합니다. 128비트(16바이트) 크기입니다.',
      },
    ],
    examples: [
      {
        title: 'UUID 생성',
        input: '생성 버튼 클릭',
        output: '550e8400-e29b-41d4-a716-446655440000',
        description: '표준 UUID v4 형식',
      },
      {
        title: '대량 생성',
        input: '개수 입력 후 생성',
        output: '여러 개의 UUID',
        description: '최대 100개까지 한 번에 생성',
      },
    ],
    tips: [
      '생성 버튼을 누를 때마다 새로운 UUID가 생성됩니다',
      '복사 버튼으로 쉽게 클립보드에 복사할 수 있습니다',
      'UUID는 하이픈 포함 36자, 하이픈 제외 32자입니다',
      '대량 생성 시 각 UUID는 개행으로 구분됩니다',
    ],
    faqs: [
      {
        question: 'UUID는 정말 고유한가요?',
        answer:
          'UUID v4의 충돌 확률은 약 10^-15으로 실질적으로 고유하다고 볼 수 있습니다.',
      },
      {
        question: 'UUID v1과 v4의 차이는?',
        answer:
          'v1은 타임스탬프와 MAC 주소를 사용하고, v4는 완전 랜덤입니다. v4가 보안상 더 안전합니다.',
      },
      {
        question: '데이터베이스 기본키로 사용해도 되나요?',
        answer:
          '가능하지만 인덱스 크기가 커지고 성능이 약간 떨어질 수 있습니다. 용도에 따라 선택하세요.',
      },
    ],
  },

  hash: {
    id: 'hash',
    sections: [
      {
        title: '사용 방법',
        content:
          '텍스트의 해시 값을 MD5, SHA-1, SHA-256 알고리즘으로 생성합니다. 파일 무결성 검증, 비밀번호 해싱 등에 활용됩니다.',
      },
      {
        title: '알고리즘 선택',
        content:
          'MD5: 128비트, 빠르지만 보안 취약\nSHA-1: 160비트, 레거시\nSHA-256: 256비트, 현재 권장 표준',
      },
    ],
    examples: [
      {
        title: 'MD5 해시',
        input: 'Hello, World!',
        output: '65a8e27d8879283831b664bd8b7f0ad4',
        description: '32자 16진수',
      },
      {
        title: 'SHA-256 해시',
        input: 'Hello, World!',
        output: 'dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f',
        description: '64자 16진수',
      },
    ],
    tips: [
      'SHA-256은 현재 가장 널리 사용되는 보안 해시 알고리즘입니다',
      'MD5와 SHA-1은 보안 목적으로는 권장되지 않습니다',
      '동일한 입력은 항상 동일한 해시를 생성합니다',
      '해시는 일방향 함수로 원본 데이터를 복원할 수 없습니다',
    ],
    faqs: [
      {
        question: '어떤 알고리즘을 사용해야 하나요?',
        answer:
          '보안이 중요하면 SHA-256, 빠른 체크섬이 필요하면 MD5를 사용하세요. SHA-1은 레거시 호환성을 위해서만 사용하세요.',
      },
      {
        question: '해시 충돌이란 무엇인가요?',
        answer: '서로 다른 입력이 같은 해시 값을 만드는 경우입니다. MD5와 SHA-1은 충돌 공격에 취약합니다.',
      },
      {
        question: '비밀번호 저장에 사용해도 되나요?',
        answer:
          '단순 해시보다는 bcrypt, Argon2 같은 비밀번호 전용 알고리즘을 사용하는 것이 안전합니다.',
      },
    ],
  },

  regex: {
    id: 'regex',
    sections: [
      {
        title: '사용 방법',
        content:
          '정규표현식 패턴을 테스트하고 매칭 결과를 확인할 수 있습니다. 패턴 작성과 디버깅에 유용합니다.',
      },
      {
        title: '플래그',
        content:
          'g: 전역 매칭 (모든 결과)\ni: 대소문자 무시\nm: 여러 줄 모드\ns: . 이 개행 문자 포함',
      },
    ],
    examples: [
      {
        title: '이메일 검증',
        input: 'Pattern: [a-z]+@[a-z]+\\.[a-z]+',
        output: 'test@example.com ✓',
        description: '간단한 이메일 패턴',
      },
      {
        title: '전화번호 추출',
        input: 'Pattern: \\d{3}-\\d{4}-\\d{4}',
        output: '010-1234-5678',
        description: '한국 전화번호 형식',
      },
      {
        title: 'URL 매칭',
        input: 'Pattern: https?://[^\\s]+',
        output: 'https://example.com',
        description: 'HTTP/HTTPS URL',
      },
    ],
    tips: [
      '패턴은 슬래시(/) 없이 입력하세요',
      '매칭된 부분은 하이라이트로 표시됩니다',
      '플래그를 조합하여 다양한 옵션을 사용하세요',
      '복잡한 패턴은 그룹 \\(\\)을 활용하세요',
    ],
    faqs: [
      {
        question: '정규표현식을 어떻게 배우나요?',
        answer:
          '기본 문자 매칭부터 시작해서 메타문자(., *, +, ?, ^, $), 문자 클래스([]), 그룹(()) 순으로 학습하세요.',
      },
      {
        question: '성능이 느린 패턴은?',
        answer: '과도한 백트래킹을 유발하는 중첩 수량자(예: .*.*) 패턴은 피하세요.',
      },
      {
        question: '한글도 매칭 가능한가요?',
        answer: '네, 유니코드를 지원하므로 [가-힣] 같은 패턴으로 한글을 매칭할 수 있습니다.',
      },
    ],
  },

  markdown: {
    id: 'markdown',
    sections: [
      {
        title: '사용 방법',
        content:
          'Markdown 문법을 작성하면 실시간으로 HTML 변환 결과를 미리볼 수 있습니다. README 작성이나 문서 편집에 유용합니다.',
      },
      {
        title: '지원 문법',
        content:
          '제목, 볼드, 이탤릭, 링크, 이미지, 코드 블록, 리스트, 인용, 표 등 표준 Markdown 문법을 모두 지원합니다.',
      },
    ],
    examples: [
      {
        title: '제목',
        input: '# 제목 1\\n## 제목 2',
        output: '<h1>제목 1</h1><h2>제목 2</h2>',
        description: '#으로 제목 수준 지정',
      },
      {
        title: '강조',
        input: '**볼드** *이탤릭*',
        output: '<strong>볼드</strong> <em>이탤릭</em>',
        description: '텍스트 강조',
      },
      {
        title: '코드',
        input: '`inline code`\\n```js\\ncode block\\n```',
        output: '인라인 코드와 코드 블록',
        description: '코드 표시',
      },
    ],
    tips: [
      '왼쪽에 Markdown을 입력하면 오른쪽에 실시간 미리보기가 표시됩니다',
      '코드 블록에 언어를 명시하면 문법 하이라이팅이 적용됩니다',
      '표는 |로 구분하여 작성할 수 있습니다',
      'HTML 태그도 일부 사용 가능합니다',
    ],
    faqs: [
      {
        question: 'GitHub Flavored Markdown을 지원하나요?',
        answer: '네, 표, 작업 목록, 취소선 등 GFM 확장 문법을 지원합니다.',
      },
      {
        question: '이미지를 업로드할 수 있나요?',
        answer: '현재는 이미지 URL만 지원합니다. 파일 업로드는 향후 추가 예정입니다.',
      },
      {
        question: '내보내기 기능이 있나요?',
        answer: '현재는 미리보기만 제공합니다. HTML 내보내기는 향후 추가 예정입니다.',
      },
    ],
  },

  url: {
    id: 'url',
    sections: [
      {
        title: '사용 방법',
        content:
          'URL 인코딩과 디코딩을 수행합니다. 특수 문자를 포함한 URL을 안전하게 전송하거나, 인코딩된 URL을 읽기 쉬운 형태로 변환합니다.',
      },
      {
        title: 'URL 인코딩이란?',
        content:
          'URL에서 허용되지 않는 문자(공백, 한글, 특수문자 등)를 %XX 형식의 퍼센트 인코딩으로 변환하는 과정입니다.',
      },
    ],
    examples: [
      {
        title: 'URL 인코딩',
        input: 'https://example.com/검색?q=테스트',
        output: 'https://example.com/%EA%B2%80%EC%83%89?q=%ED%85%8C%EC%8A%A4%ED%8A%B8',
        description: '한글 및 특수문자 변환',
      },
      {
        title: 'URL 디코딩',
        input: 'https://example.com/%EA%B2%80%EC%83%89',
        output: 'https://example.com/검색',
        description: '인코딩된 URL 복원',
      },
      {
        title: '쿼리 파라미터',
        input: 'name=홍길동&age=30',
        output: 'name=%ED%99%8D%EA%B8%B8%EB%8F%99&age=30',
        description: '파라미터 인코딩',
      },
    ],
    tips: [
      'URL 인코딩은 UTF-8 기준으로 수행됩니다',
      '공백은 %20 또는 +로 인코딩될 수 있습니다',
      '영문자, 숫자, 일부 특수문자(-_.~)는 인코딩되지 않습니다',
      '여러 번 인코딩된 URL은 여러 번 디코딩해야 합니다',
    ],
    faqs: [
      {
        question: 'URL 인코딩은 왜 필요한가요?',
        answer:
          'URL은 ASCII 문자만 사용할 수 있으므로, 한글이나 특수문자를 안전하게 전송하려면 인코딩이 필요합니다.',
      },
      {
        question: '공백이 %20과 + 두 가지로 표시되는 이유는?',
        answer:
          '%20은 표준 URL 인코딩, +는 application/x-www-form-urlencoded 방식입니다. 용도에 따라 다릅니다.',
      },
      {
        question: '인코딩을 여러 번 하면 어떻게 되나요?',
        answer:
          '이중 인코딩이 발생합니다. 예: %가 %25로 인코딩되어 %ED%99%8D이 %25ED%2599%258D이 됩니다.',
      },
    ],
  },

  diff: {
    id: 'diff',
    sections: [
      {
        title: '사용 방법',
        content:
          '두 텍스트를 비교하여 추가, 삭제, 변경된 부분을 시각적으로 표시합니다. 코드 리뷰, 문서 변경 확인, 버전 비교 등에 유용합니다.',
      },
      {
        title: '비교 모드',
        content:
          '라인별 비교: 전체 라인 단위로 변경사항을 감지합니다.\n단어별 비교: 단어 단위로 세밀한 차이를 표시합니다.',
      },
      {
        title: '옵션 설명',
        content:
          '대소문자 무시: 대문자와 소문자를 구분하지 않고 비교합니다.\n공백 무시: 여러 공백을 하나로 취급하여 비교합니다.',
      },
    ],
    examples: [
      {
        title: '코드 변경사항 비교',
        input: 'Original: const name = "John";\nModified: const name = "Jane";',
        output: '- const name = "John";\n+ const name = "Jane";',
        description: '변수 값이 변경된 경우',
      },
      {
        title: '라인 추가/삭제',
        input: 'Original: Line 1\nLine 2\n\nModified: Line 1\nLine 2\nLine 3',
        output: '  Line 1\n  Line 2\n+ Line 3',
        description: '새로운 라인이 추가된 경우',
      },
      {
        title: '단어별 세밀한 비교',
        input: 'Mode: Word by Word\nOriginal: Hello World\nModified: Hello DevHub',
        output: 'Hello - World + DevHub',
        description: '단어 단위로 변경사항 표시',
      },
    ],
    tips: [
      '녹색 배경(+)은 추가된 내용, 빨간색 배경(-)은 삭제된 내용을 의미합니다',
      '라인별 비교는 전체 코드 비교에, 단어별 비교는 문장 수정에 적합합니다',
      '대소문자 무시 옵션은 변수명 변경 시 유용합니다',
      '결과 복사 버튼으로 diff 결과를 클립보드에 복사할 수 있습니다',
    ],
    faqs: [
      {
        question: '어떤 경우에 Diff Checker를 사용하나요?',
        answer:
          '코드 리뷰, 문서 버전 비교, 설정 파일 변경사항 확인, Pull Request 검토 등에 사용합니다.',
      },
      {
        question: '라인별과 단어별 비교의 차이는?',
        answer:
          '라인별은 전체 줄 단위로 비교하여 큰 변경사항을 파악하기 좋고, 단어별은 한 줄 내에서 정확히 어떤 단어가 바뀌었는지 확인할 수 있습니다.',
      },
      {
        question: '공백이 너무 많아서 비교가 어려워요',
        answer:
          '"공백 무시" 옵션을 활성화하면 여러 공백이나 탭을 하나의 공백으로 취급하여 실질적인 내용 변경만 비교합니다.',
      },
    ],
  },

  jwt: {
    id: 'jwt',
    sections: [
      {
        title: '사용 방법',
        content:
          'JWT(JSON Web Token)를 디코딩하여 헤더, 페이로드, 서명을 확인할 수 있습니다. 토큰 내용 확인과 디버깅에 유용합니다.',
      },
      {
        title: 'JWT 구조',
        content:
          'JWT는 Header.Payload.Signature 세 부분으로 구성되며, 각 부분은 Base64URL로 인코딩됩니다.',
      },
    ],
    examples: [
      {
        title: 'JWT 디코딩',
        input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0...',
        output: 'Header: {"alg":"HS256","typ":"JWT"}\\nPayload: {"sub":"1234567890"}',
        description: '토큰 내용 확인',
      },
    ],
    tips: [
      'JWT 디코딩은 서명 검증 없이 내용만 확인합니다',
      '만료 시간(exp)을 확인하여 토큰 유효성을 판단하세요',
      '민감한 정보는 JWT에 포함하지 마세요 (디코딩 가능)',
      '서명 검증은 서버에서 비밀키로 수행해야 합니다',
    ],
    faqs: [
      {
        question: 'JWT는 암호화되나요?',
        answer:
          '아니요, JWT는 서명되지만 암호화되지 않습니다. 누구나 내용을 볼 수 있으므로 민감한 정보를 포함하면 안 됩니다.',
      },
      {
        question: '서명은 어떻게 검증하나요?',
        answer:
          '서명 검증은 비밀키가 필요하므로 서버에서만 가능합니다. 이 도구는 내용 확인만 제공합니다.',
      },
      {
        question: 'JWT와 세션의 차이는?',
        answer:
          'JWT는 상태가 없고(stateless) 클라이언트에 저장되며, 세션은 서버에 상태를 저장합니다.',
      },
    ],
  },

  qr: {
    id: 'qr',
    sections: [
      {
        title: '사용 방법',
        content:
          'QR 코드 생성기는 텍스트나 URL을 QR 코드 이미지로 변환합니다. 크기, 색상, 에러 정정 레벨 등을 자유롭게 조정할 수 있으며, PNG 또는 SVG 형식으로 다운로드할 수 있습니다.',
      },
      {
        title: 'QR 코드란?',
        content:
          'QR(Quick Response) 코드는 2차원 바코드로, URL, 연락처 정보, 텍스트 등을 스마트폰 카메라로 빠르게 스캔할 수 있는 이미지로 변환합니다.',
      },
      {
        title: '에러 정정 레벨',
        content:
          '에러 정정 레벨이 높을수록 QR 코드가 손상되어도 복원 가능한 정도가 높아집니다. L(~7%), M(~15%), Q(~25%), H(~30%)의 4가지 레벨이 있으며, 레벨이 높을수록 QR 코드가 더 복잡해집니다.',
      },
    ],
    examples: [
      {
        title: 'URL QR 코드',
        input: 'https://github.com/devlikebear/devhub',
        output: 'QR 코드 이미지',
        description: '웹사이트 링크를 QR 코드로 변환',
      },
      {
        title: 'Wi-Fi QR 코드',
        input: 'WIFI:T:WPA;S:MyNetwork;P:password123;;',
        output: 'QR 코드 이미지',
        description: 'Wi-Fi 접속 정보를 QR 코드로 변환',
      },
      {
        title: '연락처 QR 코드',
        input: 'MECARD:N:Hong,Gildong;TEL:01012345678;EMAIL:hong@example.com;;',
        output: 'QR 코드 이미지',
        description: '명함 정보를 QR 코드로 변환',
      },
    ],
    tips: [
      '에러 정정 레벨이 높을수록 QR 코드가 손상되어도 읽힐 가능성이 높아집니다',
      'PNG는 일반 용도에, SVG는 인쇄물이나 확대가 필요한 경우에 적합합니다',
      'QR 코드는 실시간으로 생성되며, 모든 처리는 브라우저에서 이루어집니다',
      '크기를 키우면 더 선명한 QR 코드를 얻을 수 있습니다 (권장: 256px 이상)',
      '색상 대비가 충분해야 QR 코드가 잘 스캔됩니다 (어두운 전경색 + 밝은 배경색)',
    ],
    faqs: [
      {
        question: '어떤 경우에 QR 코드를 사용하나요?',
        answer:
          'URL 공유, Wi-Fi 접속 정보 공유, 명함, 제품 정보, 행사 초대장, 결제 정보 등 다양한 용도로 사용됩니다.',
      },
      {
        question: 'QR 코드에 어떤 정보를 담을 수 있나요?',
        answer:
          'URL, 텍스트, 이메일, 전화번호, Wi-Fi 정보, 연락처(vCard), 지리적 위치, 이벤트(iCal) 등 다양한 형식을 지원합니다.',
      },
      {
        question: 'PNG와 SVG 중 어떤 형식을 사용해야 하나요?',
        answer:
          'PNG는 일반 용도(웹, 화면)에 적합하고, SVG는 인쇄물이나 크기 조정이 필요한 경우에 적합합니다. SVG는 벡터 형식이라 확대해도 선명합니다.',
      },
      {
        question: 'QR 코드의 크기는 어떻게 정하나요?',
        answer:
          '인쇄용은 최소 2cm x 2cm 이상, 웹/모바일은 256px 이상을 권장합니다. 스캔 거리가 멀수록 더 큰 QR 코드가 필요합니다.',
      },
    ],
  },

  cron: {
    id: 'cron',
    sections: [
      {
        title: '사용 방법',
        content:
          'Cron Expression Helper는 Linux/Unix 시스템에서 사용하는 Cron 표현식을 생성하고 해석합니다. 표현식을 입력하면 자연어로 해석된 내용과 다음 10번의 실행 시간을 확인할 수 있습니다.',
      },
      {
        title: 'Cron 표현식이란?',
        content:
          'Cron은 정기적으로 작업을 실행하기 위한 스케줄러입니다. Cron 표현식은 5개 또는 6개의 필드로 구성되며, 각 필드는 분, 시, 일, 월, 요일을 나타냅니다.',
      },
      {
        title: 'Cron 표현식 형식',
        content:
          '표준 형식: 분 시 일 월 요일\n예: 0 9 * * MON-FRI = 평일 오전 9시',
      },
    ],
    examples: [
      {
        title: '매일 오전 9시',
        input: '0 9 * * *',
        output: '매일 오전 9시에 실행',
        description: '일, 월, 요일은 모든 값(*) 허용',
      },
      {
        title: '평일 점심시간',
        input: '0 12 * * 1-5',
        output: '월요일부터 금요일까지 정오에 실행',
        description: '1-5는 월요일부터 금요일',
      },
      {
        title: '15분마다',
        input: '*/15 * * * *',
        output: '15분마다 실행',
        description: '*/15는 0, 15, 30, 45분에 실행',
      },
      {
        title: '매월 1일과 15일',
        input: '0 0 1,15 * *',
        output: '매월 1일과 15일 자정에 실행',
        description: '1,15는 값 목록',
      },
    ],
    tips: [
      'Cron 표현식은 5개 필드로 구성됩니다: 분 시 일 월 요일',
      '*는 "모든 값"을 의미합니다 (예: * * * * * = 매 분마다)',
      ',는 값 목록을 나타냅니다 (예: 0,30 = 0분과 30분)',
      '-는 범위를 나타냅니다 (예: 1-5 = 월요일부터 금요일)',
      '/는 간격을 나타냅니다 (예: */5 = 5분마다)',
      '요일은 0(일요일)부터 6(토요일)까지, 또는 SUN, MON 등 영문 약자 사용 가능',
    ],
    faqs: [
      {
        question: 'Cron 표현식은 어디에 사용하나요?',
        answer:
          'Linux/Unix 시스템의 crontab, Jenkins, Kubernetes CronJob, AWS EventBridge, Azure Functions 등 다양한 스케줄링 시스템에서 사용됩니다.',
      },
      {
        question: '매일 오전 9시부터 오후 6시까지 1시간마다 실행하려면?',
        answer: '0 9-18 * * * 또는 0 9,10,11,12,13,14,15,16,17,18 * * *',
      },
      {
        question: '평일에만 실행하려면?',
        answer: '요일 필드에 1-5 (월-금) 또는 MON-FRI를 사용하세요. 예: 0 9 * * 1-5',
      },
      {
        question: '매주 월요일과 금요일에만 실행하려면?',
        answer: '요일 필드에 1,5 또는 MON,FRI를 사용하세요. 예: 0 9 * * 1,5',
      },
      {
        question: '시간대(Timezone)는 어떻게 설정하나요?',
        answer:
          'Cron 표현식 자체에는 시간대 정보가 없습니다. 시스템의 시간대 설정을 따르므로, 서버의 시간대를 확인하고 필요시 조정해야 합니다.',
      },
    ],
  },
};
