// Lorem Ipsum 표준 텍스트 풀
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
  'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores',
  'quas', 'molestias', 'excepturi', 'occaecati', 'cupiditate', 'provident',
  'similique', 'mollitia', 'vitae', 'dicta', 'explicabo', 'nemo', 'ipsam',
  'voluptatem', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
  'consequuntur', 'magni', 'ratione', 'sequi', 'nesciunt', 'neque', 'porro',
  'quisquam', 'dolorem', 'aliquam', 'quaerat', 'numquam', 'eius', 'modi',
  'tempora', 'incidunt', 'magnam', 'quam', 'nihil', 'impedit', 'quo', 'minus',
  'maxime', 'placeat', 'facere', 'possimus', 'omnis', 'assumenda', 'repellendus',
  'temporibus', 'quibusdam', 'officiis', 'debitis', 'rerum', 'necessitatibus',
  'saepe', 'eveniet', 'voluptates', 'repudiandae', 'recusandae', 'itaque',
  'earum', 'hic', 'tenetur', 'sapiente', 'delectus', 'reiciendis', 'maiores',
  'alias', 'perferendis', 'doloribus', 'asperiores', 'repellat'
];

const LOREM_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

export type GenerateUnit = 'words' | 'sentences' | 'paragraphs';
export type WrapType = 'none' | 'p' | 'div' | 'ul' | 'ol' | 'h1' | 'h2' | 'h3';

export interface LoremOptions {
  count: number;
  unit: GenerateUnit;
  startWithLorem?: boolean;
  wrap?: WrapType;
}

export interface LoremResult {
  text: string;
  html?: string;
  stats: {
    characters: number;
    words: number;
    sentences: number;
    paragraphs: number;
  };
}

function getRandomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function generateWords(count: number, startWithLorem: boolean): string {
  const words: string[] = [];

  if (startWithLorem && count >= 8) {
    // "Lorem ipsum dolor sit amet, consectetur adipiscing elit" 추가
    words.push(...LOREM_START.split(' '));
    count -= 8;
  }

  for (let i = 0; i < count; i++) {
    words.push(getRandomWord());
  }

  return words.join(' ');
}

function generateSentence(minWords = 8, maxWords = 16): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    words.push(getRandomWord());
  }

  return capitalizeFirst(words.join(' ')) + '.';
}

function generateSentences(count: number, startWithLorem: boolean): string {
  const sentences: string[] = [];

  if (startWithLorem && count >= 1) {
    sentences.push(LOREM_START + '.');
    count -= 1;
  }

  for (let i = 0; i < count; i++) {
    sentences.push(generateSentence());
  }

  return sentences.join(' ');
}

function generateParagraph(sentenceCount = 5): string {
  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }

  return sentences.join(' ');
}

function generateParagraphs(count: number, startWithLorem: boolean): string {
  const paragraphs: string[] = [];

  if (startWithLorem && count >= 1) {
    paragraphs.push(LOREM_START + '. ' + generateParagraph(4));
    count -= 1;
  }

  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 4) + 4; // 4-7 문장
    paragraphs.push(generateParagraph(sentenceCount));
  }

  return paragraphs.join('\n\n');
}

function wrapText(text: string, wrapType: WrapType, unit: GenerateUnit): string {
  if (wrapType === 'none') return text;

  const lines = text.split('\n\n').filter(line => line.trim());

  switch (wrapType) {
    case 'p':
      return lines.map(line => `<p>${line}</p>`).join('\n');

    case 'div':
      return lines.map(line => `<div>${line}</div>`).join('\n');

    case 'ul':
      if (unit === 'paragraphs') {
        return `<ul>\n${lines.map(line => `  <li>${line}</li>`).join('\n')}\n</ul>`;
      }
      const sentences = text.split('. ').filter(s => s.trim());
      return `<ul>\n${sentences.map(s => `  <li>${s.trim()}${s.endsWith('.') ? '' : '.'}</li>`).join('\n')}\n</ul>`;

    case 'ol':
      if (unit === 'paragraphs') {
        return `<ol>\n${lines.map(line => `  <li>${line}</li>`).join('\n')}\n</ol>`;
      }
      const sents = text.split('. ').filter(s => s.trim());
      return `<ol>\n${sents.map(s => `  <li>${s.trim()}${s.endsWith('.') ? '' : '.'}</li>`).join('\n')}\n</ol>`;

    case 'h1':
      return lines.map(line => `<h1>${line}</h1>`).join('\n');

    case 'h2':
      return lines.map(line => `<h2>${line}</h2>`).join('\n');

    case 'h3':
      return lines.map(line => `<h3>${line}</h3>`).join('\n');

    default:
      return text;
  }
}

function calculateStats(text: string): LoremResult['stats'] {
  const characters = text.length;
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0).length;

  return { characters, words, sentences, paragraphs };
}

export function generateLorem(options: LoremOptions): LoremResult {
  const { count, unit, startWithLorem = true, wrap = 'none' } = options;

  let text = '';

  switch (unit) {
    case 'words':
      text = generateWords(count, startWithLorem);
      break;
    case 'sentences':
      text = generateSentences(count, startWithLorem);
      break;
    case 'paragraphs':
      text = generateParagraphs(count, startWithLorem);
      break;
  }

  const html = wrap !== 'none' ? wrapText(text, wrap, unit) : undefined;
  const stats = calculateStats(text);

  return {
    text,
    html,
    stats,
  };
}
