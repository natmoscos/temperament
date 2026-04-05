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

const shortLabels = [
  '매우\n아니다',
  '',
  '',
  '보통',
  '',
  '',
  '매우\n그렇다',
];

export default function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="flex justify-between items-end gap-1 sm:gap-3 mt-10 w-full overflow-hidden">
      {labels.map((label, index) => {
        const score = index + 1;
        const isSelected = value === score;
        const distance = Math.abs(index - 3);

        return (
          <button
            key={score}
            onClick={() => onChange(score)}
            className="flex flex-col items-center gap-1.5 sm:gap-2 group flex-1 min-w-0"
          >
            <div
              className={`
                rounded-full transition-all duration-200 flex items-center justify-center
                font-bold cursor-pointer
                w-8 h-8 text-sm
                sm:text-lg
                ${distance === 0 ? 'sm:w-10 sm:h-10' : distance === 1 ? 'sm:w-11 sm:h-11' : distance === 2 ? 'sm:w-12 sm:h-12' : 'sm:w-[58px] sm:h-[58px]'}
                ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-300 scale-110'
                    : 'bg-gray-100 text-gray-400 hover:bg-indigo-100 hover:text-indigo-500'
                }
              `}
            >
              {score}
            </div>
            {/* 모바일에서는 양 끝 + 중간만 표시, PC에서는 전체 표시 */}
            <span
              className={`text-center whitespace-pre-line leading-tight hidden sm:block text-xs ${
                isSelected ? 'text-indigo-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
            <span
              className={`text-center whitespace-pre-line leading-tight sm:hidden text-[10px] ${
                isSelected ? 'text-indigo-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {shortLabels[index]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
