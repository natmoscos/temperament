'use client';

import { useState, useEffect } from 'react';

// ────────────────────────────────────────────
// Props & Types
// ────────────────────────────────────────────

interface TypeComparisonProps {
  myCode: string;       // e.g. "ENFJ-SC"
  partnerCode: string;  // e.g. "INTJ-CM"
}

interface AxisComparison {
  axis: string;
  label: string;
  leftPole: string;
  rightPole: string;
  leftLabel: string;
  rightLabel: string;
  myPosition: 'left' | 'right';
  partnerPosition: 'left' | 'right';
  same: boolean;
}

interface CommunicationTip {
  icon: string;
  category: string;
  tip: string;
}

interface CombinationInsight {
  title: string;
  description: string;
}

// ────────────────────────────────────────────
// Temperament data
// ────────────────────────────────────────────

const temperamentNames: Record<string, string> = {
  S: '다혈질', C: '담즙질', P: '점액질', M: '우울질',
};

const temperamentSpeeds: Record<string, string> = {
  S: '빠르고 즉흥적',
  C: '빠르고 결단력 있는',
  P: '느긋하고 신중한',
  M: '느리고 꼼꼼한',
};

// ────────────────────────────────────────────
// Analysis logic
// ────────────────────────────────────────────

function parseCode(code: string): { mbti: string; temp: string; tempPrimary: string; tempSecondary: string } {
  const [mbti, temp] = code.split('-');
  return {
    mbti: mbti ?? '',
    temp: temp ?? 'SC',
    tempPrimary: (temp ?? 'SC')[0],
    tempSecondary: (temp ?? 'SC')[1],
  };
}

function getAxisComparisons(myMbti: string, partnerMbti: string): AxisComparison[] {
  const axes: { axis: string; label: string; leftPole: string; rightPole: string; leftLabel: string; rightLabel: string; myIdx: number; partnerIdx: number }[] = [
    { axis: 'EI', label: '에너지 방향', leftPole: 'E', rightPole: 'I', leftLabel: '외향', rightLabel: '내향', myIdx: 0, partnerIdx: 0 },
    { axis: 'SN', label: '인식 방식', leftPole: 'S', rightPole: 'N', leftLabel: '감각', rightLabel: '직관', myIdx: 1, partnerIdx: 1 },
    { axis: 'TF', label: '판단 방식', leftPole: 'T', rightPole: 'F', leftLabel: '사고', rightLabel: '감정', myIdx: 2, partnerIdx: 2 },
    { axis: 'JP', label: '생활 방식', leftPole: 'J', rightPole: 'P', leftLabel: '판단', rightLabel: '인식', myIdx: 3, partnerIdx: 3 },
  ];

  return axes.map(a => {
    const myLetter = myMbti[a.myIdx] ?? '';
    const partnerLetter = partnerMbti[a.partnerIdx] ?? '';
    const myPos = myLetter === a.leftPole ? 'left' as const : 'right' as const;
    const partnerPos = partnerLetter === a.leftPole ? 'left' as const : 'right' as const;
    return {
      axis: a.axis,
      label: a.label,
      leftPole: a.leftPole,
      rightPole: a.rightPole,
      leftLabel: a.leftLabel,
      rightLabel: a.rightLabel,
      myPosition: myPos,
      partnerPosition: partnerPos,
      same: myPos === partnerPos,
    };
  });
}

