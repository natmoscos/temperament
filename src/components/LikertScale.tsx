'use client';

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const labels = [
  '매우\n아니다',
  '아니다',
  '약간\n아니다',
  '보통',
  '약간\n그렇다',
  '그렇다',
  '매우\n그렇다',
];

export default function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="flex justify-between items-end gap-2 sm:gap-3 mt-10">
      {labels.map((label, index) => {
        const score = index + 1;
        const isSelected = value === score;
        // 중앙(4)에서 멀어질수록 크기 증가
        const distance = Math.abs(index - 3);
        const size = 40 + distance * 6;

        return (
          <button
            key={score}
            onClick={() => onChange(score)}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`
                rounded-full transition-all duration-200 flex items-center justify-center
                font-bold text-lg cursor-pointer
                ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-300 scale-110'
                    : 'bg-gray-100 text-gray-400 hover:bg-indigo-100 hover:text-indigo-500'
                }
              `}
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              {score}
            </div>
            <span
              className={`text-xs text-center whitespace-pre-line leading-tight ${
                isSelected ? 'text-indigo-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
