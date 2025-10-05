/**
 * 즐겨찾기 관리 유틸리티
 */

import { getStorageItem, setStorageItem, StorageKeys } from './localStorage';

export type ToolId = string;

/**
 * 즐겨찾기 목록을 가져옵니다
 */
export function getFavorites(): ToolId[] {
  return getStorageItem<ToolId[]>(StorageKeys.FAVORITES, []);
}

/**
 * 즐겨찾기에 추가합니다
 */
export function addFavorite(toolId: ToolId): void {
  const favorites = getFavorites();
  if (!favorites.includes(toolId)) {
    setStorageItem(StorageKeys.FAVORITES, [...favorites, toolId]);
  }
}

/**
 * 즐겨찾기에서 제거합니다
 */
export function removeFavorite(toolId: ToolId): void {
  const favorites = getFavorites();
  setStorageItem(
    StorageKeys.FAVORITES,
    favorites.filter((id) => id !== toolId)
  );
}

/**
 * 즐겨찾기 토글 (추가/제거)
 */
export function toggleFavorite(toolId: ToolId): boolean {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(toolId);

  if (isFavorite) {
    removeFavorite(toolId);
    return false;
  } else {
    addFavorite(toolId);
    return true;
  }
}

/**
 * 특정 도구가 즐겨찾기인지 확인합니다
 */
export function isFavorite(toolId: ToolId): boolean {
  return getFavorites().includes(toolId);
}