function generateCommunicationTips(
  myMbti: string,
  partnerMbti: string,
  myTempPrimary: string,
  partnerTempPrimary: string,
): CommunicationTip[] {
  const tips: CommunicationTip[] = [];

  // E/I axis: energy recharge difference
  const sameEI = myMbti[0] === partnerMbti[0];
  if (sameEI) {
    if (myMbti[0] === 'E') {
      tips.push({
        icon: '🔋',
        category: '에너지 충전 방식',
        tip: '둘 다 외향형이라 함께 활동할 때 에너지가 넘칩니다. 하지만 서로 말하려는 욕구가 강하니, 의식적으로 "오늘은 네 이야기를 들을게"라는 시간을 정해보세요.',
      });
    } else {
      tips.push({
        icon: '🔋',
        category: '에너지 충전 방식',
        tip: '둘 다 내향형이라 조용한 시간의 소중함을 이해합니다. 다만 각자의 공간에만 머물면 소통이 줄어들 수 있으니, 정기적으로 깊은 대화 시간을 만들어보세요.',
      });
    }
  } else {
    const eType = myMbti[0] === 'E' ? '나' : '상대';
    const iType = myMbti[0] === 'I' ? '나' : '상대';
    tips.push({
      icon: '🔋',
      category: '에너지 충전 방식',
      tip: `${eType}는 사람과의 교류에서, ${iType}는 혼자만의 시간에서 에너지를 얻습니다. ${eType}가 모임을 제안할 때 ${iType}의 충전 시간을 존중하고, ${iType}도 가끔은 함께하는 활동에 참여해주세요.`,
    });
  }

  // T/F axis: conflict resolution difference
  const sameTF = myMbti[2] === partnerMbti[2];
  if (sameTF) {
    if (myMbti[2] === 'F') {
      tips.push({
        icon: '🤝',
        category: '갈등 해결 방식',
        tip: '둘 다 감정을 중시하는 유형이라 공감 능력이 뛰어납니다. 하지만 갈등 시 감정이 앞서 객관적 판단이 흐려질 수 있으니, 냉각 시간 후 논리적으로 정리하는 습관을 가져보세요.',
      });
    } else {
      tips.push({
        icon: '🤝',
        category: '갈등 해결 방식',
        tip: '둘 다 논리를 중시하는 유형이라 문제 해결이 효율적입니다. 하지만 감정적 공감 없이 해결책만 제시하면 서로 차갑게 느낄 수 있으니, "네 마음은 어때?"라는 질문을 잊지 마세요.',
      });
    }
  } else {
    const fType = myMbti[2] === 'F' ? '나' : '상대';
    const tType = myMbti[2] === 'T' ? '나' : '상대';
    tips.push({
      icon: '🤝',
      category: '갈등 해결 방식',
      tip: `${fType}는 감정적 공감을, ${tType}는 논리적 해결을 먼저 원합니다. 갈등 시 ${fType}에게는 먼저 감정을 인정해주고, ${tType}에게는 해결 방향을 함께 논의해보세요. "공감 먼저, 해결은 그 다음"이 황금 공식입니다.`,
    });
  }

  // Temperament primary: action speed difference
  const sameTemp = myTempPrimary === partnerTempPrimary;
  if (sameTemp) {
    tips.push({
      icon: '⚡',
      category: '행동 속도 차이',
      tip: `둘 다 ${temperamentNames[myTempPrimary]} 기질이라 ${temperamentSpeeds[myTempPrimary]} 리듬이 비슷합니다. 같은 속도의 장점을 살리되, ${myTempPrimary === 'S' ? '즉흥적으로만 흐르지 말고 가끔 계획도 세워보세요' : myTempPrimary === 'C' ? '서로 양보 없이 부딪히지 않도록 역할을 나눠보세요' : myTempPrimary === 'P' ? '편안함에 안주하지 말고 함께 새로운 도전도 해보세요' : '서로의 완벽주의가 부딪히지 않도록 기준을 조율해보세요'}.`,
    });
  } else {
    const mySpeed = temperamentSpeeds[myTempPrimary] ?? '고유한';
    const partnerSpeed = temperamentSpeeds[partnerTempPrimary] ?? '고유한';
    tips.push({
      icon: '⚡',
      category: '행동 속도 차이',
      tip: `나는 ${mySpeed} 리듬, 상대는 ${partnerSpeed} 리듬입니다. 중요한 결정은 빠른 쪽이 조금 기다려주고, 느린 쪽이 조금 서둘러보는 타협점을 찾으세요. "내 속도가 맞다"는 생각을 내려놓는 게 핵심입니다.`,
    });
  }

  return tips;
}

