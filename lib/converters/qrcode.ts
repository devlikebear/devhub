import QRCode from 'qrcode';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRCodeOptions {
  errorCorrectionLevel?: ErrorCorrectionLevel;
  margin?: number;
  scale?: number;
  width?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export interface QRCodeResult {
  dataUrl: string;
  svgString?: string;
}

/**
 * 텍스트를 QR 코드로 변환
 */
export async function generateQRCode(
  text: string,
  options: QRCodeOptions = {}
): Promise<QRCodeResult> {
  const {
    errorCorrectionLevel = 'M',
    margin = 4,
    scale = 4,
    width,
    color = {
      dark: '#000000',
      light: '#FFFFFF',
    },
  } = options;

  try {
    // Data URL (PNG) 생성
    const dataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel,
      margin,
      scale,
      width,
      color,
    });

    // SVG 문자열 생성
    const svgString = await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel,
      margin,
      width,
      color,
    });

    return {
      dataUrl,
      svgString,
    };
  } catch (error) {
    throw new Error(`QR 코드 생성 실패: ${error}`);
  }
}

/**
 * Canvas에 QR 코드 그리기
 */
export async function drawQRCodeToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  options: QRCodeOptions = {}
): Promise<void> {
  const {
    errorCorrectionLevel = 'M',
    margin = 4,
    scale = 4,
    width,
    color = {
      dark: '#000000',
      light: '#FFFFFF',
    },
  } = options;

  try {
    await QRCode.toCanvas(canvas, text, {
      errorCorrectionLevel,
      margin,
      scale,
      width,
      color,
    });
  } catch (error) {
    throw new Error(`Canvas에 QR 코드 그리기 실패: ${error}`);
  }
}

/**
 * QR 코드를 파일로 다운로드
 */
export function downloadQRCode(dataUrl: string, filename: string = 'qrcode.png'): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * SVG를 파일로 다운로드
 */
export function downloadSVG(svgString: string, filename: string = 'qrcode.svg'): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 에러 정정 레벨 설명
 */
export const errorCorrectionLevels = {
  L: { name: 'Low', recovery: '~7%' },
  M: { name: 'Medium', recovery: '~15%' },
  Q: { name: 'Quartile', recovery: '~25%' },
  H: { name: 'High', recovery: '~30%' },
} as const;
