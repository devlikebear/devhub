# Cloudflare Pages 배포 가이드

## 🚀 배포 단계

### 1. GitHub 저장소 생성
```bash
# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/devlikebear/devhub.git
git push -u origin main
```

### 2. Cloudflare Pages 연결

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com 로그인

2. **Pages 프로젝트 생성**
   - 왼쪽 메뉴에서 `Workers & Pages` 선택
   - `Create application` → `Pages` → `Connect to Git`

3. **저장소 연결**
   - GitHub 계정 연동
   - `devhub` 저장소 선택

4. **빌드 설정**
   ```yaml
   프레임워크 프리셋: Next.js (Static HTML Export)
   빌드 명령어: npm run build
   빌드 출력 디렉토리: out
   Node 버전: 20
   ```

   ⚠️ **중요**: `next.config.ts`에 `output: 'export'` 설정 필요

5. **환경 변수 설정** (필요시)
   ```
   NODE_VERSION=20
   ```

6. **배포 시작**
   - `Save and Deploy` 클릭
   - 약 2-3분 후 배포 완료

### 3. 커스텀 도메인 연결

1. **Cloudflare Pages 프로젝트**
   - `Custom domains` 탭 이동
   - `Set up a custom domain` 클릭

2. **도메인 입력**
   - 본인 도메인 입력 (예: `devhub.yourdomain.com`)
   - Cloudflare가 자동으로 DNS 설정

3. **DNS 자동 설정 확인**
   - CNAME 레코드 자동 생성됨
   - SSL 인증서 자동 발급 (몇 분 소요)

## 📝 자동 배포

- `main` 브랜치에 push하면 **자동으로 재배포**
- 프리뷰 배포: PR 생성 시 자동 프리뷰 URL 생성

## 🔧 로컬 테스트

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드 테스트
npm run build
npm start
```

## ⚡ Cloudflare Pages 장점

- ✅ 무료 무제한 bandwidth
- ✅ 전 세계 CDN (275+ 도시)
- ✅ 자동 HTTPS/SSL
- ✅ Git 기반 자동 배포
- ✅ 도메인 원클릭 연결
- ✅ 프리뷰 배포 무제한

## 🌐 배포 후 확인

- Cloudflare Pages URL: `https://devhub-xxx.pages.dev`
- 커스텀 도메인: `https://devhub.marvin-42.com`

## 📚 참고 문서

- [Cloudflare Pages 공식 문서](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
