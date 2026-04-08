'use client';

import { useEffect } from 'react';
import { useResult } from '@/hooks/useResult';
import { HeroCharacter } from '@/components/CharacterAvatar';
import ShareButtons from '@/components/ShareButtons';
import AdPlaceholder from '@/components/AdPlaceholder';
import PdfDownloadButton from '@/components/PdfDownloadButton';
import { LoadingSpinner, NextPageCTA } from '@/components/ResultSection';
import ResultSaveReminder from '@/components/ResultSaveReminder';
import ToneToggle from '@/components/ToneToggle';

const temperamentNames: Record<string, string> = { S: '다혈질', C: '담즙질', P: '점액질', M: '우울질' };
const temperamentTextColors: Record<string, string> = { S: 'text-amber-700', C: 'text-red-700', P: 'text-emerald-700', M: 'text-blue-700' };
const temperamentBgColors: Record<string, string> = { S: 'bg-amber-50 border-amber-200', C: 'bg-red-50 border-red-200', P: 'bg-emerald-50 border-emerald-200', M: 'bg-blue-50 border-blue-200' };
const temperamentColors: Record<string, string> = { S: 'bg-amber-400', C: 'bg-red-400', P: 'bg-emerald-400', M: 'bg-blue-400' };
const mbtiAxisLabels: Record<string, [string, string]> = { EI: ['외향 (E)', '내향 (I)'], SN: ['직관 (N)', '감각 (S)'], TF: ['감정 (F)', '사고 (T)'], JP: ['인식 (P)', '판단 (J)'] };
const reliabilityInfo: Record<string, { text: string; color: string }> = {
  A: { text: '높은 신뢰도', color: 'text-green-600 bg-green-50 border-green-200' },
  B: { text: '보통 신뢰도', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  C: { text: '낮은 신뢰도 — 재검사 권장', color: 'text-red-600 bg-red-50 border-red-200' },
};

export default function ResultSummaryPage() {
  const { result, profile, loading, tone, setTone } = useResult();

  // 동적 OG 메타 태그 삽입 (클라이언트 컴포넌트이므로 useEffect 사용)
  // 참고: 소셜 크롤러는 JS를 실행하지 않으므로 실제 OG 공유는 /share/[code] 페이지가 담당
  // 검사 결과를 localStorage에 저장 (커뮤니티 자동 뱃지용)
  useEffect(() => {
    if (!result) return;
    try {
      localStorage.setItem('temperament-test-result', JSON.stringify({ fullCode: result.fullCode }));
    } catch { /* 무시 */ }
  }, [result]);

  useEffect(() => {
    if (!result || !profile) return;
    const code = result.fullCode;
    const title = `${code} - ${profile.mbtiNickname} | 192 성격 유형 검사`;
    document.title = title;

    // OG 메타 태그 업데이트 또는 추가
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': `${code} 유형: ${profile.mbtiNickname} x ${profile.temperamentNickname}. 나의 숨겨진 성격을 확인하세요!`,
      'og:image': `${window.location.origin}/api/og?code=${code}`,
      'og:url': `${window.location.origin}/share/${code}`,
    };
    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [result, profile]);

  if (loading || !result || !profile) return <LoadingSpinner />;

  const { mbti, temperament, reliability } = result;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">

      {/* ━━━ 메인 결과 카드 ━━━ */}
      <div className={`rounded-2xl shadow-sm border text-center py-10 sm:py-14 px-4 sm:px-6 ${
        tone === 'spicy' ? 'bg-gradient-to-b from-red-50 to-white border-red-100' : 'bg-white border-gray-100'
      }`}>
        <div className="mb-6">
          <HeroCharacter mbtiType={mbti.type} temperamentCode={temperament.code} />
        </div>
        <p className="text-sm text-gray-400 mb-3">{tone === 'spicy' ? '팩폭 결과' : '당신의 성격 유형'}</p>
        <h1 className={`text-4xl sm:text-7xl font-black text-transparent bg-clip-text mb-3 tracking-tight ${
          tone === 'spicy' ? 'bg-gradient-to-r from-red-600 to-orange-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
        }`}>
          {result.fullCode}
        </h1>
        <p className="text-xl text-gray-700 font-semibold">{profile.mbtiEmoji} {profile.mbtiNickname}</p>
        <p className="text-lg text-gray-500 mt-1">{profile.temperamentNickname}</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className={`text-sm px-3 py-1 rounded-lg border ${temperamentBgColors[temperament.primary.type]} ${temperamentTextColors[temperament.primary.type]}`}>
            1차 {temperamentNames[temperament.primary.type]}
          </span>
          <span className={`text-sm px-3 py-1 rounded-lg border ${temperamentBgColors[temperament.secondary.type]} ${temperamentTextColors[temperament.secondary.type]}`}>
            2차 {temperamentNames[temperament.secondary.type]}
          </span>
        </div>
      </div>

      {/* ━━━ 매운맛/순한맛 토글 ━━━ */}
      <ToneToggle tone={tone} setTone={setTone} />

      {/* ━━━ 매운맛: 팩폭 한 줄 요약 ━━━ */}
      {tone === 'spicy' && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🌶️</span>
            <div>
              <h3 className="text-lg font-bold text-red-700 mb-2">한 줄 팩폭</h3>
              <p className="text-gray-700 leading-[1.85] text-[15px]">{profile.spicy.personalityNarrative.split('\n\n')[1] || profile.spicy.personalityNarrative.split('\n')[0]}</p>
            </div>
          </div>
        </div>
      )}

      {/* ━━━ PDF 저장 리마인더 ━━━ */}
      <ResultSaveReminder />

      {/* ━━━ 복합 기질 조합 카드 ━━━ */}
      {profile.dualTemperamentDescription && (
        <div className={`rounded-2xl border p-6 sm:p-8 ${
          tone === 'spicy' ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200' : temperamentBgColors[temperament.primary.type]
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{tone === 'spicy' ? '🔥' : '🧬'}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{temperament.code} — &ldquo;{profile.temperamentNickname}&rdquo;</h3>
              <p className="text-xs text-gray-500">{tone === 'spicy' ? '매운맛으로 보는 당신의 기질 조합' : '히포크라테스 12가지 복합 기질 중 당신의 유형'}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-[1.85] text-[15px]">
            {tone === 'spicy' ? profile.spicy.personalityNarrative : profile.dualTemperamentDescription}
          </p>
        </div>
      )}

      {/* ━━━ 인지기능 & 인구비율 뱃지 ━━━ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-500 mb-1">🧬 인지기능 스택</p>
          <p className="text-lg font-bold text-indigo-600 tracking-wide">{profile.cognitiveStack}</p>
          <p className="text-xs text-gray-400 mt-1">주기능 → 보조기능 → 3차기능 → 열등기능</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-500 mb-1">🌍 인구 비율</p>
          <p className="text-lg font-bold text-purple-600">{profile.population}</p>
          <p className="text-xs text-gray-400 mt-1">전 세계 기준 ({mbti.type} 유형)</p>
        </div>
      </div>

      {/* ━━━ 성향 분석 차트 ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
          <span className="text-2xl">📊</span>성향 분석
        </h3>
        <div className="space-y-4 mb-6">
          {(['EI', 'SN', 'TF', 'JP'] as const).map((axis) => {
            const d = mbti.axes[axis];
            const l = d.percentage, r = 100 - d.percentage;
            const lb = mbtiAxisLabels[axis];
            return (
              <div key={axis}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className={l > 50 ? 'text-indigo-600 font-medium' : l === 50 ? 'text-gray-600 font-medium' : 'text-gray-400'}>{lb[0]} {l}%</span>
                  <span className={r > 50 ? 'text-purple-600 font-medium' : r === 50 ? 'text-gray-600 font-medium' : 'text-gray-400'}>{r}% {lb[1]}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400" style={{ width: `${l}%` }} />
                  <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500" style={{ width: `${r}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-100 pt-5">
          <p className="text-sm font-semibold text-gray-500 mb-3">기질 분포</p>
          <div className="space-y-3">
            {(['S', 'C', 'P', 'M'] as const).map((t) => {
              const d = temperament.all[t];
              const is1 = temperament.primary.type === t;
              const is2 = temperament.secondary.type === t;
              return (
                <div key={t}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={is1 ? `font-semibold ${temperamentTextColors[t]}` : is2 ? 'font-medium text-gray-600' : 'text-gray-400'}>
                      {temperamentNames[t]} {is1 ? '(1차)' : is2 ? '(2차)' : ''}
                    </span>
                    <span className={is1 ? temperamentTextColors[t] : 'text-gray-400'}>{d.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${temperamentColors[t]}`} style={{ width: `${d.percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ━━━ 신뢰도 ━━━ */}
      <div className={`rounded-2xl p-4 text-center text-sm font-medium border ${reliabilityInfo[reliability.grade].color}`}>
        검사 신뢰도 {reliability.grade}등급 — {reliabilityInfo[reliability.grade].text}
      </div>

      {/* ━━━ 공유 버튼 ━━━ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <ShareButtons
          fullCode={result.fullCode}
          mbtiNickname={profile.mbtiNickname}
          temperamentNickname={profile.temperamentNickname}
        />
      </div>

      {/* ━━━ PDF 보고서 다운로드 ━━━ */}
      <PdfDownloadButton result={result} profile={profile} />

      <AdPlaceholder />

      {/* ━━━ 상세 결과 안내 (페이지뷰 유도) ━━━ */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-gray-800 mb-2">📖 당신의 인생 공략집, 더 깊이 알아보세요</h3>
        <p className="text-sm text-gray-500 mb-5">{result.fullCode} 유형을 위한 맞춤 분석이 준비되어 있습니다</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/result/personality', icon: '🪞', title: '성격 심층 분석', desc: '기존 16가지 유형만으로는 설명할 수 없었던 것들' },
            { href: '/result/love', icon: '❤️', title: '연애 & 궁합', desc: '기질이 만드는 당신만의 사랑 방식' },
            { href: '/result/career', icon: '🚀', title: '커리어 전략', desc: '기질별 최적의 업무 환경과 직업' },
            { href: '/result/stress', icon: '🌱', title: '성장 가이드', desc: '스트레스 패턴과 인생 공략집' },
            { href: '/compatibility', icon: '💘', title: '궁합 검사', desc: '상대와의 궁합을 분석해보세요' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-indigo-200 transition group"
            >
              <span className="text-2xl mt-0.5">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ━━━ 재검사 ━━━ */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => {
            localStorage.removeItem('temperament-test-answers');
            window.location.href = '/test';
          }}
          className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition"
        >
          다시 검사하기
        </button>
      </div>
    </div>
  );
}
