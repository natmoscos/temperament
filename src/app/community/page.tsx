'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getSupabase, Post, Comment, generateNickname } from '@/lib/supabase';
import DOMPurify from 'dompurify';

// 유형 뱃지 색상
const typeColors: Record<string, string> = {
  E: 'bg-amber-100 text-amber-700',
  I: 'bg-indigo-100 text-indigo-700',
  S: 'bg-green-100 text-green-700',
  N: 'bg-purple-100 text-purple-700',
  T: 'bg-cyan-100 text-cyan-700',
  F: 'bg-pink-100 text-pink-700',
  J: 'bg-red-100 text-red-700',
  P: 'bg-blue-100 text-blue-700',
};

// 기질 색상 & 한글명
const tempColorMap: Record<string, string> = {
  S: 'bg-amber-500 text-white',
  C: 'bg-red-500 text-white',
  P: 'bg-emerald-500 text-white',
  M: 'bg-blue-500 text-white',
};
const tempNameMap: Record<string, string> = {
  S: '다혈', C: '담즙', P: '점액', M: '우울',
};

function TypeBadge({ code }: { code: string }) {
  const [mbti, temp] = code.split('-');
  if (!mbti) return null;
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-bold">
      {mbti.split('').map((c, i) => (
        <span key={i} className={`px-1 py-0.5 rounded ${typeColors[c] ?? 'bg-gray-100 text-gray-600'}`}>
          {c}
        </span>
      ))}
      {temp && temp.split('').map((t, i) => (
        <span key={`t${i}`} className={`px-1 py-0.5 rounded ml-0.5 ${tempColorMap[t] ?? 'bg-gray-800 text-white'}`} title={tempNameMap[t] ? `${tempNameMap[t]}질` : t}>
          {tempNameMap[t] || t}
        </span>
      ))}
    </span>
  );
}