function generateStrengths(
  axes: AxisComparison[],
  myTempPrimary: string,
  partnerTempPrimary: string,
): CombinationInsight[] {
  const strengths: CombinationInsight[] = [];

  // Complementary traits (different) provide balance
  const diffAxes = axes.filter(a => !a.same);
  const sameAxes = axes.filter(a => a.same);

  if (diffAxes.length >= 3) {
    strengths.push({
      title: '관점의 다양성',
      description: 'MBTI 4축 중 3개 이상이 다르므로, 서로가 보지 못하는 각도에서 세상을 바라봅니다. 한쪽이 놓치는 것을 다른 쪽이 채워줄 수 있는 강력한 보완 관계입니다.',
    });
  }

  if (sameAxes.length >= 3) {
    strengths.push({
      title: '깊은 공감대',
      description: 'MBTI 4축 중 3개 이상이 같아서, 세상을 바라보는 방식이 매우 유사합니다. 말하지 않아도 통하는 편안함이 이 관계의 큰 자산입니다.',
    });
  }

  // E/I complementary
  const eiAxis = axes.find(a => a.axis === 'EI');
  if (eiAxis && !eiAxis.same) {
    strengths.push({
      title: '사회적 균형',
      description: '외향형이 새로운 관계와 경험을 열어주고, 내향형이 깊이와 성찰을 더합니다. 사교 활동과 휴식의 자연스러운 밸런스가 만들어집니다.',
    });
  }

  // S/N same = shared perception
  const snAxis = axes.find(a => a.axis === 'SN');
  if (snAxis && snAxis.same) {
    strengths.push({
      title: '같은 파장의 대화',
      description: snAxis.myPosition === 'left'
        ? '둘 다 현실적인 감각형이라 구체적이고 실용적인 대화가 잘 통합니다.'
        : '둘 다 직관형이라 추상적 아이디어와 미래 가능성에 대한 대화가 풍부합니다.',
    });
  }

  // Temperament complement
  if (myTempPrimary !== partnerTempPrimary) {
    const pair = `${myTempPrimary}${partnerTempPrimary}`;
    const complementPairs: Record<string, string> = {
      'SC': '다혈질의 밝은 에너지와 담즙질의 추진력이 만나 실행력 있는 팀워크를 발휘합니다.',
      'CS': '담즙질의 리더십과 다혈질의 사교성이 만나 강력한 시너지를 냅니다.',
      'SP': '다혈질의 활기와 점액질의 안정감이 서로를 완벽하게 보완합니다.',
      'PS': '점액질의 차분함이 다혈질의 산만함을 잡아주고, 다혈질의 에너지가 점액질을 활기차게 합니다.',
      'SM': '다혈질의 낙관이 우울질의 깊이와 만나 창의적 영감의 원천이 됩니다.',
      'MS': '우울질의 분석력과 다혈질의 실행력이 만나 아이디어를 현실로 바꿉니다.',
      'CP': '담즙질의 결단력과 점액질의 인내심이 만나 안정적이면서 생산적인 관계를 만듭니다.',
      'PC': '점액질의 부드러움이 담즙질의 강함을 중화시켜 균형 잡힌 파트너십이 됩니다.',
      'CM': '담즙질의 실행력과 우울질의 완벽주의가 만나 높은 수준의 결과물을 냅니다.',
      'MC': '우울질의 세밀함과 담즙질의 추진력이 합쳐져 전략적 팀이 됩니다.',
      'PM': '점액질의 평화로움과 우울질의 깊이가 만나 고요하지만 깊은 유대를 형성합니다.',
      'MP': '우울질의 이상주의와 점액질의 현실적 안정감이 서로를 지탱합니다.',
    };
    const desc = complementPairs[pair];
    if (desc) {
      strengths.push({ title: '기질의 보완 효과', description: desc });
    }
  } else {
    strengths.push({
      title: '같은 기질의 공명',
      description: `둘 다 ${temperamentNames[myTempPrimary]} 기질이라 삶의 리듬과 가치관이 비슷합니다. 상대의 행동을 직관적으로 이해할 수 있는 것이 큰 강점입니다.`,
    });
  }

  return strengths;
}

