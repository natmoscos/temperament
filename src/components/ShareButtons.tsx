'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  fullCode: string;
  mbtiNickname: string;
  temperamentNickname: string;
}

export default function ShareButtons({ fullCode, mbtiNickname, temperamentNickname }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // 공유 URL: /share/ENFJ-SC 형태 (OG 이미지 포함)
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/share/${fullCode}` : '';
  const shareText = `나는 ${fullCode}! ${mbtiNickname} x ${temperamentNickname}\n너의 숨겨진 성격은? 192가지 유형 중 나만의 유형을 찾아봐!`;
  const twitterText = `나는 ${fullCode}! ${mbtiNickname} x ${temperamentNickname} 🔮\n너의 숨겨진 성격은? 16가지 유형을 넘어선 192가지 성격 검사`;
  const encodedText = encodeURIComponent(shareText);
  const encodedTwitterText = encodeURIComponent(twitterText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = `${shareText}\n${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareKakao = () => {
    // Kakao SDK가 로드된 경우 KakaoTalk 공유
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).Kakao) {
      const Kakao = (window as unknown as Record<string, any>).Kakao;
      try {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: `나는 ${fullCode}! ${mbtiNickname}`,
            description: `${temperamentNickname} - 너의 숨겨진 성격은? 192가지 유형 검사로 확인해봐!`,
            imageUrl: `${shareUrl.replace(`/share/${fullCode}`, '')}/api/og?code=${fullCode}`,
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
          },
          buttons: [
            { title: '나도 검사하기', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } },
          ],
        });
        return;
      } catch {
        // SDK 에러시 폴백
      }
    }
    // 폴백: 카카오톡 공유 링크 (모바일에서 카카오톡 앱 열기 시도)
    const kakaoShareUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodedUrl}&text=${encodedText}`;
    // 카카오스토리 폴백
    const kakaoStoryUrl = `https://story.kakao.com/share?url=${encodedUrl}&text=${encodedText}`;

    // 모바일에서는 카카오톡 공유 시도, PC에서는 카카오스토리
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      // 모바일: 클립보드 복사 + 안내
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        alert('링크가 복사되었습니다! 카카오톡에서 붙여넣기 해주세요.');
      }).catch(() => {
        window.open(kakaoStoryUrl, '_blank', 'width=600,height=400');
      });
    } else {
      window.open(kakaoStoryUrl, '_blank', 'width=600,height=400');
    }
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodedTwitterText}&url=${encodedUrl}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareLine = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareNativeOrClipboard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `나의 성격 유형: ${fullCode}`, text: shareText, url: shareUrl });
      } catch {
        // 사용자가 취소
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-sm font-medium text-gray-600">친구에게 공유하고 궁합도 확인해보세요!</p>

      {/* 주요 공유 버튼 */}
      <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
        {/* 카카오톡 */}
        <button
          onClick={shareKakao}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 bg-[#FEE500] text-[#3C1E1E] rounded-xl font-medium text-sm hover:brightness-95 transition shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#3C1E1E">
            <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.72 1.8 5.108 4.509 6.458l-.919 3.397c-.085.315.273.57.548.39l4.026-2.685c.595.083 1.21.128 1.836.128 5.523 0 10-3.463 10-7.688S17.523 3 12 3z"/>
          </svg>
          카카오톡
        </button>

        {/* X(트위터) */}
        <button
          onClick={shareTwitter}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X
        </button>

        {/* 페이스북 */}
        <button
          onClick={shareFacebook}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 bg-[#1877F2] text-white rounded-xl font-medium text-sm hover:bg-[#166FE5] transition shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>

        {/* 라인 */}
        <button
          onClick={shareLine}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 bg-[#00C300] text-white rounded-xl font-medium text-sm hover:bg-[#00B300] transition shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 5.89 2 10.63c0 3.12 2.08 5.85 5.19 7.3l-.67 2.44c-.06.22.18.4.37.28l2.9-1.93c.72.1 1.46.16 2.21.16 5.52 0 10-3.89 10-8.63S17.52 2 12 2z"/>
          </svg>
          LINE
        </button>
      </div>

      {/* 링크 복사 + 기본 공유 */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-sm ${
            copied
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              복사 완료!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              링크 복사
            </>
          )}
        </button>

        <button
          onClick={shareNativeOrClipboard}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium text-sm hover:opacity-90 transition shadow-lg shadow-indigo-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          더 많은 공유
        </button>
      </div>
    </div>
  );
}
