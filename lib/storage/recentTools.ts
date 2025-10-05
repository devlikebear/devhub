/**
 * 최근 사용 도구 관리 유틸리티
 */

import { getStorageItem, setStorageItem, StorageKeys } from './localStorage';

export type ToolId = string;

export interface RecentTool {
  id: ToolId;
  timestamp: number;
}

const MAX_RECENT_TOOLS = 5; // 최대 5개까지만 저장

/**
 * 최근 사용 도구 목록을 가져옵니다
 */
export function getRecentTools(): RecentTool[] {
  return getStorageItem<RecentTool[]>(StorageKeys.RECENT_TOOLS, []);
}

/**
 * 최근 사용 도구에 추가합니다
 * 이미 있는 경우 타임스탬프를 업데이트하고 맨 앞으로 이동
 */
export function addRecentTool(toolId: ToolId): void {
  const recentTools = getRecentTools();
  const filtered = recentTools.filter((tool) => tool.id !== toolId);

  const newRecent: RecentTool[] = [
    { id: toolId, timestamp: Date.now() },
    ...filtered,
  ].slice(0, MAX_RECENT_TOOLS); // 최대 개수 제한

  setStorageItem(StorageKeys.RECENT_TOOLS, newRecent);
}

/**
 * 최근 사용 도구에서 제거합니다
 */
export function removeRecentTool(toolId: ToolId): void {
  const recentTools = getRecentTools();
  setStorageItem(
    StorageKeys.RECENT_TOOLS,
    recentTools.filter((tool) => tool.id !== toolId)
  );
}

/**
 * 최근 사용 도구 목록을 비웁니다
 */
export function clearRecentTools(): void {
  setStorageItem(StorageKeys.RECENT_TOOLS, []);
}

/**
 * 최근 사용 도구 ID 목록만 반환합니다
 */
export function getRecentToolIds(): ToolId[] {
  return getRecentTools().map((tool) => tool.id);
}
