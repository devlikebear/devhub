import { describe, expect, it } from 'vitest';
import { buildPageMetadata, DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_URL } from './meta';

describe('seo metadata', () => {
  it('builds metadata with defaults', () => {
    const metadata = buildPageMetadata({ title: 'Home' });

    expect(metadata.title).toBe('Home');
    expect(metadata.description).toBe(SITE_DESCRIPTION);
    expect(metadata.openGraph?.url).toBe(new URL('/', SITE_URL).toString());
    expect(metadata.openGraph?.images?.[0].url).toBe(new URL(DEFAULT_OG_IMAGE, SITE_URL).toString());
    expect(metadata.twitter?.images?.[0]).toBe(new URL(DEFAULT_OG_IMAGE, SITE_URL).toString());
  });

  it('builds metadata with custom path and image', () => {
    const metadata = buildPageMetadata({
      title: 'Tool',
      description: 'Custom',
      path: '/tools/json',
      image: 'https://cdn.example.com/og.png',
    });

    expect(metadata.openGraph?.url).toBe('https://devhub.marvin-42.com/tools/json');
    expect(metadata.openGraph?.images?.[0].url).toBe('https://cdn.example.com/og.png');
    expect(metadata.twitter?.images?.[0]).toBe('https://cdn.example.com/og.png');
    expect(metadata.alternates?.canonical).toBe('https://devhub.marvin-42.com/tools/json');
  });
});