function generateWarnings(
  axes: AxisComparison[],
  myTempPrimary: string,
  partnerTempPrimary: string,
): CombinationInsight[] {
  const warnings: CombinationInsight[] = [];

  const diffAxes = axes.filter(a => !a.same);
  const sameAxes = axes.filter(a => a.same);

  if (diffAxes.length >= 3) {
    warnings.push({
      title: '소통 비용이 높음',
      description: '서로 다른 점이 많아 의사소통에 더 많은 노력이 필요합니다. "왜 저렇게 생각하지?"가 아니라 "저 사람은 다른 렌즈로 보는구나"라고 이해하는 것이 핵심입니다.',
    });
  }

  if (sameAxes.length >= 3) {
    warnings.push({
      title: '사각지대 공유',
      description: '비슷한 성향이라 편하지만, 같은 약점도 공유합니다. 둘 다 놓치는 부분이 생기기 쉬우니 가끔 제3자의 시각을 빌려보세요.',
    });
  }

  // T/F different = potential emotional friction
  const tfAxis = axes.find(a => a.axis === 'TF');
  if (tfAxis && !tfAxis.same) {
    warnings.push({
      title: '감정 vs 논리 충돌',
      description: '한쪽은 공감을 원하는데 다른 쪽은 해결책을 제시하는 엇갈림이 생길 수 있습니다. "지금 공감이 필요해" / "지금 해결책이 필요해"라고 명확히 표현하는 연습을 하세요.',
    });
  }

  // J/P different = lifestyle friction
  const jpAxis = axes.find(a => a.axis === 'JP');
  if (jpAxis && !jpAxis.same) {
    warnings.push({
      title: '계획 vs 즉흥 마찰',
      description: '한쪽은 계획대로 움직이고 싶고, 다른 쪽은 유연하게 흘러가고 싶어합니다. 여행, 약속, 일상에서 "기본 틀은 정하되 여유를 남기는" 타협이 필요합니다.',
    });
  }

  // Same temperament warnings
  if (myTempPrimary === partnerTempPrimary) {
    const sameWarnings: Record<string, string> = {
      S: '둘 다 즐거움을 추구하다 보면 진지한 문제를 계속 미룰 수 있습니다. 재미만 추구하면 관계의 깊이가 얕아질 수 있으니, 진지한 대화 시간을 정기적으로 가져보세요.',
      C: '둘 다 주도하려 하면 치열한 권력 다툼이 될 수 있습니다. 영역을 나누고, 각자 리드하는 분야를 명확히 하는 것이 평화의 열쇠입니다.',
      P: '둘 다 평화를 추구하다 보면 중요한 결정을 끝없이 미룰 수 있습니다. "불편하더라도 결정해야 할 것"을 먼저 꺼내는 용기가 필요합니다.',
      M: '둘 다 완벽을 추구하고 비관적 경향이 있어서, 부정적 감정이 증폭될 위험이 있습니다. 서로를 비판하기보다 격려하는 습관을 키우세요.',
    };
    const w = sameWarnings[myTempPrimary];
    if (w) {
      warnings.push({ title: '같은 기질의 함정', description: w });
    }
  } else {
    // Different temperament speed friction
    const fastTemps = ['S', 'C'];
    const slowTemps = ['P', 'M'];
    const myFast = fastTemps.includes(myTempPrimary);
    const partnerFast = fastTemps.includes(partnerTempPrimary);
    if (myFast !== partnerFast) {
      warnings.push({
        title: '속도 차이 주의',
        description: '한쪽은 빠르게 움직이고 다른 쪽은 천천히 가려 합니다. 빠른 쪽은 "왜 이렇게 느려?"라는 답답함을, 느린 쪽은 "왜 이렇게 급해?"라는 부담을 느낄 수 있습니다. 서로의 페이스를 인정하는 것이 첫걸음입니다.',
      });
    }
  }

  return warnings;
}

