import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TypeDetailContent } from '@/components/TypeDetailContent';
import JsonLd from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

const mbtiDescriptions: Record<string, { name: string; desc: string }> = {
  ISTJ: { name: '신뢰의 수호자', desc: 'ISTJ 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ISFJ: { name: '따뜻한 수호자', desc: 'ISFJ 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  INFJ: { name: '통찰의 예언자', desc: 'INFJ 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  INTJ: { name: '전략의 설계자', desc: 'INTJ 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ISTP: { name: '냉철한 장인', desc: 'ISTP 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ISFP: { name: '호기심 많은 예술가', desc: 'ISFP 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  INFP: { name: '이상의 중재자', desc: 'INFP 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  INTP: { name: '논리의 사색가', desc: 'INTP 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ESTP: { name: '모험의 사업가', desc: 'ESTP 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ESFP: { name: '자유로운 연예인', desc: 'ESFP 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ENFP: { name: '열정의 캠페이너', desc: 'ENFP 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ENTP: { name: '발명의 토론가', desc: 'ENTP 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ESTJ: { name: '엄격한 관리자', desc: 'ESTJ 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ESFJ: { name: '사교의 외교관', desc: 'ESFJ 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ENFJ: { name: '정의의 선도자', desc: 'ENFJ 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
  ENTJ: { name: '대담한 통솔자', desc: 'ENTJ 유형의 성격 특징, 기질별 차이, 연애 스타일, 직업 추천을 확인하세요.' },
};

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const mbtiType = type.toUpperCase();
  const info = mbtiDescriptions[mbtiType];
  if (!info) return { title: '유형을 찾을 수 없습니다' };

  return {
    title: `${mbtiType} 성격 유형 — ${info.name} | 기질별 심층 분석`,
    description: info.desc,
    keywords: [mbtiType, `${mbtiType} 성격`, `${mbtiType} 특징`, `${mbtiType} 연애`, `${mbtiType} 직업`, 'MBTI', '기질론'],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://192types.com'}/types/${type}`,
    },
    openGraph: {
      title: `${mbtiType} 성격 유형 — ${info.name}`,
      description: info.desc,
    },
  };
}

const validTypes = ['istj','isfj','infj','intj','istp','isfp','infp','intp','estp','esfp','enfp','entp','estj','esfj','enfj','entj'];

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}

export default async function TypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const mbtiType = type.toUpperCase();

  if (!validTypes.includes(type.toLowerCase())) {
    notFound();
  }

  const info = mbtiDescriptions[mbtiType];
  const typeName = info ? `${mbtiType} ${info.name}` : mbtiType;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '성격 유형', item: `${SITE_URL}/types` },
          { '@type': 'ListItem', position: 3, name: typeName },
        ],
      }} />
      <div className="max-w-3xl mx-auto">
        <Link href="/types" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-indigo-600 mb-6 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          모든 유형 보기
        </Link>

        <TypeDetailContent mbtiType={mbtiType} />
      </div>
    </div>
  );
}
