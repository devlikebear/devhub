import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/meta';

export const dynamic = 'force-static';

const routes = [
  '/',
  '/about',
  '/contact',
  '/tools',
  '/tools/timestamp',
  '/tools/base64',
  '/tools/json',
  '/tools/color',
  '/tools/uuid',
  '/tools/hash',
  '/tools/regex',
  '/tools/markdown',
  '/tools/url',
  '/tools/jwt',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
  }));
}
