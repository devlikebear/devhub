# DevHub 개발 워크플로우

## 브랜치 전략: GitHub Flow

DevHub는 **GitHub Flow**를 사용합니다. 간단하고 효율적인 워크플로우로 1인 개발 및 소규모 프로젝트에 최적화되어 있습니다.

### 기본 원칙

- `main` 브랜치는 항상 배포 가능한 상태 유지
- 모든 작업은 별도 브랜치에서 진행
- Pull Request를 통해 main에 병합
- 병합 즉시 Cloudflare Pages 자동 배포

## 브랜치 네이밍 규칙

```bash
feature/기능명     # 새로운 기능 개발
fix/버그명         # 버그 수정
docs/문서명        # 문서 작업
refactor/대상     # 리팩토링
style/대상        # 스타일/UI 개선
chore/작업명      # 빌드, 설정 등
```

### 예시

```bash
feature/navbar
feature/blog-system
fix/mobile-layout
fix/seo-meta-tags
docs/contributing-guide
refactor/components
style/landing-page
chore/update-deps
```

## 이슈 관리 원칙 (3~4인 팀 기준)

### 이슈 생성 필수 항목

다음 작업은 **반드시 이슈를 먼저 생성**합니다:

- ✅ 새로운 기능 개발
- ✅ 버그 수정
- ✅ 성능 개선
- ✅ 리팩토링 (큰 변경)
- ✅ 디자인 시스템 변경

### 이슈 생략 가능 항목

다음 작업은 이슈 없이 바로 PR 생성 가능:

- ⭕ 오타 수정
- ⭕ 문서 업데이트 (사소한 것)
- ⭕ 코드 포맷팅
- ⭕ 의존성 업데이트
- ⭕ 긴급 hotfix (사후 이슈 생성)

### 이슈 기반 워크플로우의 장점

- **명확한 작업 추적**: 누가 무엇을 하는지 투명
- **중복 작업 방지**: 같은 기능을 여러 명이 개발하는 실수 방지
- **히스토리 관리**: 왜 이 기능을 만들었는지 맥락 보존
- **우선순위 정리**: 무엇을 먼저 할지 팀 합의
- **PR과 자동 연결**: `Closes #15`로 이슈-PR 추적 용이

## 개발 워크플로우

### 1. 이슈 생성 및 할당

```bash
# GitHub에서 이슈 생성
gh issue create --title "네비게이션 바 추가" --label "feature"

# 이슈 번호 확인 (예: #23)

# 자신에게 할당
gh issue develop 23 --assignee @me
```

### 2. 브랜치 생성 및 작업 시작

```bash
# 최신 코드 받기
git checkout main
git pull origin main

# 새 브랜치 생성 (이슈 번호 포함 권장)
git checkout -b feature/navbar-#23
# 또는
git checkout -b 23-navbar

# 개발 진행...
```

### 3. 단위 테스트 작성 및 실행

- 변경한 기능과 버그 수정에 대해 단위 테스트를 추가하거나 보완합니다. 특히 `lib` 디렉토리의 유틸리티는 테스트 작성이 필수입니다.
- 빠른 피드백이 필요하면 `npm run test:watch`로 감시 모드를 사용합니다.
- PR 전에는 반드시 전체 테스트를 실행해 실패가 없는지 확인합니다.

```bash
# 새 테스트 작성/수정 후 실행
npm run test
# 필요 시 워치 모드
npm run test:watch
# 커버리지 리포트
npm run test:coverage
```

### 4. 커밋

```bash
# 변경사항 확인
git status
git diff

# 스테이징
git add .

# 커밋 (커밋 메시지 규칙 참고)
git commit -m "feat: Add responsive navigation bar"
```

### 5. 푸시 및 PR 생성

```bash
# 원격 저장소에 푸시
git push origin feature/navbar-#23

# Pull Request 생성 (이슈 자동 연결)
gh pr create --title "네비게이션 바 추가" --body "Closes #23"

# 또는 인터랙티브 모드
gh pr create
# → Body에 "Closes #23" 포함하여 이슈 자동 종료
```

### 6. 코드 리뷰 및 병합

```bash
# PR이 승인되면 GitHub에서 병합
# 또는 CLI로 병합
gh pr merge --squash

# 로컬에서 main 업데이트
git checkout main
git pull origin main

# 작업 완료된 브랜치 삭제
git branch -d feature/navbar
```

## 커밋 메시지 규칙

### 형식

```
<타입>: <제목>

[본문 - 선택사항]

[이슈 참조 - 선택사항]
```

