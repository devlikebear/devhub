import cronstrue from 'cronstrue/i18n';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const parser = require('cron-parser');

export interface CronParseResult {
  expression: string;
  description: string;
  nextRuns: Date[];
  isValid: boolean;
  error?: string;
}

/**
 * Cron 표현식 파싱 및 해석
 */
export function parseCronExpression(
  expression: string,
  locale: 'ko' | 'en' = 'ko',
  count: number = 10
): CronParseResult {
  try {
    const trimmedExpression = expression.trim();

    if (!trimmedExpression) {
      return {
        expression: '',
        description: '',
        nextRuns: [],
        isValid: false,
        error: '표현식을 입력하세요',
      };
    }

    // Cron 표현식 해석 (자연어)
    const description = cronstrue.toString(trimmedExpression, {
      locale: locale === 'ko' ? 'ko' : 'en',
      use24HourTimeFormat: true,
    });

    // 다음 실행 시간 계산
    const interval = parser.parseExpression(trimmedExpression);
    const nextRuns: Date[] = [];

    for (let i = 0; i < count; i++) {
      const next = interval.next();
      nextRuns.push(next.toDate());
    }

    return {
      expression: trimmedExpression,
      description,
      nextRuns,
      isValid: true,
    };
  } catch (error) {
    return {
      expression,
      description: '',
      nextRuns: [],
      isValid: false,
      error: error instanceof Error ? error.message : '유효하지 않은 표현식입니다',
    };
  }
}

/**
 * Cron 표현식 검증
 */
export function validateCronExpression(expression: string): { valid: boolean; error?: string } {
  try {
    parser.parseExpression(expression.trim());
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : '유효하지 않은 표현식입니다',
    };
  }
}

/**
 * 일반적인 Cron 패턴 템플릿
 */
export const cronTemplates = {
  everyMinute: {
    expression: '* * * * *',
    description: '매 분마다',
  },
  everyHour: {
    expression: '0 * * * *',
    description: '매 시간 정각',
  },
  everyDay: {
    expression: '0 0 * * *',
    description: '매일 자정',
  },
  everyWeek: {
    expression: '0 0 * * 0',
    description: '매주 일요일 자정',
  },
  everyMonth: {
    expression: '0 0 1 * *',
    description: '매월 1일 자정',
  },
  everyYear: {
    expression: '0 0 1 1 *',
    description: '매년 1월 1일 자정',
  },
  weekdays9am: {
    expression: '0 9 * * 1-5',
    description: '평일 오전 9시',
  },
  weekdays6pm: {
    expression: '0 18 * * 1-5',
    description: '평일 오후 6시',
  },
  every15min: {
    expression: '*/15 * * * *',
    description: '15분마다',
  },
  every30min: {
    expression: '*/30 * * * *',
    description: '30분마다',
  },
  everyMorning: {
    expression: '0 8 * * *',
    description: '매일 오전 8시',
  },
  everyEvening: {
    expression: '0 20 * * *',
    description: '매일 오후 8시',
  },
} as const;

/**
 * Cron 표현식 필드 설명
 */
export const cronFieldDescriptions = {
  minute: {
    name: '분',
    range: '0-59',
    examples: ['*', '0', '*/5', '0,15,30,45'],
  },
  hour: {
    name: '시',
    range: '0-23',
    examples: ['*', '0', '*/2', '9-17'],
  },
  dayOfMonth: {
    name: '일',
    range: '1-31',
    examples: ['*', '1', '*/2', '1,15'],
  },
  month: {
    name: '월',
    range: '1-12',
    examples: ['*', '1', '1-6', 'JAN,JUL'],
  },
  dayOfWeek: {
    name: '요일',
    range: '0-7 (0,7=일)',
    examples: ['*', '0', '1-5', 'MON-FRI'],
  },
} as const;

/**
 * Cron 특수 문자 설명
 */
export const cronSpecialCharacters = {
  asterisk: {
    symbol: '*',
    description: '모든 값',
    example: '* * * * * = 매 분마다',
  },
  comma: {
    symbol: ',',
    description: '값 목록',
    example: '0,30 * * * * = 매 시간 0분, 30분',
  },
  hyphen: {
    symbol: '-',
    description: '범위',
    example: '0 9-17 * * * = 9시부터 17시까지 매 시간',
  },
  slash: {
    symbol: '/',
    description: '간격',
    example: '*/15 * * * * = 15분마다',
  },
} as const;
