import { describe, expect, it } from 'vitest';
import {
  getAnalogous,
  getComplementary,
  getShades,
  getTriadic,
  hexToRgb,
  hslToRgb,
  parseColor,
  rgbToHex,
  rgbToHsl,
} from './color';

describe('color converters', () => {
  it('converts between hex and rgb', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#112233')).toEqual({ r: 17, g: 34, b: 51 });
    expect(hexToRgb('invalid')).toBeNull();
    expect(rgbToHex(255, 0, 128)).toBe('#ff0080');
  });

  it('converts between rgb and hsl', () => {
    expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
    expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
  });

  it('parses colors from multiple formats', () => {
    const hex = parseColor('#336699');
    const rgb = parseColor('rgb(51, 102, 153)');
    const hsl = parseColor('hsl(210, 50%, 40%)');

    expect(hex?.hex).toBe('#336699');
    expect(rgb?.rgb).toEqual({ r: 51, g: 102, b: 153 });
    expect(hsl?.hex).toMatch(/^#[0-9a-f]{6}$/);
    expect(parseColor('not-a-color')).toBeNull();
  });

  it('builds derived palettes', () => {
    expect(getComplementary('#ff0000')).toBe('#00ffff');

    const analogous = getAnalogous('#ff0000');
    expect(analogous).toHaveLength(5);
    expect(analogous[2]).toBe('#ff0000');

    const triadic = getTriadic('#ff0000');
    expect(triadic).toHaveLength(3);
    expect(triadic).toContain('#ff0000');

    const shades = getShades('#ff0000');
    expect(shades).toHaveLength(5);
    shades.forEach((color) => expect(color.startsWith('#')).toBe(true));
  });
});
