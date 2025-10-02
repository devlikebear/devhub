# DevHub - Claude Code 프로젝트 컨텍스트

## 프로젝트 개요

**DevHub**는 개발자를 위한 포트폴리오 & 블로그 플랫폼입니다.

- **프로젝트명**: devhub
- **타입**: 개발자 포트폴리오 웹사이트
- **호스팅**: Cloudflare Pages (무료)
- **도메인**: Cloudflare 관리 (사용자 소유)
- **현재 상태**: Phase 1 완료 (기본 구조 및 랜딩 페이지)

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
│   ├── page.tsx           # 홈 페이지 (현재 구현됨)
│   └── globals.css        # 글로벌 스타일
├── components/            # 재사용 컴포넌트 (예정)
├── lib/                  # 유틸리티 함수 (예정)
├── public/               # 정적 파일
├── .claude/              # Claude Code 설정
├── DEPLOY.md            # 배포 가이드
├── PROJECT.md           # 상세 기획서
├── package.json         # 의존성
└── tailwind.config.ts   # Tailwind 설정
```

## 현재 구현된 기능

### ✅ 완료된 작업

1. **프로젝트 초기화**
   - Next.js 15 + TypeScript 설정
   - Tailwind CSS 4 통합
   - ESLint 설정
   - Git 저장소 초기화

2. **랜딩 페이지** (`app/page.tsx`)
   - 다크 테마 그라데이션 배경
   - "DevHub" 메인 타이틀
   - 2개 CTA 버튼 (프로젝트 보기, 연락하기)
   - 3개 기능 카드 (성능, 디자인, 배포)
   - 반응형 디자인 (모바일/데스크톱)
   - 하단 푸터

3. **문서화**
   - DEPLOY.md: Cloudflare Pages 배포 가이드
   - PROJECT.md: 상세 프로젝트 기획서
   - CLAUDE.md: 이 파일

## 다음 구현 예정 (Phase 2)

### 우선순위 높음

1. **레이아웃 컴포넌트**
   - `components/layout/Navbar.tsx` - 네비게이션 바
   - `components/layout/Footer.tsx` - 푸터 컴포넌트
   - 반응형 모바일 메뉴

2. **핵심 페이지**
   - `app/about/page.tsx` - 소개 페이지
   - `app/projects/page.tsx` - 프로젝트 목록
   - `app/contact/page.tsx` - 연락처

3. **UI 컴포넌트**
   - Button 컴포넌트
   - Card 컴포넌트
   - 재사용 가능한 섹션 레이아웃

### 중간 우선순위

4. **블로그 시스템** (Phase 3)
   - MDX 설정
   - 블로그 리스트 페이지
   - 블로그 상세 페이지
   - 카테고리/태그 필터링

5. **SEO & 최적화** (Phase 4)
   - 메타 태그 설정
   - sitemap.xml
   - robots.txt
   - Open Graph 이미지

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
├── layout/       # 레이아웃 (Navbar, Footer, Sidebar)
└── features/     # 기능별 (ProjectCard, BlogPost 등)
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
```

### 타이포그래피

```css
/* 헤딩 */
text-5xl sm:text-7xl font-bold    # H1 (메인 타이틀)
text-xl sm:text-2xl               # H2 (서브 타이틀)
text-xl font-semibold             # H3 (카드 타이틀)

/* 본문 */
text-gray-400                     # 일반 텍스트
text-sm                           # 작은 텍스트
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
   - 동적 import로 코드 스플리팅

5. **접근성**
   - 시맨틱 HTML 사용
   - ARIA 레이블 추가
   - 키보드 내비게이션 지원

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* 콘텐츠 */}
      </main>
    </div>
  );
}
```

### 카드 컴포넌트 스타일

```typescript
<div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
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

## 도움이 필요할 때

- **프로젝트 전체 구조**: `PROJECT.md` 참조
- **배포 관련**: `DEPLOY.md` 참조
- **현재 진행 상황**: Git log 확인
- **디자인 가이드**: 이 파일의 "디자인 시스템" 섹션

## 추가 참고 자료

- [Next.js 15 문서](https://nextjs.org/docs)
- [Tailwind CSS 4 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
- [Cloudflare Pages 가이드](https://developers.cloudflare.com/pages/)

---

**마지막 업데이트**: 2025-10-01
**현재 상태**: Phase 1 완료, 개발 서버 실행 중
**다음 작업**: Navigation Bar 및 핵심 페이지 구현