### 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 등 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가
- `chore`: 빌드 작업, 패키지 매니저 설정 등

### 예시

```bash
feat: Add dark mode toggle button
fix: Resolve mobile menu not closing issue
docs: Update deployment guide for Cloudflare Pages
style: Improve landing page card spacing
refactor: Extract reusable Button component
perf: Optimize image loading with next/image
test: Add tests for Navbar component
chore: Update dependencies to latest versions
```

### 본문 포함 예시

```bash
feat: Add blog post filtering by category

- Category dropdown component
- Filter logic implementation
- URL parameter support

Closes #15
```

## Pull Request 체크리스트

PR을 생성하기 전에 확인하세요:

- [ ] 로컬에서 빌드 성공 (`npm run build`)
- [ ] 단위 테스트 통과 (`npm run test`)
- [ ] ESLint 통과 (`npm run lint`)
- [ ] 로컬 개발 서버에서 정상 작동 확인
- [ ] 모바일/데스크톱 반응형 확인
- [ ] 커밋 메시지가 규칙에 맞는지 확인
- [ ] PR 템플릿 모든 항목 작성

## 긴급 수정 (Hotfix)

배포된 main 브랜치에 긴급한 버그가 있을 경우:

```bash
# main에서 hotfix 브랜치 생성
git checkout main
git pull origin main
git checkout -b fix/critical-bug

# 수정 및 커밋
git add .
git commit -m "fix: Critical bug in production"

# 푸시 및 PR 생성
git push origin fix/critical-bug
gh pr create --title "긴급: 프로덕션 버그 수정"

# 즉시 병합 및 배포
gh pr merge --squash
```

## Cloudflare Pages 배포

### 자동 배포

- `main` 브랜치에 병합되면 **자동으로 프로덕션 배포**
- PR 생성 시 **미리보기 배포** 자동 생성 (선택사항)

### 배포 확인

```bash
# Cloudflare Pages 대시보드에서 확인
# 또는 배포 URL 확인
```

## 팁

### 작업 전 항상 최신 코드 받기

```bash
git checkout main
git pull origin main --rebase
```

#### Pull 전략: Merge vs Rebase

**`git pull` (기본 - merge)**
```bash
git pull origin main
# = git fetch + git merge
# 결과: 병합 커밋 생성, 히스토리 복잡
```

**`git pull --rebase` (권장 - rebase)**
```bash
git pull origin main --rebase
# = git fetch + git rebase
# 결과: 선형적인 깔끔한 히스토리
```

**차이점:**
```
Merge 방식:
A---B---C (local)
     \
      D---E (remote)
→ A---B---C---M (merge commit)
       \     /
        D---E

Rebase 방식:
A---B---C (local)
     \
      D---E (remote)
→ A---D---E---B'---C' (linear)
```

**언제 사용?**
- ✅ **Rebase**: 로컬 커밋을 아직 push 안 했을 때 (권장)
- ⚠️ **Merge**: 이미 push한 커밋이 있을 때

### 브랜치 목록 확인

```bash
# 로컬 브랜치
git branch

# 원격 브랜치 포함
git branch -a
```

### 오래된 브랜치 정리

```bash
# 병합된 로컬 브랜치 삭제
git branch --merged | grep -v "\*\|main" | xargs -n 1 git branch -d

# 원격에서 삭제된 브랜치 로컬 정리
git fetch --prune
```

### 실수한 커밋 수정

```bash
# 마지막 커밋 메시지 수정
git commit --amend -m "새로운 커밋 메시지"

# 아직 푸시하지 않은 커밋 되돌리기
git reset --soft HEAD~1
```

## 자주 사용하는 명령어

```bash
# 현재 상태 확인
git status

# 변경사항 확인
git diff

# 로그 확인 (간단)
git log --oneline -10

# 브랜치 전환
git checkout main
git checkout feature/navbar

# 브랜치 생성 + 전환
git checkout -b feature/new-feature

# 스테이지 취소
git restore --staged <file>

# 변경사항 취소
git restore <file>

# 원격 최신 정보 가져오기
git fetch

# 원격 변경사항 병합
git pull

# 로컬 변경사항 푸시
git push

# 강제 푸시 (주의!)
git push --force-with-lease
```

## 도움말

- Git 기본: [https://git-scm.com/doc](https://git-scm.com/doc)
- GitHub Flow: [https://docs.github.com/en/get-started/quickstart/github-flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- GitHub CLI: [https://cli.github.com/manual/](https://cli.github.com/manual/)

---

**마지막 업데이트**: 2025-10-02
