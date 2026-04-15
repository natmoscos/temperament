'use client';

// 공통 유형 뱃지 — "ENFJ-SC" 같은 코드를 색상별 칩으로 표시
// /community 페이지와 동일한 컬러 체계를 사용.

const mbtiColors: Record<string, string> = {
  E: 'bg-amber-100 text-amber-700',
  I: 'bg-indigo-100 text-indigo-700',
  S: 'bg-green-100 text-green-700',
  N: 'bg-purple-100 text-purple-700',
  T: 'bg-cyan-100 text-cyan-700',
  F: 'bg-pink-100 text-pink-700',
  J: 'bg-red-100 text-red-700',
  P: 'bg-blue-100 text-blue-700',
};

const tempColorMap: Record<string, string> = {
  S: 'bg-amber-500 text-white',
  C: 'bg-red-500 text-white',
  P: 'bg-emerald-500 text-white',
  M: 'bg-blue-500 text-white',
};

const tempNameMap: Record<string, string> = {
  S: '다혈',
  C: '담즙',
  P: '점액',
  M: '우울',
};

export function TypeBadge({
  mbti,
  temp,
  size = 'md',
}: {
  mbti?: string | null;
  temp?: string | null;
  size?: 'sm' | 'md' | 'lg';
}) {
  if (!mbti) return null;
  const sizeCls =
    size === 'lg'
      ? 'text-sm px-1.5 py-1'
      : size === 'sm'
      ? 'text-[10px] px-1 py-0.5'
      : 'text-xs px-1 py-0.5';

  return (
    <span className="inline-flex items-center gap-0.5 font-bold">
      {mbti.split('').map((c, i) => (
        <span
          key={`m${i}`}
          className={`rounded ${sizeCls} ${mbtiColors[c] ?? 'bg-gray-100 text-gray-600'}`}
        >
          {c}
        </span>
      ))}
      {temp &&
        temp.split('').map((t, i) => (
          <span
            key={`t${i}`}
            className={`rounded ml-0.5 ${sizeCls} ${tempColorMap[t] ?? 'bg-gray-800 text-white'}`}
            title={tempNameMap[t] ? `${tempNameMap[t]}질` : t}
          >
            {tempNameMap[t] || t}
          </span>
        ))}
    </span>
  );
}

export function TypeBadgeFromCode({ code, size = 'md' }: { code?: string | null; size?: 'sm' | 'md' | 'lg' }) {
  if (!code) return null;
  const [mbti, temp] = code.split('-');
  return <TypeBadge mbti={mbti} temp={temp} size={size} />;
}
