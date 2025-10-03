import type { Metadata } from 'next';

export const SITE_NAME = 'DevHub';
export const SITE_URL = 'https://devhub.dev';
export const SITE_DESCRIPTION = '개발자 생산성을 위한 온라인 유틸리티 도구 모음 DevHub';

interface BuildMetadataOptions {
  title: string;
  description?: string;
  path?: string;
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
