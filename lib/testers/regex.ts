export type RegexFlag = "g" | "i" | "m" | "s" | "u" | "y";

export interface RegexMatchDetail {
  /** 매치된 전체 문자열 */
  match: string;
  /** 입력 문자열 기준 시작 위치 */
  index: number;
  /** 입력 문자열 기준 종료 위치(포함 X) */
  endIndex: number;
  /** 캡쳐 그룹 목록 (번호 기반) */
  captures: string[];
  /** 명명된 캡쳐 그룹(k: 그룹명) */
  groups: Record<string, string | undefined>;
}

export interface RegexTestResult {
  matched: boolean;
  matches: RegexMatchDetail[];
  flags: string;
  groupNames: string[];
}

const FLAG_ORDER: RegexFlag[] = ["g", "i", "m", "s", "u", "y"];

/**
 * 정규표현식 플래그 문자열을 정제
 */
export function sanitizeFlags(flags: string): string {
  const lookup = new Set<RegexFlag>();

  for (const char of flags) {
    if (FLAG_ORDER.includes(char as RegexFlag)) {
      lookup.add(char as RegexFlag);
    }
  }

  return FLAG_ORDER.filter((flag) => lookup.has(flag)).join("");
}

/**
 * 정규표현식 평가
 */
export function evaluateRegex(
  pattern: string,
  flags: string,
  input: string
): RegexTestResult {
  const sanitizedFlags = sanitizeFlags(flags);

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, sanitizedFlags);
  } catch (error) {
    const message = error instanceof Error ? error.message : "유효하지 않은 정규표현식입니다";
    throw new Error(message);
  }

  if (!input) {
    return {
      matched: false,
      matches: [],
      flags: sanitizedFlags,
      groupNames: [],
    };
  }

  const matches: RegexMatchDetail[] = [];

  if (regex.global || regex.sticky) {
    let execResult: RegExpExecArray | null;
    while ((execResult = regex.exec(input)) !== null) {
      matches.push(buildMatchDetail(execResult));

      // zero-length match 방지: 다음 위치로 강제 이동
      if (execResult[0] === "") {
        regex.lastIndex += 1;
        if (regex.lastIndex > input.length) {
          break;
        }
      }
    }
  } else {
    const execResult = regex.exec(input);
    if (execResult) {
      matches.push(buildMatchDetail(execResult));
    }
  }

  const groupNames = new Set<string>();
  for (const match of matches) {
    Object.keys(match.groups).forEach((name) => {
      if (name) {
        groupNames.add(name);
      }
    });
  }

  return {
    matched: matches.length > 0,
    matches,
    flags: sanitizedFlags,
    groupNames: Array.from(groupNames),
  };
}

function buildMatchDetail(result: RegExpExecArray): RegexMatchDetail {
  const { index = 0 } = result;
  const match = result[0] ?? "";
  const endIndex = index + match.length;

  return {
    match,
    index,
    endIndex,
    captures: result.slice(1),
    groups: { ...(result.groups ?? {}) },
  };
}
