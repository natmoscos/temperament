'use client';

import { ResultTone } from '@/data/profiles-integrated';

interface ToneToggleProps {
  tone: ResultTone;
  setTone: (tone: ResultTone) => void;
}

export default function ToneToggle({ tone, setTone }: ToneToggleProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm text-gray-500 hidden sm:inline">분석 말투</span>
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setTone('mild')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tone === 'mild'
                ? 'bg-white shadow-sm text-green-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            🍀 순한맛
          </button>
          <button
            onClick={() => setTone('spicy')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tone === 'spicy'
                ? 'bg-white shadow-sm text-red-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            🌶️ 매운맛
          </button>
        </div>
        {tone === 'spicy' && <span className="text-xs text-red-400 animate-pulse">팩폭 모드</span>}
      </div>
    </div>
  );
}
