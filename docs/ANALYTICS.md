# DevHub Analytics 가이드

## 개요

DevHub는 **Cloudflare Web Analytics**를 사용하여 프라이버시 우선 방식으로 방문자 통계를 수집합니다.

## 주요 특징

### 🔒 프라이버시 우선
- **쿠키 없음**: 추적 쿠키를 사용하지 않습니다
- **개인정보 수집 없음**: IP 주소, 사용자 에이전트 등 개인 식별 정보를 저장하지 않습니다
- **GDPR 준수**: EU 개인정보 보호 규정을 완벽하게 준수합니다
- **동의 불필요**: 쿠키 배너나 사용자 동의가 필요 없습니다

### 📊 수집 데이터
Cloudflare Web Analytics는 다음 정보를 자동으로 추적합니다:

#### 기본 지표
- **페이지뷰**: 페이지 방문 수
- **고유 방문자**: 일일/주간/월간 고유 방문자 수
- **페이지 로드 시간**: 평균 페이지 로딩 속도
- **바운스율**: 한 페이지만 보고 떠나는 비율

#### Core Web Vitals (자동 추적)
- **LCP (Largest Contentful Paint)**: 주요 콘텐츠 로딩 시간
- **FID (First Input Delay)**: 첫 입력 반응 시간
- **CLS (Cumulative Layout Shift)**: 레이아웃 안정성

#### 트래픽 소스
- **Referrer**: 방문자 유입 경로
- **국가/지역**: 방문자 지역 분포 (익명화)
- **브라우저/OS**: 사용 중인 브라우저와 운영 체제
- **디바이스 타입**: 데스크톱/모바일/태블릿

#### 페이지별 통계
- **인기 페이지**: 가장 많이 방문한 페이지
- **도구 사용 통계**: 어떤 도구가 가장 인기 있는지
- **페이지별 성능**: 각 페이지의 로딩 속도

## 설정 방법

### 1. Cloudflare Web Analytics 설정

#### Step 1: Cloudflare 대시보드 접속
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
2. 좌측 메뉴에서 **Web Analytics** 선택

#### Step 2: 사이트 추가
1. **Add a site** 버튼 클릭
2. 사이트 정보 입력:
   - **Hostname**: `devhub.example.com` (실제 도메인 입력)
   - **Automatic Setup**: 체크
3. **Register and get tracking code** 클릭

#### Step 3: Tracking Token 복사
생성된 스크립트에서 `token` 값을 복사합니다:

