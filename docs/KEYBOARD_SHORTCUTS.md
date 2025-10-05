# 키보드 단축키 가이드

DevHub의 생산성을 높이는 키보드 단축키 모음입니다.

## 📋 목차

- [전역 단축키](#전역-단축키)
- [도구별 단축키](#도구별-단축키)
  - [JSON 포맷터](#json-포맷터)
- [단축키 도움말](#단축키-도움말)
- [플랫폼별 참고사항](#플랫폼별-참고사항)

## 전역 단축키

모든 페이지에서 사용 가능한 단축키입니다.

| 단축키 | 설명 | 플랫폼 |
|--------|------|--------|
| `⌘ K` / `Ctrl+K` | 도구 검색 (Command Palette) | Mac / Windows |
| `?` (Shift+/) | 단축키 도움말 표시 | 모든 플랫폼 |
| `Esc` | 모달/팝업 닫기 | 모든 플랫폼 |

### Command Palette (⌘K / Ctrl+K)

전역 도구 검색 기능으로 모든 페이지에서 사용 가능합니다.

**사용 방법:**
1. `⌘K` (Mac) 또는 `Ctrl+K` (Windows/Linux)를 눌러 검색창 열기
2. 도구 이름, 설명, 카테고리로 검색
3. `↑` `↓` 화살표 키로 탐색
4. `Enter`로 선택
5. `Esc`로 닫기

**예시:**
- "json" 입력 → JSON 포맷터, JSON Validator 등 표시
- "base64" 입력 → Base64 인코더/디코더 표시
- "hash" 입력 → Hash 생성기 표시

## 도구별 단축키

각 도구에서 사용 가능한 특화 단축키입니다.

### JSON 포맷터

`/tools/json` 페이지에서 사용 가능한 단축키입니다.

| 단축키 | 동작 | 설명 |
|--------|------|------|
| `⌘ S` / `Ctrl+S` | 포맷 | JSON 데이터를 읽기 쉽게 포맷팅 |
| `⌘ M` / `Ctrl+M` | 압축 | JSON 데이터를 한 줄로 압축 |
| `⌘ L` / `Ctrl+L` | 전체 지우기 | 입력된 모든 JSON 데이터 삭제 |

**사용 예시:**
1. JSON 데이터를 입력 영역에 붙여넣기
2. `⌘ S` (Mac) 또는 `Ctrl+S` (Windows)로 즉시 포맷팅
3. `⌘ M`으로 압축하여 공백 제거
4. `⌘ L`로 전체 초기화

## 단축키 도움말

### 도움말 열기

언제든지 `?` (Shift + /)를 눌러 현재 사용 가능한 단축키 목록을 확인할 수 있습니다.

도움말 모달이 열리면:
- 전역 단축키 목록 표시
- 현재 페이지에서 사용 가능한 도구별 단축키 표시
- `Esc` 키로 닫기

## 플랫폼별 참고사항

### macOS

- `⌘` (Command) 키를 사용합니다
- 대부분의 단축키는 표준 macOS 규칙을 따릅니다
- Safari, Chrome, Firefox 모두 동일하게 작동합니다

### Windows / Linux

- `Ctrl` 키를 사용합니다
- Chrome, Edge, Firefox에서 테스트 완료
- 브라우저 기본 단축키와 충돌 방지를 위해 `preventDefault` 적용

### 브라우저 기본 단축키 충돌

일부 단축키는 브라우저 기본 동작을 재정의합니다:

| 단축키 | 기본 동작 | DevHub 동작 |
|--------|-----------|-------------|
| `⌘ K` / `Ctrl+K` | 주소창 포커스 (일부 브라우저) | Command Palette 열기 |
| `⌘ S` / `Ctrl+S` | 페이지 저장 | JSON 포맷 (JSON 도구에서만) |
| `⌘ L` / `Ctrl+L` | 주소창 포커스 | 전체 지우기 (JSON 도구에서만) |

> **참고:** 도구별 단축키는 해당 도구 페이지에서만 작동하므로 다른 페이지에서는 브라우저 기본 동작이 유지됩니다.

## 향후 추가 예정

다음 단축키들이 추가될 예정입니다:

### Base64 인코더/디코더
- `⌘ E` / `Ctrl+E` - 인코딩
- `⌘ D` / `Ctrl+D` - 디코딩
- `⌘ L` / `Ctrl+L` - 전체 지우기

### Hash 생성기
- `⌘ H` / `Ctrl+H` - 해시 생성
- `⌘ C` / `Ctrl+C` - 결과 복사
- `⌘ L` / `Ctrl+L` - 전체 지우기

### URL 인코더/디코더
- `⌘ E` / `Ctrl+E` - URL 인코딩
- `⌘ D` / `Ctrl+D` - URL 디코딩
- `⌘ L` / `Ctrl+L` - 전체 지우기

## 개발자 가이드

### 새 단축키 추가하기

`hooks/useKeyboardShortcut.ts`를 사용하여 단축키를 추가할 수 있습니다:

```typescript
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

// 컴포넌트 내부
useKeyboardShortcut(
  { key: 's', ctrl: true },
  handleSave,
  { preventDefault: true }
);
```

**파라미터:**
- `key`: 키 이름 (소문자)
- `ctrl`: Ctrl/Cmd 키 필요 여부 (boolean)
- `shift`: Shift 키 필요 여부 (boolean)
- `alt`: Alt/Option 키 필요 여부 (boolean)
- `preventDefault`: 기본 동작 방지 여부 (boolean)

### 단축키 표시 포맷

`formatShortcut` 함수를 사용하여 플랫폼별 단축키 표시:

```typescript
import { formatShortcut } from '@/hooks/useKeyboardShortcut';

const shortcutText = formatShortcut({ key: 's', ctrl: true });
// macOS: "⌘S"
// Windows/Linux: "Ctrl+S"
```

## 피드백

단축키 관련 제안이나 버그 리포트는 [GitHub Issues](https://github.com/your-repo/devhub/issues)에 등록해 주세요.

---

**마지막 업데이트**: 2025-10-05
**버전**: 1.0.0
