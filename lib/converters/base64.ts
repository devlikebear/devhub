/**
 * Base64 Encoder/Decoder Utilities
 * 문자열 ↔ Base64 변환 함수들
 */

/**
 * 문자열을 Base64로 인코딩
 * @param input - 인코딩할 문자열
 * @returns Base64로 인코딩된 문자열
 */
export function encodeToBase64(input: string): string {
  if (!input) {
    return '';
  }

  try {
    // UTF-8 인코딩을 위해 TextEncoder 사용
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(input);

    // Uint8Array를 바이너리 문자열로 변환
    let binaryString = '';
    uint8Array.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });

    // btoa로 Base64 인코딩
    return btoa(binaryString);
  } catch {
    throw new Error('인코딩 중 오류가 발생했습니다');
  }
}

/**
 * Base64를 문자열로 디코딩
 * @param input - Base64 인코딩된 문자열
 * @returns 디코딩된 원본 문자열
 */
export function decodeFromBase64(input: string): string {
  if (!input) {
    return '';
  }

  try {
    const base64Segments = extractBase64Segments(input);

    if (base64Segments.length === 0) {
      throw new Error('유효하지 않은 Base64 문자열입니다');
    }

    const decodedResults: string[] = [];

    for (const segment of base64Segments) {
      try {
        decodedResults.push(decodeBase64Segment(segment));
      } catch {
        // 유효하지 않은 세그먼트는 무시
      }
    }

    if (decodedResults.length === 0) {
      throw new Error('유효하지 않은 Base64 문자열입니다');
    }

    return decodedResults.join('\n\n');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('디코딩 중 오류가 발생했습니다');
  }
}

function decodeBase64Segment(segment: string): string {
  const cleanedSegment = segment.replace(/\s+/g, '');

  if (!isValidBase64(cleanedSegment)) {
    throw new Error('유효하지 않은 Base64 문자열입니다');
  }

  try {
    // atob로 Base64 디코딩
    const binaryString = atob(cleanedSegment);

    // 바이너리 문자열을 Uint8Array로 변환
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // UTF-8 디코딩을 위해 TextDecoder 사용
    const decoder = new TextDecoder('utf-8', { fatal: true });
    return decoder.decode(uint8Array);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('디코딩 중 오류가 발생했습니다');
  }
}

function extractBase64Segments(value: string): string[] {
  const segments: string[] = [];
  let buffered = '';

  const finalizeBuffer = () => {
    if (!buffered) return;

    if (isValidBase64(buffered)) {
      segments.push(buffered);
    }
    buffered = '';
  };

  const lines = value.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const sanitizedLine = line.replace(/\s+/g, '');

    if (!line) {
      finalizeBuffer();
      continue;
    }

    if (isLikelyBase64Line(sanitizedLine)) {
      buffered += sanitizedLine;
      continue;
    }

    finalizeBuffer();

    const inlineMatches = line.match(/[A-Za-z0-9+/=]+/g);
    if (!inlineMatches) {
      continue;
    }

    inlineMatches.forEach((match) => {
      const sanitizedMatch = match.replace(/\s+/g, '');
      if (
        isValidBase64(sanitizedMatch) &&
        (sanitizedMatch.length >= 8 || sanitizedMatch.includes('='))
      ) {
        segments.push(sanitizedMatch);
      }
    });
  }

  finalizeBuffer();

  return segments;
}

function isLikelyBase64Line(line: string): boolean {
  if (!line) {
    return false;
  }

  if (line.length < 4 || line.length % 4 !== 0) {
    return false;
  }

  return /^[A-Za-z0-9+/]+={0,2}$/.test(line);
}

/**
 * Base64 문자열 유효성 검증
 * @param input - 검증할 문자열
 * @returns 유효한 Base64 문자열이면 true
 */
export function isValidBase64(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  // Base64 정규식: A-Z, a-z, 0-9, +, /, = (패딩)
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

  // 길이는 4의 배수여야 함
  if (input.length % 4 !== 0) {
    return false;
  }

  return base64Regex.test(input);
}

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 * @param bytes - 바이트 크기
 * @returns 읽기 쉬운 형식의 문자열 (예: "1.23 KB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
