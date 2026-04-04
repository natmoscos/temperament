'use client';

import { useEffect, useRef } from 'react';

/**
 * Google AdSense 광고 컴포넌트
 *
 * 사용법:
 * 1. .env.local 에 NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX 설정
 * 2. 각 광고 슬롯에 고유한 slot ID를 부여하거나 auto 포맷 사용
 *
 * 환경변수가 설정되지 않으면 개발용 플레이스홀더를 표시합니다.
 */

interface AdProps {
  className?: string;
  slot?: string;            // 개별 광고 슬롯 ID (AdSense에서 생성)
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? '';

export default function AdUnit({ className, slot, format = 'auto', responsive = true }: AdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // AdSense ID가 없으면 스킵
    if (!ADSENSE_ID) return;

    // 이미 push 했으면 스킵 (Strict Mode 대응)
    if (pushed.current) return;

    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
      adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense 로드 실패 시 무시
    }
  }, []);

  // AdSense ID가 없으면 개발용 플레이스홀더
  if (!ADSENSE_ID) {
    return (
      <div className={`w-full max-w-3xl mx-auto my-6 ${className ?? ''}`}>
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400">AD SLOT {slot ? `(${slot})` : ''}</p>
          <p className="text-[10px] text-gray-300 mt-1">NEXT_PUBLIC_ADSENSE_ID 환경변수를 설정하세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-3xl mx-auto my-6 ${className ?? ''}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot ?? ''}
        data-ad-format={format}
        {...(responsive ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </div>
  );
}
