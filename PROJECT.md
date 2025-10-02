# DevHub - 개발자 포트폴리오 & 블로그 플랫폼

## 📋 프로젝트 개요

### 목적
개발자를 위한 포트폴리오 및 블로그 웹사이트. 프로젝트 소개, 기술 블로그, 개발 경험을 공유하는 개인 플랫폼.

### 핵심 가치
- ⚡ **빠른 성능**: Next.js SSG/SSR + Cloudflare Pages CDN
- 🎨 **모던 디자인**: Tailwind CSS 기반 깔끔한 UI/UX
- 📱 **반응형**: 모바일/태블릿/데스크톱 완벽 대응
- 🚀 **쉬운 배포**: Git push만으로 자동 배포
- 🆓 **무료 호스팅**: Cloudflare Pages 무제한 bandwidth

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
│   ├── about/             # 소개 페이지
│   ├── projects/          # 프로젝트 목록
│   ├── blog/              # 블로그
│   └── contact/           # 연락처
├── components/            # 재사용 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── features/         # 기능별 컴포넌트
├── lib/                  # 유틸리티
├── public/               # 정적 파일
├── styles/               # 글로벌 스타일
└── content/              # 블로그 콘텐츠 (MDX)
```

## 🎯 주요 기능 (로드맵)

### Phase 1: 기본 구조 ✅
- [x] Next.js 프로젝트 초기 설정
- [x] Tailwind CSS 설정
- [x] 랜딩 페이지 구현
- [x] Git 저장소 초기화
- [x] 배포 가이드 작성

### Phase 2: 핵심 페이지 (진행 예정)
- [ ] Navigation Bar 컴포넌트 [#1](https://github.com/devlikebear/devhub/issues/1)
- [ ] Footer 컴포넌트 [#2](https://github.com/devlikebear/devhub/issues/2)
- [ ] About (소개) 페이지 [#3](https://github.com/devlikebear/devhub/issues/3)
- [ ] Projects (프로젝트) 페이지 [#4](https://github.com/devlikebear/devhub/issues/4)
- [ ] Contact (연락처) 페이지 [#5](https://github.com/devlikebear/devhub/issues/5)

### Phase 3: 블로그 시스템
- [ ] MDX 블로그 설정
- [ ] 블로그 리스트 페이지
- [ ] 블로그 상세 페이지
- [ ] 카테고리/태그 시스템
- [ ] 검색 기능

### Phase 4: 개선 & 최적화
- [ ] SEO 최적화 (메타 태그, sitemap)
- [ ] Open Graph 이미지
- [ ] 다크모드 토글
- [ ] 애니메이션 효과
- [ ] 성능 최적화 (이미지, 폰트)

### Phase 5: 추가 기능
- [ ] RSS Feed
- [ ] 방문자 통계 (Cloudflare Analytics)
- [ ] 댓글 시스템 (Giscus)
- [ ] 프로젝트 필터링/정렬
- [ ] 블로그 구독 기능

## 🎨 디자인 시스템

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
```

### 타이포그래피
- Heading: 5xl/7xl (모바일/데스크톱)
- Body: xl/2xl
- Small: sm/base

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

### Lighthouse 점수
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔒 보안 & 프라이버시

- HTTPS 기본 적용 (Cloudflare SSL)
- No tracking/analytics (또는 프라이버시 중심)
- 환경 변수 관리 (.env.local)
- 의존성 보안 업데이트 (Dependabot)

## 📝 콘텐츠 관리

### 블로그 작성
- Markdown/MDX 파일로 작성
- Frontmatter 메타데이터
- 로컬에서 작성 후 Git commit

### 프로젝트 추가
- JSON 또는 TypeScript 파일로 관리
- 이미지는 `/public/projects/` 저장
- GitHub 링크, 라이브 데모 링크 포함

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

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Cloudflare Pages 가이드](https://developers.cloudflare.com/pages/)
- [MDX 문서](https://mdxjs.com/)

## 📞 문의

프로젝트 관련 문의나 제안은 GitHub Issues를 통해 부탁드립니다.

---

**마지막 업데이트**: 2025-10-02
**프로젝트 상태**: Phase 1 완료, Phase 2 진행 중 (이슈 #1-5 생성됨)
