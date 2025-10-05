# URL 공유 기능 (URL Sharing Feature)

DevHub 도구의 URL 공유 기능 사용 가이드입니다.

## 📋 목차

- [개요](#개요)
- [사용 방법](#사용-방법)
- [지원 도구](#지원-도구)
- [URL 파라미터 구조](#url-파라미터-구조)
- [보안 고려사항](#보안-고려사항)
- [기술 세부사항](#기술-세부사항)
- [문제 해결](#문제-해결)

## 개요

URL 공유 기능을 사용하면 도구의 입력값과 설정을 URL 파라미터로 인코딩하여 다른 사람과 쉽게 공유할 수 있습니다.

### 주요 기능

- **URL 생성**: 현재 입력값과 설정을 URL로 변환
- **클립보드 복사**: 생성된 URL을 클립보드에 자동 복사
- **자동 복원**: 공유된 URL 접속 시 자동으로 입력값 복원
- **보안 검증**: 민감한 데이터 공유 시 경고 표시

## 사용 방법

### 1. URL 생성 및 공유

각 도구 페이지에서 결과가 생성된 후:

1. **공유 버튼 클릭**: 🔗 공유 버튼을 클릭합니다
2. **URL 복사 확인**: "✓ URL이 클립보드에 복사되었습니다!" 메시지 확인
3. **URL 공유**: 복사된 URL을 이메일, 메신저 등으로 공유

### 2. 공유된 URL 사용

1. **URL 접속**: 공유받은 URL을 브라우저에서 엽니다
2. **자동 복원**: 입력값과 설정이 자동으로 복원됩니다
3. **결과 확인**: 도구가 자동으로 실행되어 결과를 표시합니다

## 지원 도구

현재 다음 도구에서 URL 공유 기능을 지원합니다:

### 1. Base64 Encoder/Decoder

**공유되는 데이터**:
- `mode`: 인코딩/디코딩 모드 (`encode` 또는 `decode`)
- `input`: 입력 텍스트

**예시 URL**:
```
https://devhub.example.com/tools/base64?mode=encode&input=SGVsbG8lMjBXb3JsZA%3D%3D
```

### 2. JSON Formatter

**공유되는 데이터**:
- `input`: JSON 문자열
- `indent`: 들여쓰기 크기 (`2`, `4`, 또는 `8`)

**예시 URL**:
```
https://devhub.example.com/tools/json?input=eyJuYW1lIjoiSm9obiJ9&indent=2
```

### 3. Hash Generator

**공유되는 데이터**:
- `input`: 해시 생성할 텍스트
- `algorithm`: 해시 알고리즘 (`md5`, `sha1`, `sha256`, `sha512`)

**예시 URL**:
```
https://devhub.example.com/tools/hash?algorithm=sha256&input=SGVsbG8lMjBXb3JsZA%3D%3D
```

### 4. JWT Decoder

**공유되는 데이터**:
- `token`: JWT 토큰 문자열

**예시 URL**:
```
https://devhub.example.com/tools/jwt?token=eyJhbGci...
```

**참고**: JWT는 샘플 토큰이 아닌 경우에만 공유 버튼이 표시됩니다.

## URL 파라미터 구조

### 인코딩 방식

URL 파라미터는 **URL-safe Base64** 방식으로 인코딩됩니다:

1. **UTF-8 인코딩**: 문자열을 UTF-8로 인코딩
2. **Base64 인코딩**: Base64로 변환
3. **URL-safe 변환**:
   - `+` → `-`
   - `/` → `_`
   - `=` 패딩 제거

### 디코딩 과정

공유된 URL 접속 시 자동으로:

1. **파라미터 추출**: URL에서 쿼리 파라미터 읽기
2. **Base64 디코딩**: URL-safe Base64를 일반 Base64로 변환 후 디코딩
3. **UTF-8 디코딩**: 원본 문자열로 복원
4. **상태 복원**: 도구의 입력값과 설정에 자동 적용

## 보안 고려사항

### 민감한 데이터 경고

다음과 같은 민감한 패턴이 감지되면 경고 메시지가 표시됩니다:

- **비밀번호**: `password`, `passwd`, `pwd`
- **시크릿**: `secret`, `private key`
- **API 키**: `api_key`, `api key`, `apikey`
- **토큰**: `token`, `access_token`, `refresh_token`
- **인증정보**: `auth`, `credential`

### 보안 권장사항

1. **민감한 데이터 공유 금지**
   - 실제 비밀번호, API 키, 토큰 등은 공유하지 마세요
   - 테스트 데이터만 공유하는 것을 권장합니다

2. **URL 길이 제한**
   - URL은 2048자로 제한됩니다
   - 매우 큰 데이터는 공유가 제한될 수 있습니다

3. **데이터 전송 없음**
   - 모든 처리는 브라우저에서 수행됩니다
   - 서버로 데이터가 전송되지 않습니다

## 기술 세부사항

### URL 파라미터 유틸리티 (`lib/utils/urlParams.ts`)

```typescript
// URL 파라미터 가져오기
const value = getUrlParam('paramName');

// URL 파라미터 설정
setUrlParam('paramName', 'value');

// 공유 URL 생성
const shareUrl = createShareUrl({ param1: 'value1', param2: 'value2' });

// 데이터 안전성 검증
const { safe, reason } = isSafeToShare(dataString);
```

### ShareButton 컴포넌트 (`components/tools/ShareButton.tsx`)

```typescript
import ShareButton from '@/components/tools/ShareButton';

// 사용 예시
<ShareButton
  data={{ key1: 'value1', key2: 'value2' }}
  label="공유"
  className="px-4 py-2"
/>
```

### 도구 통합 패턴

```typescript
import { useEffect, useState } from 'react';
import ShareButton from '@/components/tools/ShareButton';
import { getUrlParam } from '@/lib/utils/urlParams';

function ToolPage() {
  const [input, setInput] = useState('');

  // URL 파라미터에서 초기값 로드
  useEffect(() => {
    const urlInput = getUrlParam('input');
    if (urlInput) {
      setInput(urlInput);
    }
  }, []);

  return (
    <div>
      {/* 도구 UI */}
      <ShareButton
        data={{ input }}
        label="공유"
      />
    </div>
  );
}
```

## 문제 해결

### URL이 너무 길다는 경고가 표시됩니다

**원인**: 입력 데이터가 너무 커서 URL이 2048자를 초과했습니다.

**해결방법**:
- 입력 데이터를 줄여보세요
- 필수적인 부분만 공유하세요

### 공유 버튼을 클릭했는데 경고가 표시됩니다

**원인**: 민감한 데이터가 감지되었습니다.

**해결방법**:
- 경고 메시지를 확인하세요
- 실제 비밀번호나 API 키가 아닌지 확인하세요
- 테스트 데이터로 대체하세요

### 공유된 URL 접속 시 데이터가 복원되지 않습니다

**원인**:
- URL이 잘못 복사되었을 수 있습니다
- 브라우저 캐시 문제일 수 있습니다

**해결방법**:
1. URL 전체가 제대로 복사되었는지 확인
2. 브라우저 새로고침 (F5 또는 Cmd+R)
3. 시크릿/프라이빗 모드에서 테스트

### 클립보드 복사가 작동하지 않습니다

**원인**:
- HTTPS 연결이 아닐 수 있습니다
- 브라우저가 클립보드 접근을 차단했을 수 있습니다

**해결방법**:
1. HTTPS 연결 확인
2. 브라우저 권한 설정 확인
3. 수동으로 URL 복사

## 추가 정보

### 프라이버시

- 모든 데이터 처리는 클라이언트 사이드에서 수행됩니다
- 서버로 데이터가 전송되지 않습니다
- URL 파라미터는 브라우저 히스토리에 저장될 수 있습니다

### 브라우저 호환성

- 모든 최신 브라우저 지원 (Chrome, Firefox, Safari, Edge)
- Clipboard API 지원 필요 (HTTPS 환경)
- URL-safe Base64 디코딩 지원

### 향후 계획

- [ ] 더 많은 도구에 공유 기능 추가
- [ ] QR 코드 생성 기능
- [ ] 단축 URL 지원 검토
- [ ] 공유 링크 유효기간 설정 (선택사항)

---

**문서 버전**: 1.0.0
**최종 업데이트**: 2025-10-05
**관련 이슈**: #55
