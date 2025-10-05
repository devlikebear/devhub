# PWA 자동 업데이트 가이드

## 개요

DevHub PWA는 이제 자동으로 업데이트를 감지하고 사용자에게 알림을 표시합니다.

## 작동 방식

### 1. **Network-First 전략** (HTML 페이지)
- 온라인: 항상 최신 버전을 서버에서 가져옴
- 오프라인: 캐시된 버전 사용

### 2. **Cache-First + Background Update** (정적 리소스)
- JS, CSS, 이미지: 캐시 우선 사용하되 백그라운드에서 업데이트

### 3. **자동 업데이트 체크**
- 페이지 로드 시마다 업데이트 확인
- 1시간마다 자동으로 업데이트 확인

### 4. **사용자 알림**
- 새 버전 발견 시 우측 하단에 토스트 알림 표시
- "업데이트" 버튼 클릭 시 즉시 새 버전 적용
- "나중에" 버튼으로 알림 닫기 가능

## 배포 시 주의사항

### Service Worker 버전 업데이트

새 버전을 배포할 때마다 `/public/sw.js`의 `VERSION`을 업데이트하세요:

\`\`\`javascript
// public/sw.js
const VERSION = '1.0.2'; // ← 이 버전을 변경
\`\`\`

### 자동 버전 관리 (권장)

package.json 버전과 동기화하려면:

1. **빌드 스크립트 수정** (package.json):
\`\`\`json
{
  "scripts": {
    "prebuild": "node scripts/update-sw-version.js",
    "build": "next build"
  }
}
\`\`\`

2. **스크립트 생성** (scripts/update-sw-version.js):
\`\`\`javascript
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const swPath = path.join(__dirname, '../public/sw.js');

let swContent = fs.readFileSync(swPath, 'utf8');
swContent = swContent.replace(
  /const VERSION = '[\d.]+';/,
  \`const VERSION = '\${packageJson.version}';\`
);

fs.writeFileSync(swPath, swContent);
console.log(\`✓ Service Worker version updated to \${packageJson.version}\`);
\`\`\`

## 테스트 방법

### 로컬 테스트

1. **프로덕션 빌드**:
\`\`\`bash
npm run build
npm start
\`\`\`

2. **PWA 설치**: 브라우저에서 "홈 화면에 추가"

3. **버전 변경**: `public/sw.js`의 `VERSION` 변경

4. **재빌드**: `npm run build && npm start`

5. **앱 새로고침**: 설치된 PWA에서 새로고침 → 업데이트 알림 확인

### 프로덕션 테스트

1. Cloudflare Pages에 배포
2. 설치된 PWA 앱 열기
3. 1분 대기 (자동 업데이트 체크)
4. 업데이트 알림 표시 확인

## 사용자 경험

### 온라인 상태
1. 사용자가 앱 열기
2. 자동으로 서버에서 최신 HTML 가져옴
3. Service Worker 버전 비교
4. 새 버전 발견 시 토스트 알림 표시
5. "업데이트" 클릭 → 즉시 새 버전 적용

### 오프라인 상태
1. 캐시된 버전 사용
2. 온라인 복귀 시 자동 업데이트 체크

## 문제 해결

### 업데이트가 적용되지 않는 경우

1. **하드 리프레시**: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
2. **캐시 삭제**: DevTools → Application → Clear storage
3. **Service Worker 재등록**:
   - DevTools → Application → Service Workers
   - "Unregister" → 페이지 새로고침

### 알림이 표시되지 않는 경우

1. **버전 확인**: `public/sw.js`의 `VERSION`이 변경되었는지 확인
2. **콘솔 확인**: `[PWA] New content available` 메시지 확인
3. **등록 확인**: DevTools → Application → Service Workers → Status

## 기술 상세

### 캐싱 전략

| 리소스 타입 | 전략 | 설명 |
|------------|------|------|
| HTML | Network-First | 항상 최신 버전 우선, 실패 시 캐시 |
| JS/CSS | Cache-First + BG Update | 캐시 우선, 백그라운드 업데이트 |
| 이미지 | Cache-First | 캐시 우선 |

### 업데이트 체크 타이밍

- 앱 시작 시: 즉시
- 주기적: 1시간마다
- 사용자 동작: 페이지 이동 시

### Service Worker 라이프사이클

1. **Install**: 새 Service Worker 설치 → `skipWaiting()` 호출
2. **Activate**: 기존 Service Worker 교체 → 구 캐시 삭제
3. **Fetch**: 네트워크 요청 인터셉트 → 전략에 따라 캐시/네트워크 처리
4. **Update**: 사용자 승인 시 `SKIP_WAITING` 메시지 → 즉시 활성화

## 참고 자료

- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Best Practices](https://web.dev/pwa-checklist/)
- [Workbox Strategies](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)
