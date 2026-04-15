import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MBTI_DESCRIPTIONS: Record<string, string> = {
  INTJ: '전략적 설계자 — 독립적이고 분석적이며 장기적 비전을 중시한다. 효율성을 추구하고 시스템을 개선하려 한다.',
  INTP: '논리적 사색가 — 추상적 이론과 논리 분석을 즐긴다. 지식 탐구에 몰두하며 유연한 사고를 한다.',
  ENTJ: '대담한 지휘관 — 리더십이 강하고 목표 지향적이다. 구조를 만들고 팀을 이끄는 것을 즐긴다.',
  ENTP: '혁신적 발명가 — 도전적이고 창의적이다. 아이디어 탐색과 토론을 즐기며 가능성을 본다.',
  INFJ: '통찰력 있는 조언자 — 깊은 직관과 공감 능력을 가진다. 타인의 성장을 돕는 데 의미를 찾는다.',
  INFP: '감성적 이상주의자 — 가치 지향적이고 진정성을 중시한다. 내면의 이상과 창의적 표현을 추구한다.',
  ENFJ: '카리스마 있는 멘토 — 사람을 이끌고 영감을 준다. 타인의 잠재력을 발견하고 성장시키려 한다.',
  ENFP: '열정적 캠페이너 — 가능성과 사람에게 열정적이다. 창의적이고 사교적이며 변화를 추구한다.',
  ISTJ: '신뢰할 수 있는 관리자 — 책임감 강하고 체계적이다. 전통과 의무를 중시하며 꼼꼼하게 실행한다.',
  ISFJ: '헌신적인 수호자 — 따뜻하고 배려심이 깊다. 타인을 돌보고 안정적인 환경을 만드는 것을 중시한다.',
  ESTJ: '엄격한 관리자 — 실용적이고 단호하다. 규칙과 질서를 유지하며 효율적으로 조직을 운영한다.',
  ESFJ: '배려 깊은 외교관 — 사교적이고 조화를 중시한다. 타인의 필요를 살피고 공동체를 돌본다.',
  ISTP: '만능 해결사 — 실용적이고 논리적이다. 문제를 직접 해결하며 도구와 시스템을 잘 다룬다.',
  ISFP: '호기심 많은 예술가 — 감각적이고 자유를 사랑한다. 지금 이 순간을 즐기며 예술적 감성이 풍부하다.',
  ESTP: '모험적인 기업가 — 에너지 넘치고 즉흥적이다. 위험을 감수하며 실용적인 문제 해결을 즐긴다.',
  ESFP: '자유로운 연예인 — 활기차고 사교적이다. 즐거움을 만들고 주변 사람들에게 에너지를 준다.',
};

