'use client';

import { useEffect, useState } from 'react';
import type { TemperamentType } from '@/data/types';

interface TemperamentRadarProps {
  temperamentScores: Record<TemperamentType, { score: number; percentage: number }>;
}

const axes: { key: TemperamentType; label: string; color: string; fillColor: string }[] = [
  { key: 'S', label: '다혈질(S)', color: '#f59e0b', fillColor: 'rgba(245,158,11,0.15)' },
  { key: 'C', label: '담즙질(C)', color: '#ef4444', fillColor: 'rgba(239,68,68,0.15)' },
  { key: 'P', label: '점액질(P)', color: '#10b981', fillColor: 'rgba(16,185,129,0.15)' },
  { key: 'M', label: '우울질(M)', color: '#3b82f6', fillColor: 'rgba(59,130,246,0.15)' },
];

const balanceTips: Record<TemperamentType, string> = {
  S: '사교적 에너지가 낮은 당신은 일주일에 한 번 새로운 사람과 대화해보세요',
  C: '추진력이 낮은 당신은 작은 목표를 세우고 즉시 실행하는 연습이 도움됩니다',
  P: '안정감이 낮은 당신은 급한 결정 전에 5분만 멈추는 연습이 도움됩니다',
  M: '완벽하지 않아도 시작하는 용기가 당신의 성장 열쇠입니다',
};

const CX = 150;
const CY = 150;
const RADIUS = 110;
const LABEL_RADIUS = RADIUS + 28;

// 4 axes at top, right, bottom, left (angles: -90, 0, 90, 180 degrees)
const angleForIndex = (i: number): number => (i * Math.PI) / 2 - Math.PI / 2;

function polarToCart(angle: number, r: number): { x: number; y: number } {
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

export default function TemperamentRadar({ temperamentScores }: TemperamentRadarProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Build polygon points for the data shape
  const dataPoints = axes.map((axis, i) => {
    const pct = temperamentScores[axis.key].percentage / 100;
    const scale = animated ? pct : 0;
    const angle = angleForIndex(i);
    return polarToCart(angle, RADIUS * scale);
  });

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  // Gradient fill color based on primary temperament
  const sortedByScore = [...axes].sort(
    (a, b) => temperamentScores[b.key].percentage - temperamentScores[a.key].percentage
  );
  const primaryColor = sortedByScore[0].color;

  // Find lowest scoring temperament for balance tip
  const lowestAxis = [...axes].sort(
    (a, b) => temperamentScores[a.key].percentage - temperamentScores[b.key].percentage
  )[0];

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
        <span className="text-2xl">🕸️</span>기질 밸런스 레이더
      </h3>

      {/* Radar chart */}
      <div className="flex justify-center mb-6">
        <svg
          viewBox="0 0 300 300"
          className="w-full max-w-[320px] sm:max-w-[360px]"
          role="img"
          aria-label="기질 밸런스 레이더 차트"
        >
          {/* Background grid rings */}
          {rings.map((scale) => {
            const pts = axes
              .map((_, i) => {
                const p = polarToCart(angleForIndex(i), RADIUS * scale);
                return `${p.x},${p.y}`;
              })
              .join(' ');
            return (
              <polygon
                key={scale}
                points={pts}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={scale === 1 ? 1.5 : 0.8}
              />
            );
          })}

          {/* Axis lines */}
          {axes.map((_, i) => {
            const end = polarToCart(angleForIndex(i), RADIUS);
            return (
              <line
                key={`axis-${i}`}
                x1={CX}
                y1={CY}
                x2={end.x}
                y2={end.y}
                stroke="#d1d5db"
                strokeWidth={0.8}
              />
            );
          })}

          {/* Percentage labels on rings */}
          {rings.map((scale) => {
            const p = polarToCart(angleForIndex(0), RADIUS * scale);
            return (
              <text
                key={`ring-label-${scale}`}
                x={p.x + 4}
                y={p.y - 4}
                fontSize="9"
                fill="#9ca3af"
                textAnchor="start"
              >
                {Math.round(scale * 100)}%
              </text>
            );
          })}

          {/* Data polygon with gradient fill */}
          <defs>
            <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path
            d={dataPath}
            fill="url(#radarFill)"
            stroke={primaryColor}
            strokeWidth={2}
            strokeLinejoin="round"
            className="transition-all duration-1000 ease-out"
          />

          {/* Data points (dots on each vertex) */}
          {dataPoints.map((p, i) => (
            <circle
              key={`dot-${i}`}
              cx={p.x}
              cy={p.y}
              r={4.5}
              fill={axes[i].color}
              stroke="white"
              strokeWidth={2}
              className="transition-all duration-1000 ease-out"
            />
          ))}

          {/* Axis labels */}
          {axes.map((axis, i) => {
            const lp = polarToCart(angleForIndex(i), LABEL_RADIUS);
            const pct = temperamentScores[axis.key].percentage;
            // Adjust text anchor based on position
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (i === 1) textAnchor = 'start';
            if (i === 3) textAnchor = 'end';
            // Adjust vertical offset for top/bottom
            let dy = 0;
            if (i === 0) dy = -4;
            if (i === 2) dy = 12;
            return (
              <g key={`label-${i}`}>
                <text
                  x={lp.x}
                  y={lp.y + dy}
                  fontSize="12"
                  fontWeight="600"
                  fill={axis.color}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                >
                  {axis.label}
                </text>
                <text
                  x={lp.x}
                  y={lp.y + dy + 16}
                  fontSize="11"
                  fontWeight="500"
                  fill="#6b7280"
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                >
                  {pct}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Score breakdown mini bar */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {axes.map((axis) => {
          const pct = temperamentScores[axis.key].percentage;
          return (
            <div key={axis.key} className="text-center">
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: animated ? `${pct}%` : '0%',
                    backgroundColor: axis.color,
                  }}
                />
              </div>
              <span className="text-xs font-medium" style={{ color: axis.color }}>
                {axis.label.replace(/\(.\)/, '').trim()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Balance tip */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-gray-200 p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">💡</span>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Balance Tip</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {balanceTips[lowestAxis.key]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