// 시간 포맷
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return '방금 전';
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}일 전`;
  return new Date(dateStr).toLocaleDateString('ko-KR');
}

// 비속어 필터
const badWords = ['시발', '씨발', 'ㅅㅂ', 'ㅂㅅ', '병신', '지랄', 'ㅈㄹ', '미친', '꺼져', '닥쳐'];
function containsBadWords(text: string): boolean {
  return badWords.some((w) => text.includes(w));
}

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const TEMP_OPTIONS = [
  { value: 'S', label: '다혈질' },
  { value: 'C', label: '담즙질' },
  { value: 'P', label: '점액질' },
  { value: 'M', label: '우울질' },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWrite, setShowWrite] = useState(false);
  const [mbtiFilter, setMbtiFilter] = useState('');
  const [tempFilter, setTempFilter] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  // 글쓰기 폼
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writeMbti, setWriteMbti] = useState('');
  const [writeTemp1, setWriteTemp1] = useState('');
  const [writeTemp2, setWriteTemp2] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 댓글 상태
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  // 저장된 검사 결과에서 초기값 가져오기
  useEffect(() => {
    try {
      const stored = localStorage.getItem('temperament-test-result');
      if (stored) {
        const result = JSON.parse(stored);
        if (result.fullCode) {
          const [mbti, temp] = result.fullCode.split('-');
          if (mbti) setWriteMbti(mbti);
          if (temp && temp.length === 2) {
            setWriteTemp1(temp[0]);
            setWriteTemp2(temp[1]);
          }
        }
      }
    } catch { /* 무시 */ }
  }, []);

  // 글쓰기 폼의 typeCode 조합
  const writeTypeCode = writeMbti && writeTemp1 && writeTemp2
    ? `${writeMbti}-${writeTemp1}${writeTemp2}`
    : '';

  // 글 목록 조회
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const sb = getSupabase();
    if (!sb) { setPosts([]); setLoading(false); return; }
    try {
      let query = sb.from('posts')
        .select('*, comment_count:comments(count)')
        .order(sortBy === 'popular' ? 'likes' : 'created_at', { ascending: false })
        .limit(50);
      if (mbtiFilter) query = query.ilike('type_code', `${mbtiFilter}%`);
      if (tempFilter) query = query.ilike('type_code', `%-${tempFilter}%`);
      const { data, error } = await query;
      if (error) throw error;
      const formatted = (data ?? []).map((p) => ({
        ...p,
        comment_count: Array.isArray(p.comment_count) ? p.comment_count[0]?.count ?? 0 : 0,
      }));
      setPosts(formatted);
    } catch {
      setPosts([]);
    }
    setLoading(false);
  }, [sortBy, mbtiFilter, tempFilter]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  // 댓글 불러오기
  const fetchComments = async (postId: string) => {
    const sb = getSupabase();
    if (!sb) return;
    const { data } = await sb.from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (data) setComments((prev) => ({ ...prev, [postId]: data }));
  };

  // 댓글 토글
  const toggleComments = (postId: string) => {
    if (openCommentId === postId) {
      setOpenCommentId(null);
    } else {
      setOpenCommentId(postId);
      if (!comments[postId]) fetchComments(postId);
    }
    setCommentText('');
  };

  // 댓글 작성
  const handleCommentSubmit = async (postId: string) => {
    if (!commentText.trim() || commentText.trim().length < 2) return;
    if (containsBadWords(commentText)) { setError('부적절한 표현이 포함되어 있습니다.'); return; }

    setCommentSubmitting(true);
    const sb = getSupabase();
    if (!sb) { setCommentSubmitting(false); return; }

    const nick = writeTypeCode ? generateNickname(writeTypeCode) : '익명의 탐험가';
    const typeCode = writeTypeCode || '????';

    const { error: insertErr } = await sb.from('comments').insert({
      post_id: postId,
      nickname: nick,
      type_code: typeCode,
      content: DOMPurify.sanitize(commentText.trim()),
    });

    if (!insertErr) {
      setCommentText('');
      await fetchComments(postId);
      fetchPosts(); // comment_count 갱신
    }
    setCommentSubmitting(false);
  };

  // 글 작성
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) { setError('제목과 내용을 모두 입력해주세요.'); return; }
    if (title.trim().length < 2 || title.trim().length > 50) { setError('제목은 2~50자로 입력해주세요.'); return; }
    if (content.trim().length < 10 || content.trim().length > 2000) { setError('내용은 10~2000자로 입력해주세요.'); return; }
    if (containsBadWords(title) || containsBadWords(content)) { setError('부적절한 표현이 포함되어 있습니다.'); return; }
    if (!writeTypeCode) { setError('MBTI와 기질을 선택해주세요!'); return; }
    if (writeTemp1 === writeTemp2) { setError('1차 기질과 2차 기질은 다르게 선택해주세요!'); return; }

    const today = new Date().toDateString();
    const dailyKey = `community-posts-${today}`;
    const dailyCount = parseInt(localStorage.getItem(dailyKey) ?? '0');
    if (dailyCount >= 5) { setError('하루 최대 5개까지 작성할 수 있습니다.'); return; }

    setSubmitting(true);
    setError('');

    const sb = getSupabase();
    if (!sb) { setError('커뮤니티 서비스가 준비 중입니다.'); setSubmitting(false); return; }

    const { error: insertError } = await sb.from('posts').insert({
      nickname: generateNickname(writeTypeCode),
      type_code: writeTypeCode,
      title: DOMPurify.sanitize(title.trim()),
      content: DOMPurify.sanitize(content.trim()),
      likes: 0,
    });

    if (insertError) { setError('글 작성에 실패했습니다.'); setSubmitting(false); return; }
    localStorage.setItem(dailyKey, String(dailyCount + 1));
    setTitle(''); setContent(''); setShowWrite(false); setSubmitting(false);
    fetchPosts();
  };

  // 공감
  const handleLike = async (postId: string, currentLikes: number) => {
    const likedKey = `liked-${postId}`;
    if (localStorage.getItem(likedKey)) return;
    const sb = getSupabase();
    if (!sb) return;
    await sb.from('posts').update({ likes: currentLikes + 1 }).eq('id', postId);
    localStorage.setItem(likedKey, '1');
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-8">
          <Link href="/" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium mb-4 inline-block">← 홈으로</Link>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            💬 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">오픈채팅</span>
          </h1>
          <p className="text-gray-500 text-sm">같은 유형, 다른 기질. 자유롭게 이야기해봐요!</p>
        </div>

        {/* 필터 & 정렬 */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <select value={mbtiFilter} onChange={(e) => setMbtiFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <option value="">MBTI</option>
            {MBTI_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={tempFilter} onChange={(e) => setTempFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <option value="">기질</option>
            {TEMP_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label} ({o.value})</option>)}
          </select>
          <div className="flex gap-1 ml-auto">
            <button onClick={() => setSortBy('latest')} className={`px-3 py-2 rounded-xl text-sm font-medium transition ${sortBy === 'latest' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>최신순</button>
            <button onClick={() => setSortBy('popular')} className={`px-3 py-2 rounded-xl text-sm font-medium transition ${sortBy === 'popular' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>인기순</button>
          </div>
        </div>

        {/* 글쓰기 버튼 */}
        {!showWrite && (
          <button onClick={() => setShowWrite(true)} className="w-full mb-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-sm hover:opacity-90 transition shadow-lg shadow-indigo-200">
            ✏️ 글쓰기
          </button>
        )}

        {/* 글쓰기 폼 */}
        {showWrite && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">새 글 쓰기</h3>
              <button onClick={() => setShowWrite(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {/* 유형 선택 */}
            <div className="mb-3 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">나의 유형 선택</p>
              <div className="flex flex-wrap gap-2">
                <select value={writeMbti} onChange={(e) => setWriteMbti(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  <option value="">MBTI</option>
                  {MBTI_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={writeTemp1} onChange={(e) => setWriteTemp1(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  <option value="">1차 기질</option>
                  {TEMP_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <select value={writeTemp2} onChange={(e) => setWriteTemp2(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  <option value="">2차 기질</option>
                  {TEMP_OPTIONS.filter((o) => o.value !== writeTemp1).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              {writeTypeCode && (
                <div className="flex items-center gap-2 mt-2">
                  <TypeBadge code={writeTypeCode} />
                  <span className="text-xs text-gray-400">이 뱃지로 글이 게시됩니다</span>
                </div>
              )}
            </div>

            <input type="text" placeholder="제목 (2~50자)" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            <textarea placeholder="내용을 입력하세요 (10~2000자)&#10;&#10;나의 유형 경험, 연애 이야기, 직장 에피소드 등 자유롭게 작성하세요!"
              value={content} onChange={(e) => setContent(e.target.value)} maxLength={2000} rows={5}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{content.length}/2000</span>
              {error && <span className="text-xs text-red-500">{error}</span>}
              <button onClick={handleSubmit} disabled={submitting}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50">
                {submitting ? '게시 중...' : '게시하기'}
              </button>
            </div>
          </div>
        )}

        {/* 글 목록 */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-indigo-300 border-t-transparent rounded-full mb-3" />
            <p className="text-sm">불러오는 중...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-gray-500 text-sm mb-1">아직 글이 없습니다</p>
            <p className="text-gray-400 text-xs">첫 번째 글을 작성해보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:border-gray-200 transition">
                {/* 작성자 정보 */}
                <div className="flex items-center gap-2 mb-2">
                  <TypeBadge code={post.type_code} />
                  <span className="text-xs text-gray-400">{post.nickname}</span>
                  <span className="text-xs text-gray-300 ml-auto">{timeAgo(post.created_at)}</span>
                </div>

                {/* 제목 & 내용 */}
                <h2 className="font-bold text-gray-800 text-sm sm:text-base mb-1.5">{post.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 whitespace-pre-wrap">{post.content}</p>

                {/* 하단 액션 */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                  <button onClick={() => handleLike(post.id, post.likes)}
                    className={`flex items-center gap-1 text-xs transition ${localStorage.getItem(`liked-${post.id}`) ? 'text-pink-500 font-medium' : 'text-gray-400 hover:text-pink-500'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={localStorage.getItem(`liked-${post.id}`) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    공감 {post.likes > 0 && post.likes}
                  </button>
                  <button onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-1 text-xs transition ${openCommentId === post.id ? 'text-indigo-500 font-medium' : 'text-gray-400 hover:text-indigo-500'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    댓글 {post.comment_count ?? 0}
                  </button>
                </div>

                {/* 댓글 영역 */}
                {openCommentId === post.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {/* 댓글 목록 */}
                    {comments[post.id] && comments[post.id].length > 0 ? (
                      <div className="space-y-2 mb-3">
                        {comments[post.id].map((c) => (
                          <div key={c.id} className="bg-gray-50 rounded-xl p-3">
                            <div className="flex items-center gap-1.5 mb-1">
                              <TypeBadge code={c.type_code} />
                              <span className="text-xs text-gray-400">{c.nickname}</span>
                              <span className="text-xs text-gray-300 ml-auto">{timeAgo(c.created_at)}</span>
                            </div>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 mb-3 text-center py-2">아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
                    )}

                    {/* 댓글 입력 */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="댓글을 입력하세요..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        maxLength={500}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCommentSubmit(post.id); } }}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={commentSubmitting || !commentText.trim()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                      >
                        {commentSubmitting ? '...' : '등록'}
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
