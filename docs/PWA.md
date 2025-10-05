# PWA (Progressive Web App) 가이드

DevHub는 Progressive Web App(PWA)을 지원하여 네이티브 앱처럼 설치하고 오프라인에서도 사용할 수 있습니다.

## 📋 목차

- [PWA란?](#pwa란)
- [주요 기능](#주요-기능)
- [설치 방법](#설치-방법)
- [오프라인 지원](#오프라인-지원)
- [업데이트](#업데이트)
- [기술 세부사항](#기술-세부사항)
- [문제 해결](#문제-해결)

## PWA란?

Progressive Web App(PWA)는 웹 기술로 만들어진 애플리케이션을 네이티브 앱처럼 사용할 수 있게 해주는 기술입니다.

### 주요 장점

- **설치 가능**: 홈 화면에 추가하여 앱처럼 사용
- **오프라인 지원**: 인터넷 연결 없이도 기본 기능 사용
- **빠른 로딩**: 캐싱을 통한 즉각적인 로딩
- **자동 업데이트**: 백그라운드에서 자동으로 최신 버전 유지
- **네이티브 경험**: 전체 화면 모드, 알림 등 네이티브 앱 같은 UX

## 주요 기능

### ✅ 구현된 기능

1. **앱 설치**
   - 브라우저에서 홈 화면에 추가 가능
   - 독립 실행형 앱처럼 동작

2. **오프라인 캐싱**
   - 정적 페이지 자동 캐싱
   - 네트워크 우선 전략으로 최신 콘텐츠 제공

3. **Service Worker**
   - 백그라운드 캐싱 및 업데이트
   - 오프라인 폴백 페이지

4. **반응형 아이콘**
   - 다양한 크기의 아이콘 지원 (192x192, 512x512)
   - SVG 기반 벡터 아이콘

## 설치 방법

### Chrome (Desktop)

1. DevHub 웹사이트 방문
2. 주소창 오른쪽의 **설치** 아이콘(⊕) 클릭
3. "설치" 버튼 클릭
4. 설치 완료 후 독립 창에서 실행

### Chrome (Android)

1. DevHub 웹사이트 방문
2. 하단에 나타나는 "홈 화면에 추가" 배너 탭
3. 또는 메뉴(⋮) → "홈 화면에 추가" 선택
4. "추가" 버튼 탭

### Safari (iOS)

1. DevHub 웹사이트 방문
2. 공유 버튼(□↑) 탭
3. "홈 화면에 추가" 선택
4. "추가" 버튼 탭

### Edge (Desktop)

1. DevHub 웹사이트 방문
2. 주소창 오른쪽의 **앱** 아이콘 클릭
3. "설치" 버튼 클릭
4. 설치 완료

## 오프라인 지원

### 캐싱 전략

DevHub는 **캐시 우선, 네트워크 폴백** 전략을 사용합니다:

1. **정적 자산 캐싱**
   - HTML, CSS, JavaScript 파일
   - 이미지, 폰트 등 정적 리소스

2. **페이지 캐싱**
   ```
   / (홈페이지)
   /about (소개)
   /tools (도구 목록)
   /tools/base64
   /tools/json
   /tools/hash
   /tools/jwt
   /tools/timestamp
   /tools/uuid
   /tools/url
   /tools/color
   /tools/markdown
   /tools/regex
   ```

3. **런타임 캐싱**
   - 방문한 페이지는 자동으로 캐시
   - 다음 방문 시 빠른 로딩

### 오프라인 동작

- **온라인**: 최신 콘텐츠 표시
- **오프라인**:
  - 캐시된 페이지 표시
  - 미캐시 페이지는 오프라인 안내 페이지 표시
  - 모든 도구 기능은 클라이언트 사이드에서 동작

## 업데이트

### 자동 업데이트

1. Service Worker가 백그라운드에서 업데이트 확인
2. 새 버전 감지 시 자동 다운로드
3. 업데이트 알림 표시:
   ```
   새로운 버전이 있습니다. 업데이트하시겠습니까?
   ```
4. 확인 시 새 버전 적용 및 페이지 새로고침

### 수동 업데이트

- 브라우저 캐시 지우기
- Service Worker 재등록
- 앱 재설치

## 기술 세부사항

### 파일 구조

```
devhub/
├── app/
│   └── manifest.ts              # PWA 매니페스트 설정
├── components/
│   └── pwa/
│       └── ServiceWorkerRegistration.tsx  # SW 등록 컴포넌트
├── public/
│   ├── sw.js                    # Service Worker
│   ├── offline.html             # 오프라인 폴백 페이지
│   ├── icon.svg                 # 앱 아이콘
│   ├── icon-192.svg             # 192x192 아이콘
│   └── icon-512.svg             # 512x512 아이콘
└── docs/
    └── PWA.md                   # 이 문서
```

### Manifest 설정

```typescript
// app/manifest.ts
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevHub - Developer Utilities',
    short_name: 'DevHub',
    description: '개발자 생산성을 위한 온라인 유틸리티 도구 모음',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827',
    theme_color: '#3b82f6',
    icons: [
      // SVG 아이콘 설정
    ],
  };
}
```

### Service Worker 라이프사이클

1. **Install**
   - 정적 자산 캐싱
   - `skipWaiting()` 호출

2. **Activate**
   - 이전 캐시 삭제
   - `clients.claim()` 호출

3. **Fetch**
   - 캐시 확인
   - 네트워크 요청
   - 캐시 업데이트
   - 오프라인 폴백

### 캐시 버전 관리

```javascript
const CACHE_NAME = 'devhub-v1';
const RUNTIME_CACHE = 'devhub-runtime';
```

새 버전 배포 시 `CACHE_NAME`을 업데이트하여 캐시 갱신

## 문제 해결

### 앱이 설치되지 않습니다

**원인**:
- HTTPS 연결이 아닐 수 있습니다
- manifest.json이 올바르지 않을 수 있습니다
- Service Worker 등록 실패

**해결 방법**:
1. HTTPS 연결 확인
2. 브라우저 콘솔에서 에러 확인
3. DevTools → Application → Manifest 확인
4. DevTools → Application → Service Workers 확인

### 오프라인에서 작동하지 않습니다

**원인**:
- Service Worker가 등록되지 않았을 수 있습니다
- 페이지가 캐시되지 않았을 수 있습니다

**해결 방법**:
1. 먼저 온라인 상태에서 페이지 방문 (캐시 생성)
2. DevTools → Application → Service Workers에서 SW 상태 확인
3. DevTools → Application → Cache Storage에서 캐시 확인

### 업데이트가 적용되지 않습니다

**원인**:
- Service Worker가 이전 버전을 캐싱하고 있을 수 있습니다

**해결 방법**:
1. DevTools → Application → Service Workers → "Update on reload" 체크
2. 하드 리프레시 (Ctrl+Shift+R 또는 Cmd+Shift+R)
3. Service Worker 등록 해제 후 재등록:
   ```javascript
   navigator.serviceWorker.getRegistrations()
     .then(registrations => {
       registrations.forEach(reg => reg.unregister());
     });
   ```

### 앱 아이콘이 표시되지 않습니다

**원인**:
- 아이콘 파일 경로가 잘못되었을 수 있습니다
- 아이콘 크기가 요구사항에 맞지 않을 수 있습니다

**해결 방법**:
1. public/ 폴더에 icon-192.svg, icon-512.svg 파일 확인
2. manifest.ts의 icons 배열 확인
3. 브라우저 캐시 지우기

## 개발자 가이드

### Service Worker 디버깅

```javascript
// Chrome DevTools
1. F12 → Application → Service Workers
2. "Update on reload" 체크
3. "Bypass for network" 테스트

// Console 로그
[PWA] Service Worker registered: /
[PWA] New content available, please refresh.
```

### 캐시 전략 변경

```javascript
// public/sw.js
// 캐시 우선 전략
caches.match(request).then(...)

// 네트워크 우선 전략
fetch(request).then(...).catch(() => caches.match(request))
```

### 새 페이지 캐싱 추가

```javascript
// public/sw.js
const STATIC_ASSETS = [
  // ... 기존 페이지
  '/new-page',  // 새 페이지 추가
];
```

## 참고 자료

- [PWA 공식 문서](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Workbox (Google)](https://developers.google.com/web/tools/workbox)
- [PWA Builder](https://www.pwabuilder.com/)

---

**문서 버전**: 1.0.0
**최종 업데이트**: 2025-10-05
**관련 이슈**: #54
