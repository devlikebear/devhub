/**
 * Timestamp Converter Utilities
 * Epoch ↔ 날짜/시간 변환 함수들
 */

export interface TimestampResult {
  epoch: number;
  iso: string;
  local: string;
  utc: string;
  date: Date;
}

/**
 * Epoch timestamp를 Date 객체 및 다양한 형식으로 변환
 * @param timestamp - Epoch timestamp (초 또는 밀리초)
 * @param isMilliseconds - true면 밀리초, false면 초 (기본값: 자동 감지)
 */
export function epochToDate(
  timestamp: number,
  isMilliseconds?: boolean
): TimestampResult {
  // 자동 감지: 13자리 이상이면 밀리초
  const isMs = isMilliseconds ?? timestamp.toString().length >= 13;
  const ms = isMs ? timestamp : timestamp * 1000;
  const date = new Date(ms);

  return {
    epoch: isMs ? timestamp : timestamp * 1000,
    iso: date.toISOString(),
    local: date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
    utc: date.toUTCString(),
    date,
  };
}

/**
 * 날짜 문자열을 Epoch timestamp로 변환
 * @param dateString - ISO 8601 형식 또는 파싱 가능한 날짜 문자열
 * @param outputMilliseconds - true면 밀리초, false면 초 (기본값: true)
 */
export function dateToEpoch(
  dateString: string,
  outputMilliseconds = true
): number {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  return outputMilliseconds ? date.getTime() : Math.floor(date.getTime() / 1000);
}

/**
 * 현재 시간의 Epoch timestamp 반환
 * @param inMilliseconds - true면 밀리초, false면 초 (기본값: true)
 */
export function getCurrentTimestamp(inMilliseconds = true): number {
  return inMilliseconds ? Date.now() : Math.floor(Date.now() / 1000);
}

/**
 * Timestamp가 유효한지 검증
 */
export function isValidTimestamp(timestamp: number): boolean {
  if (isNaN(timestamp) || !isFinite(timestamp)) {
    return false;
  }

  // 1970-01-01 이후, 2100-01-01 이전의 timestamp만 허용
  const min = 0;
  const max = 4102444800000; // 2100-01-01 in ms

  // 초 단위인 경우
  if (timestamp < max / 1000) {
    return timestamp >= min && timestamp <= max / 1000;
  }

  // 밀리초 단위인 경우
  return timestamp >= min && timestamp <= max;
}