\`\`\`html
<!-- Cloudflare Web Analytics -->
<script
  defer
  src='https://static.cloudflareinsights.com/beacon.min.js'
  data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'
>
</script>
<!-- End Cloudflare Web Analytics -->
\`\`\`

`YOUR_TOKEN_HERE` 부분의 토큰을 복사합니다.

### 2. DevHub 프로젝트 설정

#### Step 1: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 토큰을 추가합니다:

\`\`\`bash
# .env.local
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_analytics_token_here
\`\`\`

**주의**: `.env.local` 파일은 Git에 커밋하지 마세요! (이미 `.gitignore`에 포함되어 있습니다)

#### Step 2: 개발 서버 재시작

환경 변수를 적용하려면 개발 서버를 재시작합니다:

\`\`\`bash
# 개발 서버 중지 (Ctrl + C)
npm run dev
\`\`\`

### 3. 배포 환경 설정 (Cloudflare Pages)

#### Cloudflare Pages 대시보드에서 환경 변수 추가:

1. Cloudflare Pages 프로젝트 설정 이동
2. **Settings** > **Environment variables** 선택
3. **Production** 탭에서:
   - Variable name: `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`
   - Value: 복사한 토큰 값
4. **Save** 클릭

변경 사항이 다음 배포부터 적용됩니다.

## 작동 확인

### 1. 로컬 개발 환경
로컬 환경(`npm run dev`)에서는 Analytics가 자동으로 **비활성화**됩니다.

콘솔에 다음 메시지가 표시됩니다:
\`\`\`
[CloudflareAnalytics] Development mode - Analytics disabled
\`\`\`

### 2. 프로덕션 환경
프로덕션 빌드(`npm run build`)에서는 토큰이 있으면 자동으로 활성화됩니다.

브라우저 개발자 도구 > Network 탭에서 다음 요청을 확인할 수 있습니다:
- `beacon.min.js` 스크립트 로드
- `cgi/beacon/performance` 성능 데이터 전송

### 3. Cloudflare 대시보드 확인
1. Cloudflare Dashboard > Web Analytics 이동
2. 등록한 사이트 선택
3. 실시간 데이터 확인 (최대 5분 지연)

## 데이터 확인 방법

### Cloudflare 대시보드

1. **개요 (Overview)**
   - 일일/주간/월간 트래픽 요약
   - Core Web Vitals 점수
   - 주요 지표 그래프

2. **페이지 (Pages)**
   - 인기 페이지 순위
   - 페이지별 성능 지표
   - 각 도구의 사용 통계

3. **Referrers**
   - 유입 경로 분석
   - 검색 엔진, 소셜 미디어 등

4. **국가 (Countries)**
   - 방문자 지역 분포
   - 국가별 트래픽

5. **브라우저 & OS**
   - 사용자 환경 분석
   - 호환성 개선에 활용

## 트러블슈팅

### Analytics가 작동하지 않을 때

#### 1. 토큰 확인
\`\`\`bash
# 환경 변수 확인
echo $NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
\`\`\`

#### 2. 빌드 확인
프로덕션 빌드에서만 작동합니다:
\`\`\`bash
npm run build
npm start
\`\`\`

#### 3. 브라우저 콘솔 확인
- 404 에러: 토큰이 잘못되었거나 만료됨
- CORS 에러: 도메인 설정 확인 필요

#### 4. Ad Blocker 확인
광고 차단 확장 프로그램이 Analytics 스크립트를 차단할 수 있습니다.

### 데이터가 표시되지 않을 때

- **실시간 데이터**: 최대 5분 지연
- **히스토리 데이터**: 24시간 이내 집계
- **최소 트래픽**: 일정 수준의 트래픽이 있어야 차트가 표시됨

## 성능 영향

### 📊 성능 지표
- **스크립트 크기**: ~10KB (gzipped: ~3KB)
- **로딩 방식**: `afterInteractive` (페이지 로드 후)
- **성능 영향**: 무시할 수준 (Lighthouse 점수에 영향 없음)

### ⚡ 최적화
- Next.js `Script` 컴포넌트 사용
- 비동기 로딩 (`defer`)
- 개발 환경에서 자동 비활성화

## 프라이버시 정책

DevHub는 사용자 프라이버시를 최우선으로 합니다:

### 수집하는 정보
- **익명 페이지뷰 통계**
- **집계된 성능 지표**
- **지역별 트래픽 (국가 수준)**

### 수집하지 않는 정보
- **개인 식별 정보** (이름, 이메일, IP 주소)
- **쿠키 또는 로컬 스토리지**
- **사용자 추적**
- **개인 행동 패턴**

### 데이터 보관
- Cloudflare가 관리
- GDPR 준수
- 익명화된 데이터만 저장

## 참고 자료

- [Cloudflare Web Analytics 공식 문서](https://developers.cloudflare.com/analytics/web-analytics/)
- [프라이버시 정책](https://www.cloudflare.com/privacypolicy/)
- [GDPR 준수 가이드](https://www.cloudflare.com/gdpr/introduction/)

## FAQ

### Q: Analytics를 비활성화할 수 있나요?
A: 네, 환경 변수에서 토큰을 제거하면 자동으로 비활성화됩니다.

### Q: 비용이 발생하나요?
A: 아니요, Cloudflare Web Analytics는 **완전 무료**입니다.

### Q: 사용자가 추적을 거부할 수 있나요?
A: Cloudflare Web Analytics는 개인을 식별하지 않으므로 추적 거부가 필요 없습니다. 하지만 브라우저의 "Do Not Track" 설정을 존중합니다.

### Q: Google Analytics와 비교하면?
A:
- **프라이버시**: Cloudflare가 훨씬 우수 (쿠키 없음)
- **성능**: Cloudflare가 더 가벼움 (~3KB vs ~45KB)
- **기능**: Google Analytics가 더 많은 기능 제공
- **GDPR**: Cloudflare는 별도 동의 불필요

---

**마지막 업데이트**: 2025-10-05