const TEMPERAMENT_DESCRIPTIONS: Record<string, string> = {
  SC: '다혈질+담즙질 — 활발하고 카리스마 넘침. 빠른 결단력과 사교성을 동시에 갖춤.',
  SM: '다혈질+우울질 — 창의적이고 감성적이면서도 사교적. 예술적 감수성과 표현력이 뛰어남.',
  SP: '다혈질+점액질 — 활발하지만 안정적. 사람들과 잘 어울리면서도 갈등을 피하는 성향.',
  CS: '담즙질+다혈질 — 목표지향적이고 카리스마 강함. 추진력과 사교성을 겸비.',
  CM: '담즙질+우울질 — 완벽주의적 리더. 높은 기준과 강한 의지력, 전략적 사고.',
  CP: '담즙질+점액질 — 단호하지만 인내심 있음. 목표 달성에 체계적이고 안정적.',
  PS: '점액질+다혈질 — 온화하고 사교적. 조용하면서도 유머가 있고 관계를 소중히 여김.',
  PC: '점액질+담즙질 — 차분하지만 결단력 있음. 신중하게 행동하며 리더십도 발휘.',
  PM: '점액질+우울질 — 매우 신중하고 깊이 사색함. 내면이 풍부하고 섬세한 배려심.',
  MS: '우울질+다혈질 — 감성적이고 창의적이면서 사교적. 예술적 표현과 인간관계를 모두 중시.',
  MC: '우울질+담즙질 — 이상주의적 완벽주의자. 높은 기준과 강한 목적의식.',
  MP: '우울질+점액질 — 가장 내향적이고 섬세함. 깊은 사색과 진정성 있는 관계를 추구.',
};

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return Response.json({ error: 'orderId가 필요합니다.' }, { status: 400 });
    }

    // Supabase에서 결제 정보 조회
    const { data: payment, error: dbError } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .eq('status', 'confirmed')
      .single();

    if (dbError || !payment) {
      return Response.json({ error: '유효하지 않은 결제입니다.' }, { status: 404 });
    }

    // 이미 리포트가 생성된 경우 캐시된 결과 반환
    if (payment.report_data) {
      return Response.json({ success: true, report: payment.report_data });
    }

    // Claude API 호출
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'AI 서비스가 설정되지 않았습니다.' }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });

    const mbtiDesc = MBTI_DESCRIPTIONS[payment.mbti_type] || payment.mbti_type;
    const tempDesc = TEMPERAMENT_DESCRIPTIONS[payment.temperament_code] || payment.temperament_code;

    const prompt = `당신은 성격 심리학과 히포크라테스 기질론 전문가입니다. 아래 성격 유형 분석 결과를 바탕으로 한국어로 깊이 있는 개인화 리포트를 작성해주세요.

## 검사 결과
- MBTI 유형: ${payment.mbti_type} (${mbtiDesc})
- 기질 조합: ${payment.temperament_code} (${tempDesc})
- 통합 유형 코드: ${payment.full_code}

## 작성 지침
- 직접적이고 구체적으로 쓰세요. 뻔한 말("당신은 특별합니다") 금지.
- 이 특정 조합(${payment.full_code})만이 가진 독특한 특성에 초점.
- 실생활에서 바로 쓸 수 있는 조언을 포함하세요.
- 각 섹션 400~600자 분량.

## 리포트 구성 (JSON 형식으로 반환)

다음 JSON 구조로 정확하게 반환하세요:
{
  "typeIntro": "이 유형 조합의 핵심 특성과 내면의 작동 원리 설명 (600자)",
  "strengths": ["강점 1 (제목: 설명 형식, 60자)", "강점 2", "강점 3", "강점 4", "강점 5"],
  "blindSpots": ["맹점/약점 1 (제목: 설명 형식, 60자)", "맹점 2", "맹점 3", "맹점 4"],
  "loveStyle": "연애에서 이 유형이 보이는 패턴, 감정 표현 방식, 갈등 처리법, 최적 파트너 특성 (500자)",
  "careerAdvice": "이 유형에게 최적화된 커리어 환경, 일하는 방식, 피해야 할 환경, 추천 직업군 (500자)",
  "stressPattern": "스트레스 받을 때 보이는 행동 패턴과 회복 방법, 번아웃 징후 (400자)",
  "growthGuide": "성장을 위해 지금 당장 실천할 수 있는 구체적인 행동 3가지와 장기 발전 방향 (500자)",
  "dailyTips": ["오늘 바로 실천할 수 있는 팁 1", "팁 2", "팁 3", "팁 4", "팁 5"]
}

JSON만 반환하세요. 다른 텍스트 없이.`;

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('AI 응답 형식 오류');
    }

    // JSON 파싱
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI 응답 파싱 실패');
    }
    const reportData = JSON.parse(jsonMatch[0]);

    // Supabase에 리포트 저장
    await supabase
      .from('payments')
      .update({
        report_data: reportData,
        report_generated_at: new Date().toISOString(),
      })
      .eq('order_id', orderId);

    return Response.json({ success: true, report: reportData });
  } catch (err) {
    console.error('Report generation error:', err);
    return Response.json({ error: '리포트 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
