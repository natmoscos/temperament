import Script from 'next/script';

/**
 * AdSense 글로벌 스크립트
 * layout.tsx의 <head> 또는 <body>에 한 번만 삽입
 * NEXT_PUBLIC_ADSENSE_ID가 설정된 경우에만 로드
 */
export default function AdSenseScript() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (!adsenseId) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
