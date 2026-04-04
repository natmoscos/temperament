import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TypeDetailContent } from '@/components/TypeDetailContent';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
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
