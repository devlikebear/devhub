# DevHub - 개발자 유틸리티 플랫폼

## 📋 프로젝트 개요

### 목적
개발자 생산성 향상을 위한 온라인 유틸리티 도구 모음. 자주 사용하는 변환, 포맷팅, 검증 도구를 웹에서 빠르게 이용할 수 있는 플랫폼.

### 핵심 가치
- ⚡ **빠른 성능**: Next.js SSG/SSR + Cloudflare Pages CDN
- 🛠️ **실용적 도구**: 개발 중 자주 필요한 유틸리티 제공
- 🎨 **모던 디자인**: Tailwind CSS 기반 깔끔한 UI/UX
- 📱 **반응형**: 모바일/태블릿/데스크톱 완벽 대응
- 🆓 **무료 & 오픈소스**: 광고 없이 무료로 사용

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons (예정)

### Infrastructure
- **Hosting**: Cloudflare Pages
- **Domain**: Cloudflare 관리
- **CDN**: Cloudflare Edge Network (275+ cities)
- **SSL**: 자동 발급 (Let's Encrypt)

### Development
- **Package Manager**: npm
- **Linter**: ESLint
- **Version Control**: Git + GitHub

## 📁 프로젝트 구조

```
devhub/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 (랜딩)
│   ├── tools/             # 유틸리티 도구들
│   │   ├── timestamp/     # Epoch 타임스탬프 변환
│   │   ├── base64/        # Base64 인코딩/디코딩
│   │   ├── json/          # JSON 포맷터/검증
│   │   ├── color/         # 색상 변환 & 팔레트
│   │   ├── uuid/          # UUID 생성기
│   │   ├── hash/          # 해시 생성기
│   │   ├── regex/         # 정규표현식 테스터
│   │   └── markdown/      # Markdown 프리뷰
│   ├── about/             # 소개 페이지
│   └── contact/           # 연락처
├── components/            # 재사용 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── tools/            # 도구별 컴포넌트
├── lib/                  # 유틸리티 함수
│   └── converters/       # 변환 로직
├── public/               # 정적 파일
└── styles/               # 글로벌 스타일
```

## 🎯 주요 기능 (로드맵)

### Phase 1: 기본 구조 ✅
- [x] Next.js 프로젝트 초기 설정
- [x] Tailwind CSS 설정
- [x] 랜딩 페이지 구현
- [x] Git 저장소 초기화
- [x] 배포 가이드 작성

### Phase 2: 핵심 페이지 ✅
- [x] Navigation Bar 컴포넌트 [#1](https://github.com/devlikebear/devhub/issues/1)
- [x] Footer 컴포넌트 [#2](https://github.com/devlikebear/devhub/issues/2)
- [x] About (소개) 페이지 [#3](https://github.com/devlikebear/devhub/issues/3)
- [x] Tools 목록 페이지 (구현 완료, #4 대체)
- [x] Contact (연락처) 페이지 [#5](https://github.com/devlikebear/devhub/issues/5)

### Phase 3: 유틸리티 도구 구현 ✅
#### 우선순위 높음 (필수 도구)
- [x] **Timestamp Converter**: Epoch ↔ 날짜/시간 변환 [#11](https://github.com/devlikebear/devhub/issues/11)
- [x] **Base64 Encoder/Decoder**: 문자열 ↔ Base64 변환 [#12](https://github.com/devlikebear/devhub/issues/12)
- [x] **JSON Formatter**: JSON 포맷팅, 검증, 압축 [#13](https://github.com/devlikebear/devhub/issues/13)
- [x] **Color Tool**: HEX ↔ RGB ↔ HSL 변환, 색상 팔레트 생성 [#14](https://github.com/devlikebear/devhub/issues/14)
- [x] **UUID Generator**: UUID v4 생성기 [#15](https://github.com/devlikebear/devhub/issues/15)

### Phase 4: 추가 유틸리티 도구
#### 우선순위 중간
- [x] **Hash Generator**: MD5, SHA-1, SHA-256 해시 생성 [#23](https://github.com/devlikebear/devhub/issues/23)
- [x] **Regex Tester**: 정규표현식 테스트 & 매칭 결과 [#24](https://github.com/devlikebear/devhub/issues/24)
- [x] **Markdown Preview**: 실시간 마크다운 미리보기 [#25](https://github.com/devlikebear/devhub/issues/25)
- [x] **URL Encoder/Decoder**: URL 인코딩/디코딩 [#26](https://github.com/devlikebear/devhub/issues/26)
- [x] **JWT Decoder**: JWT 토큰 디코딩 & 검증 [#27](https://github.com/devlikebear/devhub/issues/27)

#### 추가 도구 (향후 확장)
- [ ] Diff Checker: 텍스트 비교
- [ ] QR Code Generator: QR 코드 생성
- [ ] Cron Expression Helper: Cron 표현식 생성/해석
- [ ] Lorem Ipsum Generator: 더미 텍스트 생성
- [ ] Image Converter: 이미지 포맷 변환

### Phase 5: 개선 & 최적화
- [x] SEO 최적화 (메타 태그, sitemap) [#33](https://github.com/devlikebear/devhub/issues/33)
- [x] Open Graph 이미지 [#34](https://github.com/devlikebear/devhub/issues/34)
- [x] 다국어 지원 (한국어/영어) [#35](https://github.com/devlikebear/devhub/issues/35)
- [x] 최신 유행하는 모던한 디자인 적용 [#36](https://github.com/devlikebear/devhub/issues/36)
  - [x] Glassmorphism UI 컴포넌트 구현 (카드, 버튼, 입력 필드)
  - [x] 인터랙티브 애니메이션 및 마이크로 인터랙션 추가
  - [x] 컬러 시스템 현대화 (Bold & Vibrant palette)
  - [x] 레이아웃 개선 및 반응형 최적화
  - [x] 전체 페이지 디자인 검증 및 테스트
- [x] 다크모드 토글 [#37](https://github.com/devlikebear/devhub/issues/37)
- [ ] 애니메이션 효과 [#38](https://github.com/devlikebear/devhub/issues/38)
- [ ] 성능 최적화 (이미지, 폰트) [#39](https://github.com/devlikebear/devhub/issues/39)
- [ ] 즐겨찾기/최근 사용 도구 기능 [#40](https://github.com/devlikebear/devhub/issues/40)
- [ ] 도구별 사용 가이드 [#41](https://github.com/devlikebear/devhub/issues/41)

### Phase 6: 추가 기능
- [x] 도구 검색 기능
- [ ] 키보드 단축키 지원
- [ ] 방문자 통계 (Cloudflare Analytics)
- [ ] PWA 지원 (오프라인 사용)
- [ ] 결과 공유 기능 (URL 파라미터)

## 🎨 디자인 시스템

### 2025 모던 디자인 트렌드 적용 전략

#### 핵심 트렌드
1. **Glassmorphism** (최우선)
   - 반투명 유리 효과 (frosted glass)
   - `backdrop-blur`, `bg-opacity`, 미묘한 border
   - SaaS 플랫폼에 최적화된 미래지향적 디자인

2. **Bold & Vibrant Colors**
   - 뮤트 톤 → 생동감 있는 컬러 전환
   - 개성과 에너지를 표현하는 인터페이스

3. **Interactive Elements**
   - 마이크로 애니메이션 (hover, ripple, loading)
   - 사용자 행동을 유도하는 인터랙션

4. **Modern Layout**
   - Bento Grid 스타일 (정돈된 레이아웃)
   - 유연하고 반응형 디자인

#### 구현 계획

**Phase 1: Glassmorphism UI 컴포넌트**
```tsx
// 도구 카드
backdrop-blur-xl bg-white/5 border-white/10

// 입력 필드 & 결과 영역
backdrop-blur-md bg-white/10
shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
border border-white/18

// 버튼
bg-gradient-to-r from-blue-500/90 to-purple-500/90
backdrop-blur-md hover:shadow-lg
```

**Phase 2: 컬러 시스템 현대화**
```css
/* 기존 */
- Background: gradient (gray-900 → gray-800 → gray-900)
- Primary: blue-600
- Secondary: gray-700
- Text: white, gray-300, gray-400, gray-500
- Border: gray-700

/* 새로운 (Bold & Vibrant) */
- Primary Gradient: blue-500 → purple-600
- Accent Colors: pink-500, cyan-500 (도구별 구분)
- Background: gradient with vibrant hints
- Text: high contrast white + colorful highlights
- Glass Effects: white/5, white/10, white/18
```

**Phase 3: 인터랙티브 애니메이션**
- 카드 hover: scale + glow 효과
- 버튼 클릭: ripple 애니메이션
- 페이지 전환: fade 효과
- 입력 필드 focus: border glow
- 결과 복사: 성공 피드백 애니메이션

**Phase 4: 레이아웃 개선**
- Tools 페이지: Bento Grid 스타일
- 다양한 카드 크기 (주요 도구 강조)
- 반응형 그리드 (mobile: 1열, tablet: 2열, desktop: 3열)

### 컬러 팔레트
```css
/* 현재 사용 중 */
- Background: gradient (gray-900 → gray-800 → gray-900)
- Primary: blue-600 (CTA 버튼)
- Secondary: gray-700 (보조 버튼)
- Text: white, gray-300, gray-400, gray-500
- Border: gray-700

/* 확장 예정 */
- Accent: 추가 색상 정의 필요
- Success/Error/Warning: 상태별 색상
- Tool Card: 도구별 구분 색상
```

### 타이포그래피
- Heading: 5xl/7xl (모바일/데스크톱)
- Body: xl/2xl
- Small: sm/base
- Code: Monospace font (도구 결과 표시용)

### 간격 시스템
- Tailwind 기본 스케일 사용 (4px 단위)
- 주요 간격: 4, 6, 8, 12, 16, 20, 24

## 🚀 배포 프로세스

### 로컬 개발
```bash
npm run dev        # 개발 서버 (http://localhost:3000)
npm run build      # 프로덕션 빌드
npm start          # 프로덕션 서버
npm run lint       # ESLint 실행
```

### 자동 배포
1. `main` 브랜치에 push
2. Cloudflare Pages 자동 빌드
3. 2-3분 내 배포 완료
4. 프리뷰 URL 생성

### 배포 환경
- **Production**: `main` 브랜치 → 커스텀 도메인
- **Preview**: PR/브랜치 → `*.pages.dev`

## 📊 성능 목표

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 번들 사이즈
- Initial Load: < 100KB (gzipped)
- Total Size: < 500KB
- Tool 페이지: < 50KB (각 도구별)

### Lighthouse 점수
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔒 보안 & 프라이버시

- HTTPS 기본 적용 (Cloudflare SSL)
- **클라이언트 사이드 처리**: 모든 변환은 브라우저에서 실행 (서버 전송 없음)
- No tracking/analytics (프라이버시 중심)
- 환경 변수 관리 (.env.local)
- 의존성 보안 업데이트 (Dependabot)

## 🛠️ 도구 구현 가이드

### 도구 개발 원칙
1. **클라이언트 사이드 우선**: 가능한 모든 처리를 브라우저에서
2. **즉각적인 피드백**: 입력 즉시 결과 표시
3. **에러 핸들링**: 명확한 에러 메시지와 예시
4. **복사 기능**: 결과를 클립보드에 쉽게 복사
5. **URL 공유**: 결과를 URL 파라미터로 공유 가능

### 도구 페이지 구조
```typescript
// app/tools/[tool-name]/page.tsx
export default function ToolPage() {
  return (
    <div>
      <ToolHeader title="도구명" description="설명" />
      <ToolInput onInputChange={handleInput} />
      <ToolOutput result={result} />
      <ToolGuide examples={examples} />
    </div>
  );
}
```

## 🤝 기여 가이드

### 개발 워크플로우
1. 기능별 브랜치 생성
2. 로컬에서 개발/테스트
3. PR 생성 → 프리뷰 확인
4. 리뷰 후 main 병합

### 커밋 컨벤션
```
feat: 새 기능
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 (포맷팅)
refactor: 리팩토링
test: 테스트 추가
chore: 빌드/설정 변경
```

### 새 도구 추가 시
1. `app/tools/[도구명]/page.tsx` 생성
2. 필요한 변환 로직을 `lib/converters/` 에 추가
3. 도구 목록 페이지에 카드 추가
4. 테스트 케이스 작성
5. 사용 가이드 작성

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Cloudflare Pages 가이드](https://developers.cloudflare.com/pages/)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) (해시 생성용)

## 📞 문의

프로젝트 관련 문의나 제안은 GitHub Issues를 통해 부탁드립니다.

---

**마지막 업데이트**: 2025-10-03
**프로젝트 상태**: Phase 3 완료 (5개 핵심 도구 구현), Phase 4 준비 중
