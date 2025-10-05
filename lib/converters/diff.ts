import { diffLines, diffWords, Change } from 'diff';

export type DiffMode = 'line' | 'word';

export type DiffOptions = {
  ignoreCase?: boolean;
  ignoreWhitespace?: boolean;
};

export type DiffChange = {
  value: string;
  added?: boolean;
  removed?: boolean;
  lineNumber?: number;
};

export type DiffResult = {
  changes: DiffChange[];
  stats: {
    added: number;
    removed: number;
    unchanged: number;
  };
};

/**
 * 두 텍스트의 차이점을 계산
 */
export function calculateDiff(
  original: string,
  modified: string,
  mode: DiffMode = 'line',
  options: DiffOptions = {}
): DiffResult {
  const { ignoreCase = false, ignoreWhitespace = false } = options;

  // 옵션 적용
  let text1 = original;
  let text2 = modified;

  if (ignoreCase) {
    text1 = text1.toLowerCase();
    text2 = text2.toLowerCase();
  }

  if (ignoreWhitespace) {
    text1 = text1.replace(/\s+/g, ' ').trim();
    text2 = text2.replace(/\s+/g, ' ').trim();
  }

  // Diff 계산
  const changes: Change[] = mode === 'line'
    ? diffLines(text1, text2)
    : diffWords(text1, text2);

  // 라인 번호 추가
  let originalLineNum = 1;
  let modifiedLineNum = 1;

  const processedChanges: DiffChange[] = changes.map((change) => {
    const lineCount = change.value.split('\n').length - 1;
    const result: DiffChange = {
      value: change.value,
      added: change.added,
      removed: change.removed,
    };

    if (change.removed) {
      result.lineNumber = originalLineNum;
      originalLineNum += lineCount;
    } else if (change.added) {
      result.lineNumber = modifiedLineNum;
      modifiedLineNum += lineCount;
    } else {
      result.lineNumber = originalLineNum;
      originalLineNum += lineCount;
      modifiedLineNum += lineCount;
    }

    return result;
  });

  // 통계 계산
  const stats = {
    added: processedChanges.filter((c) => c.added).length,
    removed: processedChanges.filter((c) => c.removed).length,
    unchanged: processedChanges.filter((c) => !c.added && !c.removed).length,
  };

  return {
    changes: processedChanges,
    stats,
  };
}

/**
 * Diff 결과를 HTML로 포맷팅
 */
export function formatDiffToHtml(result: DiffResult): string {
  return result.changes
    .map((change) => {
      const className = change.added
        ? 'diff-added'
        : change.removed
        ? 'diff-removed'
        : 'diff-unchanged';

      const prefix = change.added ? '+ ' : change.removed ? '- ' : '  ';
      const escapedValue = escapeHtml(change.value);

      return `<div class="${className}">${prefix}${escapedValue}</div>`;
    })
    .join('');
}

/**
 * Side-by-side diff 포맷
 */
export function formatSideBySide(result: DiffResult): {
  left: string[];
  right: string[];
} {
  const left: string[] = [];
  const right: string[] = [];

  result.changes.forEach((change) => {
    const lines = change.value.split('\n').filter((line) => line);

    if (change.removed) {
      lines.forEach((line) => {
        left.push(line);
        right.push('');
      });
    } else if (change.added) {
      lines.forEach((line) => {
        left.push('');
        right.push(line);
      });
    } else {
      lines.forEach((line) => {
        left.push(line);
        right.push(line);
      });
    }
  });

  return { left, right };
}

/**
 * HTML 이스케이프
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Diff 통계 텍스트 생성
 */
export function formatDiffStats(stats: {
  added: number;
  removed: number;
  unchanged: number;
}): string {
  const total = stats.added + stats.removed + stats.unchanged;
  return `${stats.added} additions, ${stats.removed} deletions, ${stats.unchanged} unchanged (${total} total)`;
}
