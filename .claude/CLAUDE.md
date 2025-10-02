# DevHub - Claude Code 프로젝트 컨텍스트

## 프로젝트 개요

**DevHub**는 개발자를 위한 유틸리티 플랫폼입니다.

- **프로젝트명**: devhub
- **타입**: 개발자 유틸리티 도구 모음
- **호스팅**: Cloudflare Pages (무료)
- **도메인**: Cloudflare 관리 (사용자 소유)
- **현재 상태**: Phase 2 진행 중 (핵심 페이지 구현)

## 기술 스택

```yaml
Framework: Next.js 15 (App Router)
Language: TypeScript
Styling: Tailwind CSS 4
Package Manager: npm
Linter: ESLint
Hosting: Cloudflare Pages
Version Control: Git + GitHub
```

## 프로젝트 구조

```
devhub/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 (랜딩)
│   ├── about/             # 소개 페이지
│   ├── tools/             # 유틸리티 도구들
│   │   ├── page.tsx       # 도구 목록
│   │   ├── timestamp/     # Epoch 타임스탬프 변환
│   │   ├── base64/        # Base64 인코딩/디코딩
│   │   ├── json/          # JSON 포맷터/검증
│   │   ├── color/         # 색상 변환 & 팔레트
│   │   └── ...            # 기타 도구들
│   └── contact/           # 연락처
├── components/            # 재사용 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   │   ├── Navbar.tsx    # 네비게이션 바
│   │   └── Footer.tsx    # 푸터
│   └── tools/            # 도구별 컴포넌트
├── lib/                  # 유틸리티 함수
│   └── converters/       # 변환 로직
├── public/               # 정적 파일
├── .claude/              # Claude Code 설정
├── DEPLOY.md            # 배포 가이드
├── WORKFLOW.md          # 개발 워크플로우
├── PROJECT.md           # 상세 기획서
└── package.json         # 의존성
```

## 현재 구현된 기능

### ✅ 완료된 작업

**Phase 1: 기본 구조**
- [x] Next.js 15 + TypeScript 설정
- [x] Tailwind CSS 4 통합
- [x] ESLint 설정
- [x] Git 저장소 초기화
- [x] 랜딩 페이지 구현

