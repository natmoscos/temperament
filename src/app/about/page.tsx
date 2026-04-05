import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '192 성격 유형 검사',
  url: SITE_URL,
  description: 'MBTI와 히포크라테스 기질론을 결합한 192가지 성격 유형 검사 서비스',
  email: 'zx.mocz@gmail.com',
  sameAs: [],
  foundingDate: '2026',
};

export const metadata: Metadata = {
  title: '서비스 소개 — 192 성격 유형 검사란?',
  description: 'MBTI 16유형과 히포크라테스 기질론 12조합을 결합한 192가지 성격 유형 검사 서비스. 칼 융, Eysenck, Helen Fisher 이론 기반.',
  keywords: ['192 성격 유형 검사', 'MBTI 기질론', '성격 검사 서비스', '히포크라테스 기질론', 'Eysenck', 'Helen Fisher'],
  openGraph: {
    title: '서비스 소개 — 192 성격 유형 검사란?',
    description: 'MBTI 16유형과 히포크라테스 기질론 12조합을 결합한 192가지 성격 유형 검사 서비스입니다.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <JsonLd data={organizationSchema} />
      <div className="w-full max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium mb-6 inline-block">
          ← 홈으로
        </Link>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">서비스 소개</h1>
        <p className="text-gray-500 text-sm mb-8">192 성격 유형 검사에 대해 알아보세요</p>

        <div className="space-y-5">

          {/* 서비스 소개 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-xl text-white font-black">T</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">192 성격 유형 검사</h2>
                <p className="text-xs text-gray-400">MBTI + Hippocrates Temperament</p>
              </div>
            </div>
            <p className="text-[15px] text-gray-600 leading-[1.85]">
              192 성격 유형 검사는 칼 융의 인지기능 이론(MBTI)과 히포크라테스의 4가지 기질론을
              과학적으로 결합한 통합 성격 분석 서비스입니다.
              MBTI 16가지 유형에 기질 12가지 조합을 더해, 당신만의 고유한 192가지 성격 유형을 발견할 수 있습니다.
            </p>
          </div>

          {/* 왜 192가지인가 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🧬 왜 192가지인가?</h2>
            <div className="text-[15px] text-gray-600 leading-[1.85] space-y-3">
              <p>
                같은 ENFJ라도 다혈질 ENFJ와 우울질 ENFJ는 완전히 다른 사람입니다.
                MBTI만으로는 설명할 수 없었던 &ldquo;나의 모순&rdquo;을 기질론이 풀어줍니다.
              </p>
              <div className="grid grid-cols-3 gap-3 py-2">
                <div className="text-center p-3 bg-indigo-50 rounded-xl">
                  <p className="text-2xl font-black text-indigo-600">16</p>
                  <p className="text-xs text-gray-500 mt-1">MBTI 유형</p>
                </div>
                <div className="text-center p-3 flex items-center justify-center">
                  <span className="text-2xl text-gray-400">×</span>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-black text-purple-600">12</p>
                  <p className="text-xs text-gray-500 mt-1">기질 조합</p>
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">= 192</p>
                <p className="text-xs text-gray-500 mt-1">고유한 성격 유형</p>
              </div>
            </div>
          </div>

          {/* 학술적 근거 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📚 학술적 근거</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Carl Jung의 인지기능 이론 (1921)',
                  desc: 'MBTI의 기반이 되는 8가지 인지기능(Se, Si, Ne, Ni, Te, Ti, Fe, Fi)을 통해 사고와 인식 패턴을 분석합니다.',
                },
                {
                  title: 'Hippocrates의 4가지 기질론 (BC 400)',
                  desc: '2,400년의 관찰을 기반으로 한 4가지 기본 기질(다혈질, 담즙질, 점액질, 우울질)로 성격의 감정적 측면을 분석합니다.',
                },
                {
                  title: 'Hans Eysenck의 2차원 성격 모델 (1967)',
                  desc: '외향성(Extraversion)과 신경증(Neuroticism) 두 축이 히포크라테스의 4기질과 정확히 일치함을 과학적으로 증명했습니다.',
                },
                {
                  title: 'Helen Fisher의 신경화학 모델 (2009)',
                  desc: '도파민, 세로토닌, 테스토스테론, 에스트로겐 4가지 신경전달물질이 기질과 연애 스타일에 미치는 영향을 연구했습니다.',
                },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-indigo-200 pl-4">
                  <p className="text-sm font-semibold text-gray-700">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 검사 구성 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📝 검사 구성</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-xl">
                <p className="font-bold text-indigo-700 mb-1">정밀 검사</p>
                <p className="text-sm text-gray-600">100문항 · 약 12~15분</p>
                <p className="text-xs text-gray-400 mt-1">MBTI 60문항 + 기질 40문항</p>
                <p className="text-xs text-gray-400">7점 리커트 척도 · 신뢰도 검증 포함</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <p className="font-bold text-amber-700 mb-1">⚡ 빠른 검사</p>
                <p className="text-sm text-gray-600">30문항 · 약 3분</p>
                <p className="text-xs text-gray-400 mt-1">핵심 문항만 추출</p>
                <p className="text-xs text-gray-400">정밀 검사 유도용 (정확도 70%)</p>
              </div>
            </div>
          </div>

          {/* 제공 분석 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📊 제공되는 분석</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🪞', title: '성격 심층 분석', desc: '모순과 숨겨진 자아' },
                { icon: '❤️', title: '연애 스타일', desc: '궁합 · 사랑의 언어' },
                { icon: '🚀', title: '커리어 전략', desc: '최적 업무 환경' },
                { icon: '🌊', title: '스트레스 패턴', desc: 'Grip 상태 · 회복법' },
                { icon: '🔬', title: '과학적 근거', desc: 'Eysenck · Fisher' },
                { icon: '💘', title: '궁합 검사', desc: 'MBTI + 기질 궁합' },
                { icon: '📄', title: 'PDF 보고서', desc: '전체 분석 다운로드' },
                { icon: '📖', title: '인생 공략집', desc: '맞춤 성장 전략' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{item.title}</p>
                    <p className="text-[11px] text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 연락처 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📬 연락처</h2>
            <div className="text-[15px] text-gray-600 leading-[1.85]">
              <p>서비스 관련 문의, 제안, 오류 신고는 아래로 보내주세요.</p>
              <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm space-y-1">
                <p><strong>이메일:</strong> zx.mocz@gmail.com</p>
                <p><strong>서비스:</strong> 192 성격 유형 검사 (192types.com)</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
            <h3 className="text-xl font-bold mb-2">나의 192가지 성격 유형은?</h3>
            <p className="text-sm text-indigo-200 mb-5">무료로 시작하세요</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/test"
                className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg"
              >
                100문항 정밀 검사
              </Link>
              <Link
                href="/quick-test"
                className="px-6 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition border border-white/30"
              >
                ⚡ 3분 빠른 검사
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-300">
          <p>Temperament &copy; 2026. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
