# DevHub - 개발자 유틸리티 플랫폼

개발자 생산성 향상을 위한 온라인 유틸리티 도구 모음입니다.

## 🚀 빠른 시작

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드 및 배포

```bash
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 📦 주요 기능

### 🛠️ 유틸리티 도구

- **Timestamp Converter** - Epoch 타임스탬프 ↔ 날짜/시간 변환
- **Base64 Encoder/Decoder** - 문자열 ↔ Base64 변환
- **JSON Formatter** - JSON 포맷팅, 검증, 압축
- **Color Tool** - HEX ↔ RGB ↔ HSL 변환 & 팔레트 생성
- **UUID Generator** - UUID v4 생성기
- **Hash Generator** - MD5, SHA-1, SHA-256 해시 생성
- **Regex Tester** - 정규표현식 테스트
- **Markdown Preview** - 실시간 마크다운 미리보기
- **URL Encoder/Decoder** - URL 인코딩/디코딩
- **JWT Decoder** - JWT 토큰 디코딩

### ✨ 핵심 가치

- ⚡ **빠른 성능** - Next.js + Cloudflare Pages CDN
- 🔒 **프라이버시 우선** - 모든 변환은 브라우저에서 처리
- 🆓 **완전 무료** - 광고 없이 무료 사용
- 📱 **반응형** - 모든 기기 최적화

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Hosting**: Cloudflare Pages
- **Version Control**: Git + GitHub

## 📁 프로젝트 구조

```
devhub/
├── app/                    # Next.js App Router
│   ├── tools/             # 유틸리티 도구들
│   ├── about/             # 소개 페이지
│   └── contact/           # 연락처
├── components/            # 재사용 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── layout/           # 레이아웃 (Navbar, Footer)
│   └── tools/            # 도구별 컴포넌트
└── lib/                  # 유틸리티 함수
    └── converters/       # 변환 로직
```

## 🚢 배포

이 프로젝트는 [Cloudflare Pages](https://pages.cloudflare.com/)에 자동으로 배포됩니다.

자세한 배포 가이드는 [DEPLOY.md](./DEPLOY.md)를 참조하세요.

## 🤝 기여하기

1. 이슈 생성
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-tool`)
3. 변경사항 커밋 (`git commit -m 'feat: Add amazing tool'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-tool`)
5. Pull Request 생성

자세한 워크플로우는 [WORKFLOW.md](./WORKFLOW.md)를 참조하세요.

## 📚 문서

- [PROJECT.md](./PROJECT.md) - 프로젝트 상세 기획서
- [DEPLOY.md](./DEPLOY.md) - 배포 가이드
- [WORKFLOW.md](./WORKFLOW.md) - 개발 워크플로우
- [.claude/CLAUDE.md](./.claude/CLAUDE.md) - Claude Code 컨텍스트

## 🔗 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudflare Pages Guide](https://developers.cloudflare.com/pages/)

## 📄 라이선스

이 프로젝트는 오픈소스입니다.

---

**Built with ❤️ using Next.js 15 & Cloudflare Pages**
