'use client';

import { useState } from 'react';
import { blogPosts } from '@/data/blog-posts';

function toNaverFormat(post: typeof blogPosts[number]): string {
  let text = '';

  // 제목
  text += `${post.title}\n\n`;

  // 섹션별 내용
  post.sections.forEach((section) => {
    text += `■ ${section.heading}\n\n`;
    text += `${section.content}\n\n`;
  });

  // 하단 CTA
  text += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  text += `이 글이 재밌었다면, 나의 성격 유형도 알아보세요!\n`;
  text += `MBTI + 기질론을 결합한 192가지 성격 유형 검사 (무료)\n\n`;
  text += `검사하러 가기: https://192types.com/test\n`;
  text += `3분 빠른 검사: https://192types.com/quick-test\n\n`;
  text += `원문: https://192types.com/blog/${post.slug}\n`;

  return text;
}

export default function NaverExportPage() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const handleCopy = async (post: typeof blogPosts[number]) => {
    const text = toNaverFormat(post);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSlug(post.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedSlug(post.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-black text-gray-900 mb-2">네이버 블로그 복사 도구</h1>
        <p className="text-sm text-gray-500 mb-6">
          블로그 글을 네이버 블로그에 올릴 수 있는 포맷으로 변환합니다.
          복사 후 네이버 블로그 에디터에 붙여넣기 하세요.
        </p>

        <div className="space-y-3">
          {blogPosts.map((post) => (
            <div key={post.slug} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{post.publishDate} · {post.sections.length}개 섹션</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setExpandedSlug(expandedSlug === post.slug ? null : post.slug)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition"
                  >
                    {expandedSlug === post.slug ? '접기' : '미리보기'}
                  </button>
                  <button
                    onClick={() => handleCopy(post)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      copiedSlug === post.slug
                        ? 'bg-green-500 text-white'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {copiedSlug === post.slug ? '복사 완료!' : '네이버용 복사'}
                  </button>
                </div>
              </div>

              {expandedSlug === post.slug && (
                <pre className="mt-3 p-4 bg-gray-50 rounded-lg text-xs text-gray-600 whitespace-pre-wrap max-h-96 overflow-y-auto border border-gray-100">
                  {toNaverFormat(post)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
