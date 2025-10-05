import { useEffect, useCallback } from 'react';

export type KeyCombination = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean; // Command key on Mac
};

export type ShortcutHandler = (event: KeyboardEvent) => void;

/**
 * Custom hook for keyboard shortcuts
 *
 * @param shortcut - Key combination configuration
 * @param handler - Callback function when shortcut is triggered
 * @param options - Additional options
 */
export function useKeyboardShortcut(
  shortcut: KeyCombination,
  handler: ShortcutHandler,
  options: {
    enabled?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
  } = {}
) {
  const { enabled = true, preventDefault = true, stopPropagation = false } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const { key, ctrl = false, shift = false, alt = false, meta = false } = shortcut;

      // Check if all modifiers match
      const ctrlMatch = ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
      const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
      const altMatch = alt ? event.altKey : !event.altKey;
      const metaMatch = meta ? event.metaKey : true; // Meta is optional

      // Check if key matches (case-insensitive)
      const keyMatch = event.key.toLowerCase() === key.toLowerCase();

      if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
        handler(event);
      }
    },
    [shortcut, handler, enabled, preventDefault, stopPropagation]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);
}

/**
 * Format shortcut for display
 * e.g., "Cmd+K" or "Ctrl+Shift+F"
 */
export function formatShortcut(shortcut: KeyCombination): string {
  const parts: string[] = [];
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  if (shortcut.ctrl || shortcut.meta) {
    parts.push(isMac ? '⌘' : 'Ctrl');
  }
  if (shortcut.shift) {
    parts.push(isMac ? '⇧' : 'Shift');
  }
  if (shortcut.alt) {
    parts.push(isMac ? '⌥' : 'Alt');
  }

  // Capitalize first letter of key
  const keyDisplay = shortcut.key.charAt(0).toUpperCase() + shortcut.key.slice(1);
  parts.push(keyDisplay);

  return parts.join(isMac ? '' : '+');
}
