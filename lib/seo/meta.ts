import type { Metadata } from 'next';

export const SITE_NAME = 'DevHub';
export const SITE_URL = 'https://devhub.dev';
export const SITE_DESCRIPTION = '개발자 생산성을 위한 온라인 유틸리티 도구 모음 DevHub';
export const DEFAULT_OG_IMAGE = '/og/default.svg';

interface BuildMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const imageUrl = image.startsWith('http') ? image : new URL(image, SITE_URL).toString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}
