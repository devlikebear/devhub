/**
 * JSON Formatter Utilities
 * JSON 포맷팅, 검증, 압축 함수들
 */

export interface JSONValidationResult {
  isValid: boolean;
  error?: string;
  errorLine?: number;
  errorColumn?: number;
}

/**
 * JSON 문자열 유효성 검증
 * @param input - 검증할 JSON 문자열
 * @returns 검증 결과 객체
 */
export function validateJSON(input: string): JSONValidationResult {
  if (!input || !input.trim()) {
    return {
      isValid: false,
      error: 'JSON 문자열이 비어있습니다',
    };
  }

  try {
    JSON.parse(input);
    return { isValid: true };
  } catch (error) {
    if (error instanceof SyntaxError) {
      // 에러 메시지에서 위치 정보 추출 시도
      const match = error.message.match(/position (\d+)/);
      const position = match ? parseInt(match[1], 10) : undefined;

      let line: number | undefined;
      let column: number | undefined;

      if (position !== undefined) {
        const lines = input.substring(0, position).split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      return {
        isValid: false,
        error: error.message,
        errorLine: line,
        errorColumn: column,
      };
    }

    return {
      isValid: false,
      error: '알 수 없는 오류가 발생했습니다',
    };
  }
}

/**
 * JSON 포맷팅 (Pretty Print)
 * @param input - 포맷팅할 JSON 문자열
 * @param indent - 들여쓰기 공백 수 (기본값: 2)
 * @returns 포맷팅된 JSON 문자열
 */
export function formatJSON(input: string, indent: number = 2): string {
  const validation = validateJSON(input);

  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid JSON');
  }

  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, indent);
  } catch {
    throw new Error('JSON 포맷팅 중 오류가 발생했습니다');
  }
}

/**
 * JSON 압축 (Minify)
 * @param input - 압축할 JSON 문자열
 * @returns 압축된 JSON 문자열
 */
export function minifyJSON(input: string): string {
  const validation = validateJSON(input);

  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid JSON');
  }

  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch {
    throw new Error('JSON 압축 중 오류가 발생했습니다');
  }
}

/**
 * JSON 객체의 키/값 개수 계산
 * @param input - JSON 문자열
 * @returns 키/값 개수 정보
 */
export function analyzeJSON(input: string): {
  keys: number;
  depth: number;
  type: string;
} {
  const validation = validateJSON(input);

  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid JSON');
  }

  try {
    const parsed = JSON.parse(input);
    const type = Array.isArray(parsed) ? 'array' : typeof parsed;

    const countKeys = (obj: unknown): number => {
      if (obj === null || typeof obj !== 'object') {
        return 0;
      }

      if (Array.isArray(obj)) {
        return obj.reduce((sum, item) => sum + countKeys(item), obj.length);
      }

      return Object.keys(obj).length + Object.values(obj).reduce(
        (sum, value) => sum + countKeys(value),
        0
      );
    };

    const getDepth = (obj: unknown, currentDepth: number = 1): number => {
      if (obj === null || typeof obj !== 'object') {
        return currentDepth;
      }

      const values = Array.isArray(obj) ? obj : Object.values(obj);

      if (values.length === 0) {
        return currentDepth;
      }

      return Math.max(
        ...values.map((value) => getDepth(value, currentDepth + 1))
      );
    };

    return {
      keys: countKeys(parsed),
      depth: getDepth(parsed),
      type,
    };
  } catch {
    throw new Error('JSON 분석 중 오류가 발생했습니다');
  }
}
