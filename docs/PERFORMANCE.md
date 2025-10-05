# DevHub 성능 최적화 가이드

## 개요

DevHub는 Cloudflare Pages를 사용한 정적 사이트로, 성능 최적화를 위해 다양한 전략을 적용하고 있습니다.

## 폰트 최적화

### Next.js Font Optimization

- **사용 폰트**: Google Fonts의 Inter
- **최적화 방식**: `next/font/google`를 통한 자동 최적화
- **설정**: `display: "swap"` - 폰트 로딩 중에도 텍스트 표시 (FOUT 방지)

```typescript
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
```

### 주요 이점

1. **자동 서브셋팅**: 필요한 문자만 포함하여 파일 크기 감소
2. **자가 호스팅**: Google Fonts를 자동으로 다운로드하여 self-host
3. **제로 레이아웃 시프트**: 폰트 로딩 중에도 레이아웃 변경 없음
4. **프리로드**: 중요한 폰트 파일 자동 프리로드

## 이미지 최적화

### Static Export 제약사항

DevHub는 `output: 'export'` 설정을 사용하므로 Next.js Image Optimization API를 사용할 수 없습니다.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Static export 필수 설정
  },
};
```

### 최적화 전략

#### 1. 이미지 포맷 선택

- **SVG 우선 사용**: 아이콘과 로고는 SVG 사용 (확장 가능, 용량 작음)
- **WebP 사용**: 래스터 이미지는 WebP 포맷 사용
- **대체 포맷**: WebP를 지원하지 않는 브라우저를 위한 PNG/JPG fallback

#### 2. 이미지 크기 최적화

- **적절한 해상도**: 실제 표시 크기의 2배 이상 사용 (Retina 디스플레이 대응)
- **압축**: 온라인 도구를 사용한 무손실/손실 압축
  - SVG: [SVGO](https://jakearchibald.github.io/svgomg/)
  - WebP/PNG: [Squoosh](https://squoosh.app/)
  - Batch 처리: [ImageOptim](https://imageoptim.com/)

#### 3. 지연 로딩

HTML native lazy loading 사용:

```html
<img src="/image.webp" alt="Description" loading="lazy" />
```

#### 4. Cloudflare Images (선택사항)

추후 이미지가 많아지면 Cloudflare Images 서비스 고려:
- 자동 포맷 변환 (WebP, AVIF)
- 리사이징 및 최적화
- CDN 캐싱

## 번들 크기 최적화

### 현재 번들 분석

```
Route (app)                              Size     First Load JS
├ ○ /                                    1.68 kB  116 kB
├ ○ /tools/hash                          3.59 kB  125 kB
├ ○ /tools/jwt                           3.39 kB  125 kB
└ Shared by all                          102 kB
```

### 최적화 전략

1. **Tree Shaking**: 사용하지 않는 코드 자동 제거 (Next.js 기본 제공)
2. **코드 스플리팅**: 페이지별 자동 코드 분리 (Next.js App Router 기본)
3. **Dynamic Import**: 필요한 경우 동적 import 사용

```typescript
// 예: 대용량 라이브러리 동적 로드
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

## 성능 측정

### Lighthouse 권장 지표

- **Performance**: 90+ (목표)
- **Accessibility**: 95+ (목표)
- **Best Practices**: 95+ (목표)
- **SEO**: 100 (목표)

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5초
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 측정 도구

1. **Chrome DevTools Lighthouse**
   ```bash
   # Chrome DevTools > Lighthouse 탭에서 실행
   ```

2. **WebPageTest**
   - URL: https://www.webpagetest.org/

3. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/

## Cloudflare Pages 최적화

### 자동 최적화 기능

Cloudflare Pages는 다음 최적화를 자동으로 적용합니다:

1. **Brotli 압축**: 텍스트 파일 자동 압축
2. **HTTP/3**: 최신 HTTP 프로토콜 사용
3. **Global CDN**: 전 세계 엣지 서버에서 콘텐츠 제공
4. **자동 캐싱**: 정적 파일 자동 캐싱

### 추가 최적화 옵션

`_headers` 파일을 통한 캐시 제어:

```
# public/_headers
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/api/*
  Cache-Control: no-cache
```

## 런타임 최적화

### React 최적화

1. **useMemo/useCallback**: 불필요한 재계산 방지
2. **React.memo**: 컴포넌트 메모이제이션
3. **가상화**: 긴 리스트는 react-window 등 사용 고려

### 클라이언트 사이드 처리

- 모든 도구는 클라이언트에서 처리 (서버 요청 없음)
- Web Crypto API 사용 (hash 생성)
- 브라우저 네이티브 API 우선 사용

## 체크리스트

새로운 기능 추가 시 확인사항:

- [ ] 이미지는 SVG 또는 WebP 포맷 사용
- [ ] 이미지에 `loading="lazy"` 적용
- [ ] 대용량 라이브러리는 동적 import 고려
- [ ] 빌드 후 번들 크기 확인 (`npm run build`)
- [ ] Lighthouse 점수 90+ 유지
- [ ] 모바일에서 성능 테스트

## 참고 자료

- [Next.js Performance Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Cloudflare Pages Performance](https://developers.cloudflare.com/pages/platform/serving-pages/)
- [Web Vitals](https://web.dev/vitals/)
- [Image Optimization Tools](https://web.dev/fast/#optimize-your-images)

---

**마지막 업데이트**: 2025-10-05
