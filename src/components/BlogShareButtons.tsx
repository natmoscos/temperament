'use client';

import { useState, useEffect } from 'react';

interface Props {
  title: string;
  description: string;
  slug: string;
}

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (params: Record<string, unknown>) => void;
      };
    };
  }
}

export default function BlogShareButtons({ title, description, slug }: Props) {
  const [copied, setCopied] = useState(false);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://192types.com';
  const shareUrl = `${siteUrl}/blog/${slug}`;
  const shareText = `${title}\n${description}\n\n`;

  // Kakao SDK 로드
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!key || typeof window === 'undefined') return;
    if (window.Kakao?.isInitialized?.()) return;

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(key);
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleKakao = () => {
    if (window.Kakao?.isInitialized?.()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl: `${siteUrl}/api/og?type=blog&title=${encodeURIComponent(title)}`,
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
        buttons: [
          { title: '글 읽기', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } },
          { title: '나도 검사하기', link: { mobileWebUrl: `${siteUrl}/test`, webUrl: `${siteUrl}/test` } },
        ],
      });
    } else {
      handleCopy();
    }
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}${shareUrl}`);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = `${shareText}${shareUrl}`;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 font-medium">공유</span>
      <button onClick={handleKakao} className="w-8 h-8 rounded-full bg-[#FEE500] flex items-center justify-center hover:opacity-80 transition" title="카카오톡 공유">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#3C1E1E"><path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.8 5.22 4.5 6.6l-.9 3.3c-.08.3.25.55.5.38l3.7-2.5c.7.1 1.4.16 2.2.16 5.52 0 10-3.58 10-7.94S17.52 3 12 3z"/></svg>
      </button>
      <button onClick={handleTwitter} className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition" title="X 공유">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </button>
      <button onClick={handleCopy} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${copied ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-300'}`} title="링크 복사">
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        )}
      </button>
    </div>
  );
}
