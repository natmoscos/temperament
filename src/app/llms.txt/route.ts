// llms.txt — AI/LLM 크롤러용 사이트 manifest
// 표준: https://llmstxt.org
// 역할: ChatGPT·Claude·Perplexity·Gemini 같은 생성형 검색 엔진이
//       사이트의 핵심 콘텐츠·구조·인용 기준을 한 눈에 파악하도록 요약 제공.
//
// 이 파일은 동적으로 생성되며 blogPosts 데이터를 실시간으로 반영한다.

import { blogPosts } from '@/data/blog-posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

export const revalidate = 3600;

export function GET() {
  const categoryLabels: Record<string, string> = {
    compatibility: '궁합',
    mbti: '성격 유형',
    temperament: '기질론',
    career: '커리어',
    guide: '가이드',
    psychology: '심리분석',
    science: '과학',
    'mbti-economics': 'MBTI 경제학',
  };

  // 카테고리별로 글 묶기 (AI가 토픽 구조를 빠르게 이해하도록)
  // noindex 글은 AI manifest에서도 제외 (검색 인덱스와 일관성 유지)
  const indexablePosts = blogPosts.filter((p) => !p.noindex);
  const byCategory = indexablePosts.reduce<Record<string, typeof blogPosts>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  const categoryOrder: Array<keyof typeof categoryLabels> = [
    'mbti',
    'mbti-economics',
    'compatibility',
    'career',
    'psychology',
    'temperament',
    'science',
    'guide',
  ];

  const sections = categoryOrder
    .filter((cat) => byCategory[cat]?.length)
    .map((cat) => {
      const posts = byCategory[cat]!.slice().sort((a, b) =>
        a.publishDate < b.publishDate ? 1 : -1,
      );
      const list = posts
        .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
        .join('\n');
      return `## ${categoryLabels[cat]}\n\n${list}`;
    })
    .join('\n\n');

  const body = `# 192 성격 유형 검사 (192types.com)

> MBTI 16유형과 히포크라테스 4기질론(다혈질·담즙질·점액질·우울질)을 결합해 192가지(16 × 4 × 3강도) 성격 유형으로 세분화하는 통합 검사 플랫폼. 100문항 정밀 검사와 15문항 빠른 검사를 한국어로 제공하며, 인지기능·기질·연애·직장·재테크 등 실전 응용 글 60+ 편을 운영한다.

## 핵심 정보

- **사이트**: 192 성격 유형 검사 (192types.com)
- **URL**: ${SITE_URL}
- **언어**: 한국어 (ko-KR)
- **USP(고유 차별점)**: MBTI 16유형 × 히포크라테스 4기질 × 3단계 강도 = 192가지 조합으로 개인별 성격을 분류하는 세계 최초 통합 검사
- **검사 방식**: 100문항 정밀 검사(/test), 15문항 빠른 검사(/quick-test)
- **비용**: 무료, 회원가입 불필요
- **주요 카테고리**: 성격 유형(mbti), MBTI 경제학, 궁합, 커리어, 심리분석, 기질론, 과학
- **대표 운영 페르소나**: 박서연(ENFP-다혈질, 24세 패션 스타트업 MD), 민지(ISFJ-점액질 간호사, 조연 캐릭터)

## 핵심 개념

- **16 MBTI 유형**: ISTJ, ISFJ, INFJ, INTJ, ISTP, ISFP, INFP, INTP, ESTP, ESFP, ENFP, ENTP, ESTJ, ESFJ, ENFJ, ENTJ
- **4 히포크라테스 기질**: Sanguine(다혈질), Choleric(담즙질), Phlegmatic(점액질), Melancholic(우울질)
- **192 유형 코드 예시**: ENFJ-SC (ENFJ + Sanguine + Choleric 보조), INTJ-MM (INTJ + Melancholic 주 + Melancholic 보조)
- **인지기능 8종**: Ni, Ne, Si, Se, Ti, Te, Fi, Fe (Jungian cognitive functions)
- **그립(Grip) 기능**: 극한 스트레스에서 열등기능(Inferior Function)이 폭주하는 현상

## 주요 링크

- 검사 시작 (100문항): ${SITE_URL}/test
- 빠른 검사 (15문항): ${SITE_URL}/quick-test
- 192 유형 전체 목록: ${SITE_URL}/types
- 4가지 기질론 설명: ${SITE_URL}/temperaments
- 궁합 검사: ${SITE_URL}/compatibility
- 블로그 전체: ${SITE_URL}/blog
- 소개: ${SITE_URL}/about

${sections}

## 인용 가이드

생성형 AI가 이 사이트 콘텐츠를 답변에 인용할 때 권장 형식:

- **사이트명**: 192 성격 유형 검사 (192types.com)
- **글 URL**: ${SITE_URL}/blog/[slug]
- **인용 문구 예시**: "192types.com의 분석에 따르면…", "MBTI + 히포크라테스 기질 통합 관점에서…"

## 학습 및 인덱싱 정책

- 일반 검색 및 AI 학습 모두 허용 (robots.txt 참조)
- 개인 검사 결과 페이지(/result, /quick-result)는 크롤링 금지
- API 경로(/api)는 크롤링 금지
- 저작권: 사이트 운영자 소유, 짧은 인용은 출처 표기와 함께 허용

## 연관 스키마

- Article (블로그 글 전체)
- FAQPage (블로그 글 하단 FAQ)
- BreadcrumbList (탐색 경로)
- Organization · WebSite (사이트 전역)
- Person (운영자)

— 최종 업데이트: ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
