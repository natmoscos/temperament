'use client';

import { blogPosts } from '@/data/blog-posts';

interface CelebrityMatchProps {
  mbtiType: string;
  temperamentCode: string;
}

interface CelebrityInfo {
  name: string;
  typeCode: string;
  thumbnail: string;
  slug: string;
  description: string;
}

// MBTI 유형에서 기질 그룹 추출 (NF, NT, SF, ST)
function getTemperamentGroup(mbtiType: string): string {
  const s_n = mbtiType.charAt(1); // S or N
  const t_f = mbtiType.charAt(2); // T or F
  return `${s_n}${t_f}`;
}

// 블로그 포스트에서 유명인 정보 추출
function extractCelebrityInfo(post: typeof blogPosts[number]): CelebrityInfo | null {
  if (post.category !== 'psychology' || !post.thumbnail || !post.relatedTypes?.length) return null;

  // 제목에서 유명인 이름 추출 (첫 공백 전까지, 예: "테일러 스위프트 MBTI를 분석해봤더니 소름" → "테일러 스위프트")
  const title = post.title;
  const mbtiIndex = title.indexOf('MBTI');
  if (mbtiIndex === -1) return null;

  const name = title.substring(0, mbtiIndex).trim();
  if (!name) return null;

  // slug에서 유형 코드 추출 (예: 'taylor-swift-mbti-enfj' → 'ENFJ')
  const slugParts = post.slug.split('-');
  const mbtiIdx = slugParts.indexOf('mbti');
  const typeCode = mbtiIdx !== -1 && slugParts[mbtiIdx + 1]
    ? slugParts[mbtiIdx + 1].toUpperCase()
    : post.relatedTypes![0];

  // 설명에서 간략 요약 추출
  const desc = post.description;
  // 기질 조합 정보가 있으면 사용
  const comboMatch = desc.match(/([A-Z]{4}-[A-Z]{2})\(([^)]+)\)/);
  const description = comboMatch
    ? `${comboMatch[1]} — ${comboMatch[2]}`
    : `${typeCode} 유형`;

  return {
    name,
    typeCode,
    thumbnail: post.thumbnail,
    slug: post.slug,
    description,
  };
}

export default function CelebrityMatch({ mbtiType, temperamentCode }: CelebrityMatchProps) {
  // 모든 유명인 포스트에서 정보 추출 (noindex 글은 AdSense 품질 리스크로 제외)
  const allCelebrities = blogPosts
    .filter((p) => !p.noindex)
    .map(extractCelebrityInfo)
    .filter((c): c is CelebrityInfo => c !== null);

  if (allCelebrities.length === 0) return null;

  // 정확히 같은 MBTI 유형인 유명인 찾기
  const exactMatches = allCelebrities.filter(
    (c) => c.typeCode === mbtiType
  );

  let celebrities: CelebrityInfo[];
  let heading: string;

  if (exactMatches.length > 0) {
    celebrities = exactMatches.slice(0, 3);
    heading = '당신과 같은 유형의 유명인';
  } else {
    // 같은 기질 그룹(NF/NT/SF/ST)에서 찾기
    const userGroup = getTemperamentGroup(mbtiType);
    const groupMatches = allCelebrities.filter(
      (c) => getTemperamentGroup(c.typeCode) === userGroup
    );

    if (groupMatches.length === 0) return null;

    celebrities = groupMatches.slice(0, 3);
    const groupLabels: Record<string, string> = {
      NF: '이상가형(NF)',
      NT: '전략가형(NT)',
      SF: '수호자형(SF)',
      ST: '행동가형(ST)',
    };
    heading = `같은 ${groupLabels[userGroup] || userGroup} 그룹의 유명인`;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5">
        <span className="text-2xl">🌟</span>{heading}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {celebrities.map((celeb) => (
          <a
            key={celeb.slug}
            href={`/blog/${celeb.slug}`}
            className="group flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-indigo-200 transition"
          >
            <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
              <img
                src={celeb.thumbnail}
                alt={celeb.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                {celeb.typeCode}
              </span>
            </div>
            <div className="p-3">
              <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition text-sm">
                {celeb.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">{celeb.description}</p>
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-400 text-center mt-4">
        유명인 분석은 공개된 행동 패턴 기반의 추정이며 본인의 실제 검사 결과와 다를 수 있습니다
      </p>
    </div>
  );
}
