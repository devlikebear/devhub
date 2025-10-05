/**
 * 로컬 저장소 관리 유틸리티
 * 브라우저의 localStorage를 안전하게 사용하기 위한 헬퍼 함수들
 */

const STORAGE_PREFIX = 'devhub_';

export const StorageKeys = {
  FAVORITES: `${STORAGE_PREFIX}favorites`,
  RECENT_TOOLS: `${STORAGE_PREFIX}recent_tools`,
  THEME: `${STORAGE_PREFIX}theme`,
} as const;

/**
 * localStorage에서 값을 읽어옵니다
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * localStorage에 값을 저장합니다
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
}

/**
 * localStorage에서 값을 제거합니다
 */
export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

/**
 * localStorage를 완전히 비웁니다
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}
