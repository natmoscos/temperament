'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';

const mbtiTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const tempCodes = [
  'SC', 'SP', 'SM', 'CS', 'CP', 'CM',
  'PS', 'PC', 'PM', 'MS', 'MC', 'MP',
];

const tempNames: Record<string, string> = {
  S: '다혈질', C: '담즙질', P: '점액질', M: '우울질',
};

export default function DemoPage() {
  const router = useRouter();
  const [mbti, setMbti] = useState('ENTP');
  const [temp, setTemp] = useState('CS');
  const [loading, setLoading] = useState(false);

  const generateAnswers = () => {
    setLoading(true);

    // MBTI 축별 목표 점수 방향
    const mbtiTarget: Record<string, 'high' | 'low'> = {
      EI: mbti[0] === 'E' ? 'high' : 'low',
      SN: mbti[1] === 'N' ? 'high' : 'low',
      TF: mbti[2] === 'F' ? 'high' : 'low',
      JP: mbti[3] === 'P' ? 'high' : 'low',
    };

    // 기질별 목표 점수 (1차 > 2차 > 나머지)
    const primary = temp[0];
    const secondary = temp[1];
    const tempTarget: Record<string, number> = { S: 3, C: 3, P: 3, M: 3 };
    tempTarget[primary] = 6;
    tempTarget[secondary] = 5;

    const answers = questions.map((q) => {
      let value = 4; // 기본 중간값

      if (q.category.type === 'mbti') {
        const axis = q.category.axis;
        const target = mbtiTarget[axis];
        if (target === 'high') {
          // high = E, N, F, P 방향
          value = q.reversed ? 2 : 6; // reversed면 낮은 점수가 high 방향
        } else {
          value = q.reversed ? 6 : 2;
        }
        // 약간의 변동 추가
        value = Math.max(1, Math.min(7, value + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)));
      } else if (q.category.type === 'temperament') {
        const t = q.category.temperament;
        value = tempTarget[t] + (Math.random() > 0.5 ? 0 : (Math.random() > 0.5 ? 1 : -1));
        value = Math.max(1, Math.min(7, value));
      }

      return {
        questionId: q.id,
        order: q.order,
        value: Math.round(value),
      };
    });

    localStorage.setItem('temperament-test-answers', JSON.stringify(answers));
    localStorage.removeItem('result-tone'); // 톤 초기화

    router.push('/result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">결과 미리보기</h1>
          <p className="text-sm text-gray-500">원하는 유형을 선택하면 해당 유형의 결과지를 바로 볼 수 있어요</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          {/* MBTI 선택 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">MBTI 유형</label>
            <div className="grid grid-cols-4 gap-2">
              {mbtiTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setMbti(t)}
                  className={`px-2 py-2 rounded-xl text-sm font-medium transition ${
                    mbti === t
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 기질 선택 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">기질 조합</label>
            <div className="grid grid-cols-3 gap-2">
              {tempCodes.map((c) => (
                <button
                  key={c}
                  onClick={() => setTemp(c)}
                  className={`px-2 py-2.5 rounded-xl text-sm font-medium transition ${
                    temp === c
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-bold">{c}</span>
                  <span className="text-xs block opacity-80">{tempNames[c[0]]}+{tempNames[c[1]]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 선택된 유형 표시 */}
          <div className="text-center py-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">미리볼 유형</p>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {mbti}-{temp}
            </p>
          </div>

          {/* 결과 보기 버튼 */}
          <button
            onClick={generateAnswers}
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? '생성 중...' : '이 유형의 결과 보기 →'}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          * 데모용 가상 응답이 생성됩니다. 실제 검사 결과와 퍼센티지가 다를 수 있습니다.
        </p>
      </div>
    </div>
  );
}
