/**
 * 도구 사용 추적 Hook
 * 페이지 방문 시 자동으로 최근 사용 도구에 추가
 */

import { useEffect } from 'react';
import { useTools } from '@/components/tools/ToolsProvider';

export function useToolTracking(toolId: string) {
  const { markAsUsed } = useTools();

  useEffect(() => {
    // 페이지 마운트 시 최근 사용 도구에 추가
    markAsUsed(toolId);
  }, [toolId, markAsUsed]);
}
