'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

interface ReportData {
  typeIntro: string;
  strengths: string[];
  blindSpots: string[];
  loveStyle: string;
  careerAdvice: string;
  stressPattern: string;
  growthGuide: string;
  dailyTips: string[];
}

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export default function ReportPage({ params }: PageProps) {
  const { orderId } = use(params);
  const [report, setReport] = useState<ReportData | null>(null);
  const [fullCode, setFullCode] = useState('');
  const [status, setStatus] = useState<'loading' | 'generating' | 'done' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!orderId) return;

    // localStorage에서 유형 코드 가져오기
    try {
      const savedResult = localStorage.getItem('temperament-test-result');
      if (savedResult) {
        const parsed = JSON.parse(savedResult);
        setFullCode(parsed.fullCode || '');
      }
    } catch { /* 무시 */ }

    // AI 리포트 생성 요청
    async function generateReport() {
      setStatus('generating');
      try {
        const res = await fetch('/api/report/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });
        const data = await res.json();
        if (res.ok && data.report) {
          setReport(data.report);
          setStatus('done');
        } else {
          setErrorMsg(data.error || '리포트 생성에 실패했습니다.');
          setStatus('error');
        }
      } catch {
        setErrorMsg('서버 연결에 실패했습니다.');
        setStatus('error');
      }
    }

    generateReport();
  }, [orderId]);

  if (status === 'loading' || status === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
            <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">AI가 리포트를 작성 중입니다</h2>
          <p className="text-sm text-gray-500 mb-1">{fullCode && `${fullCode} 유형 맞춤 분석 중...`}</p>
          <p className="text-xs text-gray-400">30초~1분 정도 소요됩니다</p>
          <div className="flex justify-center gap-1 mt-6">
            {['성격 분석', '연애 패턴', '커리어 전략', '성장 가이드'].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-300 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                <span className="text-[9px] text-gray-400 hidden sm:block">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <span className="text-5xl block mb-4">⚠️</span>
          <h1 className="text-xl font-bold text-gray-800 mb-2">리포트 생성 실패</h1>
          <p className="text-gray-500 mb-6">{errorMsg}</p>
          <p className="text-xs text-gray-400 mb-6">결제는 정상 처리되었습니다. 이 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              다시 시도
            </button>
            <Link href="/" className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">
              홈으로
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            문제가 지속될 경우 zx.mocz@gmail.com으로 문의해주세요.<br />
            주문번호: {orderId}
          </p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* 헤더 */}
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-4">
            ✨ AI 개인화 리포트
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            {fullCode || '성격 유형'}
          </h1>
          <p className="text-gray-500 text-sm">Claude AI가 당신만을 위해 작성한 맞춤 분석</p>
        </div>

        {/* 유형 소개 */}
        <Section icon="🧬" title="이 유형 조합의 핵심">
          <p className="text-gray-700 leading-[1.9] text-[15px] whitespace-pre-line">{report.typeIntro}</p>
        </Section>

        {/* 강점 */}
        <Section icon="💪" title="당신의 핵심 강점 5가지">
          <div className="space-y-3">
            {report.strengths.map((s, i) => {
              const [title, ...rest] = s.split(': ');
              const desc = rest.join(': ');
              return (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{title}</p>
                    {desc && <p className="text-sm text-gray-500 mt-0.5">{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 맹점/약점 */}
        <Section icon="🔍" title="놓치기 쉬운 맹점">
          <div className="space-y-3">
            {report.blindSpots.map((b, i) => {
              const [title, ...rest] = b.split(': ');
              const desc = rest.join(': ');
              return (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">!</span>
                  <div>
                    <p className="font-semibold text-gray-800">{title}</p>
                    {desc && <p className="text-sm text-gray-500 mt-0.5">{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 연애 스타일 */}
        <Section icon="❤️" title="연애 & 관계 심층 분석">
          <p className="text-gray-700 leading-[1.9] text-[15px] whitespace-pre-line">{report.loveStyle}</p>
        </Section>

        {/* 커리어 */}
        <Section icon="🚀" title="커리어 전략">
          <p className="text-gray-700 leading-[1.9] text-[15px] whitespace-pre-line">{report.careerAdvice}</p>
        </Section>

        {/* 스트레스 패턴 */}
        <Section icon="🌊" title="스트레스 패턴과 회복법">
          <p className="text-gray-700 leading-[1.9] text-[15px] whitespace-pre-line">{report.stressPattern}</p>
        </Section>

        {/* 성장 가이드 */}
        <Section icon="🌱" title="지금 당장 실천할 성장 가이드">
          <p className="text-gray-700 leading-[1.9] text-[15px] whitespace-pre-line">{report.growthGuide}</p>
        </Section>

        {/* 오늘의 팁 */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>⚡</span> 오늘 바로 실천할 5가지
          </h3>
          <div className="space-y-3">
            {report.dailyTips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-white/90 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <p className="text-sm text-gray-500 mb-1">이 리포트는 <strong>{fullCode}</strong> 유형을 위해 AI가 작성했습니다</p>
          <p className="text-xs text-gray-400 mb-4">주문번호: {orderId}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/result" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
              결과 페이지로
            </Link>
            <Link href="/test" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition">
              재검사하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
        <span className="text-2xl">{icon}</span>{title}
      </h3>
      {children}
    </div>
  );
}