**Phase 2: 핵심 페이지**
- [x] Navigation Bar 컴포넌트 [#1]
- [x] Footer 컴포넌트 [#2]
- [x] About (소개) 페이지 [#3]
- [x] Tools 목록 페이지
- [ ] Contact (연락처) 페이지 [#5]

**문서화**
- [x] DEPLOY.md: Cloudflare Pages 배포 가이드
- [x] WORKFLOW.md: GitHub Flow 개발 워크플로우
- [x] PROJECT.md: 유틸리티 플랫폼 기획서
- [x] CLAUDE.md: 이 파일

## 다음 구현 예정

### Phase 2 (진행 중)
- [ ] Contact 페이지 구현

### Phase 3: 유틸리티 도구 구현

**우선순위 높음 (필수 도구)**
1. Timestamp Converter - Epoch ↔ 날짜/시간 변환
2. Base64 Encoder/Decoder
3. JSON Formatter - 포맷팅, 검증, 압축
4. Color Tool - HEX/RGB/HSL 변환 & 팔레트
5. UUID Generator

**우선순위 중간**
6. Hash Generator - MD5, SHA-1, SHA-256
7. Regex Tester
8. Markdown Preview
9. URL Encoder/Decoder
10. JWT Decoder

## 코딩 가이드라인

### TypeScript

- 모든 컴포넌트는 TypeScript로 작성
- Props는 명시적 타입 정의
- `any` 타입 사용 지양

### 컴포넌트 작성

```typescript
// 함수형 컴포넌트 사용
export default function ComponentName() {
  return (
    // JSX
  );
}

// Props가 있는 경우
interface ComponentProps {
  title: string;
  description?: string;
}

export default function Component({ title, description }: ComponentProps) {
  // ...
}
```

### Tailwind CSS 스타일링

- Utility-first 접근
- 반응형: `sm:`, `md:`, `lg:` 브레이크포인트 사용
- 다크모드: `dark:` 클래스 (추후 토글 구현 예정)
- 일관된 간격: Tailwind 기본 스케일 사용

### 파일 네이밍

- 컴포넌트: PascalCase (예: `Navbar.tsx`)
- 페이지: Next.js 규칙 (`page.tsx`, `layout.tsx`)
- 유틸리티: camelCase (예: `formatDate.ts`)

### 디렉토리 구조 규칙

```
components/
├── ui/           # 재사용 UI (Button, Card, Input 등)
├── layout/       # 레이아웃 (Navbar, Footer)
└── tools/        # 도구별 컴포넌트 (ToolHeader, ToolInput 등)

lib/
└── converters/   # 변환 로직 (timestamp, base64 등)
```

## 디자인 시스템

### 컬러 팔레트

```css
/* 배경 */
bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900

/* 프라이머리 */
bg-blue-600 hover:bg-blue-700

/* 세컨더리 */
bg-gray-700 hover:bg-gray-600

/* 텍스트 */
text-white        # 메인 텍스트
text-gray-300     # 서브 텍스트
text-gray-400     # 설명 텍스트
text-gray-500     # 푸터 텍스트

/* 경계선 */
border-gray-700

/* 상태 */
bg-blue-600/20 border-blue-600/50 text-blue-400  # Coming Soon
```

### 타이포그래피

```css
/* 헤딩 */
text-5xl sm:text-7xl font-bold    # H1 (메인 타이틀)
text-4xl sm:text-5xl font-bold    # H1 (서브 페이지)
text-2xl font-bold                # H2 (섹션 타이틀)
text-xl font-semibold             # H3 (카드 타이틀)

/* 본문 */
text-xl sm:text-2xl               # 큰 설명
text-gray-300                     # 일반 텍스트
text-gray-400 text-sm             # 작은 설명
```

## 도구 구현 가이드

### 도구 개발 원칙

1. **클라이언트 사이드 우선**: 가능한 모든 처리를 브라우저에서
2. **즉각적인 피드백**: 입력 즉시 결과 표시
3. **에러 핸들링**: 명확한 에러 메시지와 예시
4. **복사 기능**: 결과를 클립보드에 쉽게 복사
5. **URL 공유**: 결과를 URL 파라미터로 공유 가능

### 도구 페이지 구조

```typescript
// app/tools/[tool-name]/page.tsx
'use client';

import { useState } from 'react';

export default function ToolPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleConvert = (value: string) => {
    // 변환 로직
    setOutput(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Tool Header */}
        <h1>도구명</h1>

        {/* Input Section */}
        <textarea onChange={(e) => handleConvert(e.target.value)} />

        {/* Output Section */}
        <div>{output}</div>

        {/* Copy Button */}
        <button onClick={() => navigator.clipboard.writeText(output)}>
          복사
        </button>
      </main>
    </div>
  );
}
```

## 개발 명령어

```bash
# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# ESLint 실행
npm run lint
```

## 배포 프로세스

### Cloudflare Pages 배포

1. GitHub 저장소에 push
2. Cloudflare Pages가 자동으로 감지하여 빌드
3. 빌드 설정:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Node version: 20

### 도메인 연결

- Cloudflare Pages Custom domains에서 설정
- DNS 자동 설정
- SSL 자동 발급

자세한 내용은 `DEPLOY.md` 참조

## 개발 워크플로우

DevHub는 **GitHub Flow**를 사용합니다. 자세한 내용은 `WORKFLOW.md` 참조

### 기본 흐름

```bash
# 1. 이슈 생성
gh issue create --title "기능명"

# 2. 브랜치 생성
git checkout -b feature/기능명-#이슈번호

# 3. 개발 및 커밋
git add .
git commit -m "feat: 기능 설명"

# 4. PR 생성 및 병합
git push origin feature/기능명-#이슈번호
gh pr create --title "기능명" --body "Closes #이슈번호"
gh pr merge --squash
```

## 중요 참고 사항

### 작업 시 주의사항

1. **파일 수정 전 Read 필수**
   - 항상 기존 파일을 읽고 이해한 후 수정

2. **일관된 스타일**
   - 기존 코드 스타일과 일치하도록 작성
   - Tailwind 클래스 순서 일관성 유지

3. **반응형 우선**
   - 모든 컴포넌트는 모바일부터 설계
   - `sm:`, `md:`, `lg:` 브레이크포인트 활용

4. **성능 고려**
   - 이미지는 Next.js Image 컴포넌트 사용
   - 도구는 클라이언트 사이드 처리

5. **접근성**
   - 시맨틱 HTML 사용
   - ARIA 레이블 추가
   - 키보드 내비게이션 지원

6. **보안 & 프라이버시**
   - 모든 변환은 브라우저에서 처리 (서버 전송 없음)
   - 민감한 데이터는 저장하지 않음

### Git 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
perf: 성능 개선
test: 테스트 추가
chore: 빌드/설정 변경
```

## 자주 사용하는 패턴

### 페이지 템플릿

```typescript
export default function PageName() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* 콘텐츠 */}
      </main>
    </div>
  );
}
```

### 카드 컴포넌트 스타일

```typescript
<div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
  {/* 카드 내용 */}
</div>
```

### 버튼 스타일

```typescript
// Primary
<button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">

// Secondary
<button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors">
```

## 빠른 시작 체크리스트

새 세션에서 작업 시작 시:

- [ ] `PROJECT.md` 읽고 현재 Phase 확인
- [ ] `npm run dev`로 개발 서버 실행
- [ ] 기존 파일 구조 파악 (`app/`, `components/`)
- [ ] 작업할 기능이 로드맵에 있는지 확인
- [ ] 기존 컴포넌트 스타일 참고
- [ ] WORKFLOW.md에 따라 이슈 생성 및 브랜치 작업

## 도움이 필요할 때

- **프로젝트 전체 구조**: `PROJECT.md` 참조
- **배포 관련**: `DEPLOY.md` 참조
- **개발 워크플로우**: `WORKFLOW.md` 참조
- **현재 진행 상황**: Git log 확인
- **디자인 가이드**: 이 파일의 "디자인 시스템" 섹션

## 추가 참고 자료

- [Next.js 15 문서](https://nextjs.org/docs)
- [Tailwind CSS 4 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
- [Cloudflare Pages 가이드](https://developers.cloudflare.com/pages/)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) (해시 생성용)

---

**마지막 업데이트**: 2025-10-02
**현재 상태**: Phase 2 진행 중 (About, Tools 완료, Contact 진행 예정)
**다음 작업**: Contact 페이지 및 Phase 3 유틸리티 도구 구현
