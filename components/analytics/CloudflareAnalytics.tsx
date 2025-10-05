'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Cloudflare Web Analytics 컴포넌트
 *
 * 프라이버시 우선 웹 분석 도구
 * - 쿠키 없음
 * - 개인정보 수집 없음
 * - GDPR 준수
 * - Core Web Vitals 자동 추적
 */

interface CloudflareAnalyticsProps {
  /**
   * Cloudflare Web Analytics Token
   * Cloudflare 대시보드에서 생성: https://dash.cloudflare.com/
   */
  token?: string;
}

export default function CloudflareAnalytics({ token }: CloudflareAnalyticsProps) {
  // 환경 변수에서 토큰 가져오기
  const analyticsToken = token || process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

  useEffect(() => {
    // 토큰이 없거나 개발 환경이면 로드하지 않음
    if (!analyticsToken) {
      console.warn('[CloudflareAnalytics] Token not found. Analytics will not be loaded.');
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[CloudflareAnalytics] Development mode - Analytics disabled');
      return;
    }
  }, [analyticsToken]);

  // 토큰이 없거나 개발 환경이면 렌더링하지 않음
  if (!analyticsToken || process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <Script
      id="cloudflare-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: analyticsToken })}
      strategy="afterInteractive"
    />
  );
}
