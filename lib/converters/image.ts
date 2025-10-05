export type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp';

export interface ImageConversionOptions {
  format: ImageFormat;
  quality?: number; // 0.0 ~ 1.0
  maxWidth?: number;
  maxHeight?: number;
}

export interface ImageConversionResult {
  success: boolean;
  dataUrl?: string;
  blob?: Blob;
  error?: string;
  originalSize?: { width: number; height: number };
  newSize?: { width: number; height: number };
  originalFileSize?: number;
  newFileSize?: number;
}

export async function convertImage(
  file: File,
  options: ImageConversionOptions
): Promise<ImageConversionResult> {
  try {
    // 이미지 로드
    const img = await loadImage(file);

    // 원본 크기
    const originalSize = { width: img.width, height: img.height };

    // 리사이징 계산
    const { width, height } = calculateNewSize(
      img.width,
      img.height,
      options.maxWidth,
      options.maxHeight
    );

    // Canvas로 변환
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context를 생성할 수 없습니다');
    }

    // 이미지 그리기
    ctx.drawImage(img, 0, 0, width, height);

    // Blob으로 변환
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('이미지 변환에 실패했습니다'));
          }
        },
        options.format,
        options.quality ?? 0.9
      );
    });

    // Data URL 생성
    const dataUrl = await blobToDataUrl(blob);

    return {
      success: true,
      dataUrl,
      blob,
      originalSize,
      newSize: { width, height },
      originalFileSize: file.size,
      newFileSize: blob.size,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다',
    };
  }
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('이미지를 로드할 수 없습니다'));
    };

    img.src = url;
  });
}

function calculateNewSize(
  originalWidth: number,
  originalHeight: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  let width = originalWidth;
  let height = originalHeight;

  if (maxWidth && width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }

  if (maxHeight && height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }

  return { width: Math.round(width), height: Math.round(height) };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function downloadImage(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