// ────────────────────────────────────────────
// Axis Bar Component
// ────────────────────────────────────────────

function AxisBar({ comparison }: { comparison: AxisComparison }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const myOnLeft = comparison.myPosition === 'left';
  const partnerOnLeft = comparison.partnerPosition === 'left';
  const bothSame = comparison.same;

  // Determine colors
  const myColor = 'from-indigo-500 to-indigo-600';
  const partnerColor = 'from-pink-500 to-rose-500';
  const bothColor = 'from-purple-500 to-purple-600';

  return (
    <div className="space-y-2">
      {/* Axis label */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-400">{comparison.label}</span>
        {bothSame && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">
            SAME
          </span>
        )}
        {!bothSame && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">
            DIFF
          </span>
        )}
      </div>

      {/* Poles */}
      <div className="flex justify-between items-center text-sm">
        <span className={`font-bold ${
          (myOnLeft && partnerOnLeft) ? 'text-purple-600' :
          myOnLeft ? 'text-indigo-600' :
          partnerOnLeft ? 'text-pink-500' :
          'text-gray-400'
        }`}>
          {comparison.leftPole} {comparison.leftLabel}
        </span>
        <span className={`font-bold ${
          (!myOnLeft && !partnerOnLeft) ? 'text-purple-600' :
          !myOnLeft ? 'text-indigo-600' :
          !partnerOnLeft ? 'text-pink-500' :
          'text-gray-400'
        }`}>
          {comparison.rightLabel} {comparison.rightPole}
        </span>
      </div>

      {/* Bar */}
      <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 z-10" />

        {bothSame ? (
          // Both on same side
          <div
            className={`absolute top-1 bottom-1 rounded-full bg-gradient-to-r ${bothColor} transition-all duration-700 ease-out ${animated ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: myOnLeft ? '4px' : '50%',
              right: myOnLeft ? '50%' : '4px',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: animated ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: myOnLeft ? 'left' : 'right',
            }}
          >
            <div className="flex items-center justify-center h-full gap-1">
              <span className="text-[10px] font-bold text-white/90">나</span>
              <span className="text-[10px] text-white/60">&</span>
              <span className="text-[10px] font-bold text-white/90">상대</span>
            </div>
          </div>
        ) : (
          // Different sides
          <>
            {/* My bar */}
            <div
              className={`absolute top-1 rounded-full bg-gradient-to-r ${myColor} transition-all duration-700 ease-out`}
              style={{
                left: myOnLeft ? '4px' : '50%',
                right: myOnLeft ? '50%' : '4px',
                bottom: '50%',
                marginBottom: '1px',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: animated ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: myOnLeft ? 'left' : 'right',
              }}
            >
              <div className="flex items-center justify-center h-full">
                <span className="text-[10px] font-bold text-white/90">나</span>
              </div>
            </div>
            {/* Partner bar */}
            <div
              className={`absolute bottom-1 rounded-full bg-gradient-to-r ${partnerColor} transition-all duration-700 ease-out`}
              style={{
                left: partnerOnLeft ? '4px' : '50%',
                right: partnerOnLeft ? '50%' : '4px',
                top: '50%',
                marginTop: '1px',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: animated ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: partnerOnLeft ? 'left' : 'right',
              }}
            >
              <div className="flex items-center justify-center h-full">
                <span className="text-[10px] font-bold text-white/90">상대</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────

export default function TypeComparison({ myCode, partnerCode }: TypeComparisonProps) {
  const my = parseCode(myCode);
  const partner = parseCode(partnerCode);

  const axisComparisons = getAxisComparisons(my.mbti, partner.mbti);
  const communicationTips = generateCommunicationTips(my.mbti, partner.mbti, my.tempPrimary, partner.tempPrimary);
  const strengths = generateStrengths(axisComparisons, my.tempPrimary, partner.tempPrimary);
  const warnings = generateWarnings(axisComparisons, my.tempPrimary, partner.tempPrimary);

  const diffCount = axisComparisons.filter(a => !a.same).length;
  const sameCount = axisComparisons.filter(a => a.same).length;

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
          <span className="text-2xl">🔬</span> 나 vs 상대 비교 분석
        </h3>
        <p className="text-sm text-gray-500 ml-9">
          MBTI 4축과 기질을 기반으로 두 유형의 차이를 시각적으로 비교합니다
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-5 ml-9">
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600" />
            <span className="text-xs font-medium text-gray-600">나 ({myCode})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
            <span className="text-xs font-medium text-gray-600">상대 ({partnerCode})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
            <span className="text-xs font-medium text-gray-600">같은 성향</span>
          </div>
        </div>
      </div>

      {/* MBTI 4-Axis Visual Comparison */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h4 className="font-bold text-gray-800 mb-1">MBTI 4축 비교</h4>
        <p className="text-xs text-gray-400 mb-6">
          {sameCount}개 축 일치 / {diffCount}개 축 차이
        </p>

        <div className="space-y-6">
          {axisComparisons.map((comp) => (
            <AxisBar key={comp.axis} comparison={comp} />
          ))}
        </div>

        {/* Temperament comparison */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4">기질 비교</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4 text-center border border-indigo-100">
              <p className="text-xs text-gray-400 mb-1">나의 기질</p>
              <p className="text-lg font-black text-indigo-600">{my.temp}</p>
              <p className="text-xs text-gray-500 mt-1">
                {temperamentNames[my.tempPrimary]}+{temperamentNames[my.tempSecondary]}
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 text-center border border-pink-100">
              <p className="text-xs text-gray-400 mb-1">상대 기질</p>
              <p className="text-lg font-black text-pink-600">{partner.temp}</p>
              <p className="text-xs text-gray-500 mt-1">
                {temperamentNames[partner.tempPrimary]}+{temperamentNames[partner.tempSecondary]}
              </p>
            </div>
          </div>
          {my.tempPrimary === partner.tempPrimary && (
            <p className="text-center text-xs text-purple-500 font-medium mt-3">
              주기질이 같은 {temperamentNames[my.tempPrimary]}! 삶의 리듬이 비슷합니다
            </p>
          )}
          {my.tempPrimary !== partner.tempPrimary && (
            <p className="text-center text-xs text-amber-500 font-medium mt-3">
              {temperamentNames[my.tempPrimary]}과 {temperamentNames[partner.tempPrimary]}의 만남 — 서로 다른 리듬이 새로운 화학반응을 만듭니다
            </p>
          )}
        </div>
      </div>

      {/* Communication Tips */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-1">
          <span className="text-xl">💡</span> 소통 팁 3가지
        </h4>
        <p className="text-xs text-gray-400 mb-5 ml-7">유형 차이에 기반한 맞춤 소통 전략</p>

        <div className="space-y-4">
          {communicationTips.map((tip, i) => (
            <div key={i} className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">{tip.icon}</span>
                <div>
                  <p className="font-semibold text-gray-700 text-sm mb-1">{tip.category}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Warnings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 p-5 sm:p-6">
          <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-4">
            <span className="text-xl">💎</span> 이 조합의 강점
          </h4>
          <ul className="space-y-4">
            {strengths.map((s, i) => (
              <li key={i}>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-emerald-500 font-bold">+</span>
                  <div>
                    <p className="font-semibold text-sm text-emerald-800">{s.title}</p>
                    <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Warnings */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-5 sm:p-6">
          <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-4">
            <span className="text-xl">🔔</span> 이 조합의 주의점
          </h4>
          <ul className="space-y-4">
            {warnings.map((w, i) => (
              <li key={i}>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-amber-500 font-bold">!</span>
                  <div>
                    <p className="font-semibold text-sm text-amber-800">{w.title}</p>
                    <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">{w.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
