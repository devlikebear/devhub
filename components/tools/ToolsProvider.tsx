'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  getFavorites,
  toggleFavorite as toggleFavStorage,
  isFavorite as checkIsFavorite,
} from '@/lib/storage/favorites';
import { addRecentTool, getRecentToolIds } from '@/lib/storage/recentTools';

interface ToolsContextType {
  favorites: string[];
  recentTools: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  markAsUsed: (toolId: string) => void;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<string[]>([]);

  // 클라이언트에서만 초기 데이터 로드
  useEffect(() => {
    setFavorites(getFavorites());
    setRecentTools(getRecentToolIds());
  }, []);

  const toggleFavorite = useCallback((toolId: string) => {
    const newIsFavorite = toggleFavStorage(toolId);
    setFavorites(getFavorites());
    return newIsFavorite;
  }, []);

  const isFavorite = useCallback((toolId: string) => {
    return checkIsFavorite(toolId);
  }, []);

  const markAsUsed = useCallback((toolId: string) => {
    addRecentTool(toolId);
    setRecentTools(getRecentToolIds());
  }, []);

  return (
    <ToolsContext.Provider
      value={{
        favorites,
        recentTools,
        toggleFavorite,
        isFavorite,
        markAsUsed,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
}

export function useTools() {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
}
