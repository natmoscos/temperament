'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

// 비선형 시각 프로그레스: 시작/끝 가속, 중반 감속 (체감 속도감 증가)
// 실제 채점·진행에는 영향 없음 — 시각적 바 폭만 변환
function visualProgress(p: number): number {
  const t = p / 100;
  // ease-in-out 커브: 초반 빠르게 → 중반 안정 → 후반 빠르게
  const visual = t < 0.5
    ? 2 * t * t + 0.15 * t          // 초반 부스트 (10% → ~12.5%, 30% → ~22.5%)
    : 1 - Math.pow(-2 * t + 2, 2) / 2 + 0.05;  // 후반 가속
  return Math.min(Math.max(visual * 100, 0), 100);
}

// 색상 단계
function barColor(p: number): string {
  if (p < 25) return 'from-indigo-500 to-blue-500';
  if (p < 50) return 'from-blue-500 to-purple-500';
  if (p < 75) return 'from-purple-500 to-pink-500';
  return 'from-pink-500 to-amber-400';
}

// 격려 메시지
function encourageMsg(p: number): string | null {
  if (p >= 90) return '거의 다 왔어요! 🎯';
  if (p >= 75) return '마지막 스퍼트! 💪';
  if (p >= 50) return '절반 돌파! 🔥';
  if (p >= 25) return '좋은 페이스에요 👍';
  return null;
}

export default function ProgressBar({ current, total, percentage }: ProgressBarProps) {
  const visual = visualProgress(percentage);
  const msg = encourageMsg(percentage);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">
          <span className="font-bold text-indigo-600">{current + 1}</span> / {total}
        </span>
        <div className="flex items-center gap-2">
          {msg && (
            <span className="text-xs text-indigo-500 font-medium animate-pulse">
              {msg}
            </span>
          )}
          <span className="text-sm text-gray-500">{percentage}%</span>
        </div>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barColor(percentage)} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${visual}%` }}
        />
      </div>
    </div>
  );
}
