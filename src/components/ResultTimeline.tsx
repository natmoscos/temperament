'use client';

import { useEffect, useState } from 'react';

interface TimelineEntry {
  date: string;
  fullCode: string;
  eiPct: number;
  snPct: number;
  tfPct: number;
  jpPct: number;
}

interface ResultTimelineProps {
  fullCode: string;
  eiPct: number;
  snPct: number;
  tfPct: number;
  jpPct: number;
}

const STORAGE_KEY = 'result-timeline';
const MAX_ENTRIES = 5;

const axisLabels: Record<string, { name: string; left: string; right: string }> = {
  ei: { name: '외향/내향', left: 'E', right: 'I' },
  sn: { name: '직관/감각', left: 'N', right: 'S' },
  tf: { name: '감정/사고', left: 'F', right: 'T' },
  jp: { name: '인식/판단', left: 'P', right: 'J' },
};

const temperamentNames: Record<string, string> = {
  S: '다혈질', C: '담즙질', P: '점액질', M: '우울질',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${m}/${day}`;
}

function formatDateFull(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function getTemperamentCode(fullCode: string): string {
  // "ENFJ-SC" -> "SC"
  return fullCode.split('-')[1] || '';
}

function getChangeIndicator(diff: number): { icon: string; color: string } {
  if (diff > 0) return { icon: '\u2191', color: 'text-green-600' };
  if (diff < 0) return { icon: '\u2193', color: 'text-amber-600' };
  return { icon: '=', color: 'text-gray-400' };
}

function generateInsight(prev: TimelineEntry, curr: TimelineEntry): string[] {
  const insights: string[] = [];

  const prevTempCode = getTemperamentCode(prev.fullCode);
  const currTempCode = getTemperamentCode(curr.fullCode);
  if (prevTempCode !== currTempCode) {
    const prevPrimary = temperamentNames[prevTempCode[0]] || prevTempCode[0];
    const currPrimary = temperamentNames[currTempCode[0]] || currTempCode[0];
    if (prevTempCode[0] !== currTempCode[0]) {
      insights.push(`기질이 ${prevPrimary}\u2192${currPrimary}로 바뀌었어요`);
    } else {
      const prevSecondary = temperamentNames[prevTempCode[1]] || prevTempCode[1];
      const currSecondary = temperamentNames[currTempCode[1]] || currTempCode[1];
      insights.push(`2차 기질이 ${prevSecondary}\u2192${currSecondary}로 바뀌었어요`);
    }
  }

  const axes = [
    { key: 'ei', prev: prev.eiPct, curr: curr.eiPct, highLabel: '외향(E)', lowLabel: '내향(I)' },
    { key: 'sn', prev: prev.snPct, curr: curr.snPct, highLabel: '직관(N)', lowLabel: '감각(S)' },
    { key: 'tf', prev: prev.tfPct, curr: curr.tfPct, highLabel: '감정(F)', lowLabel: '사고(T)' },
    { key: 'jp', prev: prev.jpPct, curr: curr.jpPct, highLabel: '인식(P)', lowLabel: '판단(J)' },
  ];

  // Find the axis with the biggest change
  let maxDiff = 0;
  let maxAxis: (typeof axes)[0] | null = null;
  for (const axis of axes) {
    const diff = Math.abs(axis.curr - axis.prev);
    if (diff > maxDiff) {
      maxDiff = diff;
      maxAxis = axis;
    }
  }

  if (maxAxis && maxDiff >= 3) {
    const increasing = maxAxis.curr > maxAxis.prev;
    const label = increasing ? maxAxis.highLabel : maxAxis.lowLabel;
    insights.push(`${label} 성향이 ${maxDiff}% 강해졌어요`);
  }

  if (insights.length === 0) {
    const prevMbti = prev.fullCode.split('-')[0];
    const currMbti = curr.fullCode.split('-')[0];
    if (prevMbti !== currMbti) {
      insights.push(`MBTI가 ${prevMbti}\u2192${currMbti}로 변화했어요`);
    } else {
      insights.push('전반적으로 비슷한 성향을 유지하고 있어요');
    }
  }

  return insights;
}

export default function ResultTimeline({ fullCode, eiPct, snPct, tfPct, jpPct }: ResultTimelineProps) {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const timeline: TimelineEntry[] = stored ? JSON.parse(stored) : [];

      const currentEntry: TimelineEntry = {
        date: new Date().toISOString(),
        fullCode,
        eiPct,
        snPct,
        tfPct,
        jpPct,
      };

      // Only add if last entry is different (different fullCode or significant % shift)
      const last = timeline[timeline.length - 1];
      const isDifferent = !last ||
        last.fullCode !== fullCode ||
        Math.abs(last.eiPct - eiPct) >= 2 ||
        Math.abs(last.snPct - snPct) >= 2 ||
        Math.abs(last.tfPct - tfPct) >= 2 ||
        Math.abs(last.jpPct - jpPct) >= 2;

      if (isDifferent) {
        timeline.push(currentEntry);
        // Keep max entries
        while (timeline.length > MAX_ENTRIES) {
          timeline.shift();
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(timeline));
      }

      setEntries(timeline);
    } catch {
      /* localStorage unavailable */
    }
    setMounted(true);
  }, [fullCode, eiPct, snPct, tfPct, jpPct]);

  if (!mounted) return null;

  // Single entry: first-time message
  if (entries.length <= 1) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📊</span>
          <h3 className="text-lg font-bold text-gray-800">나의 성격 변화</h3>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
          <span className="text-2xl">🔄</span>
          <p className="text-sm text-gray-600">
            다음에 다시 검사하면 성격 변화를 추적할 수 있어요!
          </p>
        </div>
      </div>
    );
  }

  // Multiple entries: show timeline visualization
  const prev = entries[entries.length - 2];
  const curr = entries[entries.length - 1];
  const insights = generateInsight(prev, curr);
  const typeChanged = prev.fullCode !== curr.fullCode;

  const axisDiffs = [
    { key: 'ei', label: axisLabels.ei, prev: prev.eiPct, curr: curr.eiPct },
    { key: 'sn', label: axisLabels.sn, prev: prev.snPct, curr: curr.snPct },
    { key: 'tf', label: axisLabels.tf, prev: prev.tfPct, curr: curr.tfPct },
    { key: 'jp', label: axisLabels.jp, prev: prev.jpPct, curr: curr.jpPct },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">📊</span>
        <h3 className="text-lg font-bold text-gray-800">나의 성격 변화</h3>
        <span className="text-xs text-gray-400 ml-auto">{entries.length}회 검사</span>
      </div>

      {/* ---- Horizontal timeline (desktop) / Vertical (mobile) ---- */}
      <div className="mb-6">
        {/* Desktop: horizontal */}
        <div className="hidden sm:block">
          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0" />
            {entries.map((entry, i) => {
              const isCurrent = i === entries.length - 1;
              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      isCurrent
                        ? 'bg-indigo-500 border-indigo-500 ring-4 ring-indigo-100'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <span className={`text-xs font-mono ${isCurrent ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>
                    {entry.fullCode}
                  </span>
                  <span className="text-[10px] text-gray-400">{formatDate(entry.date)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="sm:hidden">
          <div className="relative pl-6 space-y-4">
            {/* Connecting line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200" />
            {entries.map((entry, i) => {
              const isCurrent = i === entries.length - 1;
              return (
                <div key={i} className="relative flex items-center gap-3">
                  <div
                    className={`absolute -left-6 w-3.5 h-3.5 rounded-full border-2 ${
                      isCurrent
                        ? 'bg-indigo-500 border-indigo-500 ring-4 ring-indigo-100'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono ${isCurrent ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>
                      {entry.fullCode}
                    </span>
                    <span className="text-[10px] text-gray-400">{formatDateFull(entry.date)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- Type change highlight ---- */}
      {typeChanged && (
        <div className="flex items-center gap-2 mb-4 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
          <span className="text-lg">🔀</span>
          <p className="text-sm font-semibold text-indigo-700">
            <span className="text-gray-500">{prev.fullCode}</span>
            <span className="mx-1.5">&rarr;</span>
            <span className="text-indigo-700">{curr.fullCode}</span>
          </p>
        </div>
      )}

      {/* ---- Axis change bars ---- */}
      <div className="space-y-2.5 mb-5">
        {axisDiffs.map(({ key, label, prev: prevVal, curr: currVal }) => {
          const diff = currVal - prevVal;
          const { icon, color } = getChangeIndicator(diff);
          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span className="w-8 text-gray-400 font-medium shrink-0">{label.left}</span>
              <div className="flex-1 flex items-center gap-1.5">
                <span className="text-gray-400 text-xs w-8 text-right">{prevVal}%</span>
                <span className="text-gray-300">&rarr;</span>
                <span className={`text-xs w-8 font-semibold ${diff !== 0 ? (diff > 0 ? 'text-green-600' : 'text-amber-600') : 'text-gray-500'}`}>
                  {currVal}%
                </span>
                <span className={`text-xs font-bold ${color}`}>{icon}</span>
                {diff !== 0 && (
                  <span className={`text-[10px] ${Math.abs(diff) >= 5 ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                    ({diff > 0 ? '+' : ''}{diff})
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- Insights ---- */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-1.5">
        {insights.map((insight, i) => (
          <p key={i} className="text-sm text-gray-700 flex items-start gap-2">
            <span className="text-amber-500 shrink-0 mt-0.5">&#9679;</span>
            {insight}
          </p>
        ))}
      </div>
    </div>
  );
}
