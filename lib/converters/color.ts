/**
 * Color Conversion Utilities
 * HEX ↔ RGB ↔ HSL 색상 변환 및 팔레트 생성
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorFormats {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  rgbString: string;
  hslString: string;
}

/**
 * HEX를 RGB로 변환
 */
export function hexToRgb(hex: string): RGB | null {
  // # 제거 및 소문자 변환
  const cleanHex = hex.replace('#', '').toLowerCase();

  // 3자리 또는 6자리 HEX 검증
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(cleanHex)) {
    return null;
  }

  // 3자리를 6자리로 확장
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(c => c + c).join('')
    : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * RGB를 HEX로 변환
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * RGB를 HSL로 변환
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * HSL을 RGB로 변환
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * 색상을 모든 형식으로 변환
 */
export function parseColor(input: string): ColorFormats | null {
  let rgb: RGB | null = null;

  // HEX 형식
  if (input.startsWith('#')) {
    rgb = hexToRgb(input);
  }
  // RGB 형식
  else if (input.startsWith('rgb')) {
    const match = input.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      rgb = {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      };
    }
  }
  // HSL 형식
  else if (input.startsWith('hsl')) {
    const match = input.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]);
      const l = parseInt(match[3]);
      rgb = hslToRgb(h, s, l);
    }
  }

  if (!rgb) {
    return null;
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  return {
    hex,
    rgb,
    hsl,
    rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hslString: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  };
}

/**
 * 보색 생성
 */
export function getComplementary(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newHsl = { ...hsl, h: (hsl.h + 180) % 360 };
  const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);

  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * 유사색 팔레트 생성 (인접색)
 */
export function getAnalogous(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [-30, -15, 0, 15, 30].map(offset => {
    const newHsl = { ...hsl, h: (hsl.h + offset + 360) % 360 };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  });

  return colors;
}

/**
 * 3색 조화 (Triadic)
 */
export function getTriadic(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [0, 120, 240].map(offset => {
    const newHsl = { ...hsl, h: (hsl.h + offset) % 360 };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  });

  return colors;
}

/**
 * 명도 변화 (Shades)
 */
export function getShades(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [90, 70, 50, 30, 10].map(lightness => {
    const newHsl = { ...hsl, l: lightness };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  });

  return colors;
}
